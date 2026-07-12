import { motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';

const Bar = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #fbbf24, #f97316, #ff8a5c);
  transform-origin: 0%;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(var(--site-accent-rgb), 0.5);
`;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <Bar style={{ scaleX }} />;
};

export default ScrollProgress;
