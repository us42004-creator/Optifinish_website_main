'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function InteractiveCursor() {
  const [active, setActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    document.body.classList.add('cursor-none');

    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.24, ease: 'power3.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.24, ease: 'power3.out' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const cursorScale = gsap.quickTo(cursor, 'scale', { duration: 0.35, ease: 'power3.out' });
    const dotScale = gsap.quickTo(dot, 'scale', { duration: 0.25, ease: 'power3.out' });

    const handleMove = (event: MouseEvent) => {
      cursorX(event.clientX);
      cursorY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
      setActive(true);
    };

    const handleLeaveWindow = () => setActive(false);

    const selector = [
      '[data-magnetic]',
      'a',
      'button',
      'img',
      'h1',
      'h2',
      'h3',
      'p',
      '.section-frame',
      '.panel-shell',
      '.cursor-magnetic',
    ].join(',');

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const cleanups: Array<() => void> = [];

    targets.forEach((target) => {
      const moveX = gsap.quickTo(target, 'x', { duration: 0.7, ease: 'power3.out' });
      const moveY = gsap.quickTo(target, 'y', { duration: 0.7, ease: 'power3.out' });
      const scale = gsap.quickTo(target, 'scale', { duration: 0.6, ease: 'power3.out' });

      const onMove = (event: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        moveX(offsetX * 0.05);
        moveY(offsetY * 0.08);
        scale(1.02);
      };

      const onEnter = () => {
        cursorScale(1.35);
        dotScale(0.85);
      };

      const onLeave = () => {
        moveX(0);
        moveY(0);
        scale(1);
        cursorScale(1);
        dotScale(1);
      };

      target.addEventListener('mousemove', onMove);
      target.addEventListener('mouseenter', onEnter);
      target.addEventListener('mouseleave', onLeave);

      cleanups.push(() => target.removeEventListener('mousemove', onMove));
      cleanups.push(() => target.removeEventListener('mouseenter', onEnter));
      cleanups.push(() => target.removeEventListener('mouseleave', onLeave));
    });

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeaveWindow);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeaveWindow);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[90] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/28 bg-white/18 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-[3px] transition-opacity duration-300 md:block ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-[6px] rounded-full border border-yellow/90" />
      </div>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[91] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow transition-opacity duration-300 md:block ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
