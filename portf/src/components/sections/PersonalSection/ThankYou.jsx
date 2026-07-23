import styled, { keyframes } from 'styled-components';
import { colors } from '../../../styles/theme';

const beamFall = keyframes`
  0%   { transform: translateY(-200px); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(1800px); opacity: 0; }
`;

const ThankWrap = styled.div`
  width: 100%;
  margin-top: 5rem;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(to bottom, ${colors.bg}, #141414);
`;

const Beam = styled.div`
  position: absolute;
  left: ${p => p.$x}%;
  top: 5rem;
  width: 1px;
  height: 56px;
  border-radius: 9999px;
  background: ${p => p.$alt
    ? 'linear-gradient(to bottom, var(--accent-2), rgba(var(--accent-2-rgb), 0.5), transparent)'
    : 'linear-gradient(to bottom, var(--accent), rgba(var(--accent-rgb), 0.5), transparent)'};
  animation: ${beamFall} ${p => p.$dur}s linear infinite;
  animation-delay: ${p => p.$delay}s;
  opacity: 0;
`;

const ThankContent = styled.div`
  position: relative;
  z-index: 20;
  text-align: center;
  padding: 4rem 2rem;
`;

const ThankTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
`;

const ThankYouGradient = styled.div`
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: 700;
  background: linear-gradient(to right, var(--accent), var(--accent-soft), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.025em;
`;

const BEAMS = [
  { x: 5,  dur: 7,  delay: 2  },
  { x: 20, dur: 3,  delay: 4  },
  { x: 35, dur: 7,  delay: 0  },
  { x: 50, dur: 5,  delay: 4  },
  { x: 65, dur: 11, delay: 2  },
  { x: 80, dur: 4,  delay: 0  },
  { x: 95, dur: 6,  delay: 2  },
];

const ThankYou = () => (
  <ThankWrap>
    {BEAMS.map((b, i) => (
      <Beam key={i} $x={b.x} $dur={b.dur} $delay={b.delay} $alt={i % 2 === 1} />
    ))}
    <ThankContent>
      <ThankTitle>For visiting my profile</ThankTitle>
      <ThankYouGradient>Thank you.</ThankYouGradient>
    </ThankContent>
  </ThankWrap>
);

export default ThankYou;
