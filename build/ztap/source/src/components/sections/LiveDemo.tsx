'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';

gsap.registerPlugin(ScrollTrigger);

const DEMO_TAGS = ['Teach', 'Store', 'Build', 'Recognise', 'Coat'];
const DEMO_POSTER = '/fr5-close-web.png';

export default function LiveDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameShellRef = useRef<HTMLDivElement>(null);
  const frameGlowRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const dLine1Ref = useRef<HTMLSpanElement>(null);
  const dLine2Ref = useRef<HTMLSpanElement>(null);
  const dPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const contentBits = contentRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-demo-reveal]', contentRef.current)
        : [];
      const tags = tagsRef.current ? gsap.utils.toArray<HTMLElement>('[data-demo-tag]', tagsRef.current) : [];

      gsap.set(sectionRef.current, { backgroundColor: '#f1efea' });
      gsap.set(contentBits, { opacity: 0, x: -34, y: 8, filter: 'blur(10px)' });
      gsap.set(dPillRef.current, { x: '-120%', opacity: 0 });
      gsap.set(dLine1Ref.current, { x: '-110%', opacity: 0 });
      gsap.set(dLine2Ref.current, { x: '90%', opacity: 0 });
      gsap.set(frameRef.current, {
        opacity: 0,
        y: 72,
        scale: 0.9,
        rotateX: -8,
        transformOrigin: '50% 50%',
      });
      gsap.set(frameShellRef.current, {
        boxShadow: '0 22px 60px rgba(0,0,0,0.08)',
      });
      gsap.set(frameGlowRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(tags, { opacity: 0, y: 18, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 22%',
          scrub: 0.5,
        },
      });

      tl.to(
        sectionRef.current,
        {
          backgroundColor: '#f1efea',
          ease: 'power1.out',
          duration: 0.45,
        },
        0
      )
        .to(dPillRef.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.4 }, 0.02)
        .to(dLine1Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.08)
        .to(dLine2Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.1)
        .to(
          contentBits,
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.07,
            ease: 'power3.out',
            duration: 0.22,
          },
          0.02
        )
        .to(
          frameRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: 'power3.out',
            duration: 0.34,
          },
          0.1
        )
        .to(
          frameShellRef.current,
          {
            boxShadow: '0 30px 84px rgba(0,0,0,0.14), 0 0 0 rgba(254,206,0,0)',
            ease: 'power2.out',
            duration: 0.24,
          },
          0.2
        )
        .to(
          frameGlowRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            duration: 0.26,
          },
          0.18
        )
        .to(
          tags,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: 'power3.out',
            duration: 0.14,
          },
          0.28
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="demo-video" className="relative overflow-hidden border-b border-black/10 bg-[#f1efea] py-14 text-ink sm:py-20 lg:py-24">
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
        <div className="grid w-full gap-5 lg:grid-cols-[0.66fr_1.34fr] lg:items-center lg:gap-10">
          <div ref={contentRef} className="justify-self-start">
            <div className="overflow-hidden">
              <div ref={dPillRef} className="mb-6">
                <Pill variant="dark">Live Demo</Pill>
              </div>
            </div>
            <h2 className="mobile-hero-ratio-title desktop-section-heading max-w-none font-display font-black uppercase lg:max-w-[20rem]">
              <div className="overflow-hidden">
                <span ref={dLine1Ref} className="block">Watch <span className="text-yellow">Z-TAP</span></span>
              </div>
              <div className="overflow-hidden">
                <span ref={dLine2Ref} className="block">in action<span className="text-yellow">.</span></span>
              </div>
            </h2>
            <p data-demo-reveal className="mobile-hero-ratio-copy mt-5 max-w-[23rem] text-ink/66 sm:text-sm lg:text-sm lg:leading-relaxed">
              See the application the way it is meant to be understood: a real spray motion, captured once, then carried into robotic execution with the same coating intent still intact.
            </p>
            <div data-demo-reveal className="mt-6 hidden lg:block">
              <a
                href="#waitlist"
                data-magnetic
                className="panel-button bg-yellow px-10 text-ink hover:bg-yellow/90 lg:w-fit"
              >
                <span>Request Demo Access</span>
              </a>
            </div>
            <div data-demo-reveal className="mt-5 hidden items-center gap-3 lg:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
              <p className="text-[0.92rem] text-ink/64">Manual pass in. Robotic coating out.</p>
            </div>
          </div>

          <div ref={frameRef} className="relative -mx-3 perspective-[1800px] sm:mx-0">
            <div
              ref={frameGlowRef}
              className="pointer-events-none absolute -left-10 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(254,206,0,0.2)_0%,rgba(254,206,0,0.07)_54%,rgba(254,206,0,0)_76%)] blur-2xl"
            />
            <article
              ref={frameShellRef}
              data-magnetic
              className="hero-card-surface relative overflow-hidden rounded-[1.7rem] border border-black/10 p-2.5 sm:rounded-[2.1rem] sm:p-3 lg:rounded-[2rem] lg:p-3"
            >
              <div className="flex items-center justify-between rounded-[1.2rem] border border-black/[0.08] bg-white/[0.78] px-3 py-2.5 sm:rounded-[1.5rem] sm:px-4 sm:py-3 lg:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                </div>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-ink/45 sm:text-[10px] sm:tracking-[0.24em]">OptiFinish Innovation Playground</p>
              </div>

              <div className="relative mt-3 overflow-hidden rounded-[1.45rem] border border-black/10 bg-[#ece7df] sm:rounded-[1.75rem] lg:rounded-[1.6rem]">
                <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_22%,rgba(0,0,0,0.18)_100%)]" />
                <div className="pointer-events-none absolute inset-x-[12%] bottom-[7%] z-20 h-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(254,206,0,0.12)_0%,rgba(254,206,0,0.05)_30%,rgba(254,206,0,0)_72%)] blur-2xl" />
                <div className="relative aspect-[4/6.3] w-full sm:aspect-video lg:aspect-[16/9.2]">
                  <Image
                    src={DEMO_POSTER}
                    alt="OptiFinish mimic poster frame"
                    fill
                    priority={false}
                    className="object-cover object-[58%_50%] scale-[1.04] lg:object-[55%_48%]"
                    sizes="(min-width: 1024px) 54vw, 100vw"
                  />
                </div>

                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/35 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.16)] sm:h-24 sm:w-24">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow text-ink shadow-[0_10px_28px_rgba(254,206,0,0.24)] sm:h-16 sm:w-16">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" aria-hidden="true">
                        <path d="M8 6.5v11l9-5.5-9-5.5Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5 sm:gap-4">
                  <div className="rounded-[1rem] bg-black/14 px-3 py-2 backdrop-blur-[6px]">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-yellow">Recorded Once</p>
                    <p className="mt-1.5 max-w-[13rem] text-[0.76rem] leading-relaxed text-white/[0.9] sm:max-w-sm sm:text-sm">
                      The operator shows once. Robot coats repeatably.
                    </p>
                  </div>
                  <div className="rounded-full border border-white/16 bg-white/14 px-3 py-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.24em]">
                    Application View
                  </div>
                </div>
              </div>

              <div className="mt-4 px-1 pb-1 pt-1">
                <div ref={tagsRef} className="hidden flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-ink/70 lg:flex">
                  {DEMO_TAGS.map((tag) => (
                    <span
                      key={tag}
                      data-demo-tag
                      data-magnetic
                      className="inline-flex min-h-[2.25rem] items-center rounded-full border border-black/[0.08] bg-white/90 px-5 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]"
                    >
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                <div ref={tagsRef} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/58 lg:hidden">
                  {DEMO_TAGS.map((tag, index) => (
                    <span key={tag} data-demo-tag data-magnetic className="inline-flex items-center">
                      <span>{tag}</span>
                      {index < DEMO_TAGS.length - 1 ? (
                        <span className="ml-2 text-yellow/80">•</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
                <div className="mt-3 flex justify-end">
                  <p className="rounded-full border border-black/8 bg-white/62 px-3 py-1 text-right text-[9px] font-semibold uppercase tracking-[0.2em] text-ink/46 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] sm:text-[10px] lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:text-[0.7rem] lg:tracking-[0.18em] lg:text-ink/48">
                    Visit our lab today
                  </p>
                </div>

            </article>

            {/* Mobile-only CTA below video */}
            <div className="mt-4 lg:hidden">
              <a
                href="#waitlist"
                className="panel-button inline-flex w-full bg-yellow px-10 text-ink hover:bg-yellow/90"
              >
                <span>Request Demo Access</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
