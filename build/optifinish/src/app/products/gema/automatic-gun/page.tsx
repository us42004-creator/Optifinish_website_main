import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'GEMA Automatic Powder Coating Gun | OptiFinish',
  description:
    'GEMA OptiGun with PowerBoost® — 110 kV electrostatic charging, Faraday cage penetration, and Digital Volume Control for automatic powder coating lines. Supplied by OptiFinish, authorised GEMA partner.',
};

export default function GEMAAutomaticGunPage() {
  return (
    <ProductPageTemplate
      theme="light"

      /* S1 — Hero */
      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'GEMA', href: '/products/gema' },
        { label: 'Automatic Powder Coating Gun', href: '/products/gema/automatic-gun' },
      ]}
      badge="GEMA — Authorised Partner"
      eyebrow="OptiGun with PowerBoost®"
      headline="110 kV charging."
      headlineAccent="Maximum penetration."
      subline="GEMA's OptiGun GA02/GA03 series delivers the highest electrostatic charging available on any production automatic gun — engineered for consistent finish quality on complex geometries and demanding Faraday cage areas."
      heroStats={[
        { val: '110 kV', label: 'PowerBoost® charging' },
        { val: 'PCC', label: 'Faraday penetration' },
        { val: 'DVC', label: 'Digital volume control' },
      ]}
      heroImageLabel="GEMA OptiGun GA03 automatic powder gun"
      heroImageAspect="aspect-[4/3]"
      heroVideoId="Q62RFZeSfSs"
      enquireSlug="gema-automatic-gun"
      backHref="/products/gema"
      backLabel="← Back to GEMA"

      /* S2 — Problem */
      problemHeadline="Conventional guns fail"
      problemAccent="on complex parts."
      problemBody="Recesses, channels, internal corners — wherever geometry creates a Faraday cage effect, conventional automatic guns produce thin or absent powder film. Rework rates climb. Rejects mount. The OptiGun with PowerBoost® and PCC Technology was engineered specifically to overcome these limitations."
      benefits={[
        '110 kV PowerBoost® — the highest electrostatic charging available on any production gun',
        'PCC Technology: Penetration & Corona Control for consistent film build in Faraday cage areas',
        'SuperCorona electrode delivers extended field reach on complex 3D geometries',
        'DVC: Digital Volume Control ensures every gun on the line outputs precisely the same powder volume',
        'MagicCylinder® option for rapid colour change on automatic production lines',
        'GemaConnect integration for remote monitoring, diagnostics, and production data',
      ]}

      /* S3 — Variants */
      variants={[
        {
          id: 'ga02',
          label: 'OptiGun GA02',
          tag: 'Standard Automatic',
          headline: 'The production standard for automatic powder coating.',
          body: 'The GA02 is the baseline OptiGun model — delivering consistent 110 kV PowerBoost® charging with DVC powder output control. Designed for high-volume production lines where throughput and coating consistency are the primary requirements. Compatible with all GEMA reciprocator and axis systems.',
          specs: [
            { l: 'Charging', v: '110 kV PowerBoost®' },
            { l: 'Powder control', v: 'DVC — Digital Volume Control' },
            { l: 'Electrode', v: 'Standard corona' },
            { l: 'Best for', v: 'High-volume flat and simple profile parts' },
          ],
          imageLabel: 'GEMA OptiGun GA02 · standard automatic gun',
          imageSrc: '/images/products/gema/automatic-gun/gema-automatic-gun.jpg',
        },
        {
          id: 'ga03',
          label: 'OptiGun GA03',
          tag: 'Advanced — PCC + SuperCorona',
          headline: 'Penetrate where no conventional gun reaches.',
          body: 'The GA03 adds PCC Technology (Penetration & Corona Control) and the SuperCorona electrode to the GA02 base — specifically engineered for complex 3D geometries, Faraday cage areas, internal channels, and recessed sections that defeat conventional electrostatic guns. The extended SuperCorona field reaches deep into recesses for consistent film build throughout.',
          specs: [
            { l: 'Charging', v: '110 kV PowerBoost®' },
            { l: 'Faraday penetration', v: 'PCC Technology — adjustable corona control' },
            { l: 'Electrode', v: 'SuperCorona — extended field reach' },
            { l: 'Best for', v: 'Automotive components, complex fabrications, recessed geometries' },
          ],
          imageLabel: 'GEMA OptiGun GA03 · PCC + SuperCorona automatic gun',
          imageSrc: '/images/products/gema/automatic-gun/gema-optigun-ga03-product-01.jpg',
        },
      ]}
      variantsSectionTitle="GA02 or GA03 — choose your specification"

      /* S4 — How It Works */
      steps={[
        {
          num: '01',
          title: 'Powder delivery',
          body: 'Powder is transported from the OptiCenter or hopper to the gun via a controlled Venturi system. DVC (Digital Volume Control) regulates the precise volume reaching each gun independently — ensuring every gun on a multi-gun line applies the same film build.',
          imageLabel: 'Step 01 · powder delivery to gun',
          imageSrc: '/images/products/gema/automatic-gun/venturi-system.jpg',
        },
        {
          num: '02',
          title: 'Electrostatic charging',
          body: 'As powder exits the gun tip, the 110 kV PowerBoost® generator and corona electrode electrostatically charge every particle. PCC Technology (GA03) adjusts the corona field dynamically to maximise penetration into Faraday cage areas without causing back-ionisation on flat sections.',
          imageLabel: 'Step 02 · electrostatic charging at gun tip',
          imageSrc: '/images/products/gema/automatic-gun/power-boost.jpg',
        },
        {
          num: '03',
          title: 'Wrap-around and adhesion',
          body: 'Charged particles follow electric field lines around the part — wrapping into recesses, onto reverse faces, and into internal corners. The SuperCorona electrode (GA03) extends the field reach for deep geometric penetration. Powder adheres electrostatically and is held until it enters the curing oven.',
          imageLabel: 'Step 03 · wrap-around adhesion on part',
          imageSrc: '/images/products/gema/automatic-gun/super-corona.png',
        },
      ]}
      howItWorksTitle="Charge, penetrate, adhere"

      /* S5 — Specs */
      specRows={[
        { l: 'Charging system', v: '110 kV PowerBoost® — highest production charging available' },
        { l: 'Faraday technology', v: 'PCC: Penetration & Corona Control (GA03)' },
        { l: 'Electrode', v: 'SuperCorona — extended field reach for complex geometries (GA03)' },
        { l: 'Powder output control', v: 'DVC: Digital Volume Control — precise per-gun output' },
        { l: 'Colour change', v: 'MagicCylinder® for fast colour change on automatic lines' },
        { l: 'Line control', v: 'MagicControl 4.0 integration — centralised line management' },
        { l: 'Remote monitoring', v: 'GemaConnect dashboard — diagnostics and maintenance alerts' },
        { l: 'Compatible powder centre', v: 'GEMA OC08 OptiCentre (all models)' },
        { l: 'Supplied by', v: 'OptiFinish — authorised GEMA partner, India' },
      ]}

      applicationImages={[
        { src: '/images/products/gema/automatic-gun/application/high-volume-line.avif', label: 'High-volume automatic powder coating line' },
        { src: '/images/products/gema/automatic-gun/application/automotive-components.jpg', label: 'Automotive components with complex geometries' },
        { src: '/images/products/gema/automatic-gun/application/powder-coated-aluminium-extrusion.webp', label: 'Architectural aluminium profiles and extrusions' },
        { src: '/images/products/gema/automatic-gun/application/electrical-equipments.webp', label: 'Electrical enclosures and cabinets' },
        { src: '/images/products/gema/automatic-gun/application/agri-equipment.jpg', label: 'Agricultural and construction equipment', fit: 'contain' },
        { src: '/images/products/gema/automatic-gun/application/powder-coated-pipes.jpg', label: 'Steel tube and pipe coating', fit: 'contain' },
      ]}

      /* S6 — Applications */
      applications={[
        'High-volume automatic powder coating production lines',
        'Automotive components with recesses, channels, and Faraday cage areas',
        'Architectural aluminium profiles and extrusions',
        'White goods and appliance outer panels',
        'Agricultural and construction equipment',
        'Electrical enclosures and cabinets',
        'Steel tube and pipe coating',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'GEMA ZA07 / ZA08 Reciprocator',
        'GEMA ZA15 / ZA16 / ZA17 Reciprocator',
        'OptiFinish ZA01 Reciprocator',
        'Z-TAP Robot (adapter)',
        'GEMA OC08 OptiCentre',
        'MagicControl 4.0',
        'All OptiFinish powder spray booths',
        'GemaConnect remote monitoring',
      ]}
      partnerNote="Supplied and supported in India by OptiFinish — authorised GEMA partner. All GEMA guns are covered by GEMA's global warranty programme and supported locally by the OptiFinish service team."

      /* S8 — References */
      references={[]}

      /* S9 — Related */
      related={[
        {
          name: 'GEMA Reciprocators & Axes',
          category: 'GEMA',
          href: '/products/gema/reciprocators',
          enquireSlug: 'gema-reciprocators',
          imageSrc: '/images/products/gema/reciprocators/gema-reciprocator-01.jpg',
        },
        {
          name: 'OptiCentre Powder Management',
          category: 'GEMA',
          href: '/products/gema/opticentre',
          enquireSlug: 'gema-opticentre',
          imageSrc: '/images/products/gema/opticentre/gema-opticenter-oc07-oc08-01.jpg',
        },
        {
          name: 'Opti Recip ZA01',
          category: 'OptiFinish Automation',
          href: '/products/automation/za01',
          enquireSlug: 'za01',
        },
      ]}

      /* S10 — CTA */
      ctaHeadline="Specify your automatic line."
      ctaAccent="We'll build the case."
      ctaBody="Talk to OptiFinish about the right GEMA automatic gun for your line — production volume, part geometry, colour change frequency, and integration with your existing reciprocator or booth."
    />
  );
}
