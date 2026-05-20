'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'Harish Sharma',
    role: 'Director & Co-Founder',
    bio: 'B.Sc. + MBA, Rohilkhand University. Early career at Vardhaman Spinning Mills before discovering the coating industry in 1999. He has spent the last 25 years working every angle of it — sales, procurement, plant commissioning, and product development. He leads manufacturing strategy and key client relationships at VACSPL.',
    src: '/images/team/harish_new.jpg',
  },
  {
    name: 'Lalit Tayal',
    role: 'Director & Co-Founder',
    bio: "B.Sc. + MBA, Shiva Institute of Management Studies. Came to the coating industry from Ayur Herbals. Since 1999, he has built and run the commercial and distribution side of the business — from Vinayak Agencies' first powder sale to Dürr's product range landing under the OptiFinish umbrella. He leads business development, partnerships, and regional expansion.",
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/60">
            Our Founders
          </span>
          <div className="mt-2 h-px bg-white/10" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FOUNDERS.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              {/* Rectangular photo — tall portrait crop */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={founder.src}
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  unoptimized
                  priority={i === 0}
                />
                {/* Subtle yellow tint */}
                <div className="absolute inset-0 bg-[#FECE00]/10 mix-blend-multiply" />
                {/* Bottom scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070809]/80 via-transparent to-transparent" />
              </div>

              {/* Text block */}
              <div className="px-8 py-7">
                <p className="mb-1 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-[#FECE00]/70">
                  {founder.role}
                </p>
                <p className="font-display text-[1.6rem] font-black leading-[0.9] tracking-[-0.04em] text-white">
                  {founder.name}
                </p>
                <p className="mt-4 text-[0.8rem] leading-relaxed text-white/40">
                  {founder.bio}
                </p>
              </div>

              {/* Yellow bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FECE00] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
