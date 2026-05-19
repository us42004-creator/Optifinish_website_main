import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Powder Coatings — Kansai Nerolac Industrial Range | Vinayak Agencies',
  description:
    'Vinayak Agencies stocks and supplies Kansai Nerolac powder coatings — one of India\'s largest authorised Nerolac industrial dealers. Full range of polyester, epoxy, hybrid, and special-effect powder coatings, always in stock.',
  keywords: [
    'Nerolac powder coating India',
    'Kansai Nerolac powder coating dealer India',
    'powder coating paint India',
    'industrial powder coating India',
    'polyester powder coating India',
    'epoxy powder coating India',
    'Vinayak Agencies powder paint',
    'powder coating supplier Greater Noida',
  ],
  alternates: { canonical: `${SITE.url}/products/vinayak/powder-paints` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Powder Coatings — Kansai Nerolac Industrial Range | Vinayak Agencies',
    description: 'Authorised Kansai Nerolac powder coating dealer — full range always in stock at Greater Noida.',
    url: `${SITE.url}/products/vinayak/powder-paints`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Kansai Nerolac Powder Coatings | Vinayak Agencies',
    description: 'Full range of Nerolac industrial powder coatings — polyester, epoxy, hybrid, always in stock.',
  },
};

const productLD = productSchema({
  name: 'Kansai Nerolac Powder Coatings',
  description: 'Vinayak Agencies stocks and supplies Kansai Nerolac powder coatings — full range of polyester, epoxy, hybrid, and special-effect powder coatings, always in stock at Greater Noida.',
  url: '/products/vinayak/powder-paints',
  brand: 'Kansai Nerolac',
  manufacturer: 'Vinayak Agencies',
  category: 'Powder Coating Materials',
  keywords: ['Nerolac powder coating', 'powder coating paint India', 'polyester powder coating', 'epoxy powder coating'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Vinayak Agencies', href: '/products/vinayak' },
  { name: 'Powder Coatings', href: '/products/vinayak/powder-paints' },
]);

const faqLD = faqSchema([
  {
    q: 'What powder coating brands does Vinayak Agencies supply?',
    a: 'Vinayak Agencies is one of India\'s largest authorised Kansai Nerolac industrial dealers — supplying the full range of Nerolac powder coatings including polyester, epoxy-polyester hybrid, pure epoxy, TGIC-free, and special-effect finishes.',
  },
  {
    q: 'Does Vinayak Agencies keep powder coatings in stock?',
    a: 'Yes. Vinayak Agencies maintains a large ready-stock inventory of Kansai Nerolac powder coatings at the Greater Noida facility — enabling same-day or next-day supply for urgent production requirements.',
  },
  {
    q: 'What is the minimum order quantity for powder coatings from Vinayak?',
    a: 'Vinayak Agencies supplies powder coatings in standard 20 kg boxes with no restrictive minimum order — contact us at +91-96434-03374 or info@optifinish.in for pricing and availability.',
  },
]);

export default function VinayakPowderPaintsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
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
      heroImageSrc="/images/products/vinayak/powder-paints/powder-optifinish-ou6fj3aa340eugh1kkz0yz9yhfm73ery5inqr04248.jpg.webp"
      heroImageAspect="aspect-[4/3]"
      heroImageCover
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

      applicationImages={[
        { src: '/images/products/vinayak/powder-paints/application/app-metal-fabrication-01.jpg', label: 'Metal fabrication & structural steel' },
        { src: '/images/products/vinayak/powder-paints/application/app-agriculture-01.jpg', label: 'Agricultural & construction equipment' },
        { src: '/images/products/vinayak/powder-paints/application/app-aluminium-01.jpg', label: 'Architectural aluminium extrusions' },
        { src: '/images/products/vinayak/powder-paints/application/app-electrical-01.jpg', label: 'Electrical enclosures & switchgear' },
        { src: '/images/products/vinayak/powder-paints/application/almirah.jpg.webp', label: 'Consumer goods & furniture' },
      ]}

      downloads={[
        { label: 'Nerolac Shade Card (PDF)', href: '/images/products/vinayak/powder-paints/Vacspl Nerolac Shade Card.pdf' },
      ]}

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
          imageSrc: '/images/products/optifinish-manufactured/powder-coating-plant/optifinish-powder-coating-plant-01.jpg',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
      ]}

      ctaHeadline="Powder supply alongside the plant."
      ctaAccent="Vinayak Agencies stocks what you need."
      ctaBody="Talk to OptiFinish about your substrate, finish grade, and colour requirements — we'll specify the right powder formulation and brand from the Vinayak Agencies range."
    />
    </>
  );
}
