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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-14 md:py-28">
      {/* Grid drift layers — matches light-themed template */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="overflow-hidden pb-[0.15em]">
              <span
                ref={eyebrowRef}
                className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]"
                style={{ willChange: 'transform, opacity' }}
              >
                Our Work
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  250+ lines installed
                </span>
              </div>
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>
                  across <span style={{ background: 'linear-gradient(to bottom, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>India</span>.
                </span>
              </div>
            </h2>
          </div>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 self-start rounded-full border border-ink/15 bg-ink/[0.06] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink/55 transition-colors hover:border-ink/25 hover:bg-ink/[0.1] hover:text-ink"
          >
            View all installations <span>→</span>
          </Link>
        </div>

        {/* Cards — horizontal snap-scroll on mobile, 3-col grid on desktop */}
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-4 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {WORK_CARDS.map((card, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[82vw] md:w-auto flex flex-col overflow-hidden rounded-[1.4rem] border border-ink/[0.08] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FECE00]/50 hover:shadow-[0_8px_32px_rgba(254,206,0,0.10)]"
            >
              <div className="relative overflow-hidden">
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f0eeeb]">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.1] bg-ink/[0.04]">
                      <span className="text-ink/25">⊡</span>
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/30">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FECE00]" />
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#b89c00]">
                    {card.industry}
                  </span>
                </div>
                <p className="text-[0.72rem] font-semibold text-ink/60">{card.city}</p>
                <p className="text-[0.75rem] leading-relaxed text-ink/45">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
