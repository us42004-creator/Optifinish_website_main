import type { Metadata } from 'next';
import Link from 'next/link';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'Services | OptiFinish — After-Sales, Maintenance & Support',
  description:
    'Comprehensive after-sales services for powder coating lines — AMC contracts, commissioning, troubleshooting, spare parts, upgrades, and coating trials across India.',
};

const SERVICES = [
  {
    href: '/services/plant-amc',
    label: 'Plant AMC',
    tag: 'Maintenance',
    desc: 'Annual Maintenance Contracts for installed coating lines — scheduled PM visits, breakdown response, and full line care.',
    highlights: ['Quarterly PM visits', '48hr breakdown response', 'All line components'],
    comingSoon: false,
  },
  {
    href: '/services/testing-commissioning',
    label: 'Testing & Commissioning',
    tag: 'Commissioning',
    desc: 'From installation to first production run — mechanical checks, process validation, trial runs, and operator handover.',
    highlights: ['Trial-run validated', 'Full documentation', 'Operator training'],
    comingSoon: false,
  },
  {
    href: '/services/troubleshooting-support',
    label: 'Troubleshooting & Support',
    tag: 'Technical Support',
    desc: 'Remote and on-site diagnosis for coating defects and equipment faults — all makes, all substrates, all processes.',
    highlights: ['Remote + on-site', 'Root cause analysis', 'Same-day response'],
    comingSoon: false,
  },
  {
    href: '/services/upgrades-retrofits',
    label: 'Upgrades & Retrofits',
    tag: 'Line Modernisation',
    desc: 'Extend the life and capability of your line — automation integration, oven upgrades, conveyor modernisation.',
    highlights: ['No full replacement', 'GEMA & automation', 'Minimal downtime'],
    comingSoon: false,
  },
  {
    href: '/services/ttr',
    label: 'Trials, Testing & Review',
    tag: 'Coating Trials',
    desc: 'Submit sample parts to our Greater Noida facility for coating trials — powder testing, colour matching, and process reports.',
    highlights: ['5–7 day turnaround', 'Full process report', 'GEMA-equipped facility'],
    comingSoon: false,
  },
  {
    href: '/services/gema-spare-parts',
    label: 'GEMA Spare Parts',
    tag: 'Parts Supply',
    desc: 'Genuine OEM GEMA spare parts — wear parts, consumables, and complete gun assemblies for all current and legacy models.',
    highlights: ['Genuine OEM parts', 'Stock available', 'All GEMA models'],
    comingSoon: false,
  },
  {
    href: '/services/dcp-server-based-maintenance',
    label: 'DCP Server-Based Maintenance',
    tag: 'Coming Soon',
    desc: 'Remote diagnostics and server-based predictive maintenance for connected coating lines — next-generation service delivery.',
    highlights: ['Remote monitoring', 'Predictive alerts', 'Connected lines'],
    comingSoon: true,
  },
];

const TRUST_STATS = [
  { value: '500+', label: 'Lines serviced' },
  { value: '14+',  label: 'Years of experience' },
  { value: 'PAN India', label: 'Service coverage' },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero (dark) ── */}
      <section className="relative overflow-hidden bg-[#070809] pb-20 pt-[100px] md:pb-28 md:pt-[108px]">

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* Yellow glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#FECE00]/[0.025] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          {/* Eyebrow */}
          <p className="mb-4 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
            After-Sales &amp; Support
          </p>

          {/* Headline */}
          <h1 className="font-display max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
            <span className="block text-white">Services that keep</span>
            <span className="block text-[#FECE00]">your line running.</span>
          </h1>

          {/* Subline */}
          <p className="mt-6 max-w-xl text-[0.9rem] leading-relaxed text-white/38">
            Comprehensive after-sales support, maintenance, commissioning, and spare parts for every
            coating line and every equipment brand we work with — backed by 14+ years of industrial
            experience across India.
          </p>

          {/* Trust stat chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {TRUST_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[#FECE00]/12 bg-[#FECE00]/[0.05] px-5 py-3"
              >
                <div className="font-display text-[1.5rem] font-black leading-none text-[#FECE00]">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/35">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Cards Grid (light) ── */}
      <section className="relative overflow-hidden bg-[#f1efea] py-16 md:py-20">

        {/* Grid drift */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            opacity: 0.55,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Service Portfolio
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Everything we offer, clearly.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc) =>
              svc.comingSoon ? (
                /* Coming soon card */
                <div
                  key={svc.href}
                  className="flex flex-col gap-4 rounded-[1.2rem] border border-[#0A0A0A]/[0.06] bg-white/40 p-5 opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-[#0A0A0A]/[0.12] bg-[#0A0A0A]/[0.05] px-2.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/40">
                      {svc.tag}
                    </span>
                    <span className="rounded-full bg-[#0A0A0A]/[0.06] px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/35">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="font-display text-[1rem] font-black leading-snug tracking-tight text-[#0A0A0A]">
                    {svc.label}
                  </h3>
                  <p className="text-[0.75rem] leading-relaxed text-[#0A0A0A]/45">{svc.desc}</p>
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-[#0A0A0A]/[0.07] pt-4">
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[0.68rem] text-[#0A0A0A]/35">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#0A0A0A]/20" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                /* Active service card */
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group flex flex-col gap-4 rounded-[1.2rem] border border-[#0A0A0A]/[0.07] bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A0A0A]/[0.14] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#FECE00] px-2.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]">
                      {svc.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.05rem] font-black leading-snug tracking-tight text-[#0A0A0A]">
                    {svc.label}
                  </h3>
                  <p className="text-[0.75rem] leading-relaxed text-[#0A0A0A]/50">{svc.desc}</p>
                  <ul className="flex flex-col gap-1.5 border-t border-[#0A0A0A]/[0.07] pt-4">
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[0.68rem] font-medium text-[#0A0A0A]/45">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#FECE00]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/25 transition-colors group-hover:text-[#0A0A0A]/65">
                    Learn more{' '}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Why OptiFinish Services (dark) ── */}
      <section className="relative bg-[#070809] py-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
                Our Commitment
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
                Manufacturer-level{' '}
                <span className="text-[#FECE00]">service expertise.</span>
              </h2>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-white/38">
                OptiFinish services are delivered by the same team that designs, manufactures, and
                commissions the equipment. We know it at the level of detail that only a manufacturer
                can — and that changes the quality of every service call.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'We built it', desc: 'For OptiFinish-manufactured equipment, we service what we designed — no documentation gaps, no guesswork.' },
                { title: 'Multi-brand capability', desc: 'GEMA, Dürr, and third-party equipment on the same line — all covered by one service team.' },
                { title: '14+ years in the field', desc: 'Hundreds of lines commissioned, maintained, and upgraded — we have seen every failure mode.' },
                { title: 'All-India reach', desc: 'From Greater Noida to manufacturing facilities across the country — our service team travels to your site.' },
              ].map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col gap-2 rounded-[1.1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] p-4"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FECE00]/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
                  </span>
                  <h3 className="font-display text-[0.88rem] font-black leading-snug tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="text-[0.72rem] leading-relaxed text-white/38">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </main>
  );
}
