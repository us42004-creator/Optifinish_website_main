import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr 2K Dosing System | EcoDose 2K | OptiFinish',
  description:
    'Dürr EcoDose 2K electronic two-component dosing system. 40–4000 cc/min flow range. Coriolis or gear flowmeter precision. Pot life monitoring. Supplied by OptiFinish.',
};

export default function DurrEcoDose2KPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: '2K Dosing System', href: '/products/durr/ecodose-2k' },
      ]}
      badge="Dürr — Dosing System"
      eyebrow="EcoDose 2K — Two-Component Electronic Dosing"
      headline="Precise 2K mixing."
      headlineAccent="Every shot. Every time."
      subline="An electronic dosing system for two-component paint processes — delivering precisely consistent mixing ratios across a wide viscosity range, with automatic colour change capability, independent flushing circuits, and real-time pot life monitoring."
      heroStats={[
        { val: '4,000', label: 'cc/min max flow rate' },
        { val: 'Coriolis', label: 'Flowmeter precision' },
        { val: 'Real-time', label: 'Pot life monitoring' },
      ]}
      heroImageLabel="Dürr EcoDose 2K · two-component electronic dosing"
      heroImageAspect="aspect-[4/3]"
      heroVideoId="_pYiT0MfKmM"
      enquireSlug="durr-ecodose-2k"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Manual 2K mixing"
      problemAccent="is consistently inconsistent."
      problemBody="Manual mixing of two-component paints — catalyst ratio measured by eye, bucket, or rough volume — produces ratio variation that shows up as soft spots, incomplete cure, early delamination, and corrosion in service. Every off-ratio mix is a potential warranty claim. The EcoDose 2K eliminates human ratio error entirely."
      benefits={[
        'Electronic dosing delivers consistent catalyst ratios across the full production shift — no operator variation',
        'Flow rate range 40–4,000 cc/min covers low-flow touch-up to full production volume',
        'Coriolis flowmeter option: mass-flow measurement independent of viscosity or temperature variation',
        'Gear flowmeter option: volume-controlled precision dosing at lower system cost',
        'Real-time pot life monitoring with catalyst ratio tracking and process alerts',
        'Independent flushing circuits for each component — no premixing chamber, minimal waste at colour change',
      ]}

      steps={[
        {
          num: '01',
          title: 'Component supply and metering',
          body: 'Base paint (Component A) and catalyst/hardener (Component B) are supplied from separate EcoPump packages to the EcoDose 2K dosing unit. The Coriolis or gear flowmeters measure the exact volume or mass of each component independently — in real time, continuously.',
          imageLabel: 'Step 01 · independent component supply to EcoDose 2K metering unit',
          imageSrc: '/images/products/durr/ecodose-2k/durr-ecodose2k-app-01.webp',
        },
        {
          num: '02',
          title: 'Precision ratio control',
          body: 'The EcoDose 2K controls the output of each component to maintain the programmed mix ratio — compensating for any viscosity or pressure variations in the supply lines. The system continuously monitors actual vs programmed ratio and alerts if deviation exceeds set limits. Pot life is tracked in real time.',
          imageLabel: 'Step 02 · precision ratio control and real-time monitoring',
          imageSrc: '/images/products/durr/ecodose-2k/durr-2acu.jpg',
        },
        {
          num: '03',
          title: 'Colour change and flushing',
          body: 'When a colour change is required, the EcoDose 2K flushes each component circuit independently — no premixing chamber means no mixed paint to purge. Component A flushes without contaminating component B\'s circuit. Fast, low-waste colour change is built into the system design.',
          imageLabel: 'Step 03 · independent flushing circuits — fast colour change without waste',
          imageSrc: '/images/products/durr/ecodose-2k/durr-step3.webp',
        },
      ]}
      howItWorksTitle="Measure, ratio, flush"

      applicationImages={[
        { src: '/images/products/durr/bell-atomiser/application/car spray.jpeg', label: 'Automated production paint line' },
        { src: '/images/products/durr/ecodose-2k/application/automotive-spray-booth.jpg', label: 'Automotive 2K topcoat — spray booth' },
        { src: '/images/products/durr/ecodose-2k/application/industrial-2k-coating.jpg', label: 'Industrial 2K structural coating' },
        { src: '/images/products/durr/ecodose-2k/application/industrial-spray-metal.jpg', label: '2K epoxy & primer on structural steel' },
      ]}

      specRows={[
        { l: 'Flow rate range', v: '40–4,000 cc/min — covers touch-up to full production' },
        { l: 'Metering accuracy', v: 'Coriolis flowmeter (mass-flow) or gear flowmeter (volume-flow)' },
        { l: 'Pot life monitoring', v: 'Real-time catalyst ratio tracking with process alerts' },
        { l: 'Flushing', v: 'Independent circuits for each component — no premixing chamber' },
        { l: 'Paint compatibility', v: 'Solvent-based and water-based 2K formulations' },
        { l: 'Viscosity range', v: 'Wide — consistent ratio control across viscosity variation' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        '2-component polyurethane (2K PU) topcoat production lines',
        '2-component epoxy primer and coating applications',
        'Automotive OEM and tier 1 2K paint systems',
        'Industrial coating requiring precise catalyst ratios for consistent cure',
        'Any 2K coating process where manual mixing introduces ratio risk',
        'Operations tracking paint consumption and waste for cost control',
      ]}

      compatibilityTags={[
        'Dürr EcoPump HP / VP (fluid supply)',
        'All Dürr EcoGun liquid spray guns',
        'Dürr Bell Atomiser',
        'Solvent-based and water-based 2K formulations',
        'Vinayak Agencies 2K paint range',
      ]}

      references={[]}

      related={[
        {
          name: '3K Dosing System',
          category: 'Dürr',
          href: '/products/durr/ecodose-3k',
          enquireSlug: 'durr-ecodose-3k',
          imageSrc: '/images/products/durr/ecodose-3k/durr-ecodose2k-01.webp',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
        {
          name: 'Electrostatic Spray Gun',
          category: 'Dürr',
          href: '/products/durr/electrostatic-gun',
          enquireSlug: 'durr-electrostatic-gun',
          imageSrc: '/images/products/durr/electrostatic-gun/durr-ecogun-as-auto-01.jpg',
        },
      ]}

      ctaHeadline="Eliminate 2K ratio risk."
      ctaAccent="EcoDose handles the consistency."
      ctaBody="Talk to OptiFinish about your 2K paint system, flow rate requirements, and colour change frequency — we'll specify the right EcoDose 2K configuration."
    />
  );
}
