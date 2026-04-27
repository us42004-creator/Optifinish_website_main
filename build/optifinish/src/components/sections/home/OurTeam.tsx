'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'Harish Sharma',
    role: 'Director & Co-Founder',
    bio: 'Bio placeholder — background, expertise, vision.',
    src: '/images/Team/harish_sharma(1).png',
  },
  {
    name: 'Lalit Tayal',
    role: 'Director & Co-Founder',
    bio: 'Bio placeholder — background, expertise, vision.',
    src: '/images/Team/lalit_tayal.jpg',
  },
];


// Bento layout — 10-col × 9-row grid (90 spaces)
// heading (3×3 = 9 spaces) pinned near centre, 75 auto-placed 1×1 member cells
type BentoCell = {
  size: 1 | 2 | 3;
  isHeading?: boolean;
  colStart?: number;
  rowStart?: number;
};

const BENTO_LAYOUT: BentoCell[] = [
  { size: 3, isHeading: true, colStart: 4, rowStart: 4 }, // heading — centre (cols 4–6, rows 4–6)
  ...Array.from({ length: 81 }, () => ({ size: 1 as const })),
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function OurTeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bentoVisible, setBentoVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Panels rotate from 0° → ±90° between 5%–80% scroll progress
  const leftRotate           = useTransform(scrollYProgress, [0.05, 0.8], [0, -90]);
  const rightRotate          = useTransform(scrollYProgress, [0.05, 0.8], [0, 90]);
  const hintOpacity          = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const foundersLabelOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Trigger bento stagger animation once panels are well open
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setBentoVisible(v > 0.28);
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#070809]">

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* ────────────────────────────────────────────────
            LAYER 0 — Full-page "Our Family" bento
            Heading lives inside the first tile.
            Each cell animates in with stagger on scroll trigger.
        ──────────────────────────────────────────────── */}
        <div className="absolute inset-0 p-2 pt-16">
          <AnimatePresence>
            {bentoVisible && (
              <motion.div
                key="bento"
                initial="hidden"
                animate="visible"
                exit="hidden"
                // 9 cols × 5 rows — rows fill full height evenly
                className="grid h-full w-full grid-cols-10 grid-rows-9 gap-2"
              >
                {BENTO_LAYOUT.map((cell, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.7, y: 18 },
                      visible: (idx: number) => ({
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 380,
                          damping: 22,
                          delay: idx * 0.022,
                        },
                      }),
                    }}
                    className={`overflow-hidden rounded-[0.75rem] ${
                      cell.isHeading
                        ? 'bg-[#FECE00] border-0'
                        : 'border border-white/[0.06] bg-white/[0.02]'
                    }`}
                    style={{
                      gridColumn: cell.colStart
                        ? `${cell.colStart} / span ${cell.size}`
                        : `span ${cell.size}`,
                      gridRow: cell.rowStart
                        ? `${cell.rowStart} / span ${cell.size}`
                        : `span ${cell.size}`,
                    }}
                  >
                    {cell.isHeading ? (
                      /* ── Heading tile — yellow bg, dark text ── */
                      <div className="flex h-full flex-col justify-between p-5">
                        <div>
                          <span className="mb-2 block text-[0.5rem] font-bold uppercase tracking-[0.26em] text-[#070809]/50">
                            Our Family
                          </span>
                          <h2 className="font-display text-[clamp(1.7rem,3vw,2.8rem)] font-black leading-[0.88] tracking-[-0.06em] text-[#070809]" style={{ fontWeight: 900 }}>
                            Faces behind the finish.
                          </h2>
                        </div>
                        <div className="flex flex-col gap-2 border-t border-[#070809]/[0.12] pt-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-[1.2rem] font-black text-[#070809]">75+</span>
                            <span className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-[#070809]/55">
                              Team members
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-[1.2rem] font-black text-[#070809]">14+</span>
                            <span className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-[#070809]/55">
                              Years together
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ── Member tile — dark media placeholder ── */
                      <div className="flex h-full w-full flex-col bg-white/[0.02]">
                        <div className="flex flex-1 items-center justify-center">
                          <span className="text-white/10" style={{ fontSize: cell.size === 2 ? '2rem' : '0.9rem' }}>◎</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ────────────────────────────────────────────────
            LAYER 1 — Left founder panel
            Hinge: left edge · Rotates: 0° → -90°
            Drop headshot at: public/images/team/harish-sharma.jpg
        ──────────────────────────────────────────────── */}
        <div
          className="absolute inset-y-0 left-0 z-20 w-1/2"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            className="relative h-full w-full border-r border-white/[0.12] bg-[#070809]"
            style={{ rotateY: leftRotate, transformOrigin: 'left center' }}
          >
            {/* Hero image — full bleed */}
            <Image
              src={FOUNDERS[0].src}
              alt={FOUNDERS[0].name}
              fill
              className="object-cover object-top"
              unoptimized
              priority
            />

            {/* Yellow tint */}
            <div className="absolute inset-0 bg-[#FECE00]/20 mix-blend-multiply" />

            {/* Scrim: strong at bottom for text, subtle at top */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/40 to-transparent" />

            {/* Name — bottom-left */}
            <div className="absolute bottom-10 left-8 z-10">
              <p className="font-display text-[1.35rem] font-black tracking-tight text-white drop-shadow-md">
                {FOUNDERS[0].name}
              </p>
              <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#FECE00]/80">
                {FOUNDERS[0].role}
              </p>
              <p className="mt-2 max-w-[18rem] text-[0.72rem] leading-relaxed text-white/45">
                {FOUNDERS[0].bio}
              </p>
            </div>

            {/* Right edge shadow */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent" />
          </motion.div>
        </div>

        {/* ────────────────────────────────────────────────
            LAYER 1 — Right founder panel
            Hinge: right edge · Rotates: 0° → +90°
            Drop headshot at: public/images/team/lalit-tayal.jpg
        ──────────────────────────────────────────────── */}
        <div
          className="absolute inset-y-0 right-0 z-20 w-1/2"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            className="relative h-full w-full bg-[#070809]"
            style={{ rotateY: rightRotate, transformOrigin: 'right center' }}
          >
            {/* Hero image — full bleed */}
            <Image
              src={FOUNDERS[1].src}
              alt={FOUNDERS[1].name}
              fill
              className="object-cover object-top"
              unoptimized
              priority
            />

            {/* Yellow tint */}
            <div className="absolute inset-0 bg-[#FECE00]/20 mix-blend-multiply" />

            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/40 to-transparent" />

            {/* Name — bottom-right */}
            <div className="absolute bottom-10 right-8 z-10 text-right">
              <p className="font-display text-[1.35rem] font-black tracking-tight text-white drop-shadow-md">
                {FOUNDERS[1].name}
              </p>
              <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#FECE00]/80">
                {FOUNDERS[1].role}
              </p>
              <p className="mt-2 max-w-[18rem] text-[0.72rem] leading-relaxed text-white/45">
                {FOUNDERS[1].bio}
              </p>
            </div>

            {/* Left edge shadow */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent" />
          </motion.div>
        </div>

        {/* ── "Our Founders" label — center top, fades out ── */}
        <motion.div
          style={{ opacity: foundersLabelOpacity }}
          className="pointer-events-none absolute left-1/2 top-8 z-30 -translate-x-1/2"
        >
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.28em] text-white/30">
            Our Founders
          </span>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-white/25">
              Scroll to reveal
            </span>
            <div className="h-5 w-px bg-white/20" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
