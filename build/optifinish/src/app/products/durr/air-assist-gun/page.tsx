import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Dürr Air-Assist Airless Spray Gun — Balanced Finish Quality | OptiFinish',
  description:
    'Dürr EcoGun AA air-assist airless spray gun — combines hydraulic atomisation with low-volume air assist for improved atomisation quality at lower pressure. Supplied by OptiFinish, authorised Dürr distributor India.',
  keywords: ['Durr air assist gun India','air assist airless gun India','air-assisted spray gun India','Durr EcoGun AA India','industrial coating gun India','OptiFinish Durr spray gun','liquid coating equipment India'],
  alternates: { canonical: `${SITE.url}/products/durr/air-assist-gun` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Dürr Air-Assist Airless Spray Gun — Balanced Finish Quality | OptiFinish',
    description: 'Dürr EcoGun AA air-assist airless spray gun — combines hydraulic atomisation with low-volume air assist for improved atomisation quality at lower pressure. Supplied by OptiFinish, authorised Dürr distributor India.',
    url: `${SITE.url}/products/durr/air-assist-gun`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Dürr Air-Assist Airless Spray Gun — Balanced Finish | OptiFinish',
    description: 'Dürr EcoGun AA air-assist airless spray gun — hydraulic atomisation + air assist for superior finish quality. Supplied by OptiFinish India.',
  },
};

const productLD = productSchema({
  name: 'Dürr EcoGun AA Air-Assist Spray Gun',
  description: 'Dürr EcoGun AA air-assist airless spray gun — combines hydraulic atomisation with low-volume air assist for improved atomisation quality at lower pressure. Supplied by OptiFinish, authorised Dürr distributor India.',
  url: '/products/durr/air-assist-gun',
  brand: 'Dürr',
  category: 'Liquid Coating Equipment',
  keywords: ['Durr air assist gun India', 'air assist airless gun India', 'air-assisted spray gun India', 'Durr EcoGun AA India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Dürr', href: '/products/durr' },
  { name: 'Air-Assist Spray Gun', href: '/products/durr/air-assist-gun' },
]);

const faqLD = faqSchema([
  {
    q: 'What is an air-assist airless spray gun?',
    a: 'An air-assist airless gun combines hydraulic atomisation (like an airless gun) with a small amount of compressed air at the air cap to soften the spray and improve atomisation quality — delivering better finish quality than pure airless while maintaining higher application speed than HVLP.',
  },
  {
    q: 'What applications suit air-assist airless guns?',
    a: 'Air-assist airless guns are ideal for medium-viscosity coatings, industrial topcoats, and applications where you need a balance between application speed and finish quality — such as metal fabrication, automotive components, and industrial machinery.',
  },
  {
    q: 'How does air-assist differ from HVLP?',
    a: 'Air-assist uses hydraulic pressure as the primary atomisation force with air as a secondary assist, while HVLP uses only high-volume air. Air-assist handles higher-viscosity materials and applies paint faster than HVLP, making it suited to industrial production environments.',
  },
]);

