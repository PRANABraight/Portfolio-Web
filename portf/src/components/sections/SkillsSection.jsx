import { motion } from 'framer-motion';
import styled from 'styled-components';
import { skillsData } from '../../data/portfolioData';
import { getIcon } from '../../lib/iconMap';

const Wrap = styled.section`
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
  color: rgb(161,161,170);
  line-height: 1.625;
  border-left: 2px solid #00ff99;
  padding-left: 1.25rem;
  margin: 0 0 2rem;
`;

const SLabel = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgb(115,115,115);
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
  color: rgb(161,161,170);
  transition: color 0.2s ease;

  &:last-child { border-bottom: none; }
  &::before { content: '▹'; color: #00ff99; font-size: 0.75rem; flex-shrink: 0; }
  &:hover { color: rgba(255,255,255,0.8); }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 1px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 1rem;
  overflow: hidden;
`;

const SkillCard = styled(motion.div)`
  padding: 1.25rem 0.75rem;
  background: rgba(22,20,42,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  transition: background 0.2s ease;
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
    &::after { opacity: 1; }
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
  color: rgb(115,115,115);
  text-align: center;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;

  ${SkillCard}:hover & { color: rgba(255,255,255,0.6); }
`;

const gV = { hidden:{}, visible:{ transition:{ staggerChildren:0.03 } } };
const cV = { hidden:{ opacity:0, scale:0.85 }, visible:{ opacity:1, scale:1, transition:{ duration:0.35 } } };

const SkillsSection = ({ cmsSkills }) => {
  const skills = cmsSkills?.length
    ? cmsSkills.map(s => ({ name: s.name, color: s.color, icon: getIcon(s.iconName) }))
    : skillsData;

  return (
    <Wrap id="skills">
      <h1 className="heading">
        Technical <span style={{ color: '#00ff99' }}>Arsenal</span>
      </h1>

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

        <Grid variants={gV} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }}>
          {skills.map((s, i) => (
            <SkillCard key={i} variants={cV} $c={s.color}>
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
