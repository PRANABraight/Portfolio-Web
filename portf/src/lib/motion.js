// Central GSAP setup + shared scroll-motion helpers.
// All initial "hidden" states are set from JS only — never in CSS — so the
// page stays fully visible without JS or with reduced motion enabled.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };

export const OK = '(prefers-reduced-motion: no-preference)';
export const REDUCED = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED).matches;

/* Quiet fade-up reveal, fired once when the trigger enters. */
export const revealUp = (targets, { trigger, stagger = 0, start = 'top 80%' } = {}) =>
  gsap.from(targets, {
    y: 24,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger,
    scrollTrigger: { trigger: trigger ?? targets, start, once: true },
  });

/* Staggered reveal for card grids — items animate as they enter, per batch. */
export const batchReveal = (selector, scopeEl, { stagger = 0.08 } = {}) => {
  const items = scopeEl
    ? scopeEl.querySelectorAll(selector)
    : document.querySelectorAll(selector);
  if (!items.length) return;
  gsap.set(items, { y: 24, autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger,
        overwrite: true,
      }),
  });
};

/* Number count-up written into el.textContent. Caller handles reduced motion
   (matchMedia REDUCED branch should write the final value directly). */
export const countUp = (el, end, { suffix = '', trigger, start = 'top 75%', delay = 0 } = {}) => {
  const proxy = { val: 0 };
  return gsap.to(proxy, {
    val: end,
    duration: 1.4,
    delay,
    ease: 'power2.out',
    scrollTrigger: { trigger: trigger ?? el, start, once: true },
    onUpdate: () => {
      el.textContent = `${Math.floor(proxy.val)}${suffix}`;
    },
  });
};
