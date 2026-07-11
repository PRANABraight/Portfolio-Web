import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap, useGSAP, OK, REDUCED, countUp } from '../../lib/motion';

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

const StatItem = ({ item, hovered, onEnter, onLeave }) => {
  const isBlurred = hovered !== null && hovered !== item.id;

  return (
    <div
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
        <span
          className="stat-num"
          data-count={item.num}
          data-suffix={item.suffix}
          style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.025em',
            lineHeight: 1,
          }}
        >
          {item.num}{item.suffix}
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
    </div>
  );
};

const STATS_FALLBACK = [
  { id: 0, num: 1,  suffix: '+', label: 'Years of experience' },
  { id: 1, num: 5,  suffix: '+', label: 'Projects worked on' },
  { id: 2, num: 4,  suffix: '+', label: 'Projects deployed' },
];

const StatsSection = ({ cmsStats }) => {
  const STATS = cmsStats
    ? cmsStats.map((s, i) => ({ id: i, num: s.num, suffix: s.suffix || '+', label: s.label }))
    : STATS_FALLBACK;
  const [hovered, setHovered] = useState(null);
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const nums = gsap.utils.toArray(scope.current.querySelectorAll('.stat-num'));

    mm.add(OK, () => {
      nums.forEach((el, i) => {
        el.textContent = `0${el.dataset.suffix}`;
        countUp(el, Number(el.dataset.count), {
          suffix: el.dataset.suffix,
          trigger: scope.current,
          delay: i * 0.15,
        });
      });
    });
    mm.add(REDUCED, () => {
      nums.forEach(el => { el.textContent = `${el.dataset.count}${el.dataset.suffix}`; });
    });
  }, { scope, dependencies: [cmsStats] });

  return (
    <Wrap ref={scope}>
      <Grid>
        {STATS.flatMap((item, i) => [
          i > 0 ? <Divider key={`div-${item.id}`} /> : null,
          <StatItem
            key={item.id}
            item={item}
            hovered={hovered}
            onEnter={() => setHovered(item.id)}
            onLeave={() => setHovered(null)}
          />,
        ]).filter(Boolean)}
      </Grid>
    </Wrap>
  );
};

export default StatsSection;
