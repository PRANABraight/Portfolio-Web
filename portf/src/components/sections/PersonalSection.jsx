// Personal page — exact match to radnaabazar.com/en/personal
import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaForward, FaBackward, FaMusic } from 'react-icons/fa';
import {
  LuBookOpen, LuGuitar, LuLandmark, LuMonitor,
  LuVolleyball, LuMusic, LuMail, LuHeart, LuRocket,
} from 'react-icons/lu';
import { PiPingPong } from 'react-icons/pi';
import { urlFor } from '../../lib/sanity';
import { ScrollTrigger } from '../../lib/motion';
import { colors, typography } from '../../styles/theme';
import fitnessImg from '../../assets/personal/fitness.webp';
import tableTennisImg from '../../assets/personal/table-tennis.webp';
import booksImg from '../../assets/personal/books.webp';
import guitarImg from '../../assets/personal/guitar.webp';
import rootsImg from '../../assets/personal/roots.webp';
import lifeItImg from '../../assets/personal/life-it.webp';
import lifeSportsImg from '../../assets/personal/life-sports.webp';
import lifeBooksImg from '../../assets/personal/life-books.webp';
import lifeMusicImg from '../../assets/personal/life-music.webp';
import lifeHeritageImg from '../../assets/personal/life-heritage.webp';

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
  background: linear-gradient(to bottom, #a8a29e, #ffffff);
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
  color: #ff8a5c;
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
  color: rgba(214,211,209,0.8);
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 3rem;
  border: 1px solid rgba(68,64,60,0.5);
  border-radius: 8px;
  overflow: hidden;

  @media (min-width: 1024px) { grid-template-columns: repeat(6, 1fr); }
`;

const BentoCell = styled.div`
  padding: 2rem;
  height: 350px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(68,64,60,0.5);

  @media (min-width: 1024px) {
    height: min(calc(100vh - 400px), 600px);
    border-bottom: ${p => p.$nob ? 'none' : '1px solid rgba(68,64,60,0.5)'};
    border-right: ${p => p.$right ? '1px solid rgba(68,64,60,0.5)' : 'none'};
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
  color: rgba(214,211,209,0.7);
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
  background: linear-gradient(to top, rgba(16,11,8,0.9) 0%, rgba(16,11,8,0.45) 45%, rgba(16,11,8,0.15) 100%);
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
  color: rgba(231,229,228,0.9);
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
  background: #161210;
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
  background: ${p => p.$bg || '#161210'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`;

const CarouselPhoto = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;

  ${CarouselCard}:hover & { transform: scale(1.04); }
`;

/* darkens the photo so the label/title stay readable */
const CarouselShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(16,11,8,0.75) 0%, rgba(16,11,8,0.25) 45%, rgba(16,11,8,0.55) 100%);
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
  background: #f5f5f4;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #78716c;
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

const WidgetTitle = styled.h3`
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  color: #fff;
  text-align: center;
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
  background: #1a1614;
  border: 1px solid rgba(255,255,255,0.07);
  padding: 1.25rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.25s ease;

  &:hover { background: #221c18; }
`;

const MusicImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  object-fit: cover;
`;

const MusicDisc = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2e211a, #1c1512);
  color: ${colors.accent};
  font-size: 3.5rem;
`;

const MusicMeta = styled.div`
  .title {
    font-size: 1.35rem;
    font-weight: 700;
  }
  .artist {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.55);
    margin-top: 0.3rem;
  }
`;

const MusicControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease, transform 0.1s ease;

    &:hover { color: #fff; }
    &:active { transform: scale(0.94); }
  }

  a.play {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: #1db954;
    color: #14100d;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    &:hover { transform: scale(1.07); }
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
  background: linear-gradient(to bottom, #14100d, #1a1410);
`;

const Beam = styled.div`
  position: absolute;
  left: ${p => p.$x}%;
  top: 5rem;
  width: 1px;
  height: 56px;
  border-radius: 9999px;
  background: linear-gradient(to bottom, #ff8a5c, rgba(255,138,92,0.5), transparent);
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
  background: linear-gradient(to right, #f59e0b, #fb923c, #ff8a5c);
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
    title: 'Volleyball',
    desc: "Enjoy playing Volleyball. Led volleyball teams and organized tournaments.",
    icon: <LuVolleyball />,
  },
  {
    span: 2, right: false, nob: false,
    key: 'books', img: booksImg,
    title: 'Enjoyer of good books & research',
    desc: "I enjoy reading fiction, non-fiction, research papers, tech blogs, and science books. Always expanding my mental model of the world.",
    icon: '📚',
  },
  {
    span: 2, right: true, nob: true,
    key: 'tableTennis', img: tableTennisImg,
    title: 'Table Tennis',
    desc: "Fast rallies, quick reflexes. Table tennis is my go-to for a competitive break — always up for a match.",
    icon: '🏓',
  },
  {
    span: 2, right: true, nob: true,
    key: 'guitar', img: guitarImg,
    title: 'Music & Guitar',
    desc: "I play guitar and enjoy a wide range of music — from lo-fi beats while coding to classical compositions.",
    icon:  '🎸',
  },
  {
    span: 2, right: false, nob: true,
    key: 'roots', img: rootsImg,
    title: 'Cultural History & Roots',
    desc: "I love tracing my cultural history and roots — the traditions, stories, and places my family comes from keep me grounded.",
    icon: <LuLandmark />,
  },
];

const CAROUSEL_ITEMS = [
  { category: 'Computer, IT', title: 'Interest, Work', bg: '#1a1410', icon: <LuMonitor />, img: lifeItImg },
  { category: 'Sports', title: 'Volleyball and Table Tennis', bg: '#1c1810', icon: <LuVolleyball />, img: lifeSportsImg },
  { category: 'Books', title: 'Fiction & Research', bg: '#221410', icon: <LuBookOpen />, img: lifeBooksImg },
  { category: 'Music', title: 'Guitar & Piano', bg: '#1c1210', icon: <LuMusic />, img: lifeMusicImg },
  { category: 'Heritage', title: 'Culture & Roots', bg: '#1a1310', icon: <LuLandmark />, img: lifeHeritageImg },
];

const FALLBACK_SONG = {
  title: 'Merry-Go-Round of Life',
  artist: "Joe Hisaishi — Howl's Moving Castle",
  albumArt: null,
  spotifyUrl: null,
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
const MusicPlayer = ({ songs }) => {
  const list = songs?.length ? songs : [FALLBACK_SONG];
  const [idx, setIdx] = useState(0);
  // album art from Spotify's oEmbed endpoint, keyed by song URL (null = fetch failed)
  const [spotifyArt, setSpotifyArt] = useState({});

  const song = list[idx];

  useEffect(() => {
    if (song.albumArt || !song.spotifyUrl) return;
    if (spotifyArt[song.spotifyUrl] !== undefined) return;
    let cancelled = false;
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(song.spotifyUrl)}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (!cancelled) {
          setSpotifyArt(m => ({ ...m, [song.spotifyUrl]: d?.thumbnail_url || null }));
        }
      })
      .catch(() => {
        if (!cancelled) setSpotifyArt(m => ({ ...m, [song.spotifyUrl]: null }));
      });
    return () => { cancelled = true; };
  }, [song.albumArt, song.spotifyUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  const artUrl = song.albumArt
    ? urlFor(song.albumArt).width(800).height(800).auto('format').url()
    : spotifyArt[song.spotifyUrl] || null;

  const goTo = (nextIdx) => setIdx(((nextIdx % list.length) + list.length) % list.length);

  return (
    <MusicCard>
      {artUrl
        ? <MusicImg src={artUrl} alt={`${song.title} album art`} />
        : <MusicDisc aria-hidden="true"><FaMusic /></MusicDisc>}

      <MusicMeta>
        <p className="title">{song.title}</p>
        <p className="artist">{song.artist}</p>
      </MusicMeta>

      <MusicControls>
        {list.length > 1 && (
          <button onClick={() => goTo(idx - 1)} aria-label="Previous song">
            <FaBackward />
          </button>
        )}
        {song.spotifyUrl && (
          <a
            className="play"
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play ${song.title} on Spotify`}
          >
            <FaPlay style={{ marginLeft: 3 }} />
          </a>
        )}
        {list.length > 1 && (
          <button onClick={() => goTo(idx + 1)} aria-label="Next song">
            <FaForward />
          </button>
        )}
      </MusicControls>

      {!song.spotifyUrl && <MusicHint>add Spotify links in Sanity Studio to enable playback</MusicHint>}
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

  // Lazy-loaded chunk mounts after App's mode-change refresh has already
  // fired; re-measure once our layout exists.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

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
          My name is{' '}
          <span
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to bottom, #a8a29e, #fff)',
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
            const imgSrc = cmsImage ? urlFor(cmsImage).width(900).auto('format').fit('max').url() : h.img;
            return (
              <BentoCell key={h.title} $span={h.span} $right={h.right} $nob={h.nob}>
                <CellImg src={imgSrc} alt={h.title} loading="lazy" />
                <CellScrim />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', zIndex: 1 }}>
                  <span style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#ff8a5c', display: 'inline-flex' }}>{h.icon}</span>
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
                      <span style={{ fontSize: '4rem', opacity: 0.4, color: '#fff', display: 'inline-flex' }}>{item.icon}</span>
                    </CarouselBgImg>
                    <CarouselPhoto src={item.img} alt={item.title} loading="lazy" />
                    <CarouselShade />
                  </CarouselBg>
                </CarouselCard>
              </motion.div>
            ))}
          </CarouselInner>
        </CarouselScroll>
        <CarouselBtns>
          <CarouselBtn
            aria-label="Previous photo"
            disabled={!canScrollLeft}
            onClick={() => carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
          >
            ←
          </CarouselBtn>
          <CarouselBtn
            aria-label="Next photo"
            disabled={!canScrollRight}
            onClick={() => carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
          >
            →
          </CarouselBtn>
        </CarouselBtns>
      </CarouselWrap>

      {/* ── 4. MUSIC ── */}
      <WidgetsWrap {...fadeIn}>
        <WidgetTitle>Music that I enjoy 🎶</WidgetTitle>
        <WidgetGrid>
          <MusicPlayer songs={cmsPersonal?.songs || []} />
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
