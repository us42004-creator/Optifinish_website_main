import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { metadataBase, defaultOpenGraph, defaultTwitter, productSchema, breadcrumbSchema, faqSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'Auto Spray Optimisation — Intelligent Coating Control | OptiFinish',
  description:
    'OptiFinish Auto Spray Optimisation system — intelligent process control for automatic powder coating lines. Synchronises gun triggering, conveyor speed, and spray parameters to eliminate waste and ensure consistent film build.',
  keywords: [
    'auto spray optimisation India',
    'powder coating process control India',
    'automatic coating control system',
    'gun triggering system India',
    'OptiFinish auto spray',
    'coating line optimisation India',
    'powder coating automation India',
  ],
  alternates: { canonical: `${SITE.url}/products/automation/auto-spray-optimisation` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Auto Spray Optimisation — Intelligent Coating Control | OptiFinish',
    description: 'Intelligent process control for automatic powder coating lines — synchronises gun triggering and conveyor speed to eliminate waste.',
    url: `${SITE.url}/products/automation/auto-spray-optimisation`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'Auto Spray Optimisation | OptiFinish',
    description: 'Gun triggering and conveyor sync for automatic powder coating lines — eliminate waste, ensure consistent film build.',
  },
};

const productLD = productSchema({
  name: 'Auto Spray Optimisation System',
  description: 'OptiFinish Auto Spray Optimisation system — intelligent process control for automatic powder coating lines. Synchronises gun triggering, conveyor speed, and spray parameters to eliminate waste and ensure consistent film build.',
  url: '/products/automation/auto-spray-optimisation',
  brand: 'OptiFinish',
  category: 'Powder Coating Automation',
  keywords: ['auto spray optimisation', 'gun triggering system', 'powder coating process control', 'coating line automation India'],
});

const breadcrumbLD = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Automation', href: '/products/automation' },
  { name: 'Auto Spray Optimisation', href: '/products/automation/auto-spray-optimisation' },
]);

const faqLD = faqSchema([
  {
    q: 'What is auto spray optimisation in powder coating?',
    a: 'Auto spray optimisation synchronises gun triggering with part detection and conveyor speed — guns fire only when a part is present and adjust spray parameters based on part geometry and line speed, eliminating powder wasted on empty hooks and gaps between parts.',
  },
  {
    q: 'How much powder can auto spray optimisation save?',
    a: 'By eliminating spray on empty hooks and optimising gun-to-part distance and triggering, auto spray optimisation systems typically reduce powder consumption by 15–30% depending on the loading density and production mix.',
  },
  {
    q: 'Does auto spray optimisation work with existing automatic lines?',
    a: 'Yes. OptiFinish auto spray optimisation can be integrated with existing automatic powder coating lines as a retrofit — adding part detection sensors, a control unit, and gun triggering interfaces without requiring a full line replacement.',
  },
]);

