// Personal page — polaroid/journal aesthetic, clay accent (see theme.js sectionAccents.personal)
import { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ScrollTrigger } from '../../../lib/motion';
import { accentVars } from '../../../styles/theme';
import Intro from './Intro';
import BentoGrid from './BentoGrid';
import Carousel from './Carousel';
import MusicPlayer from './MusicPlayer';
import ThankYou from './ThankYou';

const PersonalRoot = styled.div`
  ${accentVars('personal')}
`;

const WidgetsWrap = styled(motion.div)`
  position: relative;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

const WidgetTitle = styled.h3`
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  color: #fff;
  text-align: center;
`;

const WidgetGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 1.5, duration: 0.4, ease: 'easeIn' } } };

const PersonalSection = ({ cmsPersonal }) => {
  // Lazy-loaded chunk mounts after App's mode-change refresh has already
  // fired; re-measure once our layout exists.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <PersonalRoot>
      <Intro />
      <BentoGrid cmsPersonal={cmsPersonal} />
      <Carousel />

      <WidgetsWrap {...fadeIn}>
        <WidgetTitle>Music that I enjoy 🎶</WidgetTitle>
        <WidgetGrid>
          <MusicPlayer songs={cmsPersonal?.songs || []} />
        </WidgetGrid>
      </WidgetsWrap>

      <ThankYou />
    </PersonalRoot>
  );
};

export default PersonalSection;
