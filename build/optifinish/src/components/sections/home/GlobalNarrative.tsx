'use client';

/**
 * GlobalNarrative — Multinational provenance strip + product carousel
 */

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PILLARS = [
  {
    flag: '🇮🇳',
    flagScale: false,
    country: 'India',
    headline: 'Manufactured in India',
    body: 'Every OptiFinish powder coating plant, curing oven, spray booth, and conveyor is designed, fabricated, and tested at our facility in Greater Noida, Uttar Pradesh — by an engineering team that has spent over two decades on factory floors.',
    detail: 'Greater Noida · Kasna facility · Est. 2011',
  },
  {
    flag: '🇨🇭',
    flagScale: true,
    country: 'Switzerland',
    headline: 'Swiss powder coating technology',
    body: 'OptiFinish is an authorised GEMA partner in India. GEMA — founded in 1948, headquartered in St. Gallen, Switzerland — engineers the world\'s leading powder coating guns, booths, reciprocators, and OptiCenter management systems.',
    detail: 'GEMA Switzerland GmbH · Authorised partner',
  },
  {
    flag: '🇩🇪',
    flagScale: false,
    country: 'Germany',
    headline: 'German liquid coating technology',
    body: 'OptiFinish is an authorised Dürr distributor in India. Dürr — headquartered in Stuttgart, Germany — manufactures precision liquid coating equipment used in automotive and advanced industrial finishing worldwide.',
    detail: 'Dürr AG · Authorised distributor',
  },
];

const CAROUSEL = [
  {
    id: 'ztap',
    name: 'Z-TAP',
    tag: 'Automation',
    media: '/images/products/ztap/ztap-demo-full.mp4',
    type: 'video' as const,
    href: '/products/automation/z-tap',
  },
  {
    id: 'powder-plant',
    name: 'Powder Coating Plant',
    tag: 'Manufactured',
    media: '/images/products/powder-coating-plant/powder-coating-hero.mp4',
    type: 'video' as const,
    href: '/products/optifinish-manufactured/powder-coating-plant',
  },
  {
    id: 'spray-booth',
    name: 'Automatic Spray Booth',
    tag: 'Manufactured',
    media: '/images/products/spray-booth/automatic/automatic-booth.mp4',
    type: 'video' as const,
    href: '/products/optifinish-manufactured/spray-booth',
  },
  {
    id: 'curing-oven',
    name: 'Curing Oven',
    tag: 'Manufactured',
    media: '/images/products/optifinish-manufactured/curing-oven/yellow-oven-lighting.png',
    type: 'image' as const,
    href: '/products/optifinish-manufactured/curing-oven',
  },
  {
    id: 'za01',
    name: 'OPTI-ZA-18',
    tag: 'Automation',
    media: '/images/products/za01/recip_landscape.png',
    type: 'image' as const,
    href: '/products/automation/za01',
  },
  {
    id: 'sieve',
    name: 'Sieve Machine',
    tag: 'Automation',
    media: '/images/products/sieve-machine/sieve-machine-02.jpg',
    type: 'image' as const,
    href: '/products/automation/sieve-machine',
  },
  {
    id: 'gema-gun',
    name: 'GEMA Automatic Gun',
    tag: 'GEMA',
    media: '/images/products/gema/automatic-gun/gema-automatic-gun.jpg',
    type: 'image' as const,
    href: '/products/gema/automatic-gun',
  },
  {
    id: 'gema-oc',
    name: 'OptiCentre System',
    tag: 'GEMA',
    media: '/images/products/gema/opticentre/gema-opticenter-oc07-oc08-01.jpg',
    type: 'image' as const,
    href: '/products/gema/opticentre',
  },
  {
    id: 'durr',
    name: 'Dürr Liquid Systems',
    tag: 'Dürr',
    media: '/images/products/durr/general/durr-paint-robot-automotive-01.webp',
    type: 'image' as const,
    href: '/products/durr',
  },
  {
    id: 'vinayak',
    name: 'Coating Powders',
    tag: 'Vinayak',
    media: '/images/products/vinayak/powder-paints/nerolac-powder-coating-01.png',
    type: 'image' as const,
    href: '/products/vinayak',
  },
];

const TAG_COLORS: Record<string, string> = {
  Automation: '#FECE00',
  Manufactured: '#FECE00',
  GEMA: '#7EC8C8',
  'Dürr': '#C8A87E',
  Vinayak: '#9EC87E',
};

