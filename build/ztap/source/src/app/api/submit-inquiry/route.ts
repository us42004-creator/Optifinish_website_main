import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'spam4.me', 'trashmail.com', 'maildrop.cc', 'dispostable.com',
  'fakeinbox.com', 'mailnull.com', 'spamgourmet.com',
];

function validateEmail(email: string): { valid: boolean; reason?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) return { valid: false, reason: 'Invalid email format' };

  const domain = email.split('@')[1].toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { valid: false, reason: 'Disposable email addresses are not accepted' };
  }

  return { valid: true };
}

function validatePhone(phone: string): { valid: boolean; reason?: string } {
  const parsed = parsePhoneNumberFromString(phone, 'IN'); // default to India, but accepts intl format
  if (!parsed || !parsed.isValid()) {
    // Try without country hint
    const parsedIntl = parsePhoneNumberFromString(phone);
    if (!parsedIntl || !parsedIntl.isValid()) {
      return { valid: false, reason: 'Please enter a valid phone number with country code (e.g. +91 98765 43210)' };
    }
  }
  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, company, industry, phone } = body;

    if (!email || !company || !industry || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailCheck = validateEmail(email.trim());
    if (!emailCheck.valid) {
      return NextResponse.json({ error: emailCheck.reason }, { status: 422 });
    }

    const phoneCheck = validatePhone(phone.trim());
    if (!phoneCheck.valid) {
      return NextResponse.json({ error: phoneCheck.reason }, { status: 422 });
    }

    // Read existing leads
    let leads: unknown[] = [];
    try {
      const raw = await fs.readFile(LEADS_FILE, 'utf-8');
      leads = JSON.parse(raw);
    } catch {
      leads = [];
    }

    const entry = {
      id: Date.now().toString(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      industry: industry.trim(),
      phone: phone.trim(),
      submittedAt: new Date().toISOString(),
      source: 'visit-our-lab-form',
    };

    leads.push(entry);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true, id: entry.id });
  } catch (err) {
    console.error('[submit-inquiry]', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
