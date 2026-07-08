import { useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Wrap = styled.section`
  padding: 4rem 1.25rem;
  @media (min-width: 640px) { padding: 4rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  margin: 0 auto;
  justify-content: center;

  @media (min-width: 768px) { max-width: 80vw; }
  @media (min-width: 1280px) { max-width: none; justify-content: space-between; }
`;

const Divider = styled.div`
  width: 1px;
  background: rgba(255,255,255,0.08);
  align-self: stretch;
  display: none;
  @media (min-width: 768px) { display: block; }
`;

const blur = {
  initial: { filter: 'blur(0px)', opacity: 1 },
  show:    { filter: 'blur(4px)', opacity: 0.6, transition: { duration: 0.4 } },
  hide:    { filter: 'blur(0px)', opacity: 1, transition: { duration: 0.4 } },
};

/* Count-up hook */
const useCountUp = (end, duration = 2000, delay = 0, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    let frame;
    const step = (ts) => {
      if (!startTime) startTime = ts + delay;
      const progress = Math.min((ts - startTime) / duration, 1);
      if (progress < 0) { frame = requestAnimationFrame(step); return; }
      setCount(Math.floor(progress * end));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setCount(end);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, delay, started]);
  return count;
};

const StatItem = ({ item, hovered, onEnter, onLeave, started }) => {
  const count = useCountUp(item.num, 1500, item.delay * 1000, started);
  const isBlurred = hovered !== null && hovered !== item.id;

  return (
    <motion.div
      style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', flex: '1 1 200px' }}
      onMouseOver={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        variants={blur}
        initial="initial"
        animate={isBlurred ? 'show' : 'hide'}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
      >
        <span style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.025em',
          lineHeight: 1,
        }}>
          {count}{item.suffix}
        </span>
        <p style={{
          maxWidth: item.label.length < 15 ? '100px' : '150px',
          lineHeight: 1.4,
          color: 'rgba(255,255,255,0.75)',
          fontSize: '0.875rem',
          fontWeight: 400,
        }}>
          {item.label}
        </p>
      </motion.div>
    </motion.div>
  );
};

const STATS_FALLBACK = [
  { id: 0, num: 1,  suffix: '+', label: 'Years of experience', delay: 0.3 },
  { id: 1, num: 5,  suffix: '+', label: 'Projects worked on',  delay: 0.3 },
  { id: 2, num: 4,  suffix: '+', label: 'Projects deployed',   delay: 0.3 },
];

const StatsSection = ({ cmsStats }) => {
  const STATS = cmsStats
    ? cmsStats.map((s, i) => ({ id: i, num: s.num, suffix: s.suffix || '+', label: s.label, delay: 0.3 }))
    : STATS_FALLBACK;
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Wrap ref={ref}>
      <Grid>
        {STATS.flatMap((item, i) => [
          i > 0 ? <Divider key={`div-${item.id}`} /> : null,
          <StatItem
            key={item.id}
            item={item}
            hovered={hovered}
            onEnter={() => setHovered(item.id)}
            onLeave={() => setHovered(null)}
            started={inView}
          />,
        ]).filter(Boolean)}
      </Grid>
    </Wrap>
  );
};

export default StatsSection;
