// Personal page — exact match to radnaabazar.com/en/personal
import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaForward, FaBackward, FaMusic } from 'react-icons/fa';
import { urlFor } from '../../lib/sanity';
import { colors, typography } from '../../styles/theme';
import fitnessImg from '../../assets/personal/fitness.jpg';
import tableTennisImg from '../../assets/personal/table-tennis.jpg';
import booksImg from '../../assets/personal/books.jpg';
import guitarImg from '../../assets/personal/guitar.jpg';
import rootsImg from '../../assets/personal/roots.jpg';

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
  opacity: 0.5;
  z-index: 0;
`;

/* bottom-heavy scrim keeps title/desc readable over the photo */
const CellScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,16,0.9) 0%, rgba(10,9,16,0.45) 45%, rgba(10,9,16,0.15) 100%);
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

/* Music player — Spotify-style card */
const MusicCard = styled.div`
  width: 100%;
  max-width: 380px;
  border-radius: 16px;
  background: #181818;
  border: 1px solid rgba(255,255,255,0.07);
  padding: 1.25rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.25s ease;

  &:hover { background: #202020; }
`;

const MusicTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const MusicImg = styled.img`
  width: 64px; height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const MusicDisc = styled.div`
  width: 64px; height: 64px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2a2840, #16142a);
  color: ${colors.accent};
  font-size: 1.4rem;
`;

const MusicMeta = styled.div`
  min-width: 0;

  .title {
    font-size: 0.95rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .artist {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.55);
    margin-top: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .time {
    font-family: ${typography.fontFamily.mono};
    font-size: 0.625rem;
    color: rgba(255,255,255,0.45);
    min-width: 30px;
    text-align: center;
  }
`;

const ProgressTrack = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.15);
  cursor: ${p => p.$seekable ? 'pointer' : 'default'};
  position: relative;

  &:hover > div { background: ${colors.accent}; }
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background: #fff;
  width: ${p => p.$pct}%;
  transition: background 0.15s ease;
`;

const MusicControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;

  button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) { color: #fff; }
    &:active:not(:disabled) { transform: scale(0.94); }
    &:disabled { opacity: 0.3; cursor: not-allowed; }
  }

  .play {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: ${colors.accent};
    color: #0f0e1a;
    font-size: 0.85rem;

    &:hover:not(:disabled) { color: #0f0e1a; transform: scale(1.05); }
  }
`;

