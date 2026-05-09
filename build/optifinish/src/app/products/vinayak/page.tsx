import type { Metadata } from 'next';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import CrossCategoryNav from '@/components/products/CrossCategoryNav';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'Vinayak Agencies — Industrial Paints & Powder Coatings | OptiFinish',
  description:
    'Vinayak Agencies is one of India\'s largest authorised Kansai Nerolac industrial dealers — powder coatings, liquid paints, touch-up paints, and adhesives, always in stock.',
};

const PRODUCTS = [
  {
    name: 'Powder Coating Paints',
    subtitle: 'Nerolac · Prominent · Paramount',
    description:
      'A comprehensive range of thermosetting powder coatings — epoxy, epoxy-polyester, pure polyester, super durable polyester, and polyurethane formulations — stocked in-house and available for immediate dispatch.',
    specs: [
      'Nerolac: Epoxy (6000), Epoxy-Polyester (6100), Pure Polyester (6200) series',
      'Prominent & Paramount: broad colour and finish range for industrial applications',
      'ISO 9001 certified supply; REACH & RoHS compliant options available',
      '40+ years of Kansai Nerolac powder coating expertise',
    ],
    enquireSlug: 'vinayak-powder-paints',
    learnMoreHref: '/products/vinayak/powder-paints',
    imageSrc: '/images/products/vinayak/powder-paints/nerolac-powder-coating-01.png',
  },
  {
    name: 'Liquid Industrial Paint',
    subtitle: 'Kansai Nerolac · Paramount (Tansy)',
    description:
      'Industrial-grade liquid coating systems from Kansai Nerolac and Paramount\'s Tansy brand — covering automotive, infrastructure, and heavy engineering applications with proven corrosion resistance.',
    specs: [
      'Kansai Nerolac liquid industrial range — automotive, infrastructure, general industry',
      'Paramount Tansy brand — liquid coatings for metal and industrial surfaces',
      'Available in solvent-based and water-based formulations',
      'Stocked at 2,400 sq. ft. Vinayak warehouse for immediate supply',
    ],
    enquireSlug: 'vinayak-liquid-paint',
    learnMoreHref: '/products/vinayak/liquid-paint',
    imageSrc: '/images/products/vinayak/liquid-paint/nerolac-industrial-paint-banner.jpg',
  },
  {
    name: 'Touch-up Paints',
    subtitle: 'Nerolac — Tansy & Paramount',
    description:
      'Quick-dry touch-up paint solutions for field repairs and finish correction — Nerolac\'s Tansy and Paramount range for metal and industrial surfaces, available in aerosol and brush-on formats.',
    specs: [
      'Nerolac Tansy and Paramount touch-up range for on-site repairs',
      'Suitable for powder-coated and liquid-painted metal surfaces',
      'Fast dry, colour-matched finish for seamless repairs',
    ],
    enquireSlug: 'vinayak-touchup-paints',
    learnMoreHref: '/products/vinayak/touchup-paints',
    imageSrc: '/images/products/vinayak/touchup-paints/nerolac-tansy-touchup-01.webp',
  },
  {
    name: 'PU & Enamel Paints',
    subtitle: 'Kansai Nerolac — Wood & Metal',
    description:
      'High-performance polyurethane and enamel paints from Kansai Nerolac for wood and metal surfaces — delivering rich gloss, anti-yellowing protection, and durability across interior and exterior applications.',
    specs: [
      'Nerolac PU Enamel 10-in-1: PU-modified alkyd, 3-year warranty, anti-yellowing',
      'Nerolac Hi-Gloss Synthetic Enamel: high gloss, smooth finish, stain-resistant',
      'Nerolac Satin Enamel: excellent flow and brushability, good washability',
      'Suitable for wood, metal, and masonry substrates',
    ],
    enquireSlug: 'vinayak-pu-enamel',
    learnMoreHref: '/products/vinayak/pu-enamel',
    imageSrc: '/images/products/vinayak/pu-enamel/nerolac-pu-enamel-10in1-hero.jpg',
  },
  {
    name: 'Adhesives & Tapes',
    subtitle: 'Nerolac — Synthetic & White Glue',
    description:
      'Industrial-grade adhesives from Nerolac — synthetic glue and white glue — for bonding and sealing applications in manufacturing and finishing environments.',
    specs: [
      'Synthetic glue for general-purpose industrial bonding',
      'White glue (PVA-based) for wood, paper, and porous materials',
      'Part of the Nerolac industrial accessories range',
    ],
    enquireSlug: 'vinayak-adhesives',
    learnMoreHref: '/products/vinayak/adhesives',
    imageSrc: '/images/products/vinayak/adhesives/nerolac-nerofix-01.png',
  },
];

export default function VinayakPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Sister Concern — Vinayak Agencies"
        tag="Sister Concern"
        headline="Industrial paints and coatings."
        headlineAccent="One stop, always in stock."
        subline="Vinayak Agencies is one of India's largest authorised Kansai Nerolac industrial dealers — with a 2,400 sq. ft. in-house warehouse ensuring round-the-clock supply across powder coatings, liquid paints, and adhesives."
        stats={[
          { value: '2,400', label: 'Sq. ft. in-house warehouse' },
          { value: '24/7', label: 'Supply availability' },
          { value: '3 Brands', label: 'Nerolac · Prominent · Paramount' },
        ]}
        theme="light"
        breadcrumbLabel="Vinayak Agencies"
      />

      {/* Brand strip */}
      <div className="bg-[#f1efea]">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/35">
              Authorised dealer for:
            </span>
            {['Kansai Nerolac', 'Prominent', 'Paramount'].map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-[#0A0A0A]/12 bg-white/60 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/55"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="bg-[#f1efea] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Product Range
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              What&apos;s in this range
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.enquireSlug}
                {...product}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse credibility section */}
      <section className="bg-[#0A0A0A] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Header */}
          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              In-house Infrastructure
            </p>
            <h2 className="font-display max-w-lg text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.93] tracking-[-0.04em] text-white">
              2,400 sq. ft. warehouse.{' '}
              <span className="text-[#FECE00]">Always stocked. Always ready.</span>
            </h2>
            <p className="mt-4 max-w-md text-[0.82rem] leading-relaxed text-white/38">
              Round-the-clock supply for powder coatings, liquid paints, and adhesives — from
              our own warehouse in Greater Noida.
            </p>
          </div>

          {/* Stat row */}
          <div className="mb-10 flex flex-wrap gap-3">
            {[
              { value: '2,400 sq. ft.', label: 'Warehouse floor area' },
              { value: '24/7', label: 'Supply availability' },
              { value: '3 Brands', label: 'In-stock' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#FECE00]/12 bg-[#FECE00]/[0.05] px-5 py-3"
              >
                <div className="font-display text-[1.3rem] font-black leading-none text-[#FECE00]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/38">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Warehouse image grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { id: 'warehouse-01', src: '/images/facility/facility-22.jpg' },
              { id: 'warehouse-02', src: '/images/facility/facility-23.jpg' },
              { id: 'warehouse-03', src: '/images/facility/facility-25.jpg' },
            ].map((item) => (
              <div
                key={item.id}
                className="relative aspect-[4/3] overflow-hidden rounded-[1rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt="Vinayak Agencies warehouse"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CrossCategoryNav currentSlug="vinayak" theme="light" />
      <HomeCTA />
    </>
  );
}
