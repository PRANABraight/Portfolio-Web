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
  font-family: var(--font-display);
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
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 3rem;
  border: 1px solid ${colors.border.default};
  border-radius: 8px;
  overflow: hidden;

  @media (min-width: 1024px) { grid-template-columns: repeat(6, 1fr); }
`;

const BentoCell = styled.div`
  padding: 2rem;
  height: 350px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid ${colors.border.default};

  @media (min-width: 1024px) {
    height: min(calc(100vh - 400px), 600px);
    border-bottom: ${p => p.$nob ? 'none' : `1px solid ${colors.border.default}`};
    border-right: ${p => p.$right ? `1px solid ${colors.border.default}` : 'none'};
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
  color: ${colors.text2};
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
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 100%);
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

const BentoGrid = ({ cmsPersonal }) => (
  <FeaturedWrap {...fadeIn}>
    <FeaturedHeader>
      <FeaturedTitle>Pranab's Hobbies</FeaturedTitle>
      <FeaturedDesc>
        I like to stay active and keep learning. New interests are added almost every year.
      </FeaturedDesc>
    </FeaturedHeader>

    <Grid>
      {HOBBIES.map(h => {
        const cmsImage = cmsPersonal?.hobbyImages?.[h.key];
        const imgSrc = cmsImage ? urlFor(cmsImage).width(900).auto('format').fit('max').url() : h.img;
        return (
          <BentoCell key={h.title} $span={h.span} $right={h.right} $nob={h.nob}>
            <CellImg src={imgSrc} alt={h.title} loading="lazy" />
            <CellScrim />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', zIndex: 1 }}>
              <span style={{ fontSize: '2rem', marginBottom: '0.75rem', color: colors.accent, display: 'inline-flex' }}>{h.icon}</span>
              <CellTitle>{h.title}</CellTitle>
              <CellDesc>{h.desc}</CellDesc>
            </div>
          </BentoCell>
        );
      })}
    </Grid>
  </FeaturedWrap>
);

export default BentoGrid;
