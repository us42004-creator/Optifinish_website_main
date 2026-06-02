'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/* ── Own products (left product col) ── */
const OWN_PRODUCTS = [
  {
    name: 'OptiFinish Manufactured',
    href: '/products/optifinish-manufactured',
    items: [
      { href: '/products/optifinish-manufactured/powder-coating-plant',   label: 'Powder Coating Plant' },
      { href: '/products/optifinish-manufactured/curing-oven',            label: 'Curing Oven' },
      { href: '/products/optifinish-manufactured/powder-spray-booth',     label: 'Powder Spray Booth' },
      { href: '/products/optifinish-manufactured/liquid-spray-booth',     label: 'Liquid Spray Booth' },
      { href: '/products/optifinish-manufactured/ss-booth-system',        label: 'SS Booth System' },
      { href: '/products/optifinish-manufactured/cyclone-dust-collector', label: 'Cyclone & Dust Collector' },
      { href: '/products/optifinish-manufactured/pt-line',                label: 'Pretreatment Line' },
      { href: '/products/optifinish-manufactured/wood-finish-oven',       label: 'Wood Finish Oven' },
    ],
  },
  {
    name: 'OptiFinish Automation',
    href: '/products/automation',
    items: [
      { href: '/products/automation/z-tap',                   label: 'Z-TAP Robot System' },
      { href: '/products/automation/za01',                    label: 'OPTI-ZA-18 Reciprocator' },
      { href: '/products/automation/sieve-machine',           label: 'PS Vibratory Sieve Machine' },
      { href: '/products/automation/auto-spray-optimisation', label: 'Auto Spray Optimisation' },
    ],
  },
];

/* ── Partner products (right product col) ── */
const PARTNER_PRODUCTS = [
  {
    name: 'GEMA',
    href: '/products/gema',
    items: [
      { href: '/products/gema/manual-gun',          label: 'Manual Powder Coating Gun' },
      { href: '/products/gema/automatic-gun',       label: 'Automatic Powder Coating Gun' },
      { href: '/products/gema/reciprocators',       label: 'Reciprocators & Automation Axes' },
      { href: '/products/gema/opticentre',          label: 'OptiCentre Powder Management' },
      { href: '/products/gema/plastic-pp-booth',    label: 'Plastic / PP Spray Booth' },
    ],
  },
  {
    name: 'Dürr',
    href: '/products/durr',
    items: [
      { href: '/products/durr/cup-gun',           label: 'Cup Gun (EcoGun 116 / 910)' },
      { href: '/products/durr/hvlp-gun',          label: 'HVLP Spray Gun' },
      { href: '/products/durr/airless-gun',       label: 'Airless Spray Gun' },
      { href: '/products/durr/air-assist-gun',    label: 'Air Assist Spray Gun' },
      { href: '/products/durr/electrostatic-gun', label: 'Electrostatic Spray Gun' },
      { href: '/products/durr/bell-atomiser',     label: 'Bell Atomiser' },
      { href: '/products/durr/ecopump',           label: 'EcoPump Systems' },
      { href: '/products/durr/ecodose-2k',        label: '2K Dosing System' },
      { href: '/products/durr/ecodose-3k',        label: '3K Dosing System' },
    ],
  },
];

const VINAYAK = [
  { href: '/products/vinayak/powder-paints',  label: 'Powder Coating Paints' },
  { href: '/products/vinayak/liquid-paint',   label: 'Liquid Industrial Paint' },
  { href: '/products/vinayak/touchup-paints', label: 'Touch-up Paints' },
  { href: '/products/vinayak/pu-enamel',      label: 'PU & Enamel Paints' },
  { href: '/products/vinayak/adhesives',      label: 'Adhesives & Tapes' },
];

