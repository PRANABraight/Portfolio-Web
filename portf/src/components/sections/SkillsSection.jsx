import { useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { skillsData } from '../../data/portfolioData';
import { getIcon } from '../../lib/iconMap';
import { gsap, useGSAP, OK, batchReveal } from '../../lib/motion';
import { accentVars } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';

const Wrap = styled.section`
  ${accentVars('skills')}
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Left = styled(motion.div)`
  position: sticky;
  top: 90px;

  @media (max-width: 968px) {
    position: relative; top: 0;
  }
`;

const Quote = styled.blockquote`
  font-size: 0.875rem;
  font-style: italic;
  color: rgb(168,162,158);
  line-height: 1.625;
  border-left: 2px solid var(--accent);
  padding-left: 1.25rem;
  margin: 0 0 2rem;
`;

const SLabel = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgb(120,113,108);
  margin-bottom: 1rem;
`;

const StrList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const StrItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.75rem;
  color: rgb(168,162,158);
  transition: color 0.2s ease;

  &:last-child { border-bottom: none; }
  &::before { content: '▹'; color: var(--accent); font-size: 0.75rem; flex-shrink: 0; }
  &:hover { color: rgba(255,255,255,0.8); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 1px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 1rem;
  overflow: hidden;
`;

const SkillCard = styled.div`
  padding: 1.25rem 0.75rem;
  background: rgba(33,25,19,0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  transition: background 0.2s ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, ${p => p.$c}15, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(28,26,50,0.9);
    transform: translateY(-4px) scale(1.03);
    z-index: 1;
    &::after { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background 0.2s ease;
    &:hover { transform: none; }
  }
`;

const SIcon = styled.div`
  font-size: 1.75rem;
  color: ${p => p.$c};
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 6px ${p => p.$c}44);
  transition: transform 0.25s ease, filter 0.25s ease;
  position: relative;
  z-index: 1;

  ${SkillCard}:hover & {
    transform: translateY(-3px);
    filter: drop-shadow(0 4px 10px ${p => p.$c}66);
  }
`;

const SName = styled.span`
  font-size: 0.75rem;
  color: rgb(120,113,108);
  text-align: center;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;

  ${SkillCard}:hover & { color: rgba(255,255,255,0.6); }
`;

const SkillsSection = ({ cmsSkills }) => {
  const skills = cmsSkills?.length
    ? cmsSkills.map(s => ({ name: s.name, color: s.color, icon: getIcon(s.iconName) }))
    : skillsData;
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => batchReveal('.skill-tile', scope.current, { stagger: 0.05 }));
  }, { scope, dependencies: [cmsSkills] });

  return (
    <Wrap id="skills" ref={scope}>
      <SectionTitle eyebrow="// skills" mb="0">
        Technical <span>Arsenal</span>
      </SectionTitle>

      <Layout style={{ marginTop: '3rem' }}>
        <Left initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
          <Quote>"Technology is most powerful when data-driven decisions replace intuition."</Quote>
          <SLabel>Core Strengths</SLabel>
          <StrList>
            {['Data Science & Machine Learning','Scalable data platforms & pipelines','Advanced SQL & database optimisation','Real-time analytics & visualisation'].map(s => (
              <StrItem key={s}>{s}</StrItem>
            ))}
          </StrList>
        </Left>

        <Grid>
          {skills.map((s, i) => (
            <SkillCard key={i} className="skill-tile" $c={s.color}>
              <SIcon $c={s.color}><s.icon /></SIcon>
              <SName>{s.name}</SName>
            </SkillCard>
          ))}
        </Grid>
      </Layout>
    </Wrap>
  );
};

export default SkillsSection;
