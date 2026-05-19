import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'PS Vibratory Sieve Machine — Powder Recovery & Recycling | OptiFinish',
  description:
    'OptiFinish PS Vibratory Sieve Machine — reconditions and recycles recovered powder coating material. Removes agglomerates and contamination before recirculation, maintaining powder quality and reducing material waste.',
  keywords: [
    'powder sieve machine India',
    'vibratory sieve powder coating',
    'powder recovery machine India',
    'powder recycling machine India',
    'powder coating sieve India',
    'OptiFinish sieve machine',
    'powder agglomerate removal India',
  ],
  alternates: { canonical: `${SITE.url}/products/automation/sieve-machine` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'PS Vibratory Sieve Machine — Powder Recovery & Recycling | OptiFinish',
    description: 'Reconditions recovered powder coating material — removes agglomerates and contamination before recirculation.',
    url: `${SITE.url}/products/automation/sieve-machine`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'PS Vibratory Sieve Machine | OptiFinish',
    description: 'Vibratory sieve for powder coating recovery — removes agglomerates, reduces material waste.',
  },
};

const productLD = productSchema({
  name: 'PS Vibratory Sieve Machine',
  description: 'OptiFinish PS Vibratory Sieve Machine — reconditions and recycles recovered powder coating material. Removes agglomerates and contamination before recirculation, maintaining powder quality and reducing material waste.',
  url: '/products/automation/sieve-machine',
  brand: 'OptiFinish',
  category: 'Powder Coating Automation',
  keywords: ['powder sieve machine', 'vibratory sieve powder coating', 'powder recovery', 'agglomerate removal'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Automation', href: '/products/automation' },
  { name: 'Sieve Machine', href: '/products/automation/sieve-machine' },
]);

const faqLD = faqSchema([
  {
    q: 'What does a powder sieve machine do?',
    a: 'A powder sieve machine reconditions recovered powder coating material from the cyclone/filter system — vibrating it through a fine mesh screen to break up agglomerates, remove debris, and ensure only consistent particle-size powder is recirculated to the gun. This maintains coating quality while recovering maximum powder value.',
  },
  {
    q: 'Why is sieving important in a powder coating line?',
    a: 'Without sieving, agglomerated or contaminated recovered powder can cause coating defects — rough texture, fish eyes, or thin spots. Sieving ensures recovered powder meets the same quality standard as virgin material before reuse.',
  },
  {
    q: 'Is the OptiFinish sieve machine compatible with GEMA OptiCentre?',
    a: 'Yes. The PS Vibratory Sieve Machine integrates into the powder recovery and feed circuit alongside GEMA OptiCentre OC08 powder management systems and standalone cyclone recovery units — all available from OptiFinish.',
  },
]);

export default function SieveMachinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <ProductPageTemplate
      theme="dark"

      /* S1 — Hero */
      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Automation', href: '/products/automation' },
        { label: 'PS Vibratory Sieve Machine', href: '/products/automation/sieve-machine' },
      ]}
      badge="Proprietary — OptiFinish Built"
      eyebrow="PS Vibratory Sieve Machine"
      headline="Recovered powder."
      headlineAccent="Ready to reuse."
      subline="A vibratory sieve unit developed in-house by OptiFinish — processing recovered powder from the cyclone to remove agglomerates, lumps, and foreign particles before it re-enters the hopper. Clean powder. Consistent quality. No manual sieve operation."
      heroImageLabel="PS Vibratory Sieve Machine"
      heroImageSrc="/images/products/sieve-machine/sieve-machine-04.jpg"
      heroImageAspect="aspect-[3/4]"
      heroImageCover
      enquireSlug="sieve-machine"
      backHref="/products/automation"
      backLabel="← Back to Automation"

      /* S2 — Problem */
      problemHeadline="Recovered powder fed back"
      problemAccent="unprocessed causes defects."
      problemBody="Powder recovered from the cyclone and bag filter contains agglomerates, lumps, and contamination from the booth environment. Fed directly back to the hopper, these particles cause pinholes, surface defects, and nozzle blockages. The PS Vibratory Sieve Machine processes every batch of recovered powder before it re-enters the supply chain."
      benefits={[
        'Vibratory sieving mechanism continuously separates powder without degrading particles',
        'Removes agglomerates, lumps, and foreign particles before powder reaches the gun hopper',
        'Colour-change ready — fast manual cleaning between powder batches with minimal cross-contamination risk',
        'Accessible internal components for quick mesh replacement without specialist tooling',
        'Low maintenance design — built for continuous operation across production shifts',
        'Designed and manufactured at OptiFinish\'s Greater Noida R&D facility',
      ]}

      /* S4 — How It Works */
      steps={[
        {
          num: '01',
          title: 'Recovered powder entry',
          body: 'Powder recovered from the cyclone separator is directed into the PS Vibratory Sieve Machine. The unit sits inline between the cyclone output and the hopper return — processing every batch of recovered powder before it re-enters the gun supply.',
          imageLabel: 'Step 01 · recovered powder entering sieve from cyclone',
          imageSrc: '/images/products/sieve-machine/sieve-machine-02.jpg',
        },
        {
          num: '02',
          title: 'Vibratory sieving',
          body: 'An eccentric motor drive causes the sieve basket to vibrate continuously — passing individual powder particles through the mesh while retaining agglomerates, lumps, and foreign particles on the sieve surface. The gentle vibratory action does not break down or degrade individual powder particles.',
          imageLabel: 'Step 02 · vibratory sieving separating clean powder',
          imageSrc: '/images/products/sieve-machine/sieve-machine-03.jpg',
        },
        {
          num: '03',
          title: 'Clean powder return',
          body: 'Sieved, clean powder exits the unit and is returned to the gun hopper for immediate reuse. Retained agglomerates and contamination are collected and discarded. For colour changes, the sieve basket is quickly removed and cleaned — the unit is designed for fast changeover with no specialist tools.',
          imageLabel: 'Step 03 · clean powder returning to hopper',
          imageSrc: '/images/products/sieve-machine/sieve-machine-04.jpg',
        },
      ]}
      howItWorksTitle="Recover, sieve, reuse"

      /* S5 — Specs */
      specRows={[
        { l: 'Mechanism', v: 'Vibratory sieving — eccentric motor drive' },
        { l: 'Integration position', v: 'Inline between cyclone output and hopper return' },
        { l: 'Particles removed', v: 'Agglomerates, lumps, foreign contamination' },
        { l: 'Colour change', v: 'Fast mesh cleaning — minimal cross-contamination risk' },
        { l: 'Maintenance', v: 'Accessible internal components; quick mesh replacement' },
        { l: 'Development origin', v: 'Designed and manufactured at OptiFinish Greater Noida R&D facility' },
      ]}

      /* S6 — Applications */
      applications={[
        'Any powder coating line with cyclone powder recovery',
        'Operations maximising powder reuse efficiency and material cost control',
        'Colour-change-intensive batch operations requiring clean separation between batches',
        'Lines recovering metallic, textured, or fine-particle powders prone to agglomeration',
        'Integration with GEMA OC08 OptiCentre or any standard cyclone recovery system',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'All OptiFinish cyclone & dust collector systems',
        'GEMA OC08 OptiCentre (complementary)',
        'Third-party cyclone recovery systems',
        'All powder types: epoxy, polyester, PU, metallic, textured',
      ]}

      /* S9 — Related */
      related={[
        {
          name: 'Cyclone & Dust Collector',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/cyclone-dust-collector',
          enquireSlug: 'cyclone-dust-collector',
          imageSrc: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-dust-collect.png',
        },
        {
          name: 'OptiCentre Powder Management',
          category: 'GEMA',
          href: '/products/gema/opticentre',
          enquireSlug: 'gema-opticentre',
          imageSrc: '/images/products/gema/opticentre/gema-opticenter-oc07-oc08-01.jpg',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
      ]}

      references={[]}

      /* S10 — CTA */
      ctaHeadline="Close the gap in your recovery loop."
      ctaAccent="Cleaner powder, better finish."
      ctaBody="Talk to OptiFinish about integrating the PS Vibratory Sieve Machine into your powder recovery system — new installation or retrofit."
    />
    </>
  );
}
