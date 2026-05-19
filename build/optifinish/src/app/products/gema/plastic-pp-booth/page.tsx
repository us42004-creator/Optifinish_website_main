import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Plastic PP Booth — Quick Colour-Change Polypropylene Booth | OptiFinish',
  description:
    'GEMA Plastic / PP Booth — fully polypropylene construction for fastest manual colour-change in powder coating. No metal substrate, no rust contamination, wipe-clean surfaces. Supplied by OptiFinish, authorised GEMA partner India.',
  keywords: [
    'PP booth powder coating India',
    'plastic booth powder coating India',
    'polypropylene powder coating booth',
    'quick colour change booth India',
    'GEMA PP booth India',
    'OptiFinish plastic booth',
    'colour change powder coating booth manufacturer India',
  ],
  alternates: { canonical: `${SITE.url}/products/gema/plastic-pp-booth` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Plastic PP Booth — Quick Colour-Change Polypropylene Booth | OptiFinish',
    description: 'GEMA Plastic / PP Booth — fully polypropylene, wipe-clean surfaces, fastest manual colour-change. Supplied by OptiFinish, authorised GEMA partner India.',
    url: `${SITE.url}/products/gema/plastic-pp-booth`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'GEMA Plastic / PP Powder Coating Booth | OptiFinish India',
    description: 'GEMA PP Booth — full polypropylene, fastest colour change, zero rust. Supplied by OptiFinish, authorised GEMA partner India.',
  },
};

