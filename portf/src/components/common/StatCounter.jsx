// src/components/common/StatCounter.jsx
import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';
import { colors, typography, spacing } from '../../styles/theme';

const CounterWrapper = styled(motion.div)`
  text-align: center;
`;

const CounterValue = styled.div`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: ${spacing.sm};
`;

const CounterLabel = styled.div`
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.medium};
`;

const StatCounter = ({ end, duration = 2, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <CounterWrapper
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <CounterValue>
        {count}{suffix}
      </CounterValue>
      <CounterLabel>{label}</CounterLabel>
    </CounterWrapper>
  );
};

export default StatCounter;
