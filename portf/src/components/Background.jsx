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

/* bg-grid-white/[0.03] — exact from radna */
const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

/* Ultra-faint fixed color washes so the dark bg reads richer without competing */
const Wash = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 700px at 12% 8%, rgba(251, 146, 60, 0.04), transparent 70%),
    radial-gradient(900px 700px at 88% 92%, rgba(251, 191, 36, 0.04), transparent 70%);
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

const Background = memo(() => (
  <Wrap>
    <Grid />
    <Wash />
    <Vignette />
  </Wrap>
));

Background.displayName = 'Background';
export default Background;
