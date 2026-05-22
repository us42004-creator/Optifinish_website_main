import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Pretreatment Line — Iron Phosphating & Multi-Stage Systems | OptiFinish',
  description:
    'Pretreatment lines manufactured by OptiFinish — iron phosphating and multi-stage spray/dip systems for steel, aluminium, and galvanised substrates. Critical surface preparation before powder and liquid coating.',
  keywords: [
    'pretreatment line manufacturer India',
    'iron phosphating system India',
    'PT line powder coating India',
    'surface pretreatment line India',
    'spray pretreatment system India',
    'OptiFinish PT line',
    'coating pretreatment Greater Noida',
  ],
  alternates: { canonical: `${SITE.url}/products/optifinish-manufactured/pt-line` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Pretreatment Line — Iron Phosphating & Multi-Stage Systems | OptiFinish',
    description: 'Iron phosphating and multi-stage pretreatment lines for steel, aluminium, and galvanised substrates. Spray and dip configurations. Manufactured by OptiFinish.',
    url: `${SITE.url}/products/optifinish-manufactured/pt-line`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Pretreatment Line — Iron Phosphating | OptiFinish',
    description: 'Multi-stage PT lines — iron phosphating, spray/dip, steel and aluminium substrates. Manufactured in Greater Noida.',
  },
};

