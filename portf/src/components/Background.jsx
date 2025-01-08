import React, { memo, useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(
    -45deg,
    rgba(17, 24, 39, 0.95),
    rgba(17, 24, 39, 0.98),
    rgba(23, 30, 45, 0.95),
    rgba(17, 24, 39, 0.97)
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  overflow: hidden;
`;

const GridPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
  transition: all 0.3s ease;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, ${props => props.opacity});
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const Glow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(59, 130, 246, 0) 70%
  );
  pointer-events: none;
  transition: all 0.3s ease;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

const Background = memo(() => {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }))
  );

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <BackgroundWrapper>
      <GridPattern />
      {particles.map(particle => (
        <Particle
          key={particle.id}
          size={particle.size}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`
          }}
          opacity={particle.opacity}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
      <Glow x={mousePos.x} y={mousePos.y} />
    </BackgroundWrapper>
  );
});

Background.displayName = "Background";

export default Background;
