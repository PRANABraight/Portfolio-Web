import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/motion';
import { sectionAccents } from '../styles/theme';

// section element id → sectionAccents key
const ID_TO_ACCENT = {
  home: 'hero',
  education: 'education',
  about: 'about',
  approach: 'approach',
  projects: 'projects',
  experience: 'experience',
  journey: 'journey',
  skills: 'skills',
  github: 'github',
  contact: 'contact',
};

const setSiteAccent = (key) => {
  const a = sectionAccents[key];
  if (!a) return;
  const root = document.documentElement.style;
  root.setProperty('--site-accent', a.hex);
  root.setProperty('--site-accent-rgb', a.rgb);
};

/* Keeps --site-accent on <html> in sync with the section currently in view,
   so fixed chrome (Navbar, FloatingNav, Spotlight) hue-shifts with scroll.
   `deps` should change whenever the section stack remounts (e.g. mode). */
export default function useSiteAccent(mode, deps = []) {
  useEffect(() => {
    if (mode === 'personal') {
      setSiteAccent('personal');
      return; // nothing to scroll-trigger in a single-section mode
    }
    setSiteAccent('hero');
    const triggers = Object.entries(ID_TO_ACCENT)
      .map(([id, key]) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && setSiteAccent(key),
        });
      })
      .filter(Boolean);
    return () => triggers.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
