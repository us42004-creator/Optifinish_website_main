import type { Metadata } from 'next';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import CrossCategoryNav from '@/components/products/CrossCategoryNav';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'OptiFinish Manufactured — Powder Coating Plants, Ovens & Booths | OptiFinish',
  description:
    'Complete powder coating lines, curing ovens, spray booths, and pretreatment systems — designed and manufactured at our Greater Noida facility.',
};

const PRODUCTS = [
  {
    name: 'Powder Coating Plant',
    subtitle: 'Conveyorised Line — Manual & Automatic',
    description:
      'A complete turnkey powder coating line built, assembled, and commissioned by OptiFinish — integrating pretreatment, powder booth, curing oven, and conveyor systems for continuous production.',
    specs: [
      'Manual and conveyorised configurations; batch or continuous production',
      'Full line design: PT stages → booth → oven → conveyor → electrical control panel',
      'Custom-engineered to part size, throughput, and substrate requirements',
      '300+ manual plants and 75+ conveyor lines installed across India',
    ],
    enquireSlug: 'powder-coating-plant',
    learnMoreHref: '/products/optifinish-manufactured/powder-coating-plant',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant2.jpeg', label: 'Conveyorised line' },
      { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant1.jpeg', label: 'Booth & recovery system' },
      { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant3.jpeg', label: 'Full line overview' },
    ],
  },
  {
    name: 'Curing Oven',
    subtitle: 'Gas-Fired & Electric — Batch and Conveyorised',
    description:
      "Manufactured in-house to each installation's throughput and part-size requirements — OptiFinish curing ovens deliver consistent temperature uniformity for complete powder cure across steel, aluminium, and fabricated components.",
    specs: [
      'Operating range: 180–200°C; adjustable to process requirements',
      'Ecoflame gas burner; 5HP drive; 200mm Rockwool insulation on all panels',
      'Internal dimensions matched to booth and conveyor layout',
      'Available as standalone batch ovens or inline with conveyor lines',
    ],
    enquireSlug: 'curing-oven',
    learnMoreHref: '/products/optifinish-manufactured/curing-oven',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/curing-oven/industrial_oven.png', label: 'Curing Oven — Full Build' },
      { src: '/images/products/optifinish-manufactured/curing-oven/oven-nic.png', label: 'Oven Detail' },
      { src: '/images/products/optifinish-manufactured/curing-oven/yellow-oven-lighting.png', label: 'Interior — Heat Chamber' },
      { src: '/images/products/optifinish-manufactured/curing-oven/oven-cleaned.png', label: 'Curing Oven — Exterior View' },
    ],
  },
  {
    name: 'Powder Spray Booth',
    subtitle: 'MS · SS-304 · Plastic — Manual & Automatic',
    description:
      'A powder spray enclosure designed for 92–96% powder recovery with an integrated cyclone and bag filter — manufactured in MS or full SS-304 construction to suit production environment and product requirements.',
    specs: [
      'Standard internal dimensions: 5000 × 1200 × 3050 mm (custom available)',
      'SS-304 Venturi powder recovery system; 92–96% recovery rate',
      '20HP suction motor; Siemens-class electrical panel',
      'Compatible with GEMA OptiFlex, OptiGun, and all major powder guns',
    ],
    enquireSlug: 'powder-spray-booth',
    learnMoreHref: '/products/optifinish-manufactured/powder-spray-booth',
    imageSrcs: [
      { src: '/images/products/spray-booth/automatic/automatic-booth-inside.jpeg', label: 'Automatic booth interior' },
      { src: '/images/products/spray-booth/automatic/ss-booth.jpeg', label: 'SS-304 construction' },
      { src: '/images/products/spray-booth/manual/manual1.jpg', label: 'Manual booth' },
      { src: '/images/products/spray-booth/automatic/plastic-booth-cropped.jpeg', label: 'Plastic modular booth' },
    ],
  },
  {
    name: 'Liquid Spray Booth',
    subtitle: 'MS Construction — Wet Paint Applications',
    description:
      'A downdraft liquid spray booth for solvent-based and water-based paint application — with high-velocity air extraction, water wash or dry filter options, and compliant exhaust for CPCB norms.',
    specs: [
      'Internal dimensions: 2450 × 1500 × 1800 mm (custom available)',
      '7000 CMH airflow; 5HP suction; MS sheet construction',
      'Water wash or dry filter for paint mist capture',
      'Automotive, wood lacquering, industrial parts, and high-production paint lines',
    ],
    enquireSlug: 'liquid-spray-booth',
    learnMoreHref: '/products/optifinish-manufactured/liquid-spray-booth',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/liquid-spray-booth/car-painting-booth.jpg', label: 'Car painting booth' },
      { src: '/images/products/optifinish-manufactured/liquid-spray-booth/liquid-single-operator-booth.png', label: 'Single operator booth' },
      { src: '/images/products/optifinish-manufactured/liquid-spray-booth/cartridge-filter-booth.png', label: 'Cartridge filter booth' },
    ],
  },
  {
    name: 'SS Booth System',
    subtitle: 'Pollution-Free — Full SS-304 Build',
    description:
      'A fully stainless-steel powder coating booth designed for clean environments, food-adjacent industries, and operations requiring easy washdown — zero-rust construction with full powder recovery.',
    specs: [
      'Full SS-304 construction: panels, duct, Venturi, hopper, and frame',
      'Pollution-free operation: 92–96% powder recovery, clean exhausts',
      'Suitable for pharmaceutical, food equipment, medical, and precision engineering',
      'Quick colour change capability with dedicated recovery separation',
    ],
    enquireSlug: 'ss-booth-system',
    learnMoreHref: '/products/optifinish-manufactured/ss-booth-system',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png', label: 'SS-304 Booth' },
      { src: '/images/products/optifinish-manufactured/SS_BOOTH/automatic-booth-inside.jpeg', label: 'Booth Interior' },
      { src: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth.jpeg', label: 'Exterior Build' },
      { src: '/images/products/optifinish-manufactured/SS_BOOTH/booth-exterior.jpeg', label: 'Booth Exterior' },
    ],
  },
  {
    name: 'Plastic / PP Booth',
    subtitle: 'Quick Colour Change — Small Batch',
    description:
      'A polypropylene (PP) constructed spray booth for operations requiring rapid colour changes — lightweight, corrosion-resistant, and easy to clean, ideal for custom coating shops and small-batch production.',
    specs: [
      'Full PP construction — no rust, no contamination risk',
      'Fast clean-out for colour changes without cross-contamination',
      'Compact footprint for smaller production floors',
      'Integrated suction and recovery; compatible with standard manual guns',
    ],
    enquireSlug: 'plastic-booth',
    learnMoreHref: '/products/optifinish-manufactured/plastic-booth',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/plastic-booth/pp_booth.png', label: 'PP Booth — Full Installation' },
      { src: '/images/products/optifinish-manufactured/plastic-booth/img_plastic.jpeg', label: 'Plastic Booth — Interior View' },
      { src: '/images/products/optifinish-manufactured/plastic-booth/plas.png', label: 'Booth with GEMA Gun Setup' },
      { src: '/images/products/optifinish-manufactured/plastic-booth/plastic-booth-cropped.jpeg', label: 'Plastic Booth — Exterior View' },
    ],
  },
  {
    name: 'Cyclone & Dust Collector',
    subtitle: '92–96% Recovery — 3,000 to 32,000 CMH',
    description:
      'A modular powder recovery and filtration system — deployed as a standalone unit or integrated within an OptiFinish booth — delivering 92–96% powder reclaim across a wide airflow range.',
    specs: [
      'Airflow range: 3,000–32,000 CMH (sized to booth and production load)',
      '92–96% cyclone powder recovery; secondary bag filter for clean exhaust',
      'Compatible with metallic, textured, and fine-particle powder grades',
      'Modular design for easy maintenance and filter replacement',
    ],
    enquireSlug: 'cyclone-dust-collector',
    learnMoreHref: '/products/optifinish-manufactured/cyclone-dust-collector',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone-dust-collect.png', label: 'Full Line View' },
      { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone001.png', label: 'Compact Setup' },
      { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/cyclone.png', label: 'Factory Installation' },
      { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/dust-collector.jpeg', label: 'Dust Collector Unit' },
    ],
  },
  {
    name: 'Pretreatment Line (PT Line)',
    subtitle: 'Iron Phosphating & Multi-Stage Systems',
    description:
      'A multi-stage pretreatment system designed to prepare steel, aluminium, and galvanised substrates for maximum powder adhesion — from simple 3-stage iron phosphating to full 7-stage zinc phosphate systems.',
    specs: [
      '3-stage to 7-stage configurations: degreasing, phosphating, passivation, DI rinse',
      'Spray tunnel or dip tank design depending on part geometry and throughput',
      'Electric or steam heating; full MS/SS tank options',
      'Integrated with conveyor or standalone batch line',
    ],
    enquireSlug: 'pt-line',
    learnMoreHref: '/products/optifinish-manufactured/pt-line',
  },
  {
    name: 'Wood Finish Oven',
    subtitle: 'Sublimation Transfer — Aluminium Profiles',
    description:
      'A specialist curing oven designed for thermal sublimation transfer of wood-grain, stone, and custom patterns onto powder-coated aluminium extrusions — delivering a durable, photo-realistic decorative finish.',
    specs: [
      'Optimised temperature uniformity for sublimation transfer film bonding',
      'Suitable for aluminium doors, windows, profiles, and architectural extrusions',
      'Custom chamber sizing for profile lengths and batch volumes',
      'Can be combined with standard powder coating line as a finishing stage',
    ],
    enquireSlug: 'wood-finish-oven',
    learnMoreHref: '/products/optifinish-manufactured/wood-finish-oven',
    imageSrcs: [
      { src: '/images/products/optifinish-manufactured/wood-finish-oven/img_4.png', label: 'Side View — Profile Conveyor' },
      { src: '/images/products/optifinish-manufactured/wood-finish-oven/img-1.png', label: 'Wood Finish Oven — Full Line' },
      { src: '/images/products/optifinish-manufactured/wood-finish-oven/application/architectural-hardware-wood-grain.webp', label: 'Architectural Hardware — Wood-Grain & Stone Effects' },
      { src: '/images/products/optifinish-manufactured/wood-finish-oven/application/aluminium-wall-profile.webp', label: 'Aluminium Wall Profiles & Cladding' },
      { src: '/images/products/optifinish-manufactured/wood-finish-oven/img-2.png', label: 'Wide Angle — Full Installation' },
      { src: '/images/products/optifinish-manufactured/wood-finish-oven/image3.png', label: 'Detail — Oven End Section' },
    ],
  },
];

export default function OptiFinishManufacturedPage() {
  return (
    <>
      <CategoryHero
        eyebrow="In-house Manufactured — Greater Noida"
        tag="In-house Manufactured"
        headline="Industrial finishing systems."
        headlineAccent="Designed and built by us."
        subline="Every powder coating plant, oven, booth, and pretreatment line we build comes from our own manufacturing and R&D facility in Greater Noida — engineered to your line requirements and commissioned by our team."
        stats={[
          { value: '300+', label: 'Manual plants installed' },
          { value: '75+', label: 'Conveyor lines delivered' },
          { value: '14+ Yrs', label: 'In production' },
        ]}
        theme="dark"
        breadcrumbLabel="OptiFinish Manufactured"
        imageSrc="/images/products/optifinish-manufactured/powder-coating-plant/plant2.jpeg"
        imageAlt="OptiFinish powder coating plant — manufactured in Greater Noida"
      />

      {/* Product Grid */}
      <section className="bg-[#070809] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              Product Range
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-white">
              What&apos;s in this range
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.enquireSlug}
                {...product}
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>

      <CrossCategoryNav currentSlug="optifinish-manufactured" theme="dark" />
      <HomeCTA />
    </>
  );
}
