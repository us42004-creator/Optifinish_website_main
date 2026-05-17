import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Plastic / PP Booth | OptiFinish Manufactured',
  description:
    'Polypropylene powder coating booth for quick colour changes and zero corrosion risk. Fast wipe-clean surfaces, compact footprint, lower capital cost. Ideal for job coaters.',
};

export default function PlasticBoothPage() {
  return (
    <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'Plastic / PP Booth', href: '/products/optifinish-manufactured/plastic-booth' },
      ]}
      badge="In-house Manufactured — Greater Noida"
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
        { src: '/images/products/optifinish-manufactured/plastic-booth/pp_booth.png', label: 'PP Booth — Full Installation' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/img_plastic.jpeg', label: 'Plastic Booth — Interior View' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/plastic-booth-cropped.jpeg', label: 'Plastic Booth — Exterior View' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/plastic_gema_1.jpeg', label: 'Interior — Gun & Recovery System' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/plas.png', label: 'Booth with GEMA Gun Setup' },
      ]}
      enquireSlug="plastic-booth"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

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
        { src: '/images/products/optifinish-manufactured/plastic-booth/application/almirah.webp', label: 'Steel almirahs & furniture' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/application/furniture.jpg', label: 'Furniture & decorative components' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/application/metal-gates.jpg', label: 'Metal gates & grilles' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/application/kitchen-cabinets.jpg', label: 'Kitchen cabinets & interiors' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/application/electrical-enclosures.webp', label: 'Electrical enclosures' },
        { src: '/images/products/optifinish-manufactured/plastic-booth/application/metal-fabrication.jpg', label: 'Small fabricated components' },
      ]}

      compatibilityTags={[
        'GEMA OptiFlex Pro manual guns (all models)',
        'All standard manual powder gun brands',
        'Vinayak Agencies powder coating paints',
      ]}

      references={[]}

      related={[
        {
          name: 'SS Booth System',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/ss-booth-system',
          enquireSlug: 'ss-booth-system',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
        {
          name: 'Manual Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/manual-gun',
          enquireSlug: 'gema-manual-gun',
        },
      ]}

      ctaHeadline="The right booth for your operation."
      ctaAccent="Clean change. Every time."
      ctaBody="Talk to OptiFinish about whether the PP Booth is right for your colour change frequency, part type, and throughput — or whether MS or SS-304 construction is the better fit."
    />
  );
}
