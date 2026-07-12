// Navbar/Header — exact match to radnaabazar.com component 70839
// Logo: "FirstName." with accent dot
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';
import { scrollToId } from '../hooks/useLenis';

const Header = styled.header`
  padding: 2rem 0;
  color: white;
  /* --site-accent is registered via @property, so accent color-shifts ease per section */
  transition: color 0.4s ease;

  @media (min-width: 1280px) { padding: 3rem 0; }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (min-width: 640px) { padding: 0 2.5rem; }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Logo: "Pranab." — firstName + accent dot */
const Logo = styled(motion.a)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.25rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  letter-spacing: -0.025em;
  cursor: pointer;

  span { color: var(--site-accent); }
`;

/* Desktop nav links */
const DesktopNav = styled.nav`
  display: none;
  gap: 2rem;
  align-items: center;

  @media (min-width: 1280px) { display: flex; }
`;

const NavItem = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${p => p.$active ? 'var(--site-accent)' : 'rgba(255,255,255,0.8)'};
  text-decoration: none;
  text-transform: capitalize;
  border-bottom: ${p => p.$active ? '2px solid var(--site-accent)' : '2px solid transparent'};
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover { color: var(--site-accent); }
`;

/* Mobile hamburger (Sheet/drawer from right) */
const MobileBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  background: none;
  border: none;
  color: var(--site-accent);
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 1280px) { display: none; }
`;

const Drawer = styled(motion.div)`
  position: fixed;
  inset-y: 0;
  right: 0;
  width: 75%;
  max-width: 320px;
  background: #0e0e10;
  z-index: 300;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-left: 1px solid rgba(255,255,255,0.08);
`;

const DrawerOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #0e0e10;
  z-index: 299;
`;

const DrawerClose = styled.button`
  position: absolute;
  right: 2rem;
  top: 2rem;
  background: none;
  border: none;
  color: var(--site-accent);
  font-size: 1.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex: 1;
`;

const DrawerLink = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${p => p.$active ? 'var(--site-accent)' : 'rgba(255,255,255,0.8)'};
  text-decoration: none;
  text-transform: capitalize;
  border-bottom: ${p => p.$active ? '2px solid var(--site-accent)' : 'none'};
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover { color: var(--site-accent); }
`;

const NAV_LINKS = [
  { label: 'professional', id: 'home' },
  { label: 'work',         id: 'projects' },
  { label: 'contact',      id: 'contact' },
];

const Navbar = ({ mode, setMode }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const sections = ['contact', 'github', 'skills', 'experience', 'projects', 'approach', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    if (mode !== 'professional') setMode('professional');
    setTimeout(() => {
      scrollToId(id);
    }, 50);
    setOpen(false);
  };

  return (
    <>
      <Header>
        <Container>
          <Logo href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }} whileTap={{ scale: 0.97 }}>
            Pranab<span>.</span>
          </Logo>

          {/* Desktop */}
          <DesktopNav>
            {NAV_LINKS.map(n => (
              <NavItem
                key={n.id}
                role="button"
                tabIndex={0}
                $active={active === n.id}
                onClick={() => scrollTo(n.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollTo(n.id);
                  }
                }}
              >
                {n.label}
              </NavItem>
            ))}
          </DesktopNav>

          {/* Mobile */}
          <MobileBtn onClick={() => setOpen(true)} whileTap={{ scale: 0.9 }} aria-label="Open navigation menu">
            <LuMenu />
          </MobileBtn>
        </Container>
      </Header>

      <AnimatePresence>
        {open && (
          <>
            <DrawerOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <Drawer
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <DrawerClose onClick={() => setOpen(false)} aria-label="Close navigation menu">
                <FaTimes />
              </DrawerClose>
              <DrawerNav>
                {NAV_LINKS.map(n => (
                  <DrawerLink
                    key={n.id}
                    role="button"
                    tabIndex={0}
                    $active={active === n.id}
                    onClick={() => scrollTo(n.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollTo(n.id);
                      }
                    }}
                  >
                    {n.label}
                  </DrawerLink>
                ))}
              </DrawerNav>
            </Drawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
