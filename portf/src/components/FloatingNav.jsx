// FloatingNav — exact match to radnaabazar.com component 59867
// Glassmorphism pill, only Professional | Personal, spring layoutId active indicator
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Outer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  margin-bottom: 1rem;

  @media (max-width: 640px) { margin-bottom: 0; }
`;

const Pill = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem;
  border-radius: 24px;
  pointer-events: auto;
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  @media (min-width: 640px) {
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
`;

const Tab = styled.a`
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: ${p => (p.$active ? p.$tint ?? 'var(--site-accent)' : 'rgba(255,255,255,0.8)')};
  letter-spacing: 0.025em;
  user-select: none;

  &:hover {
    color: ${p => (p.$active ? p.$tint ?? 'var(--site-accent)' : 'rgba(255,255,255,0.95)')};
    transform: scale(1.05);
  }
  &:active { transform: scale(0.95); }

  @media (min-width: 640px) {
    font-size: 0.875rem;
    min-width: 100px;
  }
`;

const ActiveBg = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 16px;
`;

const FloatingNav = ({ mode, setMode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('header') || document.querySelector('nav');
      const threshold = header ? header.offsetHeight : 60;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pillStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 100%)',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4), inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 1px 0 0 rgba(255,255,255,0.1)',
  };

  const activeBgStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
    boxShadow: 'inset 0 1px 2px 0 rgba(255,255,255,0.2), 0 1px 1px 0 rgba(0,0,0,0.1)',
  };

  return (
    <Outer>
      <AnimatePresence>
        {visible && (
          <Pill
            style={pillStyle}
            initial={{ opacity: 0, y: 100 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {[
              { key: 'professional', label: 'Professional' },              // follows scroll accent
              { key: 'personal',     label: 'Personal', tint: '#ff8a5c' }, // coral "fun mode"
            ].map(tab => {
              const isActive = mode === tab.key;
              return (
                <Tab
                  key={tab.key}
                  $active={isActive}
                  $tint={tab.tint}
                  onClick={() => setMode(tab.key)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMode(tab.key); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Switch to ${tab.label.toLowerCase()} mode`}
                  aria-pressed={isActive}
                >
                  <span style={{ position: 'relative', zIndex: 10 }}>{tab.label}</span>
                  {isActive && (
                    <ActiveBg
                      layoutId="activeTab"
                      style={activeBgStyle}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Tab>
              );
            })}
          </Pill>
        )}
      </AnimatePresence>
    </Outer>
  );
};

export default FloatingNav;
