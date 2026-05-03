'use client';

import { useState } from 'react';

/* ─── tiny helpers ─────────────────────────────────────────── */
function SectionLabel({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FECE00] font-display text-[0.75rem] font-black text-[#0A0A0A]">
        {n}
      </span>
      <div>
        <p className="font-display text-[0.95rem] font-black leading-tight tracking-tight text-white">
          {title}
        </p>
        <p className="mt-0.5 text-[0.65rem] leading-snug text-white/35">{desc}</p>
      </div>
    </div>
  );
}

function Placeholder({
  label,
  aspect = 'aspect-[16/9]',
  dark = true,
}: {
  label: string;
  aspect?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-[0.8rem] border ${aspect} ${
        dark
          ? 'border-[#FECE00]/[0.08] bg-white/[0.025]'
          : 'border-black/[0.08] bg-black/[0.04]'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: dark
            ? 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(10,10,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className={`absolute left-0 right-0 top-0 h-[2px] ${dark ? 'bg-[#FECE00]/25' : 'bg-black/10'}`} />
      <span className={`relative text-[9px] font-semibold uppercase tracking-[0.22em] ${dark ? 'text-white/18' : 'text-black/20'}`}>
        {label}
      </span>
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
  dark = true,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
        active
          ? 'bg-[#FECE00] text-[#0A0A0A]'
          : dark
          ? 'border border-white/[0.1] text-white/35 hover:border-white/25 hover:text-white/55'
          : 'border border-black/[0.12] text-[#0A0A0A]/40 hover:border-black/25 hover:text-[#0A0A0A]/65'
      }`}
    >
      {label}
    </button>
  );
}

function SpecRow({ label, value, dark }: { label: string; value: string; dark: boolean }) {
  return (
    <div className={`flex justify-between gap-4 border-b py-2.5 ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
      <span className={`text-[0.7rem] font-medium ${dark ? 'text-white/35' : 'text-[#0A0A0A]/40'}`}>{label}</span>
      <span className={`text-right text-[0.7rem] font-bold ${dark ? 'text-white/70' : 'text-[#0A0A0A]/75'}`}>{value}</span>
    </div>
  );
}

/* ─── main wireframe ────────────────────────────────────────── */
export default function ProductPageWireframe() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const variants = ['Standard Manual', 'Conveyorised Auto', 'Custom Line'];
  const steps = [
    { n: '01', title: 'Substrate enters', body: 'Parts loaded onto the conveyor or jig and enter the pretreatment zone.' },
    { n: '02', title: 'Pretreatment', body: 'Multi-stage PT line — degreasing, phosphating, rinsing, passivation.' },
    { n: '03', title: 'Powder application', body: 'Electrostatic spray booth — gun applies powder to charged substrate.' },
    { n: '04', title: 'Curing', body: 'Parts enter curing oven at 180–200°C for complete powder cure.' },
    { n: '05', title: 'Inspection & off-load', body: 'Finished parts exit, inspected, and sent to dispatch or next stage.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans">

      {/* ── Wireframe banner ─────────────────────────────────── */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[#FECE00] px-5 py-2.5">
        <div className="flex items-center gap-3">
          <span className="font-display text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#0A0A0A]">
            Wireframe — Individual Product Page
          </span>
          <span className="rounded-full bg-[#0A0A0A]/10 px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/60">
            10 sections · Interactive
          </span>
        </div>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/50">
          build/optifinish · /wireframe/product
        </span>
      </div>

      {/* ════════════════════════════════════════════════════════
          S1 — PRODUCT HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#070809] py-20 md:py-28">
        {/* Grid */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)', backgroundSize: '72px 72px', opacity: 0.028 }} />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S1" title="Product Hero" desc="Breadcrumb · tag · headline · positioning · stat strip · primary CTAs" />

          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2">
            {['Products', 'OptiFinish Manufactured', 'Powder Coating Plant'].map((crumb, i, arr) => (
              <span key={crumb} className="flex items-center gap-2">
                <span className={`text-[0.6rem] font-bold uppercase tracking-[0.18em] ${i === arr.length - 1 ? 'text-white/55' : 'text-white/22 hover:text-white/45 cursor-pointer'}`}>{crumb}</span>
                {i < arr.length - 1 && <span className="text-[0.6rem] text-white/15">/</span>}
              </span>
            ))}
          </div>

          {/* Tag */}
          <div className="mb-5">
            <span className="inline-block rounded-full bg-[#FECE00] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]">
              In-house Manufactured
            </span>
          </div>

          <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/55">
            In-house Manufactured — Greater Noida
          </p>

          {/* Headline */}
          <h1 className="font-display max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
            <span className="block text-white">Powder Coating Plant.</span>
            <span className="block text-[#FECE00]">Complete line. Your spec.</span>
          </h1>

          <p className="mt-5 max-w-lg text-[0.88rem] leading-relaxed text-white/38">
            A full turnkey powder coating line — pretreatment, booth, oven, and conveyor — designed, built, and commissioned by OptiFinish at our Greater Noida facility.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { v: '300+', l: 'Manual plants installed' },
              { v: '75+', l: 'Conveyor lines delivered' },
              { v: '14+ Yrs', l: 'In production' },
              { v: '98%', l: 'Powder recovery rate' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-[#FECE00]/12 bg-[#FECE00]/[0.05] px-5 py-3">
                <div className="font-display text-[1.6rem] font-black leading-none text-[#FECE00]">{s.v}</div>
                <div className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/38">{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#FECE00] px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A] transition-all hover:bg-[#FECE00]/85">
              Get a Quote →
            </button>
            <button className="rounded-full border border-white/[0.1] px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/35 transition-all hover:border-white/25 hover:text-white/55">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S2 — PROBLEM / WHY THIS EXISTS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efea] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S2" title="Problem / Positioning" desc="What challenge this product solves — 2-col layout, left=problem, right=solution framing" />

          <div className="grid gap-10 md:grid-cols-2">
            {/* Left — problem */}
            <div>
              <p className="mb-3 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">The Challenge</p>
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-[0.93] tracking-[-0.04em] text-[#0A0A0A]">
                Most plants are<br />
                <span className="text-[#C9A500]">assembled, not engineered.</span>
              </h2>
              <p className="mt-5 text-[0.82rem] leading-relaxed text-[#0A0A0A]/52">
                Off-the-shelf systems are sized for the average production load, not yours. They don't account for your part geometry, throughput targets, or substrate mix — leaving plants underperforming or overspecified from day one.
              </p>
            </div>

            {/* Right — solution points */}
            <div className="flex flex-col justify-center gap-4">
              {[
                { t: 'Engineered to your spec', b: 'Part size, throughput, substrate, and space — every line is designed around your exact requirements.' },
                { t: 'Built and commissioned by us', b: 'Our team handles design, manufacturing, delivery, and on-site commissioning. One point of accountability.' },
                { t: 'Backed by 14 years of installations', b: '300+ plants across India — in steel furniture, automotive, HVAC, architectural, and precision engineering.' },
              ].map((item) => (
                <div key={item.t} className="flex gap-4 rounded-[1rem] border border-black/[0.06] bg-white/70 p-5">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#FECE00]" />
                  <div>
                    <p className="font-display text-[0.88rem] font-black text-[#0A0A0A]">{item.t}</p>
                    <p className="mt-1 text-[0.72rem] leading-relaxed text-[#0A0A0A]/50">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S3 — PRODUCT VARIANTS / MODEL SWITCHER
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#070809] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S3" title="Product Variants / Model Switcher" desc="Tab/pill switcher — clicking changes image + specs in the panel below" />

          <div className="mb-8">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">Available Configurations</p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-white">
              Choose your configuration
            </h2>
          </div>

          {/* Variant switcher */}
          <div className="mb-8 flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <Pill key={v} label={v} active={activeVariant === i} onClick={() => setActiveVariant(i)} dark />
            ))}
          </div>

          {/* Content panel — changes with active variant */}
          <div className="grid gap-6 md:grid-cols-2">
            <Placeholder label={`${variants[activeVariant]} · product image`} aspect="aspect-[4/3]" dark />
            <div className="flex flex-col justify-center gap-4">
              <div>
                <p className="mb-1 text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#FECE00]/45">
                  {variants[activeVariant]}
                </p>
                <h3 className="font-display text-[1.4rem] font-black leading-tight tracking-tight text-white">
                  {activeVariant === 0 && 'Batch production · up to 200 parts/shift'}
                  {activeVariant === 1 && 'Continuous line · 800–2,400 parts/shift'}
                  {activeVariant === 2 && 'Spec-built to your exact requirements'}
                </h3>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-white/38">
                  {activeVariant === 0 && 'Ideal for small-to-mid batch producers. Manual jig loading, fixed oven, booth with cyclone recovery. Entry-grade plant with full PT and recovery system.'}
                  {activeVariant === 1 && 'Conveyorised layout with overhead or floor-level conveyor, GEMA automatic guns, and continuous oven. Designed for high-volume production with consistent film quality.'}
                  {activeVariant === 2 && 'Designed around your part geometry, throughput, and substrate. Custom PT stages, booth size, oven dwell time, and conveyor speed. Full site survey included.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(activeVariant === 0
                  ? ['Manual jig loading', 'Batch oven', '98% powder recovery', 'Standard PT 3-stage']
                  : activeVariant === 1
                  ? ['Overhead conveyor', 'Continuous oven', 'Auto guns (GEMA)', 'Up to 7-stage PT']
                  : ['Site survey included', 'Custom PT stages', 'Full commissioning', 'Spec guarantee']
                ).map((feat) => (
                  <div key={feat} className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.025] px-3 py-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FECE00]" />
                    <span className="text-[0.65rem] text-white/45">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S4 — HOW IT WORKS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efea] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S4" title="How It Works" desc="Numbered step sequence — clicking a step updates the detail panel on the right" />

          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">Process Walkthrough</p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              How the line works
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
            {/* Step list */}
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.n}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-start gap-4 rounded-[0.9rem] border p-4 text-left transition-all duration-200 ${
                    activeStep === i
                      ? 'border-[#C9A500]/40 bg-[#FECE00]/[0.08]'
                      : 'border-black/[0.06] bg-white/50 hover:border-black/[0.12]'
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-[0.65rem] font-black ${activeStep === i ? 'bg-[#FECE00] text-[#0A0A0A]' : 'bg-black/[0.06] text-[#0A0A0A]/40'}`}>
                    {step.n}
                  </span>
                  <div>
                    <p className={`font-display text-[0.82rem] font-black leading-tight ${activeStep === i ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/55'}`}>
                      {step.title}
                    </p>
                    {activeStep === i && (
                      <p className="mt-1 text-[0.7rem] leading-relaxed text-[#0A0A0A]/50">{step.body}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Detail visual */}
            <div className="flex flex-col gap-4">
              <Placeholder label={`Step ${steps[activeStep].n} · ${steps[activeStep].title} · diagram`} aspect="aspect-[4/3]" dark={false} />
              <div className="rounded-[0.9rem] border border-black/[0.06] bg-white/70 p-5">
                <p className="mb-1 text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/35">
                  {steps[activeStep].n} — {steps[activeStep].title}
                </p>
                <p className="text-[0.78rem] leading-relaxed text-[#0A0A0A]/60">{steps[activeStep].body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S5 — LINE INTEGRATION
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#070809] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S5" title="Line Integration" desc="Horizontal process diagram — this product highlighted, adjacent products shown as entry points" />

          <div className="mb-8">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">Where It Fits</p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-white">
              The complete coating line
            </h2>
          </div>

          {/* Horizontal flow */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4">
            {[
              { label: 'PT Line', sub: 'Pretreatment', active: false },
              { label: '→', sub: '', active: false },
              { label: 'Powder Booth', sub: 'This product', active: true },
              { label: '→', sub: '', active: false },
              { label: 'Curing Oven', sub: 'Manufactured', active: false },
              { label: '→', sub: '', active: false },
              { label: 'Conveyor', sub: 'Integrated', active: false },
              { label: '→', sub: '', active: false },
              { label: 'GEMA Guns', sub: 'Partner product', active: false },
            ].map((node, i) =>
              node.label === '→' ? (
                <span key={i} className="shrink-0 text-[#FECE00]/20 text-lg">→</span>
              ) : (
                <div
                  key={i}
                  className={`shrink-0 rounded-[0.8rem] border px-4 py-3 text-center ${
                    node.active
                      ? 'border-[#FECE00]/50 bg-[#FECE00]/[0.1]'
                      : 'border-white/[0.07] bg-white/[0.025]'
                  }`}
                >
                  <p className={`font-display text-[0.75rem] font-black ${node.active ? 'text-[#FECE00]' : 'text-white/55'}`}>{node.label}</p>
                  <p className={`mt-0.5 text-[0.55rem] uppercase tracking-[0.1em] ${node.active ? 'text-[#FECE00]/55' : 'text-white/20'}`}>{node.sub}</p>
                </div>
              )
            )}
          </div>

          <Placeholder label="Full line diagram · illustration / photo" aspect="aspect-[21/6]" dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S6 — TECHNICAL SPECIFICATIONS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efea] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S6" title="Technical Specifications" desc="Spec table — label/value rows, collapsible for long lists, download spec sheet CTA" />

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">Specifications</p>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
                Technical data
              </h2>
            </div>
            <button className="rounded-full border border-black/[0.1] px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/40 transition-all hover:border-black/25 hover:text-[#0A0A0A]/65">
              ↓ Download Spec Sheet
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1rem] border border-black/[0.06] bg-white/70 p-6">
              <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/40">Standard Configuration</p>
              {[
                { l: 'Internal booth dimensions', v: '5000 × 1200 × 3050 mm' },
                { l: 'Oven operating temperature', v: '180–200°C' },
                { l: 'Conveyor speed', v: '1.5–4.5 m/min (adjustable)' },
                { l: 'PT stages', v: '3-stage iron phosphating (standard)' },
                { l: 'Powder recovery', v: '98% (cyclone + bag filter)' },
                { l: 'Suction motor', v: '20HP — Siemens class' },
              ].map((r) => <SpecRow key={r.l} label={r.l} value={r.v} dark={false} />)}
            </div>

            <div>
              <div className="rounded-[1rem] border border-black/[0.06] bg-white/70 p-6">
                <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/40">Electrical & Structural</p>
                {[
                  { l: 'Electrical supply', v: '415V, 3-phase, 50Hz' },
                  { l: 'Construction material', v: 'MS (standard) / SS-304 (optional)' },
                  { l: 'Insulation', v: '200mm Rockwool — all oven panels' },
                  { l: 'Burner', v: 'Ecoflame gas burner (standard)' },
                ].map((r) => <SpecRow key={r.l} label={r.l} value={r.v} dark={false} />)}
              </div>

              {/* Expandable section */}
              <button
                onClick={() => setSpecsOpen(!specsOpen)}
                className="mt-3 flex w-full items-center justify-between rounded-[0.8rem] border border-black/[0.06] bg-white/50 px-5 py-3 text-left transition-all hover:border-black/12"
              >
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/45">
                  {specsOpen ? '− Hide' : '+ Show'} extended specifications
                </span>
              </button>
              {specsOpen && (
                <div className="mt-2 rounded-[1rem] border border-black/[0.06] bg-white/70 p-6">
                  {[
                    { l: 'Custom oven length', v: 'As per dwell time requirement' },
                    { l: 'PT tank capacity', v: 'Custom — per throughput' },
                    { l: 'Conveyor type', v: 'Overhead / floor-level / power & free' },
                  ].map((r) => <SpecRow key={r.l} label={r.l} value={r.v} dark={false} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S7 — PROOF / TRACK RECORD
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#070809] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S7" title="Proof / Track Record" desc="Installation count · client logo strip · installation snapshot images · 1 testimonial" />

          <div className="mb-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">Installed Across India</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
                300+ plants.<br />
                <span className="text-[#FECE00]">Every one commissioned by us.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-3">
              {[
                'Steel furniture & storage systems',
                'Automotive components & ancillaries',
                'HVAC and sheet-metal enclosures',
                'Architectural aluminium and extrusions',
              ].map((seg) => (
                <div key={seg} className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.025] px-4 py-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FECE00]" />
                  <span className="text-[0.72rem] text-white/45">{seg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client logos strip */}
          <div className="mb-8 flex flex-wrap gap-2">
            {['Tata', 'Godrej', 'Havells', 'JBM', 'Ashok Leyland', 'Polycab', 'Spark Minda'].map((c) => (
              <span key={c} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/30">
                {c}
              </span>
            ))}
          </div>

          {/* Installation image grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Placeholder label="Installation · 01" aspect="aspect-[4/3]" dark />
            <Placeholder label="Installation · 02" aspect="aspect-[4/3]" dark />
            <Placeholder label="Installation · 03" aspect="aspect-[4/3]" dark />
          </div>

          {/* Testimonial */}
          <div className="rounded-[1rem] border border-[#FECE00]/[0.1] bg-[#FECE00]/[0.04] p-6 md:p-8">
            <p className="mb-4 text-[0.82rem] leading-relaxed text-white/55 md:text-[0.9rem]">
              "OptiFinish designed the line around our 3-metre profiles — something off-the-shelf systems couldn't accommodate. Commissioning took 4 days. The plant has been running without issues for 18 months."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/[0.06]" />
              <div>
                <p className="text-[0.68rem] font-bold text-white/60">Works Manager</p>
                <p className="text-[0.6rem] text-white/30">Architectural Aluminium Manufacturer, Pune</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S8 — RELATED PRODUCTS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efea] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S8" title="Related Products" desc="2–3 ProductCards — often paired with this product, cross-sell within or across categories" />

          <div className="mb-8">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">Often Paired With</p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Complete your line
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { name: 'GEMA OptiGun Automatic Gun', cat: 'GEMA · Partner', href: '/products/gema/automatic-gun' },
              { name: 'Opti Recip ZA01', cat: 'OptiFinish Automation · Proprietary', href: '/products/automation/za01' },
              { name: 'Curing Oven', cat: 'OptiFinish Manufactured', href: '/products/optifinish-manufactured/curing-oven' },
            ].map((rel) => (
              <div key={rel.name} className="group overflow-hidden rounded-[1.1rem] border border-black/[0.08] bg-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/[0.16] hover:bg-white/90">
                <Placeholder label={`${rel.name} · image`} aspect="aspect-[4/3]" dark={false} />
                <div className="p-4">
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/35">{rel.cat}</p>
                  <p className="mt-1 font-display text-[0.88rem] font-black text-[#0A0A0A]">{rel.name}</p>
                  <a href={rel.href} className="mt-3 inline-block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/35 transition-colors hover:text-[#0A0A0A]/65">
                    View product →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S9 — DOWNLOADS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#070809] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionLabel n="S9" title="Downloads" desc="Brochure · spec sheet · data sheet — each with file type, size, and download CTA" />

          <div className="mb-8">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">Resource Centre</p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-white">
              Downloads
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: '📄', title: 'Product Brochure', sub: 'Overview · configurations · key specs', size: 'PDF · 2.4 MB' },
              { icon: '📐', title: 'Technical Spec Sheet', sub: 'Full dimensions · electrical · materials', size: 'PDF · 1.1 MB' },
              { icon: '🔧', title: 'Commissioning Guide', sub: 'Site prep · installation checklist', size: 'PDF · 890 KB' },
            ].map((dl) => (
              <div key={dl.title} className="flex flex-col gap-4 rounded-[1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] p-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{dl.icon}</span>
                  <div>
                    <p className="font-display text-[0.88rem] font-black text-white">{dl.title}</p>
                    <p className="mt-0.5 text-[0.65rem] text-white/35">{dl.sub}</p>
                    <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#FECE00]/45">{dl.size}</p>
                  </div>
                </div>
                <button className="mt-auto rounded-full border border-[#FECE00]/20 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]/50 transition-all hover:border-[#FECE00]/40 hover:text-[#FECE00]/80">
                  Download →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          S10 — PRODUCT CTA
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FECE00] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '72px 72px', opacity: 0.06 }} />
        <div className="relative mx-auto max-w-7xl px-5 text-center md:px-8">
          <SectionLabel n="S10" title="Product CTA" desc="Full-bleed yellow section — primary conversion endpoint for this product" />
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]">
            Ready to bring this<br />into your line?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-relaxed text-[#0A0A0A]/60">
            Tell us your throughput, part size, and substrate. We'll design the right configuration and give you a detailed proposal.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-[#0A0A0A] px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#0A0A0A]/80">
              Get a Quote →
            </button>
            <button className="rounded-full border-2 border-[#0A0A0A]/20 px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/60 transition-all hover:border-[#0A0A0A]/40 hover:text-[#0A0A0A]/80">
              Call Us
            </button>
          </div>
        </div>
      </section>

      {/* ── Section index footer ──────────────────────────────── */}
      <div className="bg-[#070809] px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-white/20">Section index</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              { n: 'S1', t: 'Product Hero' },
              { n: 'S2', t: 'Problem / Positioning' },
              { n: 'S3', t: 'Variants / Switcher' },
              { n: 'S4', t: 'How It Works' },
              { n: 'S5', t: 'Line Integration' },
              { n: 'S6', t: 'Specifications' },
              { n: 'S7', t: 'Proof / Track Record' },
              { n: 'S8', t: 'Related Products' },
              { n: 'S9', t: 'Downloads' },
              { n: 'S10', t: 'Product CTA' },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FECE00]/10 text-[0.48rem] font-black text-[#FECE00]/60">
                  {s.n}
                </span>
                <span className="text-[0.6rem] text-white/25">{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
