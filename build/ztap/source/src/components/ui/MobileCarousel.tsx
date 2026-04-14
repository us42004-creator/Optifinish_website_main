'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

interface Props {
  children: ReactNode[];
  /** Width of each card as a vw fraction, e.g. 0.88 = 88vw. Default 0.88 */
  cardWidthVw?: number;
  /** Gap between cards in px. Default 16 */
  gap?: number;
  /** Dot active colour. Default yellow */
  dotColor?: string;
  /** Inactive dot colour. Default subtle black */
  inactiveDotColor?: string;
  className?: string;
  indicatorsInside?: boolean;
  indicatorTheme?: 'light' | 'dark';
}

export default function MobileCarousel({
  children,
  cardWidthVw = 0.88,
  gap = 16,
  dotColor = '#FECE00',
  inactiveDotColor = 'rgba(0,0,0,0.15)',
  className = '',
  indicatorsInside = true,
  indicatorTheme = 'light',
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = children.length;

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cardW = window.innerWidth * cardWidthVw;
    const step = cardW + gap;
    const maxX = 0;
    const minX = -(step * (count - 1));

    // Position cards
    const cards = Array.from(track.children) as HTMLElement[];
    cards.forEach((card, i) => {
      card.style.width = `${cardW}px`;
      card.style.flexShrink = '0';
    });

    // Snap positions (one per card)
    const snapPoints = cards.map((_, i) => -step * i);

    // Entrance animation
    gsap.fromTo(
      cards,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: 'power3.out', delay: 0.1 }
    );

    // Touch press feedback
    const addPressListeners = (card: HTMLElement) => {
      const onPress = () => gsap.to(card, { scale: 0.97, duration: 0.15, ease: 'power2.out' });
      const onRelease = () => gsap.to(card, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.55)' });
      card.addEventListener('touchstart', onPress, { passive: true });
      card.addEventListener('touchend', onRelease, { passive: true });
      card.addEventListener('touchcancel', onRelease, { passive: true });
      return () => {
        card.removeEventListener('touchstart', onPress);
        card.removeEventListener('touchend', onRelease);
        card.removeEventListener('touchcancel', onRelease);
      };
    };

    const cleanups = cards.map(addPressListeners);

    const getActiveIndex = () => {
      const x = gsap.getProperty(track, 'x') as number;
      const idx = Math.round(-x / step);
      return Math.max(0, Math.min(idx, count - 1));
    };

    const updateDots = () => setActiveIndex(getActiveIndex());

    const [draggable] = Draggable.create(track, {
      type: 'x',
      inertia: true,
      snap: snapPoints,
      bounds: { minX, maxX },
      edgeResistance: 0.85,
      onDrag: updateDots,
      onThrowUpdate: updateDots,
      onThrowComplete: updateDots,
    });

    return () => {
      cleanups.forEach((fn) => fn());
      draggable.kill();
    };
  }, [count, cardWidthVw, gap]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = window.innerWidth * cardWidthVw;
    const step = cardW + gap;
    gsap.to(track, { x: -step * i, duration: 0.5, ease: 'power3.out' });
    setActiveIndex(i);
  };

  const dockClassName =
    indicatorTheme === 'dark'
      ? 'border border-white/10 bg-black/58 shadow-[0_10px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]'
      : 'border border-black/[0.07] bg-[#f5f2ec]/88 shadow-[0_10px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.68)]';

  return (
    <div className={className}>
      {/* Viewport — clips horizontally, hides overflow */}
      <div ref={viewportRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${gap}px`, willChange: 'transform', touchAction: 'pan-y' }}
        >
          {children}
        </div>

        {count > 1 && indicatorsInside && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center px-5">
            <div className={`pointer-events-auto inline-flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-md ${dockClassName}`}>
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? '2rem' : '0.5rem',
                    background: i === activeIndex ? dotColor : inactiveDotColor,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {count > 1 && !indicatorsInside && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '2rem' : '0.5rem',
                background: i === activeIndex ? dotColor : inactiveDotColor,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
