'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const STATS = [
  { value: '14+',    label: 'Years operating'       },
  { value: '500+',   label: 'Installations'          },
  { value: 'GEMA',   label: 'Authorised partner'     },
  { value: 'DURR',   label: 'Authorised partner'     },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f1efea] pt-28 pb-16 md:pt-36 md:pb-24">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,10,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Yellow glow top-right */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-yellow/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card-accent-label mb-6"
        >
          Value Added Coating Solutions Pvt. Ltd.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="font-display max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-black leading-[0.91] tracking-[-0.04em] text-ink"
        >
          Manufactured systems.{' '}
          <span className="text-yellow-dark">Proprietary automation.</span>{' '}
          Expert coating solutions.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mt-6 max-w-xl text-[0.9rem] leading-[1.65] text-ink/55 md:text-[1rem]"
        >
          OptiFinish designs and manufactures complete powder coating lines, develops proprietary
          automation products, and is an authorised partner for GEMA and DURR coating equipment —
          backed by 14+ years of industrial experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link href="/products" className="panel-button dynamic-button dynamic-button-yellow">
            <span>Explore Products</span>
            <div className="dynamic-button-glow" />
          </Link>
          <Link href="/contact" className="panel-button dynamic-button dynamic-button-dark text-white">
            <span>Get in Touch</span>
            <div className="dynamic-button-glow" />
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-ink/[0.08] pt-8"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="font-display text-xl font-black tracking-tight text-ink">{s.value}</span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink/38">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-16 overflow-hidden rounded-[1.5rem] border border-ink/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.1)]"
        >
          <Image
            src="/powder-coating-technology.webp"
            alt="OptiFinish powder coating plant"
            width={1400}
            height={700}
            className="h-[280px] w-full object-cover md:h-[420px] lg:h-[500px]"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
