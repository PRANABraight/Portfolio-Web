// Bento-grid approach cards — matches radnaabazar.com's card style exactly
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { FaPython, FaDatabase, FaBrain, FaGithub } from 'react-icons/fa';
import { SiScikitlearn, SiPandas } from 'react-icons/si';

/* ── Card base — exact match ── */
const Card = styled.div`
  border-radius: 16px;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  background: rgb(22, 22, 29);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 20;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(0, 255, 153, 0.6); }
`;

const CardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #e4e4e7;
  letter-spacing: 0.025em;
  margin-top: 1rem;
  padding: 0 1rem;
`;

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: #a1a1aa;
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
  background: rgb(22, 22, 29);
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

const MovingDot = ({ duration = 2000, rx = '30%', ry = '30%' }) => {
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
          background: 'radial-gradient(#00ff99 40%, transparent 60%)',
        }} />
      </motion.div>
    </>
  );
};

const MovingBorderCard = ({ children, duration = 3000, className }) => (
  <MovingBorderWrap>
    <div style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden' }}>
      <MovingDot duration={duration} />
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
            background: 'rgba(6, 78, 59, 0.8)', display: 'block', borderRadius: 24,
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
  { icon: <FaBrain />,      color: '#00ff99', label: 'ML/AI' },
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
  border: 1px solid rgba(0,255,153,0.2);
  background: rgba(0,255,153,0.05);
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
`;

/* ── Grid layout ── */
const SectionWrap = styled.section`
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

const cardAnim = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const ApproachSection = () => (
  <SectionWrap id="approach">
    <h1 className="heading">
      My <span style={{ color: '#00ff99' }}>Approach</span>
    </h1>

    <BentoGrid style={{ marginTop: '3rem' }}>
      {/* Card 1: primary stack */}
      <CardWrap custom={0} variants={cardAnim} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <MovingBorderCard duration={2800} style={{ height: '100%' }}>
          <div style={{ padding: '1.5rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: '#00ff99', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>My primary tech stack</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Python · SQL</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgb(115,115,115)', lineHeight: 1.625 }}>Building end-to-end data pipelines, ML models, and analytical systems with the Python data science ecosystem.</p>
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
      <CardWrap custom={1} variants={cardAnim} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
      <CardWrap custom={2} variants={cardAnim} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <HoverCard>
          <Card>
            <div style={{ padding: '0 1rem', marginTop: '1rem', fontSize: '0.75rem', color: '#00ff99', letterSpacing: '0.12em', textTransform: 'uppercase' }}>The Inside Scoop</div>
            <CardTitle>Finishing MCA, exploring what's next</CardTitle>
            <CardDesc>Completing my Master of Computer Applications at Christ University, Bengaluru. Actively looking for Data Engineering and ML Engineering roles.</CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>

      {/* Card 4: global / language */}
      <CardWrap custom={3} variants={cardAnim} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <HoverCard>
          <Card>
            <CardTitle>Fluent in English and Hindi. Based in Bengaluru, India 🇮🇳</CardTitle>
            <CardDesc>Open to remote opportunities globally. Comfortable working across time zones and with distributed international teams.</CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>

      {/* Card 5: collaborate */}
      <CardWrap custom={4} variants={cardAnim} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <MovingBorderCard duration={3600}>
          <div style={{ padding: '1.5rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgb(115,115,115)', letterSpacing: '0.08em', marginBottom: '1rem' }}>Do you want to work together?</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em' }}>Let's build something impactful.</h3>
            <a
              href="mailto:pranabrai137@gmail.com"
              style={{ display: 'inline-block', marginTop: '1rem', color: '#00ff99', fontSize: '0.875rem', textDecoration: 'none' }}
            >
              pranabrai137@gmail.com ↗
            </a>
          </div>
        </MovingBorderCard>
      </CardWrap>

      {/* Card 6: github */}
      <CardWrap custom={5} variants={cardAnim} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <HoverCard>
          <Card>
            <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaGithub style={{ color: '#00ff99' }} /> github.com/PRANABraight
            </CardTitle>
            <CardDesc>Open source projects in data science, ML, and full-stack development. Check out Credit Risk Analytics, Falcon 9 ML, and more.</CardDesc>
          </Card>
        </HoverCard>
      </CardWrap>
    </BentoGrid>
  </SectionWrap>
);

export default ApproachSection;
