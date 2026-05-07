import type { Metadata } from 'next';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import CrossCategoryNav from '@/components/products/CrossCategoryNav';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'Dürr Liquid Coating Equipment — Authorised Distributor India | OptiFinish',
  description:
    'OptiFinish supplies Dürr liquid coating equipment in India — EcoGun spray guns, EcoPump systems, and EcoDose 2K/3K electronic dosing for demanding paint applications.',
};

const GUNS = [
  {
    name: 'Cup Gun',
    subtitle: 'EcoGun 116 / EcoGun 910 — Gravity Feed',
    description:
      'A manual gravity-feed air spray gun suited for smaller coating areas, touch-up work, and furniture lacquering — compact, easy to handle, and reliable across solvent and water-based paints.',
    specs: [
      'EcoGun 116: gravity feed, up to 6 bar, 1–4mm nozzle range',
      'EcoGun 910: gravity feed, up to 8 bar, optimised for fine finish',
      'Compatible with solvent and water-based coatings; variants for enamels',
    ],
    enquireSlug: 'durr-cup-gun',
    learnMoreHref: '/products/durr/cup-gun',
  },
  {
    name: 'HVLP Spray Gun',
    subtitle: 'EcoGun AS MAN — High Volume Low Pressure',
    description:
      'A high-transfer-efficiency variant of the EcoGun AS MAN line, operating at low atomisation pressure — ideal for applications where overspray reduction and material savings are the priority.',
    specs: [
      'Low-pressure atomisation for reduced overspray and better transfer efficiency',
      'Suitable for topcoats, clear coats, and fine-finish applications',
      'Compatible with solvent and water-based paints',
    ],
    enquireSlug: 'durr-hvlp-gun',
    learnMoreHref: '/products/durr/hvlp-gun',
  },
  {
    name: 'Airless Spray Gun',
    subtitle: 'EcoGun 246 / EcoGun 249 — High-Pressure',
    description:
      'A high-pressure airless spray gun built for anti-corrosion work on steel structures and heavy-duty wood coating — with modular, reversible nozzles for different output requirements.',
    specs: [
      'EcoGun 246 / 249: hydraulic atomisation — no carrier air needed',
      'Modular reversible nozzles in multiple tip sizes for different spray patterns',
      'Designed for anti-corrosion coatings on structural steel and industrial substrates',
    ],
    enquireSlug: 'durr-airless-gun',
    learnMoreHref: '/products/durr/airless-gun',
  },
  {
    name: 'Air Assist Spray Gun',
    subtitle: 'EcoGun AA — High-Viscosity Application',
    description:
      'Designed for high-viscosity materials under demanding surface quality requirements — the preferred choice for solid wood furniture finishing and applications requiring a fine, controlled finish.',
    specs: [
      'Handles high-viscosity paints, lacquers, and adhesives',
      'Separate air regulation for round and flat spray patterns',
      'Fed by EcoPump VP packages; stainless steel material path (auto variant)',
    ],
    enquireSlug: 'durr-air-assist-gun',
    learnMoreHref: '/products/durr/air-assist-gun',
  },
  {
    name: 'Electrostatic Spray Gun',
    subtitle: 'EcoGun AS — DC & EC Variants',
    description:
      'An electrostatic manual spray gun that charges paint particles for superior wrap-around coverage and reduced overspray — available in Direct Charge (DC) and External Charge (EC) variants.',
    specs: [
      'DC variant (EcoGun AS MAN DC): direct charge electrode for overspray reduction',
      'EC variant (EcoGun AS MAN EC): external charge — compatible with water-based paints',
      'Significant material savings through electrostatic attraction',
    ],
    enquireSlug: 'durr-electrostatic-gun',
    learnMoreHref: '/products/durr/electrostatic-gun',
  },
  {
    name: 'Bell Atomiser',
    subtitle: 'Rotary Electrostatic — Automatic',
    description:
      'A high-speed rotary atomiser delivering ultra-fine, uniform droplet distribution for premium finish quality on automotive and industrial panels — fully automatic, electrostatically charged.',
    specs: [
      'Rotary atomisation for finest droplet size and film uniformity',
      'High transfer efficiency — significantly reduces paint consumption',
      'Designed for automated lines with consistent high-volume output',
    ],
    enquireSlug: 'durr-bell-atomiser',
    learnMoreHref: '/products/durr/bell-atomiser',
  },
];

