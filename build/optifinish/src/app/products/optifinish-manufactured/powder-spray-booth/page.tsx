import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Powder Spray Booth — MS, SS-304 & Plastic Configurations | OptiFinish',
  description:
    'Powder spray booths manufactured by OptiFinish — MS, SS-304, and plastic construction for manual and automatic powder coating lines. Custom-dimensioned, designed for GEMA and automatic gun compatibility.',
  keywords: [
    'powder spray booth manufacturer India',
    'powder coating booth India',
    'MS powder coating booth',
    'SS powder coating booth India',
    'automatic powder coating booth India',
    'OptiFinish powder booth',
    'powder booth manufacturer Greater Noida',
  ],
  alternates: { canonical: `${SITE.url}/products/optifinish-manufactured/powder-spray-booth` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Powder Spray Booth — MS, SS-304 & Plastic Configurations | OptiFinish',
    description: 'MS, SS-304, and plastic powder spray booths for manual and automatic powder coating lines. Custom-dimensioned. Manufactured by OptiFinish.',
    url: `${SITE.url}/products/optifinish-manufactured/powder-spray-booth`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Powder Spray Booth — MS, SS-304 & Plastic | OptiFinish',
    description: 'Powder spray booths in MS, SS-304, and plastic — manual and automatic lines, custom dimensions, GEMA compatible.',
  },
};

