import type { Metadata } from 'next';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase,
  title: 'Our Work — Powder Coating Plant Installations & Case Studies | OptiFinish',
  description:
    'Explore OptiFinish\'s portfolio of powder coating plant installations, curing oven projects, spray booths, and automation systems across India. Real installations, real results.',
  keywords: [
    'powder coating plant installation India',
    'powder coating case study India',
    'coating plant projects Greater Noida',
    'OptiFinish installations',
    'GEMA gun installation India',
    'coating automation projects India',
    'powder coating plant reference India',
  ],
  alternates: { canonical: `${SITE.url}/our-work` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Our Work — Powder Coating Plant Installations & Case Studies | OptiFinish',
    description: 'Portfolio of OptiFinish powder coating plant installations, curing ovens, spray booths, and automation systems across India.',
    url: `${SITE.url}/our-work`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Our Work — Installations & Case Studies | OptiFinish',
    description: 'Real powder coating plant installations by OptiFinish across India. Explore our project portfolio.',
  },
};

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Our Work', href: '/our-work' },
]);

const faqLD = faqSchema([
  {
    q: 'What types of projects has OptiFinish installed?',
    a: 'OptiFinish has installed conveyorised powder coating lines, batch-type powder coating plants, gas and electric curing ovens, liquid spray booths, pretreatment lines, and Z-TAP and ZA01 automation systems across automotive, furniture, appliance, architectural, and general engineering sectors in India.',
  },
  {
    q: 'Does OptiFinish provide references from past installations?',
    a: 'Yes. OptiFinish can provide references and site visit coordination for prospective customers evaluating similar plant configurations. Contact us at +91-96434-03374 or info@optifinish.in to request project references relevant to your industry and scale.',
  },
  {
    q: 'In which industries has OptiFinish installed coating plants?',
    a: 'OptiFinish has delivered coating solutions to the automotive components, furniture and wood finishing, agricultural equipment, electrical enclosures, steel fabrication, architectural aluminium, and general manufacturing sectors across North and Central India.',
  },
]);

export default function OurWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <main className="min-h-screen bg-[#070809] text-white">
        {/* Hero */}
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
          <span className="mb-4 block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/60">
            Our Work
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
            Installations that<br />
            <span className="text-[#FECE00]">speak for themselves.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/50">
            From single-line powder coating plants to fully automated conveyorised systems — every installation is engineered, commissioned, and supported by the OptiFinish team.
          </p>
        </section>

        {/* Coming Soon */}
        <section className="mx-auto max-w-4xl px-6 pb-32 text-center">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-12">
            <span className="mb-4 block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/60">
              Portfolio — Coming Soon
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto">
              We are compiling installation case studies, project documentation, and client references. In the meantime, contact us directly to request references relevant to your industry and scale.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#FECE00] px-8 py-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#070809] transition hover:opacity-90"
              >
                Request a Reference
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