const PUMPS_DOSING = [
  {
    name: 'EcoPump Systems',
    subtitle: 'Fluid Handling for Paint Shops',
    description:
      'A family of air-operated and electric piston, diaphragm, and shovel plate pumps built for paint circulation, delivery, and transfer — covering water-based and solvent paints, mastics, adhesives, and high-viscosity fluids.',
    specs: [
      'HP Series: 400 / 800 / 1,600 cc/stroke horizontal piston; VP Series: up to 360 bar vertical',
      'EcoPump HP 400 (4.2 kg), HP 800 (5.8 kg), HP 1600 (8 kg) — flow 8–32 L/min',
      'AD diaphragm variant for low-shear applications; HPE electric model (DIN EN 12162)',
      'Pre-assembled EcoPump Package modules for quick deployment and maintenance',
    ],
    enquireSlug: 'durr-ecopump',
    learnMoreHref: '/products/durr/ecopump',
  },
  {
    name: '2K Dosing System',
    subtitle: 'EcoDose 2K — Two-Component Electronic Dosing',
    description:
      'An electronic dosing system for two-component (2K) paint processes — delivering consistently precise mixing ratios across viscosities, with automatic colour changes and independent flushing circuits.',
    specs: [
      'Flow rate range: 40–4,000 cc/min; Coriolis or gear flowmeter dosing',
      'Pot life and catalyst ratio monitoring with real-time process alerts',
      'Independent flushing circuits — no premixing chamber required',
      'Supports water-based and solvent-based 2K formulations',
    ],
    enquireSlug: 'durr-ecodose-2k',
    learnMoreHref: '/products/durr/ecodose-2k',
  },
  {
    name: '3K Dosing System',
    subtitle: 'EcoDose 3K — Three-Component Electronic Dosing',
    description:
      'An electronic dosing system for three-component (3K) coating formulations — enabling complex paint recipes with precise per-component tracking, automatic colour changes, and real-time pot life monitoring.',
    specs: [
      'Flow rate range: 40–4,000 cc/min across all three components simultaneously',
      'Full per-component volume tracking; mixing ratio accuracy across all three streams',
      'Independent flushing circuits — no premixing chamber required',
      'Handles water-based, solvent-based, and complex 3K formulations',
    ],
    enquireSlug: 'durr-ecodose-3k',
    learnMoreHref: '/products/durr/ecodose-3k',
  },
];

export default function DurrPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Authorised Distributor — Dürr Group"
        tag="Authorised Distributor"
        flag="🇩🇪"
        headline="High-precision liquid coating"
        headlineAccent="technology for industrial finishing."
        subline="OptiFinish supplies Dürr liquid coating equipment in India — spray guns, pump systems, and electronic dosing for demanding paint applications."
        stats={[
          { value: '9 Lines', label: 'Guns, pumps, dosing' },
          { value: '2K & 3K', label: 'Multi-component dosing' },
          { value: 'EcoGun', label: 'Full range available' },
        ]}
        theme="light"
        breadcrumbLabel="Dürr"
      />

      {/* Partner note */}
      <div className="bg-[#f1efea]">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
          <p className="text-[0.68rem] leading-relaxed text-[#0A0A0A]/40">
            <span className="font-bold text-[#0A0A0A]/60">Authorised Dürr Distributor.</span>{' '}
            OptiFinish supplies Dürr hardware in India. We supply equipment — not full Dürr plant
            integration. Contact us for availability and technical guidance.
          </p>
        </div>
      </div>

      {/* Liquid Coating Guns */}
      <section className="relative overflow-hidden bg-[#f1efea] py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-8">
            <p className="mb-1 text-[0.52rem] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/35">
              Section 01
            </p>
            <h2 className="font-display text-[clamp(1.3rem,2.5vw,1.9rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Liquid Coating Guns
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUNS.map((product) => (
              <ProductCard
                key={product.enquireSlug}
                {...product}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pump & Dosing */}
      <section className="relative overflow-hidden bg-[#f1efea] py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-8">
            <p className="mb-1 text-[0.52rem] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/35">
              Section 02
            </p>
            <h2 className="font-display text-[clamp(1.3rem,2.5vw,1.9rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Pump &amp; Dosing Systems
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PUMPS_DOSING.map((product) => (
              <ProductCard
                key={product.enquireSlug}
                {...product}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

      <CrossCategoryNav currentSlug="durr" theme="light" />
      <HomeCTA />
    </>
  );
}
