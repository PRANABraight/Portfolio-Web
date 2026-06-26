// Contact/Footer CTA — exact match to radnaabazar.com component 30836
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const spinConic = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;

const Wrap = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 2.5rem;
`;

/* footer-grid SVG effect — exact match to radna's /footer-grid.svg */
const FooterBg = styled.div`
  position: absolute;
  left: 0;
  bottom: -18rem;
  width: 100%;
  min-height: 24rem;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(to top, black 0%, transparent 80%);
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 80%);
  opacity: 0.5;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (min-width: 640px) { padding: 0 2.5rem; }
  position: relative;
  z-index: 10;
`;

/* CTA block */
const CtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const Heading = styled.h1`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  text-align: center;
  max-width: 45vw;
  min-width: 280px;
  line-height: 1.15;

  span { color: #00ff99; }

  @media (max-width: 768px) { max-width: 90vw; }
`;

const CtaDesc = styled.p`
  color: rgba(255,255,255,0.8);
  margin: 2.5rem 0 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.625;
  max-width: 520px;
`;

/* Shiny animated button (exact from source component 24750) */
const ShinyBtn = styled(motion.a)`
  position: relative;
  display: inline-flex;
  height: 48px;
  width: 100%;
  max-width: 240px;
  overflow: hidden;
  border-radius: 8px;
  padding: 1px;
  text-decoration: none;
`;

const Spinner = styled.span`
  position: absolute;
  inset: -1000%;
  animation: ${spinConic} 2s linear infinite;
  background: conic-gradient(from 90deg at 50% 50%, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%);
`;

const ShinyLabel = styled.span`
  display: inline-flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #0f0e1a;
  padding: 0 1.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  gap: 0.5rem;
  letter-spacing: 0.025em;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.1);
  width: 100%;
  margin: 3rem 0 1.5rem;
`;

/* "See my personal Side" outline button */
const PersonalBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 1.5rem;
  border-radius: 9999px;
  border: 1px solid #00ff99;
  background: transparent;
  color: #00ff99;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover { background: #00ff99; color: #0f0e1a; border-color: #00ff99; }
`;

/* Bottom row */
const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: 4rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NameLabel = styled.p`
  font-size: 0.875rem;
  color: rgba(255,255,255,0.8);
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SocialBtn = styled(motion.a)`
  width: 36px; height: 36px;
  border: 1px solid #00ff99;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff99;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover { background: #00ff99; color: #0f0e1a; }
`;

const SOCIALS = [
  { icon: <FaGithub />,    href: 'https://github.com/PRANABraight',              label: 'GitHub' },
  { icon: <FaLinkedin />,  href: 'https://linkedin.com/in/pranab-rai-924b6731b/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://instagram.com/pranabrai1/',             label: 'Instagram' },
  { icon: <FaEnvelope />,  href: 'mailto:pranabrai137@gmail.com',                 label: 'Email' },
];

const ContactSection = ({ setMode }) => (
  <Wrap id="contact" >
    <FooterBg />
    <Inner>
      <CtaBlock>
        <Heading>
          Let's{' '}
          <span>Talk</span>
        </Heading>

        <CtaDesc>
          What led you here? What are you looking for? I would love to hear from you over a virtual coffee chat!
        </CtaDesc>

        <ShinyBtn
          href="mailto:pranabrai137@gmail.com"
          whileTap={{ scale: 0.97 }}
        >
          <Spinner />
          <ShinyLabel>
            Let's get in touch <FaArrowRight size={11} />
          </ShinyLabel>
        </ShinyBtn>

        <Hr />

        <PersonalBtn
          onClick={() => setMode && setMode('personal')}
          whileTap={{ scale: 0.97 }}
        >
          Peer through my Personal Life ↗
        </PersonalBtn>
      </CtaBlock>

      <BottomRow>
        <NameLabel>Pranab Rai</NameLabel>
        <SocialRow>
          {SOCIALS.map(s => (
            <SocialBtn
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </SocialBtn>
          ))}
        </SocialRow>
      </BottomRow>
    </Inner>
  </Wrap>
);

export default ContactSection;
