import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Powder Coating Plant — Turnkey Conveyorised Lines | OptiFinish',
  description:
    'Complete turnkey powder coating plant — manual batch or fully conveyorised automatic. 375+ plants installed across India. Custom engineered, manufactured, and commissioned from our Greater Noida facility.',
  keywords: [
    'powder coating plant India',
    'turnkey powder coating plant',
    'conveyorised powder coating line',
    'powder coating plant manufacturer India',
    'powder coating plant manufacturer Greater Noida',
    'automatic powder coating plant India',
    'manual powder coating plant India',
    'powder coating plant price India',
    'industrial powder coating plant',
    'OptiFinish powder coating plant',
  ],
  alternates: { canonical: `${SITE.url}/products/optifinish-manufactured/powder-coating-plant` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Powder Coating Plant — Turnkey Conveyorised Lines | OptiFinish',
    description: 'Turnkey powder coating plants — manual batch or fully conveyorised. 375+ installations across India. Custom engineered from OptiFinish, Greater Noida.',
    url: `${SITE.url}/products/optifinish-manufactured/powder-coating-plant`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Powder Coating Plant — Turnkey Lines | OptiFinish',
    description: '375+ powder coating plants installed across India. Turnkey, conveyorised, custom-engineered.',
  },
};

const productLD = productSchema({
  name: 'Powder Coating Plant',
  description: 'Complete turnkey powder coating plant — manual batch or fully conveyorised automatic lines. Custom engineered, manufactured, and commissioned by OptiFinish from Greater Noida, India.',
  url: '/products/optifinish-manufactured/powder-coating-plant',
  category: 'Industrial Coating Equipment',
  keywords: ['powder coating plant', 'conveyorised coating line', 'turnkey coating plant', 'powder coating equipment India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
  { name: 'Powder Coating Plant', href: '/products/optifinish-manufactured/powder-coating-plant' },
]);

const faqLD = faqSchema([
  {
    q: 'What is the cost of a powder coating plant in India?',
    a: 'The cost of a powder coating plant in India varies based on line length, capacity, level of automation, and substrate requirements. OptiFinish manufactures both manual batch plants and fully conveyorised automatic lines — contact us at +91-96434-03374 or optifinish.in/contact for a customised quote.',
  },
  {
    q: 'Does OptiFinish provide turnkey powder coating plant installation?',
    a: 'Yes. OptiFinish provides complete turnkey powder coating plant solutions — including design, fabrication, installation, commissioning, and post-commissioning support — from our Greater Noida manufacturing facility.',
  },
  {
    q: 'What types of powder coating plants does OptiFinish manufacture?',
    a: 'OptiFinish manufactures manual batch plants, semi-automatic, and fully conveyorised powder coating plants integrating pretreatment, powder booth, curing oven, and conveyor systems tailored to production requirements.',
  },
]);

export default function PowderCoatingPlantPage() {
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
        { label: 'Powder Coating Plant', href: '/products/optifinish-manufactured/powder-coating-plant' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="Conveyorised Line — Manual & Automatic"
      headline="Complete line."
      headlineAccent="One roof. One team."
      subline="A turnkey powder coating plant engineered, fabricated, assembled, and commissioned by OptiFinish — from a 5-metre manual batch line to a 300-metre fully automatic conveyorised production system. 375+ plants installed across Indian industry."
      heroStats={[
        { val: '375+', label: 'Manual plants installed' },
        { val: '75+', label: 'Conveyor lines delivered' },
        { val: '14+', label: 'Years in production' },
      ]}
      heroImageLabel="Powder Coating Plant · conveyorised line"
      heroVideoSrc="/images/products/powder-coating-plant/powder-coating-hero.mp4"
      showcaseImages={[
        { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant2.jpeg', alt: 'Powder coating plant installation — conveyor line' },
        { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant1.jpeg', alt: 'Powder coating plant — booth and recovery system' },
        { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant3.jpeg', alt: 'Powder coating plant — full line overview' },
      ]}
      enquireSlug="powder-coating-plant"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="A powder coating line has"
      problemAccent="too many moving parts to outsource."
      problemBody="Sourcing a pretreatment line from one supplier, a booth from another, an oven from a third, and controls from a fourth creates integration risk, commissioning delays, and a service nightmare. Every OptiFinish powder coating plant is designed, built, and commissioned as a single system by one team."
      benefits={[
        'Every component — booth, oven, PT line, conveyor, controls — manufactured under one roof at Greater Noida',
        'Custom-engineered to your part size, throughput, substrate, and floor layout',
        'Manual batch and fully conveyorised automatic configurations',
        'Siemens PLC control panels with VFD drives on all major motors',
        'Full site commissioning and operator training included — we don\'t leave until it runs',
        '375+ manual plants and 75+ conveyor lines installed across Indian industry',
      ]}

      steps={[
        {
          num: '01',
          title: 'Pretreatment',
          body: 'Parts enter the pretreatment tunnel — a multi-stage spray or dip system that cleans, degreases, phosphates, and passivates the substrate. Proper PT is the foundation of coating adhesion. OptiFinish designs PT stages from 3-stage basic iron phosphate to full 7-stage zinc phosphate systems.',
          imageLabel: 'Step 01 · pretreatment tunnel — cleaning and phosphating',
          imageSrc: '/images/products/optifinish-manufactured/powder-coating-plant/step-01-pretreatment.svg',
        },
        {
          num: '02',
          title: 'Powder application',
          body: 'Dried parts enter the powder spray booth where manual or automatic guns electrostatically apply powder coating. The integrated Venturi recovery system reclaims over-sprayed powder at 92–96% efficiency and returns it to the hopper.',
          videoId: 'F6vcqBwbsOQ',
        },
        {
          num: '03',
          title: 'Curing and unloading',
          body: 'Powder-coated parts enter the curing oven at 180–200°C where the powder melts, flows, and cross-links into a hard, durable coating. After the cooling section, parts are unloaded from the conveyor — the full cycle is continuous, automatic, and repeatable at the specified line speed.',
          imageLabel: 'Step 03 · curing oven and part unloading',
          imageSrc: '/images/products/optifinish-manufactured/powder-coating-plant/step-03-curing-unloading.svg',
        },
      ]}
      howItWorksTitle="PT → Booth → Oven → Unload"

      specRows={[
        { l: 'Configuration', v: 'Manual batch / Fully conveyorised automatic' },
        { l: 'Substrates', v: 'MS steel, aluminium, galvanised, aluminium extrusions' },
        { l: 'PT stages', v: '3-stage (basic iron phosphate) to 7-stage (zinc phosphate)' },
        { l: 'Oven type', v: 'Gas-fired (LPG/PNG) or electric; tunnel or batch' },
        { l: 'Conveyor', v: 'Monorail overhead; chain-on-edge; power & free' },
        { l: 'Line speed', v: 'Custom to throughput — typically 0.5–4 m/min' },
        { l: 'Control panel', v: 'Siemens PLC; VFD drives on all major motors' },
        { l: 'Powder booth', v: 'MS or SS-304 with integrated Venturi cyclone recovery' },
        { l: 'Electrical', v: '3-phase 415V, 50Hz; total load per line specification' },
      ]}

      applications={[
        'Automotive components — wheels, chassis, frames, body parts',
        'White goods — washing machines, refrigerator panels, ACs',
        'Steel and aluminium furniture manufacturing',
        'Agricultural and construction equipment',
        'Electrical enclosures and switchgear panels',
        'Architectural aluminium profiles and extrusions',
        'General engineering fabrications',
      ]}
      applicationImages={[
        { src: '/images/products/gema/automatic-gun/application/automotive-components.jpg', label: 'Automotive components' },
        { src: '/images/products/durr/electrostatic-gun/application/consumer-goods-and-appliances.jpg', label: 'White goods & appliances' },
        { src: '/images/products/vinayak/liquid-paint/application/furniture.jpg', label: 'Steel & aluminium furniture' },
        { src: '/images/products/gema/automatic-gun/application/agri-equipment.jpg', label: 'Agricultural & construction equipment' },
        { src: '/images/products/gema/automatic-gun/application/electrical-equipments.webp', label: 'Electrical enclosures & switchgear' },
        { src: '/images/products/gema/automatic-gun/application/powder-coated-aluminium-extrusion.webp', label: 'Architectural aluminium profiles' },
      ]}

      compatibilityTags={[
        'GEMA OptiFlex Pro manual guns',
        'GEMA OptiGun automatic guns',
        'OptiFinish ZA01 Reciprocator',
        'Z-TAP Robot System',
        'OptiFinish Cyclone & Dust Collector',
        'OptiFinish PS Vibratory Sieve',
        'GEMA OC08 OptiCentre',
      ]}

      references={[]}

      related={[
        {
          name: 'Curing Oven',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/curing-oven',
          enquireSlug: 'curing-oven',
          imageSrc: '/images/products/optifinish-manufactured/curing-oven/industrial_oven.png',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
        {
          name: 'Cyclone & Dust Collector',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/cyclone-dust-collector',
          enquireSlug: 'cyclone-dust-collector',
          imageSrc: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-dust-collect.png',
        },
      ]}

      ctaHeadline="Specify your powder coating line."
      ctaAccent="We'll build it."
      ctaBody="Give us your part size, throughput requirement, substrate, and floor dimensions — OptiFinish will design, quote, and deliver the complete line."
    />
    </>
  );
}
