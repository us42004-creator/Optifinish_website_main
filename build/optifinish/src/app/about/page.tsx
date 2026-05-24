import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';

const founderPersonSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person-harish-sharma`,
    name: 'Harish Sharma',
    jobTitle: 'Co-Founder & Director',
    alumniOf: 'Rohilkhand University',
    worksFor: { '@type': 'Organization', '@id': `${SITE.url}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person-lalit-tayal`,
    name: 'Lalit Tayal',
    jobTitle: 'Co-Founder & Director',
    alumniOf: 'Shiva Institute of Management Studies',
    worksFor: { '@type': 'Organization', '@id': `${SITE.url}/#organization` },
  },
];

export const metadata: Metadata = {
  metadataBase,
  title: 'About OptiFinish | VACSPL — Powder & Liquid Coating Manufacturer India',
  description:
    'Value Added Coating Solutions Pvt. Ltd. (VACSPL) — the company behind OptiFinish — designs and manufactures complete powder coating lines, proprietary automation systems, and distributes GEMA and Dürr liquid coating equipment across India. Founded 2010, 500+ installations commissioned.',
  keywords: [
    'OptiFinish',
    'VACSPL',
    'Value Added Coating Solutions Pvt Ltd',
    'powder coating manufacturer India',
    'GEMA authorised partner India',
    'Dürr distributor India',
    'coating equipment Greater Noida',
    'powder coating plant manufacturer',
    'Harish Sharma VACSPL',
    'Lalit Tayal VACSPL',
    'coating company Greater Noida',
    'industrial coating manufacturer India',
  ],
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'About OptiFinish | VACSPL — Powder & Liquid Coating Manufacturer India',
    description: 'Founded by Harish Sharma and Lalit Tayal. 500+ installations commissioned. Authorised GEMA and Dürr partner. Manufactured in Greater Noida, India.',
    url: `${SITE.url}/about`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'About OptiFinish | VACSPL India',
    description: '500+ coating installations commissioned. Authorised GEMA & Dürr partner. Manufactured in Greater Noida.',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Value Added Coating Solutions Pvt. Ltd.',
    alternateName: ['VACSPL', 'OptiFinish'],
    foundingDate: '1999',
    founders: [
      {
        '@type': 'Person',
        name: 'Harish Sharma',
        jobTitle: 'Co-Founder & Director',
        alumniOf: 'Rohilkhand University',
      },
      {
        '@type': 'Person',
        name: 'Lalit Tayal',
        jobTitle: 'Co-Founder & Director',
        alumniOf: 'Shiva Institute of Management Studies',
      },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Greater Noida',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
        description: 'Headquarters & Manufacturing',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Rudrapur',
        addressRegion: 'Uttarakhand',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    ],
    description:
      'VACSPL designs and manufactures complete powder coating lines, develops proprietary automation systems (Z-TAP, ZA01), and distributes GEMA and Dürr liquid coating equipment across India. 500+ installations across automotive, consumer appliances, steel fabrication, and architectural sectors.',
    numberOfLocations: 4,
    areaServed: 'India',
    brand: { '@type': 'Brand', name: 'OptiFinish' },
  };

  const breadcrumbLD = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      {founderPersonSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <h1 className="sr-only">About OptiFinish — Value Added Coating Solutions</h1>
      <AboutPageContent />
    </>
  );
}
