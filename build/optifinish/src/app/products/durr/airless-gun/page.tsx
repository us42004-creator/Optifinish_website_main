import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr Airless Spray Gun | EcoGun 246/249 | OptiFinish',
  description:
    'Dürr EcoGun 246 and 249 airless spray guns for anti-corrosion primers, epoxies, and structural steel coating. High-pressure hydraulic atomisation. Reversible tip system.',
};

export default function DurrAirlessGunPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'Airless Spray Gun', href: '/products/durr/airless-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun 246 / EcoGun 249"
      headline="High pressure."
      headlineAccent="No carrier air."
      subline="High-pressure airless spray guns for anti-corrosion work on structural steel, heavy machinery, and heavy-duty coating — atomising paint by forcing it at high pressure through a precision tip orifice, with no air carrier required."
      heroImageLabel="Dürr EcoGun 246 / 249 · airless spray gun"
      heroImageSrc="/images/products/durr/airless-gun/durr-ecogun-al-auto-01.jpg"
      enquireSlug="durr-airless-gun"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="High-build coatings can't"
      problemAccent="be air-sprayed efficiently."
      problemBody="Anti-corrosion epoxies, bituminous coatings, and high-build industrial primers are too viscous for conventional air spray — they need thinning to the point where the film build properties are compromised. Airless technology atomises these materials at high pressure without a carrier air stream, maintaining full formulation properties at high output rates."
      benefits={[
        'Hydraulic atomisation at high pressure — no carrier air required, no over-dilution of heavy coatings',
        'Modular reversible tip system: multiple tip sizes for different spray patterns and output rates, field-changeable',
        'Designed for anti-corrosion primers, epoxies, zinc-rich primers, and bituminous coatings on structural steel',
        'High material flow rate — suited for large-area coverage at high production speeds',
        'EcoGun 246 and 249 cover different output and pattern width requirements',
        'Compatible with EcoPump VP high-pressure pump packages for high-viscosity material delivery',
      ]}

      variants={[
        {
          id: 'ecogun-246',
          label: 'EcoGun 246',
          tag: 'Standard Airless',
          headline: 'Standard high-pressure airless for anti-corrosion work.',
          body: 'The EcoGun 246 is the standard airless model for structural steel anti-corrosion coating — reliable, field-serviceable, with reversible tip system for pattern adjustment without stopping production.',
          specs: [
            { l: 'Atomisation', v: 'High-pressure hydraulic — no air carrier' },
            { l: 'Tip system', v: 'Reversible — multiple sizes for pattern and output control' },
            { l: 'Best for', v: 'Structural steel anti-corrosion coating, epoxies' },
            { l: 'Compatible pump', v: 'Dürr EcoPump VP series' },
          ],
          imageLabel: 'Dürr EcoGun 246 · standard airless gun',
          imageSrc: '/images/products/durr/airless-gun/durr-ecogun-al246-01.jpg',
        },
        {
          id: 'ecogun-249',
          label: 'EcoGun 249',
          tag: 'Heavy Duty',
          headline: 'Higher output for demanding industrial coating.',
          body: 'The EcoGun 249 is a heavier-duty variant with higher material throughput — suited for larger areas, faster coverage targets, and high-build coating applications where the 246 output rate is a constraint.',
          specs: [
            { l: 'Output', v: 'Higher material flow rate vs EcoGun 246' },
            { l: 'Tip system', v: 'Reversible — compatible with standard 246/249 tips' },
            { l: 'Best for', v: 'Large structural steel areas, high-build coatings, fast coverage' },
            { l: 'Compatible pump', v: 'Dürr EcoPump VP series (high-pressure)' },
          ],
          imageLabel: 'Dürr EcoGun 249 · heavy duty airless gun',
          imageSrc: '/images/products/durr/airless-gun/durr-ecogun-al249-01.jpg',
        },
      ]}
      variantsSectionTitle="EcoGun 246 or 249 — match output to area"

      applicationImageSrc="/images/products/durr/airless-gun/durr-airless-inuse-01.webp"

      specRows={[
        { l: 'Atomisation type', v: 'High-pressure hydraulic — no carrier air' },
        { l: 'Tip system', v: 'Modular reversible — multiple tip sizes, field-changeable' },
        { l: 'Materials', v: 'Anti-corrosion primers, epoxies, zinc-rich, bituminous coatings' },
        { l: 'Application', v: 'Structural steel, heavy machinery, large-area coating' },
        { l: 'Compatible pump', v: 'Dürr EcoPump VP — up to 360 bar' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Structural steel anti-corrosion coating',
        'Heavy machinery and industrial equipment painting',
        'Anti-corrosion primer application on fabrications',
        'Zinc-rich primer coating for galvanising equivalence',
        'Bituminous and rubberised coating on steel structures',
        'Large-area, high-build industrial coating projects',
      ]}

      compatibilityTags={[
        'Dürr EcoPump VP (high-pressure airless pump)',
        'OptiFinish liquid spray booth',
        'Anti-corrosion and epoxy coating formulations',
      ]}

      references={[]}

      related={[
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
        {
          name: 'Air Assist Spray Gun',
          category: 'Dürr',
          href: '/products/durr/air-assist-gun',
          enquireSlug: 'durr-air-assist-gun',
          imageSrc: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',
        },
        {
          name: 'Liquid Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/liquid-spray-booth',
          enquireSlug: 'liquid-spray-booth',
        },
      ]}

      ctaHeadline="Specify your airless system."
      ctaAccent="Gun, pump, and booth together."
      ctaBody="Talk to OptiFinish about your coating material, substrate, and coverage area — we'll specify the right EcoGun model, tip size, and EcoPump configuration."
    />
  );
}
