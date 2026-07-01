import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrap = styled.section`
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 900px;
  margin: 0 auto;
`;

const TopText = styled(motion.div)`
  margin-bottom: 3rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: rgb(161,161,170);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.625;
`;

const TLine = styled.div`
  position: relative;
  padding-left: 0;

  @media (min-width: 768px) {
    padding-left: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, #00ff99, rgba(0,255,153,0.08));
    display: none;

    @media (min-width: 768px) { display: block; }
  }
`;

const Entry = styled(motion.div)`
  position: relative;
  padding: 0 0 3rem 0;

  @media (min-width: 768px) { padding: 0 0 3rem 2.5rem; }

  &:last-child { padding-bottom: 0; }
`;

const Dot = styled.div`
  display: none;
  position: absolute;
  left: -2.25rem;
  top: 0.4rem;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #00ff99;
  box-shadow: 0 0 12px rgba(0,255,153,0.6);
  transform: translateX(-50%);

  @media (min-width: 768px) { display: block; }
`;

const YearRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const Year = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #00ff99;
`;

const TYPE_COLORS = {
  achievement:   { bg: 'rgba(255,196,0,0.12)',  text: '#ffc400' },
  publication:   { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa' },
  certification: { bg: 'rgba(52,211,153,0.12)', text: '#34d399' },
  leadership:    { bg: 'rgba(167,139,250,0.12)',text: '#a78bfa' },
  milestone:     { bg: 'rgba(156,163,175,0.1)', text: '#9ca3af' },
};

const TypeBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: ${({ $type }) => TYPE_COLORS[$type]?.bg || 'rgba(156,163,175,0.1)'};
  color: ${({ $type }) => TYPE_COLORS[$type]?.text || '#9ca3af'};
`;

const EntryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.025em;
  margin-bottom: 0.65rem;
`;

const EntryDesc = styled.p`
  font-size: 0.875rem;
  color: rgb(161,161,170);
  line-height: 1.625;
  max-width: 680px;
`;

const ENTRIES_FALLBACK = [
  {
    year: '2024 – 2025',
    title: "It's been quite an exciting year!",
    desc: "While finishing my MCA thesis on Quantum Machine Learning, I built end-to-end data engineering and ML systems — Credit Risk Analytics (processing 22k+ transactions), Clinical Decision Support (93% accuracy), and a real-time Student Attendance system using YOLOv8 + DeepFace. Also delivered the Karnataka Government Beneficiary Dashboard tracking district-level KPIs across 8 districts. Balancing everything was challenging, but every moment was worth it.",
  },
  {
    year: '2023',
    title: 'First major data engineering projects.',
    desc: 'Built and deployed the SpaceX Falcon 9 Landing Prediction system (83.33% accuracy using Logistic Regression, SVM, Decision Tree, KNN) and began research into Quantum Machine Learning — exploring foundational algorithms, NISQ hardware limitations, and secure distributed QML architectures.',
  },
  {
    year: '2022 – 2023',
    title: 'Learning through building.',
    desc: 'Built full-stack projects to sharpen engineering skills — Spotify Clone (React + Node + MongoDB + Cloudinary) and WisdomWarrior e-learning platform (Firebase + Tailwind). Led volleyball teams and organized Xebit tech events as university representative. Joined MCA program at Christ University, specializing in Data Science and AI.',
  },
  {
    year: '2020 – 2022',
    title: 'BCA — Foundation years.',
    desc: 'Completed Bachelor of Computer Applications at Christ University with 8.68 CGPA. Learned fundamentals of software engineering, algorithms, data structures, and databases. Discovered a deep passion for data and machine learning through coursework and personal projects.',
  },
];

const entryVar = {
  hidden:  { opacity: 0, x: -16 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.12, duration: 0.55, ease: [0.4,0,0.2,1] } }),
};

const JourneySection = ({ cmsJourney }) => {
  const entries = cmsJourney?.entries?.length ? cmsJourney.entries : ENTRIES_FALLBACK;

  return (
    <Wrap id="journey">
      <TopText
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading">
          My journey <span style={{ color: '#00ff99' }}>report</span>
        </h1>
        <Subtitle>
          I've had the opportunity to build software across different domains — from ML systems to government platforms. Here's my timeline.
        </Subtitle>
      </TopText>

      <TLine>
        {entries.map((e, i) => (
          <Entry
            key={e.year}
            custom={i}
            variants={entryVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <Dot />
            <YearRow>
              <Year>{e.year}</Year>
              {e.type && <TypeBadge $type={e.type}>{e.type}</TypeBadge>}
            </YearRow>
            <EntryTitle>{e.title}</EntryTitle>
            <EntryDesc>{e.desc}</EntryDesc>
          </Entry>
        ))}
      </TLine>
    </Wrap>
  );
};

export default JourneySection;
