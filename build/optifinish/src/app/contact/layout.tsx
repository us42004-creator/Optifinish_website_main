import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]);

export const metadata: Metadata = {
  metadataBase,
  title: 'Contact OptiFinish — Get a Quote for Coating Equipment | OptiFinish',
  description:
    'Contact OptiFinish (Value Added Coating Solutions Pvt. Ltd.) for powder coating plants, curing ovens, GEMA guns, Dürr liquid coating systems, and automation solutions. Call +91-96434-03374 or email info@optifinish.in.',
  keywords: [
    'contact OptiFinish',
    'powder coating plant quote India',
    'coating equipment enquiry India',
    'GEMA gun quote India',
    'OptiFinish Greater Noida contact',
    'coating plant price India',
    'VACSPL contact',
    'powder coating supplier contact India',
  ],
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Contact OptiFinish — Get a Quote for Coating Equipment',
    description: 'Get a quote for powder coating plants, curing ovens, GEMA guns, and Dürr liquid systems. Call +91-96434-03374 or visit optifinish.in.',
    url: `${SITE.url}/contact`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Contact OptiFinish | Get a Quote',
    description: 'Enquire about powder coating plants, GEMA equipment, Dürr systems, and coating automation. OptiFinish, Greater Noida.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      {children}
    </>
  );
}
