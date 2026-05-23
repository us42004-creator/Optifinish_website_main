'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

const ease = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  {
    id: 'ztap',
    href: '/products/automation/ztap',
    name: 'Z-TAP',
    tag: 'Flagship',
    tagline: 'Zero-touch robotic coating.',
    desc: 'Mimic a motion once — Z-TAP records, perfects, and replicates it flawlessly across every part. Powered by the Fairino FR5 robot platform with native GEMA gun integration.',
    specs: [
      'Motion mimic technology',
      'Fairino FR5 robot platform',
      'GEMA gun integration',
      'Full coating line compatible',
    ],
  },
  {
    id: 'za01',
    href: '/products/automation/za01',
    name: 'ZA01',
    tag: 'Reciprocator',
    tagline: 'Precision vertical automation.',
    desc: 'Proprietary reciprocator designed for consistent vertical gun movement across high-throughput lines. Engineered entirely in-house for reliability and process control.',
    specs: [
      'Vertical axis automation',
      'Adjustable stroke and speed',
      'Line-compatible mounting',
      'Low maintenance design',
    ],
  },
  {
    id: 'sieve',
    href: '/products/automation/sieve-machine',
    name: 'Sieve Machine',
    tag: 'Support Equipment',
    tagline: 'Automated powder preparation.',
    desc: 'Automated powder sieving for consistent mesh quality and reduced contamination. Eliminates manual handling at the input stage for clean, repeatable coating results.',
    specs: [
      'Continuous operation',
      'Consistent mesh output',
      'Reduced manual handling',
      'Compact footprint',
    ],
    heroImage: '/images/products/sieve-machine/sieve-machine-04.jpg',
    detailImage: '/images/products/sieve-machine/sieve-machine-02.jpg',
    inUseImage: '/images/products/sieve-machine/sieve-machine-03.jpg',
    heroImageContain: true,
  },
];

