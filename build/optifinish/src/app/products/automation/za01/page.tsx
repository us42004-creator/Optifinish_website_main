import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Opti Recip ZA01 Vertical Reciprocator | OptiFinish',
  description:
    'Opti Recip ZA01 — proprietary slim-column vertical reciprocator built in-house by OptiFinish. Mounts up to 6 automatic guns. Designed for space-efficient production line automation.',
};

export default function ZA01Page() {
  return (
    <ProductPageTemplate
      theme="dark"

      /* S1 — Hero */
      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'Automation', href: '/products/automation' },
        { label: 'Opti Recip ZA01', href: '/products/automation/za01' },
      ]}
      badge="Proprietary — OptiFinish Built"
      eyebrow="Opti Recip ZA01"
      headline="Slim column."
      headlineAccent="Six-gun capacity."
      subline="A vertical reciprocator designed and built entirely in-house by OptiFinish — slim column profile, space-efficient multi-gun mounting, and an advanced synchronized motor for smooth, consistent traversal across every production shift."
      heroStats={[
        { val: '6', label: 'Max gun mounting' },
        { val: 'Slim', label: 'Column profile' },
        { val: '100%', label: 'In-house built' },
      ]}
      heroImageLabel="Opti Recip ZA01 · vertical reciprocator"
      enquireSlug="za01"
      backHref="/products/automation"
      backLabel="← Back to Automation"

      /* S2 — Problem */
      problemHeadline="Manual gun traversal"
      problemAccent="is holding your line back."
      problemBody="A manual operator moving a gun up and down the part height introduces speed variation, distance variation, and fatigue — all translating directly into inconsistent film build. The ZA01 eliminates this variable and replaces it with a consistent, programmable traversal that repeats identically for every part."
      benefits={[
        'Slim column design maximises floor space — up to 6 automatic guns in a minimal footprint',
        'Short and long stroke configurations cover the full range of part envelope heights',
        'Advanced synchronized motor delivers smooth, jerk-free traversal throughout production shifts',
        'Horizontal and vertical gun arrangement options for flexible booth integration',
        'Compatible with GEMA OptiGun and all standard automatic gun mounting interfaces',
        'Designed and manufactured at OptiFinish\'s Greater Noida R&D facility — full local support',
      ]}

      /* S4 — How It Works */
      steps={[
        {
          num: '01',
          title: 'Gun mounting and alignment',
          body: 'Up to 6 automatic guns are mounted on the ZA01 column at the required spacing for the part envelope. Horizontal and vertical mounting arrangements are both supported. The slim column design allows close positioning to the booth side for maximum spray efficiency.',
          imageLabel: 'Step 01 · gun mounting on ZA01 column',
        },
        {
          num: '02',
          title: 'Synchronized traversal',
          body: 'The advanced synchronized motor drives the gun carriage up and down the column at the programmed traversal speed — maintaining consistent distance and speed throughout the full stroke. Short stroke for compact parts; long stroke for tall profiles. Both are configurable from the control panel.',
          imageLabel: 'Step 02 · synchronized vertical traversal in operation',
        },
        {
          num: '03',
          title: 'Continuous production',
          body: 'Parts enter the booth on the conveyor; the ZA01 continues traversal at the set pattern. For lines with Auto Spray Optimisation, gun triggering synchronises with part presence — powder only fires when a part is detected. The ZA01 requires minimal maintenance throughout multi-shift operation.',
          imageLabel: 'Step 03 · ZA01 in continuous production operation',
        },
      ]}
      howItWorksTitle="Mount, traverse, coat"

      /* S5 — Specs */
      specRows={[
        { l: 'Design', v: 'Slim column vertical reciprocator' },
        { l: 'Gun mounting', v: 'Up to 6 automatic guns (horizontal or vertical arrangement)' },
        { l: 'Stroke', v: 'Short and long stroke — configurable' },
        { l: 'Motor', v: 'Advanced synchronized motor — smooth continuous traversal' },
        { l: 'Compatible guns', v: 'GEMA OptiGun GA02/GA03 and all standard automatic gun interfaces' },
        { l: 'Maintenance', v: 'Minimal — no specialist tooling required for service' },
        { l: 'Development origin', v: 'Designed and manufactured at OptiFinish Greater Noida R&D facility' },
      ]}

      /* S6 — Applications */
      applications={[
        'Conveyorised powder coating lines requiring automated vertical traversal',
        'Batch automatic booth setups upgrading from full manual operation',
        'Lines where floor space limits column footprint',
        'Multi-gun configurations for wide booth coverage',
        'Operations pairing with Auto Spray Optimisation for trigger-on-demand powder delivery',
        'Lines transitioning from manual to semi-automatic or fully automatic operation',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'GEMA OptiGun GA02 / GA03',
        'All standard automatic gun mounting interfaces',
        'OptiFinish Auto Spray Optimisation system',
        'All OptiFinish powder spray booths',
        'MagicControl 4.0 (GEMA integration)',
      ]}

      /* S8 — References */
      references={[
        {
          client: 'OptiFinish Greater Noida',
          desc: 'Designed and manufactured in-house at OptiFinish\'s Greater Noida R&D facility. Deployed across multiple customer installations alongside OptiFinish booth and oven systems.',
        },
      ]}

      /* S9 — Related */
      related={[
        {
          name: 'Auto Spray Optimisation',
          category: 'OptiFinish Automation',
          href: '/products/automation/auto-spray-optimisation',
          enquireSlug: 'auto-spray-optimisation',
        },
        {
          name: 'Automatic Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/automatic-gun',
          enquireSlug: 'gema-automatic-gun',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
      ]}

      /* S10 — CTA */
      ctaHeadline="Add vertical traversal to your line."
      ctaAccent="We'll design the integration."
      ctaBody="Talk to OptiFinish about integrating the ZA01 with your booth and gun setup — new line or retrofit into an existing installation."
    />
  );
}
