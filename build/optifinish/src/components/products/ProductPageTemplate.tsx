'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────
   EXPORTED TYPES  (used by every product page)
───────────────────────────────────────────────────────────── */

export interface SpecRow { l: string; v: string }

export interface Variant {
  id: string;
  label: string;
  tag: string;
  headline: string;
  body: string;
  specs: SpecRow[];
  imageLabel: string;
  imageSrc?: string;
  videoId?: string;
}

export interface Step {
  num: string;
  title: string;
  body: string;
  imageLabel?: string;
}

export interface Reference {
  client: string;
  desc: string;
}

export interface RelatedItem {
  name: string;
  category: string;
  href: string;
  enquireSlug: string;
}

export interface ProductPageTemplateProps {
  theme: 'dark' | 'light';

  /* S1 — Hero */
  breadcrumb: { label: string; href: string }[];
  badge: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subline: string;
  heroStats?: { val: string; label: string }[];
  heroImageLabel: string;
  heroImageSrc?: string;
  heroImageSrcs?: string[];
  heroImageAspect?: string;
  heroImageCover?: boolean;
  heroImageBg?: string;
  heroVideoId?: string;
  heroVideoStart?: number;
  enquireSlug: string;
  backHref: string;
  backLabel: string;

  /* S2 — Problem / Why */
  problemHeadline: string;
  problemAccent: string;
  problemBody: string;
  benefits: string[];

  /* S2b — Tech Videos (optional standalone section) */
  techVideos?: { eyebrow?: string; headline: string; videos: { id: string; label: string; sub?: string }[] };

  /* S3 — Variants (optional) */
  variants?: Variant[];
  variantsSectionTitle?: string;
  variantImageCover?: boolean;

  /* S4 — How It Works (optional) */
  steps?: Step[];
  howItWorksTitle?: string;

  /* S5 — Specifications */
  specRows: SpecRow[];
  downloads?: { label: string; href: string }[];

  /* S6 — Applications */
  applications: string[];
  applicationImages?: { src: string; label: string; fit?: 'cover' | 'contain' }[];

  /* S7 — Compatibility */
  compatibilityTags: string[];
  partnerNote?: string;

  /* S8 — References */
  references: Reference[];

  /* S9 — Related */
  related: RelatedItem[];

  /* S10 — CTA */
  ctaHeadline: string;
  ctaAccent: string;
  ctaBody: string;
}

/* ─────────────────────────────────────────────────────────────
   INTERNAL PRIMITIVES
───────────────────────────────────────────────────────────── */

