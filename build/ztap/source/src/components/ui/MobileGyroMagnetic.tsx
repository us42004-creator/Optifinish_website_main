'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Mobile analogue of InteractiveCursor's magnetic effect.
 * Uses device gyroscope (deviceorientation) to apply subtle parallax
 * translations to the same element selectors as the desktop magnetic system.
 * Only activates on touch/coarse-pointer devices.
 */
export default function MobileGyroMagnetic() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    const SELECTOR = [
      '[data-magnetic]',
      'h1',
      'h2',
      'h3',
      '.section-frame',
      '.panel-shell',
      '.cursor-magnetic',
    ].join(',');

    let baseGamma: number | null = null;
    let baseBeta: number | null = null;

    // Cache quickTo movers per element — same pattern as desktop InteractiveCursor
    type Movers = {
      x: ReturnType<typeof gsap.quickTo>;
      y: ReturnType<typeof gsap.quickTo>;
    };
    const cache = new WeakMap<HTMLElement, Movers>();

    const getMovers = (el: HTMLElement): Movers => {
      if (!cache.has(el)) {
        cache.set(el, {
          x: gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' }),
        });
      }
      return cache.get(el)!;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;   // left/right tilt −90 → 90
      const beta  = e.beta  ?? 45;  // forward/back tilt 0 → 180

      // Calibrate baseline on first event
      if (baseGamma === null || baseBeta === null) {
        baseGamma = gamma;
        baseBeta  = beta;
        return;
      }

      const dx = Math.max(-22, Math.min(22, gamma - baseGamma));
      const dy = Math.max(-16, Math.min(16, beta  - baseBeta));

      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        // data-magnetic elements react twice as strongly (mirrors desktop)
        const strength = el.hasAttribute('data-magnetic') ? 0.34 : 0.16;
        const { x, y } = getMovers(el);
        x(dx * strength);
        y(dy * strength * 0.62);
      });
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return null;
}
