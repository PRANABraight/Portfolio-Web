import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Sub = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(var(--accent-rgb), 0.85);
  margin-bottom: 0.75rem;
`;

const Title = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

const AnimatedTitle = ({ children, label }) => (
  <Wrap>
    <Sub
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {label || '//'}
    </Sub>
    <Title
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {children}
    </Title>
  </Wrap>
);

export default AnimatedTitle;
