import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Privacy Policy | OptiFinish',
  description:
    'Privacy Policy for OptiFinish (Value Added Coating Solutions Pvt. Ltd.) — how we collect, use, and protect your personal information.',
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  robots: { index: true, follow: false },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Privacy Policy | OptiFinish',
    description: 'How OptiFinish collects, uses, and protects your personal information.',
    url: `${SITE.url}/privacy-policy`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Privacy Policy | OptiFinish',
    description: 'Privacy policy for OptiFinish — Value Added Coating Solutions Pvt. Ltd.',
  },
};

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
]);

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <main className="min-h-screen bg-white text-[#070809]">
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-20">
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.04em] text-[#070809]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#070809]/50">
            Value Added Coating Solutions Pvt. Ltd. (OptiFinish) · Last updated: May 2025
          </p>

          <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-[#070809]/75">

            <div>
              <h2 className="font-bold text-[#070809] mb-2">1. Who we are</h2>
              <p>
                Value Added Coating Solutions Pvt. Ltd. (trading as OptiFinish), K-288, Q-21 (GF &amp; FF), SITE-V, Surajpur Industrial Area, Greater Noida, Uttar Pradesh — 201306, India. Contact: <a href="mailto:info@optifinish.in" className="text-[#FECE00] underline">info@optifinish.in</a> · +91-96434-03374.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">2. What information we collect</h2>
              <p>When you submit an enquiry form on optifinish.in, we collect your name, company name, email address, phone number, and the details of your enquiry. We do not collect sensitive financial or identity data.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">3. How we use your information</h2>
              <p>We use your contact details solely to respond to your enquiry, provide quotations, and — if you opt in — send relevant product updates and newsletters. We do not sell or share your data with third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">4. Data retention</h2>
              <p>Enquiry data is retained for up to 3 years for business relationship management purposes. You may request deletion at any time by emailing info@optifinish.in.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">5. Cookies</h2>
              <p>This website uses minimal, functional cookies required for navigation. We do not use advertising or tracking cookies. Analytics, if enabled, use anonymised data.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">6. Your rights</h2>
              <p>You have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, contact us at info@optifinish.in.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">7. Changes to this policy</h2>
              <p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
