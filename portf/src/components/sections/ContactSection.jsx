// src/components/sections/ContactSection.jsx
import { useState } from 'react';
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
  box-shadow: ${colors.shadow.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: ${spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing.md};
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.lg};
  color: ${colors.text.primary};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  transition: all 200ms ease;

  &:focus {
    outline: none;
    border-color: ${colors.secondary.main};
    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${spacing.md};
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.lg};
  color: ${colors.text.primary};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  min-height: 150px;
  resize: vertical;
  transition: all 200ms ease;

  &:focus {
    outline: none;
    border-color: ${colors.secondary.main};
    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${spacing.md};
  background: ${colors.gradient.primary};
  color: white;
  border: none;
  border-radius: ${borderRadius.lg};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  box-shadow: ${colors.shadow.blue};
  transition: all 200ms ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled(motion.div)`
  margin-top: ${spacing.md};
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
  text-align: center;
  font-weight: ${typography.fontWeight.medium};
  
  ${props => props.$type === 'success' && `
    background: rgba(5, 150, 105, 0.1);
    color: ${colors.success.main};
    border: 1px solid ${colors.success.dark};
  `}

  ${props => props.$type === 'error' && `
    background: rgba(220, 38, 38, 0.1);
    color: #EF4444;
    border: 1px solid #991B1B;
  `}
`;

const DecorativeBlob = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  background: ${colors.gradient.secondary};
  filter: blur(100px);
  opacity: 0.1;
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await res.json();
        console.error('Resend Error:', errorData);
        setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/PRANABraight' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/pranab-rai' },
    { icon: <FaInstagram />, label: 'Instagram', href: 'https://instagram.com/pranab_rai' },
    { icon: <FaEnvelope />, label: 'Email', href: 'mailto:pranab.rai@mca.christuniversity.in' }
  ];

  return (
    <ContactSectionContainer id="contact">
      <AnimatedTitle>Let's Work Together</AnimatedTitle>
      
      <DecorativeBlob 
        style={{ bottom: '-10%', left: '-10%' }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1] 
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <InfoTitle>Get In Touch</InfoTitle>
            <InfoText>
              I'm currently looking for new opportunities as a Data Engineer or Data Scientist. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </InfoText>
            
            <SocialGrid>
              {socialLinks.map((link, index) => (
                <SocialCard 
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </SocialCard>
              ))}
            </SocialGrid>
          </InfoCard>
        </ContactInfo>

        <ContactForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FormGroup>
            <Label>Name</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe" 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com" 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Message</Label>
            <TextArea 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder="Hello! I'd like to discuss a project..." 
              required 
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            <FaPaperPlane />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {status.message && (
            <StatusMessage
              $type={status.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {status.message}
            </StatusMessage>
          )}
        </ContactForm>
      </ContactLayout>
    </ContactSectionContainer>
  );
};

export default ContactSection;