const productLD = productSchema({
  name: 'Powder Spray Booth',
  description: 'Powder spray booths manufactured by OptiFinish — MS, SS-304, and plastic construction for manual and automatic powder coating lines. Custom-dimensioned, designed for GEMA and automatic gun compatibility.',
  url: '/products/optifinish-manufactured/powder-spray-booth',
  category: 'Industrial Spray Booth',
  keywords: ['powder spray booth', 'powder coating booth India', 'MS powder coating booth', 'automatic powder coating booth'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
  { name: 'Powder Spray Booth', href: '/products/optifinish-manufactured/powder-spray-booth' },
]);

const faqLD = faqSchema([
  {
    q: 'What materials does OptiFinish manufacture powder spray booths in?',
    a: 'OptiFinish manufactures powder spray booths in three construction types: mild steel (MS), SS-304 stainless steel, and polypropylene (plastic) — each suited to different powder types, cleaning requirements, and quick colour-change needs.',
  },
  {
    q: 'Is the OptiFinish powder spray booth compatible with GEMA guns?',
    a: 'Yes. OptiFinish powder spray booths are designed to integrate with GEMA OptiFlex Pro manual guns and GEMA OptiGun automatic guns, which are also supplied by OptiFinish as an authorised GEMA partner.',
  },
  {
    q: 'Can OptiFinish supply a booth for an automatic powder coating line?',
    a: 'Yes. OptiFinish manufactures booths for both manual and fully automatic powder coating lines, including configurations for reciprocators, Z-TAP automation robots, and GEMA automatic gun systems.',
  },
]);

export default function PowderSprayBoothPage() {
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
        { label: 'Powder Spray Booth', href: '/products/optifinish-manufactured/powder-spray-booth' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="MS / SS-304 — Manual & Automatic"
      headline="92–96% powder recovery."
      headlineAccent="Built into the booth."
      subline="A powder spray enclosure with integrated SS-304 Venturi recovery system and secondary bag filter — recovering 92–96% of over-sprayed powder and returning it to the hopper, continuously, without manual intervention."
      heroStats={[
        { val: '92–96%', label: 'Powder recovery rate' },
        { val: '20HP', label: 'Suction motor' },
        { val: 'CPCB', label: 'Compliant exhaust' },
      ]}
      heroImageLabel="Powder Spray Booth · Venturi recovery system"
      heroVideoId="F6vcqBwbsOQ"
      heroVideoPortrait
      mediaShowcase={[
        {
          id: 'automatic',
          label: 'Automatic',
          videoSrc: '/images/products/spray-booth/automatic/automatic-booth.mp4',
          images: [
            { src: '/images/products/spray-booth/automatic/automatic-booth-inside.jpeg', alt: 'Automatic booth interior' },
            { src: '/images/products/spray-booth/automatic/ss-booth.jpeg', alt: 'SS-304 booth construction' },
            { src: '/images/products/spray-booth/automatic/plastic-booth-cropped.jpeg', alt: 'Plastic modular booth' },
            { src: '/images/products/spray-booth/automatic/automatic-booth-guns.jpeg', alt: 'Automatic gun setup' },
          ],
        },
        {
          id: 'manual',
          label: 'Manual',
          videoSrc: '/images/products/spray-booth/manual/manual-booth.mp4',
          images: [
            { src: '/images/products/spray-booth/manual/manual1.jpg', alt: 'Manual powder spray booth' },
            { src: '/images/products/spray-booth/manual/booth-exterior.jpeg', alt: 'Booth exterior view' },
            { src: '/images/products/spray-booth/manual/car-painting-booth.jpeg', alt: 'Car painting booth' },
            { src: '/images/products/spray-booth/manual/semi_automatic_booth.jpeg', alt: 'Semi-automatic booth', objectPosition: '20% center' },
          ],
        },
      ]}
      enquireSlug="powder-spray-booth"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Powder waste is"
      problemAccent="your most controllable cost."
      problemBody="Over-sprayed powder that isn't recovered is powder you paid for and threw away. A well-designed booth with an efficient Venturi recovery system and correctly sized cyclone recovers 92–96% of over-sprayed powder and routes it back to the hopper — dramatically reducing material costs and keeping the booth clean."
      benefits={[
        'SS-304 Venturi tube array — 92–96% powder recovery by centrifugal separation without moving parts',
        '20HP suction motor with Siemens-class VFD panel — consistent negative pressure throughout the booth',
        'Secondary bag filter captures residual fine particles before exhaust — CPCB compliant',
        'Compatible with GEMA manual/automatic guns, OptiFinish ZA01, Z-TAP, and all standard powder guns',
        'MS standard construction or full SS-304 for demanding environments',
        'Custom internal dimensions — matched to your part envelope and gun layout',
      ]}

      specRows={[
        { l: 'Standard internal size', v: '5000 × 1200 × 3050 mm (custom to part and gun layout)' },
        { l: 'Construction', v: 'MS standard; full SS-304 available' },
        { l: 'Recovery system', v: 'SS-304 Venturi tube array — 92–96% powder recovery' },
        { l: 'Suction motor', v: '20HP; Siemens-class VFD electrical panel' },
        { l: 'Airflow', v: '8,000–32,000 CMH depending on booth size' },
        { l: 'Secondary filter', v: 'Bag filter — CPCB particulate emission compliant' },
        { l: 'Lighting', v: 'Explosion-proof LED strip lights' },
        { l: 'Access', v: 'Hinged access panels both sides' },
        { l: 'Reference (Amaze Power)', v: '5000 × 1800 × 2660 mm; 150 Nm³/h; 50kW total installed load' },
      ]}

      applications={[
        'Standard powder coating — epoxy, polyester, PU formulations',
        'Automotive component coating',
        'White goods and appliance production',
        'Architectural aluminium profiles',
        'Custom colour batch operations',
        'Metallic and textured powder applications',
      ]}
      applicationImages={[
        { src: '/images/products/gema/automatic-gun/application/automotive-components.jpg', label: 'Automotive components' },
        { src: '/images/products/durr/electrostatic-gun/application/consumer-goods-and-appliances.jpg', label: 'White goods & appliances' },
        { src: '/images/products/vinayak/liquid-paint/application/furniture.jpg', label: 'Steel & aluminium furniture' },
        { src: '/images/products/gema/automatic-gun/application/agri-equipment.jpg', label: 'Agricultural & construction equipment' },
        { src: '/images/products/gema/automatic-gun/application/electrical-equipments.webp', label: 'Electrical enclosures & switchgear' },
        { src: '/images/products/gema/automatic-gun/application/powder-coated-aluminium-extrusion.webp', label: 'Architectural aluminium profiles' },
      ]}

      compatibilityTags={[
        'GEMA OptiFlex Pro (all models)',
        'GEMA OptiGun GA02 / GA03',
        'OptiFinish ZA01 Reciprocator',
        'Z-TAP Robot System',
        'All standard automatic powder guns',
        'OptiFinish Cyclone & Dust Collector',
        'GEMA OC08 OptiCentre',
      ]}

      references={[]}

      related={[
        {
          name: 'Cyclone & Dust Collector',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/cyclone-dust-collector',
          enquireSlug: 'cyclone-dust-collector',
          imageSrc: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-dust-collect.png',
        },
        {
          name: 'SS Booth System',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/ss-booth-system',
          enquireSlug: 'ss-booth-system',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/booth-exterior.jpeg',
        },
        {
          name: 'Manual Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/manual-gun',
          enquireSlug: 'gema-manual-gun',
          imageSrc: '/images/products/gema/manual-gun/optiflex_pro_manual_gun.jpg',
        },
      ]}

      ctaHeadline="Specify your powder spray booth."
      ctaAccent="92–96% recovery, built in."
      ctaBody="Give OptiFinish your part dimensions, gun count, and throughput requirements — we'll design the booth with correct airflow, Venturi sizing, and motor specification."
    />
    </>
  );
}
