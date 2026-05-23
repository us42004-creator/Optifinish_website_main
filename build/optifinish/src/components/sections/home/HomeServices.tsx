'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Wrench, CheckCircle2, Zap, ArrowUpCircle, FlaskConical, Package, ArrowRight } from 'lucide-react';
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation';

const SERVICES = [
  {
    href: '/services/plant-amc',
    label: 'Plant AMC',
    tag: 'Maintenance',
    desc: 'Annual maintenance contracts that keep your installed coating line running at peak efficiency, year after year.',
    Icon: Wrench,
  },
  {
    href: '/services/testing-commissioning',
    label: 'Testing & Commissioning',
    tag: 'Commissioning',
    desc: 'From installation to first production run — every system fully validated and handed over with confidence.',
    Icon: CheckCircle2,
  },
  {
    href: '/services/troubleshooting-support',
    label: 'Troubleshooting & Support',
    tag: 'Support',
    desc: 'Remote and on-site diagnosis for coating defects, equipment faults, and process inconsistencies.',
    Icon: Zap,
  },
  {
    href: '/services/upgrades-retrofits',
    label: 'Upgrades & Retrofits',
    tag: 'Modernisation',
    desc: "Extend your line's operational life with targeted automation upgrades and precision equipment retrofits.",
    Icon: ArrowUpCircle,
  },
  {
    href: '/services/ttr',
    label: 'Trials, Testing & Review',
    tag: 'Coating Trials',
    desc: 'Sample part trials conducted at our Greater Noida facility with full process documentation and review.',
    Icon: FlaskConical,
  },
  {
    href: '/services/gema-spare-parts',
    label: 'GEMA Spare Parts',
    tag: 'Parts Supply',
    desc: 'Genuine OEM spare parts for all GEMA powder coating equipment — stocked and fast-dispatched.',
    Icon: Package,
  },
];

export default function HomeServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);

  useHeadingAnimation({
    trigger: sectionRef,
    eyebrow: eyebrowRef,
    line1: line1Ref,
    line2: line2Ref,
    body: bodyRef,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f1efea] py-14 md:py-28">

      {/* Grid drift layers — matches light-themed template */}
      <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
      <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Header row */}
        <div className="mb-8 md:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="overflow-hidden pb-[0.15em]">
              <span
                ref={eyebrowRef}
                className="mb-3 block text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]"
                style={{ willChange: 'transform, opacity' }}
              >
                Services
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.65rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line1Ref} className="block" style={{ willChange: 'transform, opacity' }}>
                  After the sale,
                </span>
              </div>
              <div className="overflow-hidden pb-[0.15em]">
                <span ref={line2Ref} className="block" style={{ willChange: 'transform, opacity', color: '#FECE00' }}>
                  we stay.
                </span>
              </div>
            </h2>
            <p
              ref={bodyRef}
              className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-ink/45"
              style={{ willChange: 'transform, opacity' }}
            >
              From commissioning to AMC, spare parts to coating trials — complete
              after-sales support backed by 14+ years of industrial experience.
            </p>
          </div>

          {/* View all CTA */}
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/15 bg-ink/[0.06] px-5 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink/55 transition-all duration-200 hover:border-ink/25 hover:bg-ink/[0.1] hover:text-ink md:self-auto"
          >
            View all services
            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Services grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => {
            const { Icon } = svc;
            return (
              <Link
                key={svc.href}
                href={svc.href}
                className="group flex flex-col gap-4 rounded-[1.2rem] border border-ink/[0.08] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FECE00]/50 hover:shadow-[0_8px_32px_rgba(254,206,0,0.10)]"
              >
                {/* Icon + Tag row */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] bg-[#FECE00]/[0.12] transition-colors duration-200 group-hover:bg-[#FECE00]/[0.2]">
                    <Icon size={18} className="text-ink/60 transition-colors duration-200 group-hover:text-ink/80" strokeWidth={1.8} />
                  </div>
                  <span className="rounded-full border border-ink/[0.08] bg-ink/[0.04] px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-ink/40">
                    {svc.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[0.95rem] font-black leading-tight tracking-tight text-ink">
                    {svc.label}
                  </h3>
                  <p className="text-[0.75rem] leading-relaxed text-ink/45">
                    {svc.desc}
                  </p>
                </div>

                {/* Arrow CTA */}
                <div className="mt-auto flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink/25 transition-colors duration-200 group-hover:text-[#FECE00]">
                  Learn more
                  <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
