import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'GEMA OptiCentre OC08 Powder Management | OptiFinish',
  description:
    'GEMA OptiCentre OC08 — fully automatic powder management centre with precision load cell tracking, automatic cleaning cycle, and GemaConnect integration. Supplied by OptiFinish.',
};

export default function GEMAOptiCentrePage() {
  return (
    <ProductPageTemplate
      theme="light"

      /* S1 — Hero */
      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'GEMA', href: '/products/gema' },
        { label: 'OptiCentre Powder Management', href: '/products/gema/opticentre' },
      ]}
      badge="GEMA — Flagship System"
      eyebrow="OptiCentre OC08"
      headline="Closed-loop powder."
      headlineAccent="Zero waste management."
      subline="The GEMA OptiCentre OC08 is a fully automatic powder management centre — handling hopper filling, sieving, level monitoring, cleaning, and per-batch consumption tracking with no manual intervention. The complete powder supply chain in one system."
      heroStats={[
        { val: 'OC08', label: 'Fully automatic centre' },
        { val: 'Load cell', label: 'Per-batch tracking' },
        { val: 'Auto clean', label: 'Full cleaning cycle' },
      ]}
      heroImageLabel="GEMA OptiCenter powder management system"
      heroVideoId="GhFFNF4Ls2k"
      heroVideoStart={9}
      enquireSlug="gema-opticentre"
      backHref="/products/gema"
      backLabel="← Back to GEMA"

      /* S2 — Problem */
      problemHeadline="Manual powder management"
      problemAccent="costs more than you think."
      problemBody="In most automatic powder coating lines, the powder supply chain is still handled manually — operators filling hoppers, eyeballing levels, guessing consumption. The result: inconsistent supply, over-filling, contamination risk, and zero data on actual powder use per batch. The OC08 closes the loop entirely."
      benefits={[
        'Precision load cell tracks exact fresh powder consumed per batch — real cost data, not estimates',
        'Fully automatic cleaning cycle removes all powder from hopper and carrying components between colour changes',
        'Automatic sieving of recovered powder before it re-enters the hopper — no manual sieve operation',
        'MagicControl 4.0 integration: colour recipe storage, automatic programme recall, centralised line control',
        'GemaConnect dashboard: remote monitoring, diagnostics, maintenance alerts — accessible from any device',
        'Lower operating cost vs manual powder management through reduced waste and reduced labour',
      ]}

      /* S4 — How It Works */
      steps={[
        {
          num: '01',
          title: 'Automatic hopper supply',
          body: 'Fresh powder is automatically transported from the storage container to the gun hopper under control of the OC08 — maintaining the correct level at all times without manual filling. The precision load cell records the exact quantity of fresh powder consumed in real time.',
          imageLabel: 'Step 01 · automatic hopper supply and level monitoring',
          imageSrc: '/images/products/gema/opticentre/powder management new 1.jpg',
        },
        {
          num: '02',
          title: 'Recovered powder sieving',
          body: 'Powder recovered from the cyclone and bag filter returns to the OC08 sieve unit before re-entering the supply chain. The OC08 automatically sieves recovered powder, removing agglomerates and contamination, then routes clean recovered powder back to the hopper — maintaining virgin powder quality in the system.',
          imageLabel: 'Step 02 · automatic recovered powder sieving',
          imageSrc: '/images/products/gema/opticentre/gema-opticenter-sieving-01.jpg',
        },
        {
          num: '03',
          title: 'Automatic cleaning cycle',
          body: 'When a colour change is initiated via MagicControl 4.0, the OC08 executes a full automated cleaning cycle — flushing all powder from the hopper, tubing, sieve, and carrying components. The process is complete and consistent every time — no residue, no contamination, no operator cleaning required.',
          imageLabel: 'Step 03 · fully automated colour change cleaning cycle',
          imageSrc: '/images/products/gema/opticentre/gema-opticenter-colorchange-01.jpg',
        },
      ]}
      howItWorksTitle="Supply, sieve, clean — automatically"

      /* S5 — Specs */
      specRows={[
        { l: 'System type', v: 'Fully automatic closed-loop powder management centre' },
        { l: 'Powder tracking', v: 'Precision load cell — per-batch fresh powder consumption data' },
        { l: 'Cleaning cycle', v: 'Fully automatic — hopper, tubing, sieve, all carrying components' },
        { l: 'Sieving', v: 'Integrated automatic sieve for recovered powder before re-entry' },
        { l: 'Level monitoring', v: 'Automatic level detection — no manual checking required' },
        { l: 'Control', v: 'MagicControl 4.0 — colour recipe storage, programme recall, centralized management' },
        { l: 'Remote access', v: 'GemaConnect dashboard — monitoring, diagnostics, maintenance alerts' },
        { l: 'Supplied by', v: 'OptiFinish — authorised GEMA partner, India' },
      ]}

      applicationImages={[
        { src: '/images/products/gema/automatic-gun/application/high volume line.avif', label: 'High-volume multi-colour coating line' },
        { src: '/images/products/gema/opticentre/powder management new 2.jpg', label: 'Powder consumption tracking & cost control' },
        { src: '/images/products/gema/automatic-gun/application/automotive components.jpg', label: 'Automotive & white goods manufacturing' },
        { src: '/images/products/gema/reciprocators/application/recip4.webp', label: 'Aluminium profile lines' },
        { src: '/images/products/gema/reciprocators/recip2.jpg', label: 'Integrated OptiGun + ZA reciprocator line' },
      ]}

      /* S6 — Applications */
      applications={[
        'High-volume automatic powder coating lines running multiple colours',
        'Operations where powder consumption tracking and cost control are priorities',
        'Production lines requiring fast, reliable colour changes',
        'Automotive and white goods manufacturers with strict process documentation requirements',
        'Lines where manual powder management creates a bottleneck',
        'Any automatic line paired with GEMA OptiGun and ZA reciprocator systems',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'GEMA OptiGun GA02 / GA03',
        'GEMA ZA Reciprocator Series',
        'MagicControl 4.0 / 4.0 Plus',
        'GemaConnect remote platform',
        'All OptiFinish powder spray booths',
        'OptiFinish cyclone & dust collector',
        'OptiFinish PS Vibratory Sieve (complementary)',
      ]}
      partnerNote="Supplied and integrated by OptiFinish. Full line design including OC08 integration with booth, cyclone, reciprocator, and gun is handled by the OptiFinish engineering team."

      /* S8 — References */
      references={[
        {
          client: 'Amaze Power Pvt Ltd',
          desc: 'Full GEMA automatic line including OptiGun, ZA reciprocator, and powder management — supplied and commissioned by OptiFinish.',
        },
      ]}

      /* S9 — Related */
      related={[
        {
          name: 'Automatic Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/automatic-gun',
          enquireSlug: 'gema-automatic-gun',
          imageSrc: '/images/products/gema/automatic-gun/gema-optigun-ga03-01.png',
        },
        {
          name: 'Reciprocators & Automation Axes',
          category: 'GEMA',
          href: '/products/gema/reciprocators',
          enquireSlug: 'gema-reciprocators',
          imageSrc: '/images/products/gema/reciprocators/gema-reciprocator-01.jpg',
        },
        {
          name: 'PS Vibratory Sieve Machine',
          category: 'OptiFinish Automation',
          href: '/products/automation/sieve-machine',
          enquireSlug: 'sieve-machine',
          imageSrc: '/images/products/sieve-machine/sieve-machine-01.jpg',
        },
      ]}

      /* S10 — CTA */
      ctaHeadline="Close the loop on powder waste."
      ctaAccent="We'll design the system."
      ctaBody="Talk to OptiFinish about integrating the GEMA OptiCentre OC08 into your automatic line — new installation or retrofit onto an existing booth and reciprocator setup."
    />
  );
}