const MusicHint = styled.p`
  font-family: ${typography.fontFamily.mono};
  font-size: 0.625rem;
  color: rgba(255,255,255,0.35);
  text-align: center;
  margin: 0;
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
    key: 'fitness', img: fitnessImg,
    title: 'Morning Fitness & Volleyball',
    desc: "Led volleyball teams and organized tournaments. Morning workouts keep me mentally sharp and physically ready for the day.",
    emoji: '🏋️',
  },
  {
    span: 2, right: false, nob: false,
    key: 'books', img: booksImg,
    title: 'Enjoyer of good books & research',
    desc: "I read research papers, tech blogs, and science books. Always expanding my mental model of the world.",
    emoji: '📚',
  },
  {
    span: 2, right: true, nob: true,
    key: 'tableTennis', img: tableTennisImg,
    title: 'Table Tennis',
    desc: "Fast rallies, quick reflexes. Table tennis is my go-to for a competitive break — always up for a match.",
    emoji: '🏓',
  },
  {
    span: 2, right: true, nob: true,
    key: 'guitar', img: guitarImg,
    title: 'Music & Guitar',
    desc: "I play guitar and enjoy a wide range of music — from lo-fi beats while coding to classical compositions.",
    emoji: '🎸',
  },
  {
    span: 2, right: false, nob: true,
    key: 'roots', img: rootsImg,
    title: 'Cultural History & Roots',
    desc: "I love tracing my cultural history and roots — the traditions, stories, and places my family comes from keep me grounded.",
    emoji: '🛕',
  },
];

const CAROUSEL_ITEMS = [
  { category: 'Computer, IT', title: 'Interest, Work', bg: '#1a1a28', emoji: '💻' },
  { category: 'Sports', title: 'Volleyball, Table Tennis, Gym', bg: '#1a2818', emoji: '🏐' },
  { category: 'Books', title: 'Fiction & Research', bg: '#2a1a18', emoji: '📖' },
  { category: 'Music', title: 'Guitar & Piano', bg: '#1a182a', emoji: '🎵' },
  { category: 'Heritage', title: 'Culture & Roots', bg: '#181a2a', emoji: '🛕' },
];

const FALLBACK_SONG = {
  title: 'Merry-Go-Round of Life',
  artist: "Joe Hisaishi — Howl's Moving Castle",
  albumArt: null,
  audioUrl: null,
};

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
   MUSIC PLAYER — songs come from Sanity (personal.songs)
═══════════════════════════════════════════════════════ */
const fmtTime = (s) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const MusicPlayer = ({ songs }) => {
  const list = songs?.length ? songs : [FALLBACK_SONG];
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const trackRef = useRef(null);

  const song = list[idx];
  const hasAudio = !!song.audioUrl;
  const artUrl = song.albumArt ? urlFor(song.albumArt).width(200).height(200).url() : null;

  const goTo = (nextIdx) => {
    setIdx(((nextIdx % list.length) + list.length) % list.length);
    setProgress(0);
    setDuration(0);
  };

  // keep playback going across track changes
  useEffect(() => {
    const el = audioRef.current;
    if (el && playing && hasAudio) el.play().catch(() => setPlaying(false));
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el || !hasAudio) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  };

  const seek = (e) => {
    const el = audioRef.current;
    const track = trackRef.current;
    if (!el || !track || !duration) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    el.currentTime = pct * duration;
    setProgress(pct * duration);
  };

  return (
    <MusicCard>
      {hasAudio && (
        <audio
          ref={audioRef}
          src={song.audioUrl}
          preload="metadata"
          onTimeUpdate={e => setProgress(e.target.currentTime)}
          onLoadedMetadata={e => setDuration(e.target.duration)}
          onEnded={() => goTo(idx + 1)}
        />
      )}

      <MusicTop>
        {artUrl
          ? <MusicImg src={artUrl} alt={`${song.title} album art`} />
          : <MusicDisc aria-hidden="true"><FaMusic /></MusicDisc>}
        <MusicMeta>
          <p className="title">{song.title}</p>
          <p className="artist">{song.artist}</p>
        </MusicMeta>
      </MusicTop>

      <ProgressRow>
        <span className="time">{fmtTime(progress)}</span>
        <ProgressTrack ref={trackRef} $seekable={hasAudio} onClick={seek}>
          <ProgressFill $pct={duration ? (progress / duration) * 100 : 0} />
        </ProgressTrack>
        <span className="time">{fmtTime(duration)}</span>
      </ProgressRow>

      <MusicControls>
        <button
          onClick={() => goTo(idx - 1)}
          disabled={list.length < 2}
          aria-label="Previous song"
        >
          <FaBackward />
        </button>
        <button
          className="play"
          onClick={togglePlay}
          disabled={!hasAudio}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <FaPause /> : <FaPlay style={{ marginLeft: 2 }} />}
        </button>
        <button
          onClick={() => goTo(idx + 1)}
          disabled={list.length < 2}
          aria-label="Next song"
        >
          <FaForward />
        </button>
      </MusicControls>

      {!hasAudio && <MusicHint>add songs in Sanity Studio to enable playback</MusicHint>}
    </MusicCard>
  );
};

/* ══════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════ */
const PersonalSection = ({ cmsPersonal }) => {
  const [traitIdx, setTraitIdx] = useState(0);
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
          {HOBBIES.map(h => {
            const cmsImage = cmsPersonal?.hobbyImages?.[h.key];
            const imgSrc = cmsImage ? urlFor(cmsImage).width(900).url() : h.img;
            return (
              <BentoCell key={h.title} $span={h.span} $right={h.right} $nob={h.nob}>
                <CellImg src={imgSrc} alt="" loading="lazy" />
                <CellScrim />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', zIndex: 1 }}>
                  <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{h.emoji}</span>
                  <CellTitle>{h.title}</CellTitle>
                  <CellDesc>{h.desc}</CellDesc>
                </div>
              </BentoCell>
            );
          })}
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

      {/* ── 4. MUSIC ── */}
      <WidgetsWrap {...fadeIn}>
        <WidgetGrid>
          <MusicPlayer songs={cmsPersonal?.songs} />
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
