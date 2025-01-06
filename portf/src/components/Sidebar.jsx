import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  padding: 1rem 0.5rem;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 90;

  @media (max-width: 768px) {
    bottom: 0;
    left: 0;
    top: auto;
    transform: none;
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const SocialLink = styled(motion.a)`
  display: block;
  padding: 0.8rem;
  color: #333;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4ECDC4;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const iconVariants = {
  hover: { scale: 1.2, rotate: 10 },
  tap: { scale: 0.9 }
};

const Sidebar = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/PRANABraight" },
    { icon: <FaLinkedin />, url: "https://linhttps://www.linkedin.com/in/pranab-rai-924b6731b/kedin.com/in/yourusername" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/pranabrai1/" },
    { icon: <FaEnvelope />, url: "mailto:pranabrai137@gmail.com" }
  ];

  return (
    <SidebarContainer
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {socialLinks.map((link, index) => (
        <SocialLink
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
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
