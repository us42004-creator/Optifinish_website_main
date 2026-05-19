import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Dürr Airless Spray Gun — High-Pressure Liquid Coating | OptiFinish',
  description:
    'Dürr EcoGun AL MAN/AUTO airless spray guns — high-pressure hydraulic atomisation for fast, high-build liquid coating applications. Supplied by OptiFinish, authorised Dürr distributor India.',
  keywords: ['Durr airless spray gun India','airless spray gun India','hydraulic atomisation spray gun','high pressure spray gun India','Durr EcoGun airless India','industrial airless spray gun India','OptiFinish Durr airless gun'],
  alternates: { canonical: `${SITE.url}/products/durr/airless-gun` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Dürr Airless Spray Gun — High-Pressure Liquid Coating | OptiFinish',
    description: 'Dürr EcoGun AL MAN/AUTO airless spray guns — high-pressure hydraulic atomisation for fast, high-build liquid coating applications. Supplied by OptiFinish, authorised Dürr distributor India.',
    url: `${SITE.url}/products/durr/airless-gun`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Dürr Airless Spray Gun — High-Pressure Liquid Coating | OptiFinish',
    description: 'Dürr EcoGun AL MAN/AUTO airless spray guns — high-pressure hydraulic atomisation. Supplied by OptiFinish, authorised Dürr distributor India.',
  },
};

const productLD = productSchema({
  name: 'Dürr EcoGun Airless Spray Gun',
  description: 'Dürr EcoGun AL MAN/AUTO airless spray guns — high-pressure hydraulic atomisation for fast, high-build liquid coating applications. Supplied by OptiFinish, authorised Dürr distributor India.',
  url: '/products/durr/airless-gun',
  brand: 'Dürr',
  category: 'Liquid Coating Equipment',
  keywords: ['Durr airless spray gun India', 'airless spray gun India', 'hydraulic atomisation spray gun', 'high pressure spray gun India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Dürr', href: '/products/durr' },
  { name: 'Airless Spray Gun', href: '/products/durr/airless-gun' },
]);

const faqLD = faqSchema([
  {
    q: 'What is an airless spray gun?',
    a: 'An airless spray gun atomises paint by forcing it through a small tip orifice at high hydraulic pressure (typically 50–250 bar) — producing a fan-shaped spray pattern without using compressed air for atomisation. This enables fast, high-build coating application.',
  },
  {
    q: 'When is an airless gun preferred over HVLP?',
    a: 'Airless guns are preferred for thick coatings, high-build primers, and large surface areas where speed of application matters more than fine surface finish. They are faster than HVLP but produce more overspray — suited to structural steel, heavy fabrications, and anti-corrosion applications.',
  },
  {
    q: 'Does OptiFinish supply Dürr airless guns in India?',
    a: 'Yes. OptiFinish is an authorised Dürr distributor in India, supplying EcoGun AL manual and automatic airless spray guns with commissioning, training, and after-sales support.',
  },
]);

export default function DurrAirlessGunPage() {
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
        { label: 'Airless Spray Gun', href: '/products/durr/airless-gun' },
      ]}
      badge="Dürr — Liquid Coating Gun"
      eyebrow="EcoGun AL MAN / EcoGun AL AUTO"
      headline="High pressure."
      headlineAccent="No carrier air."
      subline="High-pressure airless spray guns for anti-corrosion work on structural steel, heavy machinery, and heavy-duty coating — atomising paint by forcing it at high pressure through a precision tip orifice, with no air carrier required."
      heroImageLabel="Dürr EcoGun AL MAN / AL AUTO · airless spray gun"
      heroImageAspect="aspect-[4/3]"
      heroVideoId="uxASgFWWxpg"
      heroVideoStart={9}
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
        'EcoGun AL MAN for manual operation, EcoGun AL AUTO for automated line integration',
        'Compatible with EcoPump VP high-pressure pump packages for high-viscosity material delivery',
      ]}

      variants={[
        {
          id: 'ecogun-al-man',
          label: 'EcoGun AL MAN',
          tag: 'Manual Airless',
          headline: 'Manual high-pressure airless for anti-corrosion work.',
          body: 'The EcoGun AL MAN is the manual airless variant for structural steel anti-corrosion coating — reliable, field-serviceable, with reversible tip system for pattern adjustment without stopping production. Operated by hand for flexible, targeted application.',
          specs: [
            { l: 'Atomisation', v: 'High-pressure hydraulic — no air carrier' },
            { l: 'Operation', v: 'Manual — hand-held application' },
            { l: 'Tip system', v: 'Reversible — multiple sizes for pattern and output control' },
            { l: 'Best for', v: 'Structural steel anti-corrosion coating, epoxies, site work' },
            { l: 'Compatible pump', v: 'Dürr EcoPump VP series' },
          ],
          imageLabel: 'Dürr EcoGun AL MAN · manual airless gun',
          imageSrc: '/images/products/durr/airless-gun/durr-ecogun-al246-01.jpg',
        },
        {
          id: 'ecogun-al-auto',
          label: 'EcoGun AL AUTO',
          tag: 'Automatic Airless',
          headline: 'Automatic airless for integrated coating lines.',
          body: 'The EcoGun AL AUTO is designed for integration into automated coating systems — reciprocators, gantries, and conveyorised lines. Higher throughput, consistent trigger timing, and remote fluid control make it the choice for production-volume anti-corrosion and industrial coating operations.',
          specs: [
            { l: 'Atomisation', v: 'High-pressure hydraulic — no air carrier' },
            { l: 'Operation', v: 'Automatic — reciprocator and line integration' },
            { l: 'Tip system', v: 'Reversible — compatible with standard AL series tips' },
            { l: 'Best for', v: 'Automated lines, large structural steel areas, high-build coatings' },
            { l: 'Compatible pump', v: 'Dürr EcoPump VP series (high-pressure)' },
          ],
          imageLabel: 'Dürr EcoGun AL AUTO · automatic airless gun',
          imageSrc: '/images/products/durr/airless-gun/durr-ecogun-al-auto-01.jpg',
        },
      ]}
      variantsSectionTitle="EcoGun AL MAN or AL AUTO — manual or automated"

      applicationImages={[
        { src: '/images/products/durr/airless-gun/Application/structural_steel_corrosion.webp', label: 'Structural steel anti-corrosion coating' },
        { src: '/images/products/durr/airless-gun/application/zinc-rich-primer.jpeg', label: 'Zinc-rich primer coating' },
        { src: '/images/products/durr/airless-gun/application/bitumen-coating.jpg', label: 'Bitumen & rubberised coating' },
        { src: '/images/products/durr/airless-gun/application/heavy-machinery.jpg', label: 'Heavy machinery painting' },
        { src: '/images/products/durr/airless-gun/application/steel-fabrication.avif', label: 'Steel fabrication coating' },
        { src: '/images/products/durr/airless-gun/application/industrial-high-build-projects.jpeg', label: 'Industrial high-build projects' },
      ]}

      specRows={[
        { l: 'Atomisation type', v: 'High-pressure hydraulic — no carrier air' },
        { l: 'Models', v: 'EcoGun AL MAN (manual) · EcoGun AL AUTO (automatic)' },
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
          imageSrc: '/images/products/optifinish-manufactured/liquid-spray-booth/liquid-single-operator-booth.png',
        },
      ]}

      ctaHeadline="Specify your airless system."
      ctaAccent="Gun, pump, and booth together."
      ctaBody="Talk to OptiFinish about your coating material, substrate, and coverage area — we'll specify the right EcoGun AL model, tip size, and EcoPump configuration."
    />
    </>
  );
}
