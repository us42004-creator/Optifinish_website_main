import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Z-TAP Powder Coating Robot | OptiFinish',
  description:
    'Z-TAP — mimic once, perfect every time. 6-axis powder coating robot with IMU motion capture. 99.4% coat accuracy, <2 min program build, no coding required. Proprietary OptiFinish technology.',
};

export default function ZTAPPage() {
  return (
    <ProductPageTemplate
      theme="dark"

      /* S1 — Hero */
      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Automation', href: '/products/automation' },
        { label: 'Z-TAP Robot System', href: '/products/automation/z-tap' },
      ]}
      badge="Proprietary — Flagship Automation"
      eyebrow="Z-TAP · 6-Axis Powder Coating Robot"
      headline="Mimic once."
      headlineAccent="Perfect every time."
      subline="Z-TAP captures a human operator's spray motion using IMU sensors and LightRoom spatial capture — then replicates that exact path with ±0.5mm mechanical precision across every single part. No code. No teach pendant. No robotics specialist."
      heroStats={[
        { val: '99.4%', label: 'Coat accuracy' },
        { val: '±0.5mm', label: 'Path repeatability' },
        { val: '3×', label: 'Throughput increase' },
        { val: '<2 min', label: 'Program build time' },
      ]}
      heroImageLabel="Z-TAP 6-Axis Powder Coating Robot · image"
      enquireSlug="z-tap"
      backHref="/products/automation"
      backLabel="← Back to Automation"

      /* S2 — Problem */
      problemHeadline="Robotic programming"
      problemAccent="shouldn't require a specialist."
      problemBody="Traditional powder coating robots require specialist robotic programmers, teach pendants, and days of setup per new part type. The result: automation that only large manufacturers can afford, and that breaks down every time a part changes. Z-TAP was built to eliminate this barrier entirely."
      benefits={[
        'Zero programming language required — operator demonstrates the spray path once, system does the rest',
        'Program build time under 2 minutes per new part type — faster than manual setup',
        '99.4% coat accuracy and <2% defect rate in production — consistently better than trained manual operators',
        '3× throughput increase and 80% reduction in setup time vs conventional robotic programming',
        'Part tag recognition in <50ms — automatic programme selection for different part variants on the same line',
        '100% proprietary: hardware, software, and motion capture all developed at OptiFinish\'s Greater Noida R&D facility',
      ]}

      /* S4 — How It Works */
      steps={[
        {
          num: '01',
          title: 'Operator demonstrates the path',
          body: 'The operator wears an IMU wristband and picks up the spray gun. They spray the part naturally — as they normally would. The wristband records every movement: angle, speed, distance, and direction. No special technique needed. If they can spray a part, they can program Z-TAP.',
          imageLabel: 'Step 01 · operator demonstrates spray path with IMU wristband',
        },
        {
          num: '02',
          title: 'LightRoom builds the program',
          body: 'Simultaneously, the LightRoom spatial capture system tracks the gun\'s 3D position in the booth space. In under 2 minutes, the Z-TAP software converts the IMU motion data and spatial positions into a precise robot motion program — no teach pendant, no code editor, no robotics expertise required.',
          imageLabel: 'Step 02 · LightRoom spatial capture and program generation',
        },
        {
          num: '03',
          title: 'Robot executes with perfect repeatability',
          body: 'The Fairino 6-axis robot arm executes the captured spray path with ±0.5mm repeatability — at the correct speed, correct distance, and correct angle — for every single part. When a new part variant enters the booth, the tag recognition system identifies it in <50ms and recalls the correct programme automatically.',
          imageLabel: 'Step 03 · 6-axis robot executes spray path with sub-mm precision',
        },
      ]}
      howItWorksTitle="Capture, build, execute"

      /* S5 — Specs */
      specRows={[
        { l: 'Robot base', v: 'Fairino 6-axis articulated arm — full 3D spray path capability' },
        { l: 'Motion capture', v: 'IMU wristband sensor + LightRoom spatial positioning system' },
        { l: 'Program build time', v: 'Under 2 minutes per new part type' },
        { l: 'Path repeatability', v: '±0.5mm' },
        { l: 'Coat accuracy', v: '99.4% in production' },
        { l: 'Defect rate', v: '<2% in production' },
        { l: 'Throughput', v: '3× vs trained manual operator' },
        { l: 'Setup time reduction', v: '↓80% vs conventional robot programming' },
        { l: 'Part recognition', v: '<50ms tag recognition — automatic programme selection' },
        { l: 'Software', v: 'Fully proprietary — developed at OptiFinish Greater Noida R&D' },
        { l: 'Power supply', v: '3-phase 415V, 50Hz' },
        { l: 'Development origin', v: 'OptiFinish Greater Noida R&D facility' },
      ]}

      /* S6 — Applications */
      applications={[
        'High-volume powder coating production lines requiring consistent quality',
        'Automotive component coating (complex 3D geometries)',
        'Operations with frequent part changeovers — Z-TAP reprograms in under 2 minutes',
        'Lines where skilled applicator availability is a constraint',
        'Contract coating facilities handling diverse part types',
        'Any powder coating environment targeting defect rate reduction and film build consistency',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'GEMA OptiGun GA02 / GA03 (via adapter)',
        'GEMA OptiFlex Pro manual guns (via adapter)',
        'All standard powder gun connection interfaces',
        'OptiFinish powder spray booths (all types)',
        'OptiFinish cyclone & dust collector',
        'GEMA OC08 OptiCentre',
      ]}
      partnerNote="Z-TAP is a fully proprietary OptiFinish product — hardware, software, and motion capture system all developed at our Greater Noida R&D facility. No third-party licensing. No rebadging. Full local support from the OptiFinish team."

      /* S8 — References */
      references={[
        {
          client: 'OptiFinish Greater Noida R&D',
          desc: 'Z-TAP is developed entirely in-house at OptiFinish\'s Greater Noida R&D and production facility. Full product site available at ztap.optifinish.in.',
        },
      ]}

      /* S9 — Related */
      related={[
        {
          name: 'Opti Recip ZA01',
          category: 'OptiFinish Automation',
          href: '/products/automation/za01',
          enquireSlug: 'za01',
        },
        {
          name: 'Auto Spray Optimisation',
          category: 'OptiFinish Automation',
          href: '/products/automation/auto-spray-optimisation',
          enquireSlug: 'auto-spray-optimisation',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
      ]}

      /* S10 — CTA */
      ctaHeadline="See Z-TAP in action."
      ctaAccent="Then specify your line."
      ctaBody="Visit the Z-TAP product site for full technical detail, demonstration videos, and performance data — or contact OptiFinish to discuss integration into your production line."
    />
  );
}
