import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr Bell Atomiser | Rotary Electrostatic | OptiFinish',
  description:
    'Dürr Bell Atomiser — high-speed rotary electrostatic applicator for automotive body panels. Ultra-fine, uniform droplet distribution for premium finish quality on automatic production lines.',
};

export default function DurrBellAtomiserPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'Bell Atomiser', href: '/products/durr/bell-atomiser' },
      ]}
      badge="Dürr — Automatic Applicator"
      eyebrow="Rotary Electrostatic — High-Speed Automatic"
      headline="Finest droplet distribution."
      headlineAccent="Premium surface quality."
      subline="A high-speed rotary electrostatic atomiser delivering ultra-fine, extremely uniform droplet distribution for premium finish quality on automotive body panels and high-specification industrial components — the highest standard available in liquid coating technology."
      heroStats={[
        { val: 'Rotary', label: 'Bell cup atomisation' },
        { val: 'Electrostatic', label: 'Wrap-around charging' },
        { val: 'Premium', label: 'Automotive-grade finish' },
      ]}
      heroImageLabel="Dürr Bell Atomiser · rotary electrostatic applicator"
      heroImageSrc="/images/products/durr/bell-atomiser/durr-ecobell-slider-01.webp"
      enquireSlug="durr-bell-atomiser"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Conventional spray guns"
      problemAccent="can't deliver automotive-grade uniformity."
      problemBody="Conventional air spray and airless guns produce droplet distributions with significant size variation — visible in the final finish as texture, orange peel, or inconsistent gloss. Rotary bell atomisation spins paint into an extremely fine, uniform mist via centrifugal force — delivering the most consistent droplet distribution achievable and the finest surface finish in production liquid coating."
      benefits={[
        'Rotary bell cup generates the finest, most uniform droplet distribution available in production coating',
        'Electrostatic charging maximises transfer efficiency — charged mist wraps around the part with minimal overspray',
        'Premium finish quality — standard equipment for automotive OEM body panel painting',
        'High transfer efficiency: significantly less paint consumption vs conventional spray for same film build',
        'Designed for automated production lines with consistent high-volume output requirements',
        'Supplied by OptiFinish as confirmed Dürr distributor',
      ]}

      steps={[
        {
          num: '01',
          title: 'Bell cup spinning at high speed',
          body: 'Paint is fed to the centre of a rotating bell cup spinning at high speed (typically 15,000–70,000 RPM depending on viscosity and required droplet size). Centrifugal force spreads the paint in a thin film to the cup edge.',
          imageLabel: 'Step 01 · bell cup spinning at high speed — centrifugal atomisation',
          imageSrc: '/images/products/durr/bell-atomiser/durr-ecobell-app-01.webp',
        },
        {
          num: '02',
          title: 'Atomisation at the cup edge',
          body: 'At the bell cup edge, the thin paint film breaks into an extremely fine, uniform mist of droplets. The rotational speed controls droplet size — faster rotation produces finer droplets for premium finish; slower rotation produces larger droplets for faster coverage.',
          imageLabel: 'Step 02 · paint atomised at bell cup edge — ultra-fine mist',
        },
        {
          num: '03',
          title: 'Electrostatic attraction to part',
          body: 'The atomised droplets are electrostatically charged as they leave the bell — charged particles are attracted uniformly to the grounded part surface, wrapping around edges and delivering consistent film build across the full part. The result: automotive-grade finish uniformity with high transfer efficiency.',
          imageLabel: 'Step 03 · electrostatically charged mist attracted uniformly to part surface',
        },
      ]}
      howItWorksTitle="Spin, atomise, adhere"

      specRows={[
        { l: 'Atomisation type', v: 'Rotary bell cup — centrifugal atomisation' },
        { l: 'Charging', v: 'Electrostatic — maximum transfer efficiency and wrap-around' },
        { l: 'Droplet distribution', v: 'Ultra-fine, extremely uniform — finest available in production coating' },
        { l: 'Transfer efficiency', v: 'High — significantly less paint consumption vs conventional spray' },
        { l: 'Application', v: 'Automated production lines — automotive and high-specification industrial' },
        { l: 'Supplied by', v: 'OptiFinish — confirmed Dürr distributor' },
      ]}

      applications={[
        'Automotive body panel painting — OEM and tier 1 suppliers',
        'High-specification industrial component coating',
        'Automatic production lines requiring premium finish quality',
        'Any application where surface quality is the primary criterion',
        'High-volume operations with paint material cost as a key KPI',
      ]}

      compatibilityTags={[
        'Dürr EcoPump fluid supply systems',
        'Dürr EcoDose 2K / 3K dosing (for multi-component systems)',
        'Automated production line mounting systems',
        'Automotive OEM paint line integration',
      ]}

      references={[]}

      related={[
        {
          name: 'Electrostatic Spray Gun',
          category: 'Dürr',
          href: '/products/durr/electrostatic-gun',
          enquireSlug: 'durr-electrostatic-gun',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
        },
        {
          name: '2K Dosing System',
          category: 'Dürr',
          href: '/products/durr/ecodose-2k',
          enquireSlug: 'durr-ecodose-2k',
        },
      ]}

      ctaHeadline="Premium automatic liquid coating."
      ctaAccent="Bell atomiser grade finish."
      ctaBody="Talk to OptiFinish about bell atomiser integration into your production line — we'll assess your paint system, production volume, and finish requirement."
    />
  );
}
