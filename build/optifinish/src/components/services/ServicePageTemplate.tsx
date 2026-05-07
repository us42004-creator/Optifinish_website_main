import Link from 'next/link';
import HomeCTA from '@/components/sections/home/HomeCTA';

/* ── Types ── */
export type HeroStat       = { value: string; label: string };
export type ScopeHighlight = { title: string; desc: string };
export type Step           = { number: string; title: string; desc: string };
export type Application    = { title: string; desc: string };
export type TrustPoint     = { title: string; desc: string };
export type RelatedService = { href: string; label: string; tag: string; desc: string };

export interface ServicePageProps {
  /* S1 — Hero */
  breadcrumbLabel: string;
  tag:             string;
  eyebrow:         string;
  headline:        string;
  headlineAccent:  string;
  subline:         string;
  heroStats:       HeroStat[];
  /* S2 — Scope */
  scopeItems:      string[];
  scopeHighlight:  ScopeHighlight;
  /* S3 — Process */
  steps:           Step[];
  /* S4 — Applications */
  applications:    Application[];
  /* S5 — Trust */
  trustPoints:     TrustPoint[];
  /* S6 — Related */
  relatedServices: RelatedService[];
}

/* ── Shared decorative grids ── */
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
    <>
      <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
      <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
    </>
  );
}

export default function ServicePageTemplate({
  breadcrumbLabel,
  tag,
  eyebrow,
  headline,
  headlineAccent,
  subline,
  heroStats,
  scopeItems,
  scopeHighlight,
  steps,
  applications,
  trustPoints,
  relatedServices,
}: ServicePageProps) {
  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S1 — Hero (dark)
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
              {breadcrumbLabel}
            </span>
          </div>

          {/* Tag pill */}
          <div className="mb-5">
            <span className="inline-block rounded-full bg-[#FECE00] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]">
              {tag}
            </span>
          </div>

          {/* Eyebrow */}
          <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
            {eyebrow}
          </p>

          {/* Headline */}
          <h1 className="font-display max-w-3xl text-[clamp(1.7rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em]">
            <span className="block text-white">{headline}</span>
            <span className="block text-[#FECE00]">{headlineAccent}</span>
          </h1>

          {/* Subline */}
          <p className="mt-5 max-w-xl text-[0.88rem] leading-relaxed text-white/38">
            {subline}
          </p>

          {/* Hero stats chips */}
          {heroStats.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#FECE00]/12 bg-[#FECE00]/[0.05] px-5 py-3"
                >
                  <div className="font-display text-[1.6rem] font-black leading-none text-[#FECE00]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/38">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick CTA */}
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60 transition-all hover:border-[#FECE00]/30 hover:text-white"
            >
              Request this service <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S2 — What's Covered (light)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <LightGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Service Scope
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              What&apos;s included
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Checklist */}
            <ul className="grid gap-3 sm:grid-cols-2 content-start">
              {scopeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[#0A0A0A]/[0.07] bg-white/70 px-4 py-3.5"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FECE00]">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path
                        d="M1 3l2 2 4-4"
                        stroke="#0A0A0A"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[0.78rem] font-medium leading-snug text-[#0A0A0A]/65">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Highlight panel */}
            <div className="flex flex-col rounded-[1.2rem] border border-[#0A0A0A]/[0.08] bg-[#0A0A0A] p-6">
              <div className="mb-4 h-1 w-10 rounded-full bg-[#FECE00]" />
              <h3 className="font-display text-[1.05rem] font-black leading-snug tracking-tight text-white">
                {scopeHighlight.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.8rem] leading-relaxed text-white/45">
                {scopeHighlight.desc}
              </p>
              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FECE00] px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A] transition-opacity hover:opacity-85"
                >
                  Request this service <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S3 — How It Works (dark)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#070809] py-16 md:py-20">
        <DarkGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              Process
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-white">
              How it works
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col gap-3 rounded-[1.1rem] border border-white/[0.07] bg-white/[0.02] p-5"
              >
                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-5 translate-x-full bg-white/[0.08] lg:block" />
                )}
                <span className="font-display text-[1.5rem] font-black leading-none tracking-[-0.04em] text-[#FECE00]/25 md:text-[2rem]">
                  {step.number}
                </span>
                <h3 className="font-display text-[0.95rem] font-black leading-snug tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="text-[0.78rem] leading-relaxed text-white/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S4 — Who Needs This (light)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <LightGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Applications
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Who this is for
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app) => (
              <div
                key={app.title}
                className="flex flex-col gap-2.5 rounded-[1.1rem] border border-[#0A0A0A]/[0.07] bg-white/70 p-5"
              >
                <div className="h-1 w-6 rounded-full bg-[#FECE00]" />
                <h3 className="font-display text-[0.92rem] font-black leading-snug tracking-tight text-[#0A0A0A]">
                  {app.title}
                </h3>
                <p className="text-[0.75rem] leading-relaxed text-[#0A0A0A]/50">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S5 — Why OptiFinish (dark)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#070809] py-16 md:py-20">
        <DarkGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              Why OptiFinish
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-white">
              The OptiFinish difference
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="flex flex-col gap-2.5 rounded-[1.1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] p-5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FECE00]/15">
                  <span className="h-2 w-2 rounded-full bg-[#FECE00]" />
                </span>
                <h3 className="font-display text-[0.92rem] font-black leading-snug tracking-tight text-white">
                  {point.title}
                </h3>
                <p className="text-[0.75rem] leading-relaxed text-white/40">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S6 — Related Services (light)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <LightGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Also Available
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Other services
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((svc) => (
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
          S7 — CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HomeCTA />
    </>
  );
}
