import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Cyclone & Dust Collector — 92–96% Powder Recovery | OptiFinish',
  description:
    'Modular cyclone and dust collector systems manufactured by OptiFinish — 92–96% first-pass powder recovery, 3,000–32,000 CMH airflow, MS or SS-304 construction, secondary bag filter for CPCB compliance.',
  keywords: [
    'cyclone dust collector India',
    'powder recovery system India',
    'cyclone separator powder coating',
    'bag filter powder coating India',
    'CPCB compliant dust collector',
    'OptiFinish cyclone',
    'powder coating recovery system manufacturer',
  ],
  alternates: { canonical: `${SITE.url}/products/optifinish-manufactured/cyclone-dust-collector` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Cyclone & Dust Collector — 92–96% Powder Recovery | OptiFinish',
    description: 'Modular cyclone and dust collector — 92–96% first-pass powder recovery, 3,000–32,000 CMH, CPCB compliant. Manufactured by OptiFinish.',
    url: `${SITE.url}/products/optifinish-manufactured/cyclone-dust-collector`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Cyclone & Dust Collector — 92–96% Recovery | OptiFinish',
    description: 'Cyclone and dust collector: 92–96% powder recovery, 3,000–32,000 CMH airflow, CPCB compliant secondary bag filter.',
  },
};

const productLD = productSchema({
  name: 'Cyclone & Dust Collector',
  description: 'Modular cyclone and dust collector systems manufactured by OptiFinish — 92–96% first-pass powder recovery, 3,000–32,000 CMH airflow, MS or SS-304 construction, secondary bag filter for CPCB compliance.',
  url: '/products/optifinish-manufactured/cyclone-dust-collector',
  category: 'Industrial Filtration Equipment',
  keywords: ['cyclone dust collector', 'powder recovery system', 'cyclone separator', 'bag filter powder coating', 'CPCB dust collector'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
  { name: 'Cyclone & Dust Collector', href: '/products/optifinish-manufactured/cyclone-dust-collector' },
]);

const faqLD = faqSchema([
  {
    q: "What recovery rate does OptiFinish's cyclone dust collector achieve?",
    a: 'OptiFinish cyclone dust collectors achieve 92–96% first-pass powder recovery. A secondary bag filter captures residual fines, making the system fully CPCB compliant.',
  },
  {
    q: 'What airflow range does the cyclone system cover?',
    a: 'OptiFinish cyclone systems are available from 3,000 CMH to 32,000 CMH, configured to match booth size and powder throughput requirements.',
  },
  {
    q: 'Can the cyclone be used with any powder coating booth?',
    a: 'Yes. OptiFinish cyclone and dust collector systems are modular and can be integrated with new powder coating booths or retrofitted to existing installations.',
  },
]);

export default function CycloneDustCollectorPage() {
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
        { label: 'Cyclone & Dust Collector', href: '/products/optifinish-manufactured/cyclone-dust-collector' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="92–96% Recovery — 3,000 to 32,000 CMH"
      headline="Recover the powder."
      headlineAccent="Meet the norms."
      subline="A modular powder recovery and exhaust filtration system — deployed standalone or integrated within any OptiFinish booth — delivering 92–96% powder reclaim efficiency and CPCB-compliant exhaust across a 3,000–32,000 CMH airflow range."
      heroStats={[
        { val: '92–96%', label: 'Cyclone recovery rate' },
        { val: '32,000', label: 'Max CMH airflow' },
        { val: 'CPCB', label: 'Compliant exhaust' },
      ]}
      heroImageLabel="Cyclone & Dust Collector · powder recovery system"
      heroImageSrc="/images/products/optifinish-manufactured/cyclone-dust-collector/dust-collector-cyclone-01.png"
      heroImageAspect="aspect-[5/4]"
      heroImageCover
      photoGallery={[
        { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-dust-collect.png', label: 'Full Line View' },
        { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone001.png', label: 'Compact Setup' },
        { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone.png', label: 'Factory Installation' },
        { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-and-dust-collector.png', label: 'Cyclone & Dust Collector', objectPosition: '65% center' },
        { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/dust-collector.jpeg', label: 'Dust Collector Unit' },
      ]}

      enquireSlug="cyclone-dust-collector"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Powder escaping the booth"
      problemAccent="is money and a compliance failure."
      problemBody="Over-sprayed powder that isn't captured by the primary recovery system goes one of two places: back into the working environment or out of the exhaust stack. Both are problems — one is a health hazard and waste, the other is a CPCB violation. The cyclone and bag filter system handles both with one modular unit."
      benefits={[
        'Primary cyclone stage: 92–96% powder recovery by centrifugal force — no moving parts in the powder stream',
        'Recovered powder returns directly to the hopper — continuous, closed-loop recovery without manual intervention',
        'Secondary bag filter polishes exhaust air to CPCB particulate emission compliance',
        'Modular design: bag replacement without production shutdown; accessible panels for maintenance',
        'Pulse-jet cleaning system available for continuous operation without manual filter cleaning',
        'Compatible with all powder types: epoxy, polyester, PU, metallic, textured, and fine-particle grades',
      ]}

      specRows={[
        { l: 'Airflow range', v: '3,000–32,000 CMH (sized to booth dimensions and production load)' },
        { l: 'Primary stage', v: 'Cyclone separator — 92–96% powder recovery by centrifugal separation' },
        { l: 'Secondary stage', v: 'Bag filter — CPCB compliant particulate exhaust' },
        { l: 'Construction', v: 'MS or SS-304' },
        { l: 'Powder compatibility', v: 'Epoxy, polyester, PU, metallic, textured, fine-particle grades' },
        { l: 'Cleaning system', v: 'Pulse-jet cleaning available for continuous operation' },
        { l: 'Maintenance', v: 'Bag replacement without production shutdown; modular access panels' },
        { l: 'Deployment', v: 'Standalone unit or integrated within OptiFinish booth' },
      ]}

      applications={[
        'Integration with powder spray booths (MS, SS, PP types)',
        'Standalone powder recovery for existing installations without cyclone',
        'Retrofit for CPCB-compliant exhaust on older systems',
        'High-volume production lines with large airflow requirements',
        'Operations running metallic or fine-particle powder types',
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
        'All OptiFinish booth types (MS, SS-304, PP)',
        'GEMA OC08 OptiCentre (complementary)',
        'OptiFinish PS Vibratory Sieve (downstream)',
        'Third-party booth installations',
        'All powder types and formulations',
      ]}

      references={[]}

      related={[
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
        {
          name: 'PS Vibratory Sieve Machine',
          category: 'OptiFinish Automation',
          href: '/products/automation/sieve-machine',
          enquireSlug: 'sieve-machine',
          imageSrc: '/images/products/sieve-machine/sieve-machine-02.jpg',
        },
        {
          name: 'SS Booth System',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/ss-booth-system',
          enquireSlug: 'ss-booth-system',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/booth-exterior.jpeg',
        },
      ]}

      ctaHeadline="Size your recovery system."
      ctaAccent="92–96% recovery, CPCB compliant."
      ctaBody="Talk to OptiFinish about your booth dimensions, powder type, and airflow requirements — we'll specify the right cyclone and bag filter configuration."
    />
    </>
  );
}
