'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';
import HomeCTA from '@/components/sections/home/HomeCTA';

const STATS = [
  { value: '1999', label: 'Year founded' },
  { value: '500+', label: 'Installations commissioned' },
  { value: '14+', label: 'Years as GEMA partner' },
  { value: '4',   label: 'Office locations' },
];

const VALUES = [
  {
    emoji: '🇮🇳',
    title: 'Made in India',
    body: 'Every OptiFinish plant is designed, fabricated, and tested at our Kasna facility in Greater Noida — with Swiss powder technology and German liquid coating systems integrated and delivered by an Indian team.',
  },
  {
    emoji: '🇨🇭',
    title: 'Swiss powder technology',
    body: 'Authorised GEMA partner — the same Swiss-engineered guns, booths, and management systems specified in Europe\'s leading automotive plants, available through OptiFinish across India.',
  },
  {
    emoji: '🇩🇪',
    title: 'German liquid coating',
    body: 'Authorised Dürr partner — precision liquid coating equipment from Germany, backed by the full Dürr warranty and support chain, now accessible to Indian manufacturers through a single local source.',
  },
];

type TimelineLogo = { src: string; alt: string; circle?: boolean };

const TIMELINE: { year: string; title: string; body: string; logos?: TimelineLogo[] }[] = [
  {
    year: '1999',
    title: 'Where it began',
    body: 'Harish Sharma and Lalit Tayal joined Rapid Coating — a powder coating company — as sales executives. Two graduates who found their industry on a factory floor in Ghaziabad. Neither left.',
  },
  {
    year: '2001',
    title: 'First venture',
    body: 'Harish and Lalit registered Vinayak Agencies — a powder trading company built on deep supplier relationships and the trust earned visiting hundreds of plants. The foundation of everything that followed.',
  },
  {
    year: '2003',
    title: 'First major partnership',
    body: 'Vinayak Agencies became a Nerolac channel partner — a meaningful validation that cemented their position as a serious regional distributor.',
  },
  {
    year: '2006',
    title: 'A permanent home',
    body: 'Harish and Lalit established a proper head office at Devika Tower, Ghaziabad — the first real base of operations. Structure, credibility, and a team.',
  },
  {
    year: '2008',
    title: 'Moving north',
    body: 'Demand from industrial clusters in Uttarakhand prompted the opening of a branch office in Rudrapur. The market was growing and they were growing with it.',
  },
  {
    year: '2011',
    title: 'VACSPL and a new identity',
    body: 'Value Added Coating Solutions Pvt. Ltd. was formally established. The same year: GEMA channel partner, new Gurugram office. This was no longer a trading company. This was a coating systems company.',
    logos: [
      { src: '/images/logos/gema_logo.png', alt: 'GEMA — Authorised Channel Partner' },
    ],
  },
  {
    year: '2015',
    title: 'Building something permanent',
    body: 'Phase 1 of the Kasna facility was built — owned, not rented. A manufacturing floor, R&D space, and assembly area. The ability to design, fabricate, and test complete powder coating plants under one roof changed everything.',
  },
  {
    year: '2017–19',
    title: 'Scaling the floor',
    body: 'Phase 2 expansion at Kasna added capacity, headcount, and capability. Testing rigs, larger fabrication bays, and a commissioning area where complete lines are assembled and validated before delivery.',
  },
  {
    year: '2019',
    title: 'The brand is named',
    body: '"OptiFinish" was registered as a trademark. VACSPL was simultaneously recognised as a GEMA OEM vendor in India — authorised to supply GEMA components as part of integrated systems. A milestone that took 20 years to earn.',
    logos: [
      { src: '/images/logos/optifinish-logo.png', alt: 'OptiFinish', circle: true },
      { src: '/images/logos/gema_logo.png', alt: 'GEMA — OEM Vendor India' },
    ],
  },
  {
    year: '2022',
    title: "India's borders, crossed",
    body: 'The first export orders for OEM equipment were fulfilled. Coating systems designed and manufactured in Greater Noida, shipped internationally. A proof of quality that no domestic certification could substitute.',
  },
  {
    year: '2024',
    title: 'Liquid coating, formally added',
    body: 'VACSPL became an authorised Dürr channel partner — adding the world\'s leading liquid coating equipment to the OptiFinish offering. For customers running liquid lines alongside powder, OptiFinish is now a single-source solution.',
    logos: [
      { src: '/images/logos/duerr-logo-rgb.png', alt: 'Dürr' },
    ],
  },
  {
    year: '2025',
    title: 'South India',
    body: "A Bengaluru office was established, extending VACSPL's direct service reach into South India's growing automotive and appliance manufacturing clusters.",
  },
  {
    year: '2026',
    title: 'R&D and Phase 3',
    body: "Phase 3 expansion at Kasna adds dedicated R&D infrastructure — test cells, automation development bays, and space for proprietary product development. OptiFinish is building systems that don't exist yet.",
  },
];

