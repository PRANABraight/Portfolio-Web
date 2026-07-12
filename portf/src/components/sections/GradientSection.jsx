// Animated gradient blobs — matches radnaabazar.com component 48761
import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap, useGSAP, OK } from '../../lib/motion';

const moveFirst = keyframes`
  0%   { transform: translate(-50%, -50%) scale(1); }
  50%  { transform: translate(-60%, -40%) scale(1.1); }
  100% { transform: translate(-50%, -50%) scale(1); }
`;
const moveSecond = keyframes`
  0%   { transform: translate(-50%, -50%) scale(0.9); }
  33%  { transform: translate(-35%, -60%) scale(1.1); }
  66%  { transform: translate(-65%, -40%) scale(0.95); }
  100% { transform: translate(-50%, -50%) scale(0.9); }
`;
const moveThird = keyframes`
  0%   { transform: translate(-50%, -50%) scale(1.05); }
  40%  { transform: translate(-60%, -60%) scale(0.9); }
  80%  { transform: translate(-40%, -45%) scale(1.1); }
  100% { transform: translate(-50%, -50%) scale(1.05); }
`;
const moveFourth = keyframes`
  0%   { transform: translate(-50%, -50%) scale(0.95); }
  50%  { transform: translate(-40%, -55%) scale(1.05); }
  100% { transform: translate(-50%, -50%) scale(0.95); }
`;
const moveFifth = keyframes`
  0%   { transform: translate(-130%, -80%); }
  50%  { transform: translate(-100%, -90%); }
  100% { transform: translate(-130%, -80%); }
`;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: linear-gradient(40deg, #1c1512, #14100d);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GradientsContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: url(#blurMe) blur(40px);
`;

const BlobBase = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  top: calc(50% - 40%);
  left: calc(50% - 40%);
  border-radius: 50%;
  mix-blend-mode: soft-light;
`;

const Blob1 = styled(BlobBase)`
  background: radial-gradient(circle at center, rgba(251,146,60,0.55) 0%, rgba(251,146,60,0) 50%);
  animation: ${moveFirst} 8s ease infinite;
`;
const Blob2 = styled(BlobBase)`
  background: radial-gradient(circle at center, rgba(251,191,36,0.45) 0%, rgba(251,191,36,0) 50%);
  animation: ${moveSecond} 10s ease infinite;
  transform-origin: calc(50% - 400px);
`;
const Blob3 = styled(BlobBase)`
  background: radial-gradient(circle at center, rgba(196,181,253,0.4) 0%, rgba(196,181,253,0) 50%);
  animation: ${moveThird} 12s ease infinite;
  transform-origin: calc(50% + 400px);
`;
const Blob4 = styled(BlobBase)`
  background: radial-gradient(circle at center, rgba(251,191,36,0.55) 0%, rgba(251,191,36,0) 50%);
  animation: ${moveFourth} 9s ease infinite;
  opacity: 0.7;
`;
const Blob5 = styled(BlobBase)`
  background: radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%);
  animation: ${moveFifth} 11s ease infinite;
`;

const CenterText = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: rgba(255,255,255,0.9);
  padding: 2rem 1.25rem;
`;

const GradientSection = () => {
  const scope = useRef(null);

  // Gentle depth: blobs drift against scroll direction while the band passes
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => {
      gsap.fromTo('.blob-layer',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  }, { scope });

  return (
  <div ref={scope} style={{ position: 'relative', overflow: 'hidden' }}>
    <Wrap>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <GradientsContainer className="blob-layer">
        <Blob1 /><Blob2 /><Blob3 /><Blob4 /><Blob5 />
      </GradientsContainer>

      <CenterText>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
          Building scalable, data-driven systems
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.625 }}>
          Pragmatic, delivery-oriented Data &amp; ML Engineer — turning raw data into actionable insights
        </p>
      </CenterText>
    </Wrap>
  </div>
  );
};

export default GradientSection;
