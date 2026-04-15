import Image from 'next/image';
import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/products',  label: 'Products'  },
  { href: '/services',  label: 'Services'  },
  { href: '/facility',  label: 'Facility'  },
  { href: '/our-work',  label: 'Our Work'  },
  { href: '/resources', label: 'Resources' },
  { href: '/about',     label: 'About'     },
  { href: '/contact',   label: 'Contact'   },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 py-10 text-white sm:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="OptiFinish" width={192} height={192} className="h-12 w-auto object-contain" />
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/38">Industrial Coating Solutions</span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.22em] text-white/22">
                Value Added Coating Solutions Pvt. Ltd.
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/30 transition-colors hover:text-yellow sm:text-[10px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/25 sm:text-[10px]">
            © {new Date().getFullYear()} OptiFinish. All rights reserved.
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/25 sm:text-[10px]">
            Manufactured in India
          </p>
        </div>
      </div>
    </footer>
  );
}
