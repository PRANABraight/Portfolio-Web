// Personal page — exact match to radnaabazar.com/en/personal
import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRunning, FaBook, FaVolleyballBall, FaAtom, FaPlay, FaPause,
  FaForward, FaBackward, FaGraduationCap, FaBriefcase, FaGithub,
  FaBrain, FaDumbbell, FaCheck, FaBell
} from 'react-icons/fa';
import profImg from '../../assets/prof.webp';

/* ══════════════════════════════════════════════════════
   1. INTRO — "Hello again?" + cycling personality
═══════════════════════════════════════════════════════ */
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
  background: linear-gradient(to bottom, #9ca3af, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.025em;
`;

const NicknameText = styled.div`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  color: rgba(163, 163, 163, 0.9);
  text-align: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
`;

const AccentWord = styled.span`
  color: #00ff99;
  font-weight: 700;
`;

const WordRotate = styled.span`
  display: inline-block;
  color: rgba(163, 163, 163, 0.9);
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

/* ══════════════════════════════════════════════════════
   2. FEATURED ME — hobby bento grid (exact from 45897)
═══════════════════════════════════════════════════════ */
const FeaturedWrap = styled(motion.div)`
  position: relative;
  z-index: 20;
  padding: 2.5rem 0 5rem;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 1024px) { padding: 5rem 0; }
`;

const FeaturedHeader = styled.div`
  padding: 0 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeaturedTitle = styled.h4`
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 500;
  max-width: 900px;
  margin: 0 auto;
  letter-spacing: -0.025em;
  color: #fff;
  line-height: 1.25;
`;

const FeaturedDesc = styled.p`
  font-size: 0.875rem;
  max-width: 600px;
  margin: 1rem auto 0;
  font-weight: 400;
  color: rgba(212,212,212,0.8);
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 3rem;
  border: 1px solid rgba(64,64,64,0.5);
  border-radius: 8px;
  overflow: hidden;

  @media (min-width: 1024px) { grid-template-columns: repeat(6, 1fr); }
`;

const BentoCell = styled.div`
  padding: 2rem;
  height: 350px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(64,64,64,0.5);

  @media (min-width: 1024px) {
    height: min(calc(100vh - 400px), 600px);
    border-bottom: ${p => p.$nob ? 'none' : '1px solid rgba(64,64,64,0.5)'};
    border-right: ${p => p.$right ? '1px solid rgba(64,64,64,0.5)' : 'none'};
    grid-column: span ${p => p.$span || 1};
  }
`;

const CellTitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const CellDesc = styled.p`
  font-size: 0.875rem;
  color: rgba(212,212,212,0.7);
  font-weight: 400;
  max-width: 380px;
  line-height: 1.625;
`;

const CellImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  inset: 0;
  opacity: 0.3;
  z-index: 0;
`;

/* ══════════════════════════════════════════════════════
   3. CAROUSEL — life categories (exact from 31833)
═══════════════════════════════════════════════════════ */
const CarouselWrap = styled(motion.div)`
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

const CarouselTitle = styled.h2`
  padding: 0 1.25rem;
  font-size: clamp(1.3rem, 4vw, 3rem);
  font-weight: 700;
  color: rgba(229,229,229,0.9);
  margin-bottom: 0;
`;

const CarouselScroll = styled.div`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: auto;
  padding: 2.5rem 0 5rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CarouselInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  padding-left: 1.25rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const CarouselCard = styled(motion.button)`
  border-radius: 24px;
  height: 320px;
  width: 224px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  background: #121218;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (min-width: 768px) { height: 40rem; width: 24rem; }
`;

const CarouselGradient = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  inset-x: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent, transparent);
  z-index: 30;
  pointer-events: none;
`;

const CarouselLabel = styled.p`
  position: relative;
  z-index: 40;
  padding: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-align: left;

  @media (min-width: 768px) { font-size: 1rem; }
`;

const CarouselCardTitle = styled.p`
  position: relative;
  z-index: 40;
  padding: 0 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  max-width: 300px;
  text-align: left;
  color: #fff;
  margin-top: 0.5rem;
  text-wrap: balance;

  @media (min-width: 768px) { font-size: 1.75rem; }
`;

const CarouselBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  overflow: hidden;
  border-radius: 24px;
`;

const CarouselBgImg = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.$bg || '#121218'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`;

const CarouselBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-right: 2.5rem;
  margin-top: -1rem;
`;

