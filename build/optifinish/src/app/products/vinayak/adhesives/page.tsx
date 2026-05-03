import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Industrial Adhesives | Nerolac Synthetic & PVA Glue | OptiFinish',
  description:
    'Nerolac synthetic glue and white PVA glue — industrial bonding adhesives for wood, laminates, and general fabrication. Supplied by Vinayak Agencies.',
};

export default function VinayakAdhesivesPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Vinayak Agencies', href: '/products/vinayak' },
        { label: 'Adhesives', href: '/products/vinayak/adhesives' },
      ]}
      badge="Vinayak Agencies — Industrial Adhesives"
      eyebrow="Nerolac Synthetic Glue · White PVA Glue"
      headline="Industrial bonding."
      headlineAccent="Wood, laminates, fabrication."
      subline="Nerolac synthetic glue and white PVA glue — industrial adhesive formulations for wood joinery, laminate bonding, and general fabrication assembly. Supplied by Vinayak Agencies alongside the full OptiFinish and Vinayak surface finishing range."
      heroStats={[
        { val: 'Synthetic', label: 'Contact adhesive grade' },
        { val: 'PVA', label: 'White woodworking glue' },
        { val: 'Nerolac', label: 'Trusted brand formulation' },
      ]}
      heroImageLabel="Vinayak Agencies · Nerolac synthetic glue and white PVA adhesive"
      enquireSlug="vinayak-adhesives"
      backHref="/products/vinayak"
      backLabel="← Back to Vinayak Agencies"

      problemHeadline="Adhesive and coating"
      problemAccent="sourced separately — complicates supply."
      problemBody="Furniture and wood finishing operations need both adhesive for assembly and surface coating for finish — often from different suppliers, with separate ordering, lead times, and accounts. Vinayak Agencies stocks both the adhesive and the coating range, so wood finishing operations can consolidate supply through a single relationship."
      benefits={[
        'Nerolac synthetic glue — contact adhesive for laminates, veneers, and general bonding in furniture and woodworking',
        'White PVA glue — standard woodworking adhesive for joinery, edge bonding, and wood-to-wood assembly',
        'Both adhesive types available from Vinayak Agencies alongside powder coatings, liquid paints, and enamels',
        'Nerolac brand — consistent quality formulation, reliable batch-to-batch performance',
        'Single-supplier convenience for fabrication and wood finishing operations',
        'Suitable for furniture manufacturing, joinery workshops, and general fabrication assembly',
      ]}

      variants={[
        {
          id: 'synthetic',
          label: 'Synthetic Glue',
          tag: 'Contact Adhesive — Laminates & Veneers',
          headline: 'Contact adhesive for laminates, veneers, and bonding.',
          body: 'Nerolac synthetic glue is a contact adhesive for laminate-to-substrate bonding, veneer application, and general fabrication assembly where immediate bond strength on contact is required. Apply to both surfaces, allow to tack, then press together.',
          specs: [
            { l: 'Type', v: 'Contact adhesive — synthetic rubber base' },
            { l: 'Best for', v: 'Laminates, veneers, decorative sheets to MDF/plywood/chipboard' },
            { l: 'Bond method', v: 'Apply to both surfaces, tack off, press — immediate bond on contact' },
            { l: 'Application', v: 'Brush or notched spreader' },
          ],
          imageLabel: 'Nerolac synthetic glue · contact adhesive for laminates and veneers',
        },
        {
          id: 'pva',
          label: 'White PVA Glue',
          tag: 'PVA — Wood Joinery & Assembly',
          headline: 'PVA woodworking glue for joinery and edge bonding.',
          body: 'Nerolac white PVA glue for wood-to-wood joinery, edge bonding, dowel joints, and general woodworking assembly. Clamp and allow to cure — standard woodworking adhesive for furniture, joinery, and cabinetry production.',
          specs: [
            { l: 'Type', v: 'Polyvinyl acetate (PVA) — water-based wood adhesive' },
            { l: 'Best for', v: 'Wood joinery, edge bonding, dowel joints, furniture assembly' },
            { l: 'Bond method', v: 'Apply to one or both surfaces, clamp, allow cure' },
            { l: 'Application', v: 'Brush or nozzle applicator' },
          ],
          imageLabel: 'Nerolac white PVA glue · woodworking adhesive for joinery and assembly',
        },
      ]}
      variantsSectionTitle="Synthetic contact adhesive or PVA woodworking glue"

      specRows={[
        { l: 'Synthetic glue', v: 'Contact adhesive — laminates, veneers, decorative surfaces to substrate' },
        { l: 'White PVA glue', v: 'PVA water-based — wood joinery, edge bonding, furniture assembly' },
        { l: 'Brand', v: 'Nerolac — both adhesive types' },
        { l: 'Application method', v: 'Brush or spreader (synthetic); brush or nozzle (PVA)' },
        { l: 'Substrates', v: 'MDF, plywood, chipboard, solid wood, laminates (substrate-specific — confirm per application)' },
        { l: 'Supplied by', v: 'Vinayak Agencies — sister concern to OptiFinish, India' },
      ]}

      applications={[
        'Furniture manufacturing — laminate bonding and wood joinery assembly',
        'Joinery workshops — door frames, window frames, and cabinetry production',
        'Interior fit-out — decorative laminate surfaces on panels and partitions',
        'Kitchen cabinet and wardrobe manufacturing',
        'General fabrication assembly requiring adhesive alongside a surface coating',
        'Edge banding and veneer application in wood panel processing',
      ]}

      compatibilityTags={[
        'Vinayak Agencies powder coating paints (alongside surface finish)',
        'Vinayak Agencies liquid industrial paints and enamels',
        'MDF, plywood, chipboard, and solid wood substrates',
        'Decorative laminates and veneers (synthetic glue)',
        'Wood joinery and furniture production lines',
      ]}

      references={[]}

      related={[
        {
          name: 'PU Enamel',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/pu-enamel',
          enquireSlug: 'vinayak-pu-enamel',
        },
        {
          name: 'Liquid Industrial Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/liquid-paint',
          enquireSlug: 'vinayak-liquid-paint',
        },
        {
          name: 'Touch-up Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/touchup-paints',
          enquireSlug: 'vinayak-touchup-paints',
        },
      ]}

      ctaHeadline="Adhesive and coating — one supplier."
      ctaAccent="Vinayak Agencies stocks both."
      ctaBody="Talk to OptiFinish about your assembly and finishing requirements — we'll supply the right Nerolac adhesive alongside your coating specification through Vinayak Agencies."
    />
  );
}
