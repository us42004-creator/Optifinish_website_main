import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr Air Assist Spray Gun | EcoGun AA | OptiFinish',
  description:
    'Dürr EcoGun AA air-assist spray gun for high-viscosity materials — combining airless fluid delivery with secondary air atomisation for superior finish quality on furniture and high-build coatings.',
};

export default function DurrAirAssistGunPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'Air Assist Spray Gun', href: '/products/durr/air-assist-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun AA — High-Viscosity Application"
      headline="Airless flow rate."
      headlineAccent="Air spray finish quality."
      subline="The EcoGun AA combines the material throughput capacity of airless with secondary air atomisation — delivering a finer, more controlled finish on high-viscosity paints, lacquers, adhesives, and sealants without thinning."
      heroImageLabel="Dürr EcoGun AA · air assist spray gun"
      enquireSlug="durr-air-assist-gun"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="High-viscosity materials"
      problemAccent="need both flow rate and finish quality."
      problemBody="Pure airless guns deliver flow rate but coarse atomisation. Pure air spray delivers fine atomisation but can't handle high-viscosity materials without over-thinning. The EcoGun AA solves this with a hybrid approach — hydraulic delivery of the heavy material, secondary air assist for fine atomisation at the tip."
      benefits={[
        'Handles high-viscosity paints, lacquers, adhesives, and sealants without thinning the formulation',
        'Secondary air assist atomises the material finely at the tip — superior finish quality vs pure airless',
        'Separate air regulation for round and flat spray pattern selection',
        'Stainless steel internal material path on the automatic variant — resistant to aggressive solvents',
        'Fed directly by Dürr EcoPump VP packages for continuous production line integration',
        'Designed for solid wood furniture finishing, high-build coatings, and premium topcoat applications',
      ]}

      specRows={[
        { l: 'Atomisation type', v: 'Air assist — hydraulic material delivery + secondary air atomisation at tip' },
        { l: 'Material range', v: 'High-viscosity paints, lacquers, adhesives, sealants' },
        { l: 'Air control', v: 'Separate regulation for round/flat pattern and fan width' },
        { l: 'Material path (auto)', v: 'Stainless steel — resistant to aggressive solvents' },
        { l: 'Fluid supply', v: 'Dürr EcoPump VP packages — continuous line integration' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Solid wood furniture finishing and lacquering',
        'High-build industrial topcoat application',
        'Adhesive and sealant application in manufacturing',
        'High-viscosity paint application without thinning',
        'Production lines requiring fine finish at high material throughput',
        'Automotive interior components and trim finishing',
      ]}

      compatibilityTags={[
        'Dürr EcoPump VP (airless pump for high-viscosity supply)',
        'OptiFinish liquid spray booth',
        'High-viscosity lacquers, adhesives, and sealants',
        'Dürr EcoDose 2K / 3K (for 2-component systems)',
      ]}

      references={[]}

      related={[
        {
          name: 'Airless Spray Gun',
          category: 'Dürr',
          href: '/products/durr/airless-gun',
          enquireSlug: 'durr-airless-gun',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
        },
        {
          name: 'Liquid Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/liquid-spray-booth',
          enquireSlug: 'liquid-spray-booth',
        },
      ]}

      ctaHeadline="High viscosity, premium finish."
      ctaAccent="EcoGun AA handles both."
      ctaBody="Talk to OptiFinish about your material viscosity, output requirements, and finish standard — we'll specify the right EcoGun AA configuration and EcoPump fluid supply."
    />
  );
}
