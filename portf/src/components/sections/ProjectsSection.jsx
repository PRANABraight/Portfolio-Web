import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../../data/portfolioData';
import ProjectModal from '../common/ProjectModal';
import { urlFor } from '../../lib/sanity';

const Wrap = styled.section`
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
  background: #13162D;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(0,255,153,0.4); }
`;

const ImgWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  background: #0a0a18;

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
  color: ${p => p.$ongoing ? '#f59e0b' : '#00ff99'};
  border: 1px solid ${p => p.$ongoing ? 'rgba(245,158,11,0.3)' : 'rgba(0,255,153,0.3)'};
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
  color: #BEC1DD;
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
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  background: #0a0a18;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${p => p.$color || '#00ff99'};
  margin-left: ${p => p.$first ? '0' : '-8px'};
  position: relative;
  z-index: ${p => p.$z};
  letter-spacing: 0;
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
  color: #00ff99;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: #00e187; }
`;

const COLORS = ['#3776AB', '#F7931E', '#47A248', '#4479A1', '#00ff99'];

const ProjectCard = ({ project, onClick, isOngoing }) => {
  const icons = (project.stack ?? []).slice(0, 4);
  const hasGithub = !!project.github;
  const hasLive = !!project.deployment;

  return (
    <Card onClick={onClick} whileTap={{ scale: 0.99 }}>
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
            {icons.map((name, i) => (
              <TechIcon key={name} $color={COLORS[i % COLORS.length]} $first={i === 0} $z={icons.length - i}>
                {name.slice(0, 2).toUpperCase()}
              </TechIcon>
            ))}
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

  const open = (p) => { setSelected(p); setModalOpen(true); document.body.style.overflow = 'hidden'; };
  const close = () => { setModalOpen(false); document.body.style.overflow = ''; };

  let completed, ongoing;
  if (cmsProjects) {
    const normalized = cmsProjects.map(p => ({
      ...p,
      stack: p.stack ?? [],
      features: p.features ?? [],
      image: p.image ? urlFor(p.image).width(800).url() : null,
    }));
    completed = normalized.filter(p => p.status !== 'ongoing');
    ongoing = normalized.filter(p => p.status === 'ongoing');
  } else {
    completed = projectsData.completed || [];
    ongoing = projectsData.ongoing || [];
  }

  return (
    <Wrap id="projects">
      <h1 className="heading">
        A small selection of{' '}
        <span style={{ color: '#00ff99' }}>recent projects</span>
      </h1>

      <Grid>
        {completed.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <ProjectCard project={p} onClick={() => open(p)} isOngoing={false} />
          </motion.div>
        ))}
        {ongoing.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (completed.length + i) * 0.07 }}
          >
            <ProjectCard project={p} onClick={() => open(p)} isOngoing={true} />
          </motion.div>
        ))}
      </Grid>

      <ProjectModal project={selected} isOpen={modalOpen} onClose={close} />
    </Wrap>
  );
};

export default ProjectsSection;
