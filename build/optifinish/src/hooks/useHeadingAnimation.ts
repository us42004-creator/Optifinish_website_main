import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface HeadingAnimationRefs {
  trigger: RefObject<HTMLElement | null>;
  eyebrow?: RefObject<HTMLElement | null>;
  line1: RefObject<HTMLElement | null>;
  line2?: RefObject<HTMLElement | null>;
  body?: RefObject<HTMLElement | null>;
}

// Replicates Z-TAP scroll-triggered heading reveal:
// line1 slides in from left, line2 from right, eyebrow from left, body fades up
export function useHeadingAnimation(refs: HeadingAnimationRefs) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!refs.trigger.current || !refs.line1.current) return;

    const ctx = gsap.context(() => {
      const { eyebrow, line1, line2, body } = refs;

      // Only hide elements that are NOT already in the viewport.
      // If the section is already visible on load (e.g. refreshed mid-page),
      // skip the gsap.set() so content stays visible and animate from current state.
      const rect = refs.trigger.current!.getBoundingClientRect();
      const alreadyInView = rect.top < window.innerHeight * 0.92;

      if (!alreadyInView) {
        if (eyebrow?.current) gsap.set(eyebrow.current, { x: '-120%', opacity: 0 });
        gsap.set(line1.current!, { x: '-110%', opacity: 0 });
        if (line2?.current)  gsap.set(line2.current,  { x: '90%',   opacity: 0 });
        if (body?.current)   gsap.set(body.current,   { y: 20,      opacity: 0 });
      }

      // One-shot play (no scrub) — fires instantly when element scrolls into view.
      // scrub was removed: it tied animation to scroll position and kept content
      // invisible until the user had scrolled far enough — broken on mobile.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.trigger.current,
          start: 'top 90%',
          once: true,       // kill after first trigger, never reverses
        },
      });

      if (eyebrow?.current) {
        tl.to(eyebrow.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.55 }, 0);
      }
      tl.to(line1.current!, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.65 }, 0.06);
      if (line2?.current) {
        tl.to(line2.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.65 }, 0.14);
      }
      if (body?.current) {
        tl.to(body.current, { y: 0, opacity: 1, ease: 'power3.out', duration: 0.45 }, 0.22);
      }
    }, refs.trigger);

    return () => ctx.revert();
  }, []);
}
