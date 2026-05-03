import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'SS Booth System | OptiFinish Manufactured',
  description:
    'Full SS-304 powder coating booth for pharmaceutical, food, and precision environments. 92–96% recovery, zero visible exhaust, rounded internal corners for easy cleandown. Pollution-free design.',
};

export default function SSBoothSystemPage() {
  return (
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
        },
        {
          name: 'Plastic / PP Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/plastic-booth',
          enquireSlug: 'plastic-booth',
        },
        {
          name: 'Cyclone & Dust Collector',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/cyclone-dust-collector',
          enquireSlug: 'cyclone-dust-collector',
        },
      ]}

      ctaHeadline="Specify your SS booth system."
      ctaAccent="Built for demanding environments."
      ctaBody="Talk to OptiFinish about your hygiene, corrosion, and colour change requirements — we'll design the SS booth system to your environment and part specifications."
    />
  );
}
