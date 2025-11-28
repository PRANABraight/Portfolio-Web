// src/components/common/ScrollProgress.jsx
import { motion, useScroll, useSpring } from "framer-motion";
import styled from "styled-components";
import { colors } from "../../styles/theme";

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${colors.gradient.primary};
  transform-origin: 0%;
  z-index: 9999;
`;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return <ProgressBar style={{ scaleX }} />;
};

export default ScrollProgress;
