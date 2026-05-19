import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Dürr EcoDose 3K — Three-Component Electronic Dosing System | OptiFinish',
  description:
    'Dürr EcoDose 3K electronic three-component dosing — precise metering of base coat, hardener, and thinner for complex 3K liquid coating formulations. Supplied by OptiFinish, authorised Dürr distributor India.',
  keywords: ['Durr EcoDose 3K India','3K dosing system India','three component mixing India','3K coating system India','Durr 3K India','OptiFinish Durr 3K','multi component paint dosing India'],
  alternates: { canonical: `${SITE.url}/products/durr/ecodose-3k` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Dürr EcoDose 3K — Three-Component Electronic Dosing System | OptiFinish',
    description: 'Dürr EcoDose 3K electronic three-component dosing — precise metering of base coat, hardener, and thinner for complex 3K liquid coating formulations. Supplied by OptiFinish, authorised Dürr distributor India.',
    url: `${SITE.url}/products/durr/ecodose-3k`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Dürr EcoDose 3K — Three-Component Dosing | OptiFinish',
    description: 'Dürr EcoDose 3K electronic 3K dosing — precise metering of three coating components. Supplied by OptiFinish India.',
  },
};

const productLD = productSchema({
  name: 'Dürr EcoDose 3K Three-Component Dosing System',
  description: 'Dürr EcoDose 3K electronic three-component dosing — precise metering of base coat, hardener, and thinner for complex 3K liquid coating formulations. Supplied by OptiFinish, authorised Dürr distributor India.',
  url: '/products/durr/ecodose-3k',
  brand: 'Dürr',
  category: 'Liquid Coating Equipment',
  keywords: ['Durr EcoDose 3K India', '3K dosing system India', 'three component mixing India', '3K coating system India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Dürr', href: '/products/durr' },
  { name: 'EcoDose 3K', href: '/products/durr/ecodose-3k' },
]);

const faqLD = faqSchema([
  {
    q: 'What is a 3K dosing system and how is it different from 2K?',
    a: 'A 3K dosing system mixes three components — typically base coat, hardener, and thinner or effect additive — electronically in precise ratios. It enables more complex coating formulations than 2K systems, with tighter control over viscosity, gloss, and chemical properties.',
  },
  {
    q: 'When is a 3K system required instead of 2K?',
    a: '3K systems are specified when a coating formulation requires a separate thinner or effect component that must be added in a controlled ratio — such as metallic effect coatings, speciality automotive finishes, and high-performance industrial coatings where viscosity must be precisely controlled.',
  },
  {
    q: 'Is the Dürr EcoDose 3K available in India?',
    a: 'Yes. OptiFinish supplies the Dürr EcoDose 3K in India as an authorised Dürr distributor, with full commissioning, integration with Dürr spray guns and EcoPump systems, and ongoing technical support.',
  },
]);

