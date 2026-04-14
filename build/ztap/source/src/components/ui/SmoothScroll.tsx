'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersNativeScroll =
      window.matchMedia('(max-width: 1023px)').matches ||
      !window.matchMedia('(pointer:fine)').matches;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Grid diagonal parallax — update --sy on every scroll tick
    const updateSy = () => {
      document.documentElement.style.setProperty('--sy', String(window.scrollY));
    };
    window.addEventListener('scroll', updateSy, { passive: true });

    if (prefersNativeScroll) {
      // ignoreMobileResize prevents Android Chrome's address-bar resize from
      // breaking ScrollTrigger calculations mid-scroll
      ScrollTrigger.config({ ignoreMobileResize: true });
      // Delay refresh until after first paint so all Hero refs are mounted
      requestAnimationFrame(() => {
        setTimeout(() => ScrollTrigger.refresh(), 350);
      });
      return () => window.removeEventListener('scroll', updateSy);
    }

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis through GSAP's ticker so they share the same frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', updateSy);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
