import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Wood Finish Oven | OptiFinish Manufactured',
  description:
    'Specialist sublimation transfer oven for wood-grain and decorative pattern finishing on powder-coated aluminium profiles. 190–220°C. Custom chamber for 6.5m–7m profiles.',
};

export default function WoodFinishOvenPage() {
  return (
    <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'Wood Finish Oven', href: '/products/optifinish-manufactured/wood-finish-oven' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="Sublimation Transfer — Aluminium Profiles"
      headline="Photo-realistic wood grain."
      headlineAccent="On aluminium. Permanently."
      subline="A specialist curing oven for thermal sublimation transfer of wood-grain, stone, marble, and custom decorative patterns onto powder-coated aluminium extrusions — creating a durable, scratch-resistant decorative finish that cannot be peeled or lifted."
      heroStats={[
        { val: '190–220°C', label: 'Operating temperature' },
        { val: '±5°C', label: 'Chamber uniformity' },
        { val: '7m', label: 'Standard profile length' },
      ]}
      heroImageLabel="Wood Finish Oven · sublimation transfer chamber"
      enquireSlug="wood-finish-oven"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="Surface-applied wood films"
      problemAccent="peel, fade, and fail."
      problemBody="Stick-on wood-grain films delaminate at joints, peel at edges, and fade within years of UV exposure. Sublimation transfer solves this permanently — the dye is thermally diffused into the powder coating surface itself, not applied on top of it. The finish is part of the coating. It cannot be scratched off or peeled away."
      benefits={[
        'Dye thermally diffused into the powder coating surface — not a film applied on top, cannot be scratched or peeled',
        '±5°C temperature uniformity across the full chamber for consistent dye transfer across the full profile length',
        'Suitable for wood grain, stone, marble, brushed metal, and custom decorative pattern films',
        'Chamber sized to profile lengths — commonly 6.5m or 7m; custom dimensions available',
        'Gas-fired or electric heating; digital PID controller with programmable hold-time timer',
        'Can be combined with a standard powder coating line as a dedicated sublimation stage',
      ]}

      steps={[
        {
          num: '01',
          title: 'Powder coating the profile',
          body: 'The aluminium extrusion is first powder-coated with a base powder (typically white or a specified colour) and cured in the standard powder coating oven. This powder-coated surface is the substrate that receives the sublimation dye — it must be fully cured and of correct quality before wrapping.',
          imageLabel: 'Step 01 · aluminium profile powder coated and cured',
        },
        {
          num: '02',
          title: 'Film wrapping and oven loading',
          body: 'The powder-coated profile is tightly wrapped in a sublimation transfer film carrying the printed decorative pattern. The wrapped profile is loaded into the Wood Finish Oven — either as a batch or on a dedicated handling system for long profiles.',
          imageLabel: 'Step 02 · profile wrapped in sublimation film, loaded into oven',
        },
        {
          num: '03',
          title: 'Thermal transfer and finish',
          body: 'The oven heats to 190–220°C — the exact temperature depending on the film specification. Heat causes the dye carrier in the film to sublimate (convert directly to gas), and the dye molecules diffuse into the powder coating surface under heat and pressure. The result: a permanently bonded, photo-realistic decorative finish that\'s integral to the coating.',
          imageLabel: 'Step 03 · dye thermally diffused into powder surface — permanent finish',
        },
      ]}
      howItWorksTitle="Coat, wrap, transfer"

      specRows={[
        { l: 'Operating temperature', v: '190–220°C (adjustable per film specification)' },
        { l: 'Temperature uniformity', v: '±5°C across the full chamber' },
        { l: 'Profile length', v: 'Custom — commonly 6.5m or 7m chamber length' },
        { l: 'Heating', v: 'Gas-fired (LPG/PNG) or electric resistance' },
        { l: 'Controller', v: 'Digital PID with programmable hold-time timer' },
        { l: 'Substrates', v: 'Powder-coated aluminium extrusions' },
        { l: 'Output finish', v: 'Wood grain, stone, marble, brushed metal, custom pattern' },
        { l: 'Integration', v: 'Standalone or as additional stage alongside standard powder coating line' },
      ]}

      applications={[
        'Architectural aluminium doors and windows',
        'Curtain wall profiles and systems',
        'Aluminium furniture frames and components',
        'Decorative extrusions for interior design projects',
        'Architectural hardware requiring wood-grain or stone effect finish',
        'Aluminium composite panel profiles',
      ]}

      compatibilityTags={[
        'Standard OptiFinish powder coating line (as preceding stage)',
        'All standard sublimation film suppliers',
        'Aluminium profile handling and racking systems',
      ]}

      references={[]}

      related={[
        {
          name: 'Curing Oven',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/curing-oven',
          enquireSlug: 'curing-oven',
        },
        {
          name: 'Powder Coating Plant',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-coating-plant',
          enquireSlug: 'powder-coating-plant',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
      ]}

      ctaHeadline="Add sublimation to your aluminium line."
      ctaAccent="We'll design the oven stage."
      ctaBody="Talk to OptiFinish about your profile lengths, batch size, and pattern requirements — we'll dimension the Wood Finish Oven and integrate it with your existing powder coating line."
    />
  );
}
