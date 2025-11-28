import { motion } from 'framer-motion';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import AnimatedTitle from '../common/AnimatedTitle';
import { skillsData } from '../../data/portfolioData';

const SkillsSectionContainer = styled.section`
  padding: ${spacing['4xl']} ${spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: ${spacing['4xl']};
  align-items: start;
  margin-top: ${spacing['3xl']};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${spacing['3xl']};
  }
`;

const LeftPanel = styled(motion.div)`
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: ${spacing['2xl']};

  @media (max-width: 968px) {
    position: relative;
    top: 0;
  }
`;

const QuoteCard = styled(motion.div)`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius['2xl']};
  padding: ${spacing['2xl']};
  box-shadow: ${colors.shadow.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 120px;
    font-family: Georgia, serif;
    color: ${colors.primary.main};
    opacity: 0.1;
    line-height: 1;
  }
`;

const QuoteText = styled.p`
  font-size: ${typography.fontSize.xl};
  font-style: italic;
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0 0 ${spacing.lg} 0;
  position: relative;
  z-index: 1;
`;

const QuoteAuthor = styled.p`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const ExpertiseCard = styled(motion.div)`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius['2xl']};
  padding: ${spacing['2xl']};
  box-shadow: ${colors.shadow.md};
`;

const ExpertiseTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${spacing.lg} 0;
`;

const ExpertiseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const ExpertiseItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.sm};
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};

  &::before {
    content: '▹';
    color: ${colors.primary.main};
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`;

const PersonalNote = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(88, 86, 214, 0.1));
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.xl};
  padding: ${spacing.xl};
  border-left: 4px solid ${colors.primary.main};
`;

const NoteText = styled.p`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing['2xl']};
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${spacing.lg};
`;

const SkillCard = styled(motion.div)`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.xl};
  padding: ${spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      ${props => props.$color || colors.primary.main}20,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 400ms;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${props => props.$color || colors.primary.main}, 
      transparent
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.$color || colors.primary.main}66;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${props => props.$color || colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 8px ${props => props.$color || colors.primary.main}44);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);

  ${SkillCard}:hover & {
    transform: scale(1.2) rotate(-5deg);
    filter: drop-shadow(0 8px 16px ${props => props.$color || colors.primary.main}88);
  }
`;

const SkillName = styled.span`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  text-align: center;
  transition: color 300ms;

  ${SkillCard}:hover & {
    color: ${props => props.$color || colors.primary.main};
  }
`;

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <SkillsSectionContainer id="skills">
      <AnimatedTitle>Technical Arsenal</AnimatedTitle>

      <ContentLayout>
        {/* Left Panel - Personal Touch */}
        <LeftPanel
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <QuoteCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <QuoteText>
              Technology is best when it brings people together and solves real problems.
            </QuoteText>
            <QuoteAuthor>— My Philosophy</QuoteAuthor>
          </QuoteCard>

          <ExpertiseCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ExpertiseTitle>Core Strengths</ExpertiseTitle>
            <ExpertiseList>
              <ExpertiseItem>Data Science & Machine Learning</ExpertiseItem>
              <ExpertiseItem>Building scalable data platforms & pipelines</ExpertiseItem>
              <ExpertiseItem>Advanced SQL & database optimization</ExpertiseItem>
              {/* <ExpertiseItem>Cloud architecture & deployment (AWS)</ExpertiseItem> */}
              <ExpertiseItem>Real-time analytics & visualization</ExpertiseItem>
            </ExpertiseList>
          </ExpertiseCard>

          <PersonalNote
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NoteText>
              💡 I believe in continuous learning and staying updated with the latest technologies. 
              Each tool in my arsenal serves a purpose in building scalable, data-driven solutions.
            </NoteText>
          </PersonalNote>
        </LeftPanel>

        {/* Right Panel - Skills Grid */}
        <RightPanel>
          <SkillsGrid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {skillsData.map((skill, index) => (
              <SkillCard
                key={index}
                variants={cardVariants}
                $color={skill.color}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconWrapper $color={skill.color}>
                  <skill.icon />
                </IconWrapper>
                <SkillName $color={skill.color}>{skill.name}</SkillName>
              </SkillCard>
            ))}
          </SkillsGrid>
        </RightPanel>
      </ContentLayout>
    </SkillsSectionContainer>
  );
};

export default SkillsSection;
