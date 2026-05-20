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

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 text-center"
        >
          <span className="mb-3 block text-[0.55rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/60">
            Our Founders
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
            Faces behind the finish.
          </h2>
        </motion.div>

        {/* Founder cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FOUNDERS.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={founder.src}
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  unoptimized
                  priority={i === 0}
                />
                {/* Yellow tint */}
                <div className="absolute inset-0 bg-[#FECE00]/10 mix-blend-multiply" />
                {/* Bottom scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/30 to-transparent" />
              </div>

              {/* Info */}
              <div className="px-7 py-6">
                <p className="font-display text-[1.2rem] font-black tracking-tight text-white">
                  {founder.name}
                </p>
                <p className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#FECE00]/70">
                  {founder.role}
                </p>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-white/40">
                  {founder.bio}
                </p>
              </div>

              {/* Yellow accent line at bottom */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FECE00] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
