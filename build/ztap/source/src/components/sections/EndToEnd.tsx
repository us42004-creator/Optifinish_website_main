'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';
import MobileCarousel from '@/components/ui/MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;

    const tryPlay = () => v.play().catch(() => {});

    // Play when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) tryPlay(); },
      { threshold: 0.1 }
    );
    observer.observe(v);

    // Also attempt immediately + on any user gesture
    tryPlay();
    const events = ['scroll', 'touchstart', 'pointerdown', 'keydown'] as const;
    const unlock = () => {
      tryPlay();
      events.forEach(e => window.removeEventListener(e, unlock));
    };
    events.forEach(e => window.addEventListener(e, unlock, { once: true, passive: true }));

    return () => {
      observer.disconnect();
      events.forEach(e => window.removeEventListener(e, unlock));
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      autoPlay
      playsInline
      disablePictureInPicture
      preload="auto"
      suppressHydrationWarning
      className={className}
    />
  );
}

const PATHS = [
  {
    number: '01',
    label: 'New Installation',
    title: 'Design & build the complete line.',
    body: 'Greenfield or expansion — we commission full coating systems configured to your part geometry, volume, and throughput target.',
    tags: [
      'Plastic & cyclone booths',
      'Batch & conveyor ovens',
      'Powder management & sieves',
      'Full conveyor line design',
    ],
    media: '/robo_arm_web.mp4',
    mediaAlt: 'Powder coating line installation',
    mediaType: 'video',
  },
  {
    number: '02',
    label: 'Existing Line',
    title: 'Integrate Z-TAP into what you already run.',
    body: 'Z-TAP mounts to your current setup and adds 6-axis robotic intelligence — no replacements needed.',
    tags: [
      '2-axis reciprocator integration',
      'Manual booth automation',
      'Moving conveyor touch-up',
      'Any gun, any coating type',
    ],
    media: '',
    mediaAlt: '',
    mediaType: 'empty',
  },
  {
    number: '03',
    label: 'Component Supply',
    title: 'Source the right equipment for your process.',
    body: 'Guns, powders, booths, ovens — we supply from the brands that matter, with process advice for your specific coating challenge.',
    tags: [
      'GEMA guns & controllers',
      'Full powder & liquid range',
      'Booth systems all types',
      'Curing & thermal solutions',
    ],
    media: '/reciprocator.mp4',
    mediaAlt: 'Component supply showcase',
    mediaType: 'video',
  },
];

const AUTHORITY = [
  {
    tag: 'Liquid Systems',
    value: 'DÜRR',
    sub: 'Authorised Partner',
    note: 'German liquid paint technology',
  },
  {
    tag: 'Powder Automation',
    value: 'GEMA',
    sub: 'Authorised Partner',
    note: 'Spray guns & automation systems',
  },
  {
    tag: 'Paint Supply',
    value: 'Nerolac · Prominent',
    sub: '+ Paramount',
    note: 'Powder coating paint partners',
  },
  {
    tag: 'Experience',
    value: 'Est. 2011',
    sub: '14+ Years',
    note: 'Powder + liquid coating capability',
  },
];

const MOBILE_AUTHORITY_STATS = [
  {
    value: '4+',
    label: 'Authorised partners',
    note: 'DURR, GEMA, Nerolac, Prominent',
  },
  {
    value: '14+',
    label: 'Years in manufacturing',
    note: 'Powder and liquid systems',
  },
  {
    value: '25+',
    label: 'Years in trading',
    note: 'Equipment and process supply',
  },
];

