'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { href: '/products',  label: 'Products'  },
  { href: '/services',  label: 'Services'  },
  { href: '/facility',  label: 'Facility'  },
  { href: '/our-work',  label: 'Our Work'  },
  { href: '/resources', label: 'Resources' },
  { href: '/about',     label: 'About'     },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [expanded, setExpanded]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const menuLinksRef               = useRef<HTMLDivElement>(null);
  const menuCtaRef                 = useRef<HTMLAnchorElement>(null);
  const pathname                   = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Animate links in when menu opens
  useEffect(() => {
    if (!menuOpen || !menuLinksRef.current) return;
    const links = menuLinksRef.current.querySelectorAll('.mobile-nav-link');
    const cta   = menuCtaRef.current;
    gsap.fromTo(links, { x: -48, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.055, duration: 0.5, ease: 'power3.out', delay: 0.1 });
    if (cta) gsap.fromTo(cta, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.42 });
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="flex justify-center px-3 pt-2.5 md:px-4 md:pt-4">
          <motion.div
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            animate={{ maxWidth: scrolled && !expanded ? 920 : 1100 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: scrolled ? 'rgba(8, 8, 8, 0.72)' : 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(28px) saturate(165%)',
              WebkitBackdropFilter: 'blur(28px) saturate(165%)',
              border: scrolled ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.08)',
              borderRadius: '9999px',
              boxShadow: scrolled
                ? '0 12px 42px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12)'
                : '0 10px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.75)',
              transition: 'box-shadow 0.4s ease',
              width: '100%',
            }}
          >
            <motion.div
              animate={{
                height: scrolled && !expanded ? 44 : 50,
                paddingLeft: scrolled && !expanded ? 16 : 18,
                paddingRight: scrolled && !expanded ? 16 : 18,
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between overflow-hidden"
            >
              {/* Logo */}
              <Link href="/" className="flex min-w-0 items-center self-center group">
                <Image
                  src="/logo.png"
                  alt="OptiFinish"
                  width={192}
                  height={192}
                  priority
                  className={`w-auto object-contain transition-all duration-300 group-hover:opacity-85 ${
                    scrolled && !expanded ? 'h-[34px]' : 'h-[40px]'
                  }`}
                />
              </Link>

              {/* Desktop nav */}
              <nav className={`hidden min-w-0 flex-1 items-center justify-center lg:flex ${scrolled && !expanded ? 'gap-4' : 'gap-6'} transition-all duration-300`}>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`shrink-0 whitespace-nowrap font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-yellow ${
                      scrolled && !expanded ? 'text-[9px]' : 'text-[10px]'
                    } ${
                      pathname === link.href
                        ? 'text-yellow'
                        : scrolled ? 'text-white/48' : 'text-black/45'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
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
                    scrolled
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
          </motion.div>
        </div>
      </motion.header>

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
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="OptiFinish" width={192} height={192} priority className="h-10 w-auto object-contain" />
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
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="mobile-nav-link" style={{ opacity: 0 }}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="px-6 pb-8">
              <Link
                ref={menuCtaRef}
                href="/contact"
                className="block w-full rounded-full bg-yellow py-4 text-center text-[11px] font-black uppercase tracking-widest text-ink"
                style={{ opacity: 0 }}
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