export default function DurrEcoDose3KPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: '3K Dosing System', href: '/products/durr/ecodose-3k' },
      ]}
      badge="Dürr — Dosing System"
      eyebrow="EcoDose 3K — Three-Component Electronic Dosing"
      headline="Three streams."
      headlineAccent="One precise mix."
      subline="An electronic dosing system for three-component paint processes — independently metering base paint, catalyst, and additive at programmed ratios across the full production shift, with per-component pot life monitoring and independent flushing circuits."
      heroStats={[
        { val: '3', label: 'Independent component streams' },
        { val: 'Real-time', label: 'Per-component pot life' },
        { val: 'Auto', label: 'Colour change & flush' },
      ]}
      heroImageLabel="Dürr EcoDose 3K · three-component electronic dosing"
      heroImageSrc="/images/products/durr/ecodose-2k/csm_duerr-ecodose2k.webp"
      heroImageAspect="aspect-[4/3]"
      heroImageCover
      enquireSlug="durr-ecodose-3k"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Three-component mixing"
      problemAccent="multiplies every ratio error."
      problemBody="When a paint system requires a base, a catalyst, and a separate additive — each at a precise ratio — the compounding risk of manual measurement grows with every component. A small error in component C doesn't just affect that stream; it shifts the whole mix ratio and can invalidate the cure chemistry. The EcoDose 3K removes human ratio error from all three streams simultaneously."
      benefits={[
        'Three independent electronically metered streams — base paint, catalyst, and additive each controlled separately',
        'Programmed mix ratio maintained precisely across the full shift — no operator variation between batches',
        'Per-component pot life monitoring: each stream tracked independently with process alerts for ratio deviation',
        'Independent flushing circuits for all three components — no shared premixing chamber to purge',
        'Colour change with minimal waste — each component circuit flushed without contaminating the others',
        'Covers the same 40–4,000 cc/min flow range as EcoDose 2K — from touch-up to full production volume',
      ]}

      steps={[
        {
          num: '01',
          title: 'Three-stream supply and metering',
          body: 'Component A (base paint), Component B (catalyst/hardener), and Component C (additive or accelerator) are supplied from separate EcoPump packages to the EcoDose 3K dosing unit. Each stream is independently measured — by Coriolis or gear flowmeter — continuously and in real time. No component contacts another before the mix point.',
          imageLabel: 'Step 01 · three independent supply streams to EcoDose 3K metering unit',
          imageSrc: '/images/products/durr/ecodose-2k/durr-ecodose2k-app-01.webp',
        },
        {
          num: '02',
          title: 'Ratio control and pot life tracking',
          body: 'The EcoDose 3K controls each stream independently to maintain the programmed three-way ratio. Deviations in any component trigger an immediate process alert. Pot life is tracked per component — the system knows how long each stream has been active and alerts when any component approaches its working life limit.',
          imageLabel: 'Step 02 · per-component ratio control and pot life monitoring',
          imageSrc: '/images/products/durr/ecodose-2k/durr-2acu.jpg',
        },
        {
          num: '03',
          title: 'Independent flush — three circuits',
          body: 'Colour change or end-of-shift flush operates independently on each component circuit. Component A flushes without affecting B or C circuits. Because there is no shared premixing chamber, there is no mixed three-component paint volume to purge — each circuit carries only unmixed material up to the mix point. Low waste, fast changeover.',
          imageLabel: 'Step 03 · three independent flush circuits — zero shared premix chamber',
          imageSrc: '/images/products/durr/ecodose-2k/durr-step3.webp',
        },
      ]}
      howItWorksTitle="Supply, ratio, flush — three streams"

      applicationImages={[
        { src: '/images/products/durr/ecodose-3k/application/automotive-oem-premium.jpg', label: 'Automotive OEM 3K premium topcoat' },
        { src: '/images/products/durr/ecodose-3k/application/aircraft-component-coating.jpg', label: 'Aerospace & defence multi-component coating' },
        { src: '/images/products/durr/ecodose-3k/application/industrial-multicoat-line.jpg', label: 'Complex 3-component industrial finishing' },
        { src: '/images/products/durr/ecodose-3k/application/high-spec-industrial-coating.jpg', label: 'High-specification structural coating' },
      ]}

      specRows={[
        { l: 'Component streams', v: 'Three — base paint (A), catalyst (B), additive/accelerator (C)' },
        { l: 'Flow rate range', v: '40–4,000 cc/min — same range as EcoDose 2K' },
        { l: 'Metering accuracy', v: 'Coriolis flowmeter (mass-flow) or gear flowmeter (volume-flow) per stream' },
        { l: 'Pot life monitoring', v: 'Per-component tracking with independent process alerts' },
        { l: 'Flushing', v: 'Three independent circuits — no shared premixing chamber' },
        { l: 'Paint compatibility', v: 'Three-component solvent-based and water-based formulations' },
        { l: 'Viscosity range', v: 'Wide — consistent ratio control across viscosity variation per stream' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        '3-component polyurethane or epoxy systems with separate accelerator or additive',
        'Automotive OEM topcoat lines requiring base + catalyst + effect additive ratios',
        'Industrial coating with three-part cure chemistry (primer, catalyst, accelerator)',
        'High-specification aerospace or defence coating with multi-component formulations',
        'Any 3K process where manual measurement of three streams introduces ratio risk',
        'Operations with strict QA requirements for mix ratio documentation and traceability',
      ]}

      compatibilityTags={[
        'Dürr EcoPump HP / VP (fluid supply — three packages)',
        'All Dürr EcoGun liquid spray guns',
        'Dürr Bell Atomiser',
        'Three-component solvent-based and water-based formulations',
        'Vinayak Agencies 3K-compatible paint range',
      ]}

      references={[]}

      related={[
        {
          name: '2K Dosing System',
          category: 'Dürr',
          href: '/products/durr/ecodose-2k',
          enquireSlug: 'durr-ecodose-2k',
          imageSrc: '/images/products/durr/ecodose-2k/durr-ecodose2k-01.webp',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
        {
          name: 'Bell Atomiser',
          category: 'Dürr',
          href: '/products/durr/bell-atomiser',
          enquireSlug: 'durr-bell-atomiser',
          imageSrc: '/images/products/durr/bell-atomiser/durr-ecobell-slider-01.webp',
        },
      ]}

      ctaHeadline="Three components, zero ratio risk."
      ctaAccent="EcoDose 3K handles every stream."
      ctaBody="Talk to OptiFinish about your 3K paint system, component flow rates, and colour change frequency — we'll specify the right EcoDose 3K configuration for your line."
    />
    </>
  );
}