const CarouselBtn = styled.button`
  position: relative;
  z-index: 40;
  height: 40px; width: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

/* ══════════════════════════════════════════════════════
   4. WIDGETS — schedule + reminder + music + achievements
═══════════════════════════════════════════════════════ */
const WidgetsWrap = styled(motion.div)`
  position: relative;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

const WidgetGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

/* Schedule widget */
const ScheduleCard = styled.div`
  width: 100%;
  max-width: 288px;
  border-radius: 24px;
  background: rgba(0,255,153,0.15);
  border: 1px solid #00ff99;
  padding: 1rem;
`;

const ScheduleTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0;

  .time {
    font-size: 0.875rem;
    font-weight: 700;
    color: #fff;
  }
  .label {
    font-size: 0.75rem;
    color: rgba(163,163,163,0.8);
  }
`;

/* Reminder checklist */
const ReminderCard = styled.div`
  width: 100%;
  max-width: 288px;
  border-radius: 24px;
  background: #18181b;
  padding: 1rem;
  height: auto;
`;

const ReminderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  .title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #60a5fa;
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
  .count {
    width: 16px; height: 16px;
    background: #3f3f46;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: #60a5fa;
  }
`;

const ReminderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(55,55,65,0.7);
  padding: 0.375rem 0;
  cursor: pointer;

  input[type="checkbox"] {
    width: 12px; height: 12px;
    appearance: none;
    border-radius: 50%;
    border: 2px solid #3f3f46;
    background: ${p => p.$checked ? '#3b82f6' : 'transparent'};
    cursor: pointer;
    flex-shrink: 0;
  }

  p {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #fff;
  }
