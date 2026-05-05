'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1] as const;

function PulseBullet() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-[#FECE00]"
        animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.4 }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FECE00]" />
    </span>
  );
}

const STATS = [
  { value: '14+',  label: 'Years',         sub: 'Industrial experience' },
  { value: '500+', label: 'Installations', sub: 'Across India'          },
];

export default function HeroDark() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080a0c]">

      {/* ── Yellow grid — same 72px grid, yellow lines on dark ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Grid fade — vignette so grid fades at edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(8,10,12,0.85) 100%)',
        }}
      />

      {/* Grid diagonal sweep — Z-TAP style, repeats on interval */}
      <div className="grid-sweep pointer-events-none absolute inset-0" />

      {/* Yellow glow — centre top */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#FECE00]/[0.025] blur-[120px]" />
      {/* Accent glow bottom right */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#FECE00]/[0.01] blur-[100px]" />

      {/* Centring shell */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pb-44 pt-24 md:px-8">

        {/* ── Hero content — CSS animations so visible before JS hydration ── */}
        <div
          className="relative w-full text-center"
          style={{ animation: 'hero-item-in 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          {/* yellow glow behind copy */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FECE00]/[0.025] blur-[100px]" />
          {/* Kicker */}
          <div
            className="mb-8 flex items-center justify-center gap-2.5"
            style={{ animation: 'hero-item-in 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
          >
            <PulseBullet />
            <span style={{ fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
              Value Added Coating Solutions Pvt. Ltd.
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-[clamp(1.75rem,5.5vw,5rem)] font-black leading-[0.9] tracking-[-0.045em] text-white"
            style={{ animation: 'hero-item-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both' }}
          >
            Manufactured systems.{' '}
            <br className="hidden sm:block" />
            <span style={{ color: '#FECE00' }}>Proprietary automation.</span>
            <br className="hidden sm:block" />
            Expert <span style={{ color: '#FECE00' }}>coating</span> solutions.
          </h1>

          {/* Subtext */}
          <p
            className="mx-auto mt-6 max-w-[640px] text-[0.82rem] leading-relaxed tracking-[0.01em] text-white/35 md:mt-8 md:text-[0.95rem] md:leading-[1.9]"
            style={{ animation: 'hero-item-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.28s both' }}
          >
            OptiFinish designs and manufactures complete powder coating lines,
            develops proprietary automation products, and is an authorised
            partner for GEMA and DURR — backed by 14+ years of industrial experience.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animation: 'hero-item-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.38s both' }}
          >
            <Link href="/products" className="panel-button dynamic-button dynamic-button-yellow">
              <span>Explore Products</span>
              <div className="dynamic-button-glow" />
            </Link>
            <Link href="/contact" className="panel-button dynamic-button dynamic-button-light text-ink">
              <span>Get in Touch</span>
              <div className="dynamic-button-glow" />
            </Link>
          </div>
        </div>

        {/* ── Floating authority stripe ── */}
        <div
          className="absolute inset-x-5 bottom-12 md:inset-x-10 md:bottom-14 lg:inset-x-12"
          style={{ animation: 'hero-item-in 0.65s cubic-bezier(0.22,1,0.36,1) 0.48s both' }}
        >
          <div className="overflow-hidden rounded-[1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.04] shadow-[0_-6px_40px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-md">

            {/* top yellow accent line */}
            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#FECE00]/50 to-transparent" />

            {/* Mobile: 2×2 grid · Desktop: horizontal flex */}
            <div className="grid grid-cols-2 divide-x divide-y divide-[#FECE00]/[0.06] md:flex md:divide-y-0 md:items-stretch md:divide-x">

              {STATS.map(({ value, label, sub }) => (
                <div key={value} className="flex flex-1 flex-col justify-center gap-0.5 px-4 py-3.5 md:px-6 md:py-5 lg:px-8">
                  <div className="flex items-baseline gap-1.5">
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {value}
                    </span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.01em' }}>
                      {label}
                    </span>
                  </div>
                  <span className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-[#FECE00]/50">
                    {sub}
                  </span>
                </div>
              ))}

              {/* GEMA */}
              <div className="flex flex-1 items-center gap-2.5 px-4 py-3.5 md:gap-3.5 md:px-6 md:py-5 lg:px-8">
                <Image
                  src="/images/logos/logo.png"
                  alt="GEMA"
                  width={80}
                  height={40}
                  className="h-10 w-auto shrink-0 object-contain md:h-14"
                />
                <span className="text-[0.48rem] font-semibold uppercase leading-tight tracking-[0.13em] text-[#FECE00]/50 md:whitespace-nowrap md:text-[0.53rem]">Authorised<br className="md:hidden" /> partner</span>
              </div>

              {/* DÜRR */}
              <div className="flex flex-1 items-center gap-2.5 px-4 py-3.5 md:gap-3.5 md:px-6 md:py-5 lg:px-8">
                <Image
                  src="/images/logos/duerr-logo-RGB.png"
                  alt="DÜRR"
                  width={64}
                  height={32}
                  className="h-6 w-auto shrink-0 object-contain brightness-0 invert md:h-7"
                />
                <span className="text-[0.48rem] font-semibold uppercase leading-tight tracking-[0.13em] text-[#FECE00]/50 md:whitespace-nowrap md:text-[0.53rem]">Authorised<br className="md:hidden" /> distributor</span>
              </div>

              <div className="hidden items-center px-7 md:flex">
                <span className="whitespace-nowrap rounded-full border border-[#FECE00]/20 bg-[#FECE00]/[0.07] px-4 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.18em] text-[#FECE00]/55">
                  Est. 2011 · Noida
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
