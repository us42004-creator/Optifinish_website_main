import Link from 'next/link';

const PARTNERS = [
  {
    href:  '/products/gema',
    name:  'GEMA',
    role:  'Authorised Distributor & Integration Partner',
    desc:  'Full range of GEMA manual guns, automatic guns, OptiCenter systems, reciprocators, and spare parts.',
  },
  {
    href:  '/products/durr',
    name:  'DURR',
    role:  'Authorised Distributor',
    desc:  'DURR liquid coating guns, EcoPump systems, and complete liquid coating plant solutions.',
  },
];

export default function PartnersBar() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        <div className="mb-10">
          <span className="card-accent-label mb-3 block">Partner Brands</span>
          <h2 className="font-display text-[1.6rem] font-black tracking-tight text-ink md:text-[2rem]">
            Authorised for the brands that set the standard.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PARTNERS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col gap-4 rounded-[1.25rem] border border-ink/[0.08] bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-[2rem] font-black tracking-tight text-ink">{p.name}</span>
                <span className="rounded-full bg-ink/[0.06] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-ink/50">
                  {p.role}
                </span>
              </div>
              <p className="text-[0.8rem] leading-relaxed text-ink/50">{p.desc}</p>
              <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/30 transition-colors group-hover:text-yellow-dark">
                View range <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
