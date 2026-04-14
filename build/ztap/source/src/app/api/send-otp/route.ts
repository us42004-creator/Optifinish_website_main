import { NextRequest, NextResponse } from 'next/server';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Shared in-memory OTP store via global (survives HMR in dev)
// For production: replace with Redis
declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, { otp: string; expiresAt: number; attempts: number }> | undefined;
}
if (!global.__otpStore) {
  global.__otpStore = new Map();
}
const otpStore = global.__otpStore;

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendSMS(phone: string, otp: string): Promise<boolean> {
  // ── Fast2SMS integration (popular in India) ──────────────────────
  // Set FAST2SMS_API_KEY in your environment variables
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) {
    // Dev mode: log OTP to console instead of sending
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
    return true;
  }

  try {
    const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'otp',
        variables_values: otp,
        numbers: phone.replace('+91', '').replace(/\s/g, ''),
      }),
    });
    const data = await res.json();
    return data.return === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: 'Phone number required' }, { status: 400 });

    const parsed = parsePhoneNumberFromString(phone, 'IN');
    if (!parsed || !parsed.isValid()) {
      return NextResponse.json({ error: 'Invalid Indian phone number' }, { status: 422 });
    }
    if (parsed.country !== 'IN') {
      return NextResponse.json({ error: 'OTP verification is only available for Indian numbers (+91)' }, { status: 422 });
    }

    const normalised = parsed.format('E.164');

    // Rate-limit: max 3 OTPs per 10 minutes
    const existing = otpStore.get(normalised);
    if (existing && existing.expiresAt > Date.now() && existing.attempts >= 3) {
      return NextResponse.json({ error: 'Too many OTP requests. Please wait 10 minutes.' }, { status: 429 });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(normalised, {
      otp,
      expiresAt,
      attempts: (existing?.attempts ?? 0) + 1,
    });

    const sent = await sendSMS(normalised, otp);
    if (!sent) {
      return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'OTP sent to your mobile number' });
  } catch (err) {
    console.error('[send-otp]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
