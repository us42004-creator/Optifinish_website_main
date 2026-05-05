'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

/* ─── Services mega-menu data ─── */
const SERVICES_MENU = [
  {
    href: '/services/plant-amc',
    label: 'Plant AMC',
    tag: 'Maintenance',
    desc: 'Annual maintenance contracts for installed coating lines.',
    comingSoon: false,
  },
  {
    href: '/services/testing-commissioning',
    label: 'Testing & Commissioning',
    tag: 'Commissioning',
    desc: 'From installation to first production run — fully validated.',
    comingSoon: false,
  },
  {
    href: '/services/troubleshooting-support',
    label: 'Troubleshooting & Support',
    tag: 'Support',
    desc: 'Remote and on-site diagnosis for coating defects and faults.',
    comingSoon: false,
  },
  {
    href: '/services/upgrades-retrofits',
    label: 'Upgrades & Retrofits',
    tag: 'Modernisation',
    desc: 'Extend line life with targeted upgrades and automation.',
    comingSoon: false,
  },
  {
    href: '/services/ttr',
    label: 'Trials, Testing & Review',
    tag: 'Coating Trials',
    desc: 'Sample part trials at our Greater Noida facility.',
    comingSoon: false,
  },
  {
    href: '/services/gema-spare-parts',
    label: 'GEMA Spare Parts',
    tag: 'Parts Supply',
    desc: 'Genuine OEM spare parts for all GEMA equipment models.',
    comingSoon: false,
  },
  {
    href: '/services/dcp-server-based-maintenance',
    label: 'DCP Server Maintenance',
    tag: 'Coming Soon',
    desc: 'Remote diagnostics and predictive maintenance for connected lines.',
    comingSoon: true,
  },
];

/* ─── Products mega-menu data ─── */
const PRODUCTS_MENU = [
  {
    slug: 'optifinish-manufactured',
    label: 'OptiFinish Manufactured',
    tag: 'In-house',
    href: '/products/optifinish-manufactured',
    count: 9,
    products: [
      { name: 'Powder Coating Plant', href: '/products/optifinish-manufactured/powder-coating-plant' },
      { name: 'Curing Oven', href: '/products/optifinish-manufactured/curing-oven' },
      { name: 'Powder Spray Booth', href: '/products/optifinish-manufactured/powder-spray-booth' },
      { name: 'Liquid Spray Booth', href: '/products/optifinish-manufactured/liquid-spray-booth' },
      { name: 'SS Booth System', href: '/products/optifinish-manufactured/ss-booth-system' },
      { name: 'Plastic / PP Booth', href: '/products/optifinish-manufactured/plastic-booth' },
      { name: 'Cyclone & Dust Collector', href: '/products/optifinish-manufactured/cyclone-dust-collector' },
      { name: 'Pretreatment Line (PT Line)', href: '/products/optifinish-manufactured/pt-line' },
      { name: 'Wood Finish Oven', href: '/products/optifinish-manufactured/wood-finish-oven' },
    ],
  },
  {
    slug: 'automation',
    label: 'OptiFinish Automation',
    tag: 'Proprietary',
    href: '/products/automation',
    count: 4,
    products: [
      { name: 'Z-TAP Robot System', href: '/products/automation/z-tap', external: false },
      { name: 'Opti Recip ZA01', href: '/products/automation/za01' },
      { name: 'PS Vibratory Sieve Machine', href: '/products/automation/sieve-machine' },
      { name: 'Auto Spray Optimisation', href: '/products/automation/auto-spray-optimisation' },
    ],
  },
  {
    slug: 'gema',
    label: 'GEMA',
    tag: 'Authorised Partner',
    href: '/products/gema',
    count: 4,
    products: [
      { name: 'Manual Powder Coating Gun', href: '/products/gema/manual-gun' },
      { name: 'Automatic Powder Coating Gun', href: '/products/gema/automatic-gun' },
      { name: 'Reciprocators & Automation Axes', href: '/products/gema/reciprocators' },
      { name: 'OptiCentre Powder Management', href: '/products/gema/opticentre' },
    ],
  },
  {
    slug: 'durr',
    label: 'Dürr',
    tag: 'Authorised Distributor',
    href: '/products/durr',
    count: 9,
    products: [
      { name: 'Cup Gun (EcoGun 116 / 910)', href: '/products/durr/cup-gun' },
      { name: 'HVLP Spray Gun', href: '/products/durr/hvlp-gun' },
      { name: 'Airless Spray Gun', href: '/products/durr/airless-gun' },
      { name: 'Air Assist Spray Gun', href: '/products/durr/air-assist-gun' },
      { name: 'Electrostatic Spray Gun', href: '/products/durr/electrostatic-gun' },
      { name: 'Bell Atomiser', href: '/products/durr/bell-atomiser' },
      { name: 'EcoPump Systems', href: '/products/durr/ecopump' },
      { name: '2K Dosing System', href: '/products/durr/ecodose-2k' },
      { name: '3K Dosing System', href: '/products/durr/ecodose-3k' },
    ],
  },
  {
    slug: 'vinayak',
    label: 'Vinayak Agencies',
    tag: 'Sister Concern',
    href: '/products/vinayak',
    count: 5,
    products: [
      { name: 'Powder Coating Paints', href: '/products/vinayak/powder-paints' },
      { name: 'Liquid Industrial Paint', href: '/products/vinayak/liquid-paint' },
      { name: 'Touch-up Paints', href: '/products/vinayak/touchup-paints' },
      { name: 'PU & Enamel Paints', href: '/products/vinayak/pu-enamel' },
      { name: 'Adhesives & Tapes', href: '/products/vinayak/adhesives' },
    ],
  },
];

