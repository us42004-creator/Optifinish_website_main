'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';
import MobileCarousel from '@/components/ui/MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
  {
    id: '01',
    title: '2-Axis Covers The Line. Z-TAP Covers The Rest.',
    copy: "Complex geometry, edges, recesses, compound curves — fixed paths can't follow. The job falls back to manual.",
    image: '/gema-reciprocators-axis-and-automations.jpg',
    imageAlt: 'Reciprocator spray guns coating a part',
  },
  {
    id: '02',
    title: 'Manual Coating Carries The Hardest Parts',
    copy: "Touchup on live lines, complex stations — finish quality still rides on the operator's hand.",
    image: '/powder-coating-technology.jpg.webp',
    imageAlt: 'Manual coating operator in spray booth',
  },
  {
    id: '03',
    title: 'Coat Quality Depends On The Operator',
    copy: 'Speed, angle, pressure varies shift to shift. When your best painter leaves, that quality goes with them.',
    image: '/coat_thickness.jpg',
    imageAlt: 'Coat thickness variation by operator',
  },
];

const FLOW = [
  {
    id: '01',
    title: 'Mimic',
    copy: 'Operator coats naturally with the teach gun. No pendants. No code.',
    mediaLabel: 'Live Demo Recording',
  },
  {
    id: '02',
    title: 'Build Program',
    copy: 'Drag captured passes onto a timeline. Set motions, dwell points, and publish a coating program in under a minute.',
    mediaLabel: 'Program Builder UI',
  },
  {
    id: '03',
    title: 'Deploy',
    copy: 'Robot runs the saved routine. Stable, repeatable, shift after shift.',
    mediaLabel: 'Arm in Action',
  },
];

