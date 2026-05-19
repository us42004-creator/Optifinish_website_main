import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Touch-Up Paints — Industrial & Automotive Touch-Up | Vinayak Agencies',
  description:
    'Touch-up paints supplied by Vinayak Agencies — Kansai Nerolac industrial touch-up range in spray cans, brush-apply, and bulk formats for powder coating repair, automotive, and metal surface touch-ups.',
  keywords: [
    'touch up paint India',
    'industrial touch up paint India',
    'powder coating touch up paint',
    'Nerolac touch up India',
    'Vinayak touch up paint',
    'metal touch up paint India',
    'coating repair paint India',
  ],
  alternates: { canonical: `${SITE.url}/products/vinayak/touchup-paints` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Touch-Up Paints — Industrial & Automotive Touch-Up | Vinayak Agencies',
    description: 'Kansai Nerolac industrial touch-up range — spray cans, brush-apply, and bulk formats for metal and powder coat repair.',
    url: `${SITE.url}/products/vinayak/touchup-paints`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Industrial Touch-Up Paints | Vinayak Agencies',
    description: 'Nerolac touch-up paints for powder coating repair, metal surfaces, and automotive touch-up.',
  },
};

const productLD = productSchema({
  name: 'Industrial Touch-Up Paints',
  description: 'Touch-up paints supplied by Vinayak Agencies — Kansai Nerolac industrial touch-up range in spray cans, brush-apply, and bulk formats for powder coating repair, automotive, and metal surface touch-ups.',
  url: '/products/vinayak/touchup-paints',
  brand: 'Kansai Nerolac',
  manufacturer: 'Vinayak Agencies',
  category: 'Touch-Up Coating Materials',
  keywords: ['touch up paint India', 'powder coating touch up', 'industrial touch up paint', 'metal touch up paint'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Vinayak Agencies', href: '/products/vinayak' },
  { name: 'Touch-Up Paints', href: '/products/vinayak/touchup-paints' },
]);

const faqLD = faqSchema([
  {
    q: 'What touch-up paints does Vinayak Agencies supply?',
    a: 'Vinayak Agencies supplies Kansai Nerolac industrial touch-up paints in spray can, brush-apply, and bulk formats — for repairing powder coating damage, metal surface scratches, and production line touch-up work.',
  },
  {
    q: 'Can touch-up paint match existing powder coating colours?',
    a: 'Nerolac offers colour-matched touch-up formulations for many standard powder coating colours. For custom colour matching, contact Vinayak Agencies at +91-96434-03374 with a sample or the original powder coating code.',
  },
  {
    q: 'What is the difference between touch-up paint and powder coating?',
    a: 'Touch-up paint is a liquid coating applied to small areas for repair — it does not require an oven and is used for localised damage after powder coating. It cannot replicate the full durability and texture of a factory powder coat but is the practical solution for on-site repair.',
  },
]);

export default function VinayakTouchupPaintsPage() {
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
        { label: 'Touch-up Paints', href: '/products/vinayak/touchup-paints' },
      ]}
      badge="Vinayak Agencies — Touch-up Coatings"
      eyebrow="Nerolac Tansy · Paramount"
      headline="Spot repair."
      headlineAccent="Matched finish."
      subline="Touch-up liquid paint formulations from Nerolac Tansy and Paramount — for post-assembly handling damage repair, weld zone touch-up, and field correction on powder-coated and liquid-painted metal surfaces."
      heroStats={[
        { val: 'Spot', label: 'Repair without re-spray' },
        { val: 'Matched', label: 'Colour to production finish' },
        { val: '2', label: 'Brands available' },
      ]}
      heroImageLabel="Vinayak Agencies · touch-up paints — Nerolac Tansy, Paramount"
      heroImageSrc="/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp"
      enquireSlug="vinayak-touchup-paints"
      backHref="/products/vinayak"
      backLabel="← Back to Vinayak Agencies"

      problemHeadline="Post-assembly damage"
      problemAccent="doesn't justify a full re-spray."
      problemBody="Handling scratches, weld zone bare metal, bracket attachment damage, and transit marks are a normal part of fabrication and assembly. Pulling the part back through the paint line for a full re-spray is expensive and disrupts production flow. A colour-matched touch-up paint that bonds correctly to the existing coating surface solves the problem at the point of damage."
      benefits={[
        'Nerolac Tansy touch-up range — reliable adhesion to powder-coated and liquid-painted metal surfaces',
        'Paramount touch-up formulations — fast-drying, good colour matching, competitive for high-volume touch-up',
        'For post-assembly handling damage — brackets, weld zones, clamp marks, and transit scratches',
        'Small volume packaging — brush, aerosol, or small pot application without spray equipment',
        'Colour matching to standard industrial colours — aligned with Vinayak Agencies powder and liquid range',
        'Field-applicable — repair at installation site or assembly line end without specialist equipment',
      ]}

      applicationImages={[
        { src: '/images/products/vinayak/touchup-paints/application/metal-fabrication-quality-control.jpg', label: 'Metal fabrication quality control' },
        { src: '/images/products/vinayak/touchup-paints/application/app-welding-fabrication-01.jpg', label: 'Weld zone touch-up' },
        { src: '/images/products/vinayak/touchup-paints/application/powder-coating-surface-damage.jpg', label: 'Powder coat surface damage repair' },
        { src: '/images/products/vinayak/touchup-paints/application/weld-mark.jpg', label: 'Weld mark correction' },
      ]}

      specRows={[
        { l: 'Nerolac Tansy', v: 'Touch-up liquid paint — adhesion to powder coat and liquid painted metal' },
        { l: 'Paramount', v: 'Touch-up formulations — fast-dry, standard industrial colours, brush/aerosol application' },
        { l: 'Application method', v: 'Brush, aerosol can, or small pot — no spray gun required' },
        { l: 'Substrate', v: 'Over powder coat, alkyd enamel, epoxy, and bare metal (with primer where needed)' },
        { l: 'Dry time', v: 'Fast-dry formulations — surface dry typically 15–30 minutes (confirm per product)' },
        { l: 'Colour range', v: 'Standard industrial colours — RAL-matched and custom on request' },
        { l: 'Supplied by', v: 'Vinayak Agencies — sister concern to OptiFinish, India' },
      ]}

      applications={[
        'Post-assembly handling damage repair on fabricated metal products',
        'Weld zone touch-up on structural steel and frame components',
        'Bracket and hardware attachment point correction',
        'Transit and installation damage repair at site',
        'End-of-line quality pass correction without re-spray',
        'Powder coat surface damage repair on installed equipment',
      ]}

      compatibilityTags={[
        'Over Vinayak Agencies powder coating paints (colour-matched)',
        'Over Kansai Nerolac and Paramount liquid industrial paint finishes',
        'Mild steel, galvanised, and aluminium substrates',
        'Powder-coated and liquid-painted production surfaces',
        'No spray equipment required — site-applicable',
      ]}

      references={[]}

      related={[
        {
          name: 'Powder Coating Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/powder-paints',
          enquireSlug: 'vinayak-powder-paints',
          imageSrc: '/images/products/vinayak/powder-paints/nerolac-powder-coating-01.png',
        },
        {
          name: 'Liquid Industrial Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/liquid-paint',
          enquireSlug: 'vinayak-liquid-paint',
          imageSrc: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',
        },
        {
          name: 'PU Enamel',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/pu-enamel',
          enquireSlug: 'vinayak-pu-enamel',
          imageSrc: '/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp',
        },
      ]}

      ctaHeadline="Colour-matched touch-up."
      ctaAccent="No re-spray needed."
      ctaBody="Talk to OptiFinish about your production finish colour and substrate — we'll specify the right Nerolac Tansy or Paramount touch-up formulation through Vinayak Agencies."
    />
    </>
  );
}