function AuthorityBar({ items }: { items: typeof AUTHORITY }) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = barRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${-y * 4}deg) rotateY(${x * 6}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const el = barRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={barRef}
      data-authority
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out', willChange: 'transform, opacity' }}
      className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[linear-gradient(160deg,#1c1c1c_0%,#0d0d0d_100%)] shadow-[0_16px_48px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.07)] cursor-default"
    >
      {/* Top yellow line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-[linear-gradient(90deg,transparent_0%,#FECE00_30%,#FECE00_70%,transparent_100%)] opacity-50" />

      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(254,206,0,0.05)_0%,transparent_100%)]" />

      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.value}
            className={`group relative flex flex-col gap-2.5 px-5 py-5 transition-colors duration-200 hover:bg-white/[0.03] sm:px-7 sm:py-6
              ${i !== items.length - 1 ? 'border-r border-white/[0.06]' : ''}
              ${i < 2 ? 'border-b border-white/[0.06] lg:border-b-0' : ''}
            `}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(254,206,0,0.04)_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative z-10 w-fit rounded-full border border-yellow/15 bg-yellow/[0.06] px-2.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.22em] text-yellow/80 transition-colors duration-200 group-hover:border-yellow/30 group-hover:text-yellow sm:text-[8px]">
              {item.tag}
            </span>

            <div className="relative z-10">
              <p className="font-display text-[0.95rem] font-black uppercase leading-none tracking-[-0.02em] text-white/90 transition-colors duration-200 group-hover:text-white sm:text-[1.1rem]">
                {item.value}
              </p>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30 transition-colors duration-200 group-hover:text-white/45 sm:text-[9px]">
                {item.sub}
              </p>
            </div>

            <p className="relative z-10 border-t border-white/[0.06] pt-2.5 text-[9.5px] leading-relaxed text-white/38 transition-colors duration-200 group-hover:text-white/55 sm:text-[10.5px]">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EndToEnd() {
  const sectionRef   = useRef<HTMLElement>(null);
  const pillRef      = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const bodyRef      = useRef<HTMLParagraphElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const authorityItems = authorityRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-authority]', authorityRef.current)
        : [];

      // Heading — all breakpoints
      gsap.set(pillRef.current,  { x: '-120%', opacity: 0 });
      gsap.set(line1Ref.current, { x: '-110%', opacity: 0 });
      gsap.set(line2Ref.current, { x: '90%',   opacity: 0 });
      gsap.set(bodyRef.current,  { opacity: 0, y: 20 });
      gsap.set(authorityItems,   { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        },
      });
      tl.to(pillRef.current,  { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.4 }, 0)
        .to(line1Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.06)
        .to(line2Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.14)
        .to(bodyRef.current,  { opacity: 1, y: 0,    ease: 'power3.out', duration: 0.3 }, 0.22)
        .to(authorityItems,   { opacity: 1, y: 0, stagger: 0.07, ease: 'power3.out', duration: 0.28 }, 0.32);

      // Desktop: card entrance
      mm.add('(min-width: 1024px)', () => {
        const cards = cardsRef.current
          ? gsap.utils.toArray<HTMLElement>('article', cardsRef.current)
          : [];
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 32, scale: 0.97 });
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 0.5,
            },
          }).to(cards, { opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: 'power3.out', duration: 0.44 }, 0.62);
        }
      });

    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  // Shared card JSX factory
  const renderCard = (path: typeof PATHS[number], isMobile = false) => (
    <article
      key={path.number}
      data-magnetic={!isMobile ? true : undefined}
      className={`group relative flex flex-col overflow-hidden border border-black/[0.07] bg-white transition-all duration-500 ease-in-out lg:rounded-[2rem] ${
        isMobile
          ? 'min-h-[33rem] rounded-[1.7rem] shadow-[0_16px_48px_rgba(0,0,0,0.07)]'
          : 'rounded-[1.7rem] shadow-[0_16px_48px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_28px_64px_rgba(0,0,0,0.1)]'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Text — padded */}
      <div className="relative z-10 flex flex-col p-6 sm:p-7">
        {/* Label */}
        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-yellow">
          {path.label}
        </span>

        {/* Title */}
        <h3 className="mt-3 font-display text-[1.45rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-ink sm:text-[1.65rem]">
          {path.title}
        </h3>

        {/* Body */}
        <p className="mt-3 text-[0.82rem] leading-relaxed text-ink/52">{path.body}</p>

        {/* Tags */}
        <ul className="mt-5 space-y-2.5 border-t border-black/[0.06] pt-5">
          {path.tags.map((tag) => (
            <li key={tag} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
              <span className="text-[12.5px] font-medium text-ink/58">{tag}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Media — bleeds to card edges */}
      <div className="relative mt-auto overflow-hidden">
        {path.mediaType === 'video' ? (
          <AutoplayVideo src={path.media} className="aspect-[4/3] w-full object-cover pointer-events-none" />
        ) : path.mediaType === 'image' ? (
          <div className="relative aspect-[4/3] w-full">
            <Image src={path.media} alt={path.mediaAlt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 80vw" />
          </div>
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-ink/[0.03]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/20">Coming Soon</span>
          </div>
        )}
      </div>
    </article>
  );

  return (
    <section
      ref={sectionRef}
      id="end-to-end"
      className="relative overflow-hidden border-b border-black/10 bg-[#f1efea] py-16 text-ink sm:py-20 lg:py-24"
    >
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
      <div className="relative z-10 px-6 md:px-10 lg:px-12">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-3 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <div className="overflow-hidden">
              <div ref={pillRef} className="mb-6" style={{ willChange: 'transform, opacity' }}>
                <Pill variant="dark">Complete Line</Pill>
              </div>
            </div>
            <h2 className="mobile-hero-ratio-title desktop-section-heading whitespace-nowrap font-display font-black uppercase">
              <div className="overflow-hidden">
                <span ref={line1Ref} className="block text-ink" style={{ willChange: 'transform, opacity' }}>
                  From booth
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={line2Ref} className="block text-yellow" style={{ willChange: 'transform, opacity' }}>
                  to robot.
                </span>
              </div>
            </h2>
          </div>
          <p ref={bodyRef} className="mobile-hero-ratio-copy mt-3 max-w-lg text-ink/58 sm:text-sm lg:mt-0 lg:text-sm lg:leading-relaxed" style={{ willChange: 'transform, opacity' }}>
            Value Added Coating Solutions plans, builds, and integrates complete coating systems. Whether you're starting a new line, upgrading an existing setup, or adding robotic automation — we bring the full stack under one partner.
          </p>
        </div>

        {/* Desktop cards grid — hidden on mobile */}
        <div
          ref={cardsRef}
          className="group/endtoend hidden lg:grid lg:grid-cols-3 gap-5"
        >
          {PATHS.map((path) => renderCard(path, false))}
        </div>

        {/* Authority strip */}
        <div ref={authorityRef} className="mt-5 hidden lg:block">
          <AuthorityBar items={AUTHORITY} />
        </div>

        {/* Mobile carousel — full-bleed */}
        <div className="-mx-6 lg:hidden">
          <MobileCarousel cardWidthVw={0.86} gap={14} indicatorTheme="light" className="pl-5 sm:pl-6">
            {PATHS.map((path) => renderCard(path, true))}
          </MobileCarousel>
        </div>

        <div className="mt-5 lg:hidden">
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,206,0,0.06)_0%,transparent_55%)]" />
            <div className="relative z-10 grid grid-cols-3">
              {MOBILE_AUTHORITY_STATS.map((stat, i) => (
                <div
                  key={stat.value}
                  className={`flex flex-col gap-2 px-4 py-5 ${i !== MOBILE_AUTHORITY_STATS.length - 1 ? 'border-r border-white/[0.07]' : ''}`}
                >
                  <p className="font-display text-[1.6rem] font-black leading-none tracking-[-0.05em] text-yellow">
                    {stat.value}
                  </p>
                  <p className="text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {stat.label}
                  </p>
                  <p className="border-t border-white/[0.06] pt-2 text-[0.5rem] leading-[1.35] text-white/52">
                    {stat.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
