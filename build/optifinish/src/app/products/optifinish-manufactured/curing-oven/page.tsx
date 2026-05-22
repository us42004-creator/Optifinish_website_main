import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Curing Oven — Gas-Fired & Electric Powder Coating Ovens | OptiFinish',
  description:
    'Gas-fired and electric powder coating curing ovens manufactured in-house by OptiFinish. Batch and conveyorised configurations. ±5°C temperature uniformity. Custom-dimensioned to your production line.',
  keywords: [
    'curing oven manufacturer India',
    'powder coating curing oven India',
    'gas fired curing oven India',
    'electric curing oven India',
    'industrial curing oven Greater Noida',
    'conveyorised curing oven India',
    'batch curing oven India',
    'powder coating oven manufacturer',
    'OptiFinish curing oven',
  ],
  alternates: { canonical: `${SITE.url}/products/optifinish-manufactured/curing-oven` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Curing Oven — Gas-Fired & Electric Powder Coating Ovens | OptiFinish',
    description: 'Gas-fired and electric curing ovens — batch and conveyorised. ±5°C uniformity. Custom-built at OptiFinish Greater Noida.',
    url: `${SITE.url}/products/optifinish-manufactured/curing-oven`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Curing Oven — Gas-Fired & Electric | OptiFinish',
    description: 'Gas-fired and electric curing ovens, batch and conveyorised. ±5°C uniformity. Manufactured in Greater Noida.',
  },
};

