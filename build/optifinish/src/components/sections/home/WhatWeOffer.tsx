'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

const DURR_SLIDES = [
  { src: '/images/products/durr/bell-atomiser/durr-ecobell-slider-01.webp',        label: 'EcoBell Rotary Atomiser' },
  { src: '/images/products/durr/general/durr-spray-booth-interior-01.webp',   label: 'Liquid Coating Booth' },
  { src: '/images/products/durr/general/durr-paint-robot-automotive-01.webp', label: 'Paint Robot — Automotive' },
  { src: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',          label: 'EcoGun AA Auto' },
  { src: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',        label: 'EcoPump9 Dosing System' },
  { src: '/images/products/durr/general/durr-ready2spray-01.webp',            label: 'Ready2Spray Robot Cell' },
];

const TOP_GROUPS = [
  {
    href: '/products/optifinish-manufactured',
    label: 'OptiFinish Manufactured',
    tag: 'In-house',
    desc: 'Complete powder coating lines and equipment designed and manufactured at our Greater Noida facility.',
    items: ['Powder Coating Plants', 'Curing Ovens', 'Spray Booths', 'SS Booth Systems'],
    mediaLabel: 'Manufactured equipment · image',
  },
  {
    href: '/products/automation',
    label: 'OptiFinish Automation',
    tag: 'Proprietary',
    desc: 'Proprietary automation products developed entirely in-house — Z-TAP, ZA01, and the Automatic Sieve Machine.',
    items: ['Z-TAP Robot System', 'ZA01 Reciprocator', 'Automatic Sieve Machine'],
    mediaLabel: 'Automation products · image',
  },
];

const BOTTOM_GROUPS = [
  {
    href: '/products/gema',
    label: 'GEMA',
    tag: 'Authorised Partner',
    subheading: 'World-leading powder coating equipment — guns, booths, reciprocators, and OptiCenter systems.',
    items: ['Manual Powder Guns', 'Automatic Guns', 'OptiCenter Systems', 'Reciprocators'],
    mediaLabel: 'GEMA equipment · image',
  },
  {
    href: '/products/durr',
    label: 'DÜRR',
    tag: 'Authorised Distributor',
    subheading: 'High-precision liquid coating systems for demanding industrial paint applications.',
    items: ['Liquid Coating Guns', 'EcoPump Systems', 'Liquid Coating Plants'],
    mediaLabel: 'DÜRR systems · image',
  },
  {
    href: '/products/vinayak',
    label: 'Vinayak Agencies',
    tag: 'Sister Concern',
    subheading: 'Catalogue supply of coating powders, consumables, and finishing materials.',
    items: ['Coating Powders', 'Touch-Up Paints', 'Adhesives'],
    mediaLabel: 'Products · image',
  },
];

export default function WhatWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const searchParams = useSearchParams();

  const [durrSlide, setDurrSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDurrSlide((s) => (s + 1) % DURR_SLIDES.length), 3200);
    return () => clearInterval(t);
  }, []);

  useHeadingAnimation({
    trigger: sectionRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
    body: bodyRef,
  });

  /* Scroll here when navigated from another page via /?scroll=whatweoffer */
  useEffect(() => {
    if (searchParams.get('scroll') !== 'whatweoffer') return;
    const el = sectionRef.current;
    if (!el) return;
    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + window.scrollY - 80;
    const distance = target - start;
    const duration = 1200;
    let startTime: number | null = null;
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    /* Small delay so page paint settles first */
    const timer = setTimeout(() => requestAnimationFrame(step), 350);
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <section ref={sectionRef} id="what-we-offer" className="relative overflow-hidden bg-[#070809] py-20 md:py-28">

      {/* Subtle dark grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="overflow-hidden pb-[0.15em]">
            <span
              ref={eyebrowRef}
              className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55"
              style={{ willChange: 'transform, opacity' }}
            >
              Products
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.65rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
            <div className="overflow-hidden pb-[0.15em]">
              <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                What we offer,
              </span>
            </div>
            <div className="overflow-hidden pb-[0.15em]">
              <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>
                clearly organised.
              </span>
            </div>
          </h2>
          <p
            ref={bodyRef}
            className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-white/35"
            style={{ willChange: 'transform, opacity' }}
          >
            Five distinct product groups — two built entirely by us, two from world-class
            partners, one through our sister concern.
          </p>
        </div>

        {/* Top row */}
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          {TOP_GROUPS.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col overflow-hidden rounded-[1.2rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#FECE00]/[0.14]"
            >
              <div className="flex flex-col gap-3 p-5">
                <span className="self-start rounded-full bg-[#FECE00] px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-ink">
                  {g.tag}
                </span>
                <h3 className="font-display text-[1.15rem] font-black leading-tight tracking-tight text-white">
                  {g.label}
                </h3>
                <p className="text-[0.75rem] leading-relaxed text-white/40">{g.desc}</p>
                <ul className="flex flex-col gap-1 border-t border-white/[0.06] pt-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[0.68rem] font-medium text-white/45">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FECE00]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/25 transition-colors group-hover:text-[#FECE00]">
                  View range <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
              <div className="relative mt-auto overflow-hidden">
                <div className="flex aspect-[16/9] w-full items-center justify-center bg-white/[0.03]">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/20">
                    {g.mediaLabel}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid gap-4 md:grid-cols-3">
          {BOTTOM_GROUPS.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col overflow-hidden rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.1]"
            >
              <div className="flex flex-col gap-3 p-5">
                <span className="self-start rounded-full border border-white/[0.1] bg-white/[0.05] px-2.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/45">
                  {g.tag}
                </span>
                <h3 className="font-display text-[1.1rem] font-black leading-tight tracking-tight text-white">
                  {g.label}
                </h3>
                <p className="text-[0.72rem] leading-relaxed text-white/35">{g.subheading}</p>
                <ul className="flex flex-col gap-1 border-t border-white/[0.06] pt-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[0.68rem] font-medium text-white/40">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FECE00]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/25 transition-colors group-hover:text-[#FECE00]">
                  View range <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Media slot — carousel for DÜRR, placeholder for others */}
              <div className="relative mt-auto overflow-hidden">
                {g.href === '/products/durr' ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {DURR_SLIDES.map((slide, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: i === durrSlide ? 1 : 0 }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.label}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>
                    ))}
                    {/* Label */}
                    <div className="absolute bottom-2 left-3 z-10">
                      <span className="rounded-full bg-black/35 px-2 py-0.5 text-[0.48rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                        {DURR_SLIDES[durrSlide].label}
                      </span>
                    </div>
                    {/* Dot indicators */}
                    <div className="absolute bottom-2 right-3 z-10 flex gap-1">
                      {DURR_SLIDES.map((_, i) => (
                        <span
                          key={i}
                          className={`block h-1 rounded-full transition-all duration-300 ${
                            i === durrSlide ? 'w-3 bg-white' : 'w-1 bg-white/35'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-white/[0.03]">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/20">
                      {g.mediaLabel}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
