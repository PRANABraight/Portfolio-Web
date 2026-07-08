import { useState, useEffect } from 'react';
import PageTransition from './components/PageTransition';
import Background from './components/Background';
import Navbar from './components/Navbar';
import FloatingNav from './components/FloatingNav';
import ScrollProgress from './components/common/ScrollProgress';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import StatsSection from './components/sections/StatsSection';
import EducationSection from './components/sections/EducationSection';
import GradientSection from './components/sections/GradientSection';
import ApproachSection from './components/sections/ApproachSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import JourneySection from './components/sections/JourneySection';
import SkillsSection from './components/sections/SkillsSection';
import GitHubSection from './components/sections/GitHubSection';
import ContactSection from './components/sections/ContactSection';
import PersonalSection from './components/sections/PersonalSection';
import Footer from './components/sections/Footer';

import { client } from './lib/sanity';
import {
  HERO_QUERY, ABOUT_QUERY, JOURNEY_QUERY,
  PROJECTS_QUERY, EDUCATION_QUERY, EXPERIENCE_QUERY,
  SKILLS_QUERY, STATS_QUERY,
} from './lib/queries';

function App() {
  const [mode, setMode] = useState('professional');
  const [cms, setCms] = useState({
    hero: null,
    about: null,
    journey: null,
    projects: null,
    education: null,
    experience: null,
    skills: null,
    stats: null,
  });

  useEffect(() => {
    const queries = {
      hero: HERO_QUERY,
      about: ABOUT_QUERY,
      journey: JOURNEY_QUERY,
      projects: PROJECTS_QUERY,
      education: EDUCATION_QUERY,
      experience: EXPERIENCE_QUERY,
      skills: SKILLS_QUERY,
      stats: STATS_QUERY,
    };
    const keys = Object.keys(queries);
    // allSettled: one failing query degrades only its own section to fallback data
    Promise.allSettled(keys.map(k => client.fetch(queries[k]))).then(results => {
      const next = {};
      results.forEach((r, i) => {
        if (r.status === 'fulfilled') next[keys[i]] = r.value;
        else console.error(`Sanity ${keys[i]} query failed:`, r.reason);
      });
      setCms(prev => ({ ...prev, ...next }));
    });
  }, []);

  return (
    <>
      <PageTransition />
      <ScrollProgress />
      <Background />
      <Navbar mode={mode} setMode={setMode} />

      {mode === 'professional' ? (
        <main style={{ position: 'relative', overflow: 'hidden' }}>
          <HeroSection cmsHero={cms.hero} />
          <StatsSection cmsStats={cms.stats} />
          <EducationSection cmsEducation={cms.education} />
          <AboutSection cmsAbout={cms.about} />
          <GradientSection />
          <ApproachSection />
          <ProjectsSection cmsProjects={cms.projects} />
          <ExperienceSection cmsExperience={cms.experience} />
          <JourneySection cmsJourney={cms.journey} />
          <SkillsSection cmsSkills={cms.skills} />
          <GitHubSection />
          <ContactSection setMode={setMode} />
        </main>
      ) : (
        <PersonalSection />
      )}

      <Footer />
      <FloatingNav mode={mode} setMode={setMode} />
    </>
  );
}

export default App;
