import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Industrial Adhesives — NeroFix & Construction Adhesives | Vinayak Agencies',
  description:
    'Industrial adhesives supplied by Vinayak Agencies — NeroFix construction and industrial adhesives for bonding metal, glass, rubber, and composite materials in fabrication, assembly, and construction applications.',
  keywords: [
    'NeroFix adhesive India',
    'industrial adhesive India',
    'construction adhesive India',
    'Vinayak adhesive supplier',
    'metal bonding adhesive India',
    'Nerolac adhesive India',
    'structural adhesive India',
  ],
  alternates: { canonical: `${SITE.url}/products/vinayak/adhesives` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Industrial Adhesives — NeroFix & Construction Adhesives | Vinayak Agencies',
    description: 'NeroFix industrial and construction adhesives — bonding metal, glass, rubber, and composites. Supplied by Vinayak Agencies.',
    url: `${SITE.url}/products/vinayak/adhesives`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'NeroFix Industrial Adhesives | Vinayak Agencies',
    description: 'Construction and industrial adhesives for metal, glass, rubber, and composite bonding — Vinayak Agencies.',
  },
};

const productLD = productSchema({
  name: 'NeroFix Industrial Adhesives',
  description: 'Industrial adhesives supplied by Vinayak Agencies — NeroFix construction and industrial adhesives for bonding metal, glass, rubber, and composite materials in fabrication, assembly, and construction applications.',
  url: '/products/vinayak/adhesives',
  brand: 'Kansai Nerolac',
  manufacturer: 'Vinayak Agencies',
  category: 'Industrial Adhesives',
  keywords: ['NeroFix adhesive', 'industrial adhesive India', 'construction adhesive India', 'metal bonding adhesive'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Vinayak Agencies', href: '/products/vinayak' },
  { name: 'Adhesives', href: '/products/vinayak/adhesives' },
]);

const faqLD = faqSchema([
  {
    q: 'What adhesives does Vinayak Agencies supply?',
    a: 'Vinayak Agencies supplies the Kansai Nerolac NeroFix range of construction and industrial adhesives — for bonding metal, glass, ceramic, rubber, and composite materials in fabrication, assembly, and construction applications.',
  },
  {
    q: 'What is NeroFix adhesive used for?',
    a: 'NeroFix adhesives are used for structural bonding in metal fabrication, panel mounting, construction joint sealing, and assembly applications where high-strength, durable bonding without mechanical fasteners is required.',
  },
  {
    q: 'Can I order NeroFix adhesives alongside coating materials from Vinayak?',
    a: 'Yes. Vinayak Agencies supplies adhesives, powder coatings, liquid paints, touch-up paints, and PU enamels together — simplifying procurement for fabricators and coating contractors who need both materials from a single trusted supplier.',
  },
]);

export default function VinayakAdhesivesPage() {
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
        { label: 'Adhesives', href: '/products/vinayak/adhesives' },
      ]}
      badge="Vinayak Agencies — Industrial Adhesives"
      eyebrow="Nerolac NeroFix · NeroFix Aqua Smart"
      headline="Strong bond."
      headlineAccent="2 hours. Waterproof."
      subline="Nerolac NeroFix and NeroFix Aqua Smart — fast drying strong adhesives for laminates, veneers, wood joinery, and furniture assembly. Water resistant, high coverage, and safe to use. Supplied by Vinayak Agencies."
      heroStats={[
        { val: '2 hrs', label: 'Strong bond in 2 hours' },
        { val: 'Waterproof', label: 'NeroFix Aqua Smart' },
        { val: 'Nerolac', label: 'Kansai Paint brand' },
      ]}
      heroImageLabel="Vinayak Agencies · Nerolac synthetic glue and white PVA adhesive"
      heroImageSrc="/images/products/vinayak/adhesives/adhesives-hero.webp"
      heroImageAspect="aspect-[4/3]"
      heroImageBg="#8CC640"
      enquireSlug="vinayak-adhesives"
      backHref="/products/vinayak"
      backLabel="← Back to Vinayak Agencies"

      problemHeadline="Adhesive and coating"
      problemAccent="sourced separately — complicates supply."
      problemBody="Furniture and wood finishing operations need both adhesive for assembly and surface coating for finish — often from different suppliers, with separate ordering, lead times, and accounts. Vinayak Agencies stocks both the adhesive and the coating range, so wood finishing operations can consolidate supply through a single relationship."
      benefits={[
        'NeroFix — fast drying strong adhesive, strong bond in 2 hours for laminates, veneers, and decorative surfaces',
        'NeroFix Aqua Smart — waterproof bond in 2 hours, adhesive for woodworking with sustainability certification',
        'Water resistant formulation — NeroFix holds in humid environments and surface-moisture conditions',
        'High coverage — economical use per application, more area covered per kg',
        'Easy to spread — smooth application by brush or notched spreader, no specialist equipment',
        'Nerolac brand by Kansai Paint — Nerolac Experience Lab certified, consistent quality across batches',
      ]}

      variants={[
        {
          id: 'nerofix',
          label: 'NeroFix',
          tag: 'Fast Drying Strong Adhesive',
          headline: 'Strong bond in 2 hours. Water resistant.',
          body: 'Nerolac NeroFix is a fast drying strong adhesive for laminates, veneers, and decorative surface bonding. Forms a strong bond in 2 hours. Water resistant, economical with high coverage, and easy to spread — for furniture manufacturing, interior fit-out, and general fabrication assembly.',
          specs: [
            { l: 'Bond time', v: 'Strong bond in 2 hours' },
            { l: 'Water resistance', v: 'Water resistant formulation' },
            { l: 'Best for', v: 'Laminates, veneers, decorative sheets to MDF/plywood/chipboard' },
            { l: 'Application', v: 'Brush or notched spreader — easy to spread, high coverage' },
          ],
          imageLabel: 'Nerolac NeroFix — fast drying strong adhesive',
          imageSrc: '/images/products/vinayak/adhesives/nerolac-adhesive-01.webp',
        },
        {
          id: 'nerofix-aqua-smart',
          label: 'NeroFix Aqua Smart',
          tag: 'Waterproof Adhesive for Woodworking',
          headline: 'Waterproof bond in 2 hours for woodworking.',
          body: 'Nerolac NeroFix Aqua Smart is a waterproof adhesive engineered specifically for woodworking — delivering a waterproof bond in 2 hours. Certified by Nerolac Experience Lab and built with sustainability credentials by Kansai Paint. For kitchen cabinets, wardrobes, and joinery exposed to moisture.',
          specs: [
            { l: 'Bond time', v: 'Waterproof bond in 2 hours' },
            { l: 'Waterproofing', v: 'Full waterproof bond — suitable for moisture-exposed woodwork' },
            { l: 'Best for', v: 'Kitchen cabinets, wardrobes, wood joinery, furniture assembly' },
            { l: 'Certification', v: 'Nerolac Experience Lab certified — Kansai Paint brand' },
          ],
          imageLabel: 'Nerolac NeroFix Aqua Smart — waterproof woodworking adhesive',
          imageSrc: '/images/products/vinayak/adhesives/nerolac-adhesive-02.webp',
        },
      ]}
      variantsSectionTitle="NeroFix or NeroFix Aqua Smart"

      applicationImages={[
        { src: '/images/products/vinayak/adhesives/application/app-furniture-workshop-01.jpg', label: 'Furniture manufacturing & assembly' },
        { src: '/images/products/vinayak/adhesives/application/app-kitchen-cabinet-01.jpg', label: 'Kitchen cabinet & joinery production' },
        { src: '/images/products/vinayak/adhesives/application/app-laminate-wood-01.jpg', label: 'Laminate & veneer bonding' },
        { src: '/images/products/vinayak/adhesives/application/app-wood-joinery-01.jpg', label: 'Wood joinery & edge bonding' },
      ]}

      specRows={[
        { l: 'NeroFix', v: 'Fast drying strong adhesive — strong bond in 2 hours, water resistant, high coverage' },
        { l: 'NeroFix Aqua Smart', v: 'Waterproof adhesive for woodworking — waterproof bond in 2 hours' },
        { l: 'Bond time', v: '2 hours (both variants)' },
        { l: 'Water resistance', v: 'NeroFix: water resistant — NeroFix Aqua Smart: full waterproof bond' },
        { l: 'Application method', v: 'Brush or notched spreader — easy to spread, no specialist equipment' },
        { l: 'Coverage', v: 'High coverage — economical use per application' },
        { l: 'Brand', v: 'Nerolac by Kansai Paint — Nerolac Experience Lab certified' },
        { l: 'Substrates', v: 'MDF, plywood, chipboard, solid wood, laminates, veneers' },
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
          imageSrc: '/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp',
        },
        {
          name: 'Liquid Industrial Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/liquid-paint',
          enquireSlug: 'vinayak-liquid-paint',
          imageSrc: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',
        },
        {
          name: 'Touch-up Paints',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/touchup-paints',
          enquireSlug: 'vinayak-touchup-paints',
          imageSrc: '/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp',
        },
      ]}

      ctaHeadline="Adhesive and coating — one supplier."
      ctaAccent="Vinayak Agencies stocks both."
      ctaBody="Talk to OptiFinish about your assembly and finishing requirements — we'll supply the right Nerolac adhesive alongside your coating specification through Vinayak Agencies."
    />
    </>
  );
}
