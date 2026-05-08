import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr HVLP Spray Gun | EcoGun AS MAN | OptiFinish',
  description:
    'Dürr EcoGun AS MAN HVLP variant — high transfer efficiency, low overspray for topcoats and clear coats. Reduces material consumption. Supplied by OptiFinish.',
};

export default function DurrHVLPGunPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'HVLP Spray Gun', href: '/products/durr/hvlp-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun AS MAN — HVLP Variant"
      headline="More paint on the part."
      headlineAccent="Less into the exhaust."
      subline="High Volume Low Pressure atomisation delivers maximum transfer efficiency — significantly reduced overspray, lower material consumption, and improved finish uniformity on topcoats and clear coats."
      heroImageLabel="Dürr EcoGun AS MAN HVLP · high-transfer spray gun"
      heroImageSrc="/images/products/durr/hvlp-gun/hvlp.png"
      heroImageAspect="aspect-[4/3]"
      enquireSlug="durr-hvlp-gun"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Conventional air spray"
      problemAccent="wastes 30–50% of your paint."
      problemBody="Standard high-pressure air atomisation creates fine mist that bounces off the part surface and goes directly into the exhaust system. HVLP technology operates at significantly lower atomisation pressure — creating larger droplets that land on the part rather than bouncing off it. The result: more paint on the job, less in the filter."
      benefits={[
        'High Volume Low Pressure atomisation — maximum transfer efficiency per unit of paint consumed',
        'Significantly reduced overspray vs conventional high-pressure spray — lower material consumption per part',
        'Ideal for topcoats and clear coats where surface quality and material economy are equally important',
        'Compatible with solvent-based and water-based paints — adjustable fan pattern and fluid flow',
        'Lower paint mist burden on the booth extraction system — extends filter life',
        'Part of the Dürr EcoGun AS MAN platform — consistent ergonomics across the gun range',
      ]}

      applicationImageSrc="/images/products/durr/hvlp-gun/durr-hvlp-inuse-01.jpg"

      specRows={[
        { l: 'Atomisation type', v: 'HVLP — High Volume Low Pressure' },
        { l: 'Transfer efficiency', v: 'High — significantly reduced overspray vs conventional spray' },
        { l: 'Application', v: 'Topcoats, clear coats, fine-finish final coats' },
        { l: 'Paint compatibility', v: 'Solvent-based and water-based paints' },
        { l: 'Fan pattern', v: 'Adjustable — round and flat spray' },
        { l: 'Fluid control', v: 'Adjustable fluid needle for viscosity range' },
        { l: 'Platform', v: 'Dürr EcoGun AS MAN series' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Premium topcoat application on furniture and cabinetry',
        'Clear coat application for automotive and industrial finishes',
        'Final coat application where surface quality is the primary criterion',
        'Water-based paint application for low-VOC compliance',
        'Any application where paint material cost is significant',
        'Operations with environmental compliance targets for overspray reduction',
      ]}

      applicationImages={[
        { src: '/images/products/durr/hvlp-gun/furniture_yopcoat.jpg',          label: 'Furniture & cabinetry topcoat' },
        { src: '/images/products/durr/hvlp-gun/automative_clearcoat.jpg',       label: 'Automotive clear coat' },
        { src: '/images/products/durr/hvlp-gun/Surface_quality_criteria.jpg',   label: 'Premium surface quality finishing' },
        { src: '/images/products/durr/hvlp-gun/luxury_items(Rolex).jpg',        label: 'High-value precision coating' },
        { src: '/images/products/durr/hvlp-gun/Environmental-Compliance-in-India-by-Perfect-Pollucon-Services-V1-e1755500029131.png', label: 'Environmental compliance — low overspray' },
      ]}

      compatibilityTags={[
        'OptiFinish liquid spray booth',
        'Dürr EcoPump fluid supply packages',
        'Solvent-based and water-based topcoats and clear coats',
        'Vinayak Agencies PU and enamel paint range',
      ]}

      references={[]}

      related={[
        {
          name: 'Cup Gun',
          category: 'Dürr',
          href: '/products/durr/cup-gun',
          enquireSlug: 'durr-cup-gun',
          imageSrc: '/images/products/durr/cup-gun/durr-ecogun-auto-01.webp',
        },
        {
          name: 'Electrostatic Spray Gun',
          category: 'Dürr',
          href: '/products/durr/electrostatic-gun',
          enquireSlug: 'durr-electrostatic-gun',
          imageSrc: '/images/products/durr/electrostatic-gun/durr-ecogun-as-auto-01.jpg',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
      ]}

      ctaHeadline="Reduce your paint consumption."
      ctaAccent="HVLP does the work."
      ctaBody="Talk to OptiFinish about whether the EcoGun HVLP variant is right for your paint type, substrate, and application volume."
    />
  );
}
