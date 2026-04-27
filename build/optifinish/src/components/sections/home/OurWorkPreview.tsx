'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

const WORK_CARDS = [
  {
    industry: 'Automotive Components',
    city: 'Gurugram, Haryana',
    desc: 'Full powder coating line with conveyor system, curing oven, and spray booth.',
  },
  {
    industry: 'Electrical Equipment',
    city: 'Faridabad, Haryana',
    desc: 'GEMA gun integration with Z-TAP automation on an existing client line.',
  },
  {
    industry: 'Industrial Fabrication',
    city: 'Greater Noida, UP',
    desc: 'End-to-end turnkey plant — designed, manufactured, and commissioned by OptiFinish.',
  },
];

export default function OurWorkPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);

  useHeadingAnimation({
    trigger: sectionRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#070809] py-20 md:py-28">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="overflow-hidden pb-[0.15em]">
              <span
                ref={eyebrowRef}
                className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55"
                style={{ willChange: 'transform, opacity' }}
              >
                Our Work
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  500+ lines installed
                </span>
              </div>
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>
                  across India.
                </span>
              </div>
            </h2>
          </div>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white/65"
          >
            View all installations <span>→</span>
          </Link>
        </div>

        {/* 3-card grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {WORK_CARDS.map((card, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.1]"
            >
              <div className="relative overflow-hidden">
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.03]">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                      <span className="text-white/20">⊡</span>
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/18">
                      Installation photo
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FECE00]" />
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#FECE00]/60">
                    {card.industry}
                  </span>
                </div>
                <p className="text-[0.72rem] font-semibold text-white/50">{card.city}</p>
                <p className="text-[0.75rem] leading-relaxed text-white/30">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
