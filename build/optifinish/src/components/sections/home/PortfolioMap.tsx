import Link from 'next/link';

const GROUPS = [
  {
    href:    '/products/optifinish-manufactured',
    label:   'OptiFinish Manufactured',
    tag:     'In-house',
    color:   'bg-yellow',
    text:    'text-ink',
    items:   ['Powder Coating Plant', 'Curing Ovens', 'Spray Booths', 'SS Booth Systems'],
    desc:    'Complete powder coating lines and equipment designed and manufactured at our Greater Noida facility.',
  },
  {
    href:    '/products/automation',
    label:   'OptiFinish Automation',
    tag:     'Proprietary',
    color:   'bg-ink',
    text:    'text-yellow',
    items:   ['Z-TAP', 'ZA01 Reciprocator', 'Automatic Sieve Machine'],
    desc:    'Proprietary automation products developed in-house for precision and process control.',
  },
  {
    href:    '/products/gema',
    label:   'GEMA',
    tag:     'Authorised Partner',
    color:   'bg-surface-2',
    text:    'text-ink',
    items:   ['Manual Powder Guns', 'Automatic Guns', 'OptiCenter / Magic Systems', 'Reciprocators'],
    desc:    'Full range of GEMA powder coating equipment — supplied and integrated by OptiFinish.',
  },
  {
    href:    '/products/durr',
    label:   'DURR',
    tag:     'Authorised Partner',
    color:   'bg-surface-2',
    text:    'text-ink',
    items:   ['Liquid Coating Guns', 'EcoPump Systems', 'Liquid Coating Plants'],
    desc:    'DURR liquid coating systems for high-precision industrial applications.',
  },
  {
    href:    '/products/vinayak',
    label:   'Vinayak Agencies',
    tag:     'Sister Concern',
    color:   'bg-surface-3',
    text:    'text-ink',
    items:   ['Powder Coating Powders', 'Touch-Up Paints', 'Adhesives', 'Shade Cards'],
    desc:    'Catalogue supply of consumables and finishing materials through our sister business.',
  },
];

export default function PortfolioMap() {
  return (
    <section className="bg-[#f1efea] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-12">
          <span className="card-accent-label mb-3 block">Products</span>
          <h2 className="font-display desktop-section-heading mobile-hero-ratio-title font-black text-ink">
            Everything we offer,<br />clearly organised.
          </h2>
          <p className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-ink/50">
            OptiFinish operates across five distinct product groups. Each group has a clear
            ownership structure so you always know what we make, what we develop, and what we supply.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col gap-4 rounded-[1.4rem] border border-ink/[0.07] bg-white/60 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
            >
              {/* Tag */}
              <span className={`self-start rounded-full px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] ${g.color} ${g.text}`}>
                {g.tag}
              </span>

              {/* Title */}
              <h3 className="font-display text-[1.15rem] font-black leading-tight tracking-tight text-ink">
                {g.label}
              </h3>

              {/* Description */}
              <p className="text-[0.78rem] leading-relaxed text-ink/50">{g.desc}</p>

              {/* Items */}
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-ink/[0.06] pt-4">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.72rem] font-medium text-ink/60">
                    <span className="h-1 w-1 rounded-full bg-yellow flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="mt-2 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/35 transition-colors group-hover:text-yellow-dark">
                View range
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
