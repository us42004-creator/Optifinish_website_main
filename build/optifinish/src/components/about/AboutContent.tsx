'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';
import HomeCTA from '@/components/sections/home/HomeCTA';

/* ─── Data ─── */

const STATS = [
  { value: '1999', label: 'Year founded' },
  { value: '375+', label: 'Installations' },
  { value: '14+',  label: 'Years as GEMA partner' },
  { value: '4',    label: 'Office locations' },
];

const VALUES = [
  {
    title: 'Made in India',
    body: 'Every OptiFinish system is designed and manufactured at our Kasna facility. No re-badging. No imports dressed as local product.',
  },
  {
    title: 'Authorised, not approximated',
    body: 'Our GEMA and Dürr partnerships are formal, authorised, and audited. Customers get the real product, the real warranty, and the real support chain.',
  },
  {
    title: 'Long-term over transactional',
    body: "We've worked with many of our customers for over a decade. A plant sale is the beginning of a relationship, not the end of one.",
  },
];

const MILESTONES = [
  {
    year: '1999',
    title: 'Where it began',
    body: 'Harish Sharma and Lalit Tayal joined Rapid Coating as sales executives — two graduates from different paths who found their industry on a factory floor in Ghaziabad. Neither left.',
  },
  {
    year: '2001',
    title: 'First venture',
    body: 'Harish and Lalit registered Vinayak Agencies — a powder trading company run on deep supplier relationships and the trust built visiting hundreds of plants. The foundation of everything that followed.',
  },
  {
    year: '2003',
    title: 'First major partnership',
    body: 'Vinayak Agencies became a channel partner for Nerolac. A meaningful validation for a young trading company, cementing their position as a serious regional distributor.',
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
    body: 'Value Added Coating Solutions Pvt. Ltd. was formally established. The same year, they became a GEMA channel partner and opened a Gurugram office. This was no longer a trading company — this was a coating systems company.',
  },
  {
    year: '2015',
    title: 'Building something permanent',
    body: 'Phase 1 of the Greater Noida, Kasna facility was built. A manufacturing floor, R&D space, and assembly area — owned, not rented. The ability to design, fabricate, and test complete plants under one roof changed everything.',
  },
  {
    year: '2017–2019',
    title: 'Scaling the floor',
    body: 'Phase 2 expansion at Kasna added capacity, headcount, and capability. Testing rigs. Larger fabrication bays. A commissioning area where complete lines are assembled and validated before delivery.',
  },
  {
    year: '2019',
    title: 'The brand is named',
    body: '"OptiFinish" was registered as a trademark. VACSPL was recognised as a GEMA OEM vendor in India — authorised to supply GEMA components as part of integrated coating systems. A milestone that took 20 years to earn.',
  },
  {
    year: '2022',
    title: "India's borders, crossed",
    body: 'The first export orders for OEM equipment were fulfilled. Coating systems designed and manufactured in Greater Noida, shipped internationally — a proof of quality no domestic certification could substitute.',
  },
  {
    year: '2024',
    title: 'Liquid coating, formally added',
    body: 'VACSPL became an authorised channel partner for Dürr — adding the world\'s leading liquid coating equipment portfolio to the OptiFinish offering. For customers running liquid lines alongside powder, OptiFinish is now a single-source solution.',
  },
  {
    year: '2025',
    title: 'South India',
    body: "A Bengaluru office was established, extending VACSPL's direct service reach into South India's growing automotive and appliance manufacturing clusters.",
  },
  {
    year: '2026',
    title: 'R&D and Phase 3',
    body: 'The next chapter is underway. Phase 3 expansion at Kasna adds dedicated R&D infrastructure — test cells, automation development bays, and space for proprietary product development. OptiFinish is building systems that don\'t exist yet.',
  },
];

const FOUNDERS = [
  {
    name: 'Harish Sharma',
    role: 'Co-Founder & Director',
    bio: 'B.Sc. + MBA, Rohilkhand University. Early career at Vardhaman Spinning Mills before discovering the coating industry in 1999. He has spent the last 25 years working every angle of it — sales, procurement, plant commissioning, and product development. He leads manufacturing strategy and key client relationships at VACSPL.',
    initials: 'HS',
  },
  {
    name: 'Lalit Tayal',
    role: 'Co-Founder & Director',
    bio: "B.Sc. + MBA, Shiva Institute of Management Studies. Came to the coating industry from Ayur Herbals. Since 1999, he has built and run the commercial and distribution side of the business — from Vinayak Agencies' first powder sale to Dürr's product range landing under the OptiFinish umbrella. He leads business development, partnerships, and regional expansion.",
    initials: 'LT',
  },
];

/* ─── Grid texture helpers ─── */

function DarkGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.032]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }}
    />
  );
}

function CreamGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.018]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(8,8,8,1) 1px, transparent 1px), linear-gradient(90deg, rgba(8,8,8,1) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }}
    />
  );
}

/* ─── Main component ─── */

export default function AboutContent() {

  /* Section heading animation refs */
  const s1Ref      = useRef<HTMLElement>(null);
  const s1Eye      = useRef<HTMLSpanElement>(null);
  const s1L1       = useRef<HTMLSpanElement>(null);
  const s1L2       = useRef<HTMLSpanElement>(null);
  const s1Body     = useRef<HTMLParagraphElement>(null);

  const s2Ref      = useRef<HTMLElement>(null);
  const s2Eye      = useRef<HTMLSpanElement>(null);
  const s2L1       = useRef<HTMLSpanElement>(null);
  const s2L2       = useRef<HTMLSpanElement>(null);

  const s3Ref      = useRef<HTMLElement>(null);
  const s3Eye      = useRef<HTMLSpanElement>(null);
  const s3L1       = useRef<HTMLSpanElement>(null);
  const s3L2       = useRef<HTMLSpanElement>(null);

  const s4Ref      = useRef<HTMLElement>(null);
  const s4Eye      = useRef<HTMLSpanElement>(null);
  const s4L1       = useRef<HTMLSpanElement>(null);
  const s4L2       = useRef<HTMLSpanElement>(null);

  const s5Ref      = useRef<HTMLElement>(null);
  const s5Eye      = useRef<HTMLSpanElement>(null);
  const s5L1       = useRef<HTMLSpanElement>(null);

  useHeadingAnimation({ trigger: s1Ref, eyebrow: s1Eye, line1: s1L1, line2: s1L2, body: s1Body });
  useHeadingAnimation({ trigger: s2Ref, eyebrow: s2Eye, line1: s2L1, line2: s2L2 });
  useHeadingAnimation({ trigger: s3Ref, eyebrow: s3Eye, line1: s3L1, line2: s3L2 });
  useHeadingAnimation({ trigger: s4Ref, eyebrow: s4Eye, line1: s4L1, line2: s4L2 });
  useHeadingAnimation({ trigger: s5Ref, eyebrow: s5Eye, line1: s5L1 });

  return (
    <main>

      {/* ══════════════════════════════════════════════════
          S1 — HERO  (dark #070809)
      ══════════════════════════════════════════════════ */}
      <section ref={s1Ref} className="relative min-h-[70vh] overflow-hidden bg-[#070809] flex items-center pt-28 pb-20 md:pt-36 md:pb-28">
        <DarkGrid />

        {/* Yellow glow top-centre */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[400px] w-[560px] -translate-x-1/2 rounded-full bg-[#FECE00]/[0.03] blur-[100px]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="overflow-hidden pb-[0.1em]">
              <span
                ref={s1Eye}
                className="mb-4 block text-[0.56rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/55"
                style={{ willChange: 'transform, opacity' }}
              >
                About VACSPL
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-black leading-[0.96] tracking-[-0.045em] text-white md:leading-[0.9]">
              <div className="overflow-hidden pb-[0.12em]">
                <span ref={s1L1} className="block" style={{ willChange: 'transform, opacity' }}>
                  Built from
                </span>
              </div>
              <div className="overflow-hidden pb-[0.12em]">
                <span ref={s1L2} className="block text-[#FECE00]" style={{ willChange: 'transform, opacity' }}>
                  the floor up.
                </span>
              </div>
            </h1>

            {/* Subline */}
            <p
              ref={s1Body}
              className="mt-6 max-w-[580px] text-[0.88rem] leading-[1.9] text-white/38 md:text-[1rem]"
              style={{ willChange: 'transform, opacity' }}
            >
              Value Added Coating Solutions Pvt. Ltd. was founded by two engineers who spent years learning
              the coating industry from the inside — selling powder, understanding plants, watching what failed.
              OptiFinish is what they built when they decided to fix it.
            </p>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[0.9rem] border border-[#FECE00]/[0.12] bg-[#FECE00]/[0.04] px-4 py-4"
                >
                  <div className="font-display text-[1.6rem] font-black leading-none tracking-[-0.03em] text-white md:text-[2rem]">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-[#FECE00]/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          S2 — GENERAL ABOUT  (cream #f1efea)
      ══════════════════════════════════════════════════ */}
      <section ref={s2Ref} className="relative overflow-hidden bg-[#f1efea] py-20 md:py-28">
        <CreamGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">

            {/* Left — heading */}
            <div className="flex flex-col justify-center">
              <div className="overflow-hidden pb-[0.1em]">
                <span
                  ref={s2Eye}
                  className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.26em] text-[#0A0A0A]/38"
                  style={{ willChange: 'transform, opacity' }}
                >
                  About VACSPL
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.7rem,4vw,3.2rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
                <div className="overflow-hidden pb-[0.12em]">
                  <span ref={s2L1} className="block" style={{ willChange: 'transform, opacity' }}>
                    More than a manufacturer.
                  </span>
                </div>
                <div className="overflow-hidden pb-[0.12em]">
                  <span ref={s2L2} className="block text-[#FECE00]" style={{ willChange: 'transform, opacity' }}>
                    A coating company.
                  </span>
                </div>
              </h2>
            </div>

            {/* Right — body + value pills */}
            <div className="flex flex-col gap-6">
              <p className="text-[0.88rem] leading-[1.85] text-ink/58">
                Value Added Coating Solutions Pvt. Ltd. — the company behind OptiFinish — designs and
                manufactures complete powder coating lines, develops proprietary automation systems, and
                distributes premium liquid coating equipment from GEMA and Dürr across India.
              </p>
              <p className="text-[0.88rem] leading-[1.85] text-ink/58">
                Based out of Greater Noida with offices in Gurugram, Rudrapur, and Bengaluru, VACSPL has
                commissioned 375+ installations across automotive, consumer appliances, steel fabrication,
                and architectural sectors. Every product — from the spray booth to the curing oven to the
                conveyor — is built in-house at our Kasna facility and backed by a team that has spent over
                two decades on factory floors.
              </p>

              {/* Value pills */}
              <div className="mt-2 flex flex-col gap-4 border-t border-ink/[0.07] pt-6">
                {VALUES.map((v) => (
                  <div key={v.title} className="flex items-start gap-4">
                    <span className="mt-[3px] h-2 w-2 flex-shrink-0 rounded-full bg-[#FECE00]" />
                    <div>
                      <p className="text-[0.78rem] font-black tracking-tight text-ink">{v.title}</p>
                      <p className="mt-0.5 text-[0.74rem] leading-relaxed text-ink/50">{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          S3 — OUR STORY / TIMELINE  (dark #070809)
      ══════════════════════════════════════════════════ */}
      <section ref={s3Ref} className="relative overflow-hidden bg-[#070809] py-20 md:py-28">
        <DarkGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          {/* Section header — centred */}
          <div className="mb-16 text-center md:mb-20">
            <div className="overflow-hidden pb-[0.1em]">
              <span
                ref={s3Eye}
                className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/55"
                style={{ willChange: 'transform, opacity' }}
              >
                Our Story
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
              <div className="overflow-hidden pb-[0.12em]">
                <span ref={s3L1} className="block" style={{ willChange: 'transform, opacity' }}>
                  25 years
                </span>
              </div>
              <div className="overflow-hidden pb-[0.12em]">
                <span ref={s3L2} className="block text-[#FECE00]" style={{ willChange: 'transform, opacity' }}>
                  in the making.
                </span>
              </div>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">

            {/* Desktop centre spine */}
            <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#FECE00]/[0.15] lg:block" />

            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={m.year} className="relative">

                  {/* ── Mobile layout ── */}
                  <div className="flex gap-5 pb-10 lg:hidden">
                    {/* Spine */}
                    <div className="flex shrink-0 flex-col items-center pt-1">
                      <div className="h-3 w-3 rounded-full bg-[#FECE00] ring-4 ring-[#FECE00]/15" />
                      {i < MILESTONES.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-[#FECE00]/[0.15]" />
                      )}
                    </div>
                    {/* Card */}
                    <div className="pb-4">
                      <span className="mb-2 inline-block rounded-full bg-[#FECE00] px-2.5 py-0.5 text-[0.52rem] font-black uppercase tracking-[0.14em] text-ink">
                        {m.year}
                      </span>
                      <h3 className="font-display text-[0.95rem] font-black leading-tight tracking-tight text-white">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 text-[0.76rem] leading-relaxed text-white/42">
                        {m.body}
                      </p>
                    </div>
                  </div>

                  {/* ── Desktop alternating layout ── */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_64px_1fr] lg:items-start">
                    {/* Left slot */}
                    <div className={`lg:py-8 ${isLeft ? 'lg:pr-12 lg:text-right' : ''}`}>
                      {isLeft && (
                        <>
                          <span className="mb-2 inline-block rounded-full bg-[#FECE00] px-3 py-0.5 text-[0.52rem] font-black uppercase tracking-[0.14em] text-ink">
                            {m.year}
                          </span>
                          <h3 className="font-display text-[1.05rem] font-black leading-tight tracking-tight text-white">
                            {m.title}
                          </h3>
                          <p className="mt-2 text-[0.76rem] leading-relaxed text-white/42">
                            {m.body}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="flex flex-col items-center">
                      <div className="mt-9 h-4 w-4 rounded-full bg-[#FECE00] ring-[5px] ring-[#FECE00]/15 ring-offset-[3px] ring-offset-[#070809]" />
                      {i < MILESTONES.length - 1 && (
                        <div className="w-px flex-1 bg-[#FECE00]/[0.15]" />
                      )}
                    </div>

                    {/* Right slot */}
                    <div className={`lg:py-8 ${!isLeft ? 'lg:pl-12' : ''}`}>
                      {!isLeft && (
                        <>
                          <span className="mb-2 inline-block rounded-full bg-[#FECE00] px-3 py-0.5 text-[0.52rem] font-black uppercase tracking-[0.14em] text-ink">
                            {m.year}
                          </span>
                          <h3 className="font-display text-[1.05rem] font-black leading-tight tracking-tight text-white">
                            {m.title}
                          </h3>
                          <p className="mt-2 text-[0.76rem] leading-relaxed text-white/42">
                            {m.body}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          S4 — FOUNDERS  (cream #f1efea)
      ══════════════════════════════════════════════════ */}
      <section ref={s4Ref} className="relative overflow-hidden bg-[#f1efea] py-20 md:py-28">
        <CreamGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="overflow-hidden pb-[0.1em]">
              <span
                ref={s4Eye}
                className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.26em] text-[#0A0A0A]/38"
                style={{ willChange: 'transform, opacity' }}
              >
                The Founders
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.6rem)] font-black leading-[0.94] tracking-[-0.04em] text-ink">
              <div className="overflow-hidden pb-[0.12em]">
                <span ref={s4L1} className="block" style={{ willChange: 'transform, opacity' }}>
                  Two people who never stopped being
                </span>
              </div>
              <div className="overflow-hidden pb-[0.12em]">
                <span ref={s4L2} className="block text-[#FECE00]" style={{ willChange: 'transform, opacity' }}>
                  curious about coating.
                </span>
              </div>
            </h2>
          </div>

          {/* Founder cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div
                key={f.name}
                className="flex flex-col gap-6 rounded-[1.3rem] border border-ink/[0.08] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-8"
              >
                {/* Photo placeholder */}
                <div className="flex h-20 w-20 items-center justify-center rounded-[1rem] bg-[#FECE00]/[0.12]">
                  <span className="font-display text-[1.3rem] font-black tracking-tight text-ink/50">
                    {f.initials}
                  </span>
                </div>

                {/* Name + role */}
                <div>
                  <h3 className="font-display text-[1.1rem] font-black leading-tight tracking-tight text-ink">
                    {f.name}
                  </h3>
                  <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#FECE00]">
                    {f.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-[0.8rem] leading-[1.85] text-ink/52">
                  {f.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          S5 — VINAYAK AGENCIES  (dark #070809)
      ══════════════════════════════════════════════════ */}
      <section ref={s5Ref} className="relative overflow-hidden bg-[#070809] py-16 md:py-20">
        <DarkGrid />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">

            {/* Text block */}
            <div className="max-w-xl">
              <div className="overflow-hidden pb-[0.1em]">
                <span
                  ref={s5Eye}
                  className="mb-3 block text-[0.5rem] font-bold uppercase tracking-[0.28em] text-[#FECE00]/45"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Sister Concern
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-black leading-tight tracking-[-0.04em] text-white">
                <div className="overflow-hidden pb-[0.1em]">
                  <span ref={s5L1} className="block" style={{ willChange: 'transform, opacity' }}>
                    Vinayak Agencies
                  </span>
                </div>
              </h2>
              <p className="mt-4 text-[0.82rem] leading-[1.85] text-white/40">
                Founded in 2001, Vinayak Agencies is the trading arm of the group — supplying industrial
                powder coatings, liquid paints, touch-up products, PU enamels, and adhesives to
                manufacturing plants across North India. A Nerolac channel partner since 2003.
              </p>
            </div>

            {/* CTA strip */}
            <div className="flex flex-col gap-3 md:items-end">
              <div className="flex items-center gap-3 rounded-[1rem] border border-[#FECE00]/[0.14] bg-[#FECE00]/[0.05] px-5 py-3.5">
                <div className="h-2 w-2 rounded-full bg-[#FECE00]" />
                <span className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/55">
                  Est. 2001 · Powder & Coatings Trading
                </span>
              </div>
              <Link
                href="/products/vinayak"
                className="group flex items-center gap-2 self-start rounded-full border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/50 transition-all duration-200 hover:border-[#FECE00]/40 hover:text-[#FECE00]"
              >
                View product range
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          S6 — CTA  (reuse HomeCTA)
      ══════════════════════════════════════════════════ */}
      <HomeCTA />

    </main>
  );
}
