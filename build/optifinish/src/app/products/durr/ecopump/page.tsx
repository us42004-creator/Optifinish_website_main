import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Dürr EcoPump — Fluid Handling for Liquid Paint Shops | OptiFinish',
  description:
    'Dürr EcoPump fluid transfer and circulation systems — designed for reliable, low-pulsation paint supply in industrial liquid coating lines. Supplied by OptiFinish, authorised Dürr distributor India.',
  keywords: ['Durr EcoPump India','paint pump India','industrial paint pump India','fluid handling liquid coating India','Durr pump India','paint circulation system India','OptiFinish Durr pump','liquid coating fluid supply India'],
  alternates: { canonical: `${SITE.url}/products/durr/ecopump` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Dürr EcoPump — Fluid Handling for Liquid Paint Shops | OptiFinish',
    description: 'Dürr EcoPump fluid transfer and circulation systems — designed for reliable, low-pulsation paint supply in industrial liquid coating lines. Supplied by OptiFinish, authorised Dürr distributor India.',
    url: `${SITE.url}/products/durr/ecopump`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Dürr EcoPump — Fluid Handling for Paint Shops | OptiFinish',
    description: 'Dürr EcoPump fluid transfer and circulation systems — reliable, low-pulsation paint supply. Supplied by OptiFinish India.',
  },
};

const productLD = productSchema({
  name: 'Dürr EcoPump Fluid Handling System',
  description: 'Dürr EcoPump fluid transfer and circulation systems — designed for reliable, low-pulsation paint supply in industrial liquid coating lines. Supplied by OptiFinish, authorised Dürr distributor India.',
  url: '/products/durr/ecopump',
  brand: 'Dürr',
  category: 'Liquid Coating Equipment',
  keywords: ['Durr EcoPump India', 'paint pump India', 'industrial paint pump India', 'fluid handling liquid coating India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Dürr', href: '/products/durr' },
  { name: 'EcoPump', href: '/products/durr/ecopump' },
]);

const faqLD = faqSchema([
  {
    q: 'What is the Dürr EcoPump used for?',
    a: 'The Dürr EcoPump is a diaphragm or piston pump system for transferring and circulating liquid paint in industrial coating lines — providing consistent, low-pulsation fluid supply to spray guns, bell atomisers, and dosing systems.',
  },
  {
    q: 'What paint materials is EcoPump compatible with?',
    a: 'Dürr EcoPumps are compatible with solvent-based paints, water-based paints, 2K and 3K coating materials, adhesives, and sealants — covering the full range of industrial liquid coating materials.',
  },
  {
    q: 'Can EcoPump be integrated with Dürr dosing systems?',
    a: 'Yes. Dürr EcoPump is designed to integrate with Dürr EcoDose 2K and 3K electronic dosing systems, forming a complete fluid handling and mixing solution for industrial paint shops — all supplied by OptiFinish.',
  },
]);

