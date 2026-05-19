import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'PU Enamel — Polyurethane Industrial Enamel | Vinayak Agencies',
  description:
    'PU enamel and synthetic enamel supplied by Vinayak Agencies — Kansai Nerolac polyurethane industrial coatings for high-durability, high-gloss metal, machinery, and infrastructure applications.',
  keywords: [
    'PU enamel India',
    'polyurethane enamel India',
    'industrial PU coating India',
    'Nerolac PU enamel India',
    'Vinayak PU enamel',
    'high gloss industrial paint India',
    '2K PU coating India',
    'durable metal enamel India',
  ],
  alternates: { canonical: `${SITE.url}/products/vinayak/pu-enamel` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'PU Enamel — Polyurethane Industrial Enamel | Vinayak Agencies',
    description: 'Kansai Nerolac polyurethane industrial coatings — high-durability, high-gloss enamel for metal, machinery, and infrastructure.',
    url: `${SITE.url}/products/vinayak/pu-enamel`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'PU Enamel — Polyurethane Industrial | Vinayak Agencies',
    description: 'Nerolac PU enamel — high-durability, high-gloss polyurethane industrial coatings from Vinayak Agencies.',
  },
};

const productLD = productSchema({
  name: 'PU Enamel — Polyurethane Industrial Enamel',
  description: 'PU enamel and synthetic enamel supplied by Vinayak Agencies — Kansai Nerolac polyurethane industrial coatings for high-durability, high-gloss metal, machinery, and infrastructure applications.',
  url: '/products/vinayak/pu-enamel',
  brand: 'Kansai Nerolac',
  manufacturer: 'Vinayak Agencies',
  category: 'Industrial Liquid Coatings',
  keywords: ['PU enamel India', 'polyurethane enamel', '2K PU coating', 'high gloss industrial paint'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Vinayak Agencies', href: '/products/vinayak' },
  { name: 'PU Enamel', href: '/products/vinayak/pu-enamel' },
]);

const faqLD = faqSchema([
  {
    q: 'What is PU enamel and where is it used?',
    a: 'PU (polyurethane) enamel is a two-component liquid coating offering superior hardness, chemical resistance, and gloss retention compared to standard alkyd enamels — used on industrial machinery, vehicles, structural steel, and high-value fabrications where long-term appearance and durability are critical.',
  },
  {
    q: 'What is the difference between PU enamel and synthetic enamel?',
    a: 'Synthetic (alkyd) enamel is a single-component air-drying paint offering good durability at lower cost. PU enamel is a 2K (two-component) system requiring a hardener — significantly higher durability, chemical resistance, and UV stability, justified for demanding industrial applications.',
  },
  {
    q: 'Does Vinayak supply 2K PU coating systems?',
    a: 'Yes. Vinayak Agencies supplies Kansai Nerolac 2K polyurethane coating systems — compatible with Dürr EcoDose 2K dosing systems (also available from OptiFinish) for automated, ratio-controlled 2K application.',
  },
]);

export default function VinayakPuEnamelPage() {
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
        { label: 'PU Enamel', href: '/products/vinayak/pu-enamel' },
      ]}
      badge="Vinayak Agencies — Enamel Finishes"
      eyebrow="Nerolac PU Enamel · Hi-Gloss Synthetic · Satin Enamel"
      headline="Premium enamel finishes."
      headlineAccent="Industrial and decorative."
      subline="Nerolac PU Enamel 10-in-1, Hi-Gloss Synthetic Enamel, and Satin Enamel — premium surface finish formulations for metal, wood, and primed substrates in industrial production and high-specification decorative applications."
      heroStats={[
        { val: '10-in-1', label: 'PU Enamel multi-benefit' },
        { val: 'Hi-Gloss', label: 'Synthetic enamel grade' },
        { val: 'Satin', label: 'Low-sheen finish grade' },
      ]}
      heroImageLabel="Vinayak Agencies · Nerolac PU Enamel, Hi-Gloss Synthetic, Satin Enamel"
      heroImageSrc="/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp"
      heroImageAspect="aspect-[4/3]"
      heroImageCover
      enquireSlug="vinayak-pu-enamel"
      backHref="/products/vinayak"
      backLabel="← Back to Vinayak Agencies"

      problemHeadline="Standard enamel"
      problemAccent="doesn't always meet the finish brief."
      problemBody="Basic alkyd enamel yellows under UV, loses gloss too quickly in high-traffic environments, and doesn't offer the durability expected in industrial or premium decorative applications. Nerolac's PU Enamel and synthetic enamel range provides upgraded surface performance — better gloss retention, improved hardness, and longer service life."
      benefits={[
        'Nerolac PU Enamel 10-in-1: polyurethane-modified multi-benefit enamel — superior hardness, gloss retention, and washability vs standard alkyd',
        'Nerolac Hi-Gloss Synthetic Enamel: full-gloss alkyd enamel for metal and wood — cost-effective high-gloss industrial finish',
        'Nerolac Satin Enamel: low-sheen finish grade for applications requiring a controlled, non-reflective surface',
        'All grades supplied through Vinayak Agencies as authorised Nerolac distributor',
        'Suitable for brush, roller, and spray gun application depending on grade',
        'Wide colour range across all three grades — standard and custom colours on request',
      ]}

      variants={[
        {
          id: 'pu-enamel',
          label: 'PU Enamel 10-in-1',
          tag: 'Polyurethane Modified — Premium Grade',
          headline: 'Multi-benefit PU enamel for demanding applications.',
          body: 'Nerolac PU Enamel 10-in-1 combines polyurethane modification with alkyd technology — delivering superior hardness, gloss retention, stain resistance, and washability in a single product. The preferred grade where standard enamel gloss life or hardness is insufficient.',
          specs: [
            { l: 'Binder type', v: 'Polyurethane-modified alkyd' },
            { l: 'Finish', v: 'High gloss — superior gloss retention vs standard alkyd' },
            { l: 'Key benefits', v: 'Hardness, gloss retention, stain resistance, washability' },
            { l: 'Application', v: 'Brush, roller, or spray — metal and wood substrates' },
          ],
          imageLabel: 'Nerolac PU Enamel 10-in-1 · polyurethane modified premium enamel',
          imageSrc: '/images/products/vinayak/pu-enamel/nerolac-pu-enamel-10in1-01.png',
        },
        {
          id: 'hi-gloss',
          label: 'Hi-Gloss Synthetic Enamel',
          tag: 'Full Gloss — Industrial & Decorative',
          headline: 'Full-gloss alkyd enamel for metal and wood.',
          body: 'Nerolac Hi-Gloss Synthetic Enamel — standard alkyd enamel formulation providing a full-gloss finish on metal and wood substrates. Cost-effective for high-volume industrial painting and general maintenance coating where gloss is the primary requirement.',
          specs: [
            { l: 'Binder type', v: 'Alkyd synthetic' },
            { l: 'Finish', v: 'Full gloss' },
            { l: 'Best for', v: 'Industrial metal, structural steel, doors, grilles, and general maintenance' },
            { l: 'Application', v: 'Brush, roller, or spray application' },
          ],
          imageLabel: 'Nerolac Hi-Gloss Synthetic Enamel · full-gloss industrial enamel',
          imageSrc: '/images/products/vinayak/pu-enamel/nerolac-higloss-enamel-01.png',
        },
        {
          id: 'satin',
          label: 'Satin Enamel',
          tag: 'Low-Sheen — Controlled Finish',
          headline: 'Controlled low-sheen finish where gloss is not required.',
          body: 'Nerolac Satin Enamel provides a controlled low-sheen surface finish for applications where a full-gloss surface would be visually inappropriate or show surface imperfections. Suitable for interior metal, cabinetry, and surface finishing where a premium look without full gloss is specified.',
          specs: [
            { l: 'Binder type', v: 'Alkyd synthetic — low-sheen grade' },
            { l: 'Finish', v: 'Satin — low sheen, controlled reflectance' },
            { l: 'Best for', v: 'Interior metal surfaces, cabinetry, and premium decorative applications' },
            { l: 'Application', v: 'Brush, roller, or spray application' },
          ],
          imageLabel: 'Nerolac Satin Enamel · low-sheen controlled finish enamel',
          imageSrc: '/images/products/vinayak/pu-enamel/nerolac-satin-enamel-02.png',
        },
      ]}
      variantsSectionTitle="Select the Nerolac enamel grade for your application"

      applicationImages={[
        { src: '/images/products/vinayak/pu-enamel/application/app-metal-gate-01.jpg', label: 'Metal gates & decorative ironwork' },
        { src: '/images/products/vinayak/pu-enamel/application/app-structural-steel-01.jpg', label: 'Structural steel & infrastructure' },
        { src: '/images/products/vinayak/pu-enamel/application/app-wood-furniture-01.jpg', label: 'Wood furniture & cabinetry' },
        { src: '/images/products/vinayak/pu-enamel/application/app-metal-door-01.jpg', label: 'Metal doors & frames' },
        { src: '/images/products/vinayak/pu-enamel/application/nerolac-satin-enamel-01.jpg', label: 'Satin enamel finish — interior surfaces' },
      ]}

      specRows={[
        { l: 'PU Enamel 10-in-1', v: 'Polyurethane-modified alkyd — premium hardness, gloss retention, stain resistance' },
        { l: 'Hi-Gloss Synthetic', v: 'Standard alkyd — full gloss finish for industrial metal and wood' },
        { l: 'Satin Enamel', v: 'Alkyd low-sheen — controlled reflectance for interior and decorative applications' },
        { l: 'Application method', v: 'Brush, roller, or spray (formulation-specific — confirm with Vinayak Agencies)' },
        { l: 'Substrate', v: 'Metal and wood — primed substrate recommended for all grades' },
        { l: 'Supplied by', v: 'Vinayak Agencies — authorised Nerolac distributor, India' },
      ]}

      applications={[
        'Industrial metal fabrication — structural steel, gates, grilles, and frames',
        'Maintenance and repair coating for metal equipment and infrastructure',
        'Interior metal surfaces requiring a non-gloss controlled finish (Satin grade)',
        'Premium decorative applications on wood and metal where gloss retention matters (PU Enamel)',
        'High-volume production painting where cost-effective gloss enamel is specified (Hi-Gloss Synthetic)',
        'General maintenance painting for industrial facilities and equipment',
      ]}

      compatibilityTags={[
        'Dürr EcoGun HVLP and cup gun (spray application)',
        'OptiFinish liquid spray booth',
        'Metal and wood substrates with correct primer',
        'Vinayak Agencies primer and undercoat range',
        'Standard alkyd thinners (confirm per grade)',
      ]}

      references={[]}

      related={[
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
        {
          name: 'Adhesives',
          category: 'Vinayak Agencies',
          href: '/products/vinayak/adhesives',
          enquireSlug: 'vinayak-adhesives',
          imageSrc: '/images/products/vinayak/adhesives/nerolac-nerofix-01.png',
        },
      ]}

      ctaHeadline="Premium enamel for your specification."
      ctaAccent="PU, Hi-Gloss, or Satin — Vinayak stocks all three."
      ctaBody="Talk to OptiFinish about your substrate, finish requirement, and application volume — we'll specify the right Nerolac enamel grade through Vinayak Agencies."
    />
    </>
  );
}