const productLD = productSchema({
  name: 'Pretreatment Line (PT Line)',
  description: 'Pretreatment lines manufactured by OptiFinish — iron phosphating and multi-stage spray/dip systems for steel, aluminium, and galvanised substrates. Critical surface preparation before powder and liquid coating.',
  url: '/products/optifinish-manufactured/pt-line',
  category: 'Surface Pretreatment Equipment',
  keywords: ['pretreatment line', 'iron phosphating system', 'PT line powder coating', 'surface pretreatment India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
  { name: 'PT Line', href: '/products/optifinish-manufactured/pt-line' },
]);

const faqLD = faqSchema([
  {
    q: 'What is a pretreatment line in powder coating?',
    a: 'A pretreatment (PT) line prepares metal surfaces before powder or liquid coating — removing oil, rust, and mill scale through degreasing and phosphating stages to ensure strong coating adhesion and corrosion resistance.',
  },
  {
    q: 'What types of pretreatment systems does OptiFinish manufacture?',
    a: 'OptiFinish manufactures iron phosphating and multi-stage pretreatment systems in both spray and dip configurations, designed for steel, aluminium, and galvanised substrates.',
  },
  {
    q: 'Why is a pretreatment line essential before powder coating?',
    a: 'Pretreatment is critical for powder coating quality and longevity — it removes surface contaminants that would cause adhesion failure and provides a phosphate conversion coating that dramatically improves corrosion protection and coating life.',
  },
]);

export default function PTLinePage() {
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
        { label: 'Pretreatment Line', href: '/products/optifinish-manufactured/pt-line' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="Iron Phosphating & Multi-Stage Systems"
      headline="Adhesion starts"
      headlineAccent="before the powder gun."
      subline="A multi-stage pretreatment system designed to prepare steel, aluminium, and galvanised substrates for maximum powder coating adhesion and corrosion resistance — from 3-stage basic iron phosphate to full 7-stage zinc phosphate systems."
      heroStats={[
        { val: '7-stage', label: 'Max zinc phosphate process' },
        { val: '500+', label: 'Hrs salt spray (7-stage)' },
        { val: 'Custom', label: 'Spray tunnel or dip tank' },
      ]}
      heroImageLabel="Pretreatment Line · multi-stage spray tunnel"

      installationCarousel={[
        { src: '/images/products/optifinish-manufactured/pt-line/product-shots/pt_line1.png', label: 'PT Line — Full spray tunnel installation' },
        { src: '/images/products/optifinish-manufactured/pt-line/product-shots/pt_line2.png', label: 'Multi-stage pretreatment line' },
        { src: '/images/products/optifinish-manufactured/pt-line/product-shots/pt_line3.png', label: 'Tank & tunnel assembly' },
        { src: '/images/products/optifinish-manufactured/pt-line/product-shots/pt_line4.png', label: 'Pretreatment line — side view' },
        { src: '/images/products/optifinish-manufactured/pt-line/product-shots/pt_line05.png', label: 'Installed PT line — production floor' },
      ]}

      enquireSlug="pt-line"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Powder coating failure"
      problemAccent="is almost always a PT failure."
      problemBody="The most common cause of coating delamination, corrosion creep, and adhesion failure in the field is not the powder — it's inadequate pretreatment. The substrate must be clean, phosphated, and passivated before powder enters the gun. Skipping or underdoing PT removes the foundation the coating needs to last."
      benefits={[
        '3-stage basic iron phosphate for standard steel substrates in mild-corrosion environments',
        '5-stage system adds derusting and passivation for improved corrosion resistance on pre-rusted substrates',
        '7-stage zinc phosphate delivers 500+ hours salt spray resistance per ISO 9227 — for high-corrosion applications',
        'Spray tunnel design for conveyorised production or dip tank for larger, complex geometries',
        'Electric immersion or steam heating; MS or SS-304 tank and tunnel construction',
        'Integrated drain, pump, and agitation systems as standard',
      ]}

      variants={[
        {
          id: 'stage3',
          label: '3-Stage',
          tag: 'Basic Iron Phosphate',
          headline: 'Degreasing → Iron Phosphate → Water Rinse',
          body: 'The 3-stage system covers degreasing, iron phosphate application, and water rinse. Suitable for clean steel substrates in controlled environments where corrosion exposure is limited — the most cost-effective starting point for standard industrial powder coating.',
          specs: [
            { l: 'Stage 1', v: 'Degreasing (alkali or mild acid)' },
            { l: 'Stage 2', v: 'Iron phosphate application' },
            { l: 'Stage 3', v: 'Water rinse' },
            { l: 'Best for', v: 'Clean steel; indoor or mild environment applications' },
          ],
          imageLabel: '3-stage PT line · basic iron phosphate',
          imageSrc: '/images/products/optifinish-manufactured/pt-line/variant-3stage.svg',
        },
        {
          id: 'stage5',
          label: '5-Stage',
          tag: 'Enhanced — Derusting + Passivation',
          headline: 'Degreasing → Derusting → Phosphate → Passivation → DI Rinse',
          body: 'Adds derusting (acid pickling) and passivation stages to the basic process — covering substrates with surface rust and improving corrosion resistance for parts exposed to moderate humidity and outdoor conditions.',
          specs: [
            { l: 'Stage 1', v: 'Degreasing' },
            { l: 'Stage 2', v: 'Derusting (acid pickling)' },
            { l: 'Stage 3', v: 'Iron phosphating' },
            { l: 'Stage 4', v: 'Passivation' },
            { l: 'Stage 5', v: 'DI water rinse' },
          ],
          imageLabel: '5-stage PT line · derusting and passivation',
          imageSrc: '/images/products/optifinish-manufactured/pt-line/variant-5stage.svg',
        },
        {
          id: 'stage7',
          label: '7-Stage',
          tag: 'Zinc Phosphate — Maximum Corrosion Resistance',
          headline: 'Full zinc phosphate for 500+ hrs salt spray performance.',
          body: 'The 7-stage zinc phosphate process is the industry standard for maximum corrosion protection — used in automotive, infrastructure, and heavy engineering where coating must withstand severe corrosion exposure. Delivers 500+ hours salt spray resistance per ISO 9227.',
          specs: [
            { l: 'Stages', v: 'Degreasing ×2 → Derusting → Activation → Zinc phosphate → Passivation → DI rinse' },
            { l: 'Corrosion performance', v: '500+ hrs salt spray (ISO 9227)' },
            { l: 'Substrates', v: 'Steel, aluminium, galvanised' },
            { l: 'Best for', v: 'Automotive, infrastructure, heavy engineering' },
          ],
          imageLabel: '7-stage zinc phosphate PT line',
          imageSrc: '/images/products/optifinish-manufactured/pt-line/variant-7stage.svg',
          imageWidth: 1120,
          imageHeight: 400,
        },
      ]}
      variantsSectionTitle="Select the right PT process for your application"

      specRows={[
        { l: '3-stage', v: 'Degreasing → Iron phosphate → Water rinse' },
        { l: '5-stage', v: 'Degreasing → Derusting → Phosphate → Passivation → DI rinse' },
        { l: '7-stage', v: 'Full zinc phosphate — degreasing ×2 → derusting → activation → zinc phosphate → passivation → DI rinse' },
        { l: 'Design type', v: 'Spray tunnel or dip tank (based on part geometry and throughput)' },
        { l: 'Heating', v: 'Electric immersion or steam' },
        { l: 'Tank construction', v: 'MS or SS-304' },
        { l: 'Corrosion resistance (7-stage)', v: '500+ hours salt spray per ISO 9227' },
        { l: 'Integration', v: 'Standalone batch or integrated with conveyorised line' },
      ]}

      applications={[
        'Steel fabrications for industrial and architectural applications',
        'Automotive components requiring high corrosion protection',
        'Agricultural machinery and outdoor equipment',
        'Electrical panels and switchgear enclosures',
        'Architectural aluminium profiles (anodise-quality pretreatment)',
        'Conveyorised and batch production lines',
      ]}
      applicationImages={[
        { src: '/images/products/optifinish-manufactured/pt-line/application/structural-steel-fabrication.jpg', label: 'Steel fabrications & architectural structures' },
        { src: '/images/products/optifinish-manufactured/pt-line/application/automotive-components.jpg', label: 'Automotive components — high corrosion protection' },
        { src: '/images/products/optifinish-manufactured/pt-line/application/agricultural-machinery.jpg', label: 'Agricultural machinery & outdoor equipment' },
        { src: '/images/products/optifinish-manufactured/pt-line/application/electrical-enclosures.webp', label: 'Electrical panels & switchgear enclosures' },
        { src: '/images/products/optifinish-manufactured/pt-line/application/aluminium-profiles.jpg', label: 'Architectural aluminium profiles' },
        { src: '/images/products/optifinish-manufactured/pt-line/application/conveyor-coating-line.jpg', label: 'Conveyorised & batch production lines' },
      ]}

      compatibilityTags={[
        'All OptiFinish powder spray booths',
        'Conveyorised monorail and chain-on-edge systems',
        'Batch dip-tank production lines',
        'Any powder coating gun system',
      ]}

      references={[]}

      related={[
        {
          name: 'Powder Coating Plant',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-coating-plant',
          enquireSlug: 'powder-coating-plant',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
        {
          name: 'Curing Oven',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/curing-oven',
          enquireSlug: 'curing-oven',
        },
      ]}

      ctaHeadline="Spec the right pretreatment."
      ctaAccent="Adhesion is the foundation."
      ctaBody="Tell OptiFinish your substrate, corrosion requirements, and throughput — we'll specify the right number of stages and system type for your application."
    />
    </>
  );
}
