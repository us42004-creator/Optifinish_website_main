import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Liquid Spray Booth | OptiFinish Manufactured',
  description:
    'MS liquid spray booth for solvent-based and water-based paint applications. 7000 CMH airflow, 5HP suction motor. Water wash or dry filter options. CPCB compliant. Custom dimensions.',
};

export default function LiquidSprayBoothPage() {
  return (
    <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'Liquid Spray Booth', href: '/products/optifinish-manufactured/liquid-spray-booth' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="MS Construction — Wet Paint Applications"
      headline="Controlled environment"
      headlineAccent="for liquid coating."
      subline="A downdraft liquid spray booth for solvent-based and water-based paint application — with high-velocity air extraction, water wash or dry filter paint mist capture, and CPCB emission-compliant exhaust design."
      heroStats={[
        { val: '7000', label: 'CMH airflow' },
        { val: 'CPCB', label: 'Compliant exhaust' },
        { val: 'Custom', label: 'Dimensions available' },
      ]}
      heroImageLabel="Liquid Spray Booth · downdraft design"
      galleryLayout="bento"
      photoGallery={[
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/car-painting-booth.jpg', label: 'Car Painting Booth' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/liquid-single-operator-booth.png', label: 'Single Operator Booth', objectPosition: 'center 8%' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/cartridge-filter-booth.png', label: 'Cartridge Filter Booth', fit: 'contain' },
      ]}
      enquireSlug="liquid-spray-booth"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Liquid spray without"
      problemAccent="extraction is a hazard."
      problemBody="Solvent vapours and paint mist accumulate rapidly in uncontrolled environments — creating fire risk, health hazards, and finish contamination from airborne particles. A properly designed liquid spray booth maintains negative pressure, extracts solvent vapour at source, and captures paint mist before it reaches the exhaust."
      benefits={[
        'High-velocity cross-draft or downdraft air extraction captures solvent vapour and paint mist at source',
        'Water wash (wet scrubber) option for water-based and high-volume solvent paint operations',
        'Dry fibre filter option — lower maintenance, suited for lower-volume applications',
        'CPCB emission-compliant exhaust design — meets particulate discharge norms',
        'Explosion-proof lighting provision included as standard',
        'Compatible with all Dürr EcoGun liquid spray gun systems and EcoPump fluid supply',
      ]}

      specRows={[
        { l: 'Standard internal size', v: '2450 × 1500 × 1800 mm (custom dimensions available)' },
        { l: 'Airflow', v: '7,000 CMH' },
        { l: 'Suction motor', v: '5HP' },
        { l: 'Construction', v: 'MS sheet, powder-coated' },
        { l: 'Paint mist capture', v: 'Water wash (wet scrubber) or dry fibre filter' },
        { l: 'Paint compatibility', v: 'Solvent-based, water-based, 1K and 2K systems' },
        { l: 'Lighting', v: 'Explosion-proof luminaires' },
        { l: 'Exhaust', v: 'CPCB emission compliant' },
        { l: 'Reference (Steelux)', v: '2450 × 1500 × 1800 mm; 7000 CMH; 5HP — ₹3.3 L total system' },
      ]}

      applications={[
        'Automotive body & component painting',
        'Wood lacquering & solid furniture finishing',
        'Industrial parts liquid topcoat application',
        'High-build industrial topcoat',
        'Appliance & consumer goods coating lines',
        'High-production paint lines',
      ]}
      applicationImages={[
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/application/car-spray.jpeg', label: 'Automotive body & component painting' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/application/solid-wood-lacquer.webp', label: 'Wood lacquering & furniture finishing' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/application/industrial-metal-parts-coating.jpg', label: 'Industrial parts liquid topcoat' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/application/high-build-industrial-top-coat.jpeg', label: 'High-build industrial topcoat' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/application/appliance-coating-line.jpg', label: 'Appliance & consumer goods coating' },
        { src: '/images/products/optifinish-manufactured/liquid-spray-booth/application/high-production-paint-line.webp', label: 'High-production paint lines' },
      ]}

      compatibilityTags={[
        'Dürr EcoGun series (all liquid gun models)',
        'Dürr EcoPump fluid supply packages',
        'Dürr EcoDose 2K / 3K dosing systems',
        'All standard liquid spray gun brands',
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
          name: 'Cup Gun',
          category: 'Dürr',
          href: '/products/durr/cup-gun',
          enquireSlug: 'durr-cup-gun',
        },
        {
          name: 'HVLP Spray Gun',
          category: 'Dürr',
          href: '/products/durr/hvlp-gun',
          enquireSlug: 'durr-hvlp-gun',
        },
      ]}

      ctaHeadline="Specify your liquid spray booth."
      ctaAccent="We'll design the extraction right."
      ctaBody="Talk to OptiFinish about your paint type, part size, and volume — we'll design the airflow, mist capture system, and booth dimensions for your application."
    />
  );
}
