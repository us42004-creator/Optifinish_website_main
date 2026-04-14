import { NextRequest, NextResponse } from 'next/server';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Shared store — same Map from send-otp (works in dev; use Redis in production)
// Because Next.js edge routes share module scope within a single process:
declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, { otp: string; expiresAt: number; attempts: number }> | undefined;
}
if (!global.__otpStore) {
  global.__otpStore = new Map();
}
const otpStore = global.__otpStore;

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    const parsed = parsePhoneNumberFromString(phone, 'IN');
    if (!parsed || !parsed.isValid()) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 422 });
    }

    const normalised = parsed.format('E.164');
    const record = otpStore.get(normalised);

    if (!record) {
      return NextResponse.json({ error: 'No OTP found. Please request a new one.' }, { status: 404 });
    }
    if (Date.now() > record.expiresAt) {
      otpStore.delete(normalised);
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 410 });
    }
    if (record.otp !== otp.trim()) {
      return NextResponse.json({ error: 'Incorrect OTP. Please try again.' }, { status: 401 });
    }

    // Valid — clear the OTP
    otpStore.delete(normalised);
    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error('[verify-otp]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
