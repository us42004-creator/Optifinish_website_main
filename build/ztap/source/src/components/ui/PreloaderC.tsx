'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

// Positioned with explicit top/left/right so GSAP y-float doesn't fight CSS translate
const VALUE_PILLS = [
  { label: 'Coat accuracy', value: '99.4%', pos: { top: '30px',  left: '10px'  }, delay: 1.3  },
  { label: 'Setup time',    value: '↓ 80%', pos: { top: '50px',  right: '10px' }, delay: 1.6  },
  { label: 'Touch points',  value: 'Zero',  pos: { bottom: '30px', left: '60px' }, delay: 1.85 },
];

export default function PreloaderC() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const wrapRef        = useRef<HTMLDivElement>(null);
  const gridRef        = useRef<HTMLDivElement>(null);
  const gridRevealRef  = useRef<HTMLDivElement>(null);
  const scanlineRef    = useRef<HTMLDivElement>(null);
  const spotlightRef   = useRef<HTMLDivElement>(null);
  const orbitRef       = useRef<HTMLDivElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);
  const nameRef        = useRef<HTMLDivElement>(null);
  const tagRef         = useRef<HTMLDivElement>(null);
  const counterRef     = useRef<HTMLDivElement>(null);
  const pillsRef       = useRef<HTMLDivElement>(null);
  const circleRef      = useRef<HTMLDivElement>(null);
  const readyRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const isDesktop = window.innerWidth >= 1024;

    // Mouse spotlight — desktop only
    const onMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlightRef.current.style.background = `radial-gradient(circle 340px at ${x}% ${y}%, rgba(254,206,0,0.18) 0%, rgba(254,206,0,0.06) 45%, transparent 70%)`;
    };
    if (isDesktop) window.addEventListener('mousemove', onMouseMove);

    // Logo hover — desktop only
    const logoEl = logoRef.current;
    const onLogoEnter = () => gsap.to(logoEl, { scale: 1.12, duration: 0.35, ease: 'back.out(2)' });
    const onLogoLeave = () => gsap.to(logoEl, { scale: 1,    duration: 0.4,  ease: 'power2.out' });
    if (isDesktop) {
      logoEl?.addEventListener('mouseenter', onLogoEnter);
      logoEl?.addEventListener('mouseleave', onLogoLeave);
    }

    // Value pills — gentle float loop (starts after they appear)
    const pillEls = pillsRef.current
      ? Array.from(pillsRef.current.querySelectorAll<HTMLElement>('[data-pill]'))
      : [];

    // Initial states
    gsap.set(gridRef.current,       { opacity: 0 });
    gsap.set(gridRevealRef.current, { opacity: 0 });
    gsap.set(scanlineRef.current,   { opacity: 0 });
    gsap.set(readyRef.current,      { opacity: 0 });
    gsap.set(orbitRef.current,   { scale: 0.7, opacity: 0 });
    gsap.set(logoRef.current,    { scale: 0.8, opacity: 0 });
    gsap.set(nameRef.current,    { y: 16, opacity: 0 });
    gsap.set(tagRef.current,     { opacity: 0 });
    gsap.set(counterRef.current, { opacity: 0 });
    gsap.set(circleRef.current,  { scale: 0 });
    gsap.set(pillEls,            { opacity: 0, scale: 0.85, y: 8 });

    let completionFired = false;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        window.dispatchEvent(new Event('preloader:done'));
        setDone(true);
      },
    });

    tl
      .to(gridRef.current,       { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
      .to(gridRevealRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.75)
      .to(scanlineRef.current,   { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.75)
      .to(orbitRef.current,   { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, 0.2)
      .to(logoRef.current,    { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4)
      .to(counterRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.7)
      .to({ val: 0 }, {
        val: 100,
        duration: 3.0,
        ease: 'power1.inOut',
        onUpdate: function () {
          const val = this.targets()[0].val;
          setCount(Math.round(val));
          const p = val / 100;

          const pct = p * 100;
          // Clip red grid OUT of revealed zone so yellow shows pure (no red bleed)
          if (gridRef.current) {
            gridRef.current.style.clipPath = `inset(0 0 0 ${pct.toFixed(2)}%)`;
          }
          if (gridRevealRef.current) {
            gridRevealRef.current.style.clipPath = `inset(0 ${(100 - pct).toFixed(2)}% 0 0)`;
          }
          if (scanlineRef.current) {
            scanlineRef.current.style.left = `${pct.toFixed(2)}%`;
          }

          // Completion moment — fires once when counter hits 100
          if (Math.round(val) === 100 && !completionFired) {
            completionFired = true;
            // Grid reveal flash
            gsap.to(gridRevealRef.current, { opacity: 0.75, duration: 0.13, yoyo: true, repeat: 1, ease: 'power2.inOut' });
            // Counter flashes yellow
            gsap.to(counterRef.current,    { color: '#FECE00', duration: 0.13, yoyo: true, repeat: 1 });
            // "SYSTEM READY" label fades in
            gsap.to(readyRef.current,      { opacity: 1, duration: 0.3, delay: 0.18 });
          }
        },
      }, 0.8)
      .to(nameRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.9)
      .to(tagRef.current,  { opacity: 1, duration: 0.35, ease: 'power2.out' }, 1.1);

    // Stagger pills in
    VALUE_PILLS.forEach((p, i) => {
      tl.to(pillEls[i], { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)' }, p.delay);
    });

    // Float each pill gently after appearing
    pillEls.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -8 : 8,
        duration: 2.2 + i * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: VALUE_PILLS[i].delay + 0.5,
      });
    });

    tl
      .to({}, { duration: 0.6 }, 3.8)
      .to(circleRef.current, { scale: 45, duration: 0.75, ease: 'power2.inOut' }, 4.2);

    return () => {
      tl.kill();
      gsap.killTweensOf(pillEls);
      document.body.style.overflow = '';
      window.removeEventListener('mousemove', onMouseMove);
      if (isDesktop) {
        logoEl?.removeEventListener('mouseenter', onLogoEnter);
        logoEl?.removeEventListener('mouseleave', onLogoLeave);
      }
    };
  }, []);

  if (done) return null;

  return (
    <>
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.8; }
          50%       { opacity: 1;   }
        }
        @keyframes sonar {
          0%   { transform: scale(1);   opacity: 0.65; }
          100% { transform: scale(2.7); opacity: 0;    }
        }
        @keyframes spinArc {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinArcRev {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes scanLine {
          0%   { top: 10%;  opacity: 0;   }
          5%   { opacity: 0.55; }
          95%  { opacity: 0.55; }
          100% { top: 90%;  opacity: 0;   }
        }
      `}</style>

      <div
        ref={wrapRef}
        className="fixed inset-0 overflow-hidden"
        style={{ background: '#0a0a0a', zIndex: 9999 }}
      >
        {/* Base grid — hidden for trial */}
        <div ref={gridRef} className="pointer-events-none absolute inset-0" style={{ display: 'none' }} />

        {/* Revealed grid — electric yellow, clip-path expands left→right behind scanline */}
        <div
          ref={gridRevealRef}
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(254,206,0,0.32) 1px, transparent 1px),
              linear-gradient(90deg, rgba(254,206,0,0.32) 1px, transparent 1px)
            `,
            backgroundSize: '110px 110px',
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
          }}
        />

        {/* Vertical scanline — glowing yellow line sweeping left→right */}
        <div
          ref={scanlineRef}
          className="pointer-events-none absolute top-0 bottom-0"
          style={{
            left: '0%',
            width: '3px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(254,206,0,0.9) 20%, rgba(254,206,0,0.9) 80%, transparent 100%)',
            filter: 'blur(2px)',
            boxShadow: '0 0 18px 6px rgba(254,206,0,0.4), 0 0 4px 1px rgba(254,206,0,0.9)',
            opacity: 0,
          }}
        />


        {/* Mouse spotlight */}
        <div ref={spotlightRef} className="pointer-events-none absolute inset-0" />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(254,206,0,0.07) 0%, transparent 70%)' }}
        />

        {/* ── Centre stack ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-16 lg:pb-20">

          {/* Value pills — desktop only, too cramped on mobile */}
          <div
            ref={pillsRef}
            className="pointer-events-none absolute hidden lg:block"
            style={{ width: 'clamp(300px, 88vw, 660px)', height: 'clamp(260px, 72vw, 460px)' }}
          >
            {VALUE_PILLS.map((p) => (
              <div
                key={p.label}
                data-pill
                style={{
                  position: 'absolute',
                  ...p.pos,
                  background: 'rgba(254,206,0,0.08)',
                  border: '1px solid rgba(254,206,0,0.3)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(254,206,0,0.5)' }}
                >
                  {p.label}
                </span>
                <span
                  className="ml-2 font-display font-black text-white"
                  style={{ fontSize: '13px', letterSpacing: '-0.02em' }}
                >
                  {p.value}
                </span>
              </div>
            ))}
          </div>

          {/* Animation container */}
          <div
            ref={orbitRef}
            style={{ position: 'relative', width: 'clamp(200px, 58vw, 320px)', height: 'clamp(200px, 58vw, 320px)' }}
          >
            {/* Sonar pulses */}
            {[0, 0.7, 1.4].map((delay, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: '50px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(254,206,0,0.55)',
                  animation: `sonar 2.1s ease-out ${delay}s infinite`,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Outer spinning dashed arc */}
            <div style={{ position: 'absolute', inset: '20px', animation: 'spinArc 3s linear infinite', pointerEvents: 'none' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="48" fill="none"
                  stroke="rgba(254,206,0,0.5)" strokeWidth="1.5"
                  strokeDasharray="18 8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Inner spinning dashed arc — reverse */}
            <div style={{ position: 'absolute', inset: '44px', animation: 'spinArcRev 2s linear infinite', pointerEvents: 'none' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="48" fill="none"
                  stroke="rgba(254,206,0,0.28)" strokeWidth="1"
                  strokeDasharray="6 12" strokeLinecap="round" />
              </svg>
            </div>

            {/* Logo */}
            <div
              ref={logoRef}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', overflow: 'hidden',
              }}
            >
              {/* Scan line */}
              <div style={{
                position: 'absolute',
                left: '60px', right: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(254,206,0,0.7), transparent)',
                animation: 'scanLine 2.8s ease-in-out 1.2s infinite',
                pointerEvents: 'none',
                zIndex: 2,
              }} />
              <Image
                src="/logo.png"
                alt="OptiFinish"
                width={160}
                height={160}
                className="h-20 w-auto lg:h-32"
                style={{
                  filter: 'drop-shadow(0 0 28px rgba(254,206,0,0.55)) drop-shadow(0 4px 16px rgba(0,0,0,0.4))',
                  position: 'relative', zIndex: 1,
                }}
                priority
              />
            </div>
          </div>

          {/* Name + tagline */}
          <div ref={nameRef} className="mt-8 flex flex-col items-center gap-2">
            <span
              className="font-display font-black uppercase text-white"
              style={{ fontSize: 'clamp(1.8rem, 8vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 0.92 }}
            >
              OPTIFINISH
            </span>
            <div ref={tagRef}>
              <span className="font-mono text-yellow" style={{ fontSize: 'clamp(9px, 2.4vw, 11px)', letterSpacing: '0.22em' }}>
                Mimic once. Perfect every time.
              </span>
            </div>
          </div>
        </div>

        {/* Counter — bottom-left */}
        <div ref={counterRef} className="absolute bottom-8 left-6 flex items-baseline gap-1 lg:bottom-10 lg:left-12">
          <span
            className="font-display font-black text-white/90"
            style={{ fontSize: 'clamp(2.8rem, 12vw, 7rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
          >
            {String(count).padStart(3, '0')}
          </span>
          <span
            className="font-display font-black text-white/45"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            %
          </span>
        </div>

        {/* Bottom-right sys label */}
        <div className="absolute bottom-8 right-5 flex flex-col items-end gap-1 lg:bottom-12 lg:right-12">
          <div ref={readyRef} style={{ opacity: 0 }}>
            <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(254,206,0,0.75)' }}>
              SYSTEM READY
            </span>
          </div>
          <span className="font-mono uppercase text-white/20" style={{ fontSize: '9px', letterSpacing: '0.22em' }}>
            Z-TAP · SYSTEM INIT
          </span>
        </div>

        {/* Exit circle */}
        <div
          ref={circleRef}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '80px', height: '80px',
            marginTop: '-40px', marginLeft: '-40px',
            borderRadius: '50%', background: '#FECE00',
            transform: 'scale(0)',
            transformOrigin: 'center center',
          }}
        />
      </div>
    </>
  );
}
