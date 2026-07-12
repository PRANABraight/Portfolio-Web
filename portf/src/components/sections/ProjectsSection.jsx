import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../../data/portfolioData';
import ProjectModal from '../common/ProjectModal';
import SectionTitle from '../common/SectionTitle';
import { urlFor } from '../../lib/sanity';
import FloatingOrbs from '../common/FloatingOrbs';
import { gsap, useGSAP, OK, batchReveal } from '../../lib/motion';
import { premiumCard } from '../../styles/mixins';
import { getStackIcon } from '../../lib/iconMap';
import { accentVars } from '../../styles/theme';

const Wrap = styled.section`
  ${accentVars('projects')}
  position: relative;
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 1rem 0;

  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled(motion.div)`
  ${premiumCard};
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;

  /* Cursor-tracked glow, revealed on hover (pointer devices only) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      240px at var(--mx, 50%) var(--my, 50%),
      rgba(var(--accent-rgb), 0.12),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }

  @media (hover: hover) {
    &:hover::after { opacity: 1; }
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  background: var(--surface-0);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s ease;
  }

  ${Card}:hover img { transform: scale(1.05); }
`;

const ImgPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.15);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
`;

const Body = styled.div`
  padding: 1.5rem;
`;

const Status = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.$ongoing ? '#ff8a5c' : '#fbbf24'};
  border: 1px solid ${p => p.$ongoing ? 'rgba(255,138,92,0.3)' : 'rgba(251,191,36,0.3)'};
  border-radius: 9999px;
  padding: 0.2rem 0.6rem;
  margin-bottom: 0.75rem;
`;

const PTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.625;
  color: #d6cfc7;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconStack = styled.div`
  display: flex;
  align-items: center;
`;

const TechIcon = styled.div`
  width: 36px; height: 36px;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  border-radius: 50%;
  background: var(--surface-0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.75);
  margin-left: ${p => p.$first ? '0' : '-8px'};
  position: relative;
  z-index: ${p => p.$z};
  transition: transform 0.2s ease;

  &:hover { transform: translateY(-3px); }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LinkBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8125rem;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: var(--accent-soft); }
`;

const ProjectCard = ({ project, onClick, isOngoing }) => {
  const icons = (project.stack ?? []).slice(0, 4);
  const hasGithub = !!project.github;
  const hasLive = !!project.deployment;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Card className="project-card" onClick={onClick} onMouseMove={onMove} whileTap={{ scale: 0.99 }}>
      <ImgWrap>
        {project.image
          ? <img src={project.image} alt={project.title} loading="lazy" />
          : <ImgPlaceholder>NO PREVIEW</ImgPlaceholder>
        }
      </ImgWrap>
      <Body>
        <Status $ongoing={isOngoing}>{isOngoing ? 'Ongoing' : 'Completed'}</Status>
        <PTitle>{project.title}</PTitle>
        <PDesc>{project.description}</PDesc>
        <BottomRow>
          <IconStack>
            {icons.map((name, i) => {
              const Icon = getStackIcon(name);
              return (
                <TechIcon key={name} $first={i === 0} $z={icons.length - i} title={name} aria-label={name}>
                  <Icon size={14} />
                </TechIcon>
              );
            })}
          </IconStack>
          <Links>
            {hasGithub && (
              <LinkBtn href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                <FaGithub size={13} /> GitHub
              </LinkBtn>
            )}
            {hasLive && (
              <LinkBtn href={project.deployment} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                <FaExternalLinkAlt size={11} /> Check Site
              </LinkBtn>
            )}
            {!hasGithub && !hasLive && (
              <LinkBtn as="span" style={{ color: 'rgba(255,255,255,0.3)', cursor: 'default' }}>
                <FaArrowRight size={11} /> Details
              </LinkBtn>
            )}
          </Links>
        </BottomRow>
      </Body>
    </Card>
  );
};

const ProjectsSection = ({ cmsProjects }) => {
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => batchReveal('.project-card', scope.current));
  }, { scope });

  const open = (p) => { setSelected(p); setModalOpen(true); document.body.style.overflow = 'hidden'; };
  const close = () => { setModalOpen(false); document.body.style.overflow = ''; };

  let completed, ongoing;
  if (cmsProjects) {
    const normalized = cmsProjects.map(p => ({
      ...p,
      stack: p.stack ?? [],
      features: p.features ?? [],
      image: p.image ? urlFor(p.image).width(800).auto('format').fit('max').url() : null,
    }));
    completed = normalized.filter(p => p.status !== 'ongoing');
    ongoing = normalized.filter(p => p.status === 'ongoing');
  } else {
    completed = projectsData.completed || [];
    ongoing = projectsData.ongoing || [];
  }

  return (
    <Wrap id="projects" ref={scope}>
      <FloatingOrbs count={3} rgbs={[null, '249, 115, 22']} />
      <SectionTitle eyebrow="// projects" mb="1rem">
        A small selection of <span>recent projects</span>
      </SectionTitle>

      <Grid>
        {completed.map((p) => (
          <ProjectCard key={p.title} project={p} onClick={() => open(p)} isOngoing={false} />
        ))}
        {ongoing.map((p) => (
          <ProjectCard key={p.title} project={p} onClick={() => open(p)} isOngoing={true} />
        ))}
      </Grid>

      <ProjectModal project={selected} isOpen={modalOpen} onClose={close} />
    </Wrap>
  );
};

export default ProjectsSection;
