// Background — exact match to radnaabazar.com
// #0f0e1a base + bg-grid-white/[0.03] + radial vignette mask
import { memo } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #0f0e1a;
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

/* mask-image: radial-gradient(ellipse at center, transparent 20%, black) — exact from radna */
const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: #0f0e1a;
  pointer-events: none;
  mask-image: radial-gradient(ellipse at center, transparent 20%, black);
  -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
`;

const Background = memo(() => (
  <Wrap>
    <Grid />
    <Vignette />
  </Wrap>
));

Background.displayName = 'Background';
export default Background;
