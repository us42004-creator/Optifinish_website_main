import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Industrial Liquid Paints — Kansai Nerolac Range | Vinayak Agencies',
  description:
    'Vinayak Agencies supplies Kansai Nerolac industrial liquid paints — synthetic enamels, primers, metal paints, and protective coatings for heavy industry, infrastructure, and general metal fabrication applications.',
  keywords: [
    'Nerolac industrial paint India',
    'liquid paint supplier India',
    'industrial metal paint India',
    'Nerolac enamel paint India',
    'Vinayak liquid paint',
    'industrial coating supplier Greater Noida',
    'metal paint dealer India',
  ],
  alternates: { canonical: `${SITE.url}/products/vinayak/liquid-paint` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Industrial Liquid Paints — Kansai Nerolac Range | Vinayak Agencies',
    description: 'Kansai Nerolac industrial liquid paints — synthetic enamels, primers, and protective coatings for metal fabrication.',
    url: `${SITE.url}/products/vinayak/liquid-paint`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Kansai Nerolac Industrial Liquid Paints | Vinayak Agencies',
    description: 'Synthetic enamels, primers, and metal paints from Kansai Nerolac — supplied by Vinayak Agencies.',
  },
};

const productLD = productSchema({
  name: 'Kansai Nerolac Industrial Liquid Paints',
  description: 'Vinayak Agencies supplies Kansai Nerolac industrial liquid paints — synthetic enamels, primers, metal paints, and protective coatings for heavy industry, infrastructure, and general metal fabrication applications.',
  url: '/products/vinayak/liquid-paint',
  brand: 'Kansai Nerolac',
  manufacturer: 'Vinayak Agencies',
  category: 'Industrial Liquid Coatings',
  keywords: ['Nerolac industrial paint', 'liquid paint supplier India', 'industrial metal paint', 'synthetic enamel India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Vinayak Agencies', href: '/products/vinayak' },
  { name: 'Liquid Industrial Paints', href: '/products/vinayak/liquid-paint' },
]);

const faqLD = faqSchema([
  {
    q: 'What industrial liquid paints does Vinayak Agencies supply?',
    a: 'Vinayak Agencies supplies the Kansai Nerolac industrial liquid paint range — including synthetic enamels, alkyd primers, metal paints, machinery enamels, and protective coatings for structural steel, heavy equipment, and general fabrication.',
  },
  {
    q: 'Is Vinayak Agencies an authorised Nerolac dealer?',
    a: 'Yes. Vinayak Agencies is one of India\'s largest authorised Kansai Nerolac industrial dealers, with direct supply relationships and large stock holdings at the Greater Noida facility.',
  },
  {
    q: 'Can Vinayak supply industrial paints for spray booth application?',
    a: 'Yes. Vinayak Agencies supplies liquid paints compatible with the full Dürr EcoGun spray gun range — also available from OptiFinish — making it a complete source for both liquid coating equipment and materials.',
  },
]);

export default function VinayakLiquidPaintPage() {
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

      applicationImages={[
        { src: '/images/products/vinayak/liquid-paint/application/nerolac-high-performance-coatings.webp', label: 'High-performance industrial coatings' },
        { src: '/images/products/vinayak/liquid-paint/application/app-agriculture-01.jpg', label: 'Agricultural & construction equipment' },
        { src: '/images/products/vinayak/liquid-paint/application/metal-fabrication.jpg', label: 'Metal fabrication primer & topcoat' },
        { src: '/images/products/vinayak/liquid-paint/application/furniture.jpg', label: 'Furniture & metal frame finishing' },
        { src: '/images/products/vinayak/liquid-paint/application/electrical-control-panel.webp', label: 'Electrical enclosures & control panels' },
      ]}

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
          imageSrc: '/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp',
        },
        {
          name: 'Liquid Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/liquid-spray-booth',
          enquireSlug: 'liquid-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/liquid-spray-booth/liquid-single-operator-booth.png',
        },
      ]}

      ctaHeadline="Paint supply alongside the booth."
      ctaAccent="Vinayak Agencies stocks both brands."
      ctaBody="Talk to OptiFinish about your substrate, service environment, and application method — we'll specify the right primer and topcoat from the Kansai Nerolac and Paramount Tansy ranges."
    />
    </>
  );
}
