'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

// Filmstrip — old beautiful office photos first, then specific factory floor shots, then rest
const FACILITY_PHOTOS = [
  '/images/facility/facility-78.jpg',   // old — yellow office
  '/images/facility/facility-74.jpg',   // old — office
  '/images/facility/facility-79.jpg',   // old — yellow office
  '/images/facility/facility-75.jpg',   // old — office
  '/images/facility/facility-80.jpg',   // old — yellow office
  '/images/facility/facility-76.jpg',   // old — office
  '/images/facility/facility-77.jpg',   // old — office
  '/images/facility/facility-68.jpg',   // new — factory
  '/images/facility/facility-67.jpg',   // new — factory
  '/images/facility/facility-44.jpg',   // new — factory
  '/images/facility/facility-45.jpg',   // new — factory
  '/images/facility/facility-51.jpg',   // new — factory
  '/images/facility/facility-52.jpg',   // new — factory
  '/images/facility/facility-72.jpg',   // new — factory
  '/images/facility/facility-73.jpg',   // new — factory
  '/images/facility/facility-26.jpg',   // rest
  '/images/facility/facility-30.jpg',   // rest
  '/images/facility/facility-33.jpg',   // rest
  '/images/facility/facility-37.jpg',   // rest
  '/images/facility/facility-40.jpg',   // rest
  '/images/facility/facility-57.jpg',   // rest
  '/images/facility/facility-63.jpg',   // rest
];

// Exterior 2×2 grid
const EXTERIOR_PHOTOS = [
  { src: '/images/facility/factory_exterior_touchup.png', label: 'Greater Noida facility exterior' },
  { src: '/images/facility/facility-67.jpg', label: 'Facility interior' },
  { src: '/images/facility/facility-19.jpg', label: 'Facility interior' },
  { src: '/images/facility/facility-78.jpg', label: 'Facility interior' },
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-6 md:py-8">

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
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-stretch md:gap-8 md:p-10">

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
                    Manufactured in <span style={{ background: 'linear-gradient(to bottom, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>India</span>.
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
                className="mt-4 max-w-md text-[0.85rem] leading-relaxed text-white/48"
                style={{ willChange: 'transform, opacity' }}
              >
                Our Greater Noida manufacturing and R&amp;D facility is where OptiFinish products are
                built, tested, and refined. From complete powder coating plants to proprietary
                automation systems — everything is engineered here.
              </p>

              <ul className="mt-5 flex flex-col gap-2.5">
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
                className="panel-button dynamic-button dynamic-button-yellow mt-6 inline-flex"
              >
                <span>See the Facility</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>

            {/* ── Exterior photo grid — 2×2 ── */}
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:w-[40rem] md:flex-shrink-0">
              {EXTERIOR_PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl min-h-[120px]"
                >
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

          {/* ── Interior photo filmstrip ── */}
          <div className="border-t border-white/[0.06]">

            <div className="px-6 pb-2 pt-4 md:px-10">
              <span className="text-[0.52rem] font-bold uppercase tracking-[0.26em] text-white/25">
                From the facility floor
              </span>
            </div>

            <div
              className="facility-strip overflow-hidden pb-5"
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
                    className="relative h-28 w-52 flex-shrink-0 overflow-hidden rounded-xl md:h-32 md:w-60"
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
