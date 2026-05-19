import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'SS-304 Booth System — Pollution-Free Powder Coating Booth | OptiFinish',
  description:
    'SS-304 stainless steel booth systems manufactured by OptiFinish — fully pollution-free construction, easy-clean surfaces, suitable for food, pharmaceutical, and precision powder coating applications.',
  keywords: [
    'SS-304 powder coating booth India',
    'stainless steel booth manufacturer India',
    'pollution-free powder coating booth',
    'SS booth system India',
    'SS304 spray booth India',
    'OptiFinish SS booth',
    'food grade coating booth India',
  ],
  alternates: { canonical: `${SITE.url}/products/optifinish-manufactured/ss-booth-system` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'SS-304 Booth System — Pollution-Free Powder Coating Booth | OptiFinish',
    description: 'Full SS-304 powder coating booth — pollution-free, easy-clean, suitable for pharmaceutical, food, and precision environments. Manufactured by OptiFinish.',
    url: `${SITE.url}/products/optifinish-manufactured/ss-booth-system`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'SS-304 Booth System — Pollution-Free | OptiFinish',
    description: 'Full SS-304 powder coating booth — pollution-free construction, 92–96% recovery, pharmaceutical and food grade.',
  },
};

const productLD = productSchema({
  name: 'SS-304 Booth System',
  description: 'SS-304 stainless steel booth systems manufactured by OptiFinish — fully pollution-free construction, easy-clean surfaces, suitable for food, pharmaceutical, and precision powder coating applications.',
  url: '/products/optifinish-manufactured/ss-booth-system',
  category: 'Industrial Spray Booth',
  keywords: ['SS-304 powder coating booth', 'stainless steel booth', 'pollution-free powder coating booth', 'SS booth system'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
  { name: 'SS Booth System', href: '/products/optifinish-manufactured/ss-booth-system' },
]);

const faqLD = faqSchema([
  {
    q: 'What is an SS-304 booth system?',
    a: 'An SS-304 booth system is a powder coating spray booth constructed entirely from SS-304 stainless steel — offering corrosion resistance, contamination-free surfaces, easy cleaning, and compliance with stringent hygiene and quality requirements.',
  },
  {
    q: 'When should I choose an SS-304 booth over MS?',
    a: 'SS-304 booths are specified when contamination control is critical — such as in food processing equipment, pharmaceutical machinery, medical devices, or precision components where any rust contamination of the powder is unacceptable.',
  },
  {
    q: 'Does OptiFinish manufacture SS-304 booths in custom sizes?',
    a: 'Yes. OptiFinish manufactures SS-304 booth systems custom-dimensioned to your part size, conveyor type, and throughput requirements — contact us at +91-96434-03374 for a custom specification.',
  },
]);

export default function SSBoothSystemPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'SS Booth System', href: '/products/optifinish-manufactured/ss-booth-system' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="Pollution-Free — Full SS-304 Build"
      headline="Clean environment."
      headlineAccent="Zero compromise."
      subline="A fully stainless-steel powder coating booth where every structural panel, duct, Venturi recovery unit, hopper, and frame is fabricated in SS-304 — designed for pharmaceutical, food, medical, and precision engineering environments that cannot tolerate corrosion risk or contamination."
      heroStats={[
        { val: 'SS-304', label: 'Full construction' },
        { val: '92–96%', label: 'Powder recovery' },
        { val: '0', label: 'Visible exhaust particulate' },
      ]}
      heroImageLabel="SS Booth System · full SS-304 powder coating booth"
      photoGallery={[
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png', label: 'SS-304 Booth — Full View' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/automatic-booth-inside.jpeg', label: 'Booth Interior' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth.jpeg', label: 'Exterior Build' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/booth-exterior.jpeg', label: 'Booth Exterior' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/manual1.jpg', label: 'Manual Configuration' },
      ]}
      enquireSlug="ss-booth-system"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="MS construction corrodes."
      problemAccent="In clean environments, that's unacceptable."
      problemBody="Standard mild steel booths rust in humid environments, shed rust particles into recovered powder, and cannot be properly sanitised for food-adjacent or pharmaceutical applications. The SS Booth System eliminates every MS substrate — panels, ducts, frame, hopper — replacing it with 316-quality SS-304 throughout."
      benefits={[
        'Full SS-304: panels, ducts, Venturi recovery array, hopper, and structural frame — no MS substrate anywhere',
        '92–96% powder recovery rate via Venturi centrifugal separation — zero visible exhaust particulate',
        'Rounded internal corners throughout — fast manual cleandown between colour changes',
        'Dedicated powder recovery separation paths for clean colour change without cross-contamination',
        'Available in single or dual-side spray configuration',
        'Ideal for pharmaceutical equipment, food processing machinery, medical devices, and precision engineering',
      ]}

      specRows={[
        { l: 'Construction', v: 'Full SS-304: panels, ducts, Venturi tubes, hopper, structural frame' },
        { l: 'Recovery rate', v: '92–96% powder recovery by Venturi centrifugal separation' },
        { l: 'Exhaust', v: 'Zero visible particulate — secondary bag filter as standard' },
        { l: 'Internal corners', v: 'Rounded throughout — fast manual cleandown' },
        { l: 'Colour change', v: 'Dedicated recovery separation; quick cleaning between batches' },
        { l: 'Configuration', v: 'Single or dual-side spray; custom sizing' },
        { l: 'Application environments', v: 'Pharmaceutical, food equipment, medical devices, precision engineering' },
      ]}

      applications={[
        'Pharmaceutical processing equipment and vessels',
        'Food machinery, conveyors, and processing lines',
        'Medical device housings and components',
        'Precision-engineered components for clean environments',
        'Architectural hardware for high-specification projects',
        'Laboratory and scientific equipment finishing',
      ]}
      applicationImages={[
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/application/pharma-sector-machinery.jpg', label: 'Pharma sector machinery' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/application/food-machinery-processing-lines.webp', label: 'Food machinery & processing lines' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/application/lab-scientific-equipment.webp', label: 'Lab & scientific equipment' },
        { src: '/images/products/optifinish-manufactured/SS_BOOTH/application/architectural-hardware.webp', label: 'Architectural hardware' },
      ]}

      compatibilityTags={[
        'GEMA OptiFlex Pro (all models)',
        'GEMA OptiGun GA02 / GA03',
        'GEMA OC08 OptiCentre',
        'All standard manual and automatic powder guns',
      ]}

      references={[]}

      related={[
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
        {
          name: 'Plastic / PP Booth',
          category: 'GEMA',
          href: '/products/gema/plastic-pp-booth',
          enquireSlug: 'plastic-booth',
          imageSrc: '/images/products/gema/plastic-pp-booth/plastic-booth-cropped.jpeg',
        },
        {
          name: 'Cyclone & Dust Collector',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/cyclone-dust-collector',
          enquireSlug: 'cyclone-dust-collector',
          imageSrc: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-dust-collect.png',
        },
      ]}

      ctaHeadline="Specify your SS booth system."
      ctaAccent="Built for demanding environments."
      ctaBody="Talk to OptiFinish about your hygiene, corrosion, and colour change requirements — we'll design the SS booth system to your environment and part specifications."
    />
    </>
  );
}
