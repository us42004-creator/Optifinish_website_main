import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'Facility | OptiFinish — Greater Noida Manufacturing & R&D',
  description:
    'OptiFinish Greater Noida manufacturing and R&D facility — where powder coating plants, curing ovens, Z-TAP, and ZA01 are designed, built, tested, and commissioned.',
};

/* ─── Photo groups ─── */

// S1 hero — factory floor, dramatic
const HERO_BG = '/images/facility/facility-44.jpg';

// S2 capabilities — office & meeting rooms (4 distinct shots, no duplicates)
const OFFICE_GRID = [
  '/images/facility/facility-78.jpg',  // office floor with active computers
  '/images/facility/facility-74.jpg',  // U-shape conference room
  '/images/facility/facility-06.jpg',  // office with glass partitions + yellow dividers
  '/images/facility/facility-79.jpg',  // wide office from glass-wall side
];

// S3 manufacturing floor
const MFG_HERO       = '/images/facility/facility-62.jpg';   // large left — 2 workers between spray booth panels
const MFG_SIDE       = '/images/facility/facility-35.jpg';   // tall right — workers fabricating cyclone/hopper
const MFG_ROW = [
  '/images/facility/facility-63.jpg',  // booth panel assembly, workers
  '/images/facility/facility-67.jpg',  // overhead conveyor rail — coating line component
  '/images/facility/facility-60.jpg',  // worker handling panels
  '/images/facility/facility-64.jpg',  // equipment assembly, yellow insulation
];

// S4 R&D split
const RD_PHOTO_L = '/images/facility/facility-31.jpg';  // manufacturing floor — workers actively building (replaces wrong exterior shot)
const RD_PHOTO_R = '/images/facility/facility-19.jpg';  // modern pendant-lit conference room

// S5 office filmstrip — 7 unique images, no repeats, no missing files
const OFFICE_STRIP = [
  '/images/facility/facility-76.jpg',  // warm pendant-lit meeting room
  '/images/facility/facility-09.jpg',  // small pendant meeting room (side angle)
  '/images/facility/facility-21.jpg',  // warm meeting room (wider view through glass)
  '/images/facility/facility-43.jpg',  // conference room with certifications on wall
  '/images/facility/facility-61.jpg',  // worker fabricating booth panels — people at work
  '/images/facility/facility-33.jpg',  // wide manufacturing floor, multiple workers
  '/images/facility/facility-66.jpg',  // equipment assembly with yellow insulation
];

// S6 full gallery — curated clean set, no repeats, no competitor branding, no under-construction shots
const GALLERY = [
  '/images/facility/facility-01.jpg',  // office interior
  '/images/facility/facility-05.jpg',  // office with glass partitions
  '/images/facility/facility-07.jpg',  // office floor with computers
  '/images/facility/facility-11.jpg',  // conference room
  '/images/facility/facility-26.jpg',  // GEMA testing/demo booth — relevant proof
  '/images/facility/facility-30.jpg',  // manufacturing floor with workers
  '/images/facility/facility-65.jpg',  // equipment assembly close-up
  '/images/facility/facility-68.jpg',  // overhead conveyor rail (different angle from MFG_ROW/67)
  '/images/facility/facility-71.jpg',  // building entrance / stairwell
];

const STATS = [
  { value: 'Est. 2011', label: 'Greater Noida' },
  { value: '14+',       label: 'Years in production' },
  { value: '500+',      label: 'Plants shipped' },
  { value: 'R&D',       label: 'In-house development' },
];

const CAPABILITIES = [
  {
    title: 'Plant Manufacturing',
    desc: 'Complete powder coating plants, curing ovens, booths, and pretreatment lines built in-house.',
  },
  {
    title: 'Automation R&D',
    desc: 'Z-TAP and ZA01 are developed, assembled, and tested entirely at this facility.',
  },
  {
    title: 'Demo & Trial',
    desc: 'Customers can submit parts for coating trials before committing to a full line.',
  },
  {
    title: 'Commissioning Centre',
    desc: 'New lines are tested and validated here before dispatch and site installation.',
  },
];

/* ─── Dark grid overlay ─── */
const DARK_GRID_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
};
const LIGHT_GRID_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)',
  backgroundSize: '88px 88px',
};

