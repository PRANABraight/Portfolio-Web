// src/components/sections/ContactSection.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import AnimatedTitle from '../common/AnimatedTitle';

const ContactSectionContainer = styled.section`
  padding: ${spacing['4xl']} ${spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${spacing['4xl']};
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${spacing['3xl']};
  }
`;

const ContactInfo = styled.div`
  position: sticky;
  top: 120px;
`;

const InfoCard = styled(motion.div)`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.xl};
  padding: ${spacing['2xl']};
  box-shadow: ${colors.shadow.md};
  margin-bottom: ${spacing.xl};
`;

const InfoTitle = styled.h3`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${spacing.md} 0;
`;

const InfoText = styled.p`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0 0 ${spacing.xl} 0;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md};
`;

const SocialCard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: rgba(30, 64, 175, 0.05);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.lg};
  color: ${colors.text.primary};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(30, 64, 175, 0.1);
    border-color: ${colors.primary.main};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
    color: ${colors.primary.main};
  }

  span {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
  }
`;

const ContactForm = styled(motion.form)`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.xl};
  padding: ${spacing['2xl']};
  box-shadow: ${colors.shadow.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Label = styled.label`
  display: block;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing.md};
  background: rgba(15, 23, 42, 0.6);
  border: 2px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.base};
  color: ${colors.text.primary};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${colors.secondary.main};
    background: rgba(30, 41, 59, 0.8);
    box-shadow: 0 0 0 3px ${colors.border.focus};
  }

  &::placeholder {
    color: ${colors.text.muted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${spacing.md};
  background: rgba(15, 23, 42, 0.6);
  border: 2px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.base};
  color: ${colors.text.primary};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  resize: vertical;
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: ${colors.secondary.main};
    background: rgba(30, 41, 59, 0.8);
    box-shadow: 0 0 0 3px ${colors.border.focus};
  }

  &::placeholder {
    color: ${colors.text.muted};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${spacing.md} ${spacing.xl};
  background: ${colors.warning.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  box-shadow: ${colors.shadow.orange};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${colors.warning.light};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.xl};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.25rem;
  }
`;

const DecorativeBlob = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${colors.gradient.primary};
  opacity: 0.05;
  filter: blur(80px);
  pointer-events: none;
  z-index: -1;
`;

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <ContactSectionContainer id="contact">
      <AnimatedTitle>Let's Work Together</AnimatedTitle>
      
      <DecorativeBlob
        style={{ top: '10%', right: '10%' }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <ContactLayout>
        <ContactInfo>
          <InfoCard
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <InfoTitle>Get In Touch</InfoTitle>
            <InfoText>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Let's create something amazing together!
            </InfoText>
            
            <SocialGrid>
              <SocialCard
                href="https://github.com/PRANABraight"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                <span>GitHub</span>
              </SocialCard>
              <SocialCard
                href="https://www.linkedin.com/in/pranab-rai-924b6731b/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </SocialCard>
              <SocialCard
                href="https://www.instagram.com/pranabrai1/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram />
                <span>Instagram</span>
              </SocialCard>
              <SocialCard
                href="mailto:pranabrai407@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
                <span>Email</span>
              </SocialCard>
            </SocialGrid>
          </InfoCard>
        </ContactInfo>

        <ContactForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Your Message</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              required
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPaperPlane />
            Send Message
          </SubmitButton>
        </ContactForm>
      </ContactLayout>
    </ContactSectionContainer>
  );
};

export default ContactSection;