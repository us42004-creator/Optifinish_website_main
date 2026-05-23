import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Terms of Use | OptiFinish',
  description:
    'Terms of Use for optifinish.in — the website of Value Added Coating Solutions Pvt. Ltd. Read our terms before using this site.',
  alternates: { canonical: `${SITE.url}/terms` },
  robots: { index: true, follow: false },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Terms of Use | OptiFinish',
    description: 'Terms of Use for optifinish.in — Value Added Coating Solutions Pvt. Ltd.',
    url: `${SITE.url}/terms`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Terms of Use | OptiFinish',
    description: 'Terms of use for the OptiFinish website.',
  },
};

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Terms of Use', href: '/terms' },
]);

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <main className="min-h-svh bg-white text-[#070809]">
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-20">
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.04em] text-[#070809]">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-[#070809]/50">
            Value Added Coating Solutions Pvt. Ltd. (OptiFinish) · Last updated: May 2025
          </p>

          <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-[#070809]/75">

            <div>
              <h2 className="font-bold text-[#070809] mb-2">1. Acceptance</h2>
              <p>By accessing optifinish.in, you agree to these Terms of Use. If you do not agree, please do not use this website.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">2. Intellectual property</h2>
              <p>All content on this website — including text, images, product specifications, videos, and the OptiFinish brand — is the property of Value Added Coating Solutions Pvt. Ltd. You may not reproduce, distribute, or use this content without prior written permission.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">3. Product information</h2>
              <p>Product specifications, images, and pricing information on this site are indicative and subject to change. Final specifications are confirmed in formal quotations. Contact us for current pricing and availability.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">4. Third-party brands</h2>
              <p>GEMA® and DÜRR® are registered trademarks of their respective owners. OptiFinish is an authorised distributor and service partner for these brands in India. References to these brands are for identification purposes only.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">5. Limitation of liability</h2>
              <p>OptiFinish makes no warranty that this website will be available uninterrupted or free of errors. We are not liable for any loss arising from your reliance on information published on this website.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">6. Governing law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of Gautam Budh Nagar, Uttar Pradesh.</p>
            </div>

            <div>
              <h2 className="font-bold text-[#070809] mb-2">7. Contact</h2>
              <p>
                Value Added Coating Solutions Pvt. Ltd., K-288, Q-21, SITE-V, Surajpur Industrial Area, Greater Noida — 201306. Email: <a href="mailto:info@optifinish.in" className="text-[#FECE00] underline">info@optifinish.in</a>
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
