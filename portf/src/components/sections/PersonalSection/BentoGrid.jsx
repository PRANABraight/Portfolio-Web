import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LuBookOpen, LuGuitar, LuLandmark, LuVolleyball } from 'react-icons/lu';
import { PiPingPong } from 'react-icons/pi';
import { urlFor } from '../../../lib/sanity';
import { colors } from '../../../styles/theme';
import fitnessImg from '../../../assets/personal/fitness.webp';
import tableTennisImg from '../../../assets/personal/table-tennis.webp';
import booksImg from '../../../assets/personal/books.webp';
import guitarImg from '../../../assets/personal/guitar.webp';
import rootsImg from '../../../assets/personal/roots.webp';

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
  font-family: var(--font-display-personal);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 500;
  max-width: 900px;
  margin: 0 auto;
  letter-spacing: -0.03em;
  color: #fff;
  line-height: 1.25;
`;

const FeaturedDesc = styled.p`
  font-size: 0.875rem;
  max-width: 600px;
  margin: 1rem auto 0;
  font-weight: 400;
  color: ${colors.text2};
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem 2rem;
  margin-top: 3rem;
  padding: 3rem 2rem;
  background: ${colors.surface1Warm};
  border: 1px solid ${colors.border.default};
  border-radius: 8px;
`;

const BentoCell = styled.div`
  position: relative;
  width: 260px;
  background: #f5f0e8;
  padding: 0.75rem 0.75rem 0;
  border-radius: 2px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.45);
  transform: rotate(${p => p.$tilt}deg);
  transition: transform 0.3s ease;
  cursor: default;

  &:hover { transform: rotate(0deg) scale(1.03); z-index: 5; }
`;

const CellPhoto = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: ${colors.surface1Warm};
`;

const CellCaption = styled.div`
  padding: 0.85rem 0.25rem 1rem;
  text-align: center;
`;

const CellTitle = styled.p`
  font-family: var(--font-display-personal);
  font-style: italic;
  display: inline;
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: #2a2118;
`;

const CellDesc = styled.p`
  font-size: 0.75rem;
  color: rgba(42, 33, 24, 0.65);
  font-weight: 400;
  line-height: 1.5;
  margin-top: 0.35rem;
`;

const CellImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

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
    icon: <LuBookOpen />,
  },
  {
    span: 2, right: true, nob: true,
    key: 'tableTennis', img: tableTennisImg,
    title: 'Table Tennis',
    desc: "Fast rallies, quick reflexes. Table tennis is my go-to for a competitive break — always up for a match.",
    icon: <PiPingPong />,
  },
  {
    span: 2, right: true, nob: true,
    key: 'guitar', img: guitarImg,
    title: 'Music & Guitar',
    desc: "I play guitar and enjoy a wide range of music — from lo-fi beats while coding to classical compositions.",
    icon: <LuGuitar />,
  },
  {
    span: 2, right: false, nob: true,
    key: 'roots', img: rootsImg,
    title: 'Cultural History & Roots',
    desc: "I love tracing my cultural history and roots — the traditions, stories, and places my family comes from keep me grounded.",
    icon: <LuLandmark />,
  },
];

const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 1.5, duration: 0.4, ease: 'easeIn' } } };

// ponytail: fixed offsets, not random — deterministic layout, no re-render jitter
const TILTS = [-3, 2, -2, 3, -1.5];

const BentoGrid = ({ cmsPersonal }) => (
  <FeaturedWrap {...fadeIn}>
    <FeaturedHeader>
      <FeaturedTitle>Pranab's Hobbies</FeaturedTitle>
      <FeaturedDesc>
        I like to stay active and keep learning. New interests are added almost every year.
      </FeaturedDesc>
    </FeaturedHeader>

    <Grid>
      {HOBBIES.map((h, i) => {
        const cmsImage = cmsPersonal?.hobbyImages?.[h.key];
        const imgSrc = cmsImage ? urlFor(cmsImage).width(900).auto('format').fit('max').url() : h.img;
        return (
          <BentoCell key={h.title} $tilt={TILTS[i % TILTS.length]}>
            <CellPhoto>
              <CellImg src={imgSrc} alt={h.title} loading="lazy" />
            </CellPhoto>
            <CellCaption>
              <span style={{ color: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)', display: 'inline-flex', marginRight: '0.4rem', verticalAlign: 'middle' }}>{h.icon}</span>
              <CellTitle>{h.title}</CellTitle>
              <CellDesc>{h.desc}</CellDesc>
            </CellCaption>
          </BentoCell>
        );
      })}
    </Grid>
  </FeaturedWrap>
);

export default BentoGrid;
