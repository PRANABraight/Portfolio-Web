// src/components/sections/ProjectsSection.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../../data/portfolioData';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import AnimatedTitle from '../common/AnimatedTitle';
import ProjectModal from '../common/ProjectModal';

const ProjectsSectionContainer = styled.section`
  padding: ${spacing['4xl']} ${spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing['3xl']};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: ${spacing.sm} ${spacing.xl};
  background: ${props => props.$active ? colors.primary.main : colors.background.glass};
  color: ${props => props.$active ? 'white' : colors.text.primary};
  border: 2px solid ${props => props.$active ? colors.primary.main : 'rgba(255, 255, 255, 0.2)'};
  border-radius: ${borderRadius.full};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  cursor: pointer;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${colors.primary.main};
    color: ${props => props.$active ? 'white' : colors.primary.main};
    transform: translateY(-2px);
  }
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${spacing.lg};
  grid-auto-rows: 300px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 280px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 320px;
  }
`;

const ProjectCard = styled(motion.div)`
  grid-column: ${props => props.$span || 'span 4'};
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  border: 1px solid ${colors.border.light};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: ${colors.shadow.sm};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${colors.shadow.xl};
    border-color: ${colors.border.hover};
  }

  @media (max-width: 968px) {
    grid-column: span 6;
  }

  @media (max-width: 640px) {
    grid-column: span 1;
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: ${props => props.$tall ? '100%' : '60%'};
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.1), rgba(88, 86, 214, 0.1));
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);

  ${ProjectCard}:hover & {
    transform: scale(1.1) rotate(2deg);
  }
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.95), rgba(88, 86, 214, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.lg};
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const IconButton = styled.a`
  width: 56px;
  height: 56px;
  border-radius: ${borderRadius.full};
  background: white;
  color: ${colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${colors.shadow.md};

  &:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: ${colors.shadow.lg};
  }
`;

const ProjectContent = styled.div`
  padding: ${spacing.lg};
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text.primary};
    margin-bottom: ${spacing.sm};
    letter-spacing: ${typography.letterSpacing.tight};
  }

  p {
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
    margin-bottom: ${spacing.md};
    flex-grow: 1;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-top: auto;
`;

const TechTag = styled.span`
  background: rgba(59, 130, 246, 0.2);
  color: ${colors.text.primary};
  padding: 6px ${spacing.md};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  border: 1px solid rgba(59, 130, 246, 0.4);
  backdrop-filter: blur(10px);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(59, 130, 246, 0.35);
    border-color: rgba(59, 130, 246, 0.6);
    transform: translateY(-2px);
  }
`;

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const allProjects = [...projectsData.completed, ...projectsData.ongoing];
  const filteredProjects = filter === 'all' 
    ? allProjects 
    : filter === 'completed' 
      ? projectsData.completed 
      : projectsData.ongoing;

  // Bento grid layout pattern
  const getGridSpan = (index) => {
    const patterns = ['span 6', 'span 6', 'span 4', 'span 4', 'span 4', 'span 6', 'span 6'];
    return patterns[index % patterns.length];
  };

  const isTall = (index) => {
    return index % 3 === 0;
  };

  return (
    <ProjectsSectionContainer id="projects">
      <AnimatedTitle>Featured Projects</AnimatedTitle>
      
      <FilterContainer>
        <FilterButton
          $active={filter === 'all'}
          onClick={() => setFilter('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Projects
        </FilterButton>
        <FilterButton
          $active={filter === 'completed'}
          onClick={() => setFilter('completed')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Completed
        </FilterButton>
        <FilterButton
          $active={filter === 'ongoing'}
          onClick={() => setFilter('ongoing')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ongoing
        </FilterButton>
      </FilterContainer>

      <BentoGrid>
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              $span={getGridSpan(index)}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => openModal(project)}
              style={{ cursor: 'pointer' }}
            >
              <ProjectImageContainer $tall={isTall(index)}>
                <ProjectImage src={project.image} alt={project.title} loading="lazy" />
                <ProjectOverlay>
                  {project.github && (
                    <IconButton href={project.github} target="_blank" rel="noopener noreferrer" aria-label="View on GitHub" onClick={(e) => e.stopPropagation()}>
                      <FaGithub />
                    </IconButton>
                  )}
                  {project.deployment && (
                    <IconButton href={project.deployment} target="_blank" rel="noopener noreferrer" aria-label="View Live Demo" onClick={(e) => e.stopPropagation()}>
                      <FaExternalLinkAlt />
                    </IconButton>
                  )}
                </ProjectOverlay>
              </ProjectImageContainer>
              <ProjectContent>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <TechStack>
                  {project.stack.slice(0, 6).map(tech => <TechTag key={tech}>{tech}</TechTag>)}
                </TechStack>
              </ProjectContent>
            </ProjectCard>
          ))}
        </AnimatePresence>
      </BentoGrid>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </ProjectsSectionContainer>
  );
};

export default ProjectsSection;