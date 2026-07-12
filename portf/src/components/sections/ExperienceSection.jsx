import { useRef } from 'react';
import styled from 'styled-components';
import { getIcon } from '../../lib/iconMap';
import { gsap, useGSAP, OK, batchReveal } from '../../lib/motion';
import { accentVars } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';

const Wrap = styled.section`
  ${accentVars('experience')}
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
  background: var(--surface-1);
  padding: 2rem;
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: rgba(var(--accent-rgb), 0.4);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.08);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 140px;
    background: radial-gradient(ellipse at top, rgba(var(--accent-rgb), 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Thumb = styled.div`
  width: 64px; height: 64px;
  border-radius: 1rem;
  background: rgba(var(--accent-rgb), 0.08);
  border: 1px solid rgba(var(--accent-rgb), 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const ExpTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
`;

const CompanyRow = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.25rem;
`;

const Meta = styled.p`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
`;

const BulletList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const BulletItem = styled.li`
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.55;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 0.6rem;
    top: 0.25rem;
  }
`;

const ExpDesc = styled.p`
  font-size: 0.875rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.625;
`;

const ITEMS_FALLBACK = [
  {
    id: 1,
    iconName: 'FaBrain',
    title: 'Software Engineer',
    company: 'Centre for Open Societal Systems (COSS)',
    location: 'Bengaluru, India',
    startDate: 'Jan 2026',
    endDate: 'Present',
    bullets: [
      'Built production AI feedback loop for NMT with DPO/KTO model alignment and RBAC',
      'Contributed to VoiceERA — multilingual voice AI with IndicConformer STT and Indic Parler TTS',
      'Researched RLHF/RLAIF, LoRA vs GaLore trade-offs, and RAG with Weaviate',
      'Authored architecture docs; delivered India AI Summit deliverables',
    ],
  },
  {
    id: 2,
    iconName: 'FaServer',
    title: 'Data & Platform Engineer',
    company: 'Government of Karnataka (Contract)',
    location: 'Bengaluru, India',
    startDate: 'Jul 2024',
    endDate: 'Present',
    bullets: [
      'Built bilingual (English/Kannada) Next.js frontend tracking 5+ KPIs from 300+ submissions across 8 districts',
      'Architected Node.js/Express/MongoDB backend with 2-tier RBAC and JWT auth',
      'Designed data pipelines for survey validation and automated CSV/Excel export for officials',
    ],
  },
];

const ExperienceSection = ({ cmsExperience }) => {
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => {
      batchReveal('.exp-card', scope.current);
      // Scale pop on the icon markers as the section reveals
      gsap.from('.exp-thumb', {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.12,
        scrollTrigger: { trigger: scope.current, start: 'top 75%', once: true },
      });
    });
  }, { scope });

  const ITEMS = Array.isArray(cmsExperience)
    ? cmsExperience.map(e => ({
        id: e._id,
        iconName: e.iconName || 'FaCode',
        title: e.title,
        company: e.company,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
        bullets: e.bullets,
        desc: e.desc,
      }))
    : ITEMS_FALLBACK;

  return (
    <Wrap id="experience" ref={scope}>
      <SectionTitle eyebrow="// experience" mb="0">
        My <span>Experience</span>
      </SectionTitle>

      <Grid>
        {ITEMS.map((item) => {
          const IconComponent = getIcon(item.iconName);
          const hasBullets = item.bullets?.length > 0;
          const hasMeta = item.company || item.startDate || item.location;
          const dateStr = [item.startDate, item.endDate].filter(Boolean).join(' – ');
          return (
            <div key={item.id} className="exp-card">
              <Card>
                <Thumb className="exp-thumb"><IconComponent /></Thumb>
                <ExpTitle>{item.title}</ExpTitle>
                {item.company && <CompanyRow>{item.company}</CompanyRow>}
                {hasMeta && (
                  <Meta>
                    {dateStr}
                    {item.location ? `${dateStr ? ' · ' : ''}${item.location}` : ''}
                  </Meta>
                )}
                {hasBullets ? (
                  <BulletList>
                    {item.bullets.map((b, j) => <BulletItem key={j}>{b}</BulletItem>)}
                  </BulletList>
                ) : (
                  <ExpDesc>{item.desc}</ExpDesc>
                )}
              </Card>
            </div>
          );
        })}
      </Grid>
    </Wrap>
  );
};

export default ExperienceSection;
