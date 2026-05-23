'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SELECTOR = 'a, button, [data-magnetic], .cursor-magnetic, h1, h2, h3, h4, li, .panel-button, .tech-kicker, .card-accent-label, img';

function findTarget(el: Element | null): HTMLElement | null {
  while (el && el !== document.body) {
    if ((el as HTMLElement).matches?.(SELECTOR)) return el as HTMLElement;
    el = el.parentElement;
  }
  return null;
}

export default function InteractiveCursor() {
  const [active, setActive]         = useState(false);
  const [mounted, setMounted]       = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't render on touch / coarse-pointer devices (phones, tablets)
    if (!window.matchMedia('(pointer:fine)').matches) return;
    setMounted(true);
    const cursor = cursorRef.current;
    const dot    = dotRef.current;
    if (!cursor || !dot) return;

    document.body.classList.add('cursor-none');

    const cursorX     = gsap.quickTo(cursor, 'x',     { duration: 0.24, ease: 'power3.out' });
    const cursorY     = gsap.quickTo(cursor, 'y',     { duration: 0.24, ease: 'power3.out' });
    const dotX        = gsap.quickTo(dot,    'x',     { duration: 0.12, ease: 'power3.out' });
    const dotY        = gsap.quickTo(dot,    'y',     { duration: 0.12, ease: 'power3.out' });
    const cursorScale = gsap.quickTo(cursor, 'scale', { duration: 0.35, ease: 'power3.out' });
    const dotScale    = gsap.quickTo(dot,    'scale', { duration: 0.25, ease: 'power3.out' });

    // Per-target quickTo setters — created on demand, reused while hovering same element
    let currentTarget: HTMLElement | null = null;
    let elMoveX: ((v: number) => void) | null = null;
    let elMoveY: ((v: number) => void) | null = null;
    let elScale: ((v: number) => void) | null = null;

    const resetCurrent = () => {
      if (currentTarget && elMoveX && elMoveY && elScale) {
        elMoveX(0); elMoveY(0); elScale(1);
      }
      currentTarget = null; elMoveX = null; elMoveY = null; elScale = null;
      cursorScale(1); dotScale(1);
    };

    const handleMove = (e: MouseEvent) => {
      cursorX(e.clientX); cursorY(e.clientY);
      dotX(e.clientX);    dotY(e.clientY);
      setActive(true);

      const target = findTarget(e.target as Element);

      if (target !== currentTarget) {
        resetCurrent();
        currentTarget = target;
        if (target) {
          elMoveX = gsap.quickTo(target, 'x',     { duration: 0.7, ease: 'power3.out' });
          elMoveY = gsap.quickTo(target, 'y',     { duration: 0.7, ease: 'power3.out' });
          elScale = gsap.quickTo(target, 'scale', { duration: 0.6, ease: 'power3.out' });
          cursorScale(1.35); dotScale(0.85);
        }
      }

      if (target && elMoveX && elMoveY && elScale) {
        const r = target.getBoundingClientRect();
        elMoveX((e.clientX - (r.left + r.width  / 2)) * 0.05);
        elMoveY((e.clientY - (r.top  + r.height / 2)) * 0.08);
        elScale(1.02);
      }
    };

    const handleLeave = () => { resetCurrent(); setActive(false); };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout',  handleLeave);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout',  handleLeave);
    };
  }, []);

  // Only render DOM on fine-pointer (mouse) devices — avoids any cursor flash on mobile
  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        data-cursor
        className={`pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/28 bg-white/18 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-[3px] transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-[6px] rounded-full border border-[#FECE00]/90" />
      </div>
      <div
        ref={dotRef}
        data-cursor
        className={`pointer-events-none fixed left-0 top-0 z-[91] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FECE00] transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
