// Contact/Footer CTA — exact match to radnaabazar.com component 30836
import { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap, useGSAP, OK, revealUp } from '../../lib/motion';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { colors, typography, borderRadius, transitions, accentVars } from '../../styles/theme';
import FloatingOrbs from '../common/FloatingOrbs';

const spinConic = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;

const Wrap = styled.section`
  ${accentVars('contact')}
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
  font-size: clamp(2.25rem, 5.5vw, 3.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  text-align: center;
  max-width: 45vw;
  min-width: 280px;
  line-height: 1.15;

  span { color: var(--accent); }

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

/* Contact form */
const Form = styled.form`
  width: 100%;
  max-width: 520px;
  display: grid;
  gap: 1rem;
  margin-bottom: 1.75rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Label = styled.label`
  font-family: ${typography.fontFamily.mono};
  font-size: 0.75rem;
  color: ${colors.text2};
  letter-spacing: 0.04em;
`;

const inputStyles = `
  width: 100%;
  background: ${colors.bgCard};
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  padding: 0.7rem 0.9rem;
  font-family: ${typography.fontFamily.mono};
  font-size: 0.875rem;
  color: ${colors.text.primary};
  outline: none;
  transition: border-color ${transitions.base};

  &::placeholder { color: ${colors.text3}; }
  &:focus { border-color: rgba(var(--accent-rgb), 0.7); }
`;

const Input = styled.input`${inputStyles}`;

const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 120px;
  resize: vertical;
`;

/* Honeypot — visually hidden, bots fill it, humans never see it */
const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const StatusMsg = styled(motion.p)`
  font-family: ${typography.fontFamily.mono};
  font-size: 0.8125rem;
  text-align: center;
  margin: 0;
  color: ${p => (p.$error ? colors.warning.main : 'var(--accent)')};
`;

/* Shiny animated button (exact from source component 24750) */
const ShinyBtn = styled(motion.button)`
  position: relative;
  display: inline-flex;
  height: 48px;
  width: 100%;
  max-width: 240px;
  overflow: hidden;
  border-radius: 8px;
  padding: 1px;
  border: none;
  background: transparent;
  cursor: pointer;
  justify-self: center;
  margin: 0 auto;
  transition: box-shadow 0.3s ease;

  &:hover:not(:disabled) { box-shadow: 0 8px 32px rgba(var(--accent-rgb), 0.25); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Spinner = styled.span`
  position: absolute;
  inset: -1000%;
  animation: ${spinConic} 2s linear infinite;
  background: conic-gradient(from 90deg at 50% 50%, #fef3c7 0%, #b45309 50%, #fef3c7 100%);
`;

const ShinyLabel = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${colors.bg};
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
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 1.5rem;
  border-radius: 9999px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-family: ${typography.fontFamily.mono};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.25s ease, box-shadow 0.25s ease;
  margin-top: 1rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  > * { position: relative; }

  &:hover {
    color: ${colors.bg};
    box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.25);
    &::before { transform: scaleX(1); }
  }
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
  border: 1px solid var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover { background: var(--accent); color: ${colors.bg}; }
`;

const SOCIALS = [
  { icon: <FaGithub />,    href: 'https://github.com/PRANABraight',              label: 'GitHub' },
  { icon: <FaLinkedin />,  href: 'https://linkedin.com/in/pranab-rai-924b6731b/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://instagram.com/pranabrai1/',             label: 'Instagram' },
  { icon: <FaEnvelope />,  href: 'mailto:pranabrai137@gmail.com',                 label: 'Email' },
];

const INITIAL_FORM = { name: '', email: '', message: '', company: '' };

const ContactSection = ({ setMode }) => {
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => {
      revealUp(['.contact-heading', '.contact-desc', '.contact-form'], {
        trigger: scope.current,
        stagger: 0.12,
      });
    });
  }, { scope });

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setForm(INITIAL_FORM);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email me directly.');
    }
  };

  return (
    <Wrap id="contact" ref={scope}>
      <FooterBg />
      <FloatingOrbs count={3} rgbs={[null, '249, 115, 22']} />
      <Inner>
        <CtaBlock>
          <Heading className="contact-heading">
            Let's{' '}
            <span>Talk</span>
          </Heading>

          <CtaDesc className="contact-desc">
            What led you here? What are you looking for? I would love to hear from you over a virtual coffee chat!
          </CtaDesc>

          <Form className="contact-form" onSubmit={onSubmit}>
            <Field>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                maxLength={100}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                maxLength={254}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="contact-message">Message</Label>
              <TextArea
                id="contact-message"
                name="message"
                placeholder="What's on your mind?"
                value={form.message}
                onChange={onChange}
                minLength={10}
                maxLength={5000}
                required
              />
            </Field>

            <Honeypot aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={onChange}
              />
            </Honeypot>

            <div role="status" aria-live="polite">
            <AnimatePresence>
              {status === 'success' && (
                <StatusMsg
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Message sent — I'll get back to you soon!
                </StatusMsg>
              )}
              {status === 'error' && (
                <StatusMsg
                  $error
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errorMsg}
                </StatusMsg>
              )}
            </AnimatePresence>
            </div>

            <ShinyBtn
              type="submit"
              disabled={status === 'loading'}
              whileTap={{ scale: 0.97 }}
              aria-label="Send message"
            >
              <Spinner />
              <ShinyLabel>
                {status === 'loading' ? 'Sending…' : <>Let's get in touch <FaArrowRight size={11} /></>}
              </ShinyLabel>
            </ShinyBtn>
          </Form>

          <Hr />

          <PersonalBtn
            onClick={() => setMode && setMode('personal')}
            whileTap={{ scale: 0.97 }}
          >
            <span>Peer through my Personal Life ↗</span>
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
};

export default ContactSection;
