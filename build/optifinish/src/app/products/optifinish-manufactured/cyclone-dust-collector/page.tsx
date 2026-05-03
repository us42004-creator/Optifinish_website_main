import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Cyclone & Dust Collector | OptiFinish Manufactured',
  description:
    'Modular powder recovery and filtration system. 92–96% cyclone recovery, 3000–32000 CMH airflow range. Secondary bag filter for CPCB compliance. MS or SS-304 construction.',
};

export default function CycloneDustCollectorPage() {
  return (
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
        },
        {
          name: 'PS Vibratory Sieve Machine',
          category: 'OptiFinish Automation',
          href: '/products/automation/sieve-machine',
          enquireSlug: 'sieve-machine',
        },
        {
          name: 'SS Booth System',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/ss-booth-system',
          enquireSlug: 'ss-booth-system',
        },
      ]}

      ctaHeadline="Size your recovery system."
      ctaAccent="92–96% recovery, CPCB compliant."
      ctaBody="Talk to OptiFinish about your booth dimensions, powder type, and airflow requirements — we'll specify the right cyclone and bag filter configuration."
    />
  );
}
