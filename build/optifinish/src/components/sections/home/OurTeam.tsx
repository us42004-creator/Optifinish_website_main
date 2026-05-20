'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'Harish Sharma',
    role: 'Director & Co-Founder',
    bio: 'Bio placeholder — background, expertise, vision.',
    src: '/images/team/harish_new.jpg',
  },
  {
    name: 'Lalit Tayal',
    role: 'Director & Co-Founder',
    bio: 'Bio placeholder — background, expertise, vision.',
    src: '/images/team/lalit_tayal_v2.jpg',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function OurTeam() {
  return (
    <section className="relative bg-[#070809] py-24 md:py-32">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-2"
        >
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/60">
            Our Founders
          </span>
        </motion.div>

        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mb-0 h-px origin-left bg-white/10"
        />

        {/* Founder rows */}
        {FOUNDERS.map((founder, i) => (
          <motion.div
            key={founder.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease, delay: i * 0.1 + 0.15 }}
          >
            <div className="group flex items-center justify-between gap-8 py-8 sm:py-10">

              {/* Left — text */}
              <div className="flex-1 min-w-0">
                <p className="mb-1 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-[#FECE00]/60">
                  {founder.role}
                </p>
                <p className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
                  {founder.name}
                </p>
                <p className="mt-3 max-w-md text-[0.78rem] leading-relaxed text-white/35">
                  {founder.bio}
                </p>
              </div>

              {/* Right — circular portrait */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/[0.08] sm:h-24 sm:w-24">
                <Image
                  src={founder.src}
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                  priority={i === 0}
                />
                <div className="absolute inset-0 rounded-full bg-[#FECE00]/10 mix-blend-multiply" />
              </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />
          </motion.div>
        ))}

      </div>
    </section>
  );
}
