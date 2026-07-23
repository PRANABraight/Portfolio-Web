// src/components/common/ProjectModal.jsx
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { colors, typography, spacing, borderRadius, accentVars } from '../../styles/theme';

const Overlay = styled(motion.div)`
  ${accentVars('projects')}
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
  font-family: 'JetBrains Mono', monospace;
  font-size: ${typography.fontSize.xs};
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
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
  background: rgba(var(--accent-rgb), 0.03);
  border-radius: ${borderRadius.md};
  border-left: 2px solid var(--accent);
  color: ${colors.text2};
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.relaxed};
  transition: all 200ms;

  &:hover {
    background: rgba(var(--accent-rgb), 0.06);
    transform: translateX(4px);
  }

  svg {
    color: var(--accent);
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
  background: rgba(var(--accent-rgb), 0.06);
  color: rgba(var(--accent-rgb), 0.75);
  padding: 0.375rem ${spacing.md};
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: ${typography.fontSize.xs};
  font-weight: 500;
  letter-spacing: 0.025em;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  transition: all 200ms;

  &:hover {
    background: rgba(var(--accent-rgb), 0.12);
    border-color: rgba(var(--accent-rgb), 0.4);
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
    background: var(--accent);
    color: ${colors.bg};
    border: 2px solid var(--accent);
    box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.25);
    font-weight: 700;

    &:hover {
      opacity: 0.88;
      transform: translateY(-2px);
      color: ${colors.bg};
    }
  ` : `
    background: transparent;
    color: ${colors.text2};
    border: 1px solid rgba(255, 255, 255, 0.12);

    &:hover {
      border-color: rgba(var(--accent-rgb), 0.3);
      color: #ffffff;
      transform: translateY(-2px);
    }
  `}
`;

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const containerRef = useRef(null);

  // Escape closes; Tab cycles inside the dialog; focus returns to the opener
  useEffect(() => {
    if (!isOpen) return undefined;
    const opener = document.activeElement;
    const container = containerRef.current;
    container?.querySelector(FOCUSABLE)?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !container) return;
      const focusables = container.querySelectorAll(FOCUSABLE);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

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
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
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
              aria-label="Close project details"
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

              <SectionTitle><span aria-hidden="true">✨ </span>Key Features</SectionTitle>
              <FeaturesList>
                {(project.features ?? []).map((feature, index) => (
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

              <SectionTitle><span aria-hidden="true">🛠️ </span>Tech Stack</SectionTitle>
              <TechStack>
                {(project.stack ?? []).map((tech, index) => (
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
