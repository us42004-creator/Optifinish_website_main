import Link from 'next/link';
import Image from 'next/image';

interface Stat {
  value: string;
  label: string;
}

interface CategoryHeroProps {
  eyebrow: string;
  tag: string;
  flag?: string;
  headline: string;
  headlineAccent: string;
  subline: string;
  stats: Stat[];
  theme: 'dark' | 'light';
  breadcrumbLabel: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function CategoryHero({
  eyebrow,
  tag,
  flag,
  headline,
  headlineAccent,
  subline,
  stats,
  theme,
  breadcrumbLabel,
  imageSrc,
  imageAlt,
}: CategoryHeroProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative overflow-hidden pb-20 pt-[100px] md:pb-28 md:pt-[108px] ${
        isDark ? 'bg-[#070809]' : 'bg-[#f1efea]'
      }`}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: isDark ? 0.028 : 0.55,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className={imageSrc ? 'lg:grid lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-16' : ''}>
        <div>{/* left column */}
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <Link
            href="/products"
            className={`text-[0.6rem] font-bold uppercase tracking-[0.18em] transition-colors ${
              isDark
                ? 'text-white/25 hover:text-white/50'
                : 'text-[#0A0A0A]/30 hover:text-[#0A0A0A]/60'
            }`}
          >
            Products
          </Link>
          <span className={`text-[0.6rem] ${isDark ? 'text-white/15' : 'text-[#0A0A0A]/20'}`}>
            /
          </span>
          <span
            className={`text-[0.6rem] font-bold uppercase tracking-[0.18em] ${
              isDark ? 'text-white/40' : 'text-[#0A0A0A]/55'
            }`}
          >
            {breadcrumbLabel}
          </span>
        </div>

        {/* Tag pill */}
        <div className="mb-5 flex items-center gap-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] ${
              isDark
                ? 'bg-[#FECE00] text-[#0A0A0A]'
                : 'border border-[#0A0A0A]/20 text-[#0A0A0A]/60'
            }`}
          >
            {tag}
          </span>
          {flag && (
            <span
              className={`leading-none ${isDark ? 'opacity-60' : 'opacity-50'}`}
              style={{
                fontSize: flag === '🇨🇭' ? '1.25rem' : '1rem',
                display: 'inline-block',
                transform: flag === '🇨🇭' ? 'scaleX(1.2)' : undefined,
              }}
            >
              {flag}
            </span>
          )}
        </div>

        {/* Eyebrow */}
        <p
          className={`mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] ${
            isDark ? 'text-[#FECE00]/55' : 'text-[#0A0A0A]/40'
          }`}
        >
          {eyebrow}
        </p>

        {/* Headline — split colour treatment matching homepage */}
        <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em]">
          <span className={`block ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            {headline}
          </span>
          <span className="block text-[#FECE00]">{headlineAccent}</span>
        </h1>

        {/* Subline */}
        <p
          className={`mt-5 max-w-xl text-[0.88rem] leading-relaxed ${
            isDark ? 'text-white/38' : 'text-[#0A0A0A]/52'
          }`}
        >
          {subline}
        </p>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border px-5 py-3 ${
                  isDark
                    ? 'border-[#FECE00]/12 bg-[#FECE00]/[0.05]'
                    : 'border-[#0A0A0A]/10 bg-[#0A0A0A]/[0.04]'
                }`}
              >
                <div
                  className={`font-display text-[1.6rem] font-black leading-none ${
                    isDark ? 'text-[#FECE00]' : 'text-[#0A0A0A]'
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] ${
                    isDark ? 'text-white/38' : 'text-[#0A0A0A]/40'
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        </div>{/* end left column */}

        {/* Right — image viewport */}
        {imageSrc && (
          <div className="mt-10 lg:mt-0 lg:h-full">
            <div
              className={`relative w-full h-full min-h-[320px] overflow-hidden rounded-[1.2rem] ${
                isDark
                  ? 'border border-white/[0.08] bg-white/[0.03]'
                  : 'border border-black/[0.08] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
              }`}
            >
              <div className={`absolute left-0 right-0 top-0 z-10 h-[2px] ${isDark ? 'bg-[#FECE00]/25' : 'bg-[#0A0A0A]/10'}`} />
              <Image
                src={imageSrc}
                alt={imageAlt ?? eyebrow}
                fill
                className="object-cover"
                style={{ objectPosition: '30% center' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        )}
        </div>{/* end grid */}
      </div>
    </section>
  );
}
