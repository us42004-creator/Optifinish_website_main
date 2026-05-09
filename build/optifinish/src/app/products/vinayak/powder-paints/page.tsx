import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Powder Coating Paints | Nerolac, Prominent, Paramount | OptiFinish',
  description:
    'Powder coating paints from Nerolac, Prominent, and Paramount — supplied by Vinayak Agencies. Epoxy, polyester, and hybrid formulations for industrial and architectural applications.',
};

export default function VinayakPowderPaintsPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Vinayak Agencies', href: '/products/vinayak' },
        { label: 'Powder Coating Paints', href: '/products/vinayak/powder-paints' },
      ]}
      badge="Vinayak Agencies — Powder Coatings"
      eyebrow="Nerolac · Prominent · Paramount"
      headline="Industrial powder coatings."
      headlineAccent="Three trusted brands."
      subline="A curated range of epoxy, polyester, and hybrid powder coating formulations from Nerolac, Prominent, and Paramount — available through Vinayak Agencies for all industrial, architectural, and OEM coating requirements."
      heroStats={[
        { val: 'Epoxy', label: 'Interior grade powder' },
        { val: 'Polyester', label: 'Exterior UV-stable grade' },
        { val: 'Hybrid', label: 'Epoxy-polyester blend' },
      ]}
      heroImageLabel="Vinayak Agencies · powder coating paints — Nerolac, Prominent, Paramount"
      heroImageSrc="/images/products/vinayak/powder-paints/nerolac-powder-coating-01.png"
      enquireSlug="vinayak-powder-paints"
      backHref="/products/vinayak"
      backLabel="← Back to Vinayak Agencies"

      problemHeadline="Powder quality variation"
      problemAccent="shows up in every batch."
      problemBody="Inconsistent powder formulations — unstable melt flow, incorrect cure temperature, or poor colour batch consistency — cause visible surface defects that fail quality inspection. Sourcing from verified brands through an authorised distributor ensures the powder specification that works on your line today works the same way tomorrow."
      benefits={[
        'Nerolac powder coatings — established brand, wide colour range, consistent batch-to-batch quality',
        'Prominent powder coatings — reliable industrial formulations for general manufacturing applications',
        'Paramount powder coatings — competitive pricing with proven performance on standard industrial substrates',
        'Epoxy grades: excellent interior adhesion and chemical resistance — for indoor and protected applications',
        'Polyester grades: UV-stable exterior formulations — for outdoor and architectural requirements',
        'Hybrid (epoxy-polyester) grades: balanced performance for general industrial interiors',
        'Supplied by Vinayak Agencies — sister concern to OptiFinish, integrated supply with OptiFinish coating systems',
      ]}

      applicationImageSrc="/images/products/vinayak/powder-paints/nerolac-powder-coating-application.webp"

      specRows={[
        { l: 'Epoxy powder', v: 'Interior grade — high adhesion, chemical resistance, not UV-stable' },
        { l: 'Polyester powder', v: 'Exterior grade — UV-stable, weather-resistant, architectural standard' },
        { l: 'Hybrid powder', v: 'Epoxy-polyester blend — balanced performance for general industrial interiors' },
        { l: 'Brands stocked', v: 'Nerolac, Prominent, Paramount' },
        { l: 'Cure temperature', v: 'Typically 180–200°C (confirm per product grade — varies by brand and formulation)' },
        { l: 'Colour range', v: 'Wide — RAL-matched and standard industrial colours across all brands' },
        { l: 'Supplied by', v: 'Vinayak Agencies — authorised distributor, sister concern to OptiFinish' },
      ]}

      applications={[
        'General metal fabrication and structural steel powder coating',
        'Automotive components and ancillary parts',
        'Agricultural and construction equipment coating',
        'Architectural aluminium extrusions and frames (polyester grades)',
        'Electrical enclosures, switchgear, and control panels',
        'Consumer goods, appliances, and white goods (hybrid and epoxy grades)',
        'Any OptiFinish powder coating plant or spray booth installation',
      ]}

      compatibilityTags={[
        'OptiFinish powder coating plants (all configurations)',
        'OptiFinish powder spray booths',
        'OptiFinish curing ovens',
        'GEMA automatic and manual powder guns',
        'All standard mild steel, galvanised, and aluminium substrates',
      ]}

      references={[]}

      related={[
        {
          name: 'Touch-up Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/touchup-paints',
          enquireSlug: 'vinayak-touchup-paints',
          imageSrc: '/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp',
        },
        {
          name: 'Powder Coating Plant',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-coating-plant',
          enquireSlug: 'powder-coating-plant',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
      ]}

      ctaHeadline="Powder supply alongside the plant."
      ctaAccent="Vinayak Agencies stocks what you need."
      ctaBody="Talk to OptiFinish about your substrate, finish grade, and colour requirements — we'll specify the right powder formulation and brand from the Vinayak Agencies range."
    />
  );
}