export default function AutoSprayOptimisationPage() {
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
        { label: 'Auto Spray Optimisation', href: '/products/automation/auto-spray-optimisation' },
      ]}
      badge="Proprietary — OptiFinish Built"
      eyebrow="Reciprocator + Gun Control System"
      headline="Powder only fires"
      headlineAccent="when a part is there."
      subline="An integrated control system combining part-presence detection, gun triggering, and conveyor speed synchronisation — eliminating the single largest source of powder waste in automatic lines: guns spraying into empty space."
      heroStats={[
        { val: '↓35%', label: 'Powder waste reduction' },
        { val: 'Retrofit', label: 'Existing installation compatible' },
        { val: 'PLC', label: 'Based integration' },
      ]}
      heroImageLabel="Auto Spray Optimisation · control system"
      enquireSlug="auto-spray-optimisation"
      backHref="/products/automation"
      backLabel="← Back to Automation"

      /* S2 — Problem */
      problemHeadline="Automatic guns fire"
      problemAccent="between parts continuously."
      problemBody="In a typical automatic powder coating line, guns run at full output as long as the line is running — regardless of whether a part is actually in the spray zone. Every gap between parts on the conveyor is powder fired into empty space, recovered at lower efficiency, and processed through the filter. This waste adds up to 15–35% of total powder consumption on most lines."
      benefits={[
        'Part-presence detection (photoelectric or encoder) triggers powder discharge only when a part is confirmed in the spray zone',
        'Conveyor speed synchronisation — film build per part remains consistent regardless of line speed changes',
        '15–35% typical powder waste reduction depending on part spacing and line configuration',
        'Reduces over-spray inside the booth — extends filter life, improves cyclone recovery efficiency',
        'Retrofittable onto existing OptiFinish and third-party booth and reciprocator installations',
        'PLC-based integration with standard control panel — no specialist programming environment required',
      ]}

      /* S4 — How It Works */
      steps={[
        {
          num: '01',
          title: 'Part detection',
          body: 'A photoelectric sensor or conveyor encoder positioned at the booth entry detects when a part enters the spray zone. The signal is processed by the PLC control unit in real time — triggering gun activation within milliseconds of part entry.',
          imageLabel: 'Step 01 · photoelectric part detection at booth entry',
        },
        {
          num: '02',
          title: 'Trigger-on-demand powder delivery',
          body: 'Guns activate only when a part is confirmed present in the spray zone — and deactivate the moment the part clears the detection zone. The conveyor encoder input simultaneously adjusts powder output relative to line speed, so film build remains consistent whether the line is running fast or slow.',
          imageLabel: 'Step 02 · guns trigger only on part-present signal',
        },
        {
          num: '03',
          title: 'Gap elimination and waste reduction',
          body: 'During every gap between parts — whether 10cm or 10 metres — guns are fully off. No powder is fired. No waste to recover. The booth environment stays cleaner, the filter lasts longer, and the cyclone sees only the powder that was actually applied to parts. The system logs gun-on time for production tracking.',
          imageLabel: 'Step 03 · zero powder during gaps — measured waste reduction',
        },
      ]}
      howItWorksTitle="Detect, trigger, stop waste"

      /* S5 — Specs */
      specRows={[
        { l: 'Detection method', v: 'Photoelectric sensor or encoder-based part-presence detection' },
        { l: 'Conveyor sync', v: 'Encoder input for line speed synchronisation — consistent film build' },
        { l: 'Trigger logic', v: 'Powder discharge on part-present signal only; off during gaps' },
        { l: 'Waste reduction', v: 'Typically 15–35% powder waste reduction (varies by part spacing)' },
        { l: 'Retrofit', v: 'Compatible with existing booths and reciprocators' },
        { l: 'Control', v: 'PLC-based integration — standard control panel' },
        { l: 'Development origin', v: 'Designed and manufactured at OptiFinish Greater Noida R&D facility' },
      ]}

      /* S6 — Applications */
      applications={[
        'Conveyorised production lines with variable or large gaps between parts',
        'Operations targeting powder material cost reduction as a primary KPI',
        'Automatic lines where guns currently run at full output throughout the shift',
        'Lines with mixed part sizes — detection adapts to each part individually',
        'Retrofit onto existing booth and reciprocator installations (third-party compatible)',
        'Any automatic powder coating line where powder material cost is significant',
      ]}

      /* S7 — Compatibility */
      compatibilityTags={[
        'OptiFinish ZA01 Reciprocator',
        'GEMA ZA series reciprocators',
        'GEMA OptiGun GA02 / GA03',
        'All OptiFinish powder spray booths',
        'Third-party booth and reciprocator setups',
        'Standard PLC control panels',
      ]}

      references={[]}

      /* S9 — Related */
      related={[
        {
          name: 'Opti Recip ZA01',
          category: 'OptiFinish Automation',
          href: '/products/automation/za01',
          enquireSlug: 'za01',
          imageSrc: '/images/products/gema/reciprocators/gema-za10-01.jpg',
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
      ctaHeadline="Cut your powder waste."
      ctaAccent="Retrofit ready."
      ctaBody="Talk to OptiFinish about adding Auto Spray Optimisation to your existing automatic line — we'll assess your conveyor layout, part spacing, and gun configuration to size the system correctly."
    />
    </>
  );
}
