'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

/* ── tiny carousel used when imageSrcs has >1 entry ── */
function CardImageCarousel({
  images,
  name,
  isDark,
  imageContain,
}: {
  images: { src: string; label?: string; fit?: 'cover' | 'contain' }[];
  name: string;
  isDark: boolean;
  imageContain: boolean;
}) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Slide track */}
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0"
          style={{
            transform: `translateX(${(i - active) * 100}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Image
            src={img.src}
            alt={img.label ?? name}
            fill
            className={img.fit === 'contain' ? 'object-contain p-3' : imageContain ? 'object-contain p-3' : 'object-cover'}
            sizes="600px"
          />
        </div>
      ))}

      {/* Label overlay */}
      {images[active].label && (
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between">
          <span className="rounded-full bg-black px-2.5 py-1 text-[0.42rem] font-semibold uppercase tracking-[0.12em] text-white/80">
            {images[active].label}
          </span>
        </div>
      )}

      {/* Dot nav */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); paused.current = true; setActive(i); setTimeout(() => { paused.current = false; }, 5000); }}
            aria-label={`Image ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active
                ? 'w-4 bg-[#FECE00]'
                : `w-1 ${isDark ? 'bg-white/30' : 'bg-white/50'}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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
  imageSrcs?: { src: string; label?: string; fit?: 'cover' | 'contain' }[];
  className?: string;
  variantTags?: string[];
  imageContain?: boolean;
  imageBgDark?: boolean;
  imageBg?: string;
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
  imageSrcs,
  className = '',
  variantTags,
  imageContain = false,
  imageBgDark = false,
  imageBg,
}: ProductCardProps) {
  const isDark = theme === 'dark';
  const hasCarousel = imageSrcs && imageSrcs.length > 1;
  const router = useRouter();

  return (
    <div
      onClick={() => learnMoreHref && router.push(learnMoreHref)}
      className={`group flex flex-col overflow-hidden rounded-[1.2rem] border transition-all duration-300 hover:-translate-y-0.5 ${
        isDark
          ? 'border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] hover:border-[#FECE00]/[0.16]'
          : 'border-black/[0.08] bg-white/70 hover:border-black/[0.16] hover:bg-white/90'
      } ${learnMoreHref ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Image / Carousel */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${imageBg ? '' : imageBgDark ? 'bg-black' : isDark ? 'bg-white/[0.06]' : 'bg-white'}`} style={imageBg ? { background: imageBg } : undefined}>
        <div className={`absolute left-0 right-0 top-0 z-10 h-[2px] ${isDark ? 'bg-[#FECE00]/30' : 'bg-[#0A0A0A]/15'}`} />
        {hasCarousel ? (
          <CardImageCarousel images={imageSrcs!} name={name} isDark={isDark} imageContain={imageContain} />
        ) : imageSrc ? (
          <Image src={imageSrc} alt={imageLabel ?? name} fill className={imageContain ? 'object-contain p-4' : 'object-cover'} sizes="600px" />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: isDark ? 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)' : 'linear-gradient(rgba(10,10,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-white/15' : 'text-black/20'}`}>{imageLabel ?? `${name} · image`}</span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name + subtitle */}
        <div>
          <h3 className={`font-display text-[1.05rem] font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            {name}
          </h3>
          <p className={`mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] ${isDark ? 'text-[#FECE00]/55' : 'text-[#0A0A0A]/40'}`}>
            {subtitle}
          </p>
        </div>

        {/* Variant tags */}
        {variantTags && variantTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {variantTags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] ${
                  isDark ? 'bg-[#FECE00]/10 text-[#FECE00]/70' : 'bg-[#0A0A0A]/[0.06] text-[#0A0A0A]/50'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className={`text-[0.78rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-[#0A0A0A]/55'}`}>
          {description}
        </p>

        {/* Spec bullets */}
        <ul className={`flex flex-col gap-1.5 border-t pt-3 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
          {specs.map((spec) => (
            <li key={spec} className={`flex items-start gap-2 text-[0.7rem] leading-snug ${isDark ? 'text-white/45' : 'text-[#0A0A0A]/60'}`}>
              <span className={`mt-[4px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${isDark ? 'bg-[#FECE00]' : 'bg-[#0A0A0A]/50'}`} />
              {spec}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div onClick={(e) => e.stopPropagation()} className={`mt-auto flex flex-wrap items-center gap-2 border-t pt-3 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
          <Link
            href={`/contact?product=${enquireSlug}`}
            className={`rounded-full px-4 py-1.5 text-[0.63rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
              isDark ? 'bg-[#FECE00] text-[#0A0A0A] hover:bg-[#FECE00]/85' : 'bg-[#0A0A0A] text-white hover:bg-[#FECE00] hover:text-[#0A0A0A]'
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
