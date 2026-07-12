import { motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';

const Bar = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--site-accent);
  opacity: 0.55;
  transform-origin: 0%;
  z-index: 9999;
  pointer-events: none;
`;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <Bar style={{ scaleX }} />;
};

export default ScrollProgress;
