'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

/* ─── Slide data ─────────────────────────────────────────────── */

const MANUFACTURED_SLIDES = [
  { src: '/images/products/optifinish-manufactured/powder-coating-plant/plant2.jpeg',                             label: 'Conveyorised Powder Coating Line' },
  { src: '/images/products/optifinish-manufactured/curing-oven/industrial_oven.png',                              label: 'Gas-Fired Curing Oven' },
  { src: '/images/products/spray-booth/automatic/automatic-booth-inside.jpeg',                                    label: 'Automatic Spray Booth — Interior' },
  { src: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',                            label: 'SS-304 Pollution-Free Booth' },
  { src: '/images/products/optifinish-manufactured/liquid-spray-booth/car-painting-booth.jpg',                    label: 'Liquid Spray Booth' },
  { src: '/images/products/optifinish-manufactured/cyclone-dust-collector/dust-collector-cyclone-01.png',         label: 'Cyclone & Dust Collector' },
  { src: '/images/products/optifinish-manufactured/pt-line/product-shots/pt_line1.png',                           label: 'Pretreatment Line — Full Installation' },
];

const AUTOMATION_SLIDES = [
  { src: '/images/products/sieve-machine/sieve-machine-04.jpg', label: 'PS Vibratory Sieve Machine' },
  { src: '/images/products/sieve-machine/sieve-machine-02.jpg', label: 'Sieve Machine — Detail View' },
  { src: '/images/products/sieve-machine/sieve-machine-03.jpg', label: 'Sieve Machine — In Use' },
];

const GEMA_SLIDES = [
  { src: '/images/products/gema/manual-gun/homepage-img.jpg',                          label: 'OptiFlex Pro — Manual Gun',      position: 'object-left' },
  { src: '/images/products/gema/automatic-gun/optigun-ga04.png',                       label: 'OptiGun GA04 — Automatic Gun',   position: 'object-left' },
  { src: '/images/products/gema/opticentre/gema-opticenter-oc07-oc08-01.jpg',           label: 'OptiCenter OC07 / OC08',         position: 'object-[35%_50%]' },
  { src: '/images/products/gema/reciprocators/gema-reciprocator-inuse-01.jpg',          label: 'Reciprocator — In Operation' },
  { src: '/images/products/gema/opticentre/gema-opticenter-colorchange-01.jpg',         label: 'OptiCenter — Color Change' },
];

const DURR_SLIDES_MOBILE = [
  { src: '/images/products/durr/hvlp-gun/hvlp.png',                                label: 'EcoGun HVLP — Spray Gun',         contain: true, bg: '#f5f5f5' },
  { src: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',         label: 'EcoGun AA — Air Assist Auto' },
  { src: '/images/products/durr/electrostatic-gun/durr-ecogun-ec-01.webp',          label: 'EcoGun EC — Electrostatic Gun',   contain: true, bg: '#e8eff8' },
  { src: '/images/products/durr/cup-gun/ecogun_910_durr.jpg',                       label: 'EcoGun 910 — Cup Gun' },
  { src: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-vp.webp',           label: 'EcoPump VP — Pump System' },
  { src: '/images/products/durr/bell-atomiser/durr-ecobell3-01.webp',               label: 'EcoBell3 — Rotary Atomiser' },
];

const DURR_SLIDES_DESKTOP = [
  { src: '/images/products/durr/hvlp-gun/hvlp.png',                               label: 'EcoGun HVLP — Spray Gun', contain: true, bg: '#0a0a0a' },
  { src: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',        label: 'EcoGun AA — Air Assist Auto' },
  { src: '/images/products/durr/electrostatic-gun/durr-ecogun-ec-01.webp',         label: 'EcoGun EC — Electrostatic Gun', contain: true, bg: '#0d1a2e' },
  { src: '/images/products/durr/cup-gun/ecogun_910_durr.jpg',                      label: 'EcoGun 910 — Cup Gun' },
  { src: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-vp.webp',          label: 'EcoPump VP — Pump System' },
  { src: '/images/products/durr/bell-atomiser/durr-ecobell3-01.webp',               label: 'EcoBell3 — Rotary Atomiser' },
];

const VINAYAK_SLIDES_MOBILE = [
  { src: '/images/products/vinayak/applicator.jpg',                                        label: 'Industrial Paint Application' },
  { src: '/images/products/vinayak/powder-paints/powder-optifinish-ou6fj3aa340eugh1kkz0yz9yhfm73ery5inqr04248.jpg.webp', label: 'Powder Coatings — In Stock' },
  { src: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',      label: 'Nerolac Liquid Industrial Paints' },
  { src: '/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp',                  label: 'PU Enamel — Metal Application' },
  { src: '/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp',          label: 'Touch-Up Paints' },
  { src: '/images/products/vinayak/adhesives/adhesives-hero.webp',                         label: 'NeroFix Adhesives', contain: true, bg: '#e8f2e0' },
];

const VINAYAK_SLIDES_DESKTOP = [
  { src: '/images/products/vinayak/applicator.jpg',                                       label: 'Industrial Paint Application' },
  { src: '/images/products/vinayak/powder-paints/powder-optifinish-ou6fj3aa340eugh1kkz0yz9yhfm73ery5inqr04248.jpg.webp', label: 'Powder Coatings — In Stock' },
  { src: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',     label: 'Nerolac Liquid Industrial Paints' },
  { src: '/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp',                 label: 'PU Enamel — Metal Application' },
  { src: '/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp',         label: 'Touch-Up Paints' },
  { src: '/images/products/vinayak/adhesives/adhesives-hero.webp',                            label: 'NeroFix Adhesives', contain: true, bg: '#8CC63E' },
];

/* ─── Mobile card data ───────────────────────────────────────── */

const ROW_ONE = [
  {
    href: '/products/optifinish-manufactured',
    label: 'OptiFinish Manufactured',
    tag: 'In-house built',
    flag: '🇮🇳',
    logo: '/images/logos/optifinish-logo.png',
    logoIsRound: true,
    desc: 'Complete powder coating lines and equipment designed and manufactured at our Greater Noida facility.',
    items: ['Powder Coating Plants', 'Curing Ovens', 'Powder & Liquid Spray Booths', 'SS Booth Systems', 'PT Lines & Dust Collectors'],
    slides: MANUFACTURED_SLIDES,
  },
  {
    href: '/products/automation',
    label: 'OptiFinish Automation',
    tag: 'Proprietary',
    flag: '🇮🇳',
    logo: '/images/logos/optifinish-logo.png',
    logoIsRound: true,
    desc: 'Proprietary automation products developed entirely in-house — Z-TAP, ZA01, and the Automatic Sieve Machine.',
    items: ['Z-TAP Robot System', 'ZA01 Reciprocator', 'Automatic Sieve Machine'],
    slides: AUTOMATION_SLIDES,
  },
];

const ROW_TWO = [
  {
    href: '/products/gema',
    label: 'GEMA',
    tag: 'Authorised Partner',
    flag: '🇨🇭',
    logo: '/images/logos/gema_logo.png',
    logoIsRound: false,
    desc: 'World-leading powder coating equipment — guns, PP booths, reciprocators, and OptiCenter systems.',
    items: ['Manual Powder Guns', 'Automatic Guns', 'OptiCenter Systems', 'Reciprocators', 'Plastic / PP Booth'],
    slides: GEMA_SLIDES,
  },
  {
    href: '/products/durr',
    label: 'DÜRR',
    tag: 'Authorised Distributor',
    flag: '🇩🇪',
    logo: '/images/logos/duerr-logo-rgb.png',
    logoIsRound: false,
    desc: 'High-precision liquid coating systems for demanding industrial paint applications.',
    items: ['Liquid Coating Guns', 'EcoPump Systems', 'Liquid Coating Plants'],
    slides: DURR_SLIDES_MOBILE,
  },
  {
    href: '/products/vinayak',
    label: 'Vinayak Agencies',
    tag: 'Sister Concern',
    flag: '🇮🇳',
    logo: null,
    logoIsRound: false,
    desc: 'Catalogue supply of coating powders, consumables, and finishing materials.',
    items: ['Coating Powders', 'Touch-Up Paints', 'Adhesives'],
    slides: VINAYAK_SLIDES_MOBILE,
  },
];

/* ─── Desktop card data ──────────────────────────────────────── */

const OPTIFINISH_LOGO = '/images/logos/optifinish-logo.png';

const TOP_GROUPS = [
  {
    href: '/products/optifinish-manufactured',
    label: 'OptiFinish Manufactured',
    tag: 'In-house',
    flag: '🇮🇳',
    desc: 'Complete powder coating lines and equipment designed and manufactured at our Greater Noida facility.',
    items: ['Powder Coating Plants', 'Curing Ovens', 'Powder & Liquid Spray Booths', 'SS Booth Systems', 'PT Lines & Dust Collectors'],
    slides: MANUFACTURED_SLIDES,
    mediaLabel: 'Manufactured equipment · image',
  },
  {
    href: '/products/automation',
    label: 'OptiFinish Automation',
    tag: 'Proprietary',
    flag: '🇮🇳',
    desc: 'Proprietary automation products developed entirely in-house — Z-TAP, ZA01, and the Automatic Sieve Machine.',
    items: ['Z-TAP Robot System', 'ZA01 Reciprocator', 'Automatic Sieve Machine'],
    slides: null as typeof MANUFACTURED_SLIDES | null,
    mediaLabel: 'Automation products · image',
  },
];

const BOTTOM_GROUPS = [
  {
    href: '/products/gema',
    label: 'GEMA',
    tag: 'Authorised Partner',
    flag: '🇨🇭',
    logo: '/images/logos/gema_logo.png',
    subheading: 'World-leading powder coating equipment — guns, PP booths, reciprocators, and OptiCenter systems.',
    items: ['Manual Powder Guns', 'Automatic Guns', 'OptiCenter Systems', 'Reciprocators', 'Plastic / PP Booth'],
    slides: GEMA_SLIDES,
  },
  {
    href: '/products/durr',
    label: 'DÜRR',
    tag: 'Authorised Distributor',
    flag: '🇩🇪',
    logo: '/images/logos/duerr-logo-rgb.png',
    subheading: 'High-precision liquid coating systems for demanding industrial paint applications.',
    items: ['Liquid Coating Guns', 'EcoPump Systems', 'Liquid Coating Plants'],
    slides: DURR_SLIDES_DESKTOP,
  },
  {
    href: '/products/vinayak',
    label: 'Vinayak Agencies',
    tag: 'Sister Concern',
    flag: '🇮🇳',
    logo: null as string | null,
    subheading: 'Catalogue supply of coating powders, consumables, and finishing materials.',
    items: ['Coating Powders', 'Touch-Up Paints', 'Adhesives'],
    slides: VINAYAK_SLIDES_DESKTOP,
  },
];

/* ─── Mobile HScroll row component ──────────────────────────────────── */

function HScrollRow({
  groups,
  slideIndexes,
  cardWidthClass,
}: {
  groups: typeof ROW_ONE | typeof ROW_TWO;
  slideIndexes: number[];
  cardWidthClass: string;
}) {
  return (
    <div
      className="carousel-track flex gap-3.5 overflow-x-auto pb-1"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {/* Leading spacer — more reliable than padding-left inside overflow:hidden parents on iOS */}
      <div className="w-5 flex-shrink-0 md:w-8" />
      {groups.map((g, gi) => (
        <Link
          key={g.href}
          href={g.href}
          className={`group flex flex-col overflow-hidden rounded-[1.4rem] border border-black/[0.07] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] flex-shrink-0 ${cardWidthClass}`}
          style={{ scrollSnapAlign: 'start' }}
        >
          {/* Card top — text content */}
          <div className="flex flex-col gap-3 py-5 pl-7 pr-5">

            {/* Tag row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-[#FECE00] px-2.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">
                  {g.tag}
                </span>
                <span
                  className="leading-none opacity-60"
                  style={{
                    fontSize: g.flag === '🇨🇭' ? '1.0rem' : '0.82rem',
                    display: 'inline-block',
                    transform: g.flag === '🇨🇭' ? 'scaleX(1.2)' : undefined,
                  }}
                >
                  {g.flag}
                </span>
              </div>
              {g.logo && (
                g.logoIsRound ? (
                  <div className="relative h-7 w-7 overflow-hidden rounded-full border border-black/[0.1]">
                    <Image src={g.logo} alt={g.label} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-7 items-center rounded-md bg-white px-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                    <Image src={g.logo} alt={g.label} width={72} height={22} className="h-[15px] w-auto object-contain" />
                  </div>
                )
              )}
            </div>

            {/* Title */}
            <h3 className="font-display text-[1.12rem] font-black leading-tight tracking-tight text-[#0a0a0a]">
              {g.label}
            </h3>

            {/* Description */}
            <p className="text-[0.72rem] leading-relaxed text-[#0a0a0a]/50">{g.desc}</p>

            {/* Items */}
            <ul className="flex flex-col gap-1 border-t border-black/[0.06] pt-3">
              {g.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[0.68rem] font-medium text-[#0a0a0a]/45">
                  <span className="h-[4px] w-[4px] flex-shrink-0 rounded-full bg-[#FECE00]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]/25 transition-colors group-hover:text-[#0a0a0a]/60">
              View range <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>

          {/* Card bottom — image carousel */}
          <div className="relative mt-auto px-4 pb-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1rem] bg-[#f0eeeb]">
              {g.slides.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: i === slideIndexes[gi] ? 1 : 0,
                    backgroundColor: (slide as { bg?: string }).bg ?? '#f0eeeb',
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    className={(slide as { contain?: boolean }).contain ? 'object-contain p-4' : `object-cover ${(slide as { position?: string }).position ?? 'object-center'}`}
                    sizes="(max-width: 768px) 90vw, 40vw"
                    priority={gi === 0 && i === 0}
                  />
                </div>
              ))}

              {/* Slide label */}
              <div className="absolute bottom-2 left-3 z-10">
                <span className="rounded-full bg-black/20 px-2 py-0.5 text-[0.48rem] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                  {g.slides[slideIndexes[gi]].label}
                </span>
              </div>

              {/* Slide dots */}
              <div className="absolute bottom-2 right-3 z-10 flex gap-1">
                {g.slides.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-[3px] rounded-full transition-all duration-300 ${
                      i === slideIndexes[gi] ? 'w-3 bg-white' : 'w-[3px] bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* Trailing spacer */}
      <div className="w-5 flex-shrink-0 md:w-8" />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

export default function WhatWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const searchParams = useSearchParams();

  /* Mobile slide state */
  const [row1Slides, setRow1Slides] = useState(() => ROW_ONE.map(() => 0));
  const [row2Slides, setRow2Slides] = useState(() => ROW_TWO.map(() => 0));

  /* Desktop slide state */
  const [slides, setSlides] = useState(() => BOTTOM_GROUPS.map(() => 0));
  const [topSlides, setTopSlides] = useState(() => TOP_GROUPS.map(() => 0));

  useEffect(() => {
    const t = setInterval(() => {
      /* Mobile */
      setRow1Slides(prev => prev.map((idx, gi) => (idx + 1) % ROW_ONE[gi].slides.length));
      setRow2Slides(prev => prev.map((idx, gi) => (idx + 1) % ROW_TWO[gi].slides.length));
      /* Desktop */
      setSlides((prev) =>
        prev.map((idx, gi) => (idx + 1) % BOTTOM_GROUPS[gi].slides.length)
      );
      setTopSlides((prev) =>
        prev.map((idx, gi) => {
          const s = TOP_GROUPS[gi].slides;
          return s ? (idx + 1) % s.length : 0;
        })
      );
    }, 3200);
    return () => clearInterval(t);
  }, []);

  useHeadingAnimation({
    trigger: sectionRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
    body: bodyRef,
  });

  useEffect(() => {
    if (searchParams.get('scroll') !== 'whatweoffer') return;
    const el = sectionRef.current;
    if (!el) return;
    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + window.scrollY - 80;
    const distance = target - start;
    const duration = 1200;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timer = setTimeout(() => requestAnimationFrame(step), 350);
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <section ref={sectionRef} id="what-we-offer" className="relative overflow-hidden bg-[#070809] py-14 md:py-28">

      {/* Subtle dark grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Shared header ── */}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 md:mb-12">
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
      </div>

      {/* ── Mobile layout — horizontal scroll rows ── */}
      <div className="relative md:hidden">

        {/* Row 1 — OptiFinish Manufactured + Automation */}
        <div className="mb-3.5">
          <div className="mb-3 px-5">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#FECE00]">OptiFinish</span>
          </div>
          <HScrollRow
            groups={ROW_ONE}
            slideIndexes={row1Slides}
            cardWidthClass="w-[82vw]"
          />
        </div>

        {/* Row 2 — GEMA + DÜRR + Vinayak */}
        <div>
          <div className="mb-3 px-5">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#FECE00]">Partners & Associates</span>
          </div>
          <HScrollRow
            groups={ROW_TWO}
            slideIndexes={row2Slides}
            cardWidthClass="w-[82vw]"
          />
        </div>

      </div>

      {/* ── Desktop layout — dark grid cards ── */}
      <div className="relative mx-auto hidden max-w-7xl px-8 md:block">

        {/* Top row */}
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          {TOP_GROUPS.map((g, gi) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col overflow-hidden rounded-[1.2rem] border border-[#FECE00]/[0.22] bg-[#FECE00]/[0.06] transition-all duration-300 hover:-translate-y-1 hover:border-[#FECE00]/[0.35] hover:bg-[#FECE00]/[0.09]"
            >
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="self-start rounded-full bg-[#FECE00] px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-ink">
                      {g.tag}
                    </span>
                    {g.flag && (
                      <span
                        className="leading-none opacity-55"
                        style={{
                          fontSize: g.flag === '🇨🇭' ? '1.05rem' : '0.85rem',
                          display: 'inline-block',
                          transform: g.flag === '🇨🇭' ? 'scaleX(1.2)' : undefined,
                        }}
                      >
                        {g.flag}
                      </span>
                    )}
                  </div>
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#FECE00]/20">
                    <Image src={OPTIFINISH_LOGO} alt="OptiFinish" fill className="object-cover" />
                  </div>
                </div>
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
                {g.slides ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-t border-[#FECE00]/[0.1]">
                    {g.slides.map((slide, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: i === topSlides[gi] ? 1 : 0, backgroundColor: '#0a0a0a' }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.label}
                          fill
                          className="object-cover object-center"
                          sizes="50vw"
                          priority={gi === 0 && i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>
                    ))}
                    <div className="absolute bottom-2 left-3 z-10">
                      <span className="rounded-full bg-black/35 px-2 py-0.5 text-[0.48rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                        {g.slides[topSlides[gi]].label}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-3 z-10 flex gap-1">
                      {g.slides.map((_, i) => (
                        <span
                          key={i}
                          className={`block h-1 rounded-full transition-all duration-300 ${
                            i === topSlides[gi] ? 'w-3 bg-white' : 'w-1 bg-white/35'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-[#FECE00]/[0.04] border-t border-[#FECE00]/[0.1]">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
                      {g.mediaLabel}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid gap-4 md:grid-cols-3">
          {BOTTOM_GROUPS.map((g, gi) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col overflow-hidden rounded-[1.2rem] border border-white/[0.14] bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.22] hover:bg-white/[0.09]"
            >
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="self-start rounded-full border border-white/[0.18] bg-white/[0.1] px-2.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/65">
                      {g.tag}
                    </span>
                    {g.flag && (
                      <span
                        className="leading-none opacity-50"
                        style={{
                          fontSize: g.flag === '🇨🇭' ? '1.05rem' : '0.85rem',
                          display: 'inline-block',
                          transform: g.flag === '🇨🇭' ? 'scaleX(1.2)' : undefined,
                        }}
                      >
                        {g.flag}
                      </span>
                    )}
                  </div>
                  {g.logo && (
                    <div className="flex h-7 items-center rounded-md bg-white px-2">
                      <Image src={g.logo} alt={g.label} width={56} height={18} className="h-[14px] w-auto object-contain" />
                    </div>
                  )}
                </div>
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

              {/* Image carousel */}
              <div className="relative mt-auto overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {g.slides.map((slide, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: i === slides[gi] ? 1 : 0, backgroundColor: (slide as { bg?: string }).bg ?? '#0a0a0a' }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.label}
                        fill
                        className={(slide as { contain?: boolean }).contain ? 'object-contain p-4' : 'object-cover object-center'}
                        sizes="33vw"
                        priority={gi === 0 && i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  ))}
                  <div className="absolute bottom-2 left-3 z-10">
                    <span className="rounded-full bg-black/35 px-2 py-0.5 text-[0.48rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                      {g.slides[slides[gi]].label}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-3 z-10 flex gap-1">
                    {g.slides.map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 rounded-full transition-all duration-300 ${
                          i === slides[gi] ? 'w-3 bg-white' : 'w-1 bg-white/35'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
