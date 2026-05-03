import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Dürr Electrostatic Spray Gun | EcoGun AS MAN DC/EC | OptiFinish',
  description:
    'Dürr EcoGun AS MAN electrostatic spray guns — DC variant for solvent-based, EC variant for water-based paints. Electrostatic wrap-around, reduced overspray. Supplied by OptiFinish.',
};

export default function DurrElectrostaticGunPage() {
  return (
    <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Dürr', href: '/products/durr' },
        { label: 'Electrostatic Spray Gun', href: '/products/durr/electrostatic-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun AS MAN DC & EC"
      headline="Charged particles."
      headlineAccent="Wrap-around coverage."
      subline="Electrostatic manual spray guns that charge atomised paint particles — wrapping them around the part surface electrostatically and significantly reducing overspray through electrostatic attraction. DC for solvent-based, EC for water-based formulations."
      heroImageLabel="Dürr EcoGun AS MAN DC/EC · electrostatic spray gun"
      enquireSlug="durr-electrostatic-gun"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="Overspray is paint you paid for"
      problemAccent="that never reached the part."
      problemBody="In conventional spray, a significant fraction of atomised paint misses the part and ends up in the exhaust. Electrostatic charging reverses this — charged particles are attracted to the grounded part surface, wrapping around edges and reverse faces. Material savings of 20–40% are typical compared to conventional air spray on the same part."
      benefits={[
        'Electrostatic charging wraps atomised paint around the part — coating reverse faces, edges, and recesses',
        'Significant material savings through reduced overspray vs conventional air spray',
        'DC (Direct Charge) variant: internal electrode for solvent-based paints — maximum charging efficiency',
        'EC (External Charge) variant: external charging electrode for water-based paints — avoids current issues with conductive formulations',
        'Suitable for automotive, general industry, and consumer goods production lines',
        'Lowers extraction system load — less overspray means less paint mist burden on filters',
      ]}

      variants={[
        {
          id: 'dc',
          label: 'EcoGun AS MAN DC',
          tag: 'Direct Charge — Solvent-Based',
          headline: 'Maximum electrostatic efficiency for solvent paints.',
          body: 'The DC (Direct Charge) variant uses an internal high-voltage electrode to charge the atomised paint particles directly. Optimised for solvent-based formulations where the paint\'s electrical resistivity allows direct contact charging. Maximum wrap-around effect on grounded parts.',
          specs: [
            { l: 'Charging method', v: 'Direct charge — internal electrode' },
            { l: 'Paint compatibility', v: 'Solvent-based paints (correct resistivity range)' },
            { l: 'Best for', v: 'Automotive, general industrial, consumer goods — solvent-based' },
            { l: 'Wrap-around', v: 'Maximum electrostatic attraction on grounded parts' },
          ],
          imageLabel: 'Dürr EcoGun AS MAN DC · direct charge electrostatic gun',
        },
        {
          id: 'ec',
          label: 'EcoGun AS MAN EC',
          tag: 'External Charge — Water-Based',
          headline: 'Electrostatic efficiency for water-based formulations.',
          body: 'The EC (External Charge) variant uses an external charging electrode instead of internal direct charge — avoiding the current leakage problems that occur when internal electrodes contact the conductive water in water-based paint formulations. Delivers effective electrostatic wrap-around on water-based paints.',
          specs: [
            { l: 'Charging method', v: 'External charge electrode — avoids direct contact with paint' },
            { l: 'Paint compatibility', v: 'Water-based paints — low-VOC and waterborne formulations' },
            { l: 'Best for', v: 'Water-based industrial topcoats, low-VOC compliance applications' },
            { l: 'Wrap-around', v: 'Effective electrostatic attraction without current leakage issues' },
          ],
          imageLabel: 'Dürr EcoGun AS MAN EC · external charge electrostatic gun',
        },
      ]}
      variantsSectionTitle="DC for solvent-based, EC for water-based"

      specRows={[
        { l: 'DC variant', v: 'EcoGun AS MAN DC — internal direct charge electrode for solvent-based paints' },
        { l: 'EC variant', v: 'EcoGun AS MAN EC — external charge electrode for water-based formulations' },
        { l: 'Overspray reduction', v: 'Significant vs conventional air spray — electrostatic wrap-around effect' },
        { l: 'Applications', v: 'Automotive, general industrial, consumer goods production lines' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applications={[
        'Automotive body and component painting',
        'General industrial manufacturing where material savings are a KPI',
        'Consumer goods and appliance painting',
        'Water-based paint lines for low-VOC compliance',
        'Operations transitioning from solvent-based to water-based coatings',
        'Any liquid coating application where overspray reduction is a priority',
      ]}

      compatibilityTags={[
        'OptiFinish liquid spray booth',
        'Dürr EcoPump fluid supply packages',
        'Solvent-based paints (DC variant)',
        'Water-based paints (EC variant)',
        'Dürr EcoDose 2K / 3K (for two-component systems)',
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
          name: 'Bell Atomiser',
          category: 'Dürr',
          href: '/products/durr/bell-atomiser',
          enquireSlug: 'durr-bell-atomiser',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
        },
      ]}

      ctaHeadline="Electrostatic liquid coating."
      ctaAccent="Specify DC or EC for your paint."
      ctaBody="Talk to OptiFinish about your paint formulation and whether DC or EC is the right electrostatic variant for your application."
    />
  );
}
