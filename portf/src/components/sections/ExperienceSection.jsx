import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDatabase, FaBrain, FaCode, FaServer } from 'react-icons/fa';
import { getIcon } from '../../lib/iconMap';

const Wrap = styled.section`
  padding: 5rem 1.25rem;
  @media (min-width: 640px) { padding: 5rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

const Grid = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
  position: relative;
  border-radius: 1.25rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: #13162D;
  padding: 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 140px;
    background: radial-gradient(ellipse at top, rgba(0,255,153,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Thumb = styled.div`
  width: 64px; height: 64px;
  border-radius: 1rem;
  background: rgba(0,255,153,0.08);
  border: 1px solid rgba(0,255,153,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff99;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const ExpTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
`;

const ExpDesc = styled.p`
  font-size: 0.875rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.625;
`;

const ITEMS_FALLBACK = [
  { id: 1, iconName: 'FaCode',     title: 'Full Stack Developer', desc: 'Built Spotify Clone, WisdomWarrior e-learning platform, and Karnataka Beneficiary Dashboard. Led architecture decisions, deployed production systems.' },
  { id: 2, iconName: 'FaDatabase', title: 'Data Engineer',        desc: 'Designed and built Credit Risk Analytics Platform processing 22,903 transactions with 6 REST API endpoints. Reduced manual reporting time by 80%.' },
  { id: 3, iconName: 'FaBrain',    title: 'ML Engineer',          desc: 'Developed ML pipelines for SpaceX Falcon 9 (83.33% accuracy), Clinical Decision Support (93% RF/XGBoost), and real-time Student Attendance with YOLOv8.' },
  { id: 4, iconName: 'FaServer',   title: 'Research Engineer',    desc: 'Published comprehensive QML review paper. Explored quantum chemistry, secure distributed computing, and high-dimensional data analysis with quantum algorithms.' },
];

const ExperienceSection = ({ cmsExperience }) => {
  const ITEMS = cmsExperience
    ? cmsExperience.map(e => ({ id: e._id, iconName: e.iconName || 'FaCode', title: e.title, desc: e.desc }))
    : ITEMS_FALLBACK;

  return (
    <Wrap id="experience">
      <h1 className="heading">
        My <span style={{ color: '#00ff99' }}>Experience</span>
      </h1>

      <Grid>
        {ITEMS.map((item, i) => {
          const IconComponent = getIcon(item.iconName);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <Card>
                <Thumb><IconComponent /></Thumb>
                <ExpTitle>{item.title}</ExpTitle>
                <ExpDesc>{item.desc}</ExpDesc>
              </Card>
            </motion.div>
          );
        })}
      </Grid>
    </Wrap>
  );
};

export default ExperienceSection;
