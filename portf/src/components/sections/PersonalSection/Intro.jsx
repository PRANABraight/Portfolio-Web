import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMail } from 'react-icons/lu';
import { colors } from '../../../styles/theme';

const IntroWrap = styled(motion.div)`
  padding: 0 1.25rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const BigHello = styled.h1`
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 600;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  margin-top: 1.5rem;
  padding: 1.5rem 0;
  background: linear-gradient(to bottom, ${colors.text2}, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.025em;
`;

const NicknameText = styled.div`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  color: ${colors.text2};
  text-align: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
`;

const AccentWord = styled.span`
  color: ${colors.accent};
  font-weight: 700;
`;

const LetterBtn = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  margin: 2.5rem auto 5rem;
  background: rgba(255,255,255,0.95);
  border: none;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  max-width: 260px;
  transition: all 0.2s ease;

  .label { transition: transform 0.5s ease, opacity 0.5s ease; }
  .emoji {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%) translateX(-3rem);
    opacity: 0;
    transition: transform 0.5s ease, opacity 0.5s ease;
    font-size: 1.125rem;
  }

  &:hover .label { transform: translateX(3rem); opacity: 0; }
  &:hover .emoji { transform: translate(-50%, -50%); opacity: 1; }
`;

const CenterBtn = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.25rem;
`;

const PERSONALITIES = ['Peaceful', 'Persistent', 'Clever', 'Curious', 'Disciplined', 'Modest'];

const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 1.5, duration: 0.4, ease: 'easeIn' } } };

const Intro = () => {
  const [traitIdx, setTraitIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTraitIdx(i => (i + 1) % PERSONALITIES.length);
    }, 2300);
    return () => clearInterval(t);
  }, []);

  return (
    <IntroWrap {...fadeIn}>
      <BigHello>
        Hello again? <br />
        My name is{' '}
        <span
          style={{
            display: 'inline-block',
            background: `linear-gradient(to bottom, ${colors.text2}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
        Pranab
        </span>
      </BigHello>

      <NicknameText>
        Pranab is{' '}
        <AnimatePresence mode="wait">
          <motion.span
            key={PERSONALITIES[traitIdx]}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 10 } }}
            exit={{ opacity: 0, y: -40, x: 40, filter: 'blur(8px)', scale: 2, position: 'absolute' }}
            style={{ display: 'inline-block' }}
          >
            <AccentWord>{PERSONALITIES[traitIdx]}</AccentWord>
          </motion.span>
        </AnimatePresence>
        <br />
        Built this portfolio with love ❤️ 🚀
      </NicknameText>

      <CenterBtn>
        <LetterBtn onClick={() => window.open('mailto:pranabrai137@gmail.com', '_blank')}>
          <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuMail /> Write a letter
          </span>
          <span className="emoji"><LuMail /></span>
        </LetterBtn>
      </CenterBtn>
    </IntroWrap>
  );
};

export default Intro;
