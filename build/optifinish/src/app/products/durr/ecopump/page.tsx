import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr EcoPump Systems | HP / VP / AD / HPE | OptiFinish',
  description:
    'Dürr EcoPump fluid handling systems — HP, VP, AD, and HPE variants for paint circulation, airless delivery, and viscous material transfer. Pre-assembled EcoPump Package modules available.',
};

export default function DurrEcoPumpPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'EcoPump Systems', href: '/products/durr/ecopump' },
      ]}
      badge="Dürr — Fluid Handling"
      eyebrow="HP / VP / AD / HPE — Paint Shop Fluid Systems"
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
      enquireSlug="durr-ecopump"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Wrong pump specification"
      problemAccent="breaks consistency across the shift."
      problemBody="Pressure fluctuations in the fluid supply cause film build inconsistency — even the best spray gun can't deliver a consistent film if the paint arrives at varying pressure and flow rate. The EcoPump family covers every pressure range and viscosity in liquid coating — match the pump to the application and the gun performs correctly."
      benefits={[
        'HP Series (horizontal piston): compact, robust paint supply for low-to-medium pressure applications',
        'VP Series (vertical piston): up to 360 bar for airless and high-viscosity material applications',
        'AD diaphragm variant: low-shear delivery for pulsation-sensitive applications without particle damage',
        'HPE electric variant: DIN EN 12162 certified motor-driven pump for mains-powered installations',
        'EcoPump Package modules: pressure pot, filter, hose, gun, and regulator pre-assembled — fast deployment',
        'Full range from water-based paint supply to structural steel anti-corrosion airless systems',
      ]}

      variants={[
        {
          id: 'hp',
          label: 'HP Series',
          tag: 'Horizontal Piston',
          headline: 'Compact, reliable paint supply for standard applications.',
          body: 'Horizontal piston pumps in three capacities — HP 400, HP 800, and HP 1600 — covering standard paint supply for cup guns, HVLP, electrostatic, and air-assist gun systems. Air-operated, compact, and field-serviceable.',
          specs: [
            { l: 'HP 400', v: '4.2 kg; 8 L/min max output' },
            { l: 'HP 800', v: '5.8 kg; 16 L/min max output' },
            { l: 'HP 1600', v: '8 kg; 32 L/min max output' },
            { l: 'Drive', v: 'Air-operated piston' },
          ],
          imageLabel: 'Dürr EcoPump HP Series · horizontal piston pumps',
        },
        {
          id: 'vp',
          label: 'VP Series',
          tag: 'High Pressure — Airless',
          headline: 'Up to 360 bar for airless and high-viscosity delivery.',
          body: 'Vertical piston pumps for high-pressure airless spray applications — delivering up to 360 bar operating pressure for atomising heavy materials without carrier air. The preferred pump for Dürr airless gun packages.',
          specs: [
            { l: 'Max pressure', v: '360 bar' },
            { l: 'Best for', v: 'Airless spray, high-viscosity materials, anti-corrosion coatings' },
            { l: 'Drive', v: 'Air-operated vertical piston' },
            { l: 'Compatible gun', v: 'Dürr EcoGun 246 / 249 airless guns' },
          ],
          imageLabel: 'Dürr EcoPump VP Series · high-pressure vertical piston',
        },
        {
          id: 'ad',
          label: 'AD Diaphragm',
          tag: 'Low Shear — Pulsation Sensitive',
          headline: 'Gentle delivery for sensitive formulations.',
          body: 'Diaphragm pump variant for applications where pulsation must be minimised and shear forces on the fluid must be kept low — such as metallic flake paints, effect pigments, and shear-sensitive formulations.',
          specs: [
            { l: 'Type', v: 'Diaphragm — low-shear, low-pulsation' },
            { l: 'Best for', v: 'Metallic flake paints, effect pigments, shear-sensitive fluids' },
            { l: 'Drive', v: 'Air-operated' },
            { l: 'Advantage', v: 'No particle damage from piston shear forces' },
          ],
          imageLabel: 'Dürr EcoPump AD · diaphragm pump for sensitive formulations',
        },
      ]}
      variantsSectionTitle="Select the EcoPump for your pressure and flow requirement"

      specRows={[
        { l: 'HP 400', v: '4.2 kg, 8 L/min, air-operated horizontal piston' },
        { l: 'HP 800', v: '5.8 kg, 16 L/min, air-operated horizontal piston' },
        { l: 'HP 1600', v: '8 kg, 32 L/min, air-operated horizontal piston' },
        { l: 'VP Series max pressure', v: 'Up to 360 bar — for airless and high-viscosity applications' },
        { l: 'AD diaphragm', v: 'Low-shear, low-pulsation — for metallic and effect pigment paints' },
        { l: 'HPE electric', v: 'DIN EN 12162 certified — motor-driven for mains-powered installations' },
        { l: 'EcoPump Package', v: 'Pre-assembled: pressure pot, filter, hose, gun, regulator — quick deploy' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Paint supply for all Dürr liquid spray gun types',
        'High-pressure airless delivery for anti-corrosion and structural steel coating',
        'Water-based and solvent-based paint circulation in production lines',
        'Metallic and effect pigment paint delivery without particle damage',
        'Quick-deploy touch-up and repair stations (EcoPump Package)',
        'Continuous production line fluid supply with consistent pressure',
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
        },
        {
          name: 'Airless Spray Gun',
          category: 'Dürr',
          href: '/products/durr/airless-gun',
          enquireSlug: 'durr-airless-gun',
        },
        {
          name: '2K Dosing System',
          category: 'Dürr',
          href: '/products/durr/ecodose-2k',
          enquireSlug: 'durr-ecodose-2k',
        },
      ]}

      ctaHeadline="Specify the right EcoPump."
      ctaAccent="Pressure, flow, and material matched."
      ctaBody="Talk to OptiFinish about your paint type, viscosity, gun system, and required output — we'll select the right EcoPump variant and size for your installation."
    />
  );
}
