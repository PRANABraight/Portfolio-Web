// Education grid — exact match to radnaabazar.com component 608
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const Wrap = styled.section`
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

/* hover background (emerald like radna) */
const HoverBg = styled(motion.span)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: rgba(6, 78, 59, 0.8);
  display: block;
  border-radius: 24px;
`;

/* card itself — exact bg + border from radna source */
const Card = styled.div`
  border-radius: 1.5rem;
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  background: rgb(22, 22, 29);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 20;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(0, 255, 153, 0.6); }
`;

const CardInner = styled.div`
  position: relative;
  z-index: 50;
  padding: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: #e4e4e7;
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
  color: #00ff99;
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 0.5rem;

  svg { font-size: 1.125rem; }
`;

const CardDesc = styled.p`
  margin-top: 2rem;
  font-size: 0.75rem;
  color: #a1a1aa;
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
  const EDU = cmsEducation
    ? cmsEducation.map(e => ({ id: e._id, title: e.title, org: e.org, date: e.date, dateEnd: e.dateEnd, gpa: e.gpa, desc: e.desc }))
    : EDU_FALLBACK;

  return (
    <Wrap id="education">
      <h1 className="heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '3rem' }}>
        <FaGraduationCap style={{ color: '#00ff99' }} />
        <span>Education</span>
      </h1>

      <Grid>
        {EDU.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <EduCard
              item={item}
              isHovered={hoveredId === item.id}
              onEnter={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
            />
          </motion.div>
        ))}
      </Grid>
    </Wrap>
  );
};

export default EducationSection;