function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const CARD_W = 212; // card width + gap

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current || !trackRef.current) return;
      const track = trackRef.current;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 20) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: CARD_W, behavior: 'smooth' });
      }
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.6;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
    // Resume auto-scroll after 4s of inactivity
    setTimeout(() => { isPaused.current = false; }, 4000);
  };

  return (
    <div
      className="mt-5 md:mt-8"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = 'grab';
        isPaused.current = false;
      }}
    >
      {/* Label row */}
      <div className="mb-3 flex items-center justify-between px-5 md:px-8">
        <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-white/30">
          Full product portfolio
        </p>
        <p className="hidden text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/20 md:block">
          Drag to explore →
        </p>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto px-5 pb-2 md:px-8"
        style={{
          cursor: 'grab',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>

        {CAROUSEL.map((product) => (
          <Link
            key={product.id}
            href={product.href}
            draggable={false}
            onClick={(e) => {
              // Don't navigate if user was dragging
              if (Math.abs(trackRef.current?.scrollLeft ?? 0 - scrollLeft.current) > 4) {
                e.preventDefault();
              }
            }}
            className="group relative flex-none overflow-hidden rounded-[1rem] border border-white/[0.07] bg-white/[0.03]"
            style={{
              width: 196,
              scrollSnapAlign: 'start',
              userSelect: 'none',
            }}
          >
            {/* Media */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111]">
              {product.type === 'video' ? (
                <video
                  src={product.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <Image
                  src={product.media}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="196px"
                  draggable={false}
                />
              )}

              {/* Gradient overlay for label legibility */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Tag pill */}
              <div className="absolute left-2.5 top-2.5">
                <span
                  className="rounded-full px-2 py-0.5 text-[0.48rem] font-bold uppercase tracking-[0.16em]"
                  style={{
                    background: 'rgba(0,0,0,0.55)',
                    color: TAG_COLORS[product.tag] ?? '#FECE00',
                    border: `1px solid ${TAG_COLORS[product.tag] ?? '#FECE00'}33`,
                  }}
                >
                  {product.tag}
                </span>
              </div>

              {/* Product name */}
              <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
                <p className="text-[0.72rem] font-bold leading-tight tracking-[-0.01em] text-white">
                  {product.name}
                </p>
              </div>

              {/* Arrow on hover */}
              <div className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-white">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function GlobalNarrative() {
  return (
    <section
      className="relative overflow-hidden bg-[#070809] py-5 md:py-14"
      aria-label="Global technology, Indian delivery"
    >
      {/* Subtle yellow grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header row */}
        <div className="mb-4 flex flex-col gap-2 md:mb-7 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              Global technology · Indian delivery
            </p>
            <h2 className="font-display text-[clamp(1.3rem,2.8vw,2rem)] font-black leading-[0.92] tracking-[-0.035em] text-white">
              Designed in{' '}
              <span style={{
                background: 'linear-gradient(to bottom, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>India</span>
              {'.'}
              <br />
              <span style={{ color: '#FECE00' }}>Powered by </span>
              <span style={{ color: '#FECE00' }}>Swiss</span>
              <span style={{ color: '#FECE00' }}> and </span>
              <span style={{ color: '#FECE00' }}>German</span>
              <span style={{ color: '#FECE00' }}> engineering.</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-[0.75rem] leading-relaxed text-white/28 md:block md:text-right">
            OptiFinish integrates world-class European coating technology into systems manufactured entirely in India — giving Indian industry access to global-standard equipment through a local source.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid gap-2.5 sm:grid-cols-3 md:gap-3">
          {PILLARS.map((p) => (
            <article
              key={p.country}
              className="flex flex-col gap-2 rounded-[0.875rem] border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 md:gap-2.5 md:px-4 md:py-4"
              itemScope
              itemType="https://schema.org/Organization"
            >
              {/* Flag + headline */}
              <div className="flex items-center gap-2">
                <span
                  className="leading-none"
                  style={{
                    fontSize: p.flagScale ? '1.2rem' : '1rem',
                    display: 'inline-block',
                    transform: p.flagScale ? 'scaleX(1.2)' : undefined,
                  }}
                  aria-label={p.country}
                >
                  {p.flag}
                </span>
                <h3
                  className="font-display text-[0.82rem] font-black leading-tight tracking-[-0.02em] text-white"
                  itemProp="name"
                >
                  {p.country === 'India' ? (
                    <>Manufactured in <span style={{ background: 'linear-gradient(to bottom, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>India</span></>
                  ) : p.headline}
                </h3>
              </div>

              {/* Body */}
              <p className="hidden text-[0.75rem] leading-relaxed text-white/32 md:block" itemProp="description">
                {p.body}
              </p>

              {/* Detail chip */}
              <p className="mt-auto text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-[#FECE00]/35">
                {p.detail}
              </p>
            </article>
          ))}
        </div>

      </div>

      {/* Product carousel — full-width, bleeds past max-w-7xl */}
      <ProductCarousel />

    </section>
  );
}
