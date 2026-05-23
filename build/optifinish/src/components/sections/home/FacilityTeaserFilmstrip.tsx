'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

const FACILITY_PHOTOS = [
  '/images/facility/facility-78.jpg',
  '/images/facility/facility-74.jpg',
  '/images/facility/facility-79.jpg',
  '/images/facility/facility-75.jpg',
  '/images/facility/facility-80.jpg',
  '/images/facility/facility-76.jpg',
  '/images/facility/facility-77.jpg',
  '/images/facility/facility-68.jpg',
  '/images/facility/facility-67.jpg',
  '/images/facility/facility-44.jpg',
  '/images/facility/facility-45.jpg',
  '/images/facility/facility-51.jpg',
  '/images/facility/facility-52.jpg',
  '/images/facility/facility-72.jpg',
  '/images/facility/facility-73.jpg',
  '/images/facility/facility-26.jpg',
  '/images/facility/facility-30.jpg',
  '/images/facility/facility-33.jpg',
  '/images/facility/facility-37.jpg',
  '/images/facility/facility-40.jpg',
  '/images/facility/facility-57.jpg',
  '/images/facility/facility-63.jpg',
];

const EXTERIOR_PHOTOS = [
  { src: '/images/facility/factory_exterior_touchup.png', label: 'Greater Noida facility exterior' },
  { src: '/images/facility/facility-67.jpg',              label: 'Facility interior' },
  { src: '/images/facility/facility-19.jpg',              label: 'Facility interior' },
  { src: '/images/facility/facility-78.jpg',              label: 'Facility interior' },
];

const BULLETS = [
  'Complete plant manufacturing capability',
  'In-house R&D for automation products',
  'Demo and trial facility available',
  'Testing and commissioning centre',
];

export default function FacilityTeaserFilmstrip() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLSpanElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const stripRef    = useRef<HTMLDivElement>(null);
  const stripPaused = useRef(false);
  const stripRaf    = useRef<number>(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const SPEED = 42;
    let last = 0;
    const step = (t: number) => {
      if (!stripPaused.current) {
        const delta = last ? (t - last) / 1000 : 0;
        el.scrollLeft += SPEED * delta;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      }
      last = t;
      stripRaf.current = requestAnimationFrame(step);
    };
    stripRaf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(stripRaf.current);
  }, []);

  useHeadingAnimation({
    trigger: sectionRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
    body: bodyRef,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-6 md:py-8">

      {/* Grid drift layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)`,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)`,
          backgroundSize: '264px 264px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-ink">

          {/* ══════════════════════════════════════
              MOBILE — compact horizontal card
          ══════════════════════════════════════ */}
          <div className="flex items-stretch lg:hidden">

            {/* Left: text */}
            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <div>
                <span
                  ref={eyebrowRef}
                  className="card-accent-label card-accent-label-light mb-3 block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Greater Noida Facility
                </span>

                <h2 className="font-display text-[clamp(1.3rem,5.5vw,1.8rem)] font-black leading-[1.0] tracking-[-0.04em] text-white">
                  <div className="overflow-hidden pb-[0.1em]">
                    <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                      Manufactured in{' '}
                      <span style={{
                        background: 'linear-gradient(to bottom, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>India</span>.
                    </span>
                  </div>
                  <div className="overflow-hidden pb-[0.1em]">
                    <span ref={line2Ref} className="block text-yellow" style={{ willChange: 'transform, opacity' }}>
                      Backed by real R&amp;D.
                    </span>
                  </div>
                </h2>

                <p
                  ref={bodyRef}
                  className="mt-2.5 text-[0.72rem] leading-relaxed text-white/45"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Greater Noida facility — manufacturing, R&amp;D, trials and commissioning under one roof.
                </p>
              </div>

              <Link
                href="/facility"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FECE00] px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink self-start"
              >
                See the Facility →
              </Link>
            </div>

            {/* Right: single tall photo */}
            <div className="relative w-[42%] flex-shrink-0 overflow-hidden">
              <Image
                src={EXTERIOR_PHOTOS[0].src}
                alt="OptiFinish Greater Noida facility"
                fill
                className="object-cover"
                sizes="45vw"
                priority
              />
              {/* gradient to blend into card bg */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-ink to-transparent" />
            </div>

          </div>

          {/* ══════════════════════════════════════
              DESKTOP — original layout
          ══════════════════════════════════════ */}
          <div className="hidden lg:flex lg:flex-row lg:items-stretch lg:gap-8 lg:p-10">

            {/* Text */}
            <div className="flex-1">
              <div className="overflow-hidden pb-[0.15em]">
                <span
                  className="card-accent-label card-accent-label-light mb-4 block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Greater Noida Facility
                </span>
              </div>

              <h2 className="font-display desktop-section-heading mobile-hero-ratio-title font-black text-white">
                <div className="overflow-hidden pb-[0.15em]">
                  <span className="block" style={{ willChange: 'transform, opacity' }}>
                    Manufactured in{' '}
                    <span style={{
                      background: 'linear-gradient(to bottom, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>India</span>.
                  </span>
                </div>
                <div className="overflow-hidden pb-[0.15em]">
                  <span className="block text-yellow" style={{ willChange: 'transform, opacity' }}>
                    Backed by real R&amp;D.
                  </span>
                </div>
              </h2>

              <p className="mt-4 max-w-md text-[0.85rem] leading-relaxed text-white/48">
                Our Greater Noida manufacturing and R&amp;D facility is where OptiFinish products are
                built, tested, and refined. From complete powder coating plants to proprietary
                automation systems — everything is engineered here.
              </p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {BULLETS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.78rem] font-medium text-white/55">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/facility"
                className="panel-button dynamic-button dynamic-button-yellow mt-6 inline-flex"
              >
                <span>See the Facility</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>

            {/* Desktop 2×2 photo grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-[40rem] flex-shrink-0">
              {EXTERIOR_PHOTOS.map((photo, i) => (
                <div key={i} className="relative overflow-hidden rounded-xl min-h-[120px]">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Filmstrip — desktop only ── */}
          <div className="hidden lg:block border-t border-white/[0.06]">
            <div className="px-10 pb-2 pt-4">
              <span className="text-[0.52rem] font-bold uppercase tracking-[0.26em] text-white/25">
                From the facility floor
              </span>
            </div>
            <div
              ref={stripRef}
              className="overflow-x-auto pb-5"
              style={{
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
                maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              }}
              onMouseEnter={() => { stripPaused.current = true; }}
              onMouseLeave={() => { stripPaused.current = false; }}
            >
              <div className="flex w-max gap-3">
                {[...FACILITY_PHOTOS, ...FACILITY_PHOTOS].map((src, i) => (
                  <div key={i} className="relative h-32 w-60 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={src} alt="OptiFinish facility" fill className="object-cover" sizes="288px" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
