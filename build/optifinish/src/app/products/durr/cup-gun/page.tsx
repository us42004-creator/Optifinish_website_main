import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr Cup Gun | EcoGun 116 / 910 | OptiFinish',
  description:
    'Dürr EcoGun 116 and EcoGun 910 gravity-feed cup guns for touch-up, furniture lacquering, and precision area application. Solvent and water-based compatible. Supplied by OptiFinish.',
};

export default function DurrCupGunPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'Cup Gun', href: '/products/durr/cup-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun 116 / EcoGun 910"
      headline="Precision liquid application."
      headlineAccent="Gravity feed. Two models."
      subline="Manual gravity-feed air spray guns for touch-up work, furniture lacquering, and precision area coating — the EcoGun 116 for general-purpose use, the EcoGun 910 for fine-finish applications demanding superior atomisation quality."
      heroImageLabel="Dürr EcoGun 116 / 910 · cup gun"
      heroImageSrc="/images/products/durr/cup-gun/cup_gun_durr.webp"
      heroImageAspect="aspect-[4/3]"
      enquireSlug="durr-cup-gun"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Small areas and touch-up work"
      problemAccent="need a precision gun, not a production gun."
      problemBody="Production spray guns are optimised for throughput, not precision. For touch-up repairs, furniture lacquering, small components, and exact area application, a compact, well-balanced gravity-feed cup gun gives the applicator direct control over pattern width, fluid flow, and atomisation quality that production equipment cannot match."
      benefits={[
        'EcoGun 116: reliable general-purpose gravity-feed cup gun — max 6 bar, 1–4mm nozzle range',
        'EcoGun 910: fine-finish optimised variant — max 8 bar, lower overspray for premium topcoat applications',
        'Ergonomic trigger design for extended use without fatigue',
        'Compatible with solvent-based and water-based coatings: enamels, lacquers, glazes',
        'Replaceable nozzle and needle sets — service field-replaceable without specialist workshop',
        'Compact, balanced design for precision area application and touch-up work',
      ]}

      variants={[
        {
          id: 'ecogun-116',
          label: 'EcoGun 116',
          tag: 'General Purpose',
          headline: 'Reliable gravity-feed for all standard applications.',
          body: 'The EcoGun 116 is a dependable general-purpose gravity-feed cup gun — suitable for enamels, lacquers, primers, and standard industrial finishes. Max 6 bar operating pressure with 1–4mm nozzle range covers the full spectrum of viscosities from thin lacquers to heavier enamels.',
          specs: [
            { l: 'Max operating pressure', v: '6 bar' },
            { l: 'Nozzle range', v: '1–4mm (replaceable sets)' },
            { l: 'Feed', v: 'Gravity cup — top-mounted' },
            { l: 'Best for', v: 'General industrial finishes, enamels, primers, lacquers' },
          ],
          imageLabel: 'Dürr EcoGun 116 · general purpose gravity feed',
          imageSrc: '/images/products/durr/cup-gun/ecogun_116.png',
        },
        {
          id: 'ecogun-910',
          label: 'EcoGun 910',
          tag: 'Fine Finish',
          headline: 'Superior atomisation for premium topcoats.',
          body: 'The EcoGun 910 is optimised for fine-finish and low-overspray applications — higher max pressure (8 bar) with a refined atomisation geometry for smaller, more uniform droplet distribution. The preferred choice for furniture topcoats, clear coats, and any application where final surface quality is the primary criterion.',
          specs: [
            { l: 'Max operating pressure', v: '8 bar' },
            { l: 'Atomisation', v: 'Fine-finish optimised — smaller, uniform droplet distribution' },
            { l: 'Feed', v: 'Gravity cup — top-mounted' },
            { l: 'Best for', v: 'Furniture lacquering, premium topcoats, clear coats' },
          ],
          imageLabel: 'Dürr EcoGun 910 · fine finish gravity feed',
          imageSrc: '/images/products/durr/cup-gun/ecogun_910_durr.jpg',
        },
      ]}
      variantsSectionTitle="EcoGun 116 or 910 — match the gun to the finish"

      specRows={[
        { l: 'EcoGun 116 max pressure', v: '6 bar' },
        { l: 'EcoGun 910 max pressure', v: '8 bar' },
        { l: 'Nozzle range', v: '1–4mm (replaceable nozzle and needle sets)' },
        { l: 'Feed system', v: 'Gravity cup — top-mounted' },
        { l: 'Paint compatibility', v: 'Solvent-based and water-based coatings' },
        { l: 'Coating types', v: 'Enamels, lacquers, glazes, primers, topcoats' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Touch-up and repair coating on powder-coated or liquid-painted surfaces',
        'Furniture lacquering and wood finishing',
        'Small component and precision area coating',
        'Custom colour application on architectural hardware',
        'Prototype and sample coating',
        'Low-volume production where material economy is important',
      ]}
      applicationImages={[
        { src: 'https://images.unsplash.com/photo-1674632917616-051b4d6970e3?w=900&q=80&fit=crop&auto=format', label: 'Touch-up & repair coating' },
        { src: 'https://images.unsplash.com/photo-1560793385-81f522e9b4d8?w=900&q=80&fit=crop&auto=format',   label: 'Furniture lacquering & wood finishing' },
        { src: 'https://images.unsplash.com/photo-1564030390588-7b4094e10d18?w=900&q=80&fit=crop&auto=format', label: 'Small component & precision coating' },
        { src: 'https://images.unsplash.com/photo-1627252009027-16321aa0777e?w=900&q=80&fit=crop&auto=format', label: 'Architectural hardware finishing' },
        { src: 'https://images.unsplash.com/photo-1674485127842-7b63ac41db8c?w=900&q=80&fit=crop&auto=format', label: 'Low-volume production coating' },
      ]}

      compatibilityTags={[
        'OptiFinish liquid spray booth',
        'Dürr EcoPump fluid supply packages',
        'Solvent-based and water-based coatings (all brands)',
        'Vinayak Agencies paint and lacquer range',
      ]}

      references={[]}

      related={[
        {
          name: 'HVLP Spray Gun',
          category: 'Dürr',
          href: '/products/durr/hvlp-gun',
          enquireSlug: 'durr-hvlp-gun',
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

      ctaHeadline="Specify your liquid coating gun."
      ctaAccent="We'll match it to your application."
      ctaBody="Talk to OptiFinish about your paint type, substrate, and finish requirement — we'll recommend the right Dürr EcoGun model and nozzle configuration."
    />
  );
}
