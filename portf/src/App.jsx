import Navbar from './components/Navbar';
import Background from './components/Background';
import Sidebar from './components/Sidebar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Background />
      <Sidebar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
