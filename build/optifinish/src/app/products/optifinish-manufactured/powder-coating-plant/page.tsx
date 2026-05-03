import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata = {
  title: 'Powder Coating Plant | OptiFinish Manufactured',
  description:
    'Complete turnkey powder coating plant — manual batch or fully conveyorised automatic. 700+ plants installed. Custom engineered and commissioned from OptiFinish\'s Greater Noida facility.',
};

export default function PowderCoatingPlantPage() {
  return (
    <ProductPageTemplate
      theme="dark"

      breadcrumb={[
        { label: 'Products', href: '/products' },
        { label: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured' },
        { label: 'Powder Coating Plant', href: '/products/optifinish-manufactured/powder-coating-plant' },
      ]}
      badge="In-house Manufactured — Greater Noida"
      eyebrow="Conveyorised Line — Manual & Automatic"
      headline="Complete line."
      headlineAccent="One roof. One team."
      subline="A turnkey powder coating plant engineered, fabricated, assembled, and commissioned by OptiFinish — from a 5-metre manual batch line to a 300-metre fully automatic conveyorised production system. 700+ plants installed across Indian industry."
      heroStats={[
        { val: '700+', label: 'Manual plants installed' },
        { val: '75+', label: 'Conveyor lines delivered' },
        { val: '14+', label: 'Years in production' },
      ]}
      heroImageLabel="Powder Coating Plant · conveyorised line"
      enquireSlug="powder-coating-plant"
      backHref="/products/optifinish-manufactured"
      backLabel="← Back to Manufactured"

      problemHeadline="A powder coating line has"
      problemAccent="too many moving parts to outsource."
      problemBody="Sourcing a pretreatment line from one supplier, a booth from another, an oven from a third, and controls from a fourth creates integration risk, commissioning delays, and a service nightmare. Every OptiFinish powder coating plant is designed, built, and commissioned as a single system by one team."
      benefits={[
        'Every component — booth, oven, PT line, conveyor, controls — manufactured under one roof at Greater Noida',
        'Custom-engineered to your part size, throughput, substrate, and floor layout',
        'Manual batch and fully conveyorised automatic configurations',
        'Siemens PLC control panels with VFD drives on all major motors',
        'Full site commissioning and operator training included — we don\'t leave until it runs',
        '700+ manual plants and 75+ conveyor lines installed across Indian industry',
      ]}

      steps={[
        {
          num: '01',
          title: 'Pretreatment',
          body: 'Parts enter the pretreatment tunnel — a multi-stage spray or dip system that cleans, degreases, phosphates, and passivates the substrate. Proper PT is the foundation of coating adhesion. OptiFinish designs PT stages from 3-stage basic iron phosphate to full 7-stage zinc phosphate systems.',
          imageLabel: 'Step 01 · pretreatment tunnel — cleaning and phosphating',
        },
        {
          num: '02',
          title: 'Powder application',
          body: 'Dried parts enter the powder spray booth where manual or automatic guns electrostatically apply powder coating. The integrated Venturi recovery system reclaims over-sprayed powder at 98% efficiency and returns it to the hopper.',
          imageLabel: 'Step 02 · powder spray booth — electrostatic gun application',
        },
        {
          num: '03',
          title: 'Curing and unloading',
          body: 'Powder-coated parts enter the curing oven at 180–200°C where the powder melts, flows, and cross-links into a hard, durable coating. After the cooling section, parts are unloaded from the conveyor — the full cycle is continuous, automatic, and repeatable at the specified line speed.',
          imageLabel: 'Step 03 · curing oven and part unloading',
        },
      ]}
      howItWorksTitle="PT → Booth → Oven → Unload"

      specRows={[
        { l: 'Configuration', v: 'Manual batch / Fully conveyorised automatic' },
        { l: 'Substrates', v: 'MS steel, aluminium, galvanised, aluminium extrusions' },
        { l: 'PT stages', v: '3-stage (basic iron phosphate) to 7-stage (zinc phosphate)' },
        { l: 'Oven type', v: 'Gas-fired (LPG/PNG) or electric; tunnel or batch' },
        { l: 'Conveyor', v: 'Monorail overhead; chain-on-edge; power & free' },
        { l: 'Line speed', v: 'Custom to throughput — typically 0.5–4 m/min' },
        { l: 'Control panel', v: 'Siemens PLC; VFD drives on all major motors' },
        { l: 'Powder booth', v: 'MS or SS-304 with integrated Venturi cyclone recovery' },
        { l: 'Electrical', v: '3-phase 415V, 50Hz; total load per line specification' },
      ]}

      applications={[
        'Automotive components — wheels, chassis, frames, body parts',
        'White goods — washing machines, refrigerator panels, ACs',
        'Steel and aluminium furniture manufacturing',
        'Agricultural and construction equipment',
        'Electrical enclosures and switchgear panels',
        'Architectural aluminium profiles and extrusions',
        'General engineering fabrications',
      ]}

      compatibilityTags={[
        'GEMA OptiFlex Pro manual guns',
        'GEMA OptiGun automatic guns',
        'OptiFinish ZA01 Reciprocator',
        'Z-TAP Robot System',
        'OptiFinish Cyclone & Dust Collector',
        'OptiFinish PS Vibratory Sieve',
        'GEMA OC08 OptiCentre',
      ]}

      references={[
        {
          client: 'National Steel Products · Sarkar Enterprises · MR Tubes',
          desc: 'National Steel Products — 5-stage PT, conveyorised line, 1800mm part height, full commissioning. Sarkar Enterprises — 7-stage PT + 2-zone curing oven. MR Tubes, Greater Noida — full plant GA per VACSPL-0062 drawing.',
        },
      ]}

      related={[
        {
          name: 'Curing Oven',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/curing-oven',
          enquireSlug: 'curing-oven',
        },
        {
          name: 'Powder Spray Booth',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/powder-spray-booth',
          enquireSlug: 'powder-spray-booth',
        },
        {
          name: 'Pretreatment Line (PT Line)',
          category: 'OptiFinish Manufactured',
          href: '/products/optifinish-manufactured/pt-line',
          enquireSlug: 'pt-line',
        },
      ]}

      ctaHeadline="Specify your powder coating line."
      ctaAccent="We'll build it."
      ctaBody="Give us your part size, throughput requirement, substrate, and floor dimensions — OptiFinish will design, quote, and deliver the complete line."
    />
  );
}
