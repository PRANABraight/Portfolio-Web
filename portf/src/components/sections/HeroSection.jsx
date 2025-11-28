// src/components/sections/HeroSection.jsx
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import { useRotatingText } from "../../hooks/useRotatingText";
import { heroData } from "../../data/portfolioData";
import { colors, typography, spacing, borderRadius } from "../../styles/theme";
import MagneticButton from "../common/MagneticButton";
import resumePDF from "../../assets/Pranab_Rai_da (1).pdf";

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${spacing['4xl']} ${spacing.xl} ${spacing['2xl']};
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: ${typography.fontSize['7xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
  letter-spacing: ${typography.letterSpacing.tight};
  line-height: ${typography.lineHeight.tight};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize['5xl']};
  }
`;

const Tagline = styled(motion.p)`
  font-size: ${typography.fontSize.xl};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.xl};
  font-weight: ${typography.fontWeight.regular};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.lg};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${typography.fontSize['2xl']};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-height: 2.5em;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing['2xl']};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.xl};
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: ${spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.xl};
  background: ${colors.primary.main};
  color: white;
  border-radius: ${borderRadius.full};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  cursor: pointer;
  border: none;
  box-shadow: ${colors.shadow.blue};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${colors.primary.light};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.xl};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.xl};
  background: transparent;
  color: ${colors.text.primary};
  border-radius: ${borderRadius.full};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${colors.secondary.main};
    color: ${colors.secondary.main};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.purple};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroSection = () => {
  const currentTrait = useRotatingText(heroData.traits);

  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer id="home">
      <Title
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {Array.from("Hi, I'm " + heroData.name).map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                },
              },
            }}
          >
            {char}
          </motion.span>
        ))}
      </Title>
      <Tagline
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {heroData.tagline}
      </Tagline>
      <Subtitle
        key={currentTrait}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {currentTrait}
      </Subtitle>

      <CTAContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <MagneticButton>
          <PrimaryButton
            href="#contact"
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            Get In Touch
          </PrimaryButton>
        </MagneticButton>
        <MagneticButton>
          <SecondaryButton
            href={resumePDF}
            download="Pranab_Rai_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload />
            Download Resume
          </SecondaryButton>
        </MagneticButton>
      </CTAContainer>
    </HeroContainer>
  );
};

export default HeroSection;