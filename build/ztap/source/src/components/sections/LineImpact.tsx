'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';
import MobileCarousel from '@/components/ui/MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '<2%', label: 'Defect rate after deployment', sub: 'vs. industry avg 15–20%', kind: 'defect' },
  { value: '3×', label: 'Throughput over manual finishing', sub: 'same booth footprint', kind: 'throughput' },
  { value: '±0.5mm', label: 'Path repeatability across shifts', sub: 'operator-independent', kind: 'precision' },
  { value: '2 min', label: 'To publish a new coating program', sub: 'no robot code written', kind: 'speed' },
];

function StatVisual({ kind }: { kind: string }) {
  if (kind === 'defect') {
    return (
      <div className="mt-5 rounded-[1.15rem] border border-white/[0.06] bg-white/[0.04] px-4 py-4">
        <div className="mb-3 flex items-center justify-between text-[7px] font-semibold uppercase tracking-[0.16em] text-white/38">
          <span>Quality drift</span>
          <span className="rounded-full bg-[#FF3B30]/[0.15] px-2 py-0.5 text-[#ff6b6b]">Reduced</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[88, 66, 48, 32, 20].map((h, index) => (
            <div key={index} className="flex h-20 items-end rounded-[0.8rem] bg-white/[0.05] px-2 pb-2">
              <div
                className={`w-full rounded-full ${index >= 3 ? 'bg-[#FF3B30]/70' : 'bg-yellow'}`}
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'throughput') {
    return (
      <div className="mt-5 rounded-[1.15rem] border border-white/[0.06] bg-white/[0.04] px-4 py-4">
        <div className="mb-3 flex items-center justify-between text-[7px] font-semibold uppercase tracking-[0.16em] text-white/38">
          <span>Line output</span>
          <span className="rounded-full bg-yellow/[0.12] px-2 py-0.5 text-yellow/80">Scaled</span>
        </div>
        <div className="flex items-end gap-2">
          {[36, 58, 84].map((height, index) => (
            <div key={index} className="flex-1 rounded-[0.8rem] bg-white/[0.05] p-1.5">
              <div
                className="rounded-[0.45rem] bg-yellow"
                style={{ height: `${height}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'precision') {
    return (
      <div className="mt-5 rounded-[1.15rem] border border-white/[0.06] bg-white/[0.04] px-4 py-4">
        <div className="mb-3 flex items-center justify-between text-[7px] font-semibold uppercase tracking-[0.16em] text-white/38">
          <span>Path stability</span>
          <span className="rounded-full bg-yellow/[0.12] px-2 py-0.5 text-yellow/80">Locked</span>
        </div>
        <svg viewBox="0 0 240 72" className="h-[4rem] w-full" aria-hidden="true">
          {/* Ghost path */}
          <path
            d="M14 44 C38 16, 62 16, 88 38 S138 60, 164 28 S206 10, 226 20"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Yellow path */}
          <path
            d="M14 44 C38 16, 62 16, 88 38 S138 60, 164 28 S206 10, 226 20"
            fill="none"
            stroke="#fece00"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="14" cy="44" r="4.5" fill="rgba(255,255,255,0.15)" />
          <circle cx="226" cy="20" r="5" fill="#fece00" />
        </svg>
      </div>
    );
  }

  // speed — program launch steps
  return (
    <div className="mt-5 rounded-[1.15rem] border border-white/[0.06] bg-white/[0.04] px-4 py-4">
      <div className="mb-3 flex items-center justify-between text-[7px] font-semibold uppercase tracking-[0.16em] text-white/38">
        <span>Program launch</span>
        <span className="rounded-full bg-yellow/[0.12] px-2 py-0.5 text-yellow/80">Fast</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['Teach', 'Store', 'Build', 'Run'].map((step, index) => (
          <div key={step} className={`rounded-[0.8rem] border px-2 py-3 text-center ${index === 3 ? 'border-yellow/30 bg-yellow/[0.08]' : 'border-white/[0.06] bg-white/[0.04]'}`}>
            <div className={`mx-auto mb-2 h-2 w-2 rounded-full ${index === 3 ? 'bg-yellow' : 'bg-white/20'}`} />
            <p className={`text-[7px] font-bold uppercase tracking-[0.12em] ${index === 3 ? 'text-yellow/80' : 'text-white/35'}`}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const MANUAL_ROWS = [
  { metric: 'Transfer efficiency', value: '~30%', bar: 30 },
  { metric: 'Operator dependence', value: 'High', bar: 36 },
  { metric: 'Basics training course', value: '2 days', bar: 58 },
  { metric: 'Production mode', value: 'Small batch', bar: 24 },
];

const AUTO_ROWS = [
  { metric: 'Transfer efficiency', value: 'TBD', sub: 'Coming soon', bar: 0 },
  { metric: 'Operator dependence', value: 'TBD', sub: 'Coming soon', bar: 0 },
  { metric: 'Basics training course', value: 'TBD', sub: 'Coming soon', bar: 0 },
  { metric: 'Production mode', value: 'TBD', sub: 'Coming soon', bar: 0 },
];

const MANUAL_NOTES = [
  'Spray results depend heavily on operator technique',
  'Manual booths are commonly positioned for batch and small-batch work',
];

const AUTO_NOTES = [
  'Repeatable every shift',
  'New parts in under a minute',
];

const COMPARISON_SLIDES = MANUAL_ROWS.map((manualRow, index) => {
  const autoRow = AUTO_ROWS[index];

  return {
    metric: manualRow.metric,
    manualValue: manualRow.value,
    manualBar: manualRow.bar,
    autoValue: autoRow.value,
    autoSub: autoRow.sub,
    autoBar: autoRow.bar,
    takeaway:
      index === 0
        ? 'Manual transfer efficiency stays inconsistent. Mimic-driven output will be published once measured.'
        : index === 1
          ? 'Operator dependence stays high in traditional cells. Mimic-driven execution is built to be repeatable.'
          : index === 2
            ? 'Traditional training still takes days. Mimic-driven onboarding data will be published soon.'
            : 'Traditional cells are optimized for small batches. Mimic-driven production-mode data is coming soon.',
  };
});

function MiniBar({ pct, yellow }: { pct: number; yellow?: boolean }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full transition-all duration-700 ${yellow ? 'bg-yellow' : 'bg-white/40'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ComparisonVisual({
  manualBar,
  autoBar,
}: {
  manualBar: number;
  autoBar: number;
}) {
  return (
    <div className="mt-4 rounded-[1.15rem] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(243,238,229,0.92)_100%)] p-3.5 shadow-[0_10px_22px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.82)]">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[0.95rem] border border-black/[0.06] bg-white/76 px-3 py-3">
          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-ink/42">Traditional Cell</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/8">
            <div className="h-full rounded-full bg-black/55" style={{ width: `${manualBar}%` }} />
          </div>
        </div>
        <div className="rounded-[0.95rem] border border-[#e3bf3f] bg-[linear-gradient(180deg,rgba(254,206,0,0.2)_0%,rgba(254,206,0,0.1)_100%)] px-3 py-3">
          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-ink/48">Mimic-Driven</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/8">
            <div className="h-full rounded-full bg-yellow" style={{ width: `${Math.max(autoBar, 14)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LineImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const comparisonPanels = comparisonRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-impact-reveal]', comparisonRef.current)
        : [];

      // Heading — all breakpoints
      gsap.set(pillRef.current,  { x: '-120%', opacity: 0 });
      gsap.set(line1Ref.current, { x: '-110%', opacity: 0 });
      gsap.set(line2Ref.current, { x: '90%', opacity: 0 });
      gsap.set(bodyRef.current,  { y: 22, opacity: 0 });
      gsap.set(comparisonPanels, { y: 34, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          end: 'top 24%',
          scrub: 0.5,
        },
      });

      tl.to(pillRef.current,  { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.35 }, 0)
        .to(line1Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.08)
        .to(line2Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.16)
        .to(bodyRef.current,  { y: 0, opacity: 1, ease: 'power2.out', duration: 0.35 }, 0.14)
        .to(comparisonPanels, { y: 0, opacity: 1, stagger: 0.08, ease: 'power3.out', duration: 0.42 }, 0.3);

      // Desktop: stat card entrance
      mm.add('(min-width: 1024px)', () => {
        const statCards = statsRef.current
          ? gsap.utils.toArray<HTMLElement>('article', statsRef.current)
          : [];
        if (statCards.length) {
          gsap.set(statCards, { y: 36, opacity: 0, scale: 0.98 });
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 76%',
              end: 'top 24%',
              scrub: 0.5,
            },
          }).to(statCards, { y: 0, opacity: 1, scale: 1, stagger: 0.08, ease: 'power3.out', duration: 0.38 }, 0.2);
        }
      });

    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="line-impact" className="relative border-b border-white/10 bg-[#070707] py-16 text-white sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254,206,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254,206,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,243,163,0.28) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,243,163,0.28) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,206,0,0.07)_0%,rgba(254,206,0,0.02)_18%,rgba(254,206,0,0)_40%),radial-gradient(circle_at_bottom_right,rgba(254,206,0,0.05)_0%,rgba(254,206,0,0.015)_16%,rgba(254,206,0,0)_38%)]" />
      <div className="relative z-10 px-6 md:px-10 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-12 flex flex-col gap-3 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-3xl">
            <div ref={pillRef} className="mb-6 w-fit">
              <Pill variant="yellow">Results</Pill>
            </div>
            <h2 className="mobile-hero-ratio-title desktop-section-heading font-display font-black uppercase">
              <div className="overflow-hidden">
                <span ref={line1Ref} className="block">
                  Measured <span className="text-yellow">impact.</span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={line2Ref} className="block">
                  <span className="text-yellow">Zero</span> guesswork.
                </span>
              </div>
            </h2>
          </div>
          <p ref={bodyRef} className="mobile-hero-ratio-copy mt-5 max-w-sm text-white/50 lg:mt-0 lg:text-sm lg:leading-relaxed lg:text-right">
            Deployment data from real finishing lines. No projections.
          </p>
        </div>

        {/* ── Stat tiles — Desktop grid ── */}
        <div ref={statsRef} className="hidden w-full gap-4 lg:grid xl:grid-cols-4 lg:grid-cols-2">
          {STATS.map((stat) => (
            <article key={stat.label} data-magnetic className="relative flex flex-col overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_28px_64px_rgba(0,0,0,0.5)] transition-all duration-500">
              <div className="relative z-10 flex flex-1 flex-col">
                <p className="font-display text-[clamp(2.6rem,3.5vw,3.6rem)] font-black tracking-[-0.055em] text-yellow">{stat.value}</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/45">{stat.sub}</p>
                <StatVisual kind={stat.kind} />
              </div>
            </article>
          ))}
        </div>

        {/* ── Stat tiles — Mobile carousel ── */}
        <div className="-mx-6 lg:hidden">
          <MobileCarousel cardWidthVw={0.76} gap={14} dotColor="#FECE00" inactiveDotColor="rgba(254,206,0,0.42)" indicatorTheme="dark" className="pl-5 sm:pl-6">
            {STATS.map((stat) => (
              <article key={stat.label} className="relative flex min-h-[224px] flex-col justify-between overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] p-6 pb-11 text-white shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[rgba(254,206,0,0.08)] blur-3xl" />
                <div className="relative z-10">
                  <p className="font-display text-[3.2rem] font-black tracking-[-0.055em] text-yellow">{stat.value}</p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/45">{stat.sub}</p>
                  <StatVisual kind={stat.kind} />
                </div>
              </article>
            ))}
          </MobileCarousel>
        </div>

        {/* ── Comparison cards — Desktop ── */}
        <div ref={comparisonRef} className="mt-5 hidden lg:grid lg:grid-cols-2 gap-5">
          {/* Traditional Cell */}
          <div data-impact-reveal data-magnetic className="flex flex-col overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-0.5 xl:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/40">Manual Baseline</span>
                <h3 className="mt-2 font-display text-[1.45rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-[1.6rem]">Traditional Cell</h3>
              </div>
              <span className="mt-1 shrink-0 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">Variable</span>
            </div>
            <div className="mt-6 grid gap-3">
              {MANUAL_ROWS.map((row) => (
                <div key={row.metric} className="rounded-[1rem] border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                  <div className="mb-2.5 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">{row.metric}</span>
                    <span className="shrink-0 text-[12px] font-bold text-yellow">{row.value}</span>
                  </div>
                  <MiniBar pct={row.bar} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/28">Source</span>
              <span className="text-[10px] text-white/36">EPA / PCI / Nordson</span>
            </div>
          </div>

          {/* Mimic-Driven */}
          <div data-impact-reveal data-magnetic className="flex flex-col overflow-hidden rounded-[1.7rem] border border-yellow/20 bg-[#111111] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-0.5 xl:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-yellow">With OptiFinish Z-TAP</span>
                <h3 className="mt-2 font-display text-[1.45rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-[1.6rem]">Mimic-Driven</h3>
              </div>
              <span className="mt-1 shrink-0 rounded-full border border-yellow/25 bg-yellow/[0.07] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-yellow/80">Repeatable</span>
            </div>
            <div className="mt-6 grid gap-3">
              {AUTO_ROWS.map((row) => (
                <div key={row.metric} className="rounded-[1rem] border border-yellow/[0.12] bg-yellow/[0.04] px-4 py-3">
                  <div className="mb-2.5 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">{row.metric}</span>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-[12px] font-bold text-yellow">{row.value}</span>
                      <span className="rounded-full border border-yellow/20 bg-yellow/[0.06] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">{row.sub}</span>
                    </div>
                  </div>
                  <MiniBar pct={row.bar} yellow />
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
              {AUTO_NOTES.map((note) => (
                <span key={note} className="flex items-center gap-1.5 text-[10px] font-medium text-white/50">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />{note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Comparison deck — Mobile ── */}
        <div className="-mx-6 mt-12 lg:hidden">
          <MobileCarousel cardWidthVw={0.86} gap={14} dotColor="#FECE00" inactiveDotColor="rgba(254,206,0,0.42)" indicatorTheme="light" className="pl-5 sm:pl-6">
            {COMPARISON_SLIDES.map((slide) => (
              <article
                key={slide.metric}
                className="flex min-h-[34rem] flex-col overflow-hidden rounded-[1.8rem] border border-black/[0.06] bg-white p-5 pb-12 text-ink shadow-[0_20px_48px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
              >
                <div>
                  <p className="card-accent-label">
                    Comparison
                  </p>
                  <h3 className="mt-4 font-display text-[1.9rem] font-black leading-[0.92] tracking-[-0.055em] text-ink">
                    {slide.metric}
                  </h3>
                  <p className="mt-3 max-w-[16rem] text-[0.82rem] leading-relaxed text-ink/52">
                    Traditional cell versus mimic-driven execution on the same metric.
                  </p>
                </div>

                <div className="mt-6 grid flex-1 grid-cols-2 gap-3">
                  {/* Traditional Cell sub-card */}
                  <div className="flex flex-col overflow-hidden rounded-[1.2rem] border border-black/[0.06] bg-white shadow-[0_12px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="flex flex-col p-3.5">
                      <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-ink/42">Traditional Cell</span>
                      <p className="mt-2 text-[1.6rem] font-black leading-none tracking-[-0.055em] text-ink">{slide.manualValue}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-center gap-1.5 rounded-[0.9rem] bg-black/[0.04] mx-2 mb-2 px-2.5 py-2.5 min-h-[5.5rem]">
                      {[82, 66, 52, 40].map((height, i) => (
                        <div key={i} className="flex h-full flex-1 items-end">
                          <div className="w-full rounded-full bg-black/50" style={{ height: `${height}%`, opacity: 1 - i * 0.1 }} />
                        </div>
                      ))}
                    </div>
                    <div className="px-3.5 pb-3.5 pt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/8">
                        <div className="h-full rounded-full bg-black/50" style={{ width: `${slide.manualBar}%` }} />
                      </div>
                      <p className="mt-2 text-[8px] uppercase tracking-[0.14em] text-ink/40">Variable</p>
                    </div>
                  </div>

                  {/* Mimic-Driven sub-card */}
                  <div className="flex flex-col overflow-hidden rounded-[1.2rem] border border-yellow/30 bg-white shadow-[0_12px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="flex flex-col p-3.5">
                      <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-yellow">Mimic-Driven</span>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <p className="text-[1.6rem] font-black leading-none tracking-[-0.055em] text-ink">{slide.autoValue}</p>
                        {slide.autoSub ? (
                          <span className="rounded-full border border-ink/10 bg-yellow/10 px-2 py-0.5 text-[6px] font-bold uppercase tracking-[0.14em] text-ink/56">
                            {slide.autoSub}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-center gap-1.5 rounded-[0.9rem] bg-yellow/[0.07] mx-2 mb-2 px-2.5 py-2.5 min-h-[5.5rem]">
                      {[30, 46, 64, 82].map((height, i) => (
                        <div key={i} className="flex h-full flex-1 items-end">
                          <div className="w-full rounded-full bg-yellow" style={{ height: `${height}%`, opacity: 0.9 - i * 0.06 }} />
                        </div>
                      ))}
                    </div>
                    <div className="px-3.5 pb-3.5 pt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/8">
                        <div className="h-full rounded-full bg-yellow" style={{ width: `${Math.max(slide.autoBar, 14)}%` }} />
                      </div>
                      <p className="mt-2 text-[8px] uppercase tracking-[0.14em] text-yellow/80">Repeatable</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[1rem] border border-black/[0.06] bg-black/[0.025] px-4 py-3.5 text-[0.8rem] leading-relaxed text-ink/58">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/36">Takeaway</span>
                  <p className="mt-2">{slide.takeaway}</p>
                </div>
              </article>
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
