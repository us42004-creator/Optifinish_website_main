'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';
import MobileCarousel from '@/components/ui/MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

const HMI_SCREENS = [
  {
    src: '/Mockup_01.png',
    alt: 'OptiFinish HMI interface',
    label: 'HMI',
  },
];

const GUNS = [
  {
    src: '/wagner_gun.png',
    alt: 'General spray gun',
    label: 'General Spray',
    note: 'Universal replay-ready',
  },
  {
    src: '/coating-gun-2.svg',
    alt: 'Liquid coating gun',
    label: 'Liquid Coating',
    note: 'Application-agnostic motion',
  },
  {
    src: '/coating-gun-3.svg',
    alt: 'Powder coating gun',
    label: 'Powder Coating',
    note: 'High-coverage finishing',
  },
];

export default function HmiTabletShowcase() {
  const sectionRef          = useRef<HTMLElement>(null);
  const pinRef              = useRef<HTMLDivElement>(null);
  const hPillRef            = useRef<HTMLDivElement>(null);
  const hLine1Ref           = useRef<HTMLSpanElement>(null);
  const hLine2Ref           = useRef<HTMLSpanElement>(null);
  const hLine3Ref           = useRef<HTMLSpanElement>(null);
  const bodyRef             = useRef<HTMLParagraphElement>(null);
  const cardsRef            = useRef<HTMLDivElement>(null);
  const hmiRef              = useRef<HTMLDivElement>(null);
  // Mobile refs
  const mobileSectionRef    = useRef<HTMLDivElement>(null);
  const mobileHeadingRef    = useRef<HTMLDivElement>(null);
  const mobileInfoCardsRef  = useRef<HTMLDivElement>(null);
  const mobileHmiRef        = useRef<HTMLDivElement>(null);
  const mobilePillRef       = useRef<HTMLDivElement>(null);
  const mobileLine1Ref      = useRef<HTMLSpanElement>(null);
  const mobileLine2Ref      = useRef<HTMLSpanElement>(null);
  const mobileLine3Ref      = useRef<HTMLSpanElement>(null);
  const mobileBodyRef       = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const infoCards = cardsRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-card]', cardsRef.current)
        : [];

      gsap.set(hPillRef.current,   { x: '-120%', opacity: 0 });
      gsap.set(hLine1Ref.current,  { x: '-110%', opacity: 0 });
      gsap.set(hLine2Ref.current,  { x: '90%',   opacity: 0 });
      gsap.set(hLine3Ref.current,  { x: '-90%',  opacity: 0 });
      gsap.set(bodyRef.current,    { opacity: 0, y: 20 });
      gsap.set(infoCards,          { opacity: 0, y: 24 });
      gsap.set(hmiRef.current,     {
        opacity: 0,
        y: 72,
        scale: 0.88,
        rotateX: -8,
        transformPerspective: 1400,
        transformOrigin: '50% 50%',
      });

      // Mobile entrance animations
      mm.add('(max-width: 1023px)', () => {
        if (!mobileSectionRef.current) return;

        gsap.set(mobilePillRef.current,      { opacity: 0, x: -48 });
        gsap.set(mobileLine1Ref.current,     { opacity: 0, x: -54 });
        gsap.set(mobileLine2Ref.current,     { opacity: 0, x: 40 });
        gsap.set(mobileLine3Ref.current,     { opacity: 0, x: -34 });
        gsap.set(mobileBodyRef.current,      { opacity: 0, x: -24 });
        gsap.set(mobileInfoCardsRef.current, { opacity: 0, x: 34 });
        gsap.set(mobileHmiRef.current,       { opacity: 0, scale: 1.04, y: 20 });

        gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        })
          .to(mobilePillRef.current,      { opacity: 1, x: 0, ease: 'power2.out', duration: 0.38 }, 0.02)
          .to(mobileLine1Ref.current,     { opacity: 1, x: 0, ease: 'power2.out', duration: 0.44 }, 0.08)
          .to(mobileLine2Ref.current,     { opacity: 1, x: 0, ease: 'power2.out', duration: 0.44 }, 0.16)
          .to(mobileLine3Ref.current,     { opacity: 1, x: 0, ease: 'power2.out', duration: 0.44 }, 0.24)
          .to(mobileBodyRef.current,      { opacity: 1, x: 0, ease: 'power2.out', duration: 0.3 }, 0.28)
          .to(mobileInfoCardsRef.current, { opacity: 1, x: 0, ease: 'power3.out', duration: 0.42 }, 0.22)
          .to(mobileHmiRef.current,       { opacity: 1, scale: 1, y: 0, ease: 'power3.out', duration: 0.5 }, 0.34);
      });

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger:             sectionRef.current,
            start:               'top top',
            end:                 '+=1800',
            scrub:               1,
            pin:                 pinRef.current,
            pinSpacing:          true,
            invalidateOnRefresh: true,
            anticipatePin:       1,
          },
        });

        tl.to(hPillRef.current,  { x: '0%', opacity: 1, duration: 0.22 }, 0)
          .to(hLine1Ref.current, { x: '0%', opacity: 1, duration: 0.26 }, 0.05)
          .to(hLine2Ref.current, { x: '0%', opacity: 1, duration: 0.26 }, 0.12)
          .to(hLine3Ref.current, { x: '0%', opacity: 1, duration: 0.26 }, 0.19)

          .to(hmiRef.current, {
            opacity: 1,
            y: -20,
            scale: 1.055,
            rotateX: 0,
            ease: 'power3.out',
            duration: 0.40,
            force3D: true,
          }, 0.04)

          .to(hmiRef.current, {
            y: 0,
            scale: 1,
            ease: 'power2.inOut',
            duration: 0.24,
            force3D: true,
          }, 0.42)

          .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.46)
          .to(infoCards,       { opacity: 1, y: 0, stagger: 0.06, duration: 0.16 }, 0.52)
          .to({}, { duration: 0.18 });
      });

    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="compatibility-hmi"
      className="relative border-b border-white/10 bg-[#0a0a0a] text-white"
      style={{ minHeight: 'auto' }}
    >
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
      <div
        ref={pinRef}
        className="relative z-10 hidden min-h-screen items-center overflow-hidden py-20 lg:flex lg:py-24"
        style={{ willChange: 'transform' }}
      >

        {/* ── HMI — empty container, top-right corner ── */}
        <div
          ref={hmiRef}
          className="pointer-events-none absolute -right-8 top-12 w-[42vw]"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="relative flex aspect-[2.04/1] w-full items-center justify-center rounded-[1.6rem] border border-white/20 bg-white/[0.09]">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-yellow" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-yellow/70">Operator Panel</span>
              </div>
              <span className="font-display text-[clamp(1.2rem,2.2vw,2rem)] font-black uppercase tracking-[-0.03em] text-white/60">Coming Soon</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">Z-TAP Operator Dashboard</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-col gap-10 px-6 lg:px-12">

          {/* ── Heading row ── */}
          <div className="max-w-2xl">
            <div className="overflow-hidden">
              <div ref={hPillRef} className="mb-6">
                <Pill variant="yellow">Compatible With Any Gun</Pill>
              </div>
            </div>
            <h2 className="desktop-section-heading font-display font-black uppercase">
              <div className="overflow-hidden">
                <span ref={hLine1Ref} className="block text-yellow">Plug and play</span>
              </div>
              <div className="overflow-hidden">
                <span ref={hLine2Ref} className="block">any gun.</span>
              </div>
              <div className="overflow-hidden">
                <span ref={hLine3Ref} className="block">
                  <span className="text-yellow">Mimic coat</span> anything.
                </span>
              </div>
            </h2>
            <p
              ref={bodyRef}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/62"
              style={{ willChange: 'transform, opacity' }}
            >
              Connect the gun you already use, show one ideal pass, and let Z-TAP build a
              robotic coating routine — powder, liquid, or electrostatic.
            </p>
          </div>

          {/* ── Two cards side by side ── */}
          <div ref={cardsRef} className="grid items-stretch gap-4 lg:grid-cols-2">

            {/* Card 1 — Merged: Gun-agnostic + Any Gun Input visual */}
            <article
              data-card
              className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(40,40,40,0.94)_0%,rgba(18,18,18,0.96)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_30px_rgba(0,0,0,0.24),0_0_24px_rgba(254,206,0,0.05)]"
              style={{ willChange: 'transform, opacity' }}
            >
              <p className="card-accent-label card-accent-label-light">Works With</p>
              <p className="card-title-supporting mt-4 font-display font-black uppercase text-white">
                Gun-agnostic
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/58">
                The control layer is framed around repeatable process capture, not around one
                coating hardware stack.
              </p>

              {/* Divider into gun visual */}
              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow/85">Any Gun Input</span>
                <span className="rounded-full border border-yellow/30 bg-yellow/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-yellow">Compatible</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              {/* Overlapping gun composition */}
              <div className="relative h-36">
                <div className="absolute left-[3%] top-[1.8rem] z-20 w-[36%]">
                  <div className="relative h-[6.5rem] w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]">
                    <Image src={GUNS[0].src} alt={GUNS[0].alt} fill className="object-contain object-center" sizes="16vw" />
                  </div>
                </div>
                <div className="absolute left-[28%] top-0 z-10 w-[42%]">
                  <div className="relative h-[7.5rem] w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]">
                    <Image src={GUNS[1].src} alt={GUNS[1].alt} fill className="object-contain object-center" sizes="18vw" />
                  </div>
                </div>
                <div className="absolute right-[2%] top-[1.6rem] z-30 w-[34%]">
                  <div className="relative h-[7rem] w-full drop-shadow-[0_18px_26px_rgba(0,0,0,0.5)]">
                    <Image src={GUNS[2].src} alt={GUNS[2].alt} fill className="object-contain object-center" sizes="15vw" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
              </div>

              {/* Works Across row */}
              <div className="my-4 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/10" />
                <span className="rounded-full border border-white/20 bg-white/[0.10] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80">Works Across</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              {/* 3-col gun labels */}
              <div className="grid grid-cols-3 gap-2.5">
                {GUNS.map((gun) => (
                  <div key={gun.label} className="rounded-[1rem] border border-white/[0.06] bg-white/[0.03] p-3">
                    <div className="relative h-14">
                      <Image src={gun.src} alt={gun.alt} fill className="object-contain object-center" sizes="9vw" />
                    </div>
                    <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-yellow">{gun.label}</p>
                    <p className="mt-0.5 text-center text-[8px] leading-relaxed text-white/70">{gun.note}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Card 2 — Teach once. Coat forever. with motion-path graphic */}
            <article
              data-card
              className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(40,40,40,0.94)_0%,rgba(18,18,18,0.96)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_30px_rgba(0,0,0,0.24),0_0_24px_rgba(254,206,0,0.05)]"
              style={{ willChange: 'transform, opacity' }}
            >
              <p className="card-accent-label card-accent-label-light">The Method</p>
              <p className="card-title-supporting mt-4 font-display font-black uppercase text-white">
                Teach once.<br />Coat forever.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/58">
                Capture one ideal coating pass and reuse it across parts, guns, and finishing
                applications without writing robot code.
              </p>

              {/* Motion-path graphic */}
              <div className="mt-5 overflow-hidden rounded-[1.15rem] border border-white/[0.06] bg-white/[0.03] px-4 pb-4 pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85">Teach once</span>
                  <span className="rounded-full bg-yellow px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-ink">Capture</span>
                </div>
                <svg viewBox="0 0 260 110" className="h-[5rem] w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="teachPathDesktop" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#fece00" />
                      <stop offset="100%" stopColor="#f2b800" />
                    </linearGradient>
                  </defs>
                  <path d="M16 74 C42 28, 70 28, 96 64 S146 98, 178 52 S220 26, 244 54" fill="none" stroke="url(#teachPathDesktop)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 74 C42 28, 70 28, 96 64 S146 98, 178 52 S220 26, 244 54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
                  <circle cx="16" cy="74" r="6" fill="rgba(255,255,255,0.35)" />
                  <circle cx="244" cy="54" r="6" fill="#fece00" />
                </svg>
                <div className="my-3 flex items-center gap-2">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="rounded-full border border-white/20 bg-white/[0.10] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/82">Replay many times</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="rounded-[0.8rem] border border-white/[0.06] bg-white/[0.04] p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80">Part {index + 1}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                      </div>
                      <div className="relative h-10 overflow-hidden rounded-[0.6rem] border border-white/[0.06] bg-white/[0.03]">
                        <svg viewBox="0 0 120 56" className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <path d="M8 38 C24 14, 38 14, 52 32 S80 50, 98 26 S108 18, 114 24" fill="none" stroke="#fece00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity={1 - index * 0.12} />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty HMI container placeholder */}
              <div className="mt-5 flex items-center justify-between rounded-[1.15rem] border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.20em] text-white/48">Operator Panel</span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow/40" />
              </div>
            </article>

          </div>
        </div>
      </div>

      <div ref={mobileSectionRef} className="relative z-10 px-5 py-16 sm:px-6 md:px-10 lg:hidden">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <div ref={mobileHeadingRef}>
            <div ref={mobilePillRef} className="mb-5 w-fit">
              <Pill variant="yellow">Compatible With Any Gun</Pill>
            </div>
            <h2 className="mobile-hero-ratio-title max-w-lg font-display font-black uppercase sm:text-[2rem] sm:leading-[0.92] sm:tracking-[-0.05em]">
              <span ref={mobileLine1Ref} className="block text-yellow">Plug and play</span>
              <span ref={mobileLine2Ref} className="block">any gun.</span>
              <span ref={mobileLine3Ref} className="block"><span className="text-yellow">Mimic coat</span> anything.</span>
            </h2>
            <p ref={mobileBodyRef} className="mobile-hero-ratio-copy mt-4 max-w-xl text-white/62 sm:text-sm">
              Connect your existing gun, show one ideal pass, and Z-TAP builds the coating routine — powder, liquid, or electrostatic.
            </p>
          </div>

          <div ref={mobileInfoCardsRef} className="-mx-5 sm:-mx-6">
            <MobileCarousel cardWidthVw={0.84} gap={14} dotColor="#FECE00" inactiveDotColor="rgba(254,206,0,0.42)" indicatorTheme="light" className="mt-1 pl-5 sm:pl-6">
              {[
                {
                  label: 'Works With',
                  title: 'Gun-agnostic',
                  body: 'Built around repeatable process capture, not any one coating hardware stack.',
                  mode: 'guns',
                },
                {
                  label: 'The Method',
                  title: 'Teach once. Coat forever.',
                  body: 'Capture one ideal pass. Reuse across parts, guns, and applications without robot code.',
                  mode: 'program',
                },
              ].map((card) => (
                <article
                  key={card.label}
                  data-magnetic
                  className="relative min-h-[26.5rem] overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#111111] p-5 pb-12 text-white shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                >
                  <p className="card-accent-label card-accent-label-light">{card.label}</p>
                  <p className="card-title-supporting mt-4 font-display font-black uppercase text-white">
                    {card.title}
                  </p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-white/56">
                    {card.body}
                  </p>
                  {card.mode === 'guns' ? (
                    <div className="relative mt-6 overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-[#0d0d0d] px-4 pb-4 pt-4">
                      <div className="pointer-events-none absolute -right-6 top-4 h-16 w-16 rounded-full bg-[rgba(254,206,0,0.08)] blur-2xl" />
                      <div className="pointer-events-none absolute left-0 top-10 h-20 w-20 rounded-full bg-[rgba(254,206,0,0.04)] blur-2xl" />

                      <div className="relative rounded-[1rem] border border-white/[0.06] bg-white/[0.04] p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/40">Any gun input</span>
                          <span className="rounded-full bg-yellow px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-ink">
                            Compatible
                          </span>
                        </div>

                        <div className="relative h-[8.5rem]">
                          <div className="absolute left-[4%] top-[2.9rem] z-20 w-[42%]">
                            <div className="relative h-[5.4rem] w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)]">
                              <Image
                                src={GUNS[0].src}
                                alt={GUNS[0].alt}
                                fill
                                className="object-contain object-center"
                                sizes="28vw"
                              />
                            </div>
                          </div>
                          <div className="absolute left-[30%] top-[0.2rem] z-10 w-[46%]">
                            <div className="relative h-[6.4rem] w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)]">
                              <Image
                                src={GUNS[1].src}
                                alt={GUNS[1].alt}
                                fill
                                className="object-contain object-center"
                                sizes="30vw"
                              />
                            </div>
                          </div>
                          <div className="absolute right-[2%] top-[2.4rem] z-30 w-[40%]">
                            <div className="relative h-[5.8rem] w-full drop-shadow-[0_20px_26px_rgba(0,0,0,0.5)]">
                              <Image
                                src={GUNS[2].src}
                                alt={GUNS[2].alt}
                                fill
                                className="object-contain object-center"
                                sizes="27vw"
                              />
                            </div>
                          </div>
                          <div className="absolute inset-x-4 bottom-2 h-px bg-white/[0.06]" />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-2">
                        <span className="h-px flex-1 bg-white/[0.06]" />
                        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-white/42">
                          Works across
                        </span>
                        <span className="h-px flex-1 bg-white/[0.06]" />
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2.5">
                        {GUNS.map((gun) => (
                          <div
                            key={gun.label}
                            className="rounded-[0.95rem] border border-white/[0.06] bg-white/[0.04] p-2.5"
                          >
                            <div className="relative h-[3.6rem]">
                              <Image
                                src={gun.src}
                                alt={gun.alt}
                                fill
                                className="object-contain object-center"
                                sizes="20vw"
                              />
                            </div>
                            <p className="mt-2 text-center text-[7px] font-semibold uppercase tracking-[0.14em] text-white/38">
                              {gun.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : card.mode === 'program' ? (
                    <div className="relative mt-6 overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-[#0d0d0d] px-4 pb-4 pt-4">
                      <div className="pointer-events-none absolute -left-6 top-4 h-16 w-16 rounded-full bg-[rgba(254,206,0,0.08)] blur-2xl" />
                      <div className="pointer-events-none absolute right-2 top-12 h-20 w-20 rounded-full bg-[rgba(254,206,0,0.04)] blur-2xl" />

                      <div className="relative rounded-[1rem] border border-white/[0.06] bg-white/[0.04] p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/40">Teach once</span>
                          <span className="rounded-full bg-yellow px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-ink">
                            Capture
                          </span>
                        </div>
                        <svg viewBox="0 0 260 110" className="h-[6rem] w-full" aria-hidden="true">
                          <defs>
                            <linearGradient id="teachPath" x1="0%" x2="100%" y1="0%" y2="0%">
                              <stop offset="0%" stopColor="#fece00" />
                              <stop offset="100%" stopColor="#f2b800" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M16 74 C42 28, 70 28, 96 64 S146 98, 178 52 S220 26, 244 54"
                            fill="none"
                            stroke="url(#teachPath)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="1 0"
                          />
                          <path
                            d="M16 74 C42 28, 70 28, 96 64 S146 98, 178 52 S220 26, 244 54"
                            fill="none"
                            stroke="rgba(10,10,10,0.14)"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            strokeLinecap="round"
                          />
                          <circle cx="16" cy="74" r="6" fill="rgba(255,255,255,0.3)" />
                          <circle cx="244" cy="54" r="6" fill="#fece00" />
                        </svg>
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-2">
                        <span className="h-px flex-1 bg-white/[0.06]" />
                        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-white/42">
                          Replay many times
                        </span>
                        <span className="h-px flex-1 bg-white/[0.06]" />
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2.5">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className="rounded-[0.95rem] border border-white/[0.06] bg-white/[0.04] p-2.5"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-white/34">
                                Part {index + 1}
                              </span>
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                            </div>
                            <div className="relative h-[3.5rem] overflow-hidden rounded-[0.8rem] border border-white/[0.06] bg-white/[0.03]">
                              <div className="absolute inset-x-2 top-1/2 h-px bg-white/[0.08]" />
                              <svg viewBox="0 0 120 56" className="absolute inset-0 h-full w-full" aria-hidden="true">
                                <path
                                  d="M8 38 C24 14, 38 14, 52 32 S80 50, 98 26 S108 18, 114 24"
                                  fill="none"
                                  stroke="#fece00"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  opacity={1 - index * 0.12}
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </MobileCarousel>
          </div>

          <div
            ref={mobileHmiRef}
            data-magnetic
            className="relative overflow-hidden rounded-[1.8rem] border border-white/14 px-5 pb-5 pt-5 text-ink min-h-[34rem] shadow-[0_20px_52px_rgba(0,0,0,0.12),0_0_24px_rgba(254,206,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]"
            style={{
              background:
                'radial-gradient(circle at 70% 78%, rgba(186, 228, 226, 0.4) 0%, rgba(186, 228, 226, 0) 28%), radial-gradient(circle at 24% 82%, rgba(194, 216, 255, 0.34) 0%, rgba(194, 216, 255, 0) 24%), linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,245,241,0.96) 48%, rgba(236,241,240,0.98) 100%)',
            }}
          >
            <p className="card-accent-label">HMI Design</p>
            <h3 className="card-title-supporting mt-4 font-display font-black uppercase text-ink">
              One interface.
              <br />
              One operator-native flow.
            </h3>
            <p className="mt-3 max-w-md text-[0.82rem] leading-relaxed text-ink/62">
              The screen below is where the captured motion becomes a reusable production routine.
            </p>

            <div className="relative mt-4 flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[1.2rem] border border-black/[0.06] bg-black/[0.03]">
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/20">Product photo coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
