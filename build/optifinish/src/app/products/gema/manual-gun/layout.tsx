import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, faqSchema, breadcrumbSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'GEMA Manual Powder Coating Gun — OptiFlex Pro Series | OptiFinish',
  description:
    'GEMA OptiFlex Pro Series manual powder coating guns — supplied and serviced by OptiFinish, authorised GEMA partner in India. Superior charging, ergonomic grip, precise control for manual powder application.',
  keywords: [
    'GEMA manual powder coating gun India',
    'GEMA OptiFlex Pro India',
    'powder coating gun India',
    'manual powder coating gun India',
    'GEMA gun supplier India',
    'OptiFinish GEMA gun',
    'powder coating spray gun India',
    'GEMA authorised dealer India',
  ],
  alternates: { canonical: `${SITE.url}/products/gema/manual-gun` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'GEMA Manual Powder Coating Gun — OptiFlex Pro Series | OptiFinish',
    description: 'GEMA OptiFlex Pro manual guns — supplied and serviced by OptiFinish, authorised GEMA partner in India.',
    url: `${SITE.url}/products/gema/manual-gun`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'GEMA OptiFlex Pro Manual Gun | OptiFinish India',
    description: 'GEMA OptiFlex Pro manual powder coating guns — authorised supply and service by OptiFinish India.',
  },
};

const faqLD = faqSchema([
  {
    q: 'What is the GEMA OptiFlex Pro manual powder coating gun?',
    a: 'The GEMA OptiFlex Pro is a range of manual electrostatic powder coating guns featuring MagicControl 4.0 technology — offering programmable kV and µA settings, ergonomic grip, and superior charging performance for manual powder coating applications.',
  },
  {
    q: 'How do I get GEMA manual guns serviced in India?',
    a: 'OptiFinish is an authorised GEMA service partner in India — providing supply, commissioning, spare parts, and after-sales support for GEMA OptiFlex Pro manual guns. Contact OptiFinish at +91-96434-03374.',
  },
  {
    q: "What is MagicControl 4.0 on GEMA manual guns?",
    a: "MagicControl 4.0 is GEMA's proprietary gun control technology that allows operators to program and store up to 10 spray jobs with defined kV, µA, and powder output settings — eliminating rework from inconsistent manual settings.",
  },
]);

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'GEMA', href: '/products/gema' },
  { name: 'Manual Gun', href: '/products/gema/manual-gun' },
]);

export default function ManualGunLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      {children}
    </>
  );
}
