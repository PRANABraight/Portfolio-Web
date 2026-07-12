// Background — neutral charcoal base + grid + aurora ribbons + vignette + grain.
// A faint gold ribbon drifts through the upper sky, a warm-white one through
// the lower depths — animated light, single accent, nothing loud.
import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #0e0e10;
  overflow: hidden;
`;

/* bg-grid-white — fades toward the edges so it cooperates with the vignette */
const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 85% 75% at 50% 42%, black 35%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 42%, black 35%, transparent 100%);
`;

/* Aurora ribbons — oversized skewed bands, blurred into soft light, drifting on
   transform-only keyframes (GPU-cheap). Counter-phased durations so the two
   never sync. The global reduced-motion rule in index.css freezes them; the 0%
   pose is composed to read as static washes. */
const warmDrift = keyframes`
  0%   { transform: translate3d(-12%, -4%, 0) rotate(-14deg) scaleY(1); }
  50%  { transform: translate3d(10%, 3%, 0) rotate(-11deg) scaleY(1.15); }
  100% { transform: translate3d(-12%, -4%, 0) rotate(-14deg) scaleY(1); }
`;
const coolDrift = keyframes`
  0%   { transform: translate3d(10%, 4%, 0) rotate(12deg) scaleY(1.1); }
  50%  { transform: translate3d(-12%, -3%, 0) rotate(15deg) scaleY(1); }
  100% { transform: translate3d(10%, 4%, 0) rotate(12deg) scaleY(1.1); }
`;

const Ribbon = styled.div`
  position: absolute;
  left: -25%;
  width: 150%;
  height: 42%;
  filter: blur(90px);
  will-change: transform;
  pointer-events: none;
`;

/* Gold — upper sky */
const WarmRibbon = styled(Ribbon)`
  top: -6%;
  background: linear-gradient(
    100deg,
    transparent 22%,
    rgba(251, 191, 36, 0.06) 42%,
    rgba(253, 230, 138, 0.04) 58%,
    transparent 78%
  );
  animation: ${warmDrift} 60s ease-in-out infinite;
`;

/* Warm white — lower depths */
const CoolRibbon = styled(Ribbon)`
  bottom: -8%;
  background: linear-gradient(
    80deg,
    transparent 22%,
    rgba(255, 255, 255, 0.035) 44%,
    rgba(253, 230, 138, 0.02) 60%,
    transparent 78%
  );
  animation: ${coolDrift} 75s ease-in-out infinite;
`;

/* Ambient light behind the content column, tinted by the section in view.
   --site-accent is a registered <color> property transitioned on <html>,
   so the hue glides as the user scrolls between sections. Zero JS. */
const AccentWash = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    1100px 780px at 50% 18%,
    color-mix(in srgb, var(--site-accent) 6.5%, transparent),
    transparent 70%
  );
`;

/* mask-image: radial-gradient(ellipse at center, transparent 20%, black) */
const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: #0e0e10;
  pointer-events: none;
  mask-image: radial-gradient(ellipse at center, transparent 20%, black);
  -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
`;

/* Static film grain kills banding on the soft gradients and adds texture */
const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${NOISE};
  background-size: 180px 180px;
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
`;

const Background = memo(() => (
  <Wrap>
    <Grid />
    <WarmRibbon />
    <CoolRibbon />
    <AccentWash />
    <Vignette />
    <Grain />
  </Wrap>
));

Background.displayName = 'Background';
export default Background;