`;

/* Music player */
const MusicCard = styled.div`
  width: 100%;
  max-width: 288px;
  border-radius: 24px;
  background: linear-gradient(to bottom left, #c7d2fe, #4f46e5);
  padding: 1rem;
  color: #fff;
  height: 240px;
  display: flex;
  flex-direction: column;
`;

const MusicTop = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const MusicImg = styled.img`
  width: 80px; height: 80px;
  border-radius: 16px;
  object-fit: cover;
`;

const MusicTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MusicArtist = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #a5b4fc;
  margin-top: -1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MusicControls = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0;
    transition: opacity 0.15s ease;
    &:hover { opacity: 0.75; }
  }
`;

/* Achievement bars */
const AchieveCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 128px;
  height: 384px;
  border-radius: 8px;
  padding: 0.25rem;
`;

const AchieveBar = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  background: ${p => p.$color};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  overflow: visible;

  .count {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0.25rem;
    background: ${p => p.$color};
    border-radius: 4px;
    padding: 0.375rem 0.6rem;
    font-weight: 700;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .arrow {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 16px; height: 16px;
    background: ${p => p.$color};
    margin-left: 0.15rem;
  }
`;

/* ══════════════════════════════════════════════════════
   5. THANK YOU ENDING (exact from 69573)
═══════════════════════════════════════════════════════ */
const beamFall = keyframes`
  0%   { transform: translateY(-200px); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(1800px); opacity: 0; }
`;

const ThankWrap = styled.div`
  width: 100%;
  margin-top: 5rem;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f0e1a, #141420);
`;

const Beam = styled.div`
  position: absolute;
  left: ${p => p.$x}%;
  top: 5rem;
  width: 1px;
  height: 56px;
  border-radius: 9999px;
  background: linear-gradient(to bottom, #00ff99, rgba(0,255,153,0.5), transparent);
  animation: ${beamFall} ${p => p.$dur}s linear infinite;
  animation-delay: ${p => p.$delay}s;
  opacity: 0;
`;

const ThankContent = styled.div`
  position: relative;
  z-index: 20;
  text-align: center;
  padding: 4rem 2rem;
`;

const ThankTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
`;

const ThankYou = styled.div`
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: 700;
  background: linear-gradient(to right, #a855f7, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.025em;
`;

/* ══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const PERSONALITIES = ['Peaceful', 'Persistent', 'Clever', 'Curious', 'Disciplined', 'Modest'];

const HOBBIES = [
  {
    span: 4, right: true, nob: false,
    title: 'Morning Fitness & Volleyball',
    desc: "Led volleyball teams and organized tournaments. Morning workouts keep me mentally sharp and physically ready for the day.",
    bg: '#1a1a2e',
    emoji: '🏋️',
  },
  {
    span: 2, right: false, nob: false,
    title: 'Enjoyer of good books & research',
    desc: "I read research papers, tech blogs, and science books. Always expanding my mental model of the world.",
    bg: '#0d1b2a',
    emoji: '📚',
  },
  {
    span: 3, right: true, nob: true,
    title: 'Music & Guitar',
    desc: "I play guitar and enjoy a wide range of music — from lo-fi beats while coding to classical compositions.",
    bg: '#1a0a2e',
    emoji: '🎸',
  },
  {
    span: 3, right: false, nob: true,
    title: 'Dream of Becoming a Polyglot',
    desc: "Currently learning Japanese. Planning to study German and more languages. Each new language opens a new world.",
    bg: '#0a1a2e',
    emoji: '🌏',
  },
];

const CAROUSEL_ITEMS = [
  { category: 'Computer, IT', title: 'Interest, Work', bg: '#1a1a28', emoji: '💻' },
  { category: 'Sports', title: 'Volleyball, Gym', bg: '#1a2818', emoji: '🏐' },
  { category: 'Books', title: 'Fiction & Research', bg: '#2a1a18', emoji: '📖' },
  { category: 'Music', title: 'Guitar & Piano', bg: '#1a182a', emoji: '🎵' },
  { category: 'Foreign Languages', title: 'Learning Japanese', bg: '#181a2a', emoji: '🗣️' },
];

const SCHEDULE = [
  { time: '6:00 AM', label: 'Wake up & Morning run' },
  { time: '9:00 AM', label: 'University / Work' },
  { time: '5:00 PM', label: 'Gym / Volleyball' },
  { time: '7:00 PM', label: 'Projects & Research' },
  { time: '9:00 PM', label: 'Books & Learning' },
  { time: '11:00 PM', label: 'Sleep' },
];

const REMINDERS = [
  'Graduation', 'Land a data engineering role', 'Contribute to open source',
  'Build production ML system', 'Learn Japanese N2', 'Run half marathon',
  'Master guitar', 'Make family proud',
];

const ACHIEVEMENTS = [
  { label: 'Books read',     count: '+50',  color: '#3b82f6' },
  { label: 'Projects built', count: '+5',   color: '#a855f7' },
  { label: 'Tech mastered',  count: '+19',  color: '#ef4444' },
  { label: 'Papers read',    count: '+20',  color: '#22c55e' },
  { label: 'Kanji learned',  count: '+200', color: '#eab308' },
];

const BEAMS = [
  { x: 5,  dur: 7,  delay: 2  },
  { x: 20, dur: 3,  delay: 4  },
  { x: 35, dur: 7,  delay: 0  },
  { x: 50, dur: 5,  delay: 4  },
  { x: 65, dur: 11, delay: 2  },
  { x: 80, dur: 4,  delay: 0  },
  { x: 95, dur: 6,  delay: 2  },
];

/* ══════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════ */
const PersonalSection = () => {
  const [traitIdx, setTraitIdx] = useState(0);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Cycle personality traits
  useEffect(() => {
    const t = setInterval(() => {
      setTraitIdx(i => (i + 1) % PERSONALITIES.length);
    }, 2300);
    return () => clearInterval(t);
  }, []);

  const toggleItem = (item) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const onCarouselScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  }, []);

  const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 1.5, duration: 0.4, ease: 'easeIn' } } };

  return (
    <>
      {/* ── 1. INTRO ── */}
      <IntroWrap {...fadeIn}>
        <BigHello>
          Hello again? <br />
          My nickname is{' '}
          <span
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to bottom, #9ca3af, #fff)',
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
            <span className="label">✉️ Write a letter</span>
            <span className="emoji">✉️</span>
          </LetterBtn>
        </CenterBtn>
      </IntroWrap>

      {/* ── 2. FEATURED ME ── */}
      <FeaturedWrap {...fadeIn}>
        <FeaturedHeader>
          <FeaturedTitle>Pranab's Hobbies</FeaturedTitle>
          <FeaturedDesc>
            I like to stay active and keep learning. New interests are added almost every year.
          </FeaturedDesc>
        </FeaturedHeader>

        <BentoGrid>
          {HOBBIES.map((h, i) => (
            <BentoCell key={h.title} $span={h.span} $right={h.right} $nob={h.nob}>
              <CellImg
                src={profImg}
                alt=""
                style={{ display: i === 0 ? 'block' : 'none' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: h.bg, opacity: i === 0 ? 0.7 : 1 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '2rem', zIndex: 1 }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>{h.emoji}</span>
                <CellTitle>{h.title}</CellTitle>
                <CellDesc>{h.desc}</CellDesc>
              </div>
            </BentoCell>
          ))}
        </BentoGrid>
      </FeaturedWrap>

      {/* ── 3. CAROUSEL ── */}
      <CarouselWrap {...fadeIn}>
        <CarouselTitle>Components of Pranab's Life</CarouselTitle>
        <CarouselScroll ref={carouselRef} onScroll={onCarouselScroll}>
          <CarouselInner>
            {CAROUSEL_ITEMS.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * i, ease: 'easeOut' } }}
                viewport={{ once: true }}
                style={{ borderRadius: 24 }}
              >
                <CarouselCard>
                  <CarouselGradient />
                  <CarouselLabel>{item.category}</CarouselLabel>
                  <CarouselCardTitle>{item.title}</CarouselCardTitle>
                  <CarouselBg>
                    <CarouselBgImg $bg={item.bg}>
                      <span style={{ fontSize: '5rem', opacity: 0.4 }}>{item.emoji}</span>
                    </CarouselBgImg>
                  </CarouselBg>
                </CarouselCard>
              </motion.div>
            ))}
          </CarouselInner>
        </CarouselScroll>
        <CarouselBtns>
          <CarouselBtn
            disabled={!canScrollLeft}
            onClick={() => carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
          >
            ←
          </CarouselBtn>
          <CarouselBtn
            disabled={!canScrollRight}
            onClick={() => carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
          >
            →
          </CarouselBtn>
        </CarouselBtns>
      </CarouselWrap>

      {/* ── 4. WIDGETS ── */}
      <WidgetsWrap {...fadeIn}>
        <WidgetGrid>
          {/* Schedule */}
          <ScheduleCard>
            <ScheduleTitle>
              Daily routine
              <FaBell style={{ color: 'rgba(163,163,163,0.6)', fontSize: '1.1rem' }} />
            </ScheduleTitle>
            {SCHEDULE.map(s => (
              <ScheduleItem key={s.time}>
                <div>
                  <div className="time">{s.time}</div>
                  <div className="label">{s.label}</div>
                </div>
              </ScheduleItem>
            ))}
          </ScheduleCard>

          {/* Reminder */}
          <ReminderCard>
            <ReminderHeader>
              <div className="title">
                <FaBell size={14} color="#60a5fa" />
                Future plan
              </div>
              <div className="count">{REMINDERS.length - checkedItems.size}</div>
            </ReminderHeader>
            {REMINDERS.map(r => (
              <ReminderItem key={r} $checked={checkedItems.has(r)} onClick={() => toggleItem(r)}>
                <input type="checkbox" checked={checkedItems.has(r)} onChange={() => toggleItem(r)} />
                <p>{r}</p>
              </ReminderItem>
            ))}
          </ReminderCard>

          {/* Music + Achievements stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <MusicCard>
              <MusicTop>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <MusicImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ghibli.png/240px-Ghibli.png" alt="album" onError={e => { e.target.style.display='none'; }} />
                </div>
                <div>
                  <MusicTitle>Merry-Go-Round of Life</MusicTitle>
                  <MusicArtist>Howl's Moving Castle — Joe Hisaishi</MusicArtist>
                </div>
              </MusicTop>
              <MusicControls>
                <button><FaBackward /></button>
                <button><FaPlay /></button>
                <button><FaForward /></button>
              </MusicControls>
            </MusicCard>

            <AchieveCard>
              {ACHIEVEMENTS.map(a => (
                <AchieveBar key={a.label} $color={a.color}>
                  {a.label}
                  <span className="arrow" />
                  <span className="count">{a.count}</span>
                </AchieveBar>
              ))}
            </AchieveCard>
          </div>
        </WidgetGrid>
      </WidgetsWrap>

      {/* ── 5. THANK YOU ── */}
      <ThankWrap>
        {BEAMS.map((b, i) => (
          <Beam key={i} $x={b.x} $dur={b.dur} $delay={b.delay} />
        ))}
        <ThankContent>
          <ThankTitle>For visiting my profile</ThankTitle>
          <ThankYou>Thank you.</ThankYou>
        </ThankContent>
      </ThankWrap>
    </>
  );
};

export default PersonalSection;
