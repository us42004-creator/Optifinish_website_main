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

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f1efea]">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,10,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Glows */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[#FECE00]/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#FECE00]/[0.04] blur-[100px]" />

      {/* Centring shell */}
      <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center px-5 py-24 md:px-10 lg:px-12">

        {/* ── Hero card — copy + authority together ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="noise relative w-full overflow-hidden rounded-[1.75rem] bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
        >
          {/* top yellow hairline */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FECE00]/55 to-transparent" />

          {/* inner yellow glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FECE00]/[0.12] blur-[90px]" />

          {/* Yellow grid inside card — base (always dim) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />

          {/* Grid diagonal sweep — Z-TAP style, repeats on interval */}
          <div className="grid-sweep pointer-events-none absolute inset-0" />

          {/* ── Copy section ── */}
          <div className="relative px-8 py-16 text-center md:px-16 md:py-20">

            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="mb-8 flex items-center justify-center gap-2.5"
            >
              <PulseBullet />
              <span style={{ fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                Value Added Coating Solutions Pvt. Ltd.
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.22 }}
              className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.9] tracking-[-0.045em] text-white"
            >
              Manufactured systems.{' '}
              <br className="hidden sm:block" />
              <span style={{ color: '#FECE00' }}>Proprietary automation.</span>
              <br className="hidden sm:block" />
              Expert <span style={{ color: '#FECE00' }}>coating</span> solutions.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.32 }}
              className="mx-auto mt-8 max-w-[640px] text-[0.95rem] leading-[1.9] tracking-[0.01em] text-white/38"
            >
              OptiFinish designs and manufactures complete powder coating lines,
              develops proprietary automation products, and is an authorised
              partner for GEMA and DURR — backed by 14+ years of industrial experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.42 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link href="/products" className="panel-button dynamic-button dynamic-button-yellow">
                <span>Explore Products</span>
                <div className="dynamic-button-glow" />
              </Link>
              <Link href="/contact" className="panel-button dynamic-button dynamic-button-light text-ink">
                <span>Get in Touch</span>
                <div className="dynamic-button-glow" />
              </Link>
            </motion.div>

            {/* ── Authority stripe — glass card style ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.52 }}
              className="mt-8"
            >
              <div className="overflow-hidden rounded-[0.85rem] border border-[#FECE00]/[0.1] bg-[#FECE00]/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm">

                {/* top yellow accent line */}
                <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#FECE00]/50 to-transparent" />

                <div className="flex items-stretch divide-x divide-[#FECE00]/[0.06]">

                  {STATS.map(({ value, label, sub }) => (
                    <div key={value} className="flex flex-1 flex-col justify-center gap-0.5 px-6 py-5 md:px-9">
                      <div className="flex items-baseline gap-1.5">
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                          {value}
                        </span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '-0.01em' }}>
                          {label}
                        </span>
                      </div>
                      <span className="text-[0.53rem] font-semibold uppercase tracking-[0.15em] text-[#FECE00]/48">
                        {sub}
                      </span>
                    </div>
                  ))}

                  {/* GEMA */}
                  <div className="flex flex-1 items-center gap-3 px-6 py-5 md:px-9">
                    <Image
                      src="/images/logos/logo.png"
                      alt="GEMA"
                      width={80}
                      height={40}
                      className="h-16 w-auto shrink-0 object-contain"
                    />
                    <span className="whitespace-nowrap text-[0.53rem] font-semibold uppercase tracking-[0.15em] text-[#FECE00]/48">
                      Authorised partner
                    </span>
                  </div>

                  {/* DÜRR */}
                  <div className="flex flex-1 items-center gap-3 px-6 py-5 md:px-9">
                    <Image
                      src="/images/logos/duerr-logo-RGB.png"
                      alt="DÜRR"
                      width={64}
                      height={32}
                      className="h-7 w-auto shrink-0 object-contain brightness-0 invert"
                    />
                    <span className="whitespace-nowrap text-[0.53rem] font-semibold uppercase tracking-[0.15em] text-[#FECE00]/48">
                      Authorised distributor
                    </span>
                  </div>

                  {/* Est. */}
                  <div className="hidden items-center px-7 md:flex">
                    <span className="whitespace-nowrap rounded-full border border-[#FECE00]/18 bg-[#FECE00]/[0.06] px-3.5 py-1.5 text-[0.54rem] font-bold uppercase tracking-[0.16em] text-[#FECE00]/50">
                      Est. 2011 · Noida
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