const productLD = productSchema({
  name: 'Curing Oven',
  description: 'Gas-fired and electric curing ovens for powder coating — batch and conveyorised configurations. ±5°C temperature uniformity. Custom-dimensioned and manufactured by OptiFinish, Greater Noida.',
  url: '/products/optifinish-manufactured/curing-oven',
  category: 'Industrial Heating Equipment',
  keywords: ['curing oven', 'powder coating oven', 'gas curing oven', 'electric curing oven', 'industrial oven India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
  { name: 'Curing Oven', href: '/products/optifinish-manufactured/curing-oven' },
]);

const faqLD = faqSchema([
  {
    q: 'What types of curing ovens does OptiFinish manufacture?',
    a: 'OptiFinish manufactures gas-fired and electric curing ovens in both batch and conveyorised configurations. Ovens are custom-dimensioned to fit your part size, throughput, and line layout.',
  },
  {
    q: 'What temperature uniformity do OptiFinish curing ovens achieve?',
    a: 'OptiFinish curing ovens achieve ±5°C temperature uniformity across the oven chamber — critical for consistent powder coating cure quality.',
  },
]);

export default function CuringOvenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'Curing Oven', href: '/products/optifinish-manufactured/curing-oven' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="Gas-Fired & Electric — Batch and Conveyorised"
      headline="Consistent cure."
      headlineAccent="Every part. Every shift."
      subline="Manufactured in-house to each installation's throughput and part-size requirements — delivering ±5°C temperature uniformity across the full curing chamber for complete, consistent powder cross-linking on every part."
      heroStats={[
        { val: '±5°C', label: 'Temperature uniformity' },
        { val: '200mm', label: 'Rockwool insulation' },
        { val: 'Custom', label: 'Dimensioned to your line' },
      ]}
      heroImageLabel="Curing Oven · gas-fired tunnel oven"
      galleryBottomSplit={3}
      photoGallery={[
        { src: '/images/products/optifinish-manufactured/curing-oven/industrial_oven.png', label: 'Curing Oven — Full Build' },
        { src: '/images/products/optifinish-manufactured/curing-oven/oven-nic.png', label: 'Oven Detail' },
        { src: '/images/products/optifinish-manufactured/curing-oven/yellow-oven-lighting.png', label: 'Interior — Heat Chamber' },
        { src: '/images/products/optifinish-manufactured/curing-oven/industrial_oven.png', label: 'Curing Oven — Exterior View' },
        { src: '/images/products/optifinish-manufactured/curing-oven/oven-inside.png', label: 'Chamber Interior' },
      ]}
      enquireSlug="curing-oven"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Uneven curing"
      problemAccent="destroys finish quality."
      problemBody="A curing oven with hot spots or cold zones produces inconsistent gloss, adhesion failure, and surface defects across the part. Every OptiFinish curing oven is designed around forced hot-air recirculation for uniform temperature from corner to corner of the chamber — at the specified cure temperature and hold time."
      benefits={[
        '±5°C temperature uniformity across the full curing chamber — consistent cure on every part',
        'Ecoflame gas burner (LPG/PNG) or electric resistance element — match your energy supply',
        '200mm Rockwool insulation on all walls, roof, and doors — minimal heat loss, fast heat-up',
        'PID digital temperature controller with programmable cure profiles and over-temperature safety cutoff',
        '5HP recirculation fan for forced hot-air distribution — no dead zones',
        'Internal dimensions custom matched to your booth width, conveyor layout, and part height',
      ]}

      steps={[
        {
          num: '01',
          title: 'Heat-up and stabilisation',
          body: 'The Ecoflame gas burner or electric element brings the oven to the set temperature. The 5HP recirculation fan circulates hot air through the distribution plenum — the PID controller stabilises the chamber temperature to within ±5°C of setpoint before production begins.',
          imageLabel: 'Step 01 · oven heat-up and temperature stabilisation',
          imageSrc: '/images/products/optifinish-manufactured/curing-oven/step-01-heatup-stabilisation.svg',
        },
        {
          num: '02',
          title: 'Part entry and cure',
          body: 'Powder-coated parts enter the oven on the conveyor (tunnel oven) or are loaded directly (batch oven). At 180–200°C, the powder coating melts, flows, and begins cross-linking. The digital controller maintains temperature throughout the cure cycle — typically 15–20 minutes at temperature for standard polyester powder.',
          imageLabel: 'Step 02 · parts entering curing oven at temperature',
          imageSrc: '/images/products/optifinish-manufactured/curing-oven/step-02-part-entry-cure.svg',
        },
        {
          num: '03',
          title: 'Cooling and unloading',
          body: 'Fully cured parts exit the oven into the cooling section. The over-temperature safety cutoff monitors the chamber continuously — protecting parts from accidental over-cure. Cured parts are hard, cross-linked, and ready for unloading and inspection.',
          imageLabel: 'Step 03 · cured parts exiting oven into cooling section',
          imageSrc: '/images/products/optifinish-manufactured/curing-oven/step-03-cooling-unloading.svg',
        },
      ]}
      howItWorksTitle="Heat, cure, cool"

      specRows={[
        { l: 'Heating type', v: 'Gas-fired (LPG/PNG) via Ecoflame burner, or electric resistance' },
        { l: 'Operating temperature', v: '180–220°C (adjustable; standard powder cure at 180–200°C for 15–20 min)' },
        { l: 'Temperature uniformity', v: '±5°C across the full chamber' },
        { l: 'Insulation', v: '200mm Rockwool on all walls, roof, and doors' },
        { l: 'Recirculation fan', v: '5HP drive — forced hot air circulation' },
        { l: 'Inner casing', v: 'Heat-resistant lining; SS optional' },
        { l: 'Outer casing', v: 'MS sheet, powder-coated' },
        { l: 'Digital controller', v: 'PID with over-temperature safety cutoff' },
        { l: 'Dimensions', v: 'Custom to part size and conveyor layout' },
      ]}

      applications={[
        'Powder coating cure (primary use — polyester, epoxy, PU)',
        'Pre-heating for pretreatment line dry-off',
        'E-coat (electrocoat) cure',
        'Sublimation transfer (wood-grain finish on aluminium profiles)',
        'Paint baking and heat-curing of adhesives',
      ]}
      applicationImages={[
        { src: '/images/products/optifinish-manufactured/curing-oven/application/powder-coating-cure.webp', label: 'Powder coating cure — polyester, epoxy, PU' },
        { src: '/images/products/optifinish-manufactured/curing-oven/application/conveyor-line-dry-off.jpg', label: 'Pretreatment line dry-off & pre-heating' },
        { src: '/images/products/optifinish-manufactured/curing-oven/application/automotive-ecoat-cure.jpg', label: 'E-coat (electrocoat) cure' },
        { src: '/images/products/optifinish-manufactured/curing-oven/application/aluminium-sublimation-transfer.jpg', label: 'Sublimation transfer — wood-grain on aluminium' },
        { src: '/images/products/optifinish-manufactured/curing-oven/application/adhesive-heat-cure.jpg', label: 'Paint baking & adhesive heat-curing' },
      ]}

      compatibilityTags={[
        'All OptiFinish powder spray booths',
        'Monorail overhead conveyor',
        'Chain-on-edge conveyor',
        'Power & free conveyor',
        'All GEMA gun and reciprocator systems',
      ]}

      references={[]}

      related={[
        {
          name: 'Powder Coating Plant',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-coating-plant',
          enquireSlug: 'powder-coating-plant',
          imageSrc: '/images/products/optifinish-manufactured/powder-coating-plant/optifinish-powder-coating-plant-01.jpg',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
        {
          name: 'Wood Finish Oven',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/wood-finish-oven',
          enquireSlug: 'wood-finish-oven',
          imageSrc: '/images/products/optifinish-manufactured/wood-finish-oven/img-1.png',
        },
      ]}

      ctaHeadline="Specify your curing oven."
      ctaAccent="We'll dimension it to your line."
      ctaBody="Give us your part dimensions, throughput, and substrate — OptiFinish will design the oven chamber, specify the heating system, and quote the full installation."
    />
    </>
  );
}
