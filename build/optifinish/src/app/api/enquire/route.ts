import { NextRequest, NextResponse } from 'next/server';

const ZOHO_TOKEN_URL   = 'https://accounts.zoho.in/oauth/v2/token';
const ZOHO_LEADS_URL   = 'https://www.zohoapis.in/crm/v2/Leads';

/** Exchange the refresh token for a short-lived access token */
async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     process.env.ZOHO_CLIENT_ID     ?? '',
    client_secret: process.env.ZOHO_CLIENT_SECRET ?? '',
    refresh_token: process.env.ZOHO_REFRESH_TOKEN ?? '',
  });

  const res  = await fetch(`${ZOHO_TOKEN_URL}?${params.toString()}`, { method: 'POST' });
  const data = await res.json() as { access_token?: string; error?: string };

  if (!data.access_token) {
    throw new Error(`Zoho token error: ${data.error ?? JSON.stringify(data)}`);
  }
  return data.access_token;
}

/** Push one Lead record to Zoho CRM */
async function createZohoLead(payload: {
  name:    string;
  company: string;
  phone:   string;
  email:   string;
  product: string;
  details: string;
}): Promise<void> {
  const token = await getAccessToken();

  // Split full name into first / last for Zoho's required fields
  const nameParts  = payload.name.trim().split(/\s+/);
  const firstName  = nameParts.slice(0, -1).join(' ') || payload.name;
  const lastName   = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '-';

  const lead = {
    First_Name:  firstName,
    Last_Name:   lastName,
    Company:     payload.company,
    Phone:       payload.phone,
    Email:       payload.email,
    Lead_Source: 'Website',
    Lead_Status: 'Not Contacted',
    Description: `Product enquiry: ${payload.product}\n\n${payload.details || '—'}`,
  };

  const res = await fetch(ZOHO_LEADS_URL, {
    method:  'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [lead] }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Zoho CRM error ${res.status}: ${errText}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, company, phone, email, product, details } = await req.json() as {
      name: string; company: string; phone: string;
      email: string; product?: string; details?: string;
    };

    // Validation
    if (!name || !company || !phone || !email) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const productLabel = product || 'General enquiry';
    const detailsText  = details || '';

    // Log without PII (visible in Vercel / server logs as a fallback record)
    console.log('[enquire] New lead received:', { product: productLabel, timestamp: new Date().toISOString() });

    // Push to Zoho CRM if credentials are configured
    if (process.env.ZOHO_CLIENT_ID && process.env.ZOHO_REFRESH_TOKEN) {
      await createZohoLead({ name, company, phone, email, product: productLabel, details: detailsText });
      console.log('[enquire] Lead pushed to Zoho CRM');
    } else {
      console.warn('[enquire] Zoho credentials not set — lead logged only, not sent to CRM');
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('[enquire] Error:', err);
    // Still return 200 to the user — don't let a CRM error block the thank-you state
    return NextResponse.json({ ok: true, warning: 'Lead received but CRM push failed' });
  }
}
