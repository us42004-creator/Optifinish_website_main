import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Liquid Industrial Paints | Kansai Nerolac & Paramount | OptiFinish',
  description:
    'Liquid industrial paints from Kansai Nerolac and Paramount Tansy — primers, topcoats, and enamel formulations for industrial metal coating. Supplied by Vinayak Agencies.',
};

export default function VinayakLiquidPaintPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Vinayak Agencies', href: '/products/vinayak' },
        { label: 'Liquid Industrial Paints', href: '/products/vinayak/liquid-paint' },
      ]}
      badge="Vinayak Agencies — Liquid Coatings"
      eyebrow="Kansai Nerolac · Paramount Tansy"
      headline="Industrial liquid coatings."
      headlineAccent="Proven on production lines."
      subline="Liquid industrial paint formulations from Kansai Nerolac and Paramount Tansy — primers, anticorrosion coatings, and industrial topcoats for metal fabrication, general manufacturing, and OEM production lines. Supplied by Vinayak Agencies."
      heroStats={[
        { val: 'Primer', label: 'Anticorrosion base coats' },
        { val: 'Topcoat', label: 'Durable industrial finish' },
        { val: '2', label: 'Trusted brands stocked' },
      ]}
      heroImageLabel="Vinayak Agencies · liquid industrial paints — Kansai Nerolac, Paramount Tansy"
      heroImageSrc="/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg"
      enquireSlug="vinayak-liquid-paint"
      backHref="/products/vinayak"
      backLabel="← Back to Vinayak Agencies"

      problemHeadline="Liquid coating performance"
      problemAccent="starts with the right formulation."
      problemBody="Under-specified primer allows corrosion to undercut the topcoat within the warranty period. Over-thinned topcoat delivers insufficient film build. Sourcing liquid paint formulations matched to your substrate, application method, and service environment — from verified brands — ensures the specification holds through application and in service."
      benefits={[
        'Kansai Nerolac industrial range — established brand with broad industrial formulation portfolio',
        'Paramount Tansy liquid coatings — competitive industrial formulations for standard metal applications',
        'Anticorrosion primers matched to substrate — mild steel, galvanised, or aluminium',
        'Industrial topcoats in solvent-based and water-based formulations for HVLP, airless, and air-assist application',
        'Single source supply — liquid paint and the liquid spray booth from the same supplier',
        'Vinayak Agencies supply integrated with OptiFinish liquid coating system commissioning',
      ]}

      applicationImageSrc="/images/products/vinayak/liquid-paint/nerolac-high-performance-coatings.webp"

      specRows={[
        { l: 'Kansai Nerolac', v: 'Industrial primers, anticorrosion coatings, and topcoats — established brand portfolio' },
        { l: 'Paramount Tansy', v: 'Liquid industrial coatings for standard metal fabrication and OEM applications' },
        { l: 'Primer types', v: 'Anticorrosion, etch primer, epoxy primer — substrate and service condition dependent' },
        { l: 'Topcoat types', v: 'Alkyd enamel, epoxy topcoat, polyurethane topcoat — application and finish dependent' },
        { l: 'Application method', v: 'HVLP, air spray, airless, air-assist, electrostatic — formulation-specific' },
        { l: 'Thinners', v: 'Matched thinners available — per brand and formulation specification' },
        { l: 'Supplied by', v: 'Vinayak Agencies — sister concern to OptiFinish, India' },
      ]}

      applications={[
        'Metal fabrication shops requiring primer + topcoat system',
        'Agricultural equipment and construction machinery coating',
        'General industrial manufacturing OEM paint lines',
        'Furniture and fitout — metal components and frames',
        'Electrical enclosures and control panel finishing',
        'Any OptiFinish liquid spray booth installation requiring paint supply',
      ]}

      compatibilityTags={[
        'OptiFinish liquid spray booths',
        'Dürr EcoGun HVLP, cup gun, airless, and air-assist guns',
        'Dürr EcoPump fluid supply packages',
        'Dürr EcoDose 2K / 3K (for two- and three-component formulations)',
        'Mild steel, galvanised, and aluminium substrates with appropriate primer',
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
          name: 'PU Enamel',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/pu-enamel',
          enquireSlug: 'vinayak-pu-enamel',
          imageSrc: '/images/products/vinayak/pu-enamel/nerolac-pu-enamel-10in1-hero.jpg',
        },
        {
          name: 'Liquid Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/liquid-spray-booth',
          enquireSlug: 'liquid-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/liquid-spray-booth/optifinish-liquid-spray-booth-01.jpg',
        },
      ]}

      ctaHeadline="Paint supply alongside the booth."
      ctaAccent="Vinayak Agencies stocks both brands."
      ctaBody="Talk to OptiFinish about your substrate, service environment, and application method — we'll specify the right primer and topcoat from the Kansai Nerolac and Paramount Tansy ranges."
    />
  );
}
