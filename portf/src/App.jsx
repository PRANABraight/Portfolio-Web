import { useState, useEffect } from 'react';
import PageTransition from './components/PageTransition';
import Background from './components/Background';
import Navbar from './components/Navbar';
import FloatingNav from './components/FloatingNav';
import ScrollProgress from './components/common/ScrollProgress';

import HeroSection from './components/sections/HeroSection';
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

const SANITY_CONFIGURED = import.meta.env.VITE_SANITY_PROJECT_ID &&
  import.meta.env.VITE_SANITY_PROJECT_ID !== 'REPLACE_ME';

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
    if (!SANITY_CONFIGURED) return;
    Promise.all([
      client.fetch(HERO_QUERY),
      client.fetch(ABOUT_QUERY),
      client.fetch(JOURNEY_QUERY),
      client.fetch(PROJECTS_QUERY),
      client.fetch(EDUCATION_QUERY),
      client.fetch(EXPERIENCE_QUERY),
      client.fetch(SKILLS_QUERY),
      client.fetch(STATS_QUERY),
    ]).then(([hero, about, journey, projects, education, experience, skills, stats]) => {
      setCms({ hero, about, journey, projects, education, experience, skills, stats });
    }).catch(console.error);
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
