import type { Metadata } from 'next';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import CrossCategoryNav from '@/components/products/CrossCategoryNav';
import HomeCTA from '@/components/sections/home/HomeCTA';
import { metadataBase, defaultOpenGraph, defaultTwitter, breadcrumbSchema, SITE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  title: 'OptiFinish Automation — Z-TAP Robot, OPTI-ZA-18 Reciprocator & Sieve Machine',
  description:
    'Proprietary powder coating automation systems developed entirely in-house by OptiFinish — Z-TAP coating automation robot, OPTI-ZA-18 vertical automatic reciprocator, and PS Vibratory Sieve Machine for powder recovery.',
  keywords: [
    'Z-TAP powder coating robot India',
    'OPTI-ZA-18 automatic reciprocator India',
    'powder coating automation system India',
    'automatic powder coating machine India',
    'coating automation robot India',
    'powder sieve machine India',
    'OptiFinish automation products',
    'proprietary coating automation',
    'powder coating reciprocator India',
  ],
  alternates: { canonical: `${SITE.url}/products/automation` },
  openGraph: {
    ...defaultOpenGraph,
    title: 'OptiFinish Automation — Z-TAP Robot, OPTI-ZA-18 Reciprocator & Sieve Machine',
    description: 'Proprietary powder coating automation systems — Z-TAP robot, OPTI-ZA-18 reciprocator, and sieve machine — developed in-house by OptiFinish.',
    url: `${SITE.url}/products/automation`,
  },
  twitter: {
    ...defaultTwitter,
    title: 'OptiFinish Automation — Z-TAP Robot, OPTI-ZA-18 Reciprocator & Sieve Machine',
    description: 'Proprietary powder coating automation — Z-TAP robot, OPTI-ZA-18 reciprocator, sieve machine by OptiFinish.',
  },
};

const breadcrumb = breadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'OptiFinish Automation', href: '/products/automation' },
]);

