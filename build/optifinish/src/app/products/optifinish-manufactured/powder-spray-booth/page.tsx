import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Powder Spray Booth | OptiFinish Manufactured',
  description:
    'MS and SS-304 powder spray booths with 98% Venturi cyclone recovery. CPCB-compliant secondary bag filter. 20HP suction motor. Custom dimensions. Manufactured in Greater Noida.',
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
      headline="98% powder recovery."
      headlineAccent="Built into the booth."
      subline="A powder spray enclosure with integrated SS-304 Venturi recovery system and secondary bag filter — recovering 98% of over-sprayed powder and returning it to the hopper, continuously, without manual intervention."
      heroStats={[
        { val: '98%', label: 'Powder recovery rate' },
        { val: '20HP', label: 'Suction motor' },
        { val: 'CPCB', label: 'Compliant exhaust' },
      ]}
      heroImageLabel="Powder Spray Booth · Venturi recovery system"
      enquireSlug="powder-spray-booth"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Powder waste is"
      problemAccent="your most controllable cost."
      problemBody="Over-sprayed powder that isn't recovered is powder you paid for and threw away. A well-designed booth with an efficient Venturi recovery system and correctly sized cyclone recovers 98% of over-sprayed powder and routes it back to the hopper — dramatically reducing material costs and keeping the booth clean."
      benefits={[
        'SS-304 Venturi tube array — 98% powder recovery by centrifugal separation without moving parts',
        '20HP suction motor with Siemens-class VFD panel — consistent negative pressure throughout the booth',
        'Secondary bag filter captures residual fine particles before exhaust — CPCB compliant',
        'Compatible with GEMA manual/automatic guns, OptiFinish ZA01, Z-TAP, and all standard powder guns',
        'MS standard construction or full SS-304 for demanding environments',
        'Custom internal dimensions — matched to your part envelope and gun layout',
      ]}

      specRows={[
        { l: 'Standard internal size', v: '5000 × 1200 × 3050 mm (custom to part and gun layout)' },
        { l: 'Construction', v: 'MS standard; full SS-304 available' },
        { l: 'Recovery system', v: 'SS-304 Venturi tube array — 98% powder recovery' },
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
      ctaAccent="98% recovery, built in."
      ctaBody="Give OptiFinish your part dimensions, gun count, and throughput requirements — we'll design the booth with correct airflow, Venturi sizing, and motor specification."
    />
  );
}
