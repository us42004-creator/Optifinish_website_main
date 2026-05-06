import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr 3K Dosing System | EcoDose 3K | OptiFinish',
  description:
    'Dürr EcoDose 3K electronic three-component dosing system. Three independent metered streams for base, catalyst, and additive. Pot life monitoring per component. Supplied by OptiFinish.',
};

export default function DurrEcoDose3KPage() {
  return (
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
      heroImageSrc="/images/products/durr/ecodose-3k/durr-ecodose2k-01.webp"
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
        },
        {
          num: '02',
          title: 'Ratio control and pot life tracking',
          body: 'The EcoDose 3K controls each stream independently to maintain the programmed three-way ratio. Deviations in any component trigger an immediate process alert. Pot life is tracked per component — the system knows how long each stream has been active and alerts when any component approaches its working life limit.',
          imageLabel: 'Step 02 · per-component ratio control and pot life monitoring',
        },
        {
          num: '03',
          title: 'Independent flush — three circuits',
          body: 'Colour change or end-of-shift flush operates independently on each component circuit. Component A flushes without affecting B or C circuits. Because there is no shared premixing chamber, there is no mixed three-component paint volume to purge — each circuit carries only unmixed material up to the mix point. Low waste, fast changeover.',
          imageLabel: 'Step 03 · three independent flush circuits — zero shared premix chamber',
        },
      ]}
      howItWorksTitle="Supply, ratio, flush — three streams"

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
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
        },
        {
          name: 'Bell Atomiser',
          category: 'Dürr',
          href: '/products/durr/bell-atomiser',
          enquireSlug: 'durr-bell-atomiser',
        },
      ]}

      ctaHeadline="Three components, zero ratio risk."
      ctaAccent="EcoDose 3K handles every stream."
      ctaBody="Talk to OptiFinish about your 3K paint system, component flow rates, and colour change frequency — we'll specify the right EcoDose 3K configuration for your line."
    />
  );
}