export default function AutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CategoryHero
        eyebrow="Proprietary Technology — Built In-house"
        tag="Proprietary Technology"
        headline="Automation that thinks"
        headlineAccent="like a coater."
        subline="Every automation product from OptiFinish is developed entirely in-house — from the Z-TAP robot to the OPTI-ZA-18 reciprocator and the PS Vibratory Sieve Machine. No licensing. No rebadging. Ours."
        stats={[
          { value: '99.4%', label: 'Coat accuracy (Z-TAP)' },
          { value: '3×', label: 'Throughput increase' },
          { value: '100%', label: 'Proprietary development' },
        ]}
        theme="dark"
        breadcrumbLabel="Automation"
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

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Z-TAP — Wide hero card */}
            <div className="sm:col-span-2">
              <div className="group overflow-hidden rounded-[1.2rem] border border-black/[0.08] bg-white transition-all duration-300 hover:border-[#FECE00]/50 md:border-[#FECE00]/[0.12] md:bg-[#FECE00]/[0.04] md:hover:border-[#FECE00]/[0.22]">
                {/* Image placeholder — wide */}
                <div className="relative flex aspect-[21/6] w-full items-center justify-center overflow-hidden bg-[#f0eeeb] md:aspect-[21/7] md:bg-white/[0.025]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#FECE00]/40" />
                  <span className="relative text-[9px] font-semibold uppercase tracking-[0.24em] text-black/20 md:text-white/15">
                    Z-TAP Robot System · image
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[1.3rem] font-black leading-tight tracking-tight text-[#0A0A0A] md:text-[1.5rem] md:text-white">
                        Z-TAP Robot System
                      </h3>
                      <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#b89000] md:text-[#FECE00]/55">
                        Mimic Once. Perfect Every Time.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#FECE00] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]">
                      Flagship Product
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-[0.82rem] leading-relaxed text-[#0A0A0A]/65 md:text-white/42">
                    Z-TAP is OptiFinish&apos;s flagship powder coating robot — a 6-axis system that
                    captures a human operator&apos;s spray motion once using IMU sensors and
                    LightRoom capture, then replicates it with mechanical precision across every
                    part. No programming. No code. Ready in under 2 minutes.
                  </p>

                  {/* Stats grid */}
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-black/[0.08] pt-6 sm:grid-cols-6 md:border-white/[0.06]">
                    {[
                      { value: '99.4%', label: 'Coat accuracy' },
                      { value: '±0.5mm', label: 'Path repeatability' },
                      { value: '3×', label: 'Throughput' },
                      { value: '↓80%', label: 'Setup time' },
                      { value: '<2%', label: 'Defect rate' },
                      { value: '<50ms', label: 'Tag latency' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="font-display text-[1.1rem] font-black leading-none text-[#0A0A0A] md:text-[#FECE00]">
                          {s.value}
                        </div>
                        <div className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.1em] text-[#0A0A0A]/45 md:text-white/35">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Spec bullets */}
                  <ul className="mt-5 grid gap-1.5 border-t border-black/[0.08] pt-4 sm:grid-cols-2 md:border-white/[0.06]">
                    {[
                      '6-axis Fairino robot base with IMU-based motion capture',
                      'Fully proprietary software and capture system',
                      'LightRoom capture — program build in under 2 minutes',
                      'Developed at OptiFinish Greater Noida R&D facility',
                    ].map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-[0.7rem] leading-snug text-[#0A0A0A]/65 md:text-white/45"
                      >
                        <span className="mt-[4px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0A0A0A]/50 md:bg-[#FECE00]" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/[0.08] pt-4 md:border-white/[0.06]">
                    <a
                      href="/contact?product=z-tap"
                      className="rounded-full bg-[#FECE00] px-5 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A] transition-all hover:bg-[#FECE00]/85"
                    >
                      Enquire →
                    </a>
                    <a
                      href="/products/automation/z-tap"
                      className="rounded-full border border-black/[0.12] px-5 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/50 transition-all hover:border-black/25 hover:text-[#0A0A0A]/80 md:border-[#FECE00]/20 md:text-[#FECE00]/50 md:hover:border-[#FECE00]/40 md:hover:text-[#FECE00]/80"
                    >
                      View Z-TAP site →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* OPTI-ZA-18 — mobile light / desktop dark */}
            <div className="md:hidden">
              <ProductCard
                name="OPTI-ZA-18 Reciprocator"
                subtitle="Vertical Reciprocator — Proprietary Build"
                description="A slim-column vertical reciprocator built entirely in-house by OptiFinish — designed as the right-sized entry into automated gun traversal for batch and conveyorised lines. Accommodates multiple automatic guns, handles both short and long stroke operations, and keeps maintenance to a minimum."
                specs={[
                  'Slim column design — space-efficient mounting of up to 6 automatic guns',
                  'Short and long stroke operation; horizontal or vertical gun arrangement',
                  'Advanced synchronized motor for smooth, consistent continuous traversal',
                  'Minimal maintenance design — quick service, no specialist tooling',
                  'Compatible with GEMA OptiGun and other standard automatic gun mounts',
                  'Designed and manufactured at OptiFinish Greater Noida R&D facility',
                ]}
                imageSrcs={[
                  { src: '/images/products/za01/recip_landscape.png', label: 'OPTI-ZA-18 — Full installation view', fit: 'cover' },
                  { src: '/images/products/za01/recip_portrait.png',  label: 'OPTI-ZA-18 — Machine profile',       fit: 'cover' },
                  { src: '/images/products/za01/recip_mount.png',     label: 'OPTI-ZA-18 — Gun mounting',          fit: 'cover' },
                ]}
                enquireSlug="za01"
                learnMoreHref="/products/automation/za01"
                theme="light"
              />
            </div>
            <div className="hidden md:block">
              <ProductCard
                name="OPTI-ZA-18 Reciprocator"
                subtitle="Vertical Reciprocator — Proprietary Build"
                description="A slim-column vertical reciprocator built entirely in-house by OptiFinish — designed as the right-sized entry into automated gun traversal for batch and conveyorised lines. Accommodates multiple automatic guns, handles both short and long stroke operations, and keeps maintenance to a minimum."
                specs={[
                  'Slim column design — space-efficient mounting of up to 6 automatic guns',
                  'Short and long stroke operation; horizontal or vertical gun arrangement',
                  'Advanced synchronized motor for smooth, consistent continuous traversal',
                  'Minimal maintenance design — quick service, no specialist tooling',
                  'Compatible with GEMA OptiGun and other standard automatic gun mounts',
                  'Designed and manufactured at OptiFinish Greater Noida R&D facility',
                ]}
                imageSrcs={[
                  { src: '/images/products/za01/recip_landscape.png', label: 'OPTI-ZA-18 — Full installation view', fit: 'cover' },
                  { src: '/images/products/za01/recip_portrait.png',  label: 'OPTI-ZA-18 — Machine profile',       fit: 'cover' },
                  { src: '/images/products/za01/recip_mount.png',     label: 'OPTI-ZA-18 — Gun mounting',          fit: 'cover' },
                ]}
                enquireSlug="za01"
                learnMoreHref="/products/automation/za01"
                theme="dark"
              />
            </div>

            {/* PS Vibratory Sieve Machine — mobile light / desktop dark */}
            <div className="md:hidden">
              <ProductCard
                name="PS Vibratory Sieve Machine"
                subtitle="Recovered Powder — Vibratory Sieving Unit"
                description="A vibratory sieve unit developed in-house for seamless integration into any powder coating system — delivering reliable recovered-powder processing with minimal disruption during colour changes and everyday maintenance."
                specs={[
                  'Vibratory sieving mechanism for continuous, gentle powder separation',
                  'Designed for easy integration into existing booth and cyclone setups',
                  'Colour-change ready — fast cleaning between powder batches',
                  'Removes lumps, agglomerates, and foreign particles before re-entry to hopper',
                  'Low maintenance design; accessible internal components for quick service',
                ]}
                imageSrcs={[
                  { src: '/images/products/sieve-machine/sieve-machine-04.jpg', label: 'PS Vibratory Sieve Machine', fit: 'cover' },
                  { src: '/images/products/sieve-machine/sieve-machine-02.jpg', label: 'Cyclone output feed' },
                  { src: '/images/products/sieve-machine/sieve-machine-03.jpg', label: 'Vibratory sieving mechanism' },
                ]}
                enquireSlug="sieve-machine"
                learnMoreHref="/products/automation/sieve-machine"
                theme="light"
              />
            </div>
            <div className="hidden md:block">
              <ProductCard
                name="PS Vibratory Sieve Machine"
                subtitle="Recovered Powder — Vibratory Sieving Unit"
                description="A vibratory sieve unit developed in-house for seamless integration into any powder coating system — delivering reliable recovered-powder processing with minimal disruption during colour changes and everyday maintenance."
                specs={[
                  'Vibratory sieving mechanism for continuous, gentle powder separation',
                  'Designed for easy integration into existing booth and cyclone setups',
                  'Colour-change ready — fast cleaning between powder batches',
                  'Removes lumps, agglomerates, and foreign particles before re-entry to hopper',
                  'Low maintenance design; accessible internal components for quick service',
                ]}
                imageSrcs={[
                  { src: '/images/products/sieve-machine/sieve-machine-04.jpg', label: 'PS Vibratory Sieve Machine', fit: 'cover' },
                  { src: '/images/products/sieve-machine/sieve-machine-02.jpg', label: 'Cyclone output feed' },
                  { src: '/images/products/sieve-machine/sieve-machine-03.jpg', label: 'Vibratory sieving mechanism' },
                ]}
                enquireSlug="sieve-machine"
                learnMoreHref="/products/automation/sieve-machine"
                theme="dark"
              />
            </div>

            {/* Auto Spray Optimisation — spans 2 cols on desktop, mobile light / desktop dark */}
            <div className="sm:col-span-2 md:hidden">
              <ProductCard
                name="Auto Spray Optimisation"
                subtitle="Reciprocator + Gun Control — Integrated"
                description="An integrated control system combining reciprocator movement, gun triggering, and conveyor speed synchronisation — ensuring powder is only sprayed when a part is in the booth, reducing waste and improving line efficiency."
                specs={[
                  'Part-presence detection for trigger-on-demand powder application',
                  'Synchronised with conveyor speed for consistent film build per part',
                  'Reduces powder waste by eliminating spray during gaps between parts',
                  'Retrofittable onto existing OptiFinish or third-party booth installations',
                ]}
                enquireSlug="auto-spray-optimisation"
                learnMoreHref="/products/automation/auto-spray-optimisation"
                theme="light"
              />
            </div>
            <div className="sm:col-span-2 hidden md:block">
              <ProductCard
                name="Auto Spray Optimisation"
                subtitle="Reciprocator + Gun Control — Integrated"
                description="An integrated control system combining reciprocator movement, gun triggering, and conveyor speed synchronisation — ensuring powder is only sprayed when a part is in the booth, reducing waste and improving line efficiency."
                specs={[
                  'Part-presence detection for trigger-on-demand powder application',
                  'Synchronised with conveyor speed for consistent film build per part',
                  'Reduces powder waste by eliminating spray during gaps between parts',
                  'Retrofittable onto existing OptiFinish or third-party booth installations',
                ]}
                enquireSlug="auto-spray-optimisation"
                learnMoreHref="/products/automation/auto-spray-optimisation"
                theme="dark"
                className="sm:col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      <CrossCategoryNav currentSlug="automation" theme="dark" />
      <HomeCTA />
    </>
  );
}
