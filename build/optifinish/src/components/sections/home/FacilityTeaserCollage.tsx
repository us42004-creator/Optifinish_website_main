import Image from 'next/image';
import Link from 'next/link';

// 3 photos for the collage — swap indices to try different shots
const COLLAGE = [
  '/images/facility/facility-08.jpg',  // back-left (peeking)
  '/images/facility/facility-14.jpg',  // back-right (peeking)
  '/images/facility/facility-06.jpg',  // front — dominant
];

const STAT_BADGES = ['2024', '14+ Years', 'Greater Noida', 'In-house R&D'];

export default function FacilityTeaserCollage() {
  return (
    <section className="relative overflow-hidden bg-[#f1efea] py-20 md:py-28">

      {/* A/B label */}
      <div className="pointer-events-none absolute left-1/2 top-5 z-50 -translate-x-1/2">
        <span className="rounded-full bg-[#FECE00] px-4 py-1 text-[0.6rem] font-black uppercase tracking-[0.22em] text-[#070809] shadow-lg">
          Option A — Collage
        </span>
      </div>

      {/* Grid drift layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-ink">

          <div className="flex flex-col gap-10 p-8 md:flex-row md:items-center md:gap-12 md:p-14">

            {/* ── Text column ── */}
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

              {/* Stats as inline badges — replaces the stats grid */}
              <div className="mt-6 flex flex-wrap gap-2">
                {STAT_BADGES.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/40"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Link
                href="/facility"
                className="panel-button dynamic-button dynamic-button-yellow mt-6 inline-flex"
              >
                <span>See the Facility</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>

            {/* ── Collage column — hidden on mobile ── */}
            <div className="relative hidden md:block md:w-[44%] md:self-stretch">
              <div className="relative h-full min-h-[22rem]">

                {/* Back-left photo — rotated −4° */}
                <div
                  className="absolute overflow-hidden rounded-xl border border-white/[0.08] shadow-xl"
                  style={{
                    width: '52%',
                    aspectRatio: '4/3',
                    top: '1.5rem',
                    left: '0.5rem',
                    transform: 'rotate(-4deg)',
                  }}
                >
                  <Image
                    src={COLLAGE[0]}
                    alt="OptiFinish facility"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  {/* Dark tint */}
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Back-right photo — rotated +3° */}
                <div
                  className="absolute overflow-hidden rounded-xl border border-white/[0.08] shadow-xl"
                  style={{
                    width: '52%',
                    aspectRatio: '4/3',
                    bottom: '1.5rem',
                    right: '0.5rem',
                    transform: 'rotate(3deg)',
                  }}
                >
                  <Image
                    src={COLLAGE[1]}
                    alt="OptiFinish facility"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Front photo — dominant, centered, scales on hover */}
                <div
                  className="absolute"
                  style={{
                    width: '65%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-xl border border-white/[0.18] shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.03]"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <Image
                      src={COLLAGE[2]}
                      alt="OptiFinish facility — front"
                      fill
                      className="object-cover"
                      sizes="350px"
                      priority
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
