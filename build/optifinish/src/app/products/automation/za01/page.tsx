import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'ZA01 Vertical Reciprocator — Automatic Powder Coating Line | OptiFinish',
  description:
    'Opti Recip ZA01 — OptiFinish proprietary slim-column vertical reciprocator. Mounts up to 6 automatic guns. Space-efficient design for new and retrofit automatic powder coating lines. Built in-house, Greater Noida.',
  keywords: [
    'ZA01 reciprocator India',
    'vertical reciprocator powder coating',
    'automatic powder coating reciprocator India',
    'powder coating line automation',
    'OptiFinish ZA01',
    'ZA01 powder coating robot',
    'automatic gun traversal India',
  ],
  alternates: { canonical: `${SITE.url}/products/automation/za01` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'ZA01 Vertical Reciprocator — Automatic Powder Coating Line | OptiFinish',
    description: 'Opti Recip ZA01 — slim-column vertical reciprocator, up to 6 guns. Built in-house at OptiFinish Greater Noida.',
    url: `${SITE.url}/products/automation/za01`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'ZA01 Vertical Reciprocator | OptiFinish',
    description: 'Proprietary slim-column vertical reciprocator. Up to 6 automatic guns. New and retrofit powder coating lines.',
  },
};

const productLD = productSchema({
  name: 'Opti Recip ZA01 Vertical Reciprocator',
  description: 'OptiFinish proprietary slim-column vertical reciprocator. Mounts up to 6 automatic guns. Space-efficient design for new and retrofit automatic powder coating lines. Built in-house, Greater Noida.',
  url: '/products/automation/za01',
  brand: 'OptiFinish',
  category: 'Powder Coating Automation',
  keywords: ['ZA01 reciprocator', 'vertical reciprocator', 'automatic gun traversal', 'powder coating automation India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Automation', href: '/products/automation' },
  { name: 'ZA01 Reciprocator', href: '/products/automation/za01' },
]);

const faqLD = faqSchema([
  {
    q: 'What is the ZA01 vertical reciprocator?',
    a: 'The ZA01 is OptiFinish\'s proprietary slim-column vertical reciprocator — it moves automatic powder coating guns up and down at a programmed traverse speed and stroke, replacing manual sprayers and delivering consistent, repeatable gun coverage. It mounts up to 6 automatic guns and is built in-house at the Greater Noida facility.',
  },
  {
    q: 'How does the ZA01 differ from the GEMA ZA Series reciprocators?',
    a: 'The ZA01 is a proprietary in-house design by OptiFinish — optimised for space-efficiency and retrofit applications. GEMA ZA Series reciprocators are GEMA-manufactured and designed for integration with the full GEMA gun and control ecosystem. Both are supplied by OptiFinish.',
  },
  {
    q: 'Can the ZA01 be retrofitted to an existing powder coating line?',
    a: 'Yes. The ZA01 is specifically designed for easy integration into both new automatic lines and retrofit installations — OptiFinish handles the mechanical integration, gun mounting, and commissioning as part of the supply.',
  },
]);

export default function ZA01Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
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
      references={[]}

      /* S9 — Related */
      related={[
        {
          name: 'Auto Spray Optimisation',
          category: 'OptiFinish Automation',
          href: '/products/automation/auto-spray-optimisation',
          enquireSlug: 'auto-spray-optimisation',
          imageSrc: '/images/products/gema/reciprocators/gema-reciprocator-inuse-01.jpg',
        },
        {
          name: 'Automatic Powder Coating Gun',
          category: 'GEMA',
          href: '/products/gema/automatic-gun',
          enquireSlug: 'gema-automatic-gun',
          imageSrc: '/images/products/gema/automatic-gun/optigun-ga04.png',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
          imageSrc: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
        },
      ]}

      /* S10 — CTA */
      ctaHeadline="Add vertical traversal to your line."
      ctaAccent="We'll design the integration."
      ctaBody="Talk to OptiFinish about integrating the ZA01 with your booth and gun setup — new line or retrofit into an existing installation."
    />
    </>
  );
}