const FOUNDERS = [
  {
    name: 'Harish Sharma',
    role: 'Co-Founder & Director',
    credentials: 'B.Sc. + MBA — Rohilkhand University',
    bio: 'Early career at Vardhaman Spinning Mills before discovering the coating industry in 1999. He has spent the last 25 years working every angle of it — sales, procurement, plant commissioning, and product development. Leads manufacturing strategy and key client relationships at VACSPL.',
    initials: 'HS',
    photo: '/images/team/harish_sharma_v2.jpg',
    photoPosition: '50% 10%',
  },
  {
    name: 'Lalit Tayal',
    role: 'Co-Founder & Director',
    credentials: 'B.Sc. + MBA — Shiva Institute of Management Studies',
    bio: "Came to the coating industry from Ayur Herbals. Since 1999, he has built and run the commercial and distribution side of the business — from Vinayak Agencies' first powder sale to Dürr's product range landing under the OptiFinish umbrella. Leads business development, partnerships, and regional expansion.",
    initials: 'LT',
    photo: '/images/team/lalit_tayal_v2.jpg',
    photoPosition: '50% 5%',
  },
];

function LogoChips({ logos }: { logos: TimelineLogo[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
      {logos.map((logo) =>
        logo.circle ? (
          <div
            key={logo.src}
            className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10"
            title={logo.alt}
          >
            <Image src={logo.src} alt={logo.alt} fill className="object-cover" />
          </div>
        ) : (
          <div
            key={logo.src}
            className="flex h-7 items-center rounded-md bg-white px-2"
            title={logo.alt}
          >
            <Image src={logo.src} alt={logo.alt} width={64} height={20} className="h-4 w-auto object-contain" />
          </div>
        )
      )}
    </div>
  );
}

const GRID_DARK = {
  backgroundImage:
    'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
};

export default function AboutPageContent() {
  const timelineRef        = useRef<HTMLElement>(null);
  const timelineEyebrowRef = useRef<HTMLSpanElement>(null);
  const timelineHeadRef    = useRef<HTMLSpanElement>(null);

  const foundersRef        = useRef<HTMLElement>(null);
  const foundersEyebrowRef = useRef<HTMLSpanElement>(null);
  const foundersHeadRef    = useRef<HTMLSpanElement>(null);

  useHeadingAnimation({
    trigger: foundersRef,
    eyebrow: foundersEyebrowRef,
    line1: foundersHeadRef,
  });

  /* Timeline — heading + cards, fully bidirectional (play in ↓ / reverse out ↑) */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Heading: eyebrow slides from left, title slides from left */
      if (timelineEyebrowRef.current) {
        gsap.fromTo(
          timelineEyebrowRef.current,
          { x: '-120%', opacity: 0 },
          {
            x: '0%', opacity: 1, duration: 0.55, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: timelineEyebrowRef.current,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
      if (timelineHeadRef.current) {
        gsap.fromTo(
          timelineHeadRef.current,
          { x: '-110%', opacity: 0 },
          {
            x: '0%', opacity: 1, duration: 0.65, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: timelineHeadRef.current,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      /* Cards: slide in from their side, reverse back out on scroll up */
      const cards = document.querySelectorAll<HTMLElement>('.tl-card');
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: fromLeft ? -36 : 36, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.55, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return (
    <main itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content="Value Added Coating Solutions Pvt. Ltd." />
      <meta itemProp="foundingDate" content="1999" />

      {/* ── S1 TIMELINE — landing section ── */}
      <section className="relative overflow-hidden bg-[#070809]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={GRID_DARK}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 40% at 50% 0%, transparent 30%, rgba(7,8,9,0.88) 100%)',
          }}
        />
        <div className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[#FECE00]/[0.07] blur-[120px]" />

        <div ref={timelineRef} id="our-story" className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48">

          {/* Header */}
          <div className="mb-16 md:mb-20">
            <div className="overflow-hidden pb-[0.15em]">
              <span
                ref={timelineEyebrowRef}
                className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55"
                style={{ willChange: 'transform, opacity' }}
              >
                Our Story
              </span>
            </div>
            <div className="overflow-hidden pb-[0.12em]">
              <span
                ref={timelineHeadRef}
                className="block font-display text-[clamp(2.4rem,5.5vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white"
                style={{ willChange: 'transform, opacity' }}
              >
                25 years in the making.
              </span>
            </div>
          </div>

          {/* Timeline — desktop: alternating | mobile: single column */}
          <div className="relative">
            {/* Vertical spine — desktop only */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#FECE00]/15 md:block" />

            <div className="flex flex-col gap-0">
              {TIMELINE.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className="relative mb-6 flex flex-col md:mb-0 md:grid md:grid-cols-[1fr_48px_1fr] md:items-start"
                  >
                    {/* ── MOBILE: stacked layout ── */}
                    <div className="flex items-start gap-4 md:hidden">
                      <div className="flex flex-col items-center pt-1">
                        <div className="h-3 w-3 flex-shrink-0 rounded-full bg-[#FECE00]" />
                        {i < TIMELINE.length - 1 && (
                          <div className="mt-1 w-px flex-1 bg-[#FECE00]/20" style={{ minHeight: '3rem' }} />
                        )}
                      </div>
                      <div className="tl-card flex-1 rounded-[1rem] border border-white/[0.07] bg-white/[0.04] p-5">
                        <time
                          dateTime={item.year.replace('–', '/')}
                          className="mb-1 block font-display text-[1.6rem] font-black leading-none tracking-[-0.03em] text-[#FECE00]"
                        >
                          {item.year}
                        </time>
                        <h3 className="mb-2 font-display text-[0.95rem] font-black leading-tight text-white">
                          {item.title}
                        </h3>
                        <p className="text-[0.78rem] leading-relaxed text-white/50">{item.body}</p>
                        {item.logos && <LogoChips logos={item.logos} />}
                      </div>
                    </div>

                    {/* ── DESKTOP: alternating ── */}

                    {/* Left column */}
                    <div
                      className={`hidden md:flex md:pb-14 ${
                        isEven
                          ? 'justify-end pr-10'
                          : 'justify-start pl-10'
                      }`}
                    >
                      {isEven ? (
                        /* Even: year on left */
                        <div className="tl-card text-right">
                          <time
                            dateTime={item.year.replace('–', '/')}
                            className="block font-display font-black leading-none tracking-[-0.04em] text-[#FECE00]"
                            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
                          >
                            {item.year}
                          </time>
                          <h3 className="mt-2 font-display text-[1rem] font-black leading-tight text-white">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-sm text-[0.8rem] leading-relaxed text-white/50">
                            {item.body}
                          </p>
                        </div>
                      ) : (
                        /* Odd: card on left */
                        <div className="tl-card w-full max-w-sm rounded-[1rem] border border-white/[0.07] bg-white/[0.04] p-5">
                          <h3 className="mb-2 font-display text-[1rem] font-black leading-tight text-white">
                            {item.title}
                          </h3>
                          <p className="text-[0.8rem] leading-relaxed text-white/50">{item.body}</p>
                          {item.logos && <LogoChips logos={item.logos} />}
                        </div>
                      )}
                    </div>

                    {/* Center dot column */}
                    <div className="hidden md:flex md:flex-col md:items-center">
                      <div className="relative z-10 mt-4 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#FECE00] bg-[#070809]">
                        <div className="h-2 w-2 rounded-full bg-[#FECE00]" />
                      </div>
                    </div>

                    {/* Right column */}
                    <div
                      className={`hidden md:flex md:pb-14 ${
                        isEven
                          ? 'justify-start pl-10'
                          : 'justify-end pr-10'
                      }`}
                    >
                      {isEven ? (
                        /* Even: card on right */
                        <div className="tl-card w-full max-w-sm rounded-[1rem] border border-white/[0.07] bg-white/[0.04] p-5">
                          <h3 className="mb-2 font-display text-[1rem] font-black leading-tight text-white">
                            {item.title}
                          </h3>
                          <p className="text-[0.8rem] leading-relaxed text-white/50">{item.body}</p>
                          {item.logos && <LogoChips logos={item.logos} />}
                        </div>
                      ) : (
                        /* Odd: year on right */
                        <div className="tl-card text-left">
                          <time
                            dateTime={item.year.replace('–', '/')}
                            className="block font-display font-black leading-none tracking-[-0.04em] text-[#FECE00]"
                            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
                          >
                            {item.year}
                          </time>
                          <h3 className="mt-2 font-display text-[1rem] font-black leading-tight text-white">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-sm text-[0.8rem] leading-relaxed text-white/50">
                            {item.body}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── S3 GENERAL ABOUT ── */}
      <section className="relative overflow-hidden bg-[#f1efea] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-[1fr_1.25fr] md:gap-16 lg:gap-24">

            {/* Left — headline */}
            <div>
              <span className="card-accent-label mb-4">About VACSPL</span>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3.5vw,2.9rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
                More than a manufacturer.<br />
                <span className="text-yellow">A coating company.</span>
              </h2>
            </div>

            {/* Right — body + value pills */}
            <div className="flex flex-col gap-6">
              <p className="text-[0.88rem] leading-relaxed text-ink/60">
                Value Added Coating Solutions Pvt. Ltd. — the company behind OptiFinish — designs and
                manufactures complete powder coating lines, develops proprietary automation systems, and
                distributes premium liquid coating equipment from GEMA and Dürr across India.
              </p>
              <p className="text-[0.88rem] leading-relaxed text-ink/60">
                Based out of Greater Noida with offices in Gurugram, Rudrapur, and Bengaluru, VACSPL
                has commissioned 500+ installations across automotive, consumer appliances, steel
                fabrication, and architectural sectors. Every product — from the spray booth to the
                curing oven to the conveyor — is built in-house at our Kasna facility and backed by a
                team that has spent over two decades on factory floors.
              </p>

              {/* Value pills */}
              <div className="mt-2 flex flex-col gap-3">
                {VALUES.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-[0.9rem] border border-ink/[0.07] bg-white/70 px-5 py-4"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      {v.emoji && (
                        <span
                          className="leading-none"
                          style={{
                            fontSize: v.emoji === '🇨🇭' ? '1.65rem' : '1.3rem',
                            display: 'inline-block',
                            transform: v.emoji === '🇨🇭' ? 'scaleX(1.2)' : undefined,
                          }}
                        >
                          {v.emoji}
                        </span>
                      )}
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink">
                        {v.title}
                      </p>
                    </div>
                    <p className="text-[0.8rem] leading-relaxed text-ink/55">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S4 FOUNDERS — dark ── */}
      <section
        ref={foundersRef}
        className="relative overflow-hidden bg-[#070809] py-20 md:py-28"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.028]" style={GRID_DARK} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-12">
            <div className="overflow-hidden pb-[0.15em]">
              <span
                ref={foundersEyebrowRef}
                className="mb-3 block text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55"
                style={{ willChange: 'transform, opacity' }}
              >
                The Founders
              </span>
            </div>
            <div className="overflow-hidden pb-[0.12em]">
              <h2
                ref={foundersHeadRef}
                className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
                style={{ willChange: 'transform, opacity' }}
              >
                Two people who never stopped<br className="hidden sm:block" /> being curious about coating.
              </h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <article
                key={f.name}
                className="flex flex-col gap-5 overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-white/[0.04] p-6 md:p-8"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#FECE00]/30 bg-white/[0.06]">
                  {f.photo ? (
                    <Image
                      src={f.photo}
                      alt={f.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: f.photoPosition ?? '50% 10%' }}
                      sizes="80px"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-display text-[1.1rem] font-black text-[#FECE00]/40">
                      {f.initials}
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    itemProp="name"
                    className="font-display text-[1.2rem] font-black leading-tight tracking-tight text-white"
                  >
                    {f.name}
                  </h3>
                  <p
                    itemProp="jobTitle"
                    className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#FECE00]/50"
                  >
                    {f.role}
                  </p>
                </div>

                <div className="rounded-[0.7rem] bg-white/[0.05] px-3.5 py-2">
                  <p className="text-[0.67rem] font-semibold text-white/40">{f.credentials}</p>
                </div>

                <p className="text-[0.83rem] leading-relaxed text-white/50" itemProp="description">
                  {f.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5 VINAYAK AGENCIES — light ── */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="card-accent-label mb-3">Sister Concern</span>
              <h2 className="font-display text-[clamp(1.3rem,2.8vw,2.1rem)] font-black leading-tight tracking-[-0.03em] text-ink">
                Vinayak Agencies
              </h2>
              <p className="mt-3 text-[0.84rem] leading-relaxed text-ink/55">
                Founded in 2001, Vinayak Agencies is the trading arm of the group — supplying
                industrial powder coatings, liquid paints, touch-up products, PU enamels, and
                adhesives to manufacturing plants across North India. A Nerolac channel partner
                since 2003.
              </p>
            </div>
            <Link
              href="/products/vinayak"
              className="self-start rounded-full border border-ink/[0.18] px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 transition-all hover:border-ink/40 hover:text-ink md:self-auto md:flex-shrink-0"
            >
              View products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── S6 CTA — dark ── */}
      <section className="relative overflow-hidden bg-[#070809] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.028]" style={GRID_DARK} />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FECE00]/20 blur-[80px]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="noise relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.03] px-5 py-10 text-center sm:px-8 sm:py-14 md:px-16 md:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FECE00]/15 blur-[60px]" />
            <div className="relative">
              <span className="tech-kicker mb-4 block">Ready to talk?</span>
              <h2 className="font-display mx-auto max-w-2xl text-[clamp(1.45rem,4.5vw,3.2rem)] font-black leading-[0.93] tracking-[-0.04em] text-white">
                Let&apos;s find the right coating<br className="hidden sm:block" /> solution for your line.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-relaxed text-white/45">
                Whether you need a complete plant, a single machine, an automation upgrade,
                or after-sales support — we&apos;re here.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="panel-button dynamic-button dynamic-button-yellow">
                  <span>Get in Touch</span>
                  <div className="dynamic-button-glow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