/* ── Flat nav columns ── */
const FOOTER_COLS = [
  {
    heading: 'Services',
    links: [
      { href: '/services/plant-amc',             label: 'Plant AMC' },
      { href: '/services/testing-commissioning', label: 'Testing & Commissioning' },
      { href: '/services/gema-spare-parts',      label: 'GEMA Spare Parts' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about',          label: 'About OptiFinish' },
      { href: '/facility',       label: 'Facility' },
      { href: '/our-work',       label: 'Our Work' },
      { href: '/resources/blog', label: 'Blog' },
      { href: '/contact',        label: 'Contact' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms',          label: 'Terms of Use' },
    ],
  },
];

function ProductCol({ groups, heading, isOpen, onToggle }: {
  groups: typeof OWN_PRODUCTS;
  heading: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      {/* Mobile accordion header */}
      <button
        className="flex w-full items-center justify-between py-3 text-left lg:cursor-default lg:pointer-events-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ touchAction: 'manipulation' }}
      >
        <h3 className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/80">{heading}</h3>
        <ChevronRight size={12} className={`text-white/30 transition-transform duration-200 lg:hidden ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 lg:block lg:mt-3 lg:max-h-none ${isOpen ? 'max-h-[900px] pb-3' : 'max-h-0 lg:max-h-none'}`}>
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <div key={group.href}>
              <Link
                href={group.href}
                className="mb-1.5 block text-[7.5px] font-bold uppercase tracking-[0.18em] text-white/65 hover:text-[#FECE00] transition-colors"
              >
                {group.name}
              </Link>
              <ul className="flex flex-col gap-[3px] border-l border-white/[0.09] pl-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[8px] font-medium text-white/52 transition-colors hover:text-white/80">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-white/[0.06] lg:hidden" />
    </div>
  );
}

export default function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [ownOpen, setOwnOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const toggleSection = (heading: string) =>
    setOpenSections((prev) => ({ ...prev, [heading]: !prev[heading] }));

  return (
    <footer className="border-t border-white/10 bg-[#050505] px-5 py-12 text-white sm:py-16 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Main grid: Brand | Own Products | Partner Products | Services | Company ── */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-8 lg:grid-cols-[1.1fr_1fr_1fr_0.65fr_0.8fr]">

          {/* ── Brand ── */}
          <div className="pb-6 border-b border-white/[0.06] lg:border-b-0 lg:pb-0">
            <div className="flex items-center gap-2.5">
              <Image src="/images/logos/optifinish-logo.png" alt="OptiFinish" width={192} height={192} className="h-8 w-auto object-contain" />
              <span className="font-display text-[1.1rem] font-black tracking-tight text-white">OptiFinish</span>
            </div>
            <span className="mt-2.5 block text-[8.5px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Industrial Coating Solutions
            </span>
            <span className="mt-0.5 block text-[7.5px] font-semibold uppercase tracking-[0.16em] text-white/40 leading-snug">
              Value Added Coating Solutions Pvt. Ltd.
            </span>

            <div className="mt-4 space-y-1">
              <p className="text-[8.5px] text-white/65">+91 98118 46214 / +91 98113 57749</p>
              <p className="text-[8.5px]">
                <a href="https://wa.me/918929408691" target="_blank" rel="noopener noreferrer"
                  className="text-[#25D366]/75 hover:text-[#25D366] transition-colors">
                  WhatsApp: +91 89294 08691
                </a>
              </p>
              <p className="text-[8.5px] text-white/65">info@optifinish.in</p>
              <p className="text-[8.5px] text-white/65">Greater Noida, UP — 201306</p>
            </div>

            {/* Social icons */}
            <div className="mt-4 flex gap-2.5">
              {[
                { href: 'https://www.linkedin.com/company/value-added-coating-solution', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 0 22.222 0h.003z' },
                { href: 'https://www.youtube.com/@vacspl', label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { href: 'https://www.instagram.com/vacspl', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { href: 'https://www.facebook.com/optifinish.connect', label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map(({ href, label, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.1] text-white/50 transition hover:border-white/40 hover:text-white/80">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
                </a>
              ))}
            </div>

            {/* Employee portal box */}
            <div className="mt-4 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-2">
              <p className="mb-1.5 text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">Employee Portal</p>
              <div className="flex flex-col gap-1">
                {[
                  { href: 'https://vacspl-enquiry.vercel.app/', label: 'Enquiry Manager' },
                  { href: 'https://optifinish.netlify.app/home', label: 'Employee Login' },
                ].map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded px-2 py-1.5 transition-colors hover:bg-[#FECE00]/[0.07]">
                    <span className="text-[8px] font-medium text-white/58 group-hover:text-white/80 transition-colors">{label}</span>
                    <span className="text-[9px] text-white/20 group-hover:text-[#FECE00]/55 transition-colors">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Own Products (Manufactured + Automation) ── */}
          <ProductCol
            groups={OWN_PRODUCTS}
            heading="Products"
            isOpen={ownOpen}
            onToggle={() => setOwnOpen(v => !v)}
          />

          {/* ── Partner Products (GEMA + Dürr + Vinayak) ── */}
          <ProductCol
            groups={PARTNER_PRODUCTS}
            heading="Partners"
            isOpen={partnerOpen}
            onToggle={() => setPartnerOpen(v => !v)}
          />

          {/* ── Services + Company ── */}
          {FOOTER_COLS.map((col) => {
            const isOpen = openSections[col.heading] ?? false;
            return (
              <div key={col.heading}>
                <button
                  className="flex w-full items-center justify-between py-3 text-left lg:cursor-default lg:pointer-events-none"
                  onClick={() => toggleSection(col.heading)}
                  aria-expanded={isOpen}
                  style={{ touchAction: 'manipulation' }}
                >
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/80">{col.heading}</h3>
                  <ChevronRight size={12} className={`text-white/30 transition-transform duration-200 lg:hidden ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 lg:block lg:mt-3 lg:max-h-none ${isOpen ? 'max-h-[800px] pb-3' : 'max-h-0 lg:max-h-none'}`}>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-[8.5px] font-medium text-white/60 transition-colors hover:text-[#FECE00]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Vinayak Agencies appended to Services column */}
                  {col.heading === 'Services' && (
                    <div className="mt-5">
                      <Link
                        href="/products/vinayak"
                        className="mb-1.5 block text-[7.5px] font-bold uppercase tracking-[0.18em] text-white/65 hover:text-[#FECE00] transition-colors"
                      >
                        Vinayak Agencies
                      </Link>
                      <ul className="flex flex-col gap-[3px] border-l border-white/[0.09] pl-2">
                        {VINAYAK.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="text-[8px] font-medium text-white/52 transition-colors hover:text-white/80">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="border-b border-white/[0.06] lg:hidden" />
              </div>
            );
          })}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-white/45">
            © {new Date().getFullYear()} OptiFinish · Value Added Coating Solutions Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-white/45">
            Manufactured in{' '}
            <span style={{ background: 'linear-gradient(to bottom, #FF9933 33%, #fff 33%, #fff 66%, #138808 66%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              India
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
