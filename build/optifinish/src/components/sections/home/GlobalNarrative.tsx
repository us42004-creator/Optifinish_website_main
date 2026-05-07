/**
 * GlobalNarrative — Multinational provenance strip
 * Slim light section. SEO / AIO optimised — factual, schema-ready.
 * Sits between HomeServices and FacilityTeaserFilmstrip.
 */

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

export default function GlobalNarrative() {
  return (
    <section
      className="relative overflow-hidden bg-[#070809] py-12 md:py-16"
      aria-label="Global technology, Indian delivery"
    >
      {/* Subtle dark grid */}
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
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <p className="mb-2 text-[0.52rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/50">
              Global technology · Indian delivery
            </p>
            <h2 className="font-display text-[clamp(1.3rem,2.8vw,2rem)] font-black leading-[0.92] tracking-[-0.035em] text-white">
              Designed in India.{' '}
              <span style={{ color: '#FECE00' }}>Powered by Swiss and German engineering.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[0.75rem] leading-relaxed text-white/32 md:text-right">
            OptiFinish integrates world-class European coating technology into systems manufactured entirely in India — giving Indian industry access to global-standard equipment through a local source.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid gap-3 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.country}
              className="flex flex-col gap-3 rounded-[1rem] border border-white/[0.07] bg-white/[0.03] px-5 py-5"
              itemScope
              itemType="https://schema.org/Organization"
            >
              {/* Flag + headline */}
              <div className="flex items-center gap-2.5">
                <span
                  className="leading-none"
                  style={{
                    fontSize: p.flagScale ? '1.35rem' : '1.1rem',
                    display: 'inline-block',
                    transform: p.flagScale ? 'scaleX(1.2)' : undefined,
                  }}
                  aria-label={p.country}
                >
                  {p.flag}
                </span>
                <h3
                  className="font-display text-[0.9rem] font-black leading-tight tracking-[-0.02em] text-white"
                  itemProp="name"
                >
                  {p.headline}
                </h3>
              </div>

              {/* Body */}
              <p className="text-[0.72rem] leading-relaxed text-white/38" itemProp="description">
                {p.body}
              </p>

              {/* Detail chip */}
              <p className="mt-auto text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-[#FECE00]/40">
                {p.detail}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
