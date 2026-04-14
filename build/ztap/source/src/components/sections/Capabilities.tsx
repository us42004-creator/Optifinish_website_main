'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';
import MobileCarousel from '@/components/ui/MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: 'Recognise and recall',
    body: 'The vision layer identifies the part and recalls the matched coating path automatically.',
  },
  {
    title: 'Mimic to program',
    body: 'Capture a skilled pass once, then build a production routine without raw robot coding.',
  },
  {
    title: 'Operator-native workflow',
    body: 'The experience is framed like line equipment, not a robotics IDE, so adoption is faster.',
  },
];

const SPECS = [
  ['Capture Source', 'IMU / LightRoom'],
  ['Vision Layer', 'Component identification + path recall'],
  ['Robot Base', 'Fairino'],
  ['The Method', 'Mimic / store / build / recognise / coat'],
  ['Deployment Goal', 'Short changeover, low training load'],
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const leftCardRef = useRef<HTMLElement>(null);
  const rightCardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const featureRows = leftCardRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-capability-item]', leftCardRef.current)
        : [];
      const specRows = rightCardRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-spec-item]', rightCardRef.current)
        : [];

      gsap.set(pillRef.current, { x: '-120%', opacity: 0 });
      gsap.set(line1Ref.current, { x: '-110%', opacity: 0 });
      gsap.set(line2Ref.current, { x: '90%', opacity: 0 });
      gsap.set(bodyRef.current, { y: 20, opacity: 0 });
      gsap.set(ctaRef.current, { y: 18, opacity: 0 });
      gsap.set(leftCardRef.current, { y: 34, opacity: 0 });
      gsap.set(rightCardRef.current, { y: 34, opacity: 0 });
      gsap.set(featureRows, { y: 18, opacity: 0 });
      gsap.set(specRows, { y: 16, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          end: 'top 24%',
          scrub: 0.5,
        },
      });

      tl.to(pillRef.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.35 }, 0)
        .to(line1Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.08)
        .to(line2Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.16)
        .to(bodyRef.current, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.35 }, 0.14)
        .to(ctaRef.current, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.35 }, 0.18)
        .to(leftCardRef.current, { y: 0, opacity: 1, ease: 'power3.out', duration: 0.42 }, 0.22)
        .to(rightCardRef.current, { y: 0, opacity: 1, ease: 'power3.out', duration: 0.42 }, 0.28)
        .to(featureRows, { y: 0, opacity: 1, stagger: 0.08, ease: 'power3.out', duration: 0.32 }, 0.34)
        .to(specRows, { y: 0, opacity: 1, stagger: 0.06, ease: 'power3.out', duration: 0.28 }, 0.38);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden border-b border-black/10 bg-[#f1efea] py-16 text-ink sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
        }}
      />

      <div className="relative z-10 px-6 md:px-10 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div ref={pillRef} className="mb-6 w-fit">
              <Pill variant="dark">Capabilities</Pill>
            </div>
            <h2 className="mobile-hero-ratio-title desktop-section-heading font-display font-black uppercase">
              <div className="overflow-hidden">
                <span ref={line1Ref} className="block">
                  <span className="text-yellow">Built for operators,</span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={line2Ref} className="block">
                  not robot specialists.
                </span>
              </div>
            </h2>
          </div>
          <div className="flex max-w-md flex-col items-start gap-4 lg:items-end">
            <p ref={bodyRef} className="mobile-hero-ratio-copy mt-5 text-ink/62 lg:mt-0 lg:text-sm lg:leading-relaxed lg:text-right">
              Core capabilities and technical fit, reduced to what matters on a real line.
            </p>
            <div className="hidden lg:block">
              <a
                ref={ctaRef}
                href="/optifinish-spec-sheet.pdf"
                className="panel-button inline-flex w-full bg-yellow px-5 text-ink hover:bg-yellow/90 sm:w-auto"
              >
                <span>Download Spec Sheet</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-4">
          <article ref={leftCardRef} data-magnetic className="overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.4)] sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-yellow/80">Core Capabilities</span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">3 Key Functions</span>
            </div>
            <div className="mt-5 space-y-3">
              {FEATURES.map((feature) => (
                <div key={feature.title} data-capability-item className="rounded-[1.15rem] border border-white/[0.06] bg-white/[0.03] px-5 py-4">
                  <h3 className="font-display text-[1rem] font-black uppercase leading-tight tracking-[-0.02em] text-white">{feature.title}</h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-white/52">{feature.body}</p>
                </div>
              ))}
            </div>
          </article>
          <article ref={rightCardRef} data-magnetic className="hero-card-surface rounded-[1.6rem] border border-black/10 p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="card-accent-label">Technical Summary</p>
              <span className="rounded-full border border-black/8 bg-white/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/42">Deployment Fit</span>
            </div>
            <div className="mt-5 rounded-[1rem] border border-yellow/30 bg-black/[0.03] p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">System Specs</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/34">5 Points</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SPECS.map(([label, value]) => (
                  <div key={label} data-spec-item data-magnetic className="rounded-[1rem] border border-black/8 bg-white/58 px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/38">{label}</p>
                    <p className="mt-3 text-[0.82rem] font-semibold leading-snug text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Mobile carousel */}
        <div className="-mx-6 lg:hidden">
          <MobileCarousel cardWidthVw={0.86} gap={14} indicatorTheme="dark" dotColor="#FECE00" inactiveDotColor="rgba(254,206,0,0.42)" className="pl-5 sm:pl-6">
            <article className="overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] p-6 text-white">
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-yellow/80">Core Capabilities</span>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">3 Key Functions</span>
              </div>
              <div className="mt-5 space-y-3">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="rounded-[1.15rem] border border-white/[0.06] bg-white/[0.03] px-5 py-4">
                    <h3 className="font-display text-[1rem] font-black uppercase leading-tight tracking-[-0.02em] text-white">{feature.title}</h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-white/52">{feature.body}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="hero-card-surface rounded-[1.6rem] border border-black/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="card-accent-label">Technical Summary</p>
                <span className="rounded-full border border-black/8 bg-white/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/42">Deployment Fit</span>
              </div>
              <div className="mt-5 rounded-[1rem] border border-yellow/30 bg-black/[0.03] p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">System Specs</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/34">5 Points</p>
                </div>
                <div className="grid gap-3">
                  {SPECS.map(([label, value]) => (
                    <div key={label} className="rounded-[1rem] border border-black/8 bg-white/58 px-4 py-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/38">{label}</p>
                      <p className="mt-3 text-[0.82rem] font-semibold leading-snug text-ink">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </MobileCarousel>
        </div>

        {/* Mobile-only CTA below carousel */}
        <div className="mt-5 lg:hidden">
          <a
            href="/optifinish-spec-sheet.pdf"
            className="panel-button inline-flex w-full bg-yellow px-5 text-ink hover:bg-yellow/90"
          >
            <span>Download Spec Sheet</span>
          </a>
        </div>
      </div>
    </section>
  );
}
