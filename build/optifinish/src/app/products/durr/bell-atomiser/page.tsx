import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Dürr Bell Atomiser — Rotary Electrostatic for Automatic Lines | OptiFinish',
  description:
    'Dürr EcoBell3 rotary bell atomiser — high-speed rotary electrostatic atomisation for automatic liquid coating lines. Exceptional transfer efficiency, fine atomisation, and consistent film build. Supplied by OptiFinish, authorised Dürr distributor India.',
  keywords: ['Durr bell atomiser India','rotary bell atomiser India','EcoBell3 India','rotary atomiser liquid coating India','automatic liquid coating India','Durr EcoBell India','OptiFinish Durr bell atomiser'],
  alternates: { canonical: `${SITE.url}/products/durr/bell-atomiser` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Dürr Bell Atomiser — Rotary Electrostatic for Automatic Lines | OptiFinish',
    description: 'Dürr EcoBell3 rotary bell atomiser — high-speed rotary electrostatic atomisation for automatic liquid coating lines. Exceptional transfer efficiency, fine atomisation, and consistent film build. Supplied by OptiFinish, authorised Dürr distributor India.',
    url: `${SITE.url}/products/durr/bell-atomiser`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Dürr Bell Atomiser — Rotary Electrostatic Coating | OptiFinish',
    description: 'Dürr EcoBell3 rotary bell atomiser — high-speed rotary electrostatic atomisation. Exceptional transfer efficiency. Supplied by OptiFinish India.',
  },
};

const productLD = productSchema({
  name: 'Dürr EcoBell3 Rotary Bell Atomiser',
  description: 'Dürr EcoBell3 rotary bell atomiser — high-speed rotary electrostatic atomisation for automatic liquid coating lines. Exceptional transfer efficiency, fine atomisation, and consistent film build.',
  url: '/products/durr/bell-atomiser',
  brand: 'Dürr',
  category: 'Liquid Coating Equipment',
  keywords: ['Durr bell atomiser India', 'rotary bell atomiser India', 'EcoBell3 India', 'rotary atomiser liquid coating India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Dürr', href: '/products/durr' },
  { name: 'Bell Atomiser', href: '/products/durr/bell-atomiser' },
]);

const faqLD = faqSchema([
  {
    q: 'What is a rotary bell atomiser?',
    a: 'A rotary bell atomiser uses a high-speed spinning bell-shaped disc (20,000–60,000 RPM) to atomise paint by centrifugal force combined with electrostatic charging — producing extremely fine, uniform droplets for the highest quality finish in automatic liquid coating lines.',
  },
  {
    q: 'What production volumes justify a bell atomiser?',
    a: 'Bell atomisers are used in high-volume automatic production — typically automotive, major appliances, and large industrial OEM lines — where throughput and finish quality requirements justify the higher capital investment versus spray gun systems.',
  },
  {
    q: 'What transfer efficiency does a Dürr bell atomiser achieve?',
    a: 'Dürr EcoBell atomisers achieve 85–95% transfer efficiency through combined rotary atomisation and electrostatic charging — the highest transfer efficiency available in liquid coating, reducing paint cost and environmental impact significantly.',
  },
]);

export default function DurrBellAtomiserPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
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
      heroImageAspect="aspect-[4/3]"
      heroVideoId="OJ4sqtYjfkw"
      heroVideoStart={9}
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
          imageSrc: '/images/products/durr/bell-atomiser/durr-ecobell3-atomising-01.webp',
        },
        {
          num: '03',
          title: 'Electrostatic attraction to part',
          body: 'The atomised droplets are electrostatically charged as they leave the bell — charged particles are attracted uniformly to the grounded part surface, wrapping around edges and delivering consistent film build across the full part. The result: automotive-grade finish uniformity with high transfer efficiency.',
          imageLabel: 'Step 03 · electrostatically charged mist attracted uniformly to part surface',
          imageSrc: '/images/products/durr/bell-atomiser/durr-ecobell-automotive-01.webp',
        },
      ]}
      howItWorksTitle="Spin, atomise, adhere"

      applicationImages={[
        { src: '/images/products/durr/bell-atomiser/application/high-end-luxury-car-coating.avif', label: 'High-end luxury automotive coating' },
        { src: '/images/products/durr/bell-atomiser/application/harvestors.jpg', label: 'Agricultural & heavy machinery coating' },
        { src: '/images/products/durr/bell-atomiser/application/high-end-aluminium-kitchen-cabinets.jpg', label: 'High-end aluminium cabinetry finishing' },
        { src: '/images/products/durr/bell-atomiser/application/high-end-speakers.webp', label: 'Consumer electronics & premium goods' },
        { src: '/images/products/durr/bell-atomiser/application/high-end-laptops.avif', label: 'High-end electronics coating' },
        { src: '/images/products/durr/bell-atomiser/application/durr-ecobell2-01.webp', label: 'Automated bell atomiser in operation' },
      ]}

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
          imageSrc: '/images/products/durr/electrostatic-gun/durr-ecogun-ec-01.webp',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
        {
          name: '2K Dosing System',
          category: 'Dürr',
          href: '/products/durr/ecodose-2k',
          enquireSlug: 'durr-ecodose-2k',
          imageSrc: '/images/products/durr/ecodose-2k/durr-ecodose2k-01.webp',
        },
      ]}

      ctaHeadline="Premium automatic liquid coating."
      ctaAccent="Bell atomiser grade finish."
      ctaBody="Talk to OptiFinish about bell atomiser integration into your production line — we'll assess your paint system, production volume, and finish requirement."
    />
    </>
  );
}
