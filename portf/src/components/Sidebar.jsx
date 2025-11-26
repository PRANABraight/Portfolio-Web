import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { colors, borderRadius, spacing } from '../styles/theme';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: ${spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: ${spacing.md};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.border.light};
  box-shadow: ${colors.shadow.md};
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};

  @media (max-width: 768px) {
    bottom: ${spacing.lg};
    left: 50%;
    top: auto;
    transform: translateX(-50%);
    flex-direction: row;
    padding: ${spacing.md} ${spacing.xl};
    gap: ${spacing.xl};
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: ${colors.text.secondary};
  font-size: 1.25rem;
  border-radius: ${borderRadius.md};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${colors.background.secondary};
    color: ${colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const iconVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 }
};

const Sidebar = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/PRANABraight", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/pranabrai", label: "LinkedIn" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/pranabrai1/", label: "Instagram" },
    { icon: <FaEnvelope />, url: "mailto:pranabrai137@gmail.com", label: "Email" }
  ];

  return (
    <SidebarContainer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {socialLinks.map((link, index) => (
        <SocialLink
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {link.icon}
        </SocialLink>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
