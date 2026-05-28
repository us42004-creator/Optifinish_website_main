'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'Harish Sharma',
    role: 'Director & Co-Founder',
    bio: 'B.Sc. + MBA, Rohilkhand University. Early career at Vardhaman Spinning Mills before discovering the coating industry in 1999. He has spent the last 25 years working every angle of it — sales, procurement, plant commissioning, and product development. He leads manufacturing strategy and key client relationships at VACSPL.',
    src: '/images/team/Harish_sharma.png',
    landscape: true,
  },
  {
    name: 'Lalit Tayal',
    role: 'Director & Co-Founder',
    bio: "B.Sc. + MBA, Shiva Institute of Management Studies. Came to the coating industry from Ayur Herbals. Since 1999, he has built and run the commercial and distribution side of the business — from Vinayak Agencies' first powder sale to Dürr's product range landing under the OptiFinish umbrella. He leads business development, partnerships, and regional expansion.",
    src: '/images/team/Lalit_Tayal.png',
    landscape: true,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function OurTeam() {
  return (
    <section className="relative bg-[#070809] py-16 md:py-32">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">

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
            {founder.landscape ? (
              /* ── Landscape layout (Harish) ── */
              <div className="group grid grid-cols-1 gap-0 py-8 sm:py-10 md:grid-cols-[1fr_auto] md:gap-10 md:items-center">

                {/* Left — text */}
                <div className="mb-6 md:mb-0">
                  <p className="mb-1 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-[#FECE00]/60">
                    {founder.role}
                  </p>
                  <p className="font-display text-[clamp(1.4rem,5vw,3.8rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
                    {founder.name.split(' ').map((word, wi) => (
                      <span key={wi}>
                        {wi > 0 && ' '}
                        {wi === 0
                          ? <span style={{ color: '#FECE00' }}>{word}</span>
                          : word}
                      </span>
                    ))}
                  </p>
                  <p className="mt-3 max-w-md text-[0.78rem] leading-relaxed text-white/35">
                    {founder.bio}
                  </p>
                </div>

                {/* Right — landscape image */}
                <div className="relative w-full overflow-hidden rounded-xl border border-white/[0.08] md:w-[420px] lg:w-[500px]"
                     style={{ aspectRatio: '16/9' }}>
                  <Image
                    src={founder.src}
                    alt={founder.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-[#FECE00]/8 mix-blend-multiply" />
                  {/* Subtle gradient overlay on bottom edge */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070809]/60 to-transparent" />
                </div>

              </div>
            ) : (
              /* ── Portrait layout (Lalit) ── */
              <div className="group flex items-center justify-between gap-8 py-8 sm:py-10">

                {/* Left — text */}
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-[#FECE00]/60">
                    {founder.role}
                  </p>
                  <p className="font-display text-[clamp(1.4rem,5vw,3.8rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
                    {founder.name.split(' ').map((word, wi) => (
                      <span key={wi}>
                        {wi > 0 && ' '}
                        {wi === 0
                          ? <span style={{ color: '#FECE00' }}>{word}</span>
                          : word}
                      </span>
                    ))}
                  </p>
                  <p className="mt-3 max-w-md text-[0.78rem] leading-relaxed text-white/35">
                    {founder.bio}
                  </p>
                </div>

                {/* Right — portrait thumbnail */}
                <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] sm:h-48 sm:w-36">
                  <Image
                    src={founder.src}
                    alt={founder.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-[#FECE00]/10 mix-blend-multiply" />
                </div>

              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />
          </motion.div>
        ))}

      </div>
    </section>
  );
}
