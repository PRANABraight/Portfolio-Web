// Education grid — exact match to radnaabazar.com component 608
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { gsap, useGSAP, OK, batchReveal } from '../../lib/motion';
import SectionTitle from '../common/SectionTitle';
import { accentVars } from '../../styles/theme';
import { premiumCard } from '../../styles/mixins';

const Wrap = styled.section`
  ${accentVars('education')}
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

/* grid: 1 → 2 → 3 cols */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: 2.5rem 0;

  @media (min-width: 768px)  { grid-template-columns: 1fr 1fr; }
  @media (min-width: 1280px) { grid-template-columns: 1fr 1fr 1fr; }
`;

/* wrapper for hover effect */
const CardWrap = styled.div`
  position: relative;
  display: block;
  padding: 0.5rem;
  height: 100%;
  width: 100%;
`;

/* hover background — deep sky */
const HoverBg = styled(motion.span)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: rgba(95, 50, 25, 0.8);
  display: block;
  border-radius: 24px;
`;

/* card itself — exact bg + border from radna source */
const Card = styled.div`
  ${premiumCard};
  border-radius: 1.5rem;
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  position: relative;
  z-index: 20;
  transition:
    transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;

  /* diagonal sheen sweep */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.06), transparent);
    transform: translateX(-150%) skewX(-15deg);
    transition: transform 0.6s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 16px 44px -12px rgba(var(--accent-rgb), 0.28);

    &::after { transform: translateX(260%) skewX(-15deg); }
  }
`;

const CardInner = styled.div`
  position: relative;
  z-index: 50;
  padding: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: #e7e5e4;
  letter-spacing: 0.025em;
  margin-top: 1rem;
`;

const DateRange = styled.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
  margin-top: 0.375rem;
`;

const Gpa = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: flex-end;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 0.5rem;

  svg { font-size: 1.125rem; }
`;

const CardDesc = styled.p`
  margin-top: 2rem;
  font-size: 0.75rem;
  color: #a8a29e;
  letter-spacing: 0.025em;
  line-height: 1.625;
`;

const EDU_FALLBACK = [
  {
    id: 'highschool',
    title: 'High School',
    org: 'CBSE Board',
    date: 'Completed 2020',
    dateEnd: '',
    gpa: '85%',
    desc: 'Completed Class XII with 85% aggregate in Physics, Chemistry, Mathematics, and Computer Science.',
  },
  {
    id: 'bca',
    title: 'Bachelor of Computer Applications (BCA)',
    org: 'Christ University, Bengaluru',
    date: 'Jun 2020',
    dateEnd: 'May 2023',
    gpa: '8.68 CGPA',
    desc: 'Undergraduate degree with focus on software development, algorithms, and data structures. Graduated with distinction.',
  },
  {
    id: 'mca',
    title: 'Master of Computer Applications (MCA)',
    org: 'Christ University, Bengaluru',
    date: 'Sep 2023',
    dateEnd: 'Jun 2025',
    gpa: 'In Progress',
    desc: 'Specialisation in Data Science and Artificial Intelligence. Research in Quantum Machine Learning and applied ML systems.',
  },
];

const EduCard = ({ item, isHovered, onEnter, onLeave }) => (
  <CardWrap onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <AnimatePresence>
      {isHovered && (
        <HoverBg
          layoutId="hoverBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
        />
      )}
    </AnimatePresence>
    <Card>
      <CardInner>
        <CardTitle>{item.title}</CardTitle>
        <DateRange>{item.org} &mdash; {item.date}{item.dateEnd ? ` – ${item.dateEnd}` : ''}</DateRange>
        <Gpa>
          <FaGraduationCap />
          {item.gpa}
        </Gpa>
        <CardDesc>{item.desc}</CardDesc>
      </CardInner>
    </Card>
  </CardWrap>
);

const EducationSection = ({ cmsEducation }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => batchReveal('.edu-card', scope.current));
  }, { scope });

  const EDU = cmsEducation
    ? cmsEducation.map(e => ({ id: e._id, title: e.title, org: e.org, date: e.date, dateEnd: e.dateEnd, gpa: e.gpa, desc: e.desc }))
    : EDU_FALLBACK;

  return (
    <Wrap id="education" ref={scope}>
      <SectionTitle eyebrow="// education" mb="0">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
          <FaGraduationCap style={{ color: 'var(--accent)' }} />
          Education
        </span>
      </SectionTitle>

      <Grid>
        {EDU.map((item) => (
          <div key={item.id} className="edu-card">
            <EduCard
              item={item}
              isHovered={hoveredId === item.id}
              onEnter={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
            />
          </div>
        ))}
      </Grid>
    </Wrap>
  );
};

export default EducationSection;
