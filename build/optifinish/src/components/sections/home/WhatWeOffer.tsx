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
  { src: '/images/products/gema/manual-gun/homepage-img.jpg',                          label: 'OptiFlex Pro — Manual Gun' },
  { src: '/images/products/gema/automatic-gun/optigun-ga04.png',                       label: 'OptiGun GA04 — Automatic Gun' },
  { src: '/images/products/gema/opticentre/gema-opticenter-oc07-oc08-01.jpg',           label: 'OptiCenter OC07 / OC08' },
  { src: '/images/products/gema/reciprocators/gema-reciprocator-inuse-01.jpg',          label: 'Reciprocator — In Operation' },
  { src: '/images/products/gema/opticentre/gema-opticenter-colorchange-01.jpg',         label: 'OptiCenter — Color Change' },
];

const DURR_SLIDES = [
  { src: '/images/products/durr/hvlp-gun/hvlp.png',                                label: 'EcoGun HVLP — Spray Gun',         contain: true, bg: '#f5f5f5' },
  { src: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',         label: 'EcoGun AA — Air Assist Auto' },
  { src: '/images/products/durr/electrostatic-gun/durr-ecogun-ec-01.webp',          label: 'EcoGun EC — Electrostatic Gun',   contain: true, bg: '#e8eff8' },
  { src: '/images/products/durr/cup-gun/ecogun_910_durr.jpg',                       label: 'EcoGun 910 — Cup Gun' },
  { src: '/images/products/durr/ecopump/csm_duerr-pumps-ecopump-vp.webp',           label: 'EcoPump VP — Pump System' },
  { src: '/images/products/durr/bell-atomiser/durr-ecobell3-01.webp',               label: 'EcoBell3 — Rotary Atomiser' },
];

const VINAYAK_SLIDES = [
  { src: '/images/products/vinayak/applicator.jpg',                                        label: 'Industrial Paint Application' },
  { src: '/images/products/vinayak/powder-paints/powder-optifinish-ou6fj3aa340eugh1kkz0yz9yhfm73ery5inqr04248.jpg.webp', label: 'Powder Coatings — In Stock' },
  { src: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',      label: 'Nerolac Liquid Industrial Paints' },
  { src: '/images/products/vinayak/pu-enamel/metal-fences-640w.jpg.webp',                  label: 'PU Enamel — Metal Application' },
  { src: '/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp',          label: 'Touch-Up Paints' },
  { src: '/images/products/vinayak/adhesives/adhesives-hero.webp',                         label: 'NeroFix Adhesives', contain: true, bg: '#e8f2e0' },
];

/* ─── Card data ──────────────────────────────────────────────── */

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
    slides: DURR_SLIDES,
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
    slides: VINAYAK_SLIDES,
  },
];

/* ─── HScroll row component ──────────────────────────────────── */

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
      style={{
        scrollSnapType: 'x mandatory',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
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
                  <div className="flex h-6 items-center rounded-md bg-[#0a0a0a] px-2">
                    <Image src={g.logo} alt={g.label} width={56} height={18} className="h-[13px] w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
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
          <div className="relative mt-auto overflow-hidden rounded-b-[1.4rem]">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f0eeeb]">
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
                    className={(slide as { contain?: boolean }).contain ? 'object-contain p-4' : 'object-cover object-center'}
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

      {/* Trailing spacer so last card snaps correctly */}
      <div className="w-3 flex-shrink-0" />
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

  const [row1Slides, setRow1Slides] = useState(() => ROW_ONE.map(() => 0));
  const [row2Slides, setRow2Slides] = useState(() => ROW_TWO.map(() => 0));

  useEffect(() => {
    const t = setInterval(() => {
      setRow1Slides(prev => prev.map((idx, gi) => (idx + 1) % ROW_ONE[gi].slides.length));
      setRow2Slides(prev => prev.map((idx, gi) => (idx + 1) % ROW_TWO[gi].slides.length));
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
    <section ref={sectionRef} id="what-we-offer" className="relative overflow-hidden bg-[#070809] py-14 md:py-24">

      {/* Subtle dark grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative">

        {/* Header */}
        <div className="mb-8 md:mb-10 px-5 md:px-8 mx-auto max-w-7xl">
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

        {/* Row 1 — OptiFinish Manufactured + Automation */}
        <div className="mb-3.5">
          <div className="mb-3 px-5 md:px-8">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#FECE00]">OptiFinish</span>
          </div>
          {/* negative margin trick so scroll bleeds edge-to-edge */}
          <div className="overflow-hidden">
            <HScrollRow
              groups={ROW_ONE}
              slideIndexes={row1Slides}
              cardWidthClass="w-[82vw] md:w-[44vw] lg:w-[420px]"
            />
          </div>
        </div>

        {/* Row 2 — GEMA + DÜRR + Vinayak */}
        <div>
          <div className="mb-3 px-5 md:px-8">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#FECE00]">Partners & Associates</span>
          </div>
          <div className="overflow-hidden">
            <HScrollRow
              groups={ROW_TWO}
              slideIndexes={row2Slides}
              cardWidthClass="w-[82vw] md:w-[38vw] lg:w-[360px]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
