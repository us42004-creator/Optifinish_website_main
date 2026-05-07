import Link from 'next/link';

interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  specs: string[];
  enquireSlug: string;
  learnMoreHref?: string;
  externalHref?: string;
  externalLabel?: string;
  theme: 'dark' | 'light';
  imageLabel?: string;
  imageSrc?: string;
  className?: string;
}

export default function ProductCard({
  name,
  subtitle,
  description,
  specs,
  enquireSlug,
  learnMoreHref,
  externalHref,
  externalLabel = 'Visit site ↗',
  theme,
  imageLabel,
  imageSrc,
  className = '',
}: ProductCardProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-[1.2rem] border transition-all duration-300 hover:-translate-y-0.5 ${
        isDark
          ? 'border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] hover:border-[#FECE00]/[0.16]'
          : 'border-black/[0.08] bg-white/70 hover:border-black/[0.16] hover:bg-white/90'
      } ${className}`}
    >
      {/* Image area */}
      <div
        className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden ${
          isDark ? 'bg-white/[0.025]' : 'bg-black/[0.03]'
        }`}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageLabel ?? name} className="h-full w-full object-cover" />
        ) : (
          <>
            {/* Subtle grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)'
                  : 'linear-gradient(rgba(10,10,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Yellow top accent bar */}
            <div
              className={`absolute left-0 right-0 top-0 h-[2px] ${
                isDark ? 'bg-[#FECE00]/30' : 'bg-[#0A0A0A]/15'
              }`}
            />
            <span
              className={`relative text-[9px] font-semibold uppercase tracking-[0.24em] ${
                isDark ? 'text-white/15' : 'text-black/20'
              }`}
            >
              {imageLabel ?? `${name} · image`}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name + subtitle */}
        <div>
          <h3
            className={`font-display text-[1.05rem] font-black leading-tight tracking-tight ${
              isDark ? 'text-white' : 'text-[#0A0A0A]'
            }`}
          >
            {name}
          </h3>
          <p
            className={`mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] ${
              isDark ? 'text-[#FECE00]/55' : 'text-[#0A0A0A]/40'
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p
          className={`text-[0.78rem] leading-relaxed ${
            isDark ? 'text-white/40' : 'text-[#0A0A0A]/55'
          }`}
        >
          {description}
        </p>

        {/* Spec bullets */}
        <ul
          className={`flex flex-col gap-1.5 border-t pt-3 ${
            isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
          }`}
        >
          {specs.map((spec) => (
            <li
              key={spec}
              className={`flex items-start gap-2 text-[0.7rem] leading-snug ${
                isDark ? 'text-white/45' : 'text-[#0A0A0A]/60'
              }`}
            >
              <span
                className={`mt-[4px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                  isDark ? 'bg-[#FECE00]' : 'bg-[#0A0A0A]/50'
                }`}
              />
              {spec}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div
          className={`mt-auto flex flex-wrap items-center gap-2 border-t pt-3 ${
            isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
          }`}
        >
          <Link
            href={`/contact?product=${enquireSlug}`}
            className={`rounded-full px-4 py-1.5 text-[0.63rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
              isDark
                ? 'bg-[#FECE00] text-[#0A0A0A] hover:bg-[#FECE00]/85'
                : 'bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/80'
            }`}
          >
            Enquire →
          </Link>
          {learnMoreHref && (
            <Link
              href={learnMoreHref}
              className={`rounded-full border px-4 py-1.5 text-[0.63rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                isDark
                  ? 'border-white/[0.1] text-white/30 hover:border-white/[0.22] hover:text-white/55'
                  : 'border-black/[0.1] text-[#0A0A0A]/38 hover:border-black/[0.22] hover:text-[#0A0A0A]/60'
              }`}
            >
              Learn more
            </Link>
          )}
          {externalHref && (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border px-4 py-1.5 text-[0.63rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                isDark
                  ? 'border-[#FECE00]/20 text-[#FECE00]/50 hover:border-[#FECE00]/40 hover:text-[#FECE00]/80'
                  : 'border-black/[0.12] text-[#0A0A0A]/40 hover:border-black/[0.24] hover:text-[#0A0A0A]/65'
              }`}
            >
              {externalLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
