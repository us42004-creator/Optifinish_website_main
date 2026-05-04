import type { Metadata } from 'next';
import Link from 'next/link';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'DCP Server-Based Maintenance | OptiFinish Services',
  description:
    'Remote diagnostics and server-based predictive maintenance for connected coating lines — coming soon from OptiFinish.',
};

/* ── Shared decorative grids (mirrors ServicePageTemplate) ── */
function DarkGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.028]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }}
    />
  );
}

function LightGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{
        backgroundImage:
          'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)',
        backgroundSize: '88px 88px',
        opacity: 0.55,
      }}
    />
  );
}

const OTHER_SERVICES = [
  {
    href: '/services/plant-amc',
    label: 'Plant AMC',
    tag: 'Maintenance',
    desc: 'Scheduled annual maintenance contracts for installed coating lines.',
  },
  {
    href: '/services/testing-commissioning',
    label: 'Testing & Commissioning',
    tag: 'Commissioning',
    desc: 'Validation and handover of newly installed or modified coating lines.',
  },
  {
    href: '/services/troubleshooting-support',
    label: 'Troubleshooting & Support',
    tag: 'Support',
    desc: 'Remote and on-site diagnosis for coating defects and equipment faults.',
  },
  {
    href: '/services/upgrades-retrofits',
    label: 'Upgrades & Retrofits',
    tag: 'Upgrades',
    desc: 'Targeted line upgrades to add automation, improve throughput, or extend equipment life.',
  },
  {
    href: '/services/ttr',
    label: 'Trials, Testing & Review',
    tag: 'Trials',
    desc: 'Coating trials on sample parts at our Greater Noida facility with full process report.',
  },
  {
    href: '/services/gema-spare-parts',
    label: 'GEMA Spare Parts',
    tag: 'Parts Supply',
    desc: 'Genuine OEM spare parts for all GEMA powder coating equipment models.',
  },
];

const FEATURE_PREVIEWS = [
  {
    title: 'Real-time line monitoring',
    desc: 'Continuous telemetry from connected coating line controllers — oven temperatures, gun parameters, conveyor speed, and pretreatment chemistry — surfaced through a central dashboard.',
  },
  {
    title: 'Predictive fault detection',
    desc: 'Pattern recognition across historical line data flags developing issues before they cause unplanned downtime. Know what is about to fail before it does.',
  },
  {
    title: 'Remote diagnostics by OptiFinish engineers',
    desc: 'Our service team connects directly to your line for remote diagnosis and parameter adjustment — reducing site visit frequency and compressing fault-to-fix time.',
  },
];

export default function DCPMaintenancePage() {
  return (
    <main className="min-h-screen">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Hero — Coming Soon (dark)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#070809] pb-20 pt-[100px] md:pb-28 md:pt-[108px]">
        <DarkGrid />

        {/* Yellow glow — top centre */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FECE00]/[0.03] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2">
            <Link
              href="/services"
              className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/25 transition-colors hover:text-white/50"
            >
              Services
            </Link>
            <span className="text-[0.6rem] text-white/15">/</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/40">
              DCP Server-Based Maintenance
            </span>
          </div>

          {/* Coming Soon badge */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-[#FECE00] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]">
              Coming Soon
            </span>
            <span className="inline-block rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white/40">
              DCP Server-Based Maintenance
            </span>
          </div>

          {/* Eyebrow */}
          <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
            OptiFinish Services · Next Generation
          </p>

          {/* Headline */}
          <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em]">
            <span className="block text-white">Remote diagnostics.</span>
            <span className="block text-[#FECE00]">Predictive maintenance.</span>
          </h1>

          {/* Subline */}
          <p className="mt-5 max-w-xl text-[0.88rem] leading-relaxed text-white/38">
            Server-based condition monitoring and remote diagnostic access for connected OptiFinish coating lines — giving our engineers visibility into your plant without a site visit. Launching later in 2026.
          </p>

          {/* Feature preview cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {FEATURE_PREVIEWS.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 rounded-[1.1rem] border border-[#FECE00]/[0.1] bg-[#FECE00]/[0.03] p-5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FECE00]/15">
                  <span className="h-2 w-2 rounded-full bg-[#FECE00]" />
                </span>
                <h3 className="font-display text-[0.92rem] font-black leading-snug tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="text-[0.75rem] leading-relaxed text-white/40">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#FECE00] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A] transition-opacity hover:opacity-85"
            >
              Notify me when available <span>→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60 transition-all hover:border-[#FECE00]/30 hover:text-white"
            >
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Other services available now (light)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <LightGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Available Now
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Other services available now
            </h2>
            <p className="mt-3 max-w-lg text-[0.82rem] leading-relaxed text-[#0A0A0A]/45">
              While DCP Server-Based Maintenance is in development, the full range of OptiFinish after-sales services is available today.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group flex flex-col gap-3 rounded-[1.1rem] border border-[#0A0A0A]/[0.07] bg-white/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0A0A0A]/[0.12]"
              >
                <span className="self-start rounded-full border border-[#0A0A0A]/[0.1] bg-[#0A0A0A]/[0.04] px-2.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/45">
                  {svc.tag}
                </span>
                <h3 className="font-display text-[0.92rem] font-black leading-snug tracking-tight text-[#0A0A0A]">
                  {svc.label}
                </h3>
                <p className="text-[0.75rem] leading-relaxed text-[#0A0A0A]/45">{svc.desc}</p>
                <div className="mt-auto flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/25 transition-colors group-hover:text-[#0A0A0A]/60">
                  Learn more{' '}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Global CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HomeCTA />
    </main>
  );
}