export default function ProprietaryAutomation() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLSpanElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const bodyRef      = useRef<HTMLParagraphElement>(null);

  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.34) setActive(0);
    else if (v < 0.67) setActive(1);
    else setActive(2);
  });

  useHeadingAnimation({
    trigger: containerRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
    body: bodyRef,
  });

  return (
    <section ref={containerRef} className="relative lg:h-[300vh]">

      {/* ── Sticky viewport ── */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden bg-[#f1efea] py-12 lg:py-0">

        {/* Grid drift layers */}
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

        {/* ── Vertically centred content ── */}
        <div className="relative flex lg:h-full lg:items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">

            {/* ══════════════════════════════════════════
                MOBILE layout — tab-card system (lg:hidden)
            ══════════════════════════════════════════ */}
            <div className="lg:hidden">

              {/* Header */}
              <div className="mb-6">
                <span className="mb-2 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                  OptiFinish Automation
                </span>
                <h2 className="font-display text-[clamp(2rem,7vw,3rem)] font-black leading-[0.96] tracking-[-0.04em] text-ink">
                  Built by us.<br />
                  <span style={{ color: '#FECE00' }}>Owned by us.</span>
                </h2>
                <p className="mt-3 max-w-sm text-[0.82rem] leading-relaxed text-ink/50">
                  Three proprietary products — designed, manufactured, and supported by OptiFinish.
                </p>
              </div>

              {/* Tab pills */}
              <div className="mb-5 flex gap-2">
                {PRODUCTS.map((p, i) => (
                  <button
                    key={p.id}
                    onTouchEnd={(e) => { e.preventDefault(); setActive(i); }}
                    onClick={() => setActive(i)}
                    style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    className={`rounded-full px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                      i === active
                        ? 'bg-ink text-white'
                        : 'border border-ink/[0.12] bg-ink/[0.04] text-ink/45'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Active product card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id + '-mobile'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease }}
                  className="overflow-hidden rounded-[1.4rem] border border-ink/[0.08] bg-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  {/* Hero image — only render if image exists */}
                  {product.heroImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f0f0f0]">
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'center 25%' }}
                        sizes="100vw"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-4 p-5">
                    {/* Tag + name + tagline */}
                    <div>
                      <span className="inline-block rounded-full bg-[#FECE00] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink">
                        {product.tag}
                      </span>
                      <h3 className="mt-2 font-display text-[1.7rem] font-black tracking-[-0.03em] text-ink">
                        {product.name}
                      </h3>
                      <p className="text-[0.78rem] font-semibold text-ink/50">{product.tagline}</p>
                    </div>

                    {/* Description */}
                    <p className="text-[0.8rem] leading-relaxed text-ink/50">{product.desc}</p>

                    {/* Specs */}
                    <ul className="flex flex-col gap-1.5 border-t border-ink/[0.15] pt-4">
                      {product.specs.map((s) => (
                        <li key={s} className="flex items-center gap-2.5 text-[0.72rem] font-medium text-ink/55">
                          <span className="h-[4px] w-[4px] flex-shrink-0 rounded-full bg-[#FECE00]" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="flex gap-2.5">
                      <Link
                        href={product.href}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white"
                      >
                        Learn more →
                      </Link>
                      <Link
                        href="/products/automation"
                        className="inline-flex items-center justify-center rounded-full border border-ink/[0.12] px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/40"
                      >
                        All
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* ══════════════════════════════════════════
                DESKTOP layout — sticky scroll (hidden lg:grid)
            ══════════════════════════════════════════ */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:items-end lg:gap-16">

              {/* ── LEFT col ── */}
              <div className="flex flex-col">

                {/* Eyebrow */}
                <div className="overflow-hidden pb-[0.15em]">
                  <span
                    ref={eyebrowRef}
                    className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    OptiFinish Automation
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
                  <div className="overflow-hidden pb-[0.15em]">
                    <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                      Built by us.
                    </span>
                  </div>
                  <div className="overflow-hidden pb-[0.15em]">
                    <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>
                      Owned by us.
                    </span>
                  </div>
                </h2>

                {/* Body */}
                <p
                  ref={bodyRef}
                  className="mt-4 text-[0.85rem] leading-relaxed text-ink/50"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Three proprietary products developed entirely in-house. No licensing, no OEM
                  dependency — designed, manufactured, and supported by OptiFinish.
                </p>

                {/* Clickable tabs */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {PRODUCTS.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActive(i)}
                      className={`rounded-full px-4 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                        i === active
                          ? 'bg-ink text-white'
                          : 'border border-ink/[0.12] bg-ink/[0.04] text-ink/45 hover:text-ink/70'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                {/* Animated product content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease }}
                    className="mt-6 flex flex-col gap-5"
                  >
                    <div>
                      <span className="inline-block rounded-full bg-[#FECE00] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink">
                        {product.tag}
                      </span>
                      <h3 className="mt-2 font-display text-[2rem] font-black tracking-[-0.03em] text-ink">
                        {product.name}
                      </h3>
                      <p className="text-[0.8rem] font-semibold text-ink/50">{product.tagline}</p>
                    </div>

                    <p className="text-[0.85rem] leading-[1.85] text-ink/50">{product.desc}</p>

                    <ul className="flex flex-col gap-2 border-t border-ink/[0.22] pt-4">
                      {product.specs.map((s) => (
                        <li key={s} className="flex items-center gap-3 text-[0.75rem] font-medium text-ink/55">
                          <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-[#FECE00]" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={product.href}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ink/85"
                      >
                        Learn more <span>→</span>
                      </Link>
                      <Link
                        href="/products/automation"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.12] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-ink/65"
                      >
                        View all automation
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── RIGHT col — media cards ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id + '-visual'}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.34, ease }}
                  className="flex flex-col gap-3"
                >
                  <div className="overflow-hidden rounded-[1.4rem] border border-ink/[0.07] bg-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <div className="relative aspect-[4/3] w-full bg-[#f0f0f0]">
                      {product.heroImage ? (
                        <Image src={product.heroImage} alt={product.name} fill className="object-cover" style={{ objectPosition: 'center 25%' }} sizes="55vw" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-ink/[0.03]">
                          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/20">Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { label: 'Detail view', key: 'detailImage' as const },
                      { label: 'In-use shot',  key: 'inUseImage'  as const },
                    ]).map(({ label, key }) => (
                      <div
                        key={label}
                        className="overflow-hidden rounded-[1.1rem] border border-ink/[0.07] bg-white/70 shadow-[0_4px_14px_rgba(0,0,0,0.05)]"
                      >
                        <div className="relative aspect-[4/3] w-full bg-[#f0f0f0]">
                          {product[key] ? (
                            <Image src={product[key]!} alt={label} fill className="object-cover object-center" sizes="27vw" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-ink/[0.03]">
                              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/20">Coming Soon</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* ── Scroll progress dots ── */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${PRODUCTS[i].name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-ink' : 'w-2 bg-ink/25 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
