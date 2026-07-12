import { useRef } from 'react';
import styled from 'styled-components';
import { gsap, useGSAP, OK, REDUCED, revealUp } from '../../lib/motion';
import { accentVars } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';

const Wrap = styled.section`
  ${accentVars('journey')}
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 1024px) { max-width: 1000px; }
`;

const TLine = styled.div`
  position: relative;
  padding-left: 0;

  @media (min-width: 768px) {
    padding-left: 2rem;
  }

  /* ≥1024px: centered spine, entries alternate sides */
  @media (min-width: 1024px) {
    padding-left: 0;
  }
`;

/* Faint full-height rail; the accent progress bar inside is drawn by scroll */
const Track = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
  display: none;

  @media (min-width: 768px) { display: block; }
  @media (min-width: 1024px) { left: 50%; transform: translateX(-0.5px); }
`;

const Progress = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #fbbf24, rgba(251,191,36,0.25));
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
  transform-origin: top;
`;

const Entry = styled.div`
  position: relative;
  padding: 0 0 3rem 0;

  @media (min-width: 768px) { padding: 0 0 3rem 2.5rem; }

  &:last-child { padding-bottom: 0; }

  @media (min-width: 1024px) {
    width: calc(50% - 3rem);
    padding: 0 0 3.5rem 0;

    &[data-side='right'] { margin-left: auto; }
    &[data-side='left']  { margin-right: auto; }

    &:last-child { padding-bottom: 0; }

    /* dot sits on the centered spine, 3rem outside the entry's inner edge */
    &[data-side='right'] .tl-dot { left: -3rem; right: auto; transform: translateX(-50%); }
    &[data-side='left'] .tl-dot  { left: auto; right: -3rem; transform: translateX(50%); }
  }
`;

const Dot = styled.div`
  display: none;
  position: absolute;
  left: -2.25rem;
  top: 0.4rem;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #0e0e10;
  border: 2px solid rgba(var(--accent-rgb), 0.35);
  transform: translateX(-50%);
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &.active {
    background: var(--accent);
    border-color: var(--accent);
    box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.6);
  }

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
  color: var(--accent);
`;

/* Single-accent discipline: wins earn gold, everything else stays neutral */
const TYPE_COLORS = {
  achievement:   { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24' },
  publication:   { bg: 'rgba(255,255,255,0.07)', text: 'rgba(255,255,255,0.75)' },
  certification: { bg: 'rgba(255,255,255,0.07)', text: 'rgba(255,255,255,0.75)' },
  leadership:    { bg: 'rgba(255,255,255,0.07)', text: 'rgba(255,255,255,0.75)' },
  milestone:     { bg: 'rgba(168,162,158,0.1)',  text: '#a8a29e' },
};

const TypeBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: ${({ $type }) => TYPE_COLORS[$type]?.bg || 'rgba(168,162,158,0.1)'};
  color: ${({ $type }) => TYPE_COLORS[$type]?.text || '#a8a29e'};
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
  color: rgb(168,162,158);
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

const JourneySection = ({ cmsJourney }) => {
  const entries = cmsJourney?.entries?.length ? cmsJourney.entries : ENTRIES_FALLBACK;
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(OK, () => {
      revealUp('.journey-top', { trigger: '.journey-top' });

      // Signature moment: the rail draws itself as you read down the timeline
      gsap.fromTo('.tl-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-line',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray('.tl-entry').forEach((entry) => {
        // Slide in away from the spine on whichever side the entry sits
        const fromSpine = entry.dataset.side === 'left' ? 16 : -16;
        gsap.from(entry, {
          x: fromSpine,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: entry, start: 'top 75%', once: true },
        });
        const dot = entry.querySelector('.tl-dot');
        if (dot) {
          gsap.timeline({
            scrollTrigger: {
              trigger: entry,
              start: 'top 62%',
              toggleActions: 'play none none reverse',
              onEnter: () => dot.classList.add('active'),
              onLeaveBack: () => dot.classList.remove('active'),
            },
          }).fromTo(dot, { scale: 1 }, { scale: 1.35, duration: 0.18, yoyo: true, repeat: 1 });
        }
      });
    });

    // Reduced motion: everything in its final, readable state
    mm.add(REDUCED, () => {
      gsap.set('.tl-progress', { scaleY: 1 });
      scope.current?.querySelectorAll('.tl-dot').forEach(d => d.classList.add('active'));
    });
  }, { scope });

  return (
    <Wrap id="journey" ref={scope}>
      <div className="journey-top">
        <SectionTitle
          eyebrow="// timeline"
          sub="I've had the opportunity to build software across different domains — from ML systems to government platforms. Here's my timeline."
        >
          My journey <span>report</span>
        </SectionTitle>
      </div>

      <TLine className="tl-line">
        <Track className="tl-track">
          <Progress className="tl-progress" />
        </Track>
        {entries.map((e, i) => (
          <Entry key={e.year} className="tl-entry" data-side={i % 2 ? 'left' : 'right'}>
            <Dot className="tl-dot" />
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