function ImageViewport({
  label,
  src,
  isDark = false,
  aspect = 'aspect-[16/9]',
  className = '',
  cover = false,
  noBg = false,
}: {
  label: string;
  src?: string;
  isDark?: boolean;
  aspect?: string;
  className?: string;
  cover?: boolean;
  noBg?: boolean;
}) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-[1.1rem] ${aspect} ${className} ${
          noBg ? '' : isDark ? 'bg-white/[0.03]' : 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
        }`}
      >
        <Image
          src={src}
          alt={label}
          fill
          quality={90}
          className={cover ? 'object-cover' : 'object-contain'}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-[1.1rem] ${
        isDark
          ? 'border border-white/[0.06] bg-white/[0.025]'
          : 'border border-[#0A0A0A]/[0.07] bg-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
      } ${aspect} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(254,206,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {isDark && <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#FECE00]/25" />}
      <div
        className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] ${
          isDark
            ? 'border-white/[0.1] bg-white/[0.05] text-white/30'
            : 'border-[#0A0A0A]/[0.08] bg-white/80 text-[#0A0A0A]/40'
        }`}
      >
        Image viewport
      </div>
      <span
        className={`relative text-[0.65rem] font-medium uppercase tracking-[0.2em] ${
          isDark ? 'text-white/18' : 'text-[#0A0A0A]/20'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function GridTexture({ forYellow = false }: { forYellow?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: forYellow
          ? 'linear-gradient(rgba(10,10,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,1) 1px, transparent 1px)'
          : 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.035,
      }}
    />
  );
}

function LightGridTexture() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.62] mix-blend-multiply"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)',
          backgroundSize: '264px 264px',
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */

export default function ProductPageTemplate({
  theme,
  breadcrumb,
  badge,
  eyebrow,
  headline,
  headlineAccent,
  subline,
  heroStats,
  heroImageLabel,
  heroImageSrc,
  heroImageSrcs,
  heroImageAspect,
  heroImageCover = false,
  heroImageBg,
  heroVideoId,
  heroVideoStart = 0,
  enquireSlug,
  backHref,
  backLabel,
  problemHeadline,
  problemAccent,
  problemBody,
  benefits,
  techVideos,
  variants,
  variantsSectionTitle,
  variantImageCover = false,
  steps,
  howItWorksTitle,
  specRows,
  downloads,
  applications,
  applicationImages,
  compatibilityTags,
  partnerNote,
  references,
  related,
  ctaHeadline,
  ctaAccent,
  ctaBody,
}: ProductPageTemplateProps) {
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);
  const [showSoundBtn, setShowSoundBtn] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    const cmd = videoMuted ? 'unMute' : 'mute';
    videoRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: cmd, args: [] }), '*'
    );
    setVideoMuted(!videoMuted);
  };

  const isLight = theme === 'light';
  const hasVariants = !!(variants && variants.length > 0);
  const hasSteps = !!(steps && steps.length > 0);

  /* ── Section ordering ─────────────────────────────────── */
  const renderedSections: string[] = [
    'hero',
    'problem',
    ...(hasVariants ? ['variants'] : []),
    ...(hasSteps ? ['steps'] : []),
    'specs',
    'applications',
    'compatibility',
    ...(references.length > 0 ? ['references'] : []),
    'related',
    'cta',
  ];

  const secBg = (name: string): string => {
    if (name === 'cta') return '#FECE00';
    const pos = renderedSections.indexOf(name) + 1;
    if (isLight) return pos % 2 === 1 ? '#f1efea' : '#070809';
    return pos % 2 === 1 ? '#070809' : '#f1efea';
  };

  /* Light bg: light-theme on odd positions, dark-theme on even positions */
  const secIsLight = (name: string): boolean => {
    if (name === 'cta') return true;
    const pos = renderedSections.indexOf(name) + 1;
    if (isLight) return pos % 2 === 1;
    return pos % 2 === 0;
  };

  /* Colour helpers given whether section bg is light */
  const cTx = (light: boolean) => (light ? 'text-[#0A0A0A]' : 'text-white');
  const cBody = (light: boolean) => (light ? 'text-[#0A0A0A]/60' : 'text-white/55');
  const cEye = (light: boolean) => (light ? 'text-[#0A0A0A]/40' : 'text-[#FECE00]/55');
  const cBdr = (light: boolean) => (light ? 'border-black/[0.08]' : 'border-white/[0.08]');
  const cDot = (light: boolean) => (light ? 'bg-[#0A0A0A]/50' : 'bg-[#FECE00]');
  const cTag = (light: boolean) =>
    light
      ? 'border-black/[0.1] bg-black/[0.04] text-[#0A0A0A]/55'
      : 'border-white/[0.1] bg-white/[0.04] text-white/55';
  const cBadge = (light: boolean) =>
    light
      ? 'border border-black/[0.12] text-[#0A0A0A]/55'
      : 'bg-[#FECE00]/10 text-[#FECE00]';

  /* Shorthand for common sections */
  const hero = secIsLight('hero');
  const prob = secIsLight('problem');
  const vars = secIsLight('variants');
  const stps = secIsLight('steps');
  const spec = secIsLight('specs');
  const appl = secIsLight('applications');
  const comp = secIsLight('compatibility');
  const refs = secIsLight('references');
  const rltd = secIsLight('related');

  const currVariant = hasVariants ? variants![activeVariant] : null;
  const currStep = hasSteps ? steps![activeStep] : null;
  const [activeAppImg, setActiveAppImg] = useState(0);
  const appImgPaused = useRef(false);

  useEffect(() => {
    if (!applicationImages || applicationImages.length <= 1) return;
    const id = setInterval(() => {
      if (!appImgPaused.current) {
        setActiveAppImg((i) => (i + 1) % applicationImages.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [applicationImages]);

  return (
    <main>

      {/* ══════════════════════════════════════════════════════
          BREADCRUMB + S1 — shared wrapper so grid covers the
          full page from top (behind navbar) into hero
      ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: secBg('hero') }}>
        {hero ? <LightGridTexture /> : <GridTexture />}

        {/* Breadcrumb bar */}
        <div className={`relative z-10 border-b pt-[60px] md:pt-[68px] ${isLight ? 'border-black/[0.07]' : 'border-white/[0.06]'}`}>
          <div className="mx-auto max-w-7xl px-5 py-3 md:px-8">
            <nav className={`flex flex-wrap items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.2em] ${isLight ? 'text-[#0A0A0A]/35' : 'text-white/30'}`}>
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="opacity-40">/</span>}
                  {i < breadcrumb.length - 1 ? (
                    <Link href={crumb.href} className="transition-opacity hover:opacity-80">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLight ? 'text-[#0A0A0A]/60' : 'text-white/55'}>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Hero content */}
        <section className="relative">
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 md:py-20 md:px-8 lg:py-28">

          <div className={`grid gap-12 lg:gap-20 ${heroVideoId ? 'items-stretch lg:grid-cols-[1fr_1.3fr]' : 'lg:grid-cols-[1fr_1fr]'}`}>
            {/* Left — Text */}
            <div className="flex flex-col justify-center">
              <span
                className={`mb-4 inline-block self-start rounded-full px-3 py-1 text-[0.52rem] font-bold uppercase tracking-[0.18em] ${cBadge(hero)}`}
              >
                {badge}
              </span>
              <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(hero)}`}>
                {eyebrow}
              </p>
              <h1
                className={`font-display text-[clamp(1.7rem,4.5vw,2.4rem)] font-black leading-[0.92] tracking-tight md:text-[3.2rem] lg:text-[3.5rem] ${cTx(hero)}`}
              >
                {headline}{' '}
                <span className="text-[#FECE00]">{headlineAccent}</span>
              </h1>
              <p className={`mt-5 max-w-[460px] text-[0.88rem] leading-relaxed ${cBody(hero)}`}>
                {subline}
              </p>

              {/* Stats chips */}
              {heroStats && heroStats.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {heroStats.map((s) => (
                    <div key={s.label} className={`rounded-xl border px-4 py-3 ${cBdr(hero)}`}>
                      <div className={`font-display text-[1.3rem] font-black leading-none ${cTx(hero)}`}>
                        {s.val}
                      </div>
                      <div className={`mt-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] ${cEye(hero)}`}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/contact?product=${enquireSlug}`}
                  className="rounded-full bg-[#FECE00] px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#0A0A0A] transition-opacity hover:opacity-85"
                >
                  Enquire →
                </Link>
                <Link
                  href={backHref}
                  className={`rounded-full border px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] transition-all ${
                    hero
                      ? 'border-black/[0.14] text-[#0A0A0A]/45 hover:border-black/[0.28] hover:text-[#0A0A0A]/70'
                      : 'border-white/[0.14] text-white/40 hover:border-white/[0.3] hover:text-white/65'
                  }`}
                >
                  {backLabel}
                </Link>
              </div>
            </div>

            {/* Right — Hero image or video */}
            {heroVideoId ? (
              <div
                className="relative min-h-[460px] w-full overflow-hidden rounded-[1.1rem] lg:h-full bg-black"
                onMouseEnter={() => setShowSoundBtn(true)}
                onMouseLeave={() => setShowSoundBtn(false)}
              >
                <iframe
                  ref={videoRef}
                  src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${heroVideoId}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&showinfo=0${heroVideoStart ? `&start=${heroVideoStart}` : ''}`}
                  title={heroImageLabel}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                  style={{ position: 'absolute', top: '-16%', left: '0', width: '100%', height: '132%' }}
                />
                {/* Transparent overlay — blocks YouTube hover UI from appearing */}
                <div className="absolute inset-0 z-[5]" />
                <button
                  onClick={toggleSound}
                  className={`absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] backdrop-blur-sm transition-all duration-200 ${
                    showSoundBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  } ${
                    videoMuted
                      ? 'border-white/20 bg-black/50 text-white/60 hover:border-white/40 hover:text-white/90'
                      : 'border-[#FECE00]/40 bg-black/50 text-[#FECE00] hover:border-[#FECE00]/70'
                  }`}
                >
                  {videoMuted ? (<><span>🔇</span> Sound off</>) : (<><span>🔊</span> Sound on</>)}
                </button>
              </div>
            ) : heroImageSrcs && heroImageSrcs.length > 1 ? (
              <div className="relative w-full overflow-hidden rounded-[1.2rem]">
                <div className={`relative w-full overflow-hidden ${heroImageAspect ?? 'aspect-[16/9]'}`}>
                  {heroImageSrcs.map((src, i) => (
                    <div
                      key={src}
                      className="absolute inset-0"
                      style={{
                        transform: `translateX(${(i - heroImgIdx) * 100}%)`,
                        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    >
                      <Image src={src} alt={heroImageLabel} fill className={heroImageCover ? 'object-cover' : 'object-contain'} sizes="700px" />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  {heroImageSrcs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroImgIdx(i)}
                      aria-label={`Image ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === heroImgIdx ? 'w-5 bg-[#FECE00]' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div
                  className={`relative overflow-hidden rounded-[1.1rem] w-full ${heroImageAspect ?? 'aspect-[16/9]'} ${heroImageBg ? '' : !hero ? 'bg-white/[0.03]' : 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]'}`}
                  style={heroImageBg ? { background: heroImageBg } : undefined}
                >
                  {heroImageSrc && (
                    <Image src={heroImageSrc} alt={heroImageLabel} fill quality={90} className={heroImageCover ? 'object-cover' : 'object-contain'} sizes="(max-width: 768px) 100vw, 50vw" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        </section>
      </div>{/* end breadcrumb+hero wrapper */}

      {/* ══════════════════════════════════════════════════════
          S2 — PROBLEM / VALUE PROPOSITION
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: secBg('problem') }} className="relative overflow-hidden">
        {prob ? <LightGridTexture /> : <GridTexture />}
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className={`mb-3 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(prob)}`}>
                Why this product
              </p>
              <h2
                className={`font-display text-[clamp(1.5rem,4vw,2rem)] font-black leading-[0.94] tracking-tight md:text-[2.6rem] ${cTx(prob)}`}
              >
                {problemHeadline}{' '}
                <span className="text-[#FECE00]">{problemAccent}</span>
              </h2>
              <p className={`mt-5 text-[0.86rem] leading-relaxed ${cBody(prob)}`}>{problemBody}</p>
            </div>
            <div className={`lg:border-l lg:pl-10 ${cBdr(prob)}`}>
              <ul className="flex flex-col gap-4">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${cDot(prob)}`} />
                    <span className={`text-[0.83rem] leading-relaxed ${cBody(prob)}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S2b — TECH VIDEOS (optional)
      ══════════════════════════════════════════════════════ */}
      {techVideos && (
        <section style={{ background: secBg('techVideos') }} className="relative overflow-hidden">
          {isLight ? <LightGridTexture /> : <GridTexture />}
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:py-20 md:px-8">
            {techVideos.eyebrow && (
              <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(isLight)}`}>
                {techVideos.eyebrow}
              </p>
            )}
            <h2 className={`mb-10 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(isLight)}`}>
              {techVideos.headline}
            </h2>
            <div className={`grid gap-6 ${techVideos.videos.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {techVideos.videos.map((v) => (
                <div key={v.id} className={`overflow-hidden rounded-[1.1rem] border ${isLight ? 'border-black/[0.08] bg-white/60' : 'border-white/[0.07] bg-white/[0.03]'}`}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&loop=1&playlist=${v.id}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&showinfo=0`}
                      title={v.label}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                      style={{ position: 'absolute', top: '-16%', left: '0', width: '100%', height: '132%' }}
                    />
                    <div className="absolute inset-0 z-[5]" />
                  </div>
                  <div className="px-5 py-4">
                    <p className={`text-[0.82rem] font-bold leading-snug ${isLight ? 'text-[#0A0A0A]' : 'text-white'}`}>
                      {v.label}
                    </p>
                    {v.sub && (
                      <p className={`mt-1 text-[0.68rem] ${isLight ? 'text-[#0A0A0A]/45' : 'text-white/40'}`}>
                        {v.sub}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          S3 — VARIANTS (conditional)
      ══════════════════════════════════════════════════════ */}
      {hasVariants && (
        <section style={{ background: secBg('variants') }} className="relative overflow-hidden">
          {vars ? <LightGridTexture /> : <GridTexture />}
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
            <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(vars)}`}>
              Models & Configurations
            </p>
            <h2
              className={`mb-8 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(vars)}`}
            >
              {variantsSectionTitle ?? 'Choose your configuration'}
            </h2>

            {/* Variant pills */}
            <div className="mb-8 flex flex-wrap gap-2">
              {variants!.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(i)}
                  className={`rounded-full border px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                    i === activeVariant
                      ? vars
                        ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                        : 'border-[#FECE00] bg-[#FECE00] text-[#0A0A0A]'
                      : vars
                      ? 'border-black/[0.14] text-[#0A0A0A]/45 hover:border-black/[0.3] hover:text-[#0A0A0A]/70'
                      : 'border-white/[0.14] text-white/35 hover:border-white/[0.3] hover:text-white/60'
                  }`}
                >
                  {v.label}
                  <span
                    className={`ml-2 text-[0.52rem] ${
                      i === activeVariant ? 'opacity-70' : 'opacity-40'
                    }`}
                  >
                    {v.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Active variant detail — card always dark */}
            {currVariant && (
              <div className="grid gap-8 rounded-[1.2rem] border border-white/[0.08] bg-[#070809] p-6 md:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
                <div>
                  <span className="mb-3 inline-block rounded-full bg-[#FECE00]/10 px-3 py-1 text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]/80">
                    {currVariant.tag}
                  </span>
                  <h3 className="font-display text-[1.5rem] font-black leading-tight tracking-tight text-white">
                    {currVariant.headline}
                  </h3>
                  <p className="mt-3 text-[0.84rem] leading-relaxed text-white/55">
                    {currVariant.body}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5 border-t border-white/[0.08] pt-4">
                    {currVariant.specs.map((sp) => (
                      <li
                        key={sp.l}
                        className="flex justify-between gap-6 text-[0.72rem] text-white/55"
                      >
                        <span className="opacity-70">{sp.l}</span>
                        <span className="text-right font-semibold text-white">{sp.v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {currVariant.videoId ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.1rem] bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${currVariant.videoId}?autoplay=1&mute=1&loop=1&playlist=${currVariant.videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&showinfo=0`}
                      title={currVariant.imageLabel}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                      style={{ position: 'absolute', top: '-16%', left: '0', width: '100%', height: '132%' }}
                    />
                    <div className="absolute inset-0 z-[5]" />
                  </div>
                ) : currVariant.imageSrc ? (
                  <div className="relative flex items-center justify-center overflow-hidden rounded-[1.1rem] bg-[#0c0c0e] py-8 md:py-10">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(254,206,0,0.055)_0%,transparent_70%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
                    <div className="relative mx-auto w-[58%] max-w-[280px]">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={currVariant.imageSrc}
                          alt={currVariant.imageLabel}
                          fill
                          quality={92}
                          className="object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
                          sizes="320px"
                        />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0c0e]/60 to-transparent" />
                  </div>
                ) : (
                  <ImageViewport
                    label={currVariant.imageLabel}
                    src={currVariant.imageSrc}
                    isDark={true}
                    aspect="aspect-[4/3]"
                    cover={variantImageCover}
                    noBg
                  />
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          S4 — HOW IT WORKS (conditional)
      ══════════════════════════════════════════════════════ */}
      {hasSteps && (
        <section style={{ background: secBg('steps') }} className="relative overflow-hidden">
          {stps ? <LightGridTexture /> : <GridTexture />}
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
            <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(stps)}`}>
              How it works
            </p>
            <h2
              className={`mb-10 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(stps)}`}
            >
              {howItWorksTitle ?? 'From setup to finish'}
            </h2>

            {/* Step pills */}
            <div className="mb-8 flex flex-wrap gap-2">
              {steps!.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(i)}
                  className={`rounded-full border px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                    i === activeStep
                      ? stps
                        ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                        : 'border-[#FECE00] bg-[#FECE00] text-[#0A0A0A]'
                      : stps
                      ? 'border-black/[0.14] text-[#0A0A0A]/45 hover:border-black/[0.3]'
                      : 'border-white/[0.14] text-white/35 hover:border-white/[0.3]'
                  }`}
                >
                  <span className="mr-1.5 opacity-50">{s.num}</span>
                  {s.title}
                </button>
              ))}
            </div>

            {/* Active step detail — always dark card */}
            {currStep && (
              <div className="grid gap-8 rounded-[1.2rem] border border-white/[0.08] bg-[#070809] p-6 md:p-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
                <div>
                  <div className="mb-3 font-display text-[2rem] font-black leading-none text-white/10 md:text-[3rem]">
                    {currStep.num}
                  </div>
                  <h3 className="font-display text-[1.5rem] font-black leading-tight tracking-tight text-white">
                    {currStep.title}
                  </h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-white/55">
                    {currStep.body}
                  </p>
                </div>
                <ImageViewport
                  label={currStep.imageLabel ?? `Step ${currStep.num} · ${currStep.title}`}
                  src={currStep.imageSrc}
                  isDark={true}
                  aspect="aspect-[4/3]"
                  cover
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          S5 — FULL SPECIFICATIONS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: secBg('specs') }} className="relative overflow-hidden">
        {spec ? <LightGridTexture /> : <GridTexture />}
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
          <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(spec)}`}>
            Technical data
          </p>
          <h2
            className={`mb-10 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(spec)}`}
          >
            Full specifications
          </h2>
          <div className="overflow-hidden rounded-[1.2rem] border border-[#FECE00]/[0.22] bg-[#0A0A0A]">
            {specRows.map((row, i) => (
              <div
                key={row.l}
                className={`flex items-start justify-between gap-4 px-4 py-3.5 md:gap-8 md:px-6 md:py-4 ${
                  i < specRows.length - 1 ? 'border-b border-[#FECE00]/[0.1]' : ''
                }`}
              >
                <span className="min-w-[90px] shrink-0 text-[0.68rem] font-medium text-white/50 md:min-w-[130px] md:text-[0.72rem]">
                  {row.l}
                </span>
                <span className="min-w-0 break-words text-right text-[0.68rem] font-semibold text-white/85 md:text-[0.72rem]">
                  {row.v}
                </span>
              </div>
            ))}
          </div>
          {downloads && downloads.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {downloads.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  download
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#FECE00] px-5 py-2.5 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#0A0A0A] shadow-[0_2px_12px_rgba(254,206,0,0.35)] transition-all duration-200 hover:bg-[#FECE00]/85 hover:shadow-[0_4px_20px_rgba(254,206,0,0.45)]"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1.5 11.5h10" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {d.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S6 — APPLICATIONS & USE CASES
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: secBg('applications') }} className="relative overflow-hidden">
        {appl ? <LightGridTexture /> : <GridTexture />}
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(appl)}`}>
                Where it's used
              </p>
              <h2
                className={`font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(appl)}`}
              >
                Applications &amp; use cases
              </h2>
              <ul className={`mt-8 flex flex-col gap-3 border-t pt-6 ${cBdr(appl)}`}>
                {applications.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${cDot(appl)}`} />
                    <span className={`text-[0.83rem] leading-relaxed ${cBody(appl)}`}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            {applicationImages && applicationImages.length > 0 ? (
              <div
                className="self-center w-full"
                onMouseEnter={() => { appImgPaused.current = true; }}
                onMouseLeave={() => { appImgPaused.current = false; }}
              >
                {/* Carousel image */}
                <div className={`relative overflow-hidden rounded-[1.2rem] aspect-[4/3] ${appl ? 'bg-black/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.08)]' : 'bg-white/[0.03]'}`}>
                  {/* Slide track — each image absolutely positioned, slides in/out */}
                  {applicationImages.map((img, i) => (
                    <div
                      key={img.src}
                      className="absolute inset-0"
                      style={{
                        transform: `translateX(${(i - activeAppImg) * 100}%)`,
                        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className={img.fit === 'contain' ? 'object-contain' : 'object-cover'}
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  ))}
                  {/* Gradient overlay for legibility */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent z-10" />
                  {/* Label row */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                    <span className="rounded-full bg-black/30 px-2.5 py-1 text-[0.46rem] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
                      {applicationImages[activeAppImg].label}
                    </span>
                    <span className="text-[0.46rem] font-semibold tracking-[0.1em] text-white/40">
                      {activeAppImg + 1} / {applicationImages.length}
                    </span>
                  </div>
                  {/* Auto-progress bar */}
                  <div className="absolute top-0 left-0 right-0 z-20 h-[2px] overflow-hidden">
                    <div
                      key={`bar-${activeAppImg}`}
                      className="h-full bg-[#FECE00]/70"
                      style={{ animation: 'appImgProgress 4s linear forwards' }}
                    />
                  </div>
                </div>
                {/* Controls row */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <button
                    onClick={() => { appImgPaused.current = true; setActiveAppImg((i) => (i - 1 + applicationImages.length) % applicationImages.length); setTimeout(() => { appImgPaused.current = false; }, 6000); }}
                    aria-label="Previous image"
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-all ${appl ? 'border-black/[0.1] text-black/35 hover:border-black/[0.3] hover:text-black/65' : 'border-white/[0.1] text-white/35 hover:border-white/[0.3] hover:text-white/65'}`}
                  >←</button>
                  <div className="flex gap-1.5">
                    {applicationImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { appImgPaused.current = true; setActiveAppImg(i); setTimeout(() => { appImgPaused.current = false; }, 6000); }}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeAppImg ? 'w-5 bg-[#FECE00]' : `w-1.5 ${appl ? 'bg-black/20 hover:bg-black/35' : 'bg-white/20 hover:bg-white/35'}`}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => { appImgPaused.current = true; setActiveAppImg((i) => (i + 1) % applicationImages.length); setTimeout(() => { appImgPaused.current = false; }, 6000); }}
                    aria-label="Next image"
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-all ${appl ? 'border-black/[0.1] text-black/35 hover:border-black/[0.3] hover:text-black/65' : 'border-white/[0.1] text-white/35 hover:border-white/[0.3] hover:text-white/65'}`}
                  >→</button>
                </div>
              </div>
            ) : (
              <ImageViewport
                label="Application context · image"
                isDark={!appl}
                aspect="aspect-[4/3]"
                className="self-center"
              />
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S7 — COMPATIBILITY & INTEGRATION
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: secBg('compatibility') }} className="relative overflow-hidden">
        {comp ? <LightGridTexture /> : <GridTexture />}
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
          <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(comp)}`}>
            Works with
          </p>
          <h2
            className={`mb-8 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(comp)}`}
          >
            Compatibility &amp; integration
          </h2>
          {partnerNote && (
            <p className={`mb-8 max-w-[560px] text-[0.85rem] leading-relaxed ${cBody(comp)}`}>
              {partnerNote}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {compatibilityTags.map((tag) => (
              <span
                key={tag}
                className={`rounded-lg border px-3.5 py-2 text-[0.65rem] font-semibold tracking-wide ${cTag(comp)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S8 — REFERENCE PROJECTS (conditional)
      ══════════════════════════════════════════════════════ */}
      {references.length > 0 && (
        <section style={{ background: secBg('references') }} className="relative overflow-hidden">
          {refs ? <LightGridTexture /> : <GridTexture />}
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
            <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(refs)}`}>
              In the field
            </p>
            <h2
              className={`mb-10 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(refs)}`}
            >
              Reference projects
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {references.map((ref, i) => (
                <div
                  key={i}
                  className={`rounded-[1rem] border p-6 ${
                    refs
                      ? 'border-[#0A0A0A]/[0.07] bg-white/70 shadow-[0_4px_14px_rgba(0,0,0,0.05)]'
                      : 'border-[#FECE00]/[0.12] bg-[#FECE00]/[0.03]'
                  }`}
                >
                  <p
                    className={`mb-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] ${
                      refs ? 'text-[#0A0A0A]/45' : 'text-[#FECE00]/70'
                    }`}
                  >
                    {ref.client}
                  </p>
                  <p className={`text-[0.8rem] leading-relaxed ${cBody(refs)}`}>{ref.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          S9 — RELATED PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: secBg('related') }} className="relative overflow-hidden">
        {rltd ? <LightGridTexture /> : <GridTexture />}
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
          <p className={`mb-2 text-[0.6rem] font-bold uppercase tracking-[0.26em] ${cEye(rltd)}`}>
            You may also need
          </p>
          <h2
            className={`mb-10 font-display text-[1.8rem] font-black leading-tight tracking-tight ${cTx(rltd)}`}
          >
            Related products
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {related.map((item) => (
              <div
                key={item.href}
                className={`group flex flex-col overflow-hidden rounded-[1.1rem] border transition-all duration-300 hover:-translate-y-0.5 ${
                  rltd
                    ? 'border-[#0A0A0A]/[0.07] bg-white/70 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14]'
                }`}
              >
                <div
                  className={`flex aspect-[16/9] items-center justify-center ${
                    rltd ? 'bg-black/[0.03]' : 'bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`text-[0.58rem] font-bold uppercase tracking-[0.2em] ${
                      rltd ? 'text-[#0A0A0A]/18' : 'text-white/14'
                    }`}
                  >
                    {item.name} · image
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <p
                      className={`text-[0.58rem] font-bold uppercase tracking-[0.14em] ${cEye(rltd)}`}
                    >
                      {item.category}
                    </p>
                    <h3
                      className={`mt-1 font-display text-[1rem] font-black leading-tight tracking-tight ${cTx(rltd)}`}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <div
                    className={`mt-auto flex gap-2 border-t pt-3 ${cBdr(rltd)}`}
                  >
                    <Link
                      href={`/contact?product=${item.enquireSlug}`}
                      className={`rounded-full px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] transition-all ${
                        rltd
                          ? 'bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/80'
                          : 'bg-[#FECE00] text-[#0A0A0A] hover:opacity-85'
                      }`}
                    >
                      Enquire
                    </Link>
                    <Link
                      href={item.href}
                      className={`rounded-full border px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] transition-all ${
                        rltd
                          ? 'border-black/[0.12] text-[#0A0A0A]/40 hover:border-black/[0.24] hover:text-[#0A0A0A]/65'
                          : 'border-white/[0.1] text-white/35 hover:border-white/[0.22] hover:text-white/60'
                      }`}
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S10 — CTA (always yellow)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FECE00' }} className="relative overflow-hidden">
        <GridTexture forYellow />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8 text-center">
          <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.26em] text-[#0A0A0A]/45">
            Ready to specify?
          </p>
          <h2 className="font-display text-[clamp(1.6rem,4.5vw,2.2rem)] font-black leading-[0.94] tracking-tight text-[#0A0A0A] md:text-[3rem]">
            {ctaHeadline}{' '}
            <span className="text-[#0A0A0A]/50">{ctaAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[0.87rem] leading-relaxed text-[#0A0A0A]/60">
            {ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?product=${enquireSlug}`}
              className="rounded-full bg-[#0A0A0A] px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-80"
            >
              Enquire now →
            </Link>
            <Link
              href={backHref}
              className="rounded-full border border-[#0A0A0A]/25 px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/60 transition-all hover:border-[#0A0A0A]/50 hover:text-[#0A0A0A]/80"
            >
              {backLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
