import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';
import QualityPolicyContent from './QualityPolicyContent';

export const metadata: Metadata = {
  metadataBase,
  title: { absolute: 'Quality Policy | OptiFinish' },
  description:
    'OptiFinish (Value Added Coating Solutions Pvt. Ltd.) Quality Policy — our ISO 9001:2015 commitment to quality, continual improvement, and customer satisfaction. Available in English and Hindi.',
  keywords: ['OptiFinish quality policy', 'ISO 9001:2015', 'VACSPL quality policy', 'quality management', 'गुणवत्ता नीति'],
  alternates: { canonical: `${SITE.url}/quality-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Quality Policy | OptiFinish',
    description: 'Our ISO 9001:2015 commitment to quality, continual improvement, and customer satisfaction — in English and Hindi.',
    url: `${SITE.url}/quality-policy`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Quality Policy | OptiFinish',
    description: 'OptiFinish ISO 9001:2015 Quality Policy — Value Added Coating Solutions Pvt. Ltd.',
  },
};

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Quality Policy', href: '/quality-policy' },
]);

export default function QualityPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <main className="min-h-svh bg-white text-[#070809]">
        <QualityPolicyContent />
      </main>
    </>
  );
}
