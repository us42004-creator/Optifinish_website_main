'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

const CLIENT_LOGOS = [
  { name: 'Tata Group',      src: '/images/logos/tata.png' },
  { name: 'Godrej',          src: '/images/logos/godrej.png' },
  { name: 'Ashok Leyland',   src: '/images/logos/ashok-leyland.png', pad: 'p-3' },
  { name: 'Havells',         src: '/images/logos/havells.png' },
  { name: 'JBM Group',       src: '/images/logos/jbm.png' },
  { name: 'Spark Minda',     src: '/images/logos/spark-minda.png', pad: 'p-5' },
  { name: 'Polycab',         src: '/images/logos/polycab.png' },
  { name: 'V-Guard',         src: '/images/logos/vguard.png' },
  { name: 'Jaguar Lighting', src: '/images/logos/jaguar-lighting.png' },
  { name: 'Videocon',        src: '/images/logos/videocon.png' },
  { name: 'Sylvania',        src: '/images/logos/sylvania.png' },
  { name: 'Trutzschler',     src: '/images/logos/trutzschler.png' },
];

const STATS = [
  { value: '500+', label: 'Installations' },
  { value: '200+', label: 'Clients served' },
  { value: '14+',  label: 'Years in industry' },
];

const TESTIMONIALS = [
  {
    quote: 'Testimonial placeholder — client quote will go here once collected.',
    name: 'Client Name',
    role: 'Designation · Company',
  },
  {
    quote: 'Testimonial placeholder — client quote will go here once collected.',
    name: 'Client Name',
    role: 'Designation · Company',
  },
  {
    quote: 'Testimonial placeholder — client quote will go here once collected.',
    name: 'Client Name',
    role: 'Designation · Company',
  },
];

export default function ClientsTestimonials() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-20 md:py-28">

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

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="overflow-hidden pb-[0.15em]">
            <span
              ref={eyebrowRef}
              className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40"
              style={{ willChange: 'transform, opacity' }}
            >
              Our Clients
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
            <div className="overflow-hidden pb-[0.15em]">
              <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                Trusted by India&apos;s
              </span>
            </div>
            <div className="overflow-hidden pb-[0.15em]">
              <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>
                leading manufacturers.
              </span>
            </div>
          </h2>
        </div>

        {/* Stat bar */}
        <div className="mb-8 grid grid-cols-3 divide-x divide-ink/[0.07] overflow-hidden rounded-[0.8rem] border border-ink/[0.08] bg-white/60 backdrop-blur-sm">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-0.5 px-5 py-3.5 md:px-8">
              <span className="font-display text-[1.2rem] font-black tracking-[-0.03em] text-ink">{value}</span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/40">{label}</span>
            </div>
          ))}
        </div>

        {/* Client logos grid */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="relative flex h-24 items-center justify-center rounded-[0.8rem] border border-ink/[0.07] bg-white"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className={`object-contain ${logo.pad ?? 'p-6'}`}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <span className="mb-6 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">
            Testimonials
          </span>
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-[1.2rem] border border-white/[0.06] bg-[#0a0a0a] p-6"
              >
                <span className="text-[2.5rem] leading-none text-[#FECE00]/25">&ldquo;</span>
                <p className="text-[0.8rem] italic leading-relaxed text-white/40">{t.quote}</p>
                <div className="mt-auto border-t border-white/[0.07] pt-4">
                  <p className="text-[0.72rem] font-bold text-white/55">{t.name}</p>
                  <p className="text-[0.65rem] text-white/30">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
