'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';

gsap.registerPlugin(ScrollTrigger);

// 6×6 ArUco-style marker (1 = black cell, 0 = white cell)
const BITS = [
  1,1,1,1,1,1,
  1,1,0,1,0,1,
  1,0,1,1,0,1,
  1,1,0,0,1,1,
  1,0,1,0,1,1,
  1,1,1,1,1,1,
];

const STEPS = [
  { num: '01', label: 'Stick a small printed tag on the part or fixture — just once.' },
  { num: '02', label: 'Robot reads it the moment the part enters the cell.' },
  { num: '03', label: 'Right coating program loads. Nobody touches anything.' },
];

export default function VisionLayer() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef    = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const markerRef  = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const steps = stepsRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-step]', stepsRef.current)
        : [];

      gsap.set(pillRef.current,   { x: '-120%', opacity: 0 });
      gsap.set(line1Ref.current,  { x: '-110%', opacity: 0 });
      gsap.set(line2Ref.current,  { x: '90%', opacity: 0 });
      gsap.set(markerRef.current, { opacity: 0, scale: 0.88 });
      gsap.set(steps,             { opacity: 0, x: -24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 24%',
          scrub: 0.5,
        },
      });

      tl.to(pillRef.current,   { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.35 }, 0)
        .to(line1Ref.current,  { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.08)
        .to(line2Ref.current,  { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.16)
        .to(markerRef.current, { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.55 }, 0.12)
        .to(steps, { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out', duration: 0.35 }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision-layer"
      className="relative overflow-hidden border-b border-white/10 bg-[#050505] py-14 text-white sm:py-18 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254,206,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254,206,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,243,163,0.28) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,243,163,0.28) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-yellow/[0.04] blur-[120px]" />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Left: copy ── */}
          <div>
            <div className="overflow-hidden mb-6">
              <div ref={pillRef} style={{ willChange: 'transform, opacity' }}>
                <Pill variant="yellow">Vision Layer</Pill>
              </div>
            </div>

            <h2 className="mobile-hero-ratio-title desktop-section-heading font-display font-black uppercase">
              <div className="overflow-hidden">
                <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  Switch parts.
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={line2Ref} className="block text-yellow" style={{ willChange: 'transform, opacity' }}>
                  Robot already knows.
                </span>
              </div>
            </h2>

            <p className="mobile-hero-ratio-copy mt-5 max-w-md text-white/50 sm:text-base lg:text-sm lg:leading-relaxed">
              One small tag on the fixture. That's it. Z-TAP reads it and loads
              the correct coating program — automatically, every changeover.
            </p>

            <div ref={stepsRef} className="mt-7 grid gap-2.5 sm:mt-10 sm:space-y-0">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  data-step
                  className="flex items-center gap-3 rounded-[0.9rem] border border-white/[0.07] bg-white/[0.03] px-3.5 py-3"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <span className="shrink-0 rounded-full border border-yellow/25 bg-yellow/[0.09] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-yellow">
                    {step.num}
                  </span>
                  <p className="text-[0.76rem] leading-relaxed text-white/68 sm:text-sm">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: ArUco marker visual ── */}
          <div
            ref={markerRef}
            className="flex items-center justify-center"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 scale-[2] rounded-full bg-yellow/[0.05] blur-[80px]" />

              {/* Camera viewfinder corners */}
              <div className="absolute -inset-7">
                <div className="absolute left-0 top-0 h-7 w-7 border-l-[2px] border-t-[2px] border-yellow/50 rounded-tl-sm" />
                <div className="absolute right-0 top-0 h-7 w-7 border-r-[2px] border-t-[2px] border-yellow/50 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 h-7 w-7 border-b-[2px] border-l-[2px] border-yellow/50 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 h-7 w-7 border-b-[2px] border-r-[2px] border-yellow/50 rounded-br-sm" />
                {/* Label top-center */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.26em] text-yellow/60">Part Tag · Z-TAP Marker</span>
                </div>
              </div>

              {/* Marker panel */}
              <div className="relative h-48 w-48 overflow-hidden rounded border border-white/[0.08] bg-white/[0.02] p-4 sm:h-64 sm:w-64 sm:p-5">
                {/* 6×6 bit grid */}
                <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-[2.5px]">
                  {BITS.map((bit, i) => (
                    <div
                      key={i}
                      className={`rounded-[1px] ${bit ? 'bg-white' : 'bg-transparent'}`}
                    />
                  ))}
                </div>

                {/* Scan line */}
                <div
                  className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow to-transparent"
                  style={{ animation: 'vl-scan 2.2s ease-in-out infinite' }}
                />
              </div>

              {/* Status label */}
              <div className="mt-5 flex items-center justify-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" style={{ animation: 'vl-pulse 1.8s ease-in-out infinite' }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                  Recognised · &lt;50 ms
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes vl-scan {
          0%   { top: 8%;  opacity: 0;   }
          12%  { opacity: 0.75; }
          88%  { opacity: 0.75; }
          100% { top: 92%; opacity: 0;   }
        }
        @keyframes vl-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