export default function ZeroTouch() {
  const sectionRef            = useRef<HTMLElement>(null);
  const line1Ref              = useRef<HTMLSpanElement>(null);
  const line2Ref              = useRef<HTMLSpanElement>(null);
  const line3Ref              = useRef<HTMLSpanElement>(null);
  const pillRef               = useRef<HTMLDivElement>(null);
  const bodyRef               = useRef<HTMLParagraphElement>(null);
  const cardsRef              = useRef<HTMLDivElement>(null);
  const dividerRef            = useRef<HTMLDivElement>(null);
  const corePillRef           = useRef<HTMLDivElement>(null);
  const coreLine1Ref          = useRef<HTMLSpanElement>(null);
  const coreLine2Ref          = useRef<HTMLSpanElement>(null);
  const coreBodyRef           = useRef<HTMLParagraphElement>(null);
  const sliderTrackRef        = useRef<HTMLDivElement>(null);
  const sliderViewportRef     = useRef<HTMLDivElement>(null);
  const stepDotsRef           = useRef<HTMLDivElement>(null);
  // Mobile-only refs
  const mobileCoreSectionRef    = useRef<HTMLDivElement>(null);
  const mobileCoreHeadingRef    = useRef<HTMLDivElement>(null);
  const mobileSliderViewportRef = useRef<HTMLDivElement>(null);
  const mobileStepDotsRef       = useRef<HTMLDivElement>(null);
  const mobileCorePillRef       = useRef<HTMLDivElement>(null);
  const mobileCoreLine1MobileRef = useRef<HTMLSpanElement>(null);
  const mobileCoreLine2MobileRef = useRef<HTMLSpanElement>(null);
  const mobileCoreBodyMobileRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const updateDots = (activeIndex: number) => {
      const dots = stepDotsRef.current?.querySelectorAll<HTMLElement>('[data-dot]');
      dots?.forEach((dot, i) => {
        dot.style.background = i === activeIndex ? '#FECE00' : 'rgba(0,0,0,0.18)';
        dot.style.width = i === activeIndex ? '2rem' : '0.5rem';
      });
    };

    const updateMobileDots = (activeIndex: number) => {
      const dots = mobileStepDotsRef.current?.querySelectorAll<HTMLElement>('[data-dot]');
      dots?.forEach((dot, i) => {
        dot.style.background = i === activeIndex ? '#FECE00' : 'rgba(0,0,0,0.18)';
        dot.style.width = i === activeIndex ? '2rem' : '0.5rem';
      });
    };

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // ── Problem section heading — ALL breakpoints ──────────────────
      gsap.set(pillRef.current,  { x: '-120%', opacity: 0 });
      gsap.set(line1Ref.current, { x: '-110%', opacity: 0 });
      gsap.set(line2Ref.current, { x: '90%',   opacity: 0 });
      gsap.set(line3Ref.current, { x: '-90%',  opacity: 0 });
      gsap.set(bodyRef.current,  { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 0.5,
        },
      });
      tl.to(pillRef.current,  { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.4 }, 0)
        .to(line1Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.6 }, 0.05)
        .to(line2Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.6 }, 0.15)
        .to(line3Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.6 }, 0.25)
        .to(bodyRef.current,  { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 0.3);

      // ── DESKTOP only ───────────────────────────────────────────────
      mm.add('(min-width: 1024px)', () => {
        // Desktop card entrance
        const cards = cardsRef.current
          ? gsap.utils.toArray<HTMLElement>('article', cardsRef.current)
          : [];
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 48, scale: 0.97 });
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 0.5,
            },
          }).to(cards, { opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: 'power3.out', duration: 0.4 }, 0.35);
        }

        // How It Works desktop entrance
        gsap.set(corePillRef.current,       { x: '-120%', opacity: 0 });
        gsap.set(coreLine1Ref.current,      { x: '-110%', opacity: 0 });
        gsap.set(coreLine2Ref.current,      { x: '90%',   opacity: 0 });
        gsap.set(coreBodyRef.current,       { opacity: 0, y: 16 });
        gsap.set(stepDotsRef.current,       { opacity: 0 });
        gsap.set(sliderViewportRef.current, { opacity: 0, y: 56 });
        gsap.set(sliderTrackRef.current,    { xPercent: 0 });
        updateDots(0);

        const tlCore = gsap.timeline({
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
            end: 'top top',
            scrub: 0.5,
          },
        });
        tlCore
          .to(corePillRef.current,        { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.3 }, 0)
          .to(coreLine1Ref.current,       { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.08)
          .to(coreLine2Ref.current,       { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.18)
          .to(coreBodyRef.current,        { opacity: 1, y: 0,   ease: 'power2.out', duration: 0.3 }, 0.26)
          .to(stepDotsRef.current,        { opacity: 1,          ease: 'power2.out', duration: 0.25 }, 0.3)
          .to(sliderViewportRef.current,  { opacity: 1, y: 0,   ease: 'power3.out', duration: 0.55 }, 0.38);

        const T = { hold1: 1.5, slide: 1, hold2: 1.5, hold3: 1.35 };
        const total = T.hold1 + T.slide + T.hold2 + T.slide + T.hold3;
        const snap2 = (T.hold1 + T.slide) / total;
        const snap3 = (T.hold1 + T.slide + T.hold2 + T.slide) / total;

        const sliderTimeline = gsap.timeline({
          defaults: { ease: 'power2.inOut', duration: T.slide },
        });
        sliderTimeline
          .to({}, { duration: T.hold1 })
          .to(sliderTrackRef.current, { xPercent: -(100 / FLOW.length) })
          .to({}, { duration: T.hold2 })
          .to(sliderTrackRef.current, { xPercent: -(200 / FLOW.length) })
          .to({}, { duration: T.hold3 });

        ScrollTrigger.create({
          trigger: dividerRef.current,
          start: 'top top',
          end: '+=340%',
          pin: true,
          scrub: 0.22,
          animation: sliderTimeline,
          anticipatePin: 1,
          fastScrollEnd: true,
          snap: {
            snapTo: [0, snap2, snap3, 1],
            duration: { min: 0.18, max: 0.32 },
            delay: 0.05,
            inertia: false,
            ease: 'power2.inOut',
          },
          onUpdate(self) {
            const stepIndex = self.progress < snap2 ? 0 : self.progress < snap3 ? 1 : 2;
            updateDots(stepIndex);
          },
        });
      });

      // ── MOBILE only — How It Works pinned slider ────────────────
      mm.add('(max-width: 1023px)', () => {
        if (!mobileCoreSectionRef.current) return;

        gsap.set(mobileCorePillRef.current,       { opacity: 0, x: -48 });
        gsap.set(mobileCoreLine1MobileRef.current,{ opacity: 0, x: -54 });
        gsap.set(mobileCoreLine2MobileRef.current,{ opacity: 0, x: 40 });
        gsap.set(mobileCoreBodyMobileRef.current, { opacity: 0, x: -24 });
        gsap.set(mobileSliderViewportRef.current, { opacity: 0, x: 34, y: 18 });

        // Phase 1: entrance (scrubbed as section approaches)
        const tlEntrance = gsap.timeline({
          scrollTrigger: {
            trigger: mobileCoreSectionRef.current,
            start: 'top 85%',
            end: 'top top',
            scrub: 0.5,
          },
        });
        tlEntrance
          .to(mobileCorePillRef.current,       { opacity: 1, x: 0, ease: 'power2.out', duration: 0.38 }, 0.02)
          .to(mobileCoreLine1MobileRef.current,{ opacity: 1, x: 0, ease: 'power2.out', duration: 0.44 }, 0.08)
          .to(mobileCoreLine2MobileRef.current,{ opacity: 1, x: 0, ease: 'power2.out', duration: 0.44 }, 0.16)
          .to(mobileCoreBodyMobileRef.current, { opacity: 1, x: 0, ease: 'power2.out', duration: 0.3 }, 0.24)
          .to(mobileSliderViewportRef.current, { opacity: 1, x: 0, y: 0, ease: 'power3.out', duration: 0.55 }, 0.2);
      });

    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="zero-touch" className="border-b border-black/10 overflow-hidden">

      {/* ── Problem section (dark) ── */}
      <div className="relative bg-[#0a0a0a] px-6 py-16 text-white sm:py-20 md:px-10 lg:px-12 lg:py-24">
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,206,0,0.07)_0%,rgba(254,206,0,0.02)_18%,rgba(254,206,0,0)_42%),radial-gradient(circle_at_bottom_right,rgba(254,206,0,0.05)_0%,rgba(254,206,0,0.015)_16%,rgba(254,206,0,0)_38%)]" />
        <div className="relative z-10">
          <div className="grid w-full gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            {/* Heading column */}
            <div className="justify-self-start">
              <div className="overflow-hidden">
                <div ref={pillRef} className="mb-6">
                  <Pill variant="yellow">How It Works</Pill>
                </div>
              </div>
              <h2 className="desktop-section-heading font-display font-black uppercase">
                <div className="overflow-hidden">
                  <span ref={line1Ref} className="block text-yellow">Conventional coating breaks,</span>
                </div>
                <div className="overflow-hidden">
                  <span ref={line2Ref} className="block">the moment</span>
                </div>
                <div className="overflow-hidden">
                  <span ref={line3Ref} className="block">complexity shows up.</span>
                </div>
              </h2>
              <p ref={bodyRef} className="mt-5 hidden max-w-xl text-sm leading-relaxed text-white/62 sm:text-base lg:block">
                Reciprocators handle standard runs. Z-TAP takes over where complexity shows up.
              </p>
            </div>

            {/* Desktop cards grid — hidden on mobile */}
            <div ref={cardsRef} className="hidden lg:grid lg:grid-cols-3 gap-4">
              {PAIN_POINTS.map((item) => (
                <article key={item.id} className="flex flex-col overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-0.5">
                  {/* Text */}
                  <div className="flex flex-col p-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-yellow/80">{item.id}</span>
                    <h3 className="mt-3 font-display text-[1.45rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-[1.55rem]">{item.title}</h3>
                    <p className="mt-3 text-[0.82rem] leading-relaxed text-white/52">{item.copy}</p>
                  </div>
                  {/* Image bleeding to edges */}
                  <div className="relative mt-auto overflow-hidden">
                    {item.image ? (
                      <div className="relative aspect-[4/3] w-full">
                        <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="28vw" />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.03]">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/20">Image Placeholder</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile carousel — full-bleed, breaks out of px-6 */}
          <div className="-mx-6 mt-10 lg:hidden">
            <MobileCarousel cardWidthVw={0.86} gap={14} indicatorTheme="light" className="pl-5 sm:pl-6">
              {PAIN_POINTS.map((item) => (
                <article
                  key={item.id}
                  className="group relative flex min-h-[33rem] flex-col overflow-hidden rounded-[1.7rem] border border-black/[0.07] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.07)]"
                >
                  {/* Text */}
                  <div className="flex flex-col p-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-yellow">
                      {item.id}
                    </span>
                    <h3 className="mt-3 font-display text-[1.45rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.82rem] leading-relaxed text-ink/52">{item.copy}</p>
                  </div>
                  {/* Media bleeding to edges */}
                  <div className="relative flex-1 overflow-hidden">
                    {item.image ? (
                      <div className="relative h-full min-h-[16rem] w-full">
                        <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="86vw" />
                      </div>
                    ) : (
                      <div className="flex h-full min-h-[16rem] w-full items-center justify-center bg-ink/[0.03]">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/20">Coming Soon</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </MobileCarousel>
          </div>
        </div>
      </div>

      {/* ── How It Works — DESKTOP (light section, dark pinned slider) ── */}
      <div
        ref={dividerRef}
        className="relative hidden flex-col overflow-hidden bg-[#f1efea] px-6 pt-12 pb-16 lg:flex lg:px-12"
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
        {/* Heading + dots row */}
        <div className="relative z-10 flex shrink-0 items-end justify-between gap-8">
          <div ref={stepDotsRef} className="flex shrink-0 items-center gap-2 pb-1">
            {FLOW.map((_, i) => (
              <div
                key={i}
                data-dot={i}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === 0 ? '2rem' : '0.5rem', background: i === 0 ? '#FECE00' : 'rgba(0,0,0,0.18)' }}
              />
            ))}
            <span className="ml-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/30">
              Scroll to explore
            </span>
          </div>

          <div className="flex flex-col items-end text-right">
            <div className="overflow-hidden mb-6">
              <div ref={corePillRef} style={{ willChange: 'transform, opacity' }}>
                <Pill variant="dark">How It Works</Pill>
              </div>
            </div>
            <h2 className="desktop-section-heading font-display font-black uppercase text-[#0a0a0a]">
              <div className="overflow-hidden">
                <span ref={coreLine1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  The <span className="text-yellow">robot learns</span> from <span className="text-yellow">skilled labor,</span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={coreLine2Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  <span className="text-yellow">not</span> from <span className="text-yellow">code.</span>
                </span>
              </div>
            </h2>
            <p ref={coreBodyRef} className="mt-5 max-w-sm line-clamp-2 text-sm leading-relaxed text-black/52" style={{ willChange: 'opacity' }}>
              Z-TAP captures what skilled finishers already know and turns it into repeatable robotic execution.
            </p>
          </div>
        </div>

        {/* Slider viewport */}
        <div ref={sliderViewportRef} className="relative z-10 mt-10 mb-2 overflow-hidden rounded-[2rem]" style={{ height: '60vh' }}>
          <div
            ref={sliderTrackRef}
            className="flex h-full"
            style={{ width: `${FLOW.length * 100}%` }}
          >
            {FLOW.map((item) => (
              <div
                key={item.id}
                className="flex h-full"
                style={{ width: `${100 / FLOW.length}%` }}
              >
                <div className="relative flex h-full w-full bg-[#141414]" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="relative flex h-full w-full flex-col lg:flex-row">
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-8 lg:p-12 pr-6 lg:pr-8">
                      <p className="font-display text-[clamp(5rem,12vw,10rem)] font-black leading-none tracking-[-0.05em] text-yellow select-none">
                        {item.id}
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,3.1rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
                        {item.copy}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1 p-6 pl-0 lg:p-10 lg:pl-0">
                      <div className="flex h-full min-h-[180px] items-center justify-center rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] px-6 py-6">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/22">
                          {item.mediaLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How It Works — MOBILE (full-screen pinned slider) ── */}
      <div
        ref={mobileCoreSectionRef}
        className="relative flex flex-col overflow-hidden bg-[#f1efea] lg:hidden"
        style={{ minHeight: '100dvh' }}
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

        {/* Heading block */}
        <div ref={mobileCoreHeadingRef} className="relative z-10 shrink-0 px-5 pb-4 pt-10 sm:px-6 md:px-10">
          <div ref={mobileCorePillRef} className="mb-4 w-fit">
            <Pill variant="dark">How It Works</Pill>
          </div>
          <h2 className="mobile-hero-ratio-title font-display font-black uppercase text-[#0a0a0a] sm:text-[1.85rem] sm:leading-[0.92] sm:tracking-[-0.04em]">
            <span ref={mobileCoreLine1MobileRef} className="block">The <span className="text-yellow">robot learns</span> from</span>
            <span ref={mobileCoreLine2MobileRef} className="block"><span className="text-yellow">skilled labor,</span> not from <span className="text-yellow">code.</span></span>
          </h2>
          <p ref={mobileCoreBodyMobileRef} className="mobile-hero-ratio-copy mt-3 max-w-sm text-black/52 sm:text-sm">
            Z-TAP captures what skilled finishers already know and turns it into repeatable robotic execution.
          </p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/30">
            Swipe to explore
          </p>
        </div>

        {/* Slider viewport */}
        <div
          ref={mobileSliderViewportRef}
          className="relative z-10 -mx-5 mb-5 flex-1 sm:-mx-6"
        >
          <MobileCarousel cardWidthVw={0.84} gap={14} dotColor="#FECE00" inactiveDotColor="rgba(254,206,0,0.42)" indicatorTheme="dark" className="pl-6 pr-5 sm:pl-6 sm:pr-6">
            {FLOW.map((item) => (
              <article
                key={item.id}
                className="flex min-h-[74dvh] flex-col rounded-[1.6rem] border border-white/10 bg-[#141414] p-5 pb-12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <p className="card-accent-label card-accent-label-light">{item.id}</p>
                <p className="card-title-supporting mt-4 font-display font-black uppercase text-white">
                  {item.title}
                </p>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-white/56">
                  {item.copy}
                </p>
                {/* Media — bleeds to card bottom edges */}
                <div className="relative -mx-5 -mb-12 mt-5 flex-1 overflow-hidden">
                  <div className="flex min-h-[16rem] h-full items-center justify-center bg-white/[0.03]">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/20">
                      {item.mediaLabel}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </MobileCarousel>
        </div>
      </div>

    </section>
  );
}
