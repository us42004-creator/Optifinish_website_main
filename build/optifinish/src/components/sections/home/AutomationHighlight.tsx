import Link from 'next/link';

const PRODUCTS = [
  {
    href:   '/products/automation/ztap',
    name:   'Z-TAP',
    tag:    'Flagship',
    desc:   'Zero-touch robotic powder coating. Mimic a motion once — Z-TAP records, perfects, and replicates it flawlessly across every part.',
    specs:  ['Motion mimic technology', 'Fairino FR5 robot platform', 'GEMA gun integration', 'Full line compatibility'],
  },
  {
    href:   '/products/automation/za01',
    name:   'ZA01',
    tag:    'Reciprocator',
    desc:   'OptiFinish proprietary reciprocator designed for consistent vertical gun movement across high-throughput powder coating lines.',
    specs:  ['Vertical axis automation', 'Adjustable stroke and speed', 'Line-compatible design', 'Low maintenance'],
  },
  {
    href:   '/products/automation/automatic-sieve-machine',
    name:   'Automatic Sieve Machine',
    tag:    'Support Equipment',
    desc:   'Automated powder sieving for consistent quality and reduced contamination across your coating process.',
    specs:  ['Continuous operation', 'Consistent mesh output', 'Reduced manual handling', 'Compact footprint'],
  },
];

export default function AutomationHighlight() {
  return (
    <section className="bg-void py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="tech-kicker mb-3 block">OptiFinish Automation</span>
            <h2 className="font-display desktop-section-heading mobile-hero-ratio-title font-black text-white">
              Proprietary products.<br />
              <span className="text-yellow">Built by us.</span>
            </h2>
          </div>
          <Link
            href="/products/automation"
            className="panel-button dynamic-button dynamic-button-light text-ink self-start"
          >
            <span>View all automation</span>
            <div className="dynamic-button-glow" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="section-frame group flex flex-col gap-5 p-6 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Tag + name */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[1.4rem] font-black tracking-tight text-white">{p.name}</h3>
                <span className="rounded-full border border-yellow/20 bg-yellow/10 px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-yellow">
                  {p.tag}
                </span>
              </div>

              {/* Description */}
              <p className="text-[0.8rem] leading-relaxed text-white/50">{p.desc}</p>

              {/* Specs */}
              <ul className="mt-auto flex flex-col gap-2 border-t border-white/[0.07] pt-4">
                {p.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-[0.72rem] font-medium text-white/40">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-yellow" />
                    {s}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/25 transition-colors group-hover:text-yellow">
                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
