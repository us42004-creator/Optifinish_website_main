'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OPERATING_STEPS = ['Teach', 'Store', 'Build', 'Recognise', 'Coat'] as const;

export default function Hero() {
  const [coatProgress, setCoatProgress] = useState(0);
  const [profileVisible, setProfileVisible] = useState(false);
  const [coatComplete, setCoatComplete] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const bgTextFillRef = useRef<HTMLSpanElement>(null);
  const gridSweepRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const coatingFlowRef = useRef<HTMLDivElement>(null);
  const coatingCopyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  // Mobile-only refs
  const mobilePinRef = useRef<HTMLDivElement>(null);
  const mobileHeadingRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const mobileCtasRef = useRef<HTMLDivElement>(null);
  const mobileBgTextRef = useRef<HTMLDivElement>(null);
  const mobileBgTextFillRef = useRef<HTMLSpanElement>(null);
  const mobileGridSweepRef  = useRef<HTMLDivElement>(null);
  const mobileCoatingFlowRef = useRef<HTMLDivElement>(null);

  // mobileVh freeze removed — using CSS svh instead to avoid address-bar-collapse gap

  // Diagonal grid flash when preloader exits — sweeps the bg grid bottom-left → top-right
  useEffect(() => {
    const onDone = () => {
      setTimeout(() => {
        const el = gridSweepRef.current;
        if (!el) return;
        // Sweep backgroundPosition so yellow flows through masked grid lines
        gsap.timeline()
          .set(el, { backgroundPosition: '-18% 118%', opacity: 1 })
          .to(el,  { backgroundPosition: '118% -18%', duration: 2.2, ease: 'power1.inOut' })
          .to(el,  { opacity: 0.18, duration: 0.5, ease: 'power2.out' })
          .set(el, { backgroundPosition: '-18% 118%' }); // reset for ScrollTrigger
      }, 60);
    };
    window.addEventListener('preloader:done', onDone);
    return () => window.removeEventListener('preloader:done', onDone);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // ── Mobile pinned scroll (mirrors desktop) ───────────────
      mm.add('(max-width: 1023px)', () => {
        if (!mobilePinRef.current) return;

        // Initial states — match desktop exactly
        gsap.set(mobileBgTextRef.current,     { opacity: 0.18 });
        gsap.set(mobileBgTextFillRef.current, { backgroundPosition: '50% 140%', opacity: 0.12 });
        gsap.set(mobileGridSweepRef.current,  { opacity: 0.18, backgroundPosition: '-18% 118%' });
        gsap.set(mobileCardRef.current,       { opacity: 0, x: 72, y: -18, rotate: -2 });
        gsap.set(mobileCoatingFlowRef.current, { width: '0%' });
        gsap.set(mobileImageRef.current, { y: 0, scale: 1.08, transformOrigin: '50% 100%' });

        const tl = gsap.timeline();
        tl
          // Arm rises in two cleaner phases, with less abrupt scaling
          .to(mobileImageRef.current, { y: -10, scale: 1.1, ease: 'power2.out', duration: 0.54 }, 0.08)
          .to(mobileImageRef.current, { y: -164, scale: 1.17, ease: 'power2.inOut', duration: 1.18 }, 0.46)
          .to(mobileImageRef.current, { y: -208, scale: 1.32, ease: 'power3.out', duration: 0.74 }, 1.18)
          // Grid sweep — matches desktop strength
          .to(mobileGridSweepRef.current, { opacity: 0.9, backgroundPosition: '118% -18%', ease: 'power2.out', duration: 1.8 }, 0.08)
          // Keep the wordmark nested in the arm arc on mobile
          .to(mobileBgTextRef.current,     { opacity: 0.46, scale: 0.92, x: -38, y: 34, ease: 'power2.out', duration: 0.98 }, 0.16)
          .to(mobileBgTextFillRef.current, { backgroundPosition: '50% 8%', opacity: 0.7, ease: 'power2.out', duration: 0.9 }, 0.3)
          .to(mobileBgTextFillRef.current, { backgroundPosition: '50% -10%', opacity: 1, ease: 'power3.out', duration: 0.7 }, 1.14)
          // Card reveals once arm has docked
          .to(mobileCardRef.current,  { opacity: 1, x: 0, y: 0, rotate: 0, ease: 'power3.out', duration: 0.68 }, 1.12)
          // Progress bar fills like desktop coating animation — slow deliberate fill
          .to(mobileCoatingFlowRef.current, { width: '100%', ease: 'power1.inOut', duration: 1.12 }, 1.16)
          .to({}, { duration: 0.18 });

        ScrollTrigger.create({
          trigger: mobilePinRef.current,
          start: 'top top',
          end: '+=780',
          pin: true,
          scrub: 0.6,
          animation: tl,
          invalidateOnRefresh: true,
        });
      });

      // ── Desktop pinned scroll ─────────────────────────────────
      mm.add('(min-width: 1024px)', () => {
        gsap.set(heroImageRef.current, { scale: 0.98, y: 110, transformOrigin: '50% 100%' });
        gsap.set(gridSweepRef.current, { opacity: 0.18, backgroundPosition: '-18% 118%' });
        gsap.set(coatingFlowRef.current, { opacity: 1, xPercent: 0, y: 0, scaleX: 1, transformOrigin: '0% 50%' });
        gsap.set(coatingCopyRef.current, { opacity: 0, x: -120, y: -90, rotate: -4 });
        gsap.set(ctaRef.current, { opacity: 0, y: 48 });
        gsap.set(bgTextFillRef.current, {
          backgroundPosition: '50% 135%',
          opacity: 0.08,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1200',
            scrub: 2,
            pin: pinRef.current,
            anticipatePin: 1,
            onUpdate: (self) => {
              setProfileVisible(self.progress > 0.22);
            },
          },
        });

        tl.to(
          bgTextRef.current,
          {
            opacity: 0.46,
            scale: 0.94,
            x: -228,
            ease: 'power2.out',
            duration: 0.5,
          },
          0
        )
          .to(
            bgTextFillRef.current,
            {
              backgroundPosition: '50% -8%',
              opacity: 1,
              ease: 'power3.out',
              duration: 0.82,
            },
            0.08
          )
          .to(
            gridSweepRef.current,
            {
              opacity: 0.72,
              backgroundPosition: '118% -18%',
              ease: 'power3.out',
              duration: 0.9,
            },
            0.02
          )
          .to(
            heroImageRef.current,
            {
              scale: 1.08,
              y: 30,
              ease: 'power2.out',
              duration: 0.24,
            },
            0.08
          )
          .to(
            heroImageRef.current,
            {
              scale: 1.2,
              y: -42,
              ease: 'power3.out',
              duration: 0.52,
            },
            0.28
          )
          .to(
            heroBadgeRef.current,
            {
              opacity: 0,
              y: -8,
              ease: 'power2.in',
              duration: 0.14,
            },
            0.18
          )
          .to(
            coatingCopyRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              ease: 'power3.out',
              duration: 0.42,
            },
            0.26
          )
          .to(
            ctaRef.current,
            {
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              duration: 0.32,
            },
            0.58
          );
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!profileVisible) {
      setCoatProgress(0);
      setCoatComplete(false);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    setCoatProgress(0);
    setCoatComplete(false);

    const tick = (time: number) => {
      if (start === null) start = time;
      const progress = Math.min((time - start) / 1800, 1);
      const eased = 1 - Math.pow(1 - progress, 2.6);
      const value = Math.round(eased * 100);
      setCoatProgress(value);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCoatComplete(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [profileVisible]);

  // ── Mobile magnetic card: gyroscope 3D tilt ──────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
    if (!mobileCardRef.current) return;

    const handleTilt = (e: DeviceOrientationEvent) => {
      if (!mobileCardRef.current) return;
      const rx = Math.max(-12, Math.min(12, ((e.beta ?? 45) - 45) * 0.22));
      const ry = Math.max(-10, Math.min(10, (e.gamma ?? 0) * 0.18));
      gsap.to(mobileCardRef.current, {
        rotateX: -rx,
        rotateY: ry,
        transformPerspective: 900,
        ease: 'power2.out',
        duration: 0.55,
        overwrite: 'auto',
      });
    };

    window.addEventListener('deviceorientation', handleTilt, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleTilt);
  }, []);

  const activeStepIndex = coatComplete
    ? OPERATING_STEPS.length - 1
    : Math.min(Math.floor((coatProgress / 100) * OPERATING_STEPS.length), OPERATING_STEPS.length - 1);

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-black/8 bg-[#0a0a0a] lg:bg-[#f1efea] lg:min-h-[220vh] lg:overflow-hidden"
    >
      {/* ── Mobile pinned hero (mirrors desktop scroll behaviour) ── */}
      <div
        ref={mobilePinRef}
        className="relative overflow-hidden lg:hidden"
        style={{ height: '100vh' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(241,239,234,0.88)_38%,_rgba(231,228,220,0.9)_100%)]" />
        <div className="absolute inset-0 opacity-[0.38] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:120px_120px]" />
        {/* Grid sweep — animated on scroll, mirrors desktop */}
        <div
          ref={mobileGridSweepRef}
          style={{ opacity: 0.18, backgroundPosition: '-18% 118%' }}
          className="pointer-events-none absolute inset-0 z-[0] bg-[linear-gradient(45deg,rgba(255,255,255,0)_24%,rgba(254,206,0,0.16)_34%,rgba(254,206,0,1)_48%,rgba(254,206,0,0.34)_61%,rgba(255,255,255,0)_74%)] bg-[length:220%_220%] bg-no-repeat [mask-image:linear-gradient(rgba(0,0,0,1)_1.25px,transparent_1.25px),linear-gradient(90deg,rgba(0,0,0,1)_1.25px,transparent_1.25px)] [mask-size:120px_120px,120px_120px] [mask-position:0_0,0_0] [mask-repeat:repeat,repeat] [-webkit-mask-image:linear-gradient(rgba(0,0,0,1)_1.25px,transparent_1.25px),linear-gradient(90deg,rgba(0,0,0,1)_1.25px,transparent_1.25px)] [-webkit-mask-size:120px_120px,120px_120px] [-webkit-mask-position:0_0,0_0] [-webkit-mask-repeat:repeat,repeat]"
        />

        {/* Background Z-TAP lettermark — gradient fill sweeps on scroll (mirrors desktop) */}
        <div ref={mobileBgTextRef} className="pointer-events-none absolute inset-x-0 top-[35%] z-[1] flex justify-center select-none" style={{ opacity: 0.18 }}>
          <span className="relative font-display text-[clamp(5.7rem,29vw,9rem)] font-black uppercase tracking-[-0.08em] text-[#6d665f]">
            Z-TAP
            <span
              ref={mobileBgTextFillRef}
              style={{ backgroundPosition: '50% 140%', opacity: 0.12 }}
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0)_0%,rgba(10,10,10,0.14)_12%,rgba(10,10,10,0.98)_28%,rgba(10,10,10,1)_42%,rgba(254,206,0,1)_58%,rgba(254,206,0,1)_76%,rgba(255,236,170,1)_90%,rgba(255,248,224,1)_100%)] bg-[length:100%_320%] bg-no-repeat text-transparent [background-clip:text] [-webkit-background-clip:text]"
            >
              Z-TAP
            </span>
          </span>
        </div>

        {/* Heading — top */}
        <div ref={mobileHeadingRef} className="absolute inset-x-5 top-[78px] z-20 md:inset-x-10">
          <div>
            <div>
              <h2 className="mobile-hero-ratio-title max-w-[16.2rem] font-display font-[950] uppercase md:max-w-[36rem]">
                <span className="text-yellow">Z-TAP</span>
                <span className="text-black"> / Zero Touch Automation Platform</span>
              </h2>
              <p className="mobile-hero-ratio-copy mt-2 max-w-[15rem] text-black/55 md:max-w-[28rem]">
                Zero-touch robotic coating for real production lines.
              </p>
            </div>
          </div>
        </div>

        {/* Hero arm image — bottom-anchored, docks upward on scroll.
            bottom-[-55px]: arm base slightly off-screen like desktop.
            Top gradient mask: arm fades transparent in heading zone so no visual overlap. */}
        <div
          ref={mobileImageRef}
          className="pointer-events-none absolute inset-x-[-2%] z-10 mx-auto w-[104%] will-change-transform"
          style={{
            bottom: '-76px',
            height: '82vh',
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 9%, rgba(0,0,0,0.46) 16%, black 22%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 9%, rgba(0,0,0,0.46) 16%, black 22%)',
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[1] mx-auto h-14 w-[13rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.05)_48%,transparent_80%)] blur-2xl" />
          <Image
            src="/hero_1.png"
            alt="Z-TAP robotic coating arm"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
            sizes="100vw"
          />
        </div>

        {/* Mimic card — hidden until arm docks */}
        <div
          ref={mobileCardRef}
          style={{ opacity: 0, transform: 'translateX(72px) translateY(-18px) rotate(-2deg)' }}
          className="absolute inset-x-2 bottom-[30px] z-30 overflow-hidden rounded-[1.55rem] border border-black/10 bg-white/94 shadow-[0_20px_52px_rgba(0,0,0,0.13),0_0_24px_rgba(254,206,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm"
        >
          <div className="p-4.5">
            {/* Eyebrow + badge on same row */}
            <div className="flex items-center justify-between gap-2">
              <p className="card-accent-label">Mimic-Based Coating</p>
              <div className="rounded-full border border-black/8 bg-black/[0.03] px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-black/35">
                5-Step
              </div>
            </div>
            {/* Headline — tighter */}
            <h1 className="mt-1.5 max-w-[17.5rem] font-display text-[1.4rem] font-black uppercase leading-[0.9] tracking-[-0.05em]">
              <span className="text-yellow">Show the motion. </span>
              <span className="text-[#131313]">The robot coats.</span>
            </h1>
            {/* Steps + progress */}
            <div className="mt-3 rounded-[0.9rem] border border-yellow/25 bg-black/[0.03] px-3.5 py-3">
              <div className="mb-1.5 flex flex-wrap gap-1">
                {OPERATING_STEPS.map((step) => (
                  <span
                    key={step}
                    className="rounded-full bg-yellow px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-black/74"
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden rounded-full bg-black/[0.06]">
                <div ref={mobileCoatingFlowRef} className="h-1.5 rounded-full bg-[linear-gradient(90deg,#fece00_0%,#ffe682_100%)]" style={{ width: '0%' }} />
              </div>
            </div>
          </div>

          {/* CTA row — flush bottom, separated by top border */}
          <div ref={mobileCtasRef} className="flex">
            <a
              href="#waitlist"
              className="flex flex-1 items-center justify-center bg-[#fece00] py-3.5 text-[8px] font-bold uppercase tracking-[0.18em] text-black transition-opacity active:opacity-80"
            >
              Early Access
            </a>
            <div className="w-px bg-black/10" />
            <a
              href="#zero-touch"
              className="flex flex-1 items-center justify-center bg-[#0d0d0d] py-3.5 text-[8px] font-bold uppercase tracking-[0.18em] text-white/80 transition-opacity active:opacity-70"
            >
              Explore
            </a>
          </div>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative hidden h-screen items-center justify-center overflow-hidden lg:flex"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(241,239,234,0.88)_38%,_rgba(231,228,220,0.9)_100%)]" />
        <div className="absolute inset-0 opacity-[0.38] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:120px_120px]" />
        <div
          ref={gridSweepRef}
          className="pointer-events-none absolute inset-0 z-[0] opacity-90 bg-[linear-gradient(45deg,rgba(255,255,255,0)_24%,rgba(254,206,0,0.16)_34%,rgba(254,206,0,1)_48%,rgba(254,206,0,0.34)_61%,rgba(255,255,255,0)_74%)] bg-[length:220%_220%] bg-no-repeat [mask-image:linear-gradient(rgba(0,0,0,1)_1.25px,transparent_1.25px),linear-gradient(90deg,rgba(0,0,0,1)_1.25px,transparent_1.25px)] [mask-size:120px_120px,120px_120px] [mask-position:0_0,0_0] [mask-repeat:repeat,repeat] [-webkit-mask-image:linear-gradient(rgba(0,0,0,1)_1.25px,transparent_1.25px),linear-gradient(90deg,rgba(0,0,0,1)_1.25px,transparent_1.25px)] [-webkit-mask-size:120px_120px,120px_120px] [-webkit-mask-position:0_0,0_0] [-webkit-mask-repeat:repeat,repeat]"
        />
        <div className="pointer-events-none absolute bottom-[6vh] left-1/2 z-[1] h-20 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.02)_60%,transparent_78%)] blur-2xl" />
        <div className="pointer-events-none absolute bottom-[5.5vh] left-1/2 z-[1] h-8 w-[20rem] -translate-x-1/2 rounded-full border border-white/40 bg-white/10 blur-sm" />

        <div
          ref={bgTextRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          style={{ opacity: 0.18 }}
        >
          <span className="relative font-display text-[clamp(7rem,24vw,22rem)] font-black uppercase tracking-[-0.08em] text-[#6d665f]">
            Z-TAP
            <span
              ref={bgTextFillRef}
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0)_0%,rgba(10,10,10,0.08)_16%,rgba(10,10,10,0.96)_34%,rgba(10,10,10,1)_48%,rgba(254,206,0,1)_62%,rgba(254,206,0,1)_78%,rgba(255,236,170,0.98)_92%,rgba(255,248,224,0.98)_100%)] bg-[length:100%_300%] bg-no-repeat text-transparent [background-clip:text] [-webkit-background-clip:text]"
            >
              Z-TAP
            </span>
          </span>
        </div>

        <div className="absolute left-6 right-6 top-30 z-20 flex items-start justify-between lg:left-12 lg:right-12 lg:top-34">
          <div>
            <h2 className="max-w-[26rem] font-display text-[clamp(1.1rem,2.35vw,2.24rem)] font-[950] uppercase leading-[0.9] tracking-[-0.068em]">
              <span className="text-yellow">Z-TAP</span>
              <span className="text-black"> / Zero Touch Automation Platform</span>
            </h2>
            <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed text-black/58 sm:max-w-[380px]">
              Zero-touch robotic coating automation for repeatable spray quality on real production lines.
            </p>
          </div>
          <div ref={heroBadgeRef} className="hidden rounded-full border border-black/10 bg-white/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/45 md:block">
            Noida, India · Est. 2011
          </div>
        </div>

        <div
          ref={coatingCopyRef}
          data-magnetic
          className="absolute bottom-28 right-6 z-30 max-w-[320px] rounded-[1.8rem] border border-black/10 bg-white/78 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08),0_0_28px_rgba(254,206,0,0.14)] backdrop-blur lg:bottom-30 lg:right-12 lg:max-w-[380px]"
        >
          <p className="card-accent-label">Mimic-Based Coating</p>
          <h1 className="mt-5 font-display text-[clamp(1.45rem,3.6vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#131313]">
            <span className="text-yellow">Show the motion.</span>
            <br />
            <span className="text-[#131313]">The robot coats.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-black/58">
            An operator performs one ideal spray pass. Z-TAP, the Zero Touch Automation Platform for robotic coating,
            captures the path and turns it into a robotic coating routine with repeatable angle, speed, and coverage.
          </p>
          <div className="mt-5 rounded-[1rem] border border-yellow/30 bg-black/[0.03] p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">
                Operating Model
              </p>
              <div className="rounded-full border border-black/8 bg-white/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/42">
                5-Step Flow
              </div>
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {OPERATING_STEPS.map((step, index) => {
                const isActive = index <= activeStepIndex;
                return (
                  <span
                    key={step}
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] transition ${
                      isActive
                        ? 'bg-yellow text-black shadow-[0_6px_12px_rgba(254,206,0,0.18)]'
                        : 'bg-black/[0.04] text-black/40'
                    }`}
                  >
                    {step}
                  </span>
                );
              })}
            </div>
            <div className="overflow-hidden rounded-full border border-yellow/30 bg-black/[0.04]">
              <div ref={coatingFlowRef} className="coating-flow h-3 rounded-full" style={{ width: `${coatProgress}%` }} />
            </div>
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">
            {coatComplete ? 'Coat complete' : 'Coating in progress'}
          </p>
        </div>

        <div
          ref={heroImageRef}
          data-magnetic
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto h-[76vh] w-[min(88vw,800px)] will-change-transform overflow-hidden cursor-magnetic"
        >
          <Image
            src="/hero_1.png"
            alt="Z-TAP robotic coating arm"
            fill
            priority
            className="object-contain object-center drop-shadow-[0_32px_60px_rgba(0,0,0,0.12)]"
          />
        </div>

        <div
          ref={ctaRef}
          className="absolute bottom-18 left-6 z-30 flex flex-col items-start gap-4 lg:bottom-20 lg:left-12"
        >
          <a href="#waitlist" data-magnetic className="panel-button dynamic-button dynamic-button-dark px-8 text-white">
            <span>Request Early Access</span>
            <span className="dynamic-button-glow" />
          </a>
          <a
            href="#zero-touch"
            data-magnetic
            className="panel-button dynamic-button dynamic-button-light px-6 text-[11px] text-black/62"
          >
            <span>Explore System Details</span>
            <span className="dynamic-button-glow" />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="scroll-bounce flex flex-col items-center gap-2 text-black/28">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-10 w-px bg-black/18" />
          </div>
        </div>
      </div>
    </section>
  );
}
