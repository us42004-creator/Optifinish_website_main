import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    slug: 'optifinish-manufactured',
    label: 'OptiFinish Manufactured',
    tag: 'In-house',
    desc: 'Plants, ovens & booths',
    image: '/images/products/optifinish-manufactured/SS_BOOTH/ss-booth-master-shot.png',
  },
  {
    slug: 'automation',
    label: 'Automation',
    tag: 'Proprietary',
    desc: 'Z-TAP, ZA01, Sieve',
    image: '/images/products/sieve-machine/sieve-machine-02.jpg',
  },
  {
    slug: 'gema',
    label: 'GEMA',
    tag: 'Partner',
    desc: 'Guns, reciprocators, OptiCentre',
    image: '/images/products/gema/manual-gun/homepage-img.jpg',
  },
  {
    slug: 'durr',
    label: 'Dürr',
    tag: 'Distributor',
    desc: 'Liquid guns, pumps, dosing',
    image: '/images/products/durr/durr-homepage.jpeg',
  },
  {
    slug: 'vinayak',
    label: 'Vinayak Agencies',
    tag: 'Sister Concern',
    desc: 'Paints, powders, adhesives',
    image: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',
  },
];

interface CrossCategoryNavProps {
  currentSlug: string;
  theme?: 'dark' | 'light';
}

export default function CrossCategoryNav({ currentSlug }: CrossCategoryNavProps) {
  const others = CATEGORIES.filter((c) => c.slug !== currentSlug);

  return (
    <section className="py-16 md:py-20 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Section label */}
        <p className="mb-8 text-[0.56rem] font-bold uppercase tracking-[0.26em] text-white/22">
          Explore other ranges
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {others.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group flex flex-col overflow-hidden rounded-[1.1rem] border border-[#FECE00]/[0.07] bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#FECE00]/[0.18] hover:bg-[#181818]"
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0f0f0f]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                {/* Top accent bar */}
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#FECE00]/35" />
                {/* Bottom scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                {/* Tag */}
                <span className="self-start rounded-full bg-[#FECE00]/[0.08] px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-[#FECE00]/55">
                  {cat.tag}
                </span>

                {/* Name */}
                <span className="font-display text-[0.85rem] font-black leading-tight tracking-tight text-white/88">
                  {cat.label}
                </span>

                {/* Desc */}
                <span className="text-[0.65rem] leading-snug text-white/30">
                  {cat.desc}
                </span>

                {/* CTA */}
                <span className="mt-auto pt-2 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/18 transition-colors group-hover:text-[#FECE00]/70">
                  View range →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
