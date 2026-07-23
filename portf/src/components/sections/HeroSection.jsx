import { createElement, useRef } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap, useGSAP, OK } from '../../lib/motion';
import { FaArrowRight } from 'react-icons/fa';
import resumePDF from '../../assets/Pranab_Rai_da (1).pdf';
import profImg from '../../assets/prof.webp';
import Spotlight from '../Spotlight';
import FloatingOrbs from '../common/FloatingOrbs';
import { colors, accentVars } from '../../styles/theme';
import { getIcon } from '../../lib/iconMap';
import { SOCIALS } from '../common/socials';
import { urlFor } from '../../lib/sanity';

/* ── layout ── */
const Section = styled.section`
  ${accentVars('hero')}
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem;

  @media (min-width: 640px) { padding: 0 2.5rem; }
  position: relative;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;

  @media (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
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
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #fff;
  margin-bottom: 1.5rem;

  @media (min-width: 1280px) { font-size: 80px; }
  @media (max-width: 480px)  { font-size: 32px; }
`;

const AccentName = styled.span`
  color: var(--accent);
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: default;

  .text {
    position: relative;
    z-index: 1;
    transition: color 0.5s ease;
    display: inline-block;
    color: var(--accent);
  }

  .bg-slide {
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
    z-index: 0;
  }

  &:hover .bg-slide { transform: scaleX(1); }
  &:hover .text { color: ${colors.bg}; }
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

/* outline CV button — accent fills from the left on hover */
const OutlineBtn = styled(motion.a)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 56px;
  padding: 0 2rem;
  border: 1px solid var(--accent);
  border-radius: 9999px;
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  overflow: hidden;
  transition: color 0.25s ease, box-shadow 0.25s ease;
  width: 100%;
  max-width: 220px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  > * { position: relative; z-index: 1; }

  svg { transition: transform 0.25s ease; }

  &:hover {
    color: ${colors.bg};
    box-shadow: 0 8px 32px rgba(var(--accent-rgb), 0.3);

    &::before { transform: scaleX(1); }
    svg { transform: translateX(4px); }
  }
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
  border: 1px solid var(--accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background: var(--accent);
    color: ${colors.bg};
    box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.35);
  }
`;

/* ── RIGHT: photo ── */
const PhotoSide = styled(motion.div)`
  order: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1280px) { order: 2; flex-shrink: 0; }
`;

const PhotoFrame = styled(motion.div)`
  position: relative;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoInner = styled.div`
  width: 298px; height: 298px;
  border-radius: 50%;
  padding: 3px;
  box-shadow: 0 8px 24px rgba(var(--accent-rgb),0.25);
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

const SOCIALS_FALLBACK = SOCIALS.map(s => ({ icon: createElement(getIcon(s.iconName)), href: s.href, label: s.label }));

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
  const scope = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(OK, () => {
      // Entrance: staged reveal right after the page-transition sweep clears
      gsap.timeline({ delay: 0.55, defaults: { ease: 'power2.out', duration: 0.45 } })
        .from('.hero-role', { y: 16, autoAlpha: 0 })
        .from('.hero-name', { y: 24, autoAlpha: 0 }, '-=0.25')
        .from('.hero-desc', { y: 16, autoAlpha: 0 }, '-=0.25')
        .from('.hero-actions', { y: 16, autoAlpha: 0 }, '-=0.25')
        .from('.hero-photo', { autoAlpha: 0, scale: 0.97, duration: 0.55 }, '-=0.35');

      // Depth as the hero scrolls away
      const scrollOut = {
        trigger: scope.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      };
      gsap.to('.hero-photo', { yPercent: -6, ease: 'none', scrollTrigger: scrollOut });
      gsap.to('.hero-spotlight', { yPercent: 12, autoAlpha: 0.4, ease: 'none', scrollTrigger: scrollOut });
    });
  }, { scope });

  return (
    <Section id="home" ref={scope}>
      <Spotlight className="hero-spotlight" />
      {/* amber orbs + one orange, foreshadowing the next section hue */}
      <FloatingOrbs count={3} rgbs={[null, '249, 115, 22']} />
      <Inner>
        {/* ── Text ── */}
        <TextSide>
          <RoleLabel className="hero-role">{roleLabel}</RoleLabel>

          <NameHeading className="hero-name">
            Hello I'm{' '}<br />
            <AccentName title={heroName}>
              <span className="text">
                {firstName}{lastName ? <>{' '}<br />{lastName}</> : null}
              </span>
              <span className="bg-slide" />
            </AccentName>
          </NameHeading>

          <Description className="hero-desc">{description}</Description>

          <Actions className="hero-actions">
            <OutlineBtn
              href={resumeHref}
              download="Pranab_Rai_Resume.pdf"
              target={cmsHero?.resumeUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <span>View CV</span> <FaArrowRight size={12} />
            </OutlineBtn>

            <Socials>
              {socials.map(s => (
                <SIcon
                  key={s.label}
                  href={s.href}
                  target={s.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 15 }}
                >
                  {s.icon}
                </SIcon>
              ))}
            </Socials>
          </Actions>
        </TextSide>

        {/* ── Photo ── */}
        <PhotoSide className="hero-photo">
          <PhotoFrame
            whileHover={{ scale: 1.01 }}
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
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: '24 10 0 0' }}
                animate={reduced ? { strokeDasharray: '15 120 25 25' } : {
                  strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'],
                  rotate: [120, 360],
                }}
                transition={reduced ? { duration: 0 } : { duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              />
            </svg>

          </PhotoFrame>
        </PhotoSide>
      </Inner>
    </Section>
  );
};

export default HeroSection;
