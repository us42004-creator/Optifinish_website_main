'use client';

import { useEffect } from 'react';

/**
 * Sets --sy on <html> on every scroll tick.
 * Consumed by .grid-drift to create the Z-TAP-style parallax grid effect on light sections.
 */
export default function ScrollTracker() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--sy', String(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // set initial value
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
