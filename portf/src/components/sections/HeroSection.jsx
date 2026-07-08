import { createElement } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import resumePDF from '../../assets/Pranab_Rai_da (1).pdf';
import profImg from '../../assets/prof.webp';
import Spotlight from '../Spotlight';
import { getIcon } from '../../lib/iconMap';
import { urlFor } from '../../lib/sanity';

/* ── layout ── */
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 1.25rem 2rem;

  @media (min-width: 640px) { padding: 80px 2.5rem 2rem; }
  position: relative;
`;

const Inner = styled.div`
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0 4rem;

  @media (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
    padding: 2rem 0 6rem;
  }
`;

/* ── LEFT: text ── */
const TextSide = styled(motion.div)`
  text-align: center;
  order: 2;

  @media (min-width: 1280px) {
    text-align: left;
    order: 1;
    flex: 1;
  }
`;

const RoleLabel = styled.span`
  display: block;
  font-size: 1.25rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1.5rem;
`;

const NameHeading = styled.h1`
  font-family: 'JetBrains Mono', monospace;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 1.5rem;

  @media (min-width: 1280px) { font-size: 80px; }
  @media (max-width: 480px)  { font-size: 32px; }
`;

const AccentName = styled.span`
  color: #00ff99;
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: default;

  .text {
    position: relative;
    z-index: 1;
    transition: color 0.5s ease;
    display: inline-block;
  }

  .bg-slide {
    position: absolute;
    inset: 0;
    background: #00ff99;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
    z-index: 0;
  }

  &:hover .bg-slide { transform: scaleX(1); }
  &:hover .text { color: #0f0e1a; }
`;

const Description = styled.p`
  max-width: 500px;
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
  line-height: 1.625;
  margin: 0 auto 2.25rem;

  @media (min-width: 1280px) { margin: 0 0 2rem; }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

/* outline CV button — Radnaabazar style */
const OutlineBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 56px;
  padding: 0 2rem;
  border: 1px solid #00ff99;
  border-radius: 9999px;
  color: #00ff99;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
  width: 100%;
  max-width: 220px;

  &:hover { background: #00ff99; color: #0f0e1a; }
  @media (min-width: 1280px) { width: auto; }
`;

/* social icons row */
const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SIcon = styled(motion.a)`
  width: 36px; height: 36px;
  border: 1px solid #00ff99;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #00ff99;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover { background: #00ff99; color: #0f0e1a; }
`;

/* ── RIGHT: photo ── */
const PhotoSide = styled(motion.div)`
  order: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1280px) { order: 2; flex-shrink: 0; }
`;

const PhotoButton = styled(motion.button)`
  position: relative;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible { outline: 2px solid #00ff99; outline-offset: 8px; }
`;

const PhotoInner = styled.div`
  width: 298px; height: 298px;
  border-radius: 50%;
  padding: 3px;
  box-shadow: 0 8px 24px rgba(0,255,153,0.25);
  position: relative;
  z-index: 1;

  @media (min-width: 1280px) { width: 498px; height: 498px; }
`;

const PhotoCircle = styled.div`
  width: 100%; height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const Photo = styled(motion.img)`
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 50%;
`;

const PhotoCaption = styled.span`
  pointer-events: none;
  position: absolute;
  left: 50%; bottom: 6%;
  transform: translateX(-50%);
  border-radius: 9999px;
  background: rgba(0,0,0,0.5);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  opacity: 0;
  backdrop-filter: blur(4px);
  transition: opacity 0.3s ease;
  white-space: nowrap;

  ${PhotoButton}:hover & { opacity: 1; }
`;

/* ── SOCIALS fallback ── */
const SOCIALS_FALLBACK = [
  { icon: <FaGithub />, href: 'https://github.com/PRANABraight', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/pranab-rai-924b6731b/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://instagram.com/pranabrai1/', label: 'Instagram' },
  { icon: <FaEnvelope />, href: 'mailto:pranabrai137@gmail.com', label: 'Email' },
];

const HeroSection = ({ cmsHero }) => {
  const resumeHref = cmsHero?.resumeUrl || resumePDF;
  const roleLabel = cmsHero?.roleLabel || 'Data Engineer & ML Engineer';
  const heroName = cmsHero?.name || 'Pranab Rai';
  const description = cmsHero?.description || 'Pragmatic, delivery-oriented Data & ML Engineer | Python, SQL, Cloud & AI Engineering | Bengaluru, India';
  const photoSrc = cmsHero?.profileImage
    ? urlFor(cmsHero.profileImage).width(600).auto('format').url()
    : profImg;

  const socials = cmsHero?.socials?.length
    ? cmsHero.socials.map(s => ({
        icon: createElement(getIcon(s.iconName)),
        href: s.url,
        label: s.label,
      }))
    : SOCIALS_FALLBACK;

  const [firstName, ...rest] = heroName.split(' ');
  const lastName = rest.join(' ');

  return (
    <Section id="home">
      <Spotlight />
      <Inner>
        {/* ── Text ── */}
        <TextSide
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: 'easeInOut' } }}
        >
          <RoleLabel>{roleLabel}</RoleLabel>

          <NameHeading>
            Hello I'm{' '}<br />
            <AccentName title={heroName}>
              <span className="text">
                {firstName}{lastName ? <>{' '}<br />{lastName}</> : null}
              </span>
              <span className="bg-slide" />
            </AccentName>
          </NameHeading>

          <Description>{description}</Description>

          <Actions>
            <OutlineBtn
              href={resumeHref}
              download="Pranab_Rai_Resume.pdf"
              target={cmsHero?.resumeUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
            >
              View CV <FaArrowRight size={12} />
            </OutlineBtn>

            <Socials>
              {socials.map(s => (
                <SIcon
                  key={s.label}
                  href={s.href}
                  target={s.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileTap={{ scale: 0.92 }}
                >
                  {s.icon}
                </SIcon>
              ))}
            </Socials>
          </Actions>
        </TextSide>

        {/* ── Photo ── */}
        <PhotoSide
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeInOut' } }}
        >
          <PhotoButton
            aria-label="Profile photo"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <PhotoInner>
              <PhotoCircle>
                <Photo
                  src={photoSrc}
                  alt={heroName}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </PhotoCircle>
            </PhotoInner>

            {/* Animated SVG dashed ring */}
            <svg
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
              }}
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="253" cy="253" r="250"
                stroke="#00ff99"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: '24 10 0 0' }}
                animate={{
                  strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'],
                  rotate: [120, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              />
            </svg>

            <PhotoCaption>click to view ↗</PhotoCaption>
          </PhotoButton>
        </PhotoSide>
      </Inner>
    </Section>
  );
};

export default HeroSection;