export default function FacilityPage() {
  return (
    <main className="min-h-screen overflow-hidden">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S1 — FULL-VIEWPORT HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">

        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src={HERO_BG}
            alt="OptiFinish manufacturing facility — Greater Noida"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Layered dark overlay — darker at top (navbar) and bottom (text) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070809]/70 via-[#070809]/30 to-[#070809]/85" />
          {/* Yellow grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={DARK_GRID_STYLE}
          />
        </div>

        {/* Content — bottom aligned */}
        <div className="relative flex flex-1 flex-col justify-end pb-0 pt-[100px]">
          <div className="mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 md:pb-16">

            {/* Location pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
              <span className="text-[0.55rem] font-bold uppercase tracking-[0.24em] text-white/65">
                Greater Noida · Uttar Pradesh
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display max-w-3xl text-[clamp(1.8rem,6vw,5rem)] font-black leading-[0.88] tracking-[-0.04em] text-white">
              Where OptiFinish
              <br />
              <span className="text-[#FECE00]">products are built.</span>
            </h1>

            {/* Subline */}
            <p className="mt-4 max-w-lg text-[0.82rem] leading-relaxed text-white/50 md:mt-5 md:text-[0.92rem]">
              Our manufacturing and R&amp;D facility in Greater Noida is where every OptiFinish
              product is designed, fabricated, tested, and dispatched — backed by 14 years of
              hands-on production experience.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#FECE00] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A] transition-opacity hover:opacity-85"
              >
                Plan a visit <span>→</span>
              </Link>
              <Link
                href="/services/ttr"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white"
              >
                Book a coating trial
              </Link>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div className="relative border-t border-white/[0.1] bg-[#070809]/75 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.08] md:flex md:divide-y-0">
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col justify-center gap-0.5 px-4 py-3 md:px-6 md:py-4 lg:px-8">
                    <span className="font-display text-[1.1rem] font-black leading-none tracking-[-0.03em] text-[#FECE00] md:text-[1.35rem]">
                      {s.value}
                    </span>
                    <span className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-white/38 md:text-[0.55rem]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S2 — WHAT HAPPENS HERE (light)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
          style={LIGHT_GRID_STYLE}
        />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* Text column */}
            <div>
              <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
                The Facility
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]">
                Manufacturing.{' '}
                <span className="text-[#FECE00]" style={{ WebkitTextStroke: '0px' }}>R&amp;D.</span>
                <br />
                Trials. Commissioning.
              </h2>
              <p className="mt-5 max-w-md text-[0.88rem] leading-relaxed text-[#0A0A0A]/52">
                This is not just a factory. It is a live development environment where we build
                products, test them, commission them, and refine them — all under one roof
                in Greater Noida.
              </p>

              {/* Capability cards */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {CAPABILITIES.map((cap) => (
                  <div
                    key={cap.title}
                    className="flex flex-col gap-2 rounded-[1rem] border border-[#0A0A0A]/[0.07] bg-white/70 p-4"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FECE00]/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                    </span>
                    <h3 className="font-display text-[0.88rem] font-black leading-snug tracking-tight text-[#0A0A0A]">
                      {cap.title}
                    </h3>
                    <p className="text-[0.72rem] leading-relaxed text-[#0A0A0A]/48">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2×2 photo grid */}
            <div className="grid h-[260px] grid-cols-2 grid-rows-2 gap-2 md:h-[400px] lg:h-[480px]">
              {OFFICE_GRID.map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-[1rem]">
                  <Image
                    src={src}
                    alt="OptiFinish facility — office interior"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S3 — MANUFACTURING FLOOR (dark)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#070809] py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={DARK_GRID_STYLE}
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          {/* Heading */}
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
                Production
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
                The manufacturing floor.
              </h2>
            </div>
            <p className="max-w-sm text-[0.82rem] leading-relaxed text-white/38 md:text-right">
              Powder coating plants, curing ovens, spray booths, pretreatment lines, and proprietary
              automation systems — all built here.
            </p>
          </div>

          {/* Row 1: large hero (full width mobile, 2/3 desktop) + side (full width mobile, 1/3 desktop) */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:h-[420px]">
            <div className="relative col-span-1 h-[240px] overflow-hidden rounded-[1.1rem] md:col-span-2 md:h-full">
              <Image
                src={MFG_HERO}
                alt="OptiFinish manufacturing — factory floor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#070809]/60 px-3 py-1 text-[0.5rem] font-bold uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
                Production floor
              </div>
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-[1.1rem] md:h-full">
              <Image
                src={MFG_SIDE}
                alt="OptiFinish manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Row 2: 4 equal tiles — 2-col on mobile, 4-col on desktop */}
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 md:h-[220px]">
            {MFG_ROW.map((src, i) => (
              <div key={i} className="relative h-[140px] overflow-hidden rounded-[1.1rem] md:h-full">
                <Image
                  src={src}
                  alt="OptiFinish facility"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Capability tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              'Powder Coating Plants',
              'Curing Ovens',
              'Spray Booths',
              'Pretreatment Lines',
              'Z-TAP Robotic Systems',
              'ZA01 Reciprocators',
              'Control Panels',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.09] bg-white/[0.04] px-3.5 py-1.5 text-[0.62rem] font-semibold text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S4 — R&D & TRIALS (light, full-bleed split)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea]">
        <div
          className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
          style={LIGHT_GRID_STYLE}
        />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative grid min-h-[560px] lg:grid-cols-2">

          {/* Photo half — left */}
          <div className="relative min-h-[320px] lg:min-h-0">
            <Image
              src={RD_PHOTO_L}
              alt="OptiFinish R&D and testing facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f1efea]/20 lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
          </div>

          {/* Text half — right */}
          <div className="flex items-center px-5 py-10 md:px-12 lg:px-20">
            <div className="max-w-md">
              <p className="mb-3 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
                R&amp;D &amp; Trials
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]">
                In-house R&amp;D.
                <br />
                <span className="text-[#FECE00]" style={{ WebkitTextStroke: '1.5px #0A0A0A' }}>
                  Real coating trials.
                </span>
              </h2>
              <p className="mt-5 text-[0.88rem] leading-relaxed text-[#0A0A0A]/52">
                Our R&amp;D team develops and refines products at this facility — from the Z-TAP
                motion-mimic algorithms to ZA01 reciprocator mechanics. We also run customer
                coating trials: submit your parts, we coat them, test them, and deliver a full
                process report.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {[
                  'New product development — Z-TAP, ZA01, and future automation',
                  'Customer part trials — powder, substrate, and colour validation',
                  'Process parameter development and documentation',
                  'Adhesion, gloss, film build, and performance testing',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.78rem] text-[#0A0A0A]/60">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FECE00]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services/ttr"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-80"
                >
                  Book a coating trial <span>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A]/20 px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/55 transition-colors hover:text-[#0A0A0A]"
                >
                  Plan a visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S5 — OFFICE & PEOPLE (dark, filmstrip)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#070809] py-16 md:py-20">
        <style>{`
          .facility-page-strip:hover .facility-page-track { animation-play-state: paused; }
        `}</style>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={DARK_GRID_STYLE}
        />
        <div className="relative mx-auto mb-10 max-w-7xl px-5 md:px-8">
          <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
            Environment
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
              Built by people who care<br />
              <span className="text-[#FECE00]">about quality.</span>
            </h2>
            <p className="max-w-sm text-[0.82rem] leading-relaxed text-white/38 md:text-right">
              Behind every system that leaves our facility is a team that has spent years
              getting the details right.
            </p>
          </div>
        </div>

        {/* Photo filmstrip marquee */}
        <div
          className="facility-page-strip overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div
            className="facility-page-track flex gap-3 will-change-transform"
            style={{ animation: 'marquee 42s linear infinite' }}
          >
            {[...OFFICE_STRIP, ...OFFICE_STRIP].map((src, i) => (
              <div
                key={i}
                className="relative h-40 w-56 shrink-0 overflow-hidden rounded-[1rem] sm:h-52 sm:w-72 md:h-64 md:w-96 lg:h-72 lg:w-[28rem]"
              >
                <Image
                  src={src}
                  alt="OptiFinish facility — office environment"
                  fill
                  className="object-cover"
                  sizes="448px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S6 — FULL GALLERY (light, masonry)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
          style={LIGHT_GRID_STYLE}
        />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Gallery
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]">
              Inside the facility.
            </h2>
          </div>

          {/* CSS Masonry — columns layout, 2 cols mobile → 3 cols desktop */}
          <div className="columns-2 gap-2 md:columns-3">
            {GALLERY.map((src, i) => (
              <div
                key={i}
                className="relative mb-2 overflow-hidden rounded-[0.9rem] break-inside-avoid"
                style={{ aspectRatio: i % 5 === 0 ? '4/5' : i % 3 === 0 ? '16/9' : '1/1' }}
              >
                <Image
                  src={src}
                  alt={`OptiFinish facility — photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S7 — VISIT THE FACILITY (dark)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#070809] py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={DARK_GRID_STYLE}
        />
        {/* Yellow glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FECE00]/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">

            {/* Left — text */}
            <div>
              <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
                Open for visits
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
                See the facility
                <br />
                <span className="text-[#FECE00]">in person.</span>
              </h2>
              <p className="mt-5 max-w-md text-[0.9rem] leading-relaxed text-white/40">
                We welcome plant visits from buyers, procurement teams, and engineers evaluating a
                new coating line. Call ahead to schedule — our team will walk you through the
                manufacturing area, demonstrate equipment, and answer your technical questions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FECE00] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A] transition-opacity hover:opacity-85"
                >
                  Plan a visit <span>→</span>
                </Link>
                <Link
                  href="/services/ttr"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60 transition-all hover:border-white/30 hover:text-white"
                >
                  Book a coating trial
                </Link>
              </div>
            </div>

            {/* Right — address + detail card */}
            <div className="flex flex-col gap-4">
              {/* Photo */}
              <div className="relative h-52 overflow-hidden rounded-[1.2rem]">
                <Image
                  src={RD_PHOTO_R}
                  alt="OptiFinish facility entrance"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070809]/60 to-transparent" />
              </div>

              {/* Address card */}
              <div className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="mb-3 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
                  Our location
                </p>
                <p className="text-[0.88rem] font-semibold leading-relaxed text-white/70">
                  Value Added Coating Solutions Pvt. Ltd.
                  <br />
                  <span className="font-normal text-white/40">
                    Greater Noida, Uttar Pradesh, India
                  </span>
                </p>
                <div className="mt-4 flex flex-col gap-2.5 border-t border-white/[0.07] pt-4">
                  {[
                    { icon: '→', label: 'Visits by prior appointment' },
                    { icon: '→', label: 'Coating trials available on-site' },
                    { icon: '→', label: 'Equipment demos arranged on request' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 text-[0.72rem] text-white/38">
                      <span className="text-[#FECE00]">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          S8 — HomeCTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HomeCTA />
    </main>
  );
}
