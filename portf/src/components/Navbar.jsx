import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${spacing.md} ${spacing.xl};
  background: ${props => props.$scrolled ? colors.background.glass : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(20px) saturate(180%)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? 'blur(20px) saturate(180%)' : 'none'};
  border-bottom: 1px solid ${props => props.$scrolled ? colors.border.light : 'transparent'};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  letter-spacing: ${typography.letterSpacing.tight};
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${spacing.xl};
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  position: relative;
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: ${colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${colors.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const CTAButton = styled(motion.a)`
  padding: ${spacing.sm} ${spacing.lg};
  background: ${colors.primary};
  color: white;
  border-radius: ${borderRadius.full};
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
  border: none;
  box-shadow: ${colors.shadow.sm};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${colors.primary};
  transform-origin: 0%;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${spacing.sm};

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: ${colors.background.glass};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid ${colors.border.light};
  padding: ${spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  box-shadow: ${colors.shadow.lg};

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: ${colors.primary};
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <NavbarContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <NavContent>
        <Logo
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Pranab Rai
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ y: -2 }}
            >
              {item.label}
            </NavLink>
          ))}
          <CTAButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </CTAButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContent>

      <ProgressBar style={{ scaleX }} />

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {navItems.map((item) => (
            <MobileNavLink
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </MobileNavLink>
          ))}
          <CTAButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            style={{ alignSelf: 'flex-start' }}
          >
            Let's Talk
          </CTAButton>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
