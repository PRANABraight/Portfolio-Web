// Bento-grid approach cards — matches radnaabazar.com's card style exactly
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { FaPython, FaDatabase, FaBrain, FaGithub } from 'react-icons/fa';
import { SiScikitlearn, SiPandas } from 'react-icons/si';
import { gsap, useGSAP, OK, batchReveal } from '../../lib/motion';
import { accentVars } from '../../styles/theme';
import { premiumCard } from '../../styles/mixins';
import SectionTitle from '../common/SectionTitle';

/* ── Card base — exact match ── */
const Card = styled.div`
  ${premiumCard};
  border-radius: 16px;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  position: relative;
  z-index: 20;
`;

const CardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #e7e5e4;
  letter-spacing: 0.025em;
  margin-top: 1rem;
  padding: 0 1rem;
`;

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: #a8a29e;
  letter-spacing: 0.025em;
  line-height: 1.625;
  margin-top: 2rem;
  padding: 0 1rem;
`;

/* ── Moving border (green dot travels the border) ── */
const MovingBorderWrap = styled.div`
  position: relative;
  background: transparent;
  text-align: initial;
  border-radius: 1.75rem;
  overflow: visible;
  padding: 1px;
`;

const MovingBorderInner = styled.div`
  position: relative;
  background: var(--surface-1);
  border: 1px solid rgba(30, 30, 40, 0.8);
  backdrop-filter: blur(16px);
  border-radius: calc(1.75rem * 0.96);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 0.875rem;
`;

const MovingDot = ({ duration = 2000, rx = '30%', ry = '30%', color = '#fbbf24' }) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pct = (time % duration) / duration;
      progress.set(pct * length);
    }
  });

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x ?? 0);
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y ?? 0);

  return (
    <>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
      >
        <rect ref={pathRef} width="100%" height="100%" rx={rx} ry={ry} />
      </svg>
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, display: 'inline-block',
          x: useTransform(x, (v) => `calc(${v}px - 50%)`),
          y: useTransform(y, (v) => `calc(${v}px - 50%)`),
        }}
      >
        <div style={{
          height: 20, width: 20, borderRadius: '50%', opacity: 0.8,
          background: `radial-gradient(${color} 40%, transparent 60%)`,
        }} />
      </motion.div>
    </>
  );
};

const MovingBorderCard = ({ children, duration = 3000, dotColor, className }) => (
  <MovingBorderWrap>
    <div style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden' }}>
      <MovingDot duration={duration} color={dotColor} />
    </div>
    <MovingBorderInner style={{ borderRadius: 17 }}>
      {children}
    </MovingBorderInner>
  </MovingBorderWrap>
);

/* ── Hover background slide-in (emerald) ── */
const HoverCard = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: 'relative', padding: '0.5rem', height: '100%', width: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <motion.span
          style={{
            position: 'absolute', inset: 0, height: '100%', width: '100%',
            background: 'rgba(124, 45, 18, 0.8)', display: 'block', borderRadius: 24,
          }}
          layoutId="hoverBg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
        />
      )}
      {children}
    </div>
  );
};

/* ── Tech orbit ── */
const TECHS = [
  { icon: <FaPython />,     color: '#3776AB', label: 'Python' },
  { icon: <FaDatabase />,   color: '#4479A1', label: 'SQL' },
  { icon: <SiScikitlearn />,color: '#F7931E', label: 'Sklearn' },
  { icon: <SiPandas />,     color: '#150458', label: 'Pandas' },
  { icon: <FaBrain />,      color: '#fbbf24', label: 'ML/AI' },
];

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  margin-top: 0.5rem;
`;

const TechChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  background: rgba(var(--accent-rgb), 0.05);
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
`;

/* ── Grid layout ── */
const SectionWrap = styled.section`
  ${accentVars('approach')}
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }
  @media (min-width: 1280px) { grid-template-columns: repeat(3, 1fr); }
`;

const CardWrap = styled(motion.div)`
  position: relative;
  cursor: default;
`;

/* Cycling dot colors for the moving-border cards */
const DOT_COLORS = ['#fbbf24', 'rgba(255,255,255,0.7)', '#fde68a'];

const cardHover = {
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

const ApproachSection = () => {
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => batchReveal('.approach-card', scope.current));
  }, { scope });

  return (
  <SectionWrap id="approach" ref={scope}>
    <SectionTitle eyebrow="// approach" mb="0">
      My <span>Approach</span>
    </SectionTitle>

    <BentoGrid style={{ marginTop: '3rem' }}>
      {/* Card 1: primary stack */}
      <CardWrap className="approach-card" {...cardHover}>
        <MovingBorderCard duration={2800} dotColor={DOT_COLORS[0]} style={{ height: '100%' }}>
          <div style={{ padding: '1.5rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>My primary tech stack</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Python · SQL</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgb(120,113,108)', lineHeight: 1.625 }}>Building end-to-end data pipelines, ML models, and analytical systems with the Python data science ecosystem.</p>
            <TechGrid>
              {TECHS.map(t => (
                <TechChip key={t.label}>
                  <span style={{ color: t.color, fontSize: '0.875rem' }}>{t.icon}</span>
                  {t.label}
                </TechChip>
              ))}
            </TechGrid>
          </div>
        </MovingBorderCard>
      </CardWrap>

      {/* Card 2: approach */}
      <CardWrap className="approach-card" {...cardHover}>
        <HoverCard>
          <Card>
            <CardTitle>Software Architect mindset</CardTitle>
            <CardDesc>
              I design systems with scalability and observability first. Whether it's a credit risk API or a real-time CV pipeline — clean architecture matters.
            </CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>

      {/* Card 3: inside scoop */}
      <CardWrap className="approach-card" {...cardHover}>
        <HoverCard>
          <Card>
            <div style={{ padding: '0 1rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>The Inside Scoop</div>
            <CardTitle>Finishing MCA, exploring what's next</CardTitle>
            <CardDesc>Completing my Master of Computer Applications at Christ University, Bengaluru. Actively looking for Data Engineering and ML Engineering roles.</CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>

      {/* Card 4: global / language */}
      <CardWrap className="approach-card" {...cardHover}>
        <HoverCard>
          <Card>
            <CardTitle>Fluent in English and Hindi. Based in Bengaluru, India 🇮🇳</CardTitle>
            <CardDesc>Open to remote opportunities globally. Comfortable working across time zones and with distributed international teams.</CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>

      {/* Card 5: collaborate */}
      <CardWrap className="approach-card" {...cardHover}>
        <MovingBorderCard duration={3600} dotColor={DOT_COLORS[1]}>
          <div style={{ padding: '1.5rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgb(120,113,108)', letterSpacing: '0.08em', marginBottom: '1rem' }}>Do you want to work together?</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em' }}>Let's build something impactful.</h3>
            <a
              href="mailto:pranabrai137@gmail.com"
              style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--accent)', fontSize: '0.875rem', textDecoration: 'none' }}
            >
              pranabrai137@gmail.com ↗
            </a>
          </div>
        </MovingBorderCard>
      </CardWrap>

      {/* Card 6: github */}
      <CardWrap className="approach-card" {...cardHover}>
        <HoverCard>
          <Card>
            <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaGithub style={{ color: 'var(--accent)' }} /> github.com/PRANABraight
            </CardTitle>
            <CardDesc>Open source projects in data science, ML, and full-stack development. Check out Credit Risk Analytics, Falcon 9 ML, and more.</CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>
    </BentoGrid>
  </SectionWrap>
  );
};

export default ApproachSection;
