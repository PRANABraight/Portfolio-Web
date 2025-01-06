import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.div)`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    padding-top: 6rem;
    z-index: 90;
    gap: 2rem;
  }
`;

const MobileNavLink = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  opacity: 0;
`;

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 100,
        when: "afterChildren",
      },
    },
  };

  const linkVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    closed: {
      opacity: 0,
      x: 50,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <Nav>
      {/* Logo */}
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        Pranab Rai
      </Logo>

      {/* Desktop Links */}
      <NavLinks>
        {navItems.map((item) => (
          <NavLink
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </NavLink>
        ))}
      </NavLinks>

      {/* Mobile Menu Button */}
      <MobileMenuButton
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          style={{
            height: "2px",
            width: "25px",
            background: "#333",
            marginBottom: "6px",
          }}
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          style={{
            height: "2px",
            width: "25px",
            background: "#333",
            marginBottom: "6px",
          }}
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          style={{
            height: "2px",
            width: "25px",
            background: "#333",
          }}
        />
      </MobileMenuButton>

      {/* Mobile Nav Links */}
      <MobileNavLinks
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        {navItems.map((item) => (
          <MobileNavLink
            key={item}
            href={`#${item.toLowerCase()}`}
            variants={linkVariants}
            onClick={closeMenu}
            aria-label={`Navigate to ${item}`}
          >
            {item}
          </MobileNavLink>
        ))}
      </MobileNavLinks>
    </Nav>
  );
};

export default Navbar;
