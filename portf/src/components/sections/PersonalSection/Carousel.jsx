import { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LuBookOpen, LuLandmark, LuMonitor, LuVolleyball, LuMusic } from 'react-icons/lu';
import lifeItImg from '../../../assets/personal/life-it.webp';
import lifeSportsImg from '../../../assets/personal/life-sports.webp';
import lifeBooksImg from '../../../assets/personal/life-books.webp';
import lifeMusicImg from '../../../assets/personal/life-music.webp';
import lifeHeritageImg from '../../../assets/personal/life-heritage.webp';
import { colors, typography } from '../../../styles/theme';

const CarouselWrap = styled(motion.div)`
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

const CarouselTitle = styled.h2`
  padding: 0 1.25rem;
  font-size: clamp(1.3rem, 4vw, 3rem);
  font-weight: 700;
  color: ${colors.text2};
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
  background: ${colors.surface1Warm};
  border: none;
  cursor: pointer;
  padding: 0;

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 14px;
    background-image: radial-gradient(circle at 7px 7px, transparent 3px, rgba(0,0,0,0.55) 3px);
    background-size: 14px 14px;
    z-index: 45;
    pointer-events: none;
  }
  &::before { top: 0; }
  &::after { bottom: 0; }

  @media (min-width: 768px) { height: 40rem; width: 24rem; }
`;

const CarouselFrameNo = styled.span`
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 40;
  font-family: ${typography.fontFamily.mono};
  font-size: 0.7rem;
  color: ${p => p.$alt ? 'var(--accent-2)' : 'var(--accent)'};
  letter-spacing: 0.05em;
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
  background: ${p => p.$bg || colors.surface1};
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
  background: linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 100%);
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
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.bg};
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const CAROUSEL_ITEMS = [
  { category: 'Computer, IT', title: 'Interest, Work', bg: colors.surface1Warm, icon: <LuMonitor />, img: lifeItImg },
  { category: 'Sports', title: 'Volleyball and Table Tennis', bg: colors.surface1Warm, icon: <LuVolleyball />, img: lifeSportsImg },
  { category: 'Books', title: 'Fiction & Research', bg: colors.surface1Warm, icon: <LuBookOpen />, img: lifeBooksImg },
  { category: 'Music', title: 'Guitar & Piano', bg: colors.surface1Warm, icon: <LuMusic />, img: lifeMusicImg },
  { category: 'Heritage', title: 'Culture & Roots', bg: colors.surface1Warm, icon: <LuLandmark />, img: lifeHeritageImg },
];

const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 1.5, duration: 0.4, ease: 'easeIn' } } };

const Carousel = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const onCarouselScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  }, []);

  return (
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
                <CarouselFrameNo $alt={i % 2 === 1}>{String(i + 1).padStart(2, '0')}</CarouselFrameNo>
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
  );
};

export default Carousel;
