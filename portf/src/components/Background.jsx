// Background — exact match to radnaabazar.com
// #14100d base + bg-grid-white/[0.03] + radial vignette mask
import { memo } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #14100d;
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

/* Ultra-faint fixed color washes so the dark bg reads richer without competing */
const Wash = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 700px at 12% 8%, rgba(251, 146, 60, 0.03), transparent 70%),
    radial-gradient(900px 700px at 88% 92%, rgba(251, 191, 36, 0.03), transparent 70%);
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

/* mask-image: radial-gradient(ellipse at center, transparent 20%, black) — exact from radna */
const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: #14100d;
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
    <Wash />
    <AccentWash />
    <Vignette />
    <Grain />
  </Wrap>
));

Background.displayName = 'Background';
export default Background;
