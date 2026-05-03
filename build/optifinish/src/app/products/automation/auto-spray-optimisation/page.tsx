import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Auto Spray Optimisation System | OptiFinish',
  description:
    'Auto Spray Optimisation — integrated gun trigger control and conveyor sync that eliminates powder waste during gaps between parts. Retrofittable onto existing automatic lines.',
};

export default function AutoSprayOptimisationPage() {
  return (
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
      ctaHeadline="Cut your powder waste."
      ctaAccent="Retrofit ready."
      ctaBody="Talk to OptiFinish about adding Auto Spray Optimisation to your existing automatic line — we'll assess your conveyor layout, part spacing, and gun configuration to size the system correctly."
    />
  );
}
