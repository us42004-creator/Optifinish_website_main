import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About OptiFinish | VACSPL — Powder & Liquid Coating Manufacturer India',
  description:
    'Value Added Coating Solutions Pvt. Ltd. (VACSPL) — the company behind OptiFinish — designs and manufactures complete powder coating lines, proprietary automation systems, and distributes GEMA and Dürr liquid coating equipment across India. Founded 1999, 500+ installations commissioned.',
  keywords: [
    'OptiFinish',
    'VACSPL',
    'Value Added Coating Solutions',
    'powder coating manufacturer India',
    'GEMA authorised partner India',
    'Dürr distributor India',
    'coating equipment Greater Noida',
    'powder coating plant manufacturer',
    'Harish Sharma VACSPL',
    'Lalit Tayal VACSPL',
  ],
  openGraph: {
    title: 'About OptiFinish | VACSPL — Founded 1999, 500+ Installations',
    description:
      'Founded by Harish Sharma and Lalit Tayal in 1999. 500+ installations commissioned. Authorised GEMA and Dürr partner. Designed and manufactured in Greater Noida, India.',
    type: 'website',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageContent />
    </>
  );
}
