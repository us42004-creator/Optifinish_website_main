import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Dürr Electrostatic Spray Gun — Rotary & Corona Liquid Coating | OptiFinish',
  description:
    'Dürr EcoGun AS DC/EC electrostatic spray guns — electrostatic charging for wrap-around effect and dramatically improved transfer efficiency in liquid coating. Supplied by OptiFinish, authorised Dürr distributor India.',
  keywords: ['Durr electrostatic spray gun India','electrostatic liquid coating gun India','corona spray gun India','electrostatic coating equipment India','Durr EcoGun electrostatic India','OptiFinish Durr electrostatic','high transfer efficiency gun India'],
  alternates: { canonical: `${SITE.url}/products/durr/electrostatic-gun` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Dürr Electrostatic Spray Gun — Rotary & Corona Liquid Coating | OptiFinish',
    description: 'Dürr EcoGun AS DC/EC electrostatic spray guns — electrostatic charging for wrap-around effect and dramatically improved transfer efficiency in liquid coating. Supplied by OptiFinish, authorised Dürr distributor India.',
    url: `${SITE.url}/products/durr/electrostatic-gun`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Dürr Electrostatic Spray Gun — Wrap-Around Coating | OptiFinish',
    description: 'Dürr EcoGun AS DC/EC electrostatic spray guns — wrap-around effect, high transfer efficiency. Supplied by OptiFinish India.',
  },
};

const productLD = productSchema({
  name: 'Dürr EcoGun Electrostatic Spray Gun',
  description: 'Dürr EcoGun AS DC/EC electrostatic spray guns — electrostatic charging for wrap-around effect and dramatically improved transfer efficiency in liquid coating. Supplied by OptiFinish, authorised Dürr distributor India.',
  url: '/products/durr/electrostatic-gun',
  brand: 'Dürr',
  category: 'Liquid Coating Equipment',
  keywords: ['Durr electrostatic spray gun India', 'electrostatic liquid coating gun India', 'corona spray gun India', 'electrostatic coating equipment India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Dürr', href: '/products/durr' },
  { name: 'Electrostatic Spray Gun', href: '/products/durr/electrostatic-gun' },
]);

const faqLD = faqSchema([
  {
    q: 'What is an electrostatic spray gun for liquid coating?',
    a: 'An electrostatic spray gun applies a high-voltage charge to paint particles as they leave the gun — the charged particles are attracted to the grounded workpiece, producing a wrap-around effect that coats edges and recesses, and dramatically increasing transfer efficiency to 70–85%.',
  },
  {
    q: 'What transfer efficiency does electrostatic liquid coating achieve?',
    a: 'Electrostatic liquid coating guns typically achieve 70–85% transfer efficiency compared to 25–40% for conventional guns — reducing paint consumption, overspray, and VOC emissions significantly.',
  },
  {
    q: 'What is the difference between DC and EC variants of Dürr electrostatic guns?',
    a: 'DC (direct charge) guns charge the fluid directly, suited to conductive materials. EC (external charge) guns charge the atomised spray externally, suited to a wider range of coating materials including waterborne and solvent-based paints.',
  },
]);

export default function DurrElectrostaticGunPage() {
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
        { label: 'Electrostatic Spray Gun', href: '/products/durr/electrostatic-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun AS MAN DC & EC"
      headline="Charged particles."
      headlineAccent="Wrap-around coverage."
      subline="Electrostatic manual spray guns that charge atomised paint particles — wrapping them around the part surface electrostatically and significantly reducing overspray through electrostatic attraction. DC for solvent-based, EC for water-based formulations."
      heroImageLabel="Dürr EcoGun AS MAN DC/EC · electrostatic spray gun"
      heroImageSrc="/images/products/durr/electrostatic-gun/csm_duerr-ecogun-as-man-dc-ec_7a041a900b.webp"
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
          imageSrc: '/images/products/durr/electrostatic-gun/durr-ecogun-dc-01.webp',
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
          imageSrc: '/images/products/durr/electrostatic-gun/durr-ecogun-ec-01.webp',
        },
      ]}
      variantsSectionTitle="DC for solvent-based, EC for water-based"

      applicationImages={[
        { src: '/images/products/durr/electrostatic-gun/application/car-spray.jpeg', label: 'Automotive body & component painting' },
        { src: '/images/products/durr/electrostatic-gun/application/consumer-goods-and-appliances.jpg', label: 'Consumer goods & appliance painting' },
        { src: '/images/products/durr/electrostatic-gun/application/industrial-metal-parts-coating.jpg', label: 'General industrial manufacturing' },
        { src: '/images/products/durr/electrostatic-gun/application/metal-fabrication-spray.jpg', label: 'Metal fabrication coating' },
        { src: '/images/products/durr/electrostatic-gun/application/automated-spray-line.jpg', label: 'Automated industrial spray line' },
        { src: '/images/products/durr/electrostatic-gun/application/appliance-coating-line.jpg', label: 'Appliance & furniture coating line' },
      ]}

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
          imageSrc: '/images/products/durr/hvlp-gun/hvlp.png',
        },
        {
          name: 'Bell Atomiser',
          category: 'Dürr',
          href: '/products/durr/bell-atomiser',
          enquireSlug: 'durr-bell-atomiser',
          imageSrc: '/images/products/durr/bell-atomiser/durr-ecobell-slider-01.webp',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
      ]}

      ctaHeadline="Electrostatic liquid coating."
      ctaAccent="Specify DC or EC for your paint."
      ctaBody="Talk to OptiFinish about your paint formulation and whether DC or EC is the right electrostatic variant for your application."
    />
    </>
  );
}
