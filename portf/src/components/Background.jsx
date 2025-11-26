// src/components/Background.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: #0F172A; /* Dark Slate base for better contrast */
`;

const GradientMesh = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(at 0% 0%, rgba(30, 64, 175, 0.4) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.4) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(5, 150, 105, 0.3) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(245, 158, 11, 0.3) 0px, transparent 50%);
  filter: blur(40px);
  opacity: 0.8;
`;

const GridPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  mix-blend-mode: screen;
`;

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BackgroundContainer>
      <GradientMesh />
      <GridPattern />
      
      {/* Primary Blue Orb (Trust) */}
      <FloatingOrb
        style={{ 
          width: '500px', 
          height: '500px', 
          top: '-100px', 
          left: '-100px',
          background: 'radial-gradient(circle, #1E40AF 0%, transparent 70%)'
        }}
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          default: { type: "spring", stiffness: 30, damping: 20 }
        }}
      />
      
      {/* Secondary Purple Orb (Innovation) */}
      <FloatingOrb
        style={{ 
          width: '400px', 
          height: '400px', 
          top: '20%', 
          right: '-50px',
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)'
        }}
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * 0.03,
          scale: [1, 1.2, 1],
        }}
        transition={{
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 },
          default: { type: "spring", stiffness: 30, damping: 20 }
        }}
      />
      
      {/* Success Green Orb (Growth) */}
      <FloatingOrb
        style={{ 
          width: '450px', 
          height: '450px', 
          bottom: '-50px', 
          left: '20%',
          background: 'radial-gradient(circle, #059669 0%, transparent 70%)'
        }}
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * -0.02,
          scale: [1, 1.15, 1],
        }}
        transition={{
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 },
          default: { type: "spring", stiffness: 30, damping: 20 }
        }}
      />
      
      {/* Warning Orange Orb (Energy) */}
      <FloatingOrb
        style={{ 
          width: '350px', 
          height: '350px', 
          bottom: '10%', 
          right: '10%',
          background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)'
        }}
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 },
          default: { type: "spring", stiffness: 30, damping: 20 }
        }}
      />
    </BackgroundContainer>
  );
};

export default Background;