const productLD = productSchema({
  name: 'GEMA Plastic / PP Booth',
  description: 'Fully polypropylene powder coating spray booth for rapid manual colour change — no metal substrate, no rust contamination, wipe-clean surfaces for fastest changeover.',
  url: '/products/gema/plastic-pp-booth',
  category: 'Powder Coating Booth',
  brand: 'GEMA',
  keywords: ['PP booth', 'plastic booth powder coating', 'polypropylene spray booth', 'quick colour change booth India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'GEMA', href: '/products/gema' },
  { name: 'Plastic / PP Booth', href: '/products/gema/plastic-pp-booth' },
]);

const faqLD = faqSchema([
  {
    q: 'What is a polypropylene (PP) powder coating booth?',
    a: 'A polypropylene booth is a powder coating spray booth built entirely from PP plastic — eliminating metal surfaces that can corrode and contaminate powder. PP construction enables the fastest manual colour changeover because surfaces wipe clean with no residual powder adhering to metal edges or welds.',
  },
  {
    q: 'Why choose a PP booth for colour-change production?',
    a: 'PP booths are the preferred choice for operations with frequent colour changes — such as job shops and custom coaters — because wipe-clean PP surfaces reduce changeover time from 20–30 minutes (MS booth) to under 5 minutes.',
  },
  {
    q: 'Is the GEMA PP booth compatible with OptiFinish manual guns?',
    a: 'Yes. The GEMA PP Booth is fully compatible with GEMA OptiFlex Pro manual guns (all models), which are also supplied and serviced by OptiFinish as an authorised GEMA partner in India.',
  },
]);

export default function GemaPlasticPPBoothPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <ProductPageTemplate
      theme="light"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'GEMA', href: '/products/gema' },
        { label: 'Plastic / PP Booth', href: '/products/gema/plastic-pp-booth' },
      ]}
      badge="Available Through OptiFinish — GEMA Authorised Partner"
      eyebrow="Quick Colour Change — Small Batch"
      headline="Zero rust risk."
      headlineAccent="Fast colour change."
      subline="A polypropylene-constructed spray booth for operations requiring rapid colour changes with zero cross-contamination — lightweight, fully corrosion-resistant, and easy to wipe clean between batches. The preferred entry-level clean-coat solution."
      heroStats={[
        { val: 'PP', label: 'Full polypropylene build' },
        { val: '0', label: 'Rust risk' },
        { val: '1–3', label: 'Gun operation range' },
      ]}
      heroImageLabel="Plastic / PP Booth · polypropylene construction"
      photoGallery={[
        { src: '/images/products/gema/plastic-pp-booth/pp_booth.png', label: 'PP Booth — Full Installation' },
        { src: '/images/products/gema/plastic-pp-booth/img_plastic.jpeg', label: 'Plastic Booth — Interior View' },
        { src: '/images/products/gema/plastic-pp-booth/plastic-booth-cropped.jpeg', label: 'Plastic Booth — Exterior View' },
        { src: '/images/products/gema/plastic-pp-booth/plastic_gema_1.jpeg', label: 'Interior — Gun & Recovery System' },
        { src: '/images/products/gema/plastic-pp-booth/plas.png', label: 'Booth with GEMA Gun Setup' },
      ]}
      enquireSlug="plastic-booth"
      backHref="/products/gema"
      backLabel="← Back to GEMA"

      problemHeadline="Job coaters need"
      problemAccent="fast colour change, low capital cost."
      problemBody="Operations running multiple colours daily need a booth that cleans out quickly between batches, doesn't contaminate the next colour with rust or metal particles, and doesn't require a large capital investment. The PP Booth delivers all three — corrosion-free, wipe-clean surfaces at a significantly lower cost than MS or SS equivalents."
      benefits={[
        'Full polypropylene panels and frame — no metal substrate, no rust, no metal particle contamination',
        'PP surfaces wipe clean between colour changes in minutes — the fastest manual cleanout available',
        'Compact footprint for smaller production floors — suited for 1–3 gun operation',
        'Integrated suction and powder recovery system — compatible with all standard manual powder guns',
        'Lower capital cost than MS or SS-304 equivalent — preferred entry-level clean-coat solution',
        'Inert PP construction is unaffected by acidic or alkaline powder formulations',
      ]}

      specRows={[
        { l: 'Construction', v: 'Full polypropylene (PP) panels and frame — no metal substrate' },
        { l: 'Weight', v: 'Significantly lighter than MS or SS equivalent' },
        { l: 'Colour change', v: 'Wipe-clean PP surfaces — fast cleanout between batches' },
        { l: 'Gun capacity', v: '1–3 gun operation; compact footprint' },
        { l: 'Recovery system', v: 'Integrated suction and powder recovery with bag filter' },
        { l: 'Maintenance', v: 'No rust, no corrosion — minimal maintenance over lifetime' },
        { l: 'Capital cost', v: 'Lower than MS or SS-304 equivalent' },
      ]}

      applications={[
        'Custom colour coating shops running 5+ colours daily',
        'Job coaters requiring fast colour changeover between batches',
        'Small-batch production environments with compact floor areas',
        'Decorative powder coating and architectural metalwork',
        'Educational and training facilities',
        'Operations starting with manual coating before scaling to automation',
      ]}
      applicationImages={[
        { src: '/images/products/gema/plastic-pp-booth/application/almirah.webp', label: 'Steel almirahs & furniture' },
        { src: '/images/products/gema/plastic-pp-booth/application/furniture.jpg', label: 'Furniture & decorative components' },
        { src: '/images/products/gema/plastic-pp-booth/application/metal-gates.jpg', label: 'Metal gates & grilles' },
        { src: '/images/products/gema/plastic-pp-booth/application/kitchen-cabinets.jpg', label: 'Kitchen cabinets & interiors' },
        { src: '/images/products/gema/plastic-pp-booth/application/electrical-enclosures.webp', label: 'Electrical enclosures' },
        { src: '/images/products/gema/plastic-pp-booth/application/metal-fabrication.jpg', label: 'Small fabricated components' },
      ]}

      compatibilityTags={[
        'GEMA OptiFlex Pro manual guns (all models)',
        'All standard manual powder gun brands',
        'Vinayak Agencies powder coating paints',
      ]}

      references={[]}

      related={[
        {
          name: 'Manual Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/manual-gun',
          enquireSlug: 'gema-manual-gun',
          imageSrc: '/images/products/gema/manual-gun/optiflex_pro_manual_gun.jpg',
        },
        {
          name: 'Automatic Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/automatic-gun',
          enquireSlug: 'gema-automatic-gun',
          imageSrc: '/images/products/gema/automatic-gun/optigun-ga04.png',
        },
        {
          name: 'SS Booth System',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/ss-booth-system',
          enquireSlug: 'ss-booth-system',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/booth-exterior.jpeg',
        },
      ]}

      ctaHeadline="The right booth for your operation."
      ctaAccent="Clean change. Every time."
      ctaBody="Talk to OptiFinish about whether the PP Booth is right for your colour change frequency, part type, and throughput — or whether MS or SS-304 construction is the better fit."
    />
    </>
  );
}
