import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]);

const contactPageLD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE.url}/contact#webpage`,
  url: `${SITE.url}/contact`,
  name: 'Contact OptiFinish',
  description: 'Get in touch with OptiFinish for powder coating plant enquiries.',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: 'OptiFinish',
    telephone: '+91-96434-03374',
    email: 'info@optifinish.in',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+91-96434-03374', contactType: 'sales', areaServed: 'IN' },
      { '@type': 'ContactPoint', telephone: '+91-89294-08691', contactType: 'customer support', areaServed: 'IN' },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase,
  title: 'Contact OptiFinish — Get a Quote for Coating Equipment | OptiFinish',
  description:
    'Request a quote for powder coating plants, curing ovens, spray booths, GEMA guns, or Dürr liquid coating equipment. OptiFinish responds within 1 business day.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLD) }} />
      {children}
    </>
  );
}
