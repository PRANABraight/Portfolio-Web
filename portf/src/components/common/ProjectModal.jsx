// src/components/common/ProjectModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${spacing.xl};
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: ${spacing.md};
    align-items: flex-start;
  }
`;

const ModalContainer = styled(motion.div)`
  background: ${colors.background.card};
  border-radius: ${borderRadius['3xl']};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${colors.border.light};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary.main};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    max-height: 95vh;
    border-radius: ${borderRadius['2xl']};
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${spacing.lg};
  right: ${spacing.lg};
  width: 44px;
  height: 44px;
  border-radius: ${borderRadius.full};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  z-index: 10;
  transition: all 200ms;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    top: ${spacing.md};
    right: ${spacing.md};
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: ${borderRadius['3xl']} ${borderRadius['3xl']} 0 0;

  @media (max-width: 768px) {
    height: 250px;
    border-radius: ${borderRadius['2xl']} ${borderRadius['2xl']} 0 0;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, ${colors.background.card}, transparent);
`;

const ContentSection = styled.div`
  padding: ${spacing['3xl']};

  @media (max-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const Title = styled.h2`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.md} 0;
  line-height: ${typography.lineHeight.tight};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${typography.fontSize.lg};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0 0 ${spacing['2xl']} 0;
`;

const SectionTitle = styled.h3`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: ${spacing['2xl']} 0 ${spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${spacing['2xl']} 0;
  display: grid;
  gap: ${spacing.md};
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: rgba(59, 130, 246, 0.05);
  border-radius: ${borderRadius.lg};
  border-left: 3px solid ${colors.primary.main};
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  transition: all 200ms;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: translateX(4px);
  }

  svg {
    color: ${colors.primary.main};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing['2xl']};
`;

const TechTag = styled(motion.span)`
  background: rgba(59, 130, 246, 0.15);
  color: ${colors.text.primary};
  padding: ${spacing.sm} ${spacing.lg};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 200ms;

  &:hover {
    background: rgba(59, 130, 246, 0.25);
    border-color: rgba(59, 130, 246, 0.5);
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing['2xl']};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled(motion.a)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${borderRadius.full};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  cursor: pointer;
  transition: all 200ms;
  text-decoration: none;

  ${props => props.$primary ? `
    background: ${colors.primary.main};
    color: white;
    border: 2px solid ${colors.primary.main};
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);

    &:hover {
      background: ${colors.primary.light};
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5);
    }
  ` : `
    background: transparent;
    color: ${colors.text.primary};
    border: 2px solid rgba(255, 255, 255, 0.3);

    &:hover {
      border-color: ${colors.secondary.main};
      color: ${colors.secondary.main};
      transform: translateY(-2px);
    }
  `}
`;

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </CloseButton>

            <ImageSection>
              <ProjectImage src={project.image} alt={project.title} />
              <ImageOverlay />
            </ImageSection>

            <ContentSection>
              <Title>{project.title}</Title>
              <Description>{project.description}</Description>

              <SectionTitle>✨ Key Features</SectionTitle>
              <FeaturesList>
                {project.features.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FaCheckCircle />
                    <span>{feature}</span>
                  </FeatureItem>
                ))}
              </FeaturesList>

              <SectionTitle>🛠️ Tech Stack</SectionTitle>
              <TechStack>
                {project.stack.map((tech, index) => (
                  <TechTag
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </TechStack>

              <ButtonGroup>
                {project.github && (
                  <ActionButton
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    $primary
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub />
                    View on GitHub
                  </ActionButton>
                )}
                {project.deployment && (
                  <ActionButton
                    href={project.deployment}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </ActionButton>
                )}
              </ButtonGroup>
            </ContentSection>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
