import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Powder Spray Booth | OptiFinish Manufactured',
  description:
    'MS and SS-304 powder spray booths with 92–96% Venturi cyclone recovery. CPCB-compliant secondary bag filter. 20HP suction motor. Custom dimensions. Manufactured in Greater Noida.',
};

export default function PowderSprayBoothPage() {
  return (
    <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'Powder Spray Booth', href: '/products/optifinish-manufactured/powder-spray-booth' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="MS / SS-304 — Manual & Automatic"
      headline="92–96% powder recovery."
      headlineAccent="Built into the booth."
      subline="A powder spray enclosure with integrated SS-304 Venturi recovery system and secondary bag filter — recovering 92–96% of over-sprayed powder and returning it to the hopper, continuously, without manual intervention."
      heroStats={[
        { val: '92–96%', label: 'Powder recovery rate' },
        { val: '20HP', label: 'Suction motor' },
        { val: 'CPCB', label: 'Compliant exhaust' },
      ]}
      heroImageLabel="Powder Spray Booth · Venturi recovery system"
      heroVideoId="F6vcqBwbsOQ"
      heroVideoPortrait
      mediaShowcase={[
        {
          id: 'automatic',
          label: 'Automatic',
          videoSrc: '/images/products/spray-booth/automatic/automatic-booth.mp4',
          images: [
            { src: '/images/products/spray-booth/automatic/automatic-booth-inside.jpeg', alt: 'Automatic booth interior' },
            { src: '/images/products/spray-booth/automatic/ss-booth.jpeg', alt: 'SS-304 booth construction' },
            { src: '/images/products/spray-booth/automatic/plastic-booth-cropped.jpeg', alt: 'Plastic modular booth' },
            { src: '/images/products/spray-booth/automatic/automatic-booth-guns.jpeg', alt: 'Automatic gun setup' },
          ],
        },
        {
          id: 'manual',
          label: 'Manual',
          videoSrc: '/images/products/spray-booth/manual/manual-booth.mp4',
          images: [
            { src: '/images/products/spray-booth/manual/manual1.jpg', alt: 'Manual powder spray booth' },
            { src: '/images/products/spray-booth/manual/booth-exterior.jpeg', alt: 'Booth exterior view' },
            { src: '/images/products/spray-booth/manual/car-painting-booth.jpeg', alt: 'Car painting booth' },
            { src: '/images/products/spray-booth/manual/semi_automatic_booth.jpeg', alt: 'Semi-automatic booth', objectPosition: '20% center' },
          ],
        },
      ]}
      enquireSlug="powder-spray-booth"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Powder waste is"
      problemAccent="your most controllable cost."
      problemBody="Over-sprayed powder that isn't recovered is powder you paid for and threw away. A well-designed booth with an efficient Venturi recovery system and correctly sized cyclone recovers 92–96% of over-sprayed powder and routes it back to the hopper — dramatically reducing material costs and keeping the booth clean."
      benefits={[
        'SS-304 Venturi tube array — 92–96% powder recovery by centrifugal separation without moving parts',
        '20HP suction motor with Siemens-class VFD panel — consistent negative pressure throughout the booth',
        'Secondary bag filter captures residual fine particles before exhaust — CPCB compliant',
        'Compatible with GEMA manual/automatic guns, OptiFinish ZA01, Z-TAP, and all standard powder guns',
        'MS standard construction or full SS-304 for demanding environments',
        'Custom internal dimensions — matched to your part envelope and gun layout',
      ]}

      specRows={[
        { l: 'Standard internal size', v: '5000 × 1200 × 3050 mm (custom to part and gun layout)' },
        { l: 'Construction', v: 'MS standard; full SS-304 available' },
        { l: 'Recovery system', v: 'SS-304 Venturi tube array — 92–96% powder recovery' },
        { l: 'Suction motor', v: '20HP; Siemens-class VFD electrical panel' },
        { l: 'Airflow', v: '8,000–32,000 CMH depending on booth size' },
        { l: 'Secondary filter', v: 'Bag filter — CPCB particulate emission compliant' },
        { l: 'Lighting', v: 'Explosion-proof LED strip lights' },
        { l: 'Access', v: 'Hinged access panels both sides' },
        { l: 'Reference (Amaze Power)', v: '5000 × 1800 × 2660 mm; 150 Nm³/h; 50kW total installed load' },
      ]}

      applications={[
        'Standard powder coating — epoxy, polyester, PU formulations',
        'Automotive component coating',
        'White goods and appliance production',
        'Architectural aluminium profiles',
        'Custom colour batch operations',
        'Metallic and textured powder applications',
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
        'GEMA OptiFlex Pro (all models)',
        'GEMA OptiGun GA02 / GA03',
        'OptiFinish ZA01 Reciprocator',
        'Z-TAP Robot System',
        'All standard automatic powder guns',
        'OptiFinish Cyclone & Dust Collector',
        'GEMA OC08 OptiCentre',
      ]}

      references={[
        {
          client: 'Amaze Power Pvt Ltd',
          desc: '5000 × 1800 × 2660 mm powder spray booth — 150 Nm³/h airflow, 50kW total installed load. Integrated with conveyorised line and GEMA automatic gun system.',
        },
        {
          client: 'Skand Creations',
          desc: 'Powder coating plant quotation including booth and cyclone recovery system.',
        },
      ]}

      related={[
        {
          name: 'Cyclone & Dust Collector',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/cyclone-dust-collector',
          enquireSlug: 'cyclone-dust-collector',
        },
        {
          name: 'SS Booth System',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/ss-booth-system',
          enquireSlug: 'ss-booth-system',
        },
        {
          name: 'Manual Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/manual-gun',
          enquireSlug: 'gema-manual-gun',
        },
      ]}

      ctaHeadline="Specify your powder spray booth."
      ctaAccent="92–96% recovery, built in."
      ctaBody="Give OptiFinish your part dimensions, gun count, and throughput requirements — we'll design the booth with correct airflow, Venturi sizing, and motor specification."
    />
  );
}
