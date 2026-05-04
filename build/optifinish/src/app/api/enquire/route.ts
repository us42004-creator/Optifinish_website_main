import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, company, phone, email, product, details } = await req.json();

    // Basic validation
    if (!name || !company || !phone || !email) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    // ── TODO: Replace with Zoho CRM Web-to-Lead integration ──
    // Example Zoho endpoint:
    // await fetch('https://crm.zoho.in/crm/WebToLeadForm', {
    //   method: 'POST',
    //   body: new URLSearchParams({ ... })
    // });

    // For now: log to console (visible in server logs / Vercel dashboard)
    console.log('New enquiry received:', {
      name,
      company,
      phone,
      email,
      product: product || 'General enquiry',
      details: details || '—',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Enquiry API error:', err);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
