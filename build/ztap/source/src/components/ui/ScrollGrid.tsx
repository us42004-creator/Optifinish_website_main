'use client';

import { useEffect, useRef } from 'react';

/*
  Performance notes:
  - We animate `transform: translate3d` — GPU composited, zero paint cost.
  - backgroundPosition animation (old approach) triggers paint every frame — removed.
  - passive scroll listener never blocks the scroll thread.
  - rAF batching prevents double-firing per frame.
  - will-change: transform promotes each layer to its own compositor layer.
*/

export default function ScrollGrid() {
  const fineRef   = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | null = null;

    const onScroll = () => {
      if (raf) return; // already scheduled
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (fineRef.current)   fineRef.current.style.transform   = `translate3d(0, ${y * 0.12}px, 0)`;
        if (accentRef.current) accentRef.current.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
        raf = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Fine grid — warm yellow-grey */}
      <div
        ref={fineRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
          zIndex: 0,
          willChange: 'transform',
        }}
      />
      {/* Yellow accent grid — every 3rd cell */}
      <div
        ref={accentRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254,206,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254,206,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '264px 264px',
          zIndex: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