const NAV_LINKS = [
  { href: '/products',  label: 'Products', hasDropdown: true          },
  { href: '/services',  label: 'Services', hasServicesDropdown: true  },
  { href: '/facility',  label: 'Facility'  },
  { href: '/our-work',  label: 'Our Work'  },
  { href: '/resources', label: 'Resources' },
  { href: '/about',     label: 'About'     },
];

const DARK_PAGES = ['/', '/sandbox/hero-b', '/blog', '/resources/blog'];
const isDarkPath = (p: string) =>
  DARK_PAGES.includes(p) ||
  (p.startsWith('/products/') && p.split('/').filter(Boolean).length > 1) ||
  p.startsWith('/services') ||
  p.startsWith('/facility');

/* Fluid eased scroll — cubic in-out over ~1.2s */
function smoothScrollTo(element: Element) {
  const start = window.scrollY;
  const targetY = element.getBoundingClientRect().top + window.scrollY - 80;
  const distance = targetY - start;
  const duration = 1200;
  let startTime: number | null = null;

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (ts: number) => {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [expanded, setExpanded]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [productsOpen, setProductsOpen]   = useState(false);
  const [servicesOpen, setServicesOpen]   = useState(false);
  const [hoveredCat, setHoveredCat]       = useState(PRODUCTS_MENU[0].slug);
  const menuLinksRef                      = useRef<HTMLDivElement>(null);
  const menuCtaRef                        = useRef<HTMLAnchorElement>(null);
  const closeTimer                        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeServicesTimer                = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname                        = usePathname();
  const router                          = useRouter();
  const isDark = isDarkPath(pathname);

  const activeCat = PRODUCTS_MENU.find((c) => c.slug === hoveredCat) ?? PRODUCTS_MENU[0];

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    setProductsOpen(true);
    setServicesOpen(false);
    setExpanded(true);
  };

  const closeProducts = () => {
    closeTimer.current = setTimeout(() => {
      setProductsOpen(false);
      setExpanded(false);
    }, 150);
  };

  const openServices = () => {
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
    setProductsOpen(false);
    setExpanded(true);
  };

  const closeServices = () => {
    closeServicesTimer.current = setTimeout(() => {
      setServicesOpen(false);
      setExpanded(false);
    }, 150);
  };

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setProductsOpen(false);
    setExpanded(false);

    if (pathname === '/') {
      const el = document.getElementById('what-we-offer');
      if (el) smoothScrollTo(el);
    } else {
      router.push('/?scroll=whatweoffer');
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setProductsOpen(false); setServicesOpen(false); }, [pathname]);

  // Mobile menu links now use CSS animation (no GSAP needed — avoids opacity:0 flash)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 navbar-enter">
        <div className="flex justify-center px-3 pt-2.5 md:px-4 md:pt-4">
          <motion.div
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => { setExpanded(false); }}
            animate={{ maxWidth: scrolled && !expanded ? 920 : 1100 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              background: (scrolled || isDark) ? 'rgba(8, 8, 8, 0.72)' : 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(28px) saturate(165%)',
              WebkitBackdropFilter: 'blur(28px) saturate(165%)',
              border: (scrolled || isDark) ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.08)',
              borderRadius: '9999px',
              boxShadow: (scrolled || isDark)
                ? '0 12px 42px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12)'
                : '0 10px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.75)',
              transition: 'box-shadow 0.4s ease',
              width: '100%',
            }}
          >
            {/* ── Pill inner content ── */}
            <motion.div
              animate={{
                height: scrolled && !expanded ? 44 : 50,
                paddingLeft: scrolled && !expanded ? 16 : 18,
                paddingRight: scrolled && !expanded ? 16 : 18,
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between overflow-hidden"
            >
              {/* Logo + Brand name */}
              <Link href="/" className="flex min-w-0 items-center gap-2.5 self-center group">
                <Image
                  src="/logo.png"
                  alt="OptiFinish"
                  width={192}
                  height={192}
                  priority
                  className={`w-auto object-contain transition-all duration-300 group-hover:opacity-85 ${
                    scrolled && !expanded ? 'h-[30px]' : 'h-[36px]'
                  }`}
                />
                <span
                  className={`font-display font-black tracking-[-0.03em] transition-all duration-300 group-hover:opacity-70 ${
                    scrolled && !expanded ? 'text-[0.82rem] text-white' : `text-[0.9rem] ${isDark ? 'text-white' : 'text-ink'}`
                  }`}
                >
                  OptiFinish
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className={`hidden min-w-0 flex-1 items-center justify-center lg:flex ${scrolled && !expanded ? 'gap-4' : 'gap-6'} transition-all duration-300`}>
                {NAV_LINKS.map((link) =>
                  link.hasDropdown ? (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={openProducts}
                      onMouseLeave={closeProducts}
                    >
                      <button
                        onClick={handleProductsClick}
                        className={`flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-yellow cursor-pointer ${
                          scrolled && !expanded ? 'text-[9px]' : 'text-[10px]'
                        } ${
                          pathname.startsWith('/products')
                            ? 'text-yellow'
                            : (scrolled || isDark) ? 'text-white/48' : 'text-black/45'
                        }`}
                      >
                        {link.label}
                        <ChevronRight
                          size={10}
                          className={`rotate-90 transition-transform duration-200 ${productsOpen ? 'rotate-[270deg]' : ''}`}
                        />
                      </button>
                    </div>
                  ) : link.hasServicesDropdown ? (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                    >
                      <button
                        onClick={() => { setServicesOpen(false); setExpanded(false); router.push('/services'); }}
                        className={`flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-yellow cursor-pointer ${
                          scrolled && !expanded ? 'text-[9px]' : 'text-[10px]'
                        } ${
                          pathname.startsWith('/services')
                            ? 'text-yellow'
                            : (scrolled || isDark) ? 'text-white/48' : 'text-black/45'
                        }`}
                      >
                        {link.label}
                        <ChevronRight
                          size={10}
                          className={`rotate-90 transition-transform duration-200 ${servicesOpen ? 'rotate-[270deg]' : ''}`}
                        />
                      </button>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`shrink-0 whitespace-nowrap font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-yellow ${
                        scrolled && !expanded ? 'text-[9px]' : 'text-[10px]'
                      } ${
                        pathname === link.href
                          ? 'text-yellow'
                          : (scrolled || isDark) ? 'text-white/48' : 'text-black/45'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>

              {/* CTA + hamburger */}
              <div className="flex shrink-0 items-center gap-2.5">
                <Link
                  href="/contact"
                  className={`hidden rounded-full border border-yellow/20 bg-yellow font-bold uppercase tracking-[0.2em] text-ink lg:flex ${
                    scrolled && !expanded ? 'px-4 py-1.5 text-[8px]' : 'px-5 py-2 text-[9px]'
                  } transition-all duration-300`}
                >
                  Get in Touch
                </Link>
                <button
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:border-yellow/40 hover:text-yellow lg:hidden ${
                    (scrolled || isDark)
                      ? 'border border-white/18 bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'border border-black/12 bg-white/[0.42] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                  }`}
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={15} /> : <Menu size={15} />}
                </button>
              </div>
            </motion.div>

            {/* ── Services dropdown ── */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                  className="absolute left-1/2 top-full z-50 mt-4 -translate-x-1/2"
                  style={{ width: 'min(560px, calc(100vw - 2rem))' }}
                >
                  {/* Arrow */}
                  <div className="absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/[0.08] bg-[#0f0f0f]" />

                  <div
                    className="overflow-hidden rounded-[1.1rem] border border-white/[0.1]"
                    style={{
                      background: '#0f0f0f',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                      <p className="text-[0.5rem] font-bold uppercase tracking-[0.22em] text-white/35">
                        After-Sales &amp; Support
                      </p>
                      <Link
                        href="/services"
                        className="flex items-center gap-1 text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]/65 transition-colors hover:text-[#FECE00]"
                      >
                        All services <ChevronRight size={9} />
                      </Link>
                    </div>

                    {/* Service grid */}
                    <div className="grid grid-cols-2 gap-px bg-white/[0.05] p-3">
                      {SERVICES_MENU.map((svc) =>
                        svc.comingSoon ? (
                          <div
                            key={svc.href}
                            className="flex flex-col gap-1 rounded-[0.65rem] bg-[#0f0f0f] px-3 py-2.5 opacity-40"
                          >
                            <div className="flex items-center gap-2">
                              <span className="rounded-full border border-white/[0.12] px-1.5 py-0.5 text-[0.44rem] font-bold uppercase tracking-[0.14em] text-white/40">
                                {svc.tag}
                              </span>
                            </div>
                            <span className="font-display text-[0.75rem] font-black leading-snug tracking-tight text-white/60">
                              {svc.label}
                            </span>
                            <span className="text-[0.62rem] leading-snug text-white/30">{svc.desc}</span>
                          </div>
                        ) : (
                          <Link
                            key={svc.href}
                            href={svc.href}
                            className="group/svc flex flex-col gap-1 rounded-[0.65rem] bg-[#0f0f0f] px-3 py-2.5 transition-all duration-150 hover:bg-white/[0.06]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-[#FECE00]/15 px-1.5 py-0.5 text-[0.44rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]">
                                {svc.tag}
                              </span>
                            </div>
                            <span className="font-display text-[0.75rem] font-black leading-snug tracking-tight text-white/80 transition-colors group-hover/svc:text-white">
                              {svc.label}
                            </span>
                            <span className="text-[0.62rem] leading-snug text-white/35 transition-colors group-hover/svc:text-white/50">
                              {svc.desc}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Products mega-menu dropdown — outside overflow:hidden so it's not clipped ── */}
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={openProducts}
                  onMouseLeave={closeProducts}
                  className="absolute left-1/2 top-full z-50 mt-4 -translate-x-1/2"
                  style={{ width: 'min(720px, calc(100vw - 2rem))' }}
                >
                  {/* Arrow pointer */}
                  <div className="absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/[0.08] bg-[#0f0f0f]" />

                  <div
                    className="overflow-hidden rounded-[1.1rem] border border-white/[0.1]"
                    style={{
                      background: '#0f0f0f',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
                    }}
                  >
                    <div className="grid grid-cols-[240px_1fr]">
                      {/* LEFT — category list */}
                      <div className="border-r border-white/[0.07] py-3">
                        <p className="mb-1 px-4 text-[0.5rem] font-bold uppercase tracking-[0.22em] text-white/35">
                          Product Categories
                        </p>
                        {PRODUCTS_MENU.map((cat) => (
                          <div
                            key={cat.slug}
                            onMouseEnter={() => setHoveredCat(cat.slug)}
                            className={`group/cat mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-[0.55rem] px-3 py-2.5 transition-all duration-150 ${
                              hoveredCat === cat.slug
                                ? 'bg-white/[0.08]'
                                : 'hover:bg-white/[0.05]'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                {hoveredCat === cat.slug && (
                                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FECE00]" />
                                )}
                                <Link
                                  href={cat.href}
                                  className={`font-display block truncate text-[0.78rem] font-black leading-tight tracking-tight transition-colors ${
                                    hoveredCat === cat.slug ? 'text-white' : 'text-white/75 group-hover/cat:text-white/90'
                                  }`}
                                >
                                  {cat.label}
                                </Link>
                              </div>
                            </div>
                            <ChevronRight size={12} className={`flex-shrink-0 transition-colors ${
                              hoveredCat === cat.slug ? 'text-[#FECE00]/70' : 'text-white/30'
                            }`} />
                          </div>
                        ))}
                      </div>

                      {/* RIGHT — products for hovered category */}
                      <div className="py-3">
                        <p className="mb-1 px-4 text-[0.5rem] font-bold uppercase tracking-[0.22em] text-white/35">
                          {activeCat.label}
                        </p>
                        <div className="grid grid-cols-2 gap-x-1 px-2">
                          {activeCat.products.map((prod) =>
                            prod.external ? (
                              <a
                                key={prod.href}
                                href={prod.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/prod flex items-center gap-2 rounded-[0.5rem] px-3 py-2 transition-all duration-150 hover:bg-white/[0.05]"
                              >
                                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FECE00]/50 transition-colors group-hover/prod:bg-[#FECE00]" />
                                <span className="text-[0.72rem] font-medium leading-snug text-white/70 transition-colors group-hover/prod:text-white">
                                  {prod.name} ↗
                                </span>
                              </a>
                            ) : (
                              <Link
                                key={prod.href}
                                href={prod.href}
                                className="group/prod flex items-center gap-2 rounded-[0.5rem] px-3 py-2 transition-all duration-150 hover:bg-white/[0.05]"
                              >
                                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FECE00]/50 transition-colors group-hover/prod:bg-[#FECE00]" />
                                <span className="text-[0.72rem] font-medium leading-snug text-white/70 transition-colors group-hover/prod:text-white">
                                  {prod.name}
                                </span>
                              </Link>
                            )
                          )}
                        </div>

                        {/* View all in category */}
                        <div className="mt-2 border-t border-white/[0.08] px-4 pt-3">
                          <Link
                            href={activeCat.href}
                            className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]/75 transition-colors hover:text-[#FECE00]"
                          >
                            View all {activeCat.label} products
                            <ChevronRight size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-[#080808]/97 backdrop-blur-2xl lg:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)' }}
          >
            <div className="flex items-center justify-between px-5 pt-4">
              <Link href="/" className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="OptiFinish" width={192} height={192} priority className="h-9 w-auto object-contain" />
                <span className="font-display text-[0.9rem] font-black tracking-[-0.03em] text-white">OptiFinish</span>
              </Link>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/60"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={menuLinksRef} className="flex flex-1 flex-col justify-center px-6">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link block py-3 font-display text-[2.2rem] font-black tracking-[-0.03em] text-white/70 transition-colors hover:text-white"
                  style={{
                    animation: 'mobile-link-in 0.45s cubic-bezier(0.22,1,0.36,1) both',
                    animationDelay: `${0.06 + i * 0.06}s`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="px-6 pb-8">
              <Link
                ref={menuCtaRef}
                href="/contact"
                className="block w-full rounded-full bg-yellow py-4 text-center text-[11px] font-black uppercase tracking-widest text-ink"
                style={{
                  animation: 'mobile-link-in 0.45s cubic-bezier(0.22,1,0.36,1) 0.46s both',
                }}
              >
                Get in Touch
              </Link>
              <p className="mt-4 text-center text-[9px] font-semibold uppercase tracking-[0.24em] text-white/22">
                Value Added Coating Solutions Pvt. Ltd.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