export default function DurrAirAssistGunPage() {
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
        { label: 'Air Assist Spray Gun', href: '/products/durr/air-assist-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun 2100 / EcoGun AA"
      headline="Airless flow rate."
      headlineAccent="Air spray finish quality."
      subline="The EcoGun 2100 and EcoGun AA combine the material throughput of airless with secondary air atomisation — delivering a finer, more controlled finish on high-viscosity paints, lacquers, adhesives, and sealants without thinning."
      heroImageLabel="Dürr EcoGun 2100 / AA · air assist spray gun"
      heroImageAspect="aspect-[4/3]"
      heroVideoId="DgWsqAXn96g"
      heroVideoStart={9}
      enquireSlug="durr-air-assist-gun"
      backHref="/products/durr"
      backLabel="← Back to Dürr"

      problemHeadline="High-viscosity materials"
      problemAccent="need both flow rate and finish quality."
      problemBody="Pure airless guns deliver flow rate but coarse atomisation. Pure air spray delivers fine atomisation but can't handle high-viscosity materials without over-thinning. The EcoGun 2100 and AA solve this with a hybrid approach — hydraulic delivery of the heavy material, secondary air assist for fine atomisation at the tip."
      benefits={[
        'Handles high-viscosity paints, lacquers, adhesives, and sealants without thinning the formulation',
        'Secondary air assist atomises the material finely at the tip — superior finish quality vs pure airless',
        'Separate air regulation for round and flat spray pattern selection',
        'EcoGun 2100: manual hand-held operation for flexible, targeted application',
        'EcoGun AA: automatic variant for reciprocator and line integration — stainless steel material path',
        'Fed directly by Dürr EcoPump VP packages for continuous production line integration',
      ]}

      variants={[
        {
          id: 'ecogun-2100',
          label: 'EcoGun 2100',
          tag: 'Manual Air Assist',
          headline: 'Manual air assist for flexible high-viscosity application.',
          body: 'The EcoGun 2100 is the manual hand-held air-assist variant — designed for flexible, operator-controlled application of high-viscosity lacquers, adhesives, and paints. Combines hydraulic material delivery with secondary air atomisation for a finish quality that pure airless cannot achieve.',
          specs: [
            { l: 'Atomisation', v: 'Air assist — hydraulic delivery + secondary air at tip' },
            { l: 'Operation', v: 'Manual — hand-held' },
            { l: 'Air control', v: 'Separate regulation for pattern shape and fan width' },
            { l: 'Best for', v: 'Furniture lacquering, adhesives, high-viscosity topcoats' },
            { l: 'Compatible pump', v: 'Dürr EcoPump VP series' },
          ],
          imageLabel: 'Dürr EcoGun 2100 · manual air assist gun',
          imageSrc: '/images/products/durr/air-assist-gun/durr-ecogun-aa-man-01.jpg',
        },
        {
          id: 'ecogun-aa',
          label: 'EcoGun AA',
          tag: 'Automatic Air Assist',
          headline: 'Automatic air assist for production line integration.',
          body: 'The EcoGun AA is the automatic variant designed for integration into reciprocators, gantries, and conveyorised finishing lines. Stainless steel internal material path resists aggressive solvents. Consistent trigger timing and remote fluid control make it the choice for high-throughput furniture and industrial coating lines.',
          specs: [
            { l: 'Atomisation', v: 'Air assist — hydraulic delivery + secondary air at tip' },
            { l: 'Operation', v: 'Automatic — reciprocator and line integration' },
            { l: 'Material path', v: 'Stainless steel — resistant to aggressive solvents' },
            { l: 'Best for', v: 'Production furniture lines, high-build automated coating' },
            { l: 'Compatible pump', v: 'Dürr EcoPump VP series' },
          ],
          imageLabel: 'Dürr EcoGun AA · automatic air assist gun',
          imageSrc: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',
        },
      ]}
      variantsSectionTitle="EcoGun 2100 or AA — manual or automated"

      specRows={[
        { l: 'Atomisation type', v: 'Air assist — hydraulic material delivery + secondary air atomisation at tip' },
        { l: 'Models', v: 'EcoGun 2100 (manual) · EcoGun AA (automatic)' },
        { l: 'Material range', v: 'High-viscosity paints, lacquers, adhesives, sealants' },
        { l: 'Air control', v: 'Separate regulation for round/flat pattern and fan width' },
        { l: 'Material path (AA auto)', v: 'Stainless steel — resistant to aggressive solvents' },
        { l: 'Fluid supply', v: 'Dürr EcoPump VP packages — continuous line integration' },
        { l: 'Supplied by', v: 'OptiFinish — authorised Dürr distributor, India' },
      ]}

      applicationImages={[
        { src: '/images/products/durr/air-assist-gun/application/solid-wood-lacquer.webp', label: 'Solid wood furniture finishing & lacquering' },
        { src: '/images/products/durr/air-assist-gun/application/high-build-industrial-top-coat.jpeg', label: 'High-build industrial topcoat' },
        { src: '/images/products/durr/air-assist-gun/application/automotive-interior.jpg', label: 'Automotive interior components & trim' },
        { src: '/images/products/durr/air-assist-gun/application/high-production-paint-line.webp', label: 'High-production paint lines' },
        { src: '/images/products/durr/air-assist-gun/application/high-viscosity-coating.jpg', label: 'High-viscosity coating application' },
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
          imageSrc: '/images/products/durr/airless-gun/durr-ecogun-al-auto-01.jpg',
        },
        {
          name: 'EcoPump Systems',
          category: 'Dürr',
          href: '/products/durr/ecopump',
          enquireSlug: 'durr-ecopump',
          imageSrc: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',
        },
        {
          name: 'Liquid Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/liquid-spray-booth',
          enquireSlug: 'liquid-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/liquid-spray-booth/liquid-single-operator-booth.png',
        },
      ]}

      ctaHeadline="High viscosity, premium finish."
      ctaAccent="EcoGun 2100 or AA — your call."
      ctaBody="Talk to OptiFinish about your material viscosity, output requirements, and whether you need manual or automated application — we'll specify the right model and EcoPump fluid supply."
    />
    </>
  );
}
