'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
    quote: 'The powder spray booth, curing oven, and GEMA gun system OptiFinish supplied have been running consistently since commissioning. Output quality on our e-rickshaw frames is exactly what we needed — adhesion is solid and the line rarely stops. Good people to work with.',
    name: 'Nitin Sharma',
    company: 'Badshah E-Rickshaw / Tiger',
    products: 'Powder Booth · Curing Oven · GEMA Gun',
    initials: 'NS',
    avatarFrom: '#FECE00',
    avatarTo: '#f59e0b',
    textColor: '#0a0a0a',
  },
  {
    quote: 'We needed a liquid spray booth that could handle production volumes with clean air filtration — OptiFinish understood the requirement and delivered. The gun they recommended has made a real difference to transfer efficiency. Practical advice, no overselling.',
    name: 'Rakesh Singh',
    company: 'Creator System',
    products: 'Liquid Painting Booth · Spray Gun',
    initials: 'RS',
    avatarFrom: '#3b82f6',
    avatarTo: '#6366f1',
    textColor: '#ffffff',
  },
  {
    quote: 'The curing oven and booth OptiFinish built for us runs clean through two shifts. The gun configuration they set up works well for our substrate. We have been with them a few years now and the support has been consistent throughout.',
    name: 'Moti Ram Sharma',
    company: '',
    products: 'Curing Oven · Powder Booth · Gun',
    initials: 'MS',
    avatarFrom: '#22c55e',
    avatarTo: '#16a34a',
    textColor: '#ffffff',
  },
  {
    quote: 'Before the automatic oven and gun system OptiFinish installed, we were losing time on rework and uneven curing. Since commissioning, we have been running two shifts with minimal downtime. The team was thorough during setup and stayed until everything was dialled in.',
    name: 'Kesar Dagar',
    company: 'Kesar Engineering',
    products: 'Automatic Oven · Powder Booth · Gun',
    initials: 'KD',
    avatarFrom: '#f97316',
    avatarTo: '#ef4444',
    textColor: '#ffffff',
  },
  {
    quote: 'We coat MDF and wood components for furniture and interiors — not the standard application. OptiFinish took time to understand what we needed: the right liquid booth with proper downdraft and a gun tuned for our viscosity range. The finish quality on our MDF has been consistently clean.',
    name: 'Vikas Singhal',
    company: 'Dev Enterprises',
    products: 'MDF / Liquid Coating Booth · Gun',
    initials: 'VS',
    avatarFrom: '#a855f7',
    avatarTo: '#7c3aed',
    textColor: '#ffffff',
  },
];

const VISIBLE_LG = 3;
const VISIBLE_SM = 1;
const GAP = 16;

function Avatar({ initials, avatarFrom, avatarTo, textColor, src, name }: {
  initials: string;
  avatarFrom: string;
  avatarTo: string;
  textColor: string;
  src?: string;
  name: string;
}) {
  return (
    <div
      className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/[0.12]"
      style={{ background: `linear-gradient(135deg, ${avatarFrom}, ${avatarTo})` }}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" />
      ) : (
        <span className="text-[0.65rem] font-black tracking-tight" style={{ color: textColor }}>
          {initials}
        </span>
      )}
    </div>
  );
}

