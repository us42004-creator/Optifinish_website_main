# Contact

## Purpose

Act as the primary conversion and enquiry endpoint for the site.

## CRM Note

Zoho CRM integration, lead routing, and form handling remain aligned with the original strategy report.

## Status

✅ Built and live — optifinish.in/contact

Zoho CRM integrated via OAuth2. `/api/enquire/route.ts` pushes leads directly to Zoho CRM Leads module. Refresh token stored in `.env.local` and Vercel environment variables. Form fields: Name, Company, Phone, Email, Product (dropdown), Details. Phone: +91 89294 08691, WhatsApp: wa.me/918929408691.
