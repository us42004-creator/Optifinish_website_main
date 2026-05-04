'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

// Available facility photos — update this list as new images are added
const FACILITY_PHOTOS = [
  '/images/facility/facility-14.jpg',  // yellow main floor — opener
  '/images/facility/facility-11.jpg',  // yellow geometric wall
  '/images/facility/facility-16.jpg',  // yellow with glass partitions
  '/images/facility/facility-17.jpg',  // yellow long perspective
  '/images/facility/facility-05.jpg',  // white conference room — middle
  '/images/facility/facility-07.jpg',  // white conference room — middle
  '/images/facility/facility-08.jpg',  // warm yellow lights — closer
];

// Placeholder slots for exterior photos — replace src once images are provided
const EXTERIOR_SLOTS = [
  { label: 'Exterior — front elevation' },
  { label: 'Exterior — side view' },
  { label: 'Exterior — entrance' },
  { label: 'Exterior — aerial / overview' },
];

export default function FacilityTeaserFilmstrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);

  useHeadingAnimation({
    trigger: sectionRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
    body: bodyRef,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-20 md:py-28">

      {/* Hover-pause CSS (server-safe) */}
      <style>{`
        .facility-strip:hover .facility-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Grid drift layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-ink">

          {/* ── Top row: text + exterior photo grid ── */}
          <div className="flex flex-col gap-10 p-8 md:flex-row md:items-stretch md:gap-10 md:p-14">

            {/* Text */}
            <div className="flex-1">
              <div className="overflow-hidden pb-[0.15em]">
                <span
                  ref={eyebrowRef}
                  className="card-accent-label card-accent-label-light mb-4 block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Greater Noida Facility
                </span>
              </div>

              <h2 className="font-display desktop-section-heading mobile-hero-ratio-title font-black text-white">
                <div className="overflow-hidden pb-[0.15em]">
                  <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                    Manufactured in India.
                  </span>
                </div>
                <div className="overflow-hidden pb-[0.15em]">
                  <span ref={line2Ref} className="block text-yellow" style={{ willChange: 'transform, opacity' }}>
                    Backed by real R&amp;D.
                  </span>
                </div>
              </h2>

              <p
                ref={bodyRef}
                className="mt-5 max-w-md text-[0.88rem] leading-relaxed text-white/48"
                style={{ willChange: 'transform, opacity' }}
              >
                Our Greater Noida manufacturing and R&amp;D facility is where OptiFinish products are
                built, tested, and refined. From complete powder coating plants to proprietary
                automation systems — everything is engineered here.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {[
                  'Complete plant manufacturing capability',
                  'In-house R&D for automation products',
                  'Demo and trial facility available',
                  'Testing and commissioning centre',
                ].map((item) => (
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
                className="panel-button dynamic-button dynamic-button-yellow mt-8 inline-flex"
              >
                <span>See the Facility</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>

            {/* ── Exterior photo grid — 2×2 ── */}
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:w-[38rem] md:flex-shrink-0">
              {EXTERIOR_SLOTS.map((slot, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] min-h-[140px]"
                >
                  <div className="flex h-full items-center justify-center p-3 text-center">
                    <span className="text-[8px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/20">
                      {slot.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── Interior photo filmstrip ── */}
          <div className="border-t border-white/[0.06]">

            <div className="px-8 pb-3 pt-5 md:px-14">
              <span className="text-[0.52rem] font-bold uppercase tracking-[0.26em] text-white/25">
                From the facility floor
              </span>
            </div>

            <div
              className="facility-strip overflow-hidden pb-8"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              }}
            >
              <div
                className="facility-track flex gap-3 will-change-transform"
                style={{ animation: 'marquee 48s linear infinite' }}
              >
                {[...FACILITY_PHOTOS, ...FACILITY_PHOTOS].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-xl md:h-44 md:w-72"
                  >
                    <Image
                      src={src}
                      alt="OptiFinish facility"
                      fill
                      className="object-cover"
                      sizes="288px"
                    />
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
