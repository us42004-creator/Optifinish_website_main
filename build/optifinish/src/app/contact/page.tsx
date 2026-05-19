'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/* ── All product slugs → display labels ── */
const PRODUCTS: { slug: string; label: string; group: string }[] = [
  { slug: 'optifinish-manufactured/powder-coating-plant', label: 'Powder Coating Plant',        group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/curing-oven',          label: 'Curing Oven',                 group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/powder-spray-booth',   label: 'Powder Spray Booth',          group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/liquid-spray-booth',   label: 'Liquid Spray Booth',          group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/ss-booth-system',      label: 'SS Booth System',             group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/plastic-booth',        label: 'Plastic / PP Booth',          group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/cyclone-dust-collector', label: 'Cyclone & Dust Collector',  group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/pt-line',              label: 'Pretreatment Line (PT Line)',  group: 'OptiFinish Manufactured' },
  { slug: 'optifinish-manufactured/wood-finish-oven',     label: 'Wood Finish Oven',            group: 'OptiFinish Manufactured' },
  { slug: 'automation/z-tap',                             label: 'Z-TAP Robot System',          group: 'OptiFinish Automation'   },
  { slug: 'automation/za01',                              label: 'Opti Recip ZA01',             group: 'OptiFinish Automation'   },
  { slug: 'automation/sieve-machine',                     label: 'Automatic Sieve Machine',     group: 'OptiFinish Automation'   },
  { slug: 'automation/auto-spray-optimisation',           label: 'Auto Spray Optimisation',     group: 'OptiFinish Automation'   },
  { slug: 'gema/manual-gun',                              label: 'GEMA Manual Gun',             group: 'GEMA'                    },
  { slug: 'gema/automatic-gun',                           label: 'GEMA Automatic Gun',          group: 'GEMA'                    },
  { slug: 'gema/opticentre',                              label: 'GEMA OptiCentre',             group: 'GEMA'                    },
  { slug: 'gema/reciprocators',                           label: 'GEMA Reciprocators',          group: 'GEMA'                    },
  { slug: 'durr/electrostatic-gun',                       label: 'DURR Electrostatic Gun',      group: 'DURR'                    },
  { slug: 'durr/hvlp-gun',                                label: 'DURR HVLP Gun',               group: 'DURR'                    },
  { slug: 'durr/airless-gun',                             label: 'DURR Airless Gun',            group: 'DURR'                    },
  { slug: 'durr/air-assist-gun',                          label: 'DURR Air-Assist Gun',         group: 'DURR'                    },
  { slug: 'durr/cup-gun',                                 label: 'DURR Cup Gun',                group: 'DURR'                    },
  { slug: 'durr/bell-atomiser',                           label: 'DURR Bell Atomiser',          group: 'DURR'                    },
  { slug: 'durr/ecodose-2k',                              label: 'DURR EcoDose 2K',             group: 'DURR'                    },
  { slug: 'durr/ecodose-3k',                              label: 'DURR EcoDose 3K',             group: 'DURR'                    },
  { slug: 'durr/ecopump',                                 label: 'DURR EcoPump',                group: 'DURR'                    },
  { slug: 'vinayak/powder-paints',                        label: 'Powder Paints',               group: 'Vinayak Agencies'        },
  { slug: 'vinayak/touchup-paints',                       label: 'Touch-up Paints',             group: 'Vinayak Agencies'        },
  { slug: 'vinayak/liquid-paint',                         label: 'Liquid Paint',                group: 'Vinayak Agencies'        },
  { slug: 'vinayak/pu-enamel',                            label: 'PU Enamel',                   group: 'Vinayak Agencies'        },
  { slug: 'vinayak/adhesives',                            label: 'Adhesives',                   group: 'Vinayak Agencies'        },
];

function labelForSlug(slug: string | null): string {
  if (!slug) return '';
  const match = PRODUCTS.find(
    (p) =>
      p.slug === slug ||
      p.slug.endsWith('/' + slug) ||        // 'curing-oven' matches 'optifinish-manufactured/curing-oven'
      slug.endsWith(p.slug) ||
      p.slug.replace('/', '-') === slug      // 'gema-manual-gun' matches 'gema/manual-gun'
  );
  return match?.label ?? '';
}

/* ─── Input component ─────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/35">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[0.88rem] text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#FECE00]/40 focus:bg-white/[0.06]';

/* ─── Contact form (needs useSearchParams — must be client) ─── */
function ContactForm() {
  const params  = useSearchParams();
  const rawSlug = params.get('product');
  const initialLabel = labelForSlug(rawSlug);

  const [product, setProduct]       = useState(initialLabel || 'General enquiry');
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName]             = useState('');
  const [company, setCompany]       = useState('');
  const [phone, setPhone]           = useState('');
  const [email, setEmail]           = useState('');
  const [details, setDetails]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, phone, email, product, details }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  /* Success state */
  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-[1.4rem] border border-[#FECE00]/20 bg-[#FECE00]/[0.04] p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FECE00]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9l4.5 4.5L15 5" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[1.1rem] font-bold text-white">
            Got it, {name}.
          </p>
          <p className="mt-1 text-[0.85rem] text-white/50">
            We&apos;ll be in touch with {company} within 1 business day.
          </p>
        </div>
        <Link
          href="/products"
          className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#FECE00]/60 transition-colors hover:text-[#FECE00]"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Product context chip */}
      <div className="flex flex-col gap-2">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/35">
          Enquiring about
        </span>
        {!showPicker ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FECE00]/25 bg-[#FECE00]/[0.08] px-3.5 py-1.5 text-[0.7rem] font-semibold text-[#FECE00]">
              {product}
            </span>
            <button
              type="button"
              onClick={() => setShowPicker(true)}
              className="text-[0.6rem] font-medium text-white/25 underline underline-offset-2 transition-colors hover:text-white/50"
            >
              Change
            </button>
          </div>
        ) : (
          <select
            className={inputCls + ' cursor-pointer'}
            value={product}
            onChange={(e) => { setProduct(e.target.value); setShowPicker(false); }}
            autoFocus
          >
            <option value="General enquiry">General enquiry</option>
            {Array.from(new Set(PRODUCTS.map((p) => p.group))).map((group) => (
              <optgroup key={group} label={group}>
                {PRODUCTS.filter((p) => p.group === group).map((p) => (
                  <option key={p.slug} value={p.label}>{p.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        )}
      </div>

      {/* Name + Company row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name *">
          <input
            type="text"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Company *">
          <input
            type="text"
            required
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Phone + Email row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone *">
          <input
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Email *">
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Optional details */}
      <Field label="Additional details (optional)">
        <textarea
          rows={3}
          placeholder="Part dimensions, throughput, line speed, or anything else that helps us prepare…"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={inputCls + ' resize-none'}
        />
      </Field>

      {error && (
        <p className="text-[0.78rem] text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-full bg-[#FECE00] px-7 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A] transition-opacity hover:opacity-85 disabled:opacity-50 sm:self-start"
      >
        {submitting ? 'Sending…' : 'Send enquiry →'}
      </button>
    </form>
  );
}

/* ─── Page ─────────────────────────────── */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070809]">

      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.028,
        }}
      />

      <div className="relative z-10">

        {/* ── Hero strip ── */}
        <section className="border-b border-white/[0.06] pb-12 pt-[100px] md:pt-[108px]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
              Get in touch
            </p>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
              Talk to our team.
            </h1>
            <p className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-white/40">
              Fill in your details below — we respond to all enquiries within 1 business day.
            </p>
          </div>
        </section>

        {/* ── Main content: form + contacts ── */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">

              {/* LEFT — form */}
              <div>
                <Suspense fallback={
                  <div className="h-64 animate-pulse rounded-[1.2rem] bg-white/[0.03]" />
                }>
                  <ContactForm />
                </Suspense>
              </div>

              {/* RIGHT — direct contacts */}
              <div className="flex flex-col gap-8">

                {/* Response badge */}
                <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-[#FECE00]/15 bg-[#FECE00]/[0.06] px-4 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#FECE00]/70">
                    Responds within 1 business day
                  </span>
                </div>

                {/* Contact links */}
                <div className="flex flex-col gap-4">
                  {/* Phone */}
                  <a
                    href="tel:+918929408691"
                    className="group flex items-center gap-4 rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3.5A1.5 1.5 0 013.5 2h.878c.414 0 .76.3.818.71l.518 3.627a.818.818 0 01-.43.862l-1.04.52a9.5 9.5 0 004.037 4.037l.52-1.04a.818.818 0 01.862-.43l3.628.518c.41.059.709.404.709.818V12.5A1.5 1.5 0 0112.5 14C6.701 14 2 9.299 2 3.5z" fill="rgba(255,255,255,0.45)"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/30">Call us</p>
                      <p className="text-[0.85rem] font-semibold text-white/70">+91 89294 08691</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918929408691"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors hover:border-[#25D366]/25 hover:bg-[#25D366]/[0.04]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/30">WhatsApp</p>
                      <p className="text-[0.85rem] font-semibold text-white/70">Message us directly</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@optifinish.in"
                    className="group flex items-center gap-4 rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4.5A1.5 1.5 0 013.5 3h9A1.5 1.5 0 0114 4.5v.585L8 8.79 2 5.085V4.5zM2 6.415V11.5A1.5 1.5 0 003.5 13h9a1.5 1.5 0 001.5-1.5V6.415L8 10.21 2 6.415z" fill="rgba(255,255,255,0.45)"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/30">Email</p>
                      <p className="text-[0.85rem] font-semibold text-white/70">info@optifinish.in</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM2 6a6 6 0 1110.89 3.477l3.316 3.316a.75.75 0 11-1.06 1.06l-3.316-3.316A6 6 0 012 6zm6-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="rgba(255,255,255,0.45)"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/30">Our facility</p>
                      <p className="text-[0.85rem] font-semibold leading-relaxed text-white/70">
                        Greater Noida,<br />Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Facility visit strip ── */}
        <section className="border-t border-white/[0.06] py-10">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-[0.78rem] text-white/30">
              Prefer to visit?{' '}
              <span className="text-white/50">
                Our Greater Noida manufacturing and R&amp;D facility welcomes plant visits — call ahead to arrange.
              </span>
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
