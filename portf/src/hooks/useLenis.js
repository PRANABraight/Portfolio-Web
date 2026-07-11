import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

export let lenisInstance = null;

/* Smooth-scroll to a section id through Lenis (falls back to native). */
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el);
  else el.scrollIntoView({ behavior: 'smooth' });
};

export const scrollToTop = (immediate = false) => {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
};

export default function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ lerp: 0.1 });
    lenisInstance = lenis;
    // Native smooth scroll-behavior fights Lenis' programmatic scrolling.
    document.documentElement.classList.add('lenis-active');

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove('lenis-active');
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}
