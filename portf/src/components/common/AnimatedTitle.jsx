// src/components/common/AnimatedTitle.jsx
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors, typography, spacing } from "../../styles/theme";

const StyledTitle = styled(motion.h2)`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${spacing['2xl']};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: ${typography.letterSpacing.tight};
  line-height: ${typography.lineHeight.tight};
  position: relative;

  @media (max-width: 768px) {
    font-size: ${typography.fontSize['3xl']};
    margin-bottom: ${spacing.xl};
  }
`;

const AnimatedTitle = ({ children }) => {
  return (
    <StyledTitle
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </StyledTitle>
  );
};

export default AnimatedTitle;