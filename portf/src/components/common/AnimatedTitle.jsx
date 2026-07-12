import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Sub = styled(motion.p)`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(var(--accent-rgb), 0.7);
  margin-bottom: 0.75rem;
`;

const Title = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.03em;
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
