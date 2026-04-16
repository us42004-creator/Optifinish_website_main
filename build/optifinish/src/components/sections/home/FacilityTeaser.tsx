import Link from 'next/link';

export default function FacilityTeaser() {
  return (
    <section className="bg-[#f1efea] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-ink">

          <div className="flex flex-col gap-10 p-8 md:flex-row md:items-center md:gap-16 md:p-14">

            {/* Text */}
            <div className="flex-1">
              <span className="card-accent-label card-accent-label-light mb-4 block">Greater Noida Facility</span>
              <h2 className="font-display desktop-section-heading mobile-hero-ratio-title font-black text-white">
                Manufactured in India.<br />
                <span className="text-yellow">Backed by real R&amp;D.</span>
              </h2>
              <p className="mt-5 max-w-md text-[0.88rem] leading-relaxed text-white/48">
                Our Greater Noida manufacturing and R&amp;D facility is where OptiFinish products are
                built, tested, and refined. From complete powder coating plants to proprietary
                automation systems — everything is engineered here.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {[
                  'Complete plant manufacturing capability',
                  'In-house R&D for automation products',
                  'Demo and trial facility available',
                  'Testing and commissioning centre',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.78rem] font-medium text-white/55">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/facility"
                className="panel-button dynamic-button dynamic-button-yellow mt-8 inline-flex"
              >
                <span>See the Facility</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>

            {/* Stats block */}
            <div className="grid grid-cols-2 gap-4 md:w-64 md:flex-shrink-0 md:grid-cols-1">
              {[
                { value: '2024',    label: 'Facility inaugurated' },
                { value: '14+',     label: 'Years of operations'  },
                { value: 'Greater\nNoida', label: 'UP, India'      },
                { value: 'R&D',     label: 'In-house capability'  },
              ].map((s) => (
                <div key={s.label} className="panel-shell">
                  <span className="font-display text-[1.3rem] font-black leading-tight tracking-tight text-white whitespace-pre-line">{s.value}</span>
                  <span className="mt-1.5 block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/35">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
