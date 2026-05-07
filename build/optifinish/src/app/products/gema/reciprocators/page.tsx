import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'GEMA Reciprocators & Automation Axes | OptiFinish',
  description:
    'GEMA ZA series reciprocators and XT/UA/YT axis systems for automated powder coating gun traversal. Dynamic Contour Detection, MagicControl 4.0 integration. Supplied by OptiFinish.',
};

export default function GEMAReciproactorsPage() {
  return (
    <ProductPageTemplate
      theme="light"

      /* S1 — Hero */
      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'GEMA', href: '/products/gema' },
        { label: 'Reciprocators & Automation Axes', href: '/products/gema/reciprocators' },
      ]}
      badge="GEMA — Authorised Partner"
      eyebrow="ZA Series + XT / UA / YT Axis Systems"
      headline="Automated gun travel."
      headlineAccent="Consistent every pass."
      subline="GEMA's reciprocator and axis range automates vertical and horizontal gun movement across the full part height — eliminating human inconsistency, reducing manpower, and enabling programming-free automatic operation via Dynamic Contour Detection."
      heroStats={[
        { val: 'ZA07–17', label: 'Vertical reciprocator range' },
        { val: 'DCD', label: 'Dynamic contour detection' },
        { val: '6 guns', label: 'Max mounting (ZA10)' },
      ]}
      heroImageLabel="GEMA ZA Series Reciprocator"
      heroImageSrc="/images/products/gema/reciprocators/gema-reciprocator-01.jpg"
      enquireSlug="gema-reciprocators"
      backHref="/products/gema"
      backLabel="← Back to GEMA"

      /* S2 — Problem */
      problemHeadline="Manual gun traversal"
      problemAccent="is the bottleneck."
      problemBody="On any production line running multiple parts at volume, manual gun traversal produces variable film thickness, operator fatigue-driven inconsistency, and a hard ceiling on line speed. GEMA reciprocators eliminate this constraint — delivering the same traversal pattern at the same speed for every part, every shift."
      benefits={[
        'Vertical ZA series covers entry-level through high-performance — choose stroke and speed for your line',
        'Dynamic Contour Detection (DCD) automatically adapts traversal to part profile without reprogramming',
        'MagicControl 4.0 integration — manage the full line from one touchscreen panel',
        'Horizontal axis systems (XT, UA, YT) for gun positioning and fast colour-change cleaning',
        'Slim column design on ZA10 allows space-efficient mounting of up to 6 automatic guns',
        'Scalable: start with one reciprocator, expand to full multi-axis automatic line',
      ]}

      /* S3 — Variants */
      variants={[
        {
          id: 'za-standard',
          label: 'ZA07 / ZA08',
          tag: 'Entry-Level',
          headline: 'Entry into automated vertical traversal.',
          body: 'The ZA07 and ZA08 are entry-level vertical reciprocators — shorter stroke, lower gun count, cost-efficient starting point for lines upgrading from full manual operation to their first automatic traversal setup.',
          specs: [
            { l: 'Stroke', v: 'Short stroke configuration' },
            { l: 'Gun mounting', v: 'Up to 4 automatic guns' },
            { l: 'Best for', v: 'First-time automatic upgrade, smaller part envelopes' },
            { l: 'Control', v: 'MagicControl 4.0 compatible' },
          ],
          imageLabel: 'GEMA ZA07/ZA08 · entry reciprocator',
          imageSrc: '/images/products/gema/reciprocators/gema-reciprocator-02.jpg',
        },
        {
          id: 'za-mid',
          label: 'ZA10',
          tag: 'Mid-Range — Slim Column',
          headline: 'Space-efficient six-gun mounting.',
          body: 'The ZA10 is the slim-column mid-range reciprocator — mounting up to 6 automatic guns with a minimal column footprint. Synchronized motor delivers smooth, consistent traversal across both short and long strokes. The preferred choice for medium-volume production lines where floor space is a constraint.',
          specs: [
            { l: 'Design', v: 'Slim column — minimal floor footprint' },
            { l: 'Gun mounting', v: 'Up to 6 automatic guns' },
            { l: 'Stroke', v: 'Short and long stroke — configurable' },
            { l: 'Motor', v: 'Advanced synchronized drive' },
          ],
          imageLabel: 'GEMA ZA10 · slim column reciprocator',
        },
        {
          id: 'za-high',
          label: 'ZA15 / ZA16 / ZA17',
          tag: 'High Performance',
          headline: 'Full-stroke, high-speed production traversal.',
          body: 'The ZA15, ZA16, and ZA17 are high-performance vertical reciprocators for demanding production environments — longer stroke for tall parts, higher traversal speed for fast production lines, and full MagicControl 4.0 integration with Dynamic Contour Detection for programming-free operation.',
          specs: [
            { l: 'Stroke', v: 'Long stroke — tall part coverage' },
            { l: 'Speed', v: 'High-speed traversal for production lines' },
            { l: 'DCD', v: 'Dynamic Contour Detection — automatic profile adaptation' },
            { l: 'Best for', v: 'High-volume conveyorised lines, tall part profiles' },
          ],
          imageLabel: 'GEMA ZA15-17 · high-performance reciprocator',
        },
      ]}
      variantsSectionTitle="ZA07 through ZA17 — match the reciprocator to your line"

      /* S5 — Specs */
      specRows={[
        { l: 'Vertical reciprocator models', v: 'ZA07, ZA08, ZA10, ZA15, ZA16, ZA17' },
        { l: 'Gun mounting capacity', v: 'Up to 6 automatic guns (ZA10); varies by model' },
        { l: 'Stroke', v: 'Short and long stroke — configurable per model' },
        { l: 'Dynamic Contour Detection', v: 'Automatic profile adaptation — no reprogramming needed' },
        { l: 'Horizontal axis systems', v: 'XT, UA, YT series — gun positioning and colour change travel' },
        { l: 'Control integration', v: 'MagicControl 4.0 — centralized line management, colour recipe storage' },
        { l: 'Deployment', v: 'Standalone or fully integrated into OptiCenter automatic line' },
        { l: 'Supplied by', v: 'OptiFinish — authorised GEMA partner, India' },
      ]}

      /* S6 — Applications */
      applications={[
        'Conveyorised automatic powder coating production lines',
        'Batch automatic booth setups with vertical traversal',
        'Tall part profiles requiring long-stroke coverage',
        'Lines requiring fast colour change with horizontal axis travel',
        'Operations upgrading from manual to fully automatic gun traversal',
        'Multi-gun configurations for wide booth coverage',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'GEMA OptiGun GA02 / GA03',
        'GEMA OC08 OptiCentre',
        'MagicControl 4.0',
        'All OptiFinish powder spray booths',
        'Z-TAP Robot (as complementary system)',
        'GemaConnect remote monitoring',
      ]}
      partnerNote="GEMA reciprocators are supplied and supported in India by OptiFinish. Full line integration design — booth, reciprocator, gun, and control — is handled by the OptiFinish engineering team."

      /* S8 — References */
      references={[
        {
          client: 'Amaze Power Pvt Ltd',
          desc: 'GEMA reciprocator system integrated with automatic gun array in full conveyorised powder coating line — supplied and commissioned by OptiFinish.',
        },
      ]}

      /* S9 — Related */
      related={[
        {
          name: 'Automatic Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/automatic-gun',
          enquireSlug: 'gema-automatic-gun',
        },
        {
          name: 'OptiCentre Powder Management',
          category: 'GEMA',
          href: '/products/gema/opticentre',
          enquireSlug: 'gema-opticentre',
        },
        {
          name: 'Opti Recip ZA01',
          category: 'OptiFinish Automation',
          href: '/products/automation/za01',
          enquireSlug: 'za01',
        },
      ]}

      /* S10 — CTA */
      ctaHeadline="Automate your gun traversal."
      ctaAccent="We'll specify the right model."
      ctaBody="Tell us about your line — part height, conveyor speed, gun count, and booth width. OptiFinish will specify the right ZA model and axis configuration."
    />
  );
}
