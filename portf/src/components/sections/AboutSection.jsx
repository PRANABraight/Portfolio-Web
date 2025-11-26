// src/components/sections/AboutSection.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaChartLine, FaBrain } from 'react-icons/fa';
import { aboutData } from '../../data/portfolioData';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import AnimatedTitle from '../common/AnimatedTitle';

const AboutSectionContainer = styled.section`
  padding: ${spacing['4xl']} ${spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing['3xl']};
  margin-bottom: ${spacing['4xl']};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${spacing.xl};
  }
`;

const CodeWindow = styled(motion.div)`
  background: ${colors.background.console};
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.xl};
  font-family: ${typography.fontFamily.mono};
  box-shadow: ${colors.shadow.xl};
  overflow: hidden;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  height: fit-content;
  position: sticky;
  top: 100px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 968px) {
    position: relative;
    top: 0;
  }
`;

const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing.md} ${spacing.lg};
  background: linear-gradient(135deg, #2D2D2D 0%, #1a1a1a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: ${spacing.sm};
  background-color: ${props => props.color};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const WindowTitle = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${typography.fontSize.sm};
  margin-left: ${spacing.lg};
`;

const CodeContent = styled.div`
  padding: ${spacing.xl};
  min-height: 300px;
  background: ${colors.background.console};
  max-height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const CodeLine = styled.div`
  color: #D4D4D4;
  white-space: pre-wrap;
  line-height: 1.8;
  font-size: ${typography.fontSize.sm};

  .keyword { color: #7C3AED; font-weight: 500; }
  .string { color: #059669; }
  .comment { color: #64748B; font-style: italic; opacity: 0.8; }
  .function { color: #1E40AF; }
  .property { color: #F59E0B; }
  .punctuation { color: #94A3B8; }
`;

const TypingCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #1E40AF;
  margin-left: 2px;
  animation: blink 1s infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

const AboutCard = styled(motion.div)`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.xl};
  padding: ${spacing.xl};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${colors.shadow.sm};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.gradient.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    transform: translateX(8px);
    box-shadow: ${colors.shadow.lg};
    border-color: ${colors.border.hover};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.md};
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${borderRadius.lg};
  background: ${props => props.$gradient || colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: ${colors.shadow.md};
`;

const CardTitle = styled.h3`
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

const CardDescription = styled.p`
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  font-size: ${typography.fontSize.base};
  margin: 0;
`;

const DecorativeElement = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${colors.gradient.primary};
  opacity: 0.05;
  filter: blur(60px);
  pointer-events: none;
`;

const getSyntaxClass = (token) => {
  // Python keywords
  if (/\b(class|def|self|return)\b/.test(token)) return 'keyword';
  // Python comments
  if (token.trim().startsWith('#')) return 'comment';
  // Python docstrings
  if (/""".*"""/.test(token) || token.includes('"""')) return 'comment';
  // Python strings
  if (/'[^']*'/.test(token)) return 'string';
  // Python function definitions
  if (/__init__|analyze_data|build_predictive_model/.test(token)) return 'function';
  return 'punctuation';
};

const AboutSection = () => {
  const { displayedLines, isComplete } = useTypingEffect(aboutData.code);

  const cardData = [
    {
      icon: <FaLaptopCode />,
      title: 'Data Science Expertise',
      description: 'Machine Learning, Deep Learning, Statistical Modeling, Data Mining, and Predictive Analytics with Python ecosystem.',
      gradient: 'linear-gradient(135deg, #007AFF, #0051D5)'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Education',
      description: 'Master of Computer Applications from Christ University, Bengaluru, with specialization in Data Science and AI.',
      gradient: 'linear-gradient(135deg, #5856D6, #3634A3)'
    },
    {
      icon: <FaChartLine />,
      title: 'Research & Innovation',
      description: 'Published research in ML applications, participated in Kaggle competitions, and contributed to open-source DS projects.',
      gradient: 'linear-gradient(135deg, #00D4FF, #0099CC)'
    },
    {
      icon: <FaBrain />,
      title: 'Interests',
      description: 'Exploring NLP, Computer Vision, Time Series Forecasting, Reinforcement Learning, and MLOps best practices.',
      gradient: 'linear-gradient(135deg, #BF5AF2, #9333EA)'
    }
  ];

  return (
    <AboutSectionContainer id="about">
      <AnimatedTitle>About Me</AnimatedTitle>
      
      <DecorativeElement
        style={{ top: '10%', right: '5%' }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <ContentGrid>
        <CodeWindow
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <WindowHeader>
            <WindowButton color="#FF5F57" />
            <WindowButton color="#FEBC2E" />
            <WindowButton color="#28C840" />
            <WindowTitle>data-scientist.py</WindowTitle>
          </WindowHeader>
          <CodeContent>
            {displayedLines.map((line, index) => (
              <CodeLine key={index}>
                <span className={getSyntaxClass(line)}>{line}</span>
                {index === displayedLines.length - 1 && !isComplete && <TypingCursor />}
              </CodeLine>
            ))}
          </CodeContent>
        </CodeWindow>

        <CardsContainer>
          {cardData.map((card, index) => (
            <AboutCard
              key={card.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <CardHeader>
                <IconWrapper $gradient={card.gradient}>
                  {card.icon}
                </IconWrapper>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardDescription>{card.description}</CardDescription>
            </AboutCard>
          ))}
        </CardsContainer>
      </ContentGrid>
    </AboutSectionContainer>
  );
};

export default AboutSection;