export default function ClientsTestimonials() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLSpanElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Logo marquee — auto-scroll + manual scroll
  const logoRef      = useRef<HTMLDivElement>(null);
  const logoPaused   = useRef(false);
  const logoRaf      = useRef<number>(0);

  // Testimonial swipe
  const touchStartX  = useRef<number | null>(null);

  useHeadingAnimation({ trigger: sectionRef, eyebrow: eyebrowRef, line1: line1Ref, line2: line2Ref });

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const SPEED = 38; // px per second
    let last = 0;
    const step = (t: number) => {
      if (!logoPaused.current) {
        const delta = last ? (t - last) / 1000 : 0;
        el.scrollLeft += SPEED * delta;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      }
      last = t;
      logoRaf.current = requestAnimationFrame(step);
    };
    logoRaf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(logoRaf.current);
  }, []);

  // measure container for card width calculation
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const visibleCount = containerWidth >= 1024 ? VISIBLE_LG : VISIBLE_SM;
  const maxIndex = TESTIMONIALS.length - visibleCount;
  const cardWidth = containerWidth > 0
    ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount
    : 0;
  const translateX = activeIndex * (cardWidth + GAP);

  const prev = useCallback(() => setActiveIndex(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActiveIndex(i => Math.min(maxIndex, i + 1)), [maxIndex]);

  // auto-advance
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex(i => (i >= maxIndex ? 0 : i + 1));
    }, 5500);
    return () => clearInterval(id);
  }, [isPaused, maxIndex]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-14 md:py-28">

      {/* Grid drift layers */}
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)`,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)`,
          backgroundSize: '264px 264px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="overflow-hidden pb-[0.15em]">
            <span ref={eyebrowRef} className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40" style={{ willChange: 'transform, opacity' }}>
              Our Clients
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.65rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
            <div className="overflow-hidden pb-[0.15em]">
              <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>Trusted by India&apos;s</span>
            </div>
            <div className="overflow-hidden pb-[0.15em]">
              <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>leading manufacturers.</span>
            </div>
          </h2>
        </div>

        {/* Stat bar */}
        <div className="mb-8 grid grid-cols-3 divide-x divide-ink/[0.07] overflow-hidden rounded-[0.8rem] border border-ink/[0.08] bg-white/60 backdrop-blur-sm">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-0.5 px-3 py-2.5 sm:px-5 sm:py-3.5 md:px-8">
              <span className="font-display text-[1rem] font-black tracking-[-0.03em] text-ink sm:text-[1.2rem]">{value}</span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-ink/40">{label}</span>
            </div>
          ))}
        </div>

        {/* Client logos — marquee on mobile, grid on desktop */}

        {/* Mobile: interactive auto-scroll (pauses on touch, manual scroll works) */}
        <div
          ref={logoRef}
          className="mb-14 overflow-x-auto md:hidden"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
          onMouseEnter={() => { logoPaused.current = true; }}
          onMouseLeave={() => { logoPaused.current = false; }}
          onTouchStart={() => { logoPaused.current = true; }}
          onTouchEnd={() => { setTimeout(() => { logoPaused.current = false; }, 1200); }}
        >
          <div className="flex w-max gap-3">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="relative flex h-20 w-36 flex-shrink-0 items-center justify-center overflow-hidden rounded-[0.8rem] border border-ink/[0.07] bg-white">
                <div className={`absolute inset-0 ${logo.pad ?? 'p-5'}`}>
                  <div className="relative h-full w-full">
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" unoptimized />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: static grid */}
        <div className="mb-14 hidden md:grid md:grid-cols-4 md:gap-3 lg:grid-cols-6">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo.name} className="relative flex h-24 items-center justify-center overflow-hidden rounded-[0.8rem] border border-ink/[0.07] bg-white">
              <div className={`absolute inset-0 ${logo.pad ?? 'p-6'}`}>
                <div className="relative h-full w-full">
                  <Image src={logo.src} alt={logo.name} fill className="object-contain" unoptimized />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Testimonials carousel ── */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">Testimonials</span>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FECE00] text-[#0a0a0a] shadow-sm transition-all hover:bg-[#f0c200] disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                disabled={activeIndex >= maxIndex}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FECE00] text-[#0a0a0a] shadow-sm transition-all hover:bg-[#f0c200] disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Track */}
          <div
            ref={containerRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; setIsPaused(true); }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = touchStartX.current - e.changedTouches[0].clientX;
              if (delta > 50) next();
              else if (delta < -50) prev();
              touchStartX.current = null;
              setIsPaused(false);
            }}
          >
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${translateX}px)`,
                transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-shrink-0 flex-col gap-4 rounded-[1.2rem] border border-white/[0.06] bg-[#0a0a0a] p-6 transition-opacity duration-300"
                  style={{
                    width: cardWidth > 0 ? `${cardWidth}px` : '100%',
                    opacity: (i >= activeIndex && i < activeIndex + visibleCount) ? 1 : 0.35,
                  }}
                >
                  <span className="text-[2rem] leading-none text-[#FECE00]/25 md:text-[2.5rem]">&ldquo;</span>
                  <p className="flex-1 text-[0.8rem] leading-relaxed text-white/60">{t.quote}</p>
                  <div className="border-t border-white/[0.07] pt-4">
                    <div className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/25">{t.products}</div>
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={t.initials}
                        avatarFrom={t.avatarFrom}
                        avatarTo={t.avatarTo}
                        textColor={t.textColor}
                        name={t.name}
                      />
                      <div>
                        <p className="text-[0.75rem] font-bold leading-tight text-white/80">{t.name}</p>
                        {t.company && (
                          <p className="text-[0.65rem] text-white/35">{t.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex justify-center gap-0.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="flex h-6 w-6 items-center justify-center"
                style={{ touchAction: 'manipulation' }}
              >
                <span
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: '6px',
                    width: i === activeIndex ? '24px' : '6px',
                    background: i === activeIndex ? '#FECE00' : 'rgba(10,10,10,0.2)',
                    display: 'block',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
