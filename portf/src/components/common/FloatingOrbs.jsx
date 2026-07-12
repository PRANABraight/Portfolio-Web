import { useRef } from 'react';
import styled from 'styled-components';
import { gsap, useGSAP, OK } from '../../lib/motion';

const Layer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

// Pre-softened radial gradient — much cheaper than CSS blur() on large nodes.
const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(${(p) => p.$rgb ?? 'var(--accent-rgb)'}, ${(p) => p.$alpha}) 0%,
    transparent 65%
  );
  will-change: transform;
`;

/* Deterministic per-orb placement/motion presets (index-varied, no randomness). */
const PRESETS = [
  { size: 420, top: '-8%',  left: '-6%',  x: 40,  y: 55,  dur: 13 },
  { size: 300, top: '55%',  left: '78%',  x: -50, y: 40,  dur: 16 },
  { size: 220, top: '20%',  left: '62%',  x: 35,  y: -45, dur: 11 },
  { size: 340, top: '70%',  left: '8%',   x: 55,  y: -35, dur: 15 },
  { size: 180, top: '5%',   left: '38%',  x: -30, y: 50,  dur: 10 },
];

/**
 * Ambient floating accent orbs. Drop inside a `position: relative` section.
 * - count: 3–5 orbs
 * - rgbs: optional array of "r, g, b" strings per orb (defaults to section --accent-rgb);
 *   pass e.g. [null, '249, 115, 22'] to tint only the second orb.
 */
export default function FloatingOrbs({ count = 3, rgbs = [], alpha = 0.10 }) {
  const ref = useRef(null);
  const orbs = PRESETS.slice(0, Math.min(count, PRESETS.length));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(OK, () => {
        gsap.utils.toArray(ref.current.children).forEach((el, i) => {
          const p = PRESETS[i];
          gsap.to(el, {
            x: p.x,
            y: p.y,
            duration: p.dur,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
        // Gentle shared parallax against scroll
        gsap.to(ref.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Layer ref={ref} aria-hidden="true">
      {orbs.map((p, i) => (
        <Orb
          key={i}
          $rgb={rgbs[i] ?? undefined}
          $alpha={alpha}
          style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
        />
      ))}
    </Layer>
  );
}