export default function DurrEcoPumpPage() {
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
        { label: 'EcoPump Systems', href: '/products/durr/ecopump' },
      ]}
      badge="Dürr — Fluid Handling"
      eyebrow="HP / HPE / VP / VPS / AD — Paint Shop Fluid Systems"
      headline="The right fluid pressure"
      headlineAccent="for every coating application."
      subline="A complete family of air-operated and electric pumps for paint circulation, airless spray delivery, and viscous material transfer — from low-pressure water-based paint supply to 360-bar high-pressure airless delivery."
      heroStats={[
        { val: '360 bar', label: 'Max VP pressure' },
        { val: '32 L/min', label: 'HP 1600 max output' },
        { val: 'Package', label: 'Pre-assembled modules' },
      ]}
      heroImageLabel="Dürr EcoPump Systems · HP / VP / AD fluid pumps"
      heroImageSrc="/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp"
      heroImageAspect="aspect-[4/3]"
      heroImageCover
      enquireSlug="durr-ecopump"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Wrong pump specification"
      problemAccent="breaks consistency across the shift."
      problemBody="Pressure fluctuations in the fluid supply cause film build inconsistency — even the best spray gun can't deliver a consistent film if the paint arrives at varying pressure and flow rate. The EcoPump family covers every pressure range and viscosity in liquid coating — match the pump to the application and the gun performs correctly."
      benefits={[
        'HP Series (horizontal piston): compact, robust paint supply — equal thrust on both strokes, concealed shaft seal',
        'HPE electric variant: motor-driven with DIN EN 12162 certification for mains-powered installations',
        'VP Series (vertical piston): up to 360 bar for airless and high-viscosity material applications',
        'VPS shovel plate: air-operated chop-check design for high-viscosity fluids — glues, oils, wax',
        'AD diaphragm: low-shear, low-pulsation delivery for sensitive formulations and abrasive fluids',
        'EcoPump Package modules: pressure pot, filter, hose, gun, and regulator pre-assembled — fast deployment',
      ]}

      techVideos={{
        eyebrow: 'Pump Technology',
        headline: 'Three pump principles. One family.',
        videos: [
          { id: 'nSB1w508eWs', label: 'Diaphragm Pump', sub: 'EcoPump AD — low-shear, low-pulsation delivery' },
          { id: 'hnKN8OWKwOE', label: 'Shovel Plate Pump', sub: 'EcoPump VPS — high-viscosity fluids' },
          { id: 'ijAmxVeLyMQ', label: 'Piston Pump', sub: 'EcoPump VP — up to 360 bar airless delivery' },
        ],
      }}

      variants={[
        {
          id: 'hp',
          label: 'EcoPump HP',
          tag: 'Air Horizontal Piston',
          headline: 'Compact, reliable paint supply for standard applications.',
          body: 'Air-driven horizontal piston pump with a two-piston design delivering equal thrust on both strokes — smooth, consistent paint supply for cup guns, HVLP, electrostatic, and air-assist applications. Concealed shaft seal and quick-release valve reduce surge and simplify maintenance.',
          specs: [
            { l: 'HP 400', v: '4.2 kg — 8 L/min max output' },
            { l: 'HP 800', v: '5.8 kg — 16 L/min max output' },
            { l: 'HP 1600', v: '8 kg — 32 L/min max output' },
            { l: 'Drive', v: 'Air-operated horizontal piston' },
            { l: 'Best for', v: 'Water and solvent-based paints, varnishes, lacquers' },
          ],
          imageLabel: 'Dürr EcoPump HP · air horizontal piston pump',
          imageSrc: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-hp.webp',
        },
        {
          id: 'hpe',
          label: 'EcoPump HPE',
          tag: 'Electric Horizontal Piston',
          headline: 'Motor-driven precision for mains-powered installations.',
          body: 'Electric-driven variant of the HP horizontal piston pump — delivering superior performance with lower operating costs compared to air-driven units. DIN EN 12162 certified. Modular design retains the same maintenance benefits as the air-driven HP series.',
          specs: [
            { l: 'Drive', v: 'Electric motor — lower operating cost vs air-driven' },
            { l: 'Certification', v: 'DIN EN 12162' },
            { l: 'Design', v: 'Horizontal two-piston, concealed shaft seal' },
            { l: 'Best for', v: 'Mains-powered installations where compressed air is limited' },
          ],
          imageLabel: 'Dürr EcoPump HPE · electric horizontal piston pump',
          imageSrc: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-hpe.webp',
        },
        {
          id: 'vp',
          label: 'EcoPump VP',
          tag: 'High Pressure — Airless',
          headline: 'Up to 360 bar for airless and high-viscosity delivery.',
          body: 'Pneumatically driven vertical piston pump for medium and high pressure applications — delivering up to 360 bar for atomising heavy materials without carrier air. Suitable for airless spray, air-assisted application, furniture, steel structures, and automotive body coating.',
          specs: [
            { l: 'Max pressure', v: '360 bar' },
            { l: 'Drive', v: 'Air-operated vertical piston' },
            { l: 'Configuration', v: 'Multiple air inlet modules and pressure relief valve options' },
            { l: 'Best for', v: 'Airless spray, anti-corrosion coatings, high-viscosity materials' },
            { l: 'Compatible gun', v: 'Dürr EcoGun AL MAN / AL AUTO airless guns' },
          ],
          imageLabel: 'Dürr EcoPump VP Series · high-pressure vertical piston',
          imageSrc: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-vp.webp',
        },
        {
          id: 'vps',
          label: 'EcoPump VPS',
          tag: 'Vertical Shovel Plate',
          headline: 'Air-operated chop-check for thick, viscous materials.',
          body: 'Vertical shovel plate (chop-check) pump optimised for medium to high viscosity fluids — glues, oils, wax, and sealants. Modular design for easy maintenance and an optimised fluid path for careful, low-shear material pumping with proven long-term durability.',
          specs: [
            { l: 'Type', v: 'Air-operated shovel plate (chop-check)' },
            { l: 'Viscosity range', v: 'Medium to high — glues, oils, wax, sealants' },
            { l: 'Fluid path', v: 'Optimised for careful, low-damage material pumping' },
            { l: 'Best for', v: 'High-viscosity adhesives, sealing compounds, industrial wax' },
          ],
          imageLabel: 'Dürr EcoPump VPS · vertical shovel plate pump',
          imageSrc: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-vps.webp',
        },
        {
          id: 'ad',
          label: 'EcoPump AD',
          tag: 'Air Diaphragm',
          headline: 'Low-shear delivery for sensitive and abrasive fluids.',
          body: 'Diaphragm pump for applications where pulsation must be minimised — metallic flake paints, effect pigments, abrasive fluids, and particle-containing materials. Operates in circulation or direct delivery modes with multiple housing material options for chemical compatibility.',
          specs: [
            { l: 'Type', v: 'Air-operated diaphragm — low-shear, low-pulsation' },
            { l: 'Best for', v: 'Metallic flake, effect pigments, abrasive fluids, waste liquids' },
            { l: 'Modes', v: 'Circulation or direct delivery' },
            { l: 'Housing', v: 'Multiple material options for chemical compatibility' },
          ],
          imageLabel: 'Dürr EcoPump AD · air diaphragm pump',
          imageSrc: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-ad.webp',
        },
        {
          id: 'package',
          label: 'EcoPump Package',
          tag: 'Pre-Assembled Modules',
          headline: 'Fully assembled, ready-to-use pump stations.',
          body: 'Pre-assembled portable modules combining pump, pressure pot, filter, hose, regulator, and gun into a ready-to-deploy unit. Available in high-pressure (VP-based) and low-pressure (diaphragm-based) configurations for wood finishing, exterior painting, and rapid field deployment.',
          specs: [
            { l: 'Low-pressure', v: 'AD diaphragm-based — wood finishing, general painting' },
            { l: 'High-pressure', v: 'VP-based — exterior painting, structural steel' },
            { l: 'Configuration', v: 'Carriage, suction type, optional accessories' },
            { l: 'Benefit', v: 'No on-site assembly — fully tested before delivery' },
          ],
          imageLabel: 'Dürr EcoPump Package · pre-assembled pump module',
          imageSrc: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-vp-package.webp',
        },
      ]}
      variantsSectionTitle="Select the EcoPump for your pressure, flow, and fluid type"
      variantImageCover

      applicationImages={[
        { src: '/images/products/durr/ecopump/durr-pumps-fluid-01.webp', label: 'Paint circulation in production lines' },
        { src: '/images/products/durr/ecopump/application/structural-steel-coating.jpg', label: 'High-pressure delivery for anti-corrosion coating' },
        { src: '/images/products/durr/ecopump/application/adhesive-application.jpg', label: 'High-viscosity adhesive & sealant pumping' },
        { src: '/images/products/durr/ecopump/application/paint-supply-line.jpg', label: 'Paint supply in production paint shops' },
      ]}

      specRows={[
        { l: 'HP 400', v: '4.2 kg · 8 L/min · air-operated horizontal piston' },
        { l: 'HP 800', v: '5.8 kg · 16 L/min · air-operated horizontal piston' },
        { l: 'HP 1600', v: '8 kg · 32 L/min · air-operated horizontal piston' },
        { l: 'HPE', v: 'Electric-driven · DIN EN 12162 · horizontal piston' },
        { l: 'VP max pressure', v: 'Up to 360 bar · air-operated vertical piston' },
        { l: 'VPS', v: 'Shovel plate (chop-check) · medium to high viscosity fluids' },
        { l: 'AD diaphragm', v: 'Low-shear · low-pulsation · abrasive and particle fluids' },
        { l: 'EcoPump Package', v: 'Pre-assembled LP (AD) or HP (VP) · ready to deploy' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Paint supply for all Dürr liquid spray gun types',
        'High-pressure airless delivery for anti-corrosion and structural steel coating',
        'Water-based and solvent-based paint circulation in production lines',
        'Metallic and effect pigment paint delivery without particle damage',
        'High-viscosity adhesive, sealant, and wax pumping (VPS)',
        'Quick-deploy touch-up and repair stations (EcoPump Package)',
      ]}

      compatibilityTags={[
        'Dürr EcoGun series (all liquid gun models)',
        'Dürr EcoDose 2K / 3K dosing systems',
        'Dürr Bell Atomiser',
        'OptiFinish liquid spray booth',
        'All standard liquid coating formulations',
      ]}

      references={[]}

      related={[
        {
          name: 'Cup Gun',
          category: 'Dürr',
          href: '/products/durr/cup-gun',
          enquireSlug: 'durr-cup-gun',
          imageSrc: '/images/products/durr/cup-gun/ecogun_910_durr.jpg',
        },
        {
          name: 'Airless Spray Gun',
          category: 'Dürr',
          href: '/products/durr/airless-gun',
          enquireSlug: 'durr-airless-gun',
          imageSrc: '/images/products/durr/airless-gun/durr-ecogun-al-auto-01.jpg',
        },
        {
          name: '2K Dosing System',
          category: 'Dürr',
          href: '/products/durr/ecodose-2k',
          enquireSlug: 'durr-ecodose-2k',
          imageSrc: '/images/products/durr/ecodose-2k/durr-ecodose2k-01.webp',
        },
      ]}

      ctaHeadline="Specify the right EcoPump."
      ctaAccent="Pressure, flow, and material matched."
      ctaBody="Talk to OptiFinish about your paint type, viscosity, gun system, and required output — we'll select the right EcoPump variant and size for your installation."
    />
    </>
  );
}
