import type { Metadata } from 'next';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import CrossCategoryNav from '@/components/products/CrossCategoryNav';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'GEMA Powder Coating Equipment — Authorised Partner India | OptiFinish',
  description:
    'OptiFinish is an authorised GEMA partner in India. Supply and support for manual guns, automatic guns, reciprocators, and OptiCentre powder management systems.',
};

const PRODUCTS = [
  {
    name: 'Manual Powder Coating Gun',
    subtitle: 'OptiFlex Pro Series',
    description:
      "GEMA's manual gun range covers everything from quick colour changes to difficult powders — engineered for reliable performance across batch and production environments.",
    specs: [
      'Colour change in as fast as 35 seconds (Pro Q model)',
      'Up to 600 g/min powder output (Pro F Spray)',
      'Box-fed, hopper-fed, and wall-mount configurations available',
    ],
    enquireSlug: 'gema-manual-gun',
    learnMoreHref: '/products/gema/manual-gun',
  },
  {
    name: 'Automatic Powder Coating Gun',
    subtitle: 'OptiGun with PowerBoost®',
    description:
      "GEMA's flagship automatic gun delivers the highest powder charging capacity in the industry — engineered for consistent finish quality and minimal rework on demanding production lines.",
    specs: [
      '110 kV PowerBoost® — highest charging capacity available',
      'PCC Technology & SuperCorona for penetration and reduced orange peel',
      'DVC Technology for precise, reproducible powder output control',
    ],
    enquireSlug: 'gema-automatic-gun',
    learnMoreHref: '/products/gema/automatic-gun',
  },
  {
    name: 'Reciprocators & Automation Axes',
    subtitle: 'ZA Series + Axis Systems',
    description:
      "GEMA's reciprocator range automates gun movement across vertical and horizontal axes — reducing manpower, improving coating consistency, and enabling programming-free operation via Dynamic Contour Detection.",
    specs: [
      'ZA07 / ZA08 / ZA15 / ZA16 / ZA17 vertical reciprocator models',
      'Horizontal axis systems (XT, UA, YT series) for position adjustment and cleaning',
      'Dynamic Contour Detection — no programming required',
    ],
    enquireSlug: 'gema-reciprocators',
    learnMoreHref: '/products/gema/reciprocators',
  },
  {
    name: 'OptiCentre Powder Management',
    subtitle: 'OC08 — Fully Automatic Powder Center',
    description:
      'A closed-circuit powder management centre that automates hopper filling, sieving, and cleaning — delivering real-time batch tracking and clean working conditions at lower operating cost.',
    specs: [
      'Fully automatic cleaning of hopper and powder-carrying components',
      'Integrated precision load cell with per-batch fresh powder tracking',
      'MagicControl 4.0 integration with GemaConnect dashboard',
    ],
    enquireSlug: 'gema-opticentre',
    learnMoreHref: '/products/gema/opticentre',
  },
];

export default function GemaPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Authorised Partner — GEMA Switzerland"
        tag="Authorised Partner"
        flag="🇨🇭"
        headline="World-standard powder coating"
        headlineAccent="equipment for Indian industry."
        subline="OptiFinish is an authorised GEMA partner in India — supplying and supporting the full range of GEMA guns, reciprocators, and powder management systems."
        stats={[
          { value: '60+ Yrs', label: 'Swiss engineering heritage' },
          { value: '110 kV', label: 'Industry-leading charging' },
          { value: '4 Lines', label: 'Available through OptiFinish' },
        ]}
        theme="light"
        breadcrumbLabel="GEMA"
      />

      {/* Partner note */}
      <div className="bg-[#f1efea]">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
          <p className="text-[0.68rem] leading-relaxed text-[#0A0A0A]/40">
            <span className="font-bold text-[#0A0A0A]/60">Authorised GEMA Partner.</span>{' '}
            OptiFinish supplies and supports genuine GEMA equipment in India. Contact us for
            pricing, demos, and after-sales support.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Product Range
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              What&apos;s in this range
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.enquireSlug}
                {...product}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

      <CrossCategoryNav currentSlug="gema" theme="light" />
      <HomeCTA />
    </>
  );
}
