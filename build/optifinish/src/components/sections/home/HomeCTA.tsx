'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

export default function HomeCTA() {
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
      {/* Grid drift layers */}
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="noise relative overflow-hidden rounded-[1.4rem] bg-ink px-5 py-10 text-center sm:rounded-[1.75rem] sm:px-8 sm:py-14 md:px-16 md:py-20">

          {/* Yellow glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow/20 blur-[80px]" />

          <div className="relative">
            {/* Eyebrow */}
            <div className="overflow-hidden pb-[0.15em]">
              <span
                ref={eyebrowRef}
                className="tech-kicker mb-4 block"
                style={{ willChange: 'transform, opacity' }}
              >
                Ready to talk?
              </span>
            </div>

            {/* Heading — split into two lines for animation */}
            <h2 className="font-display mx-auto max-w-2xl text-[clamp(1.45rem,4.5vw,3.2rem)] font-black leading-[0.93] tracking-[-0.04em] text-white">
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  Let&apos;s find the right coating
                </span>
              </div>
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  solution for your line.
                </span>
              </div>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-relaxed text-white/45">
              Whether you need a complete plant, a single machine, an automation upgrade,
              or after-sales support — we&apos;re here.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 px-1 sm:flex-row sm:items-center sm:justify-center sm:px-0">
              <Link href="/contact" className="panel-button dynamic-button dynamic-button-yellow w-full sm:w-auto justify-center">
                <span>Get in Touch</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
