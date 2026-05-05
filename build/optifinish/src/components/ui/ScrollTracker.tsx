'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/**
 * Sets --sy on <html> on every scroll tick.
 * Consumed by .grid-drift to create the Z-TAP-style parallax grid effect on light sections.
 *
 * Also calls ScrollTrigger.refresh() after fonts + layout settle on mobile,
 * so all ScrollTrigger start/end positions are calculated against the real viewport.
 */
export default function ScrollTracker() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--sy', String(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // set initial value
    onScroll();

    // Recalculate all ScrollTrigger positions after fonts and layout settle.
    // Critical on mobile: dev bundles hydrate slowly and layout shifts can
    // misplace trigger start/end points if measured too early.
    gsap.registerPlugin(ScrollTrigger);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  return null;
}
