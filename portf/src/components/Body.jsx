import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaGraduationCap,
  FaLaptopCode,
  FaVolleyballBall,
  FaBrain,
  FaEnvelope,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import {
  SiMysql,
  SiMongodb,
  SiTailwindcss,
  SiC,
  SiFirebase,
} from "react-icons/si";
import profileImage from "../assets/prof.jpg";
import qmlImage from "../assets/qml.jpg";
import netguardImage from "../assets/netguard.png";
import spotifyImage from "../assets/spotify.png";
import wisdomImage from "../assets/wisdom.png";
import { useState, useEffect } from "react";
import Background from "./Background";

// Define color palette
const colors = {
  primary: "#4ecdc4", // Teal
  secondary: "#ff6b6b", // Coral
  accent: "#ff8585", // Light coral
  text: {
    primary: "#ffffff", // White
    secondary: "#e2e8f0", // Slate-200
    muted: "#94a3b8", // Slate-400
  },
  background: {
    card: "rgba(17, 24, 39, 0.8)", // Dark slate with opacity
    hover: "rgba(23, 30, 45, 0.9)", // Darker slate with opacity
  },
  border: {
    default: "rgba(78, 205, 196, 0.2)", // Teal with opacity
    hover: "rgba(255, 107, 107, 0.4)", // Coral with opacity
  },
  gradient: {
    primary: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
    hover: "linear-gradient(45deg, #4ecdc4, #ff6b6b)",
  },
};

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
`;

const BodyContainer = styled.div`
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const useRotatingText = (texts, interval = 2000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return texts[currentIndex];
};

// Update the useTypingEffect hook to handle complete typing and deleting phases
const useTypingEffect = (lines, speed = 40, pause = 1000) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting) {
      if (currentLineIndex < lines.length) {
        if (currentCharIndex < lines[currentLineIndex].length) {
          const timeoutId = setTimeout(() => {
            setDisplayedLines((prev) => {
              const newLines = [...prev];
              if (!newLines[currentLineIndex]) {
                newLines[currentLineIndex] = '';
              }
              newLines[currentLineIndex] = lines[currentLineIndex].substring(0, currentCharIndex + 1);
              return newLines;
            });
            setCurrentCharIndex((prev) => prev + 1);
          }, speed);
          return () => clearTimeout(timeoutId);
        } else {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }
      } else {
        setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (displayedLines.length > 0) {
        const currentLine = displayedLines[displayedLines.length - 1];
        if (currentLine && currentLine.length > 0) {
          const timeoutId = setTimeout(() => {
            setDisplayedLines((prev) => {
              const newLines = [...prev];
              newLines[newLines.length - 1] = currentLine.substring(0, currentLine.length - 1);
              return newLines.filter(line => line.length > 0);
            });
          }, speed);
          return () => clearTimeout(timeoutId);
        } else {
          setDisplayedLines((prev) => prev.slice(0, -1));
        }
      } else {
        // Reset everything to start over
        setIsDeleting(false);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }
    }
  }, [currentCharIndex, currentLineIndex, lines, speed, isDeleting, pause, displayedLines]);

  return { displayedLines, isComplete: false }; // Always return isComplete as false to keep animation running
};

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const HeroSection = styled(Section)`
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
  min-height: 2em;
  text-align: center;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ProjectCard = styled(motion.div)`
  padding: 1.5rem;
  border-left: 3px solid ${colors.primary};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;

  &:hover {
    border-left: 3px solid ${colors.secondary};
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    background: ${colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1.2rem;
    color: white;
    margin: 1rem 0;
  }

  p {
    color: white;
    line-height: 1.6;
  }

  strong {
    color: white;
    font-weight: 600;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px ${colors.primary}40, 0 0 10px ${colors.secondary}20; }
  50% { box-shadow: 0 0 15px ${colors.primary}60, 0 0 20px ${colors.secondary}40; }
  100% { box-shadow: 0 0 5px ${colors.primary}40, 0 0 10px ${colors.secondary}20; }
`;

const AboutCard = styled(motion.div)`
  padding: 2rem;
  background: ${colors.background.card};
  border-radius: 15px;
  transition: all 0.4s ease;
  border: 1px solid ${colors.border.default};
  animation: ${glowAnimation} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-5px);
    background: ${colors.background.hover};
    border-color: ${colors.border.hover};
    box-shadow: 0 0 15px ${colors.primary}40, 0 0 30px ${colors.secondary}20;
  }

  h3 {
    background: ${colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${colors.primary};
  margin-bottom: 1rem;
  opacity: 0.9;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: ${colors.secondary};
    transform: scale(1.05);
  }
`;

const AboutContainer = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  padding: 2rem;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const AboutHeading = styled.h2`
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AboutText = styled.p`
  line-height: 1.8;
  color: ${colors.text.secondary};
  margin-bottom: 1.5rem;
  font-family: "Fira Code", monospace;

  .highlight {
    color: ${colors.accent};
    font-weight: 500;
  }

  .comment {
    color: ${colors.text.muted};
    font-style: italic;
  }

  &:hover {
    color: ${colors.text.primary};
  }
`;

// Add new styled components after the existing imports
const WindowControls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &.close {
    background: #ff5f56;
    &:hover {
      background: #ff3326;
    }
  }

  &.minimize {
    background: #ffbd2e;
    &:hover {
      background: #ffaa00;
    }
  }

  &.maximize {
    background: #27c93f;
    &:hover {
      background: #1aab2f;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const WindowTitle = styled.div`
  color: ${colors.text.muted};
  font-size: 0.9rem;
  margin-bottom: 16px;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 8px;
`;

const WindowHeader = styled.div`
  position: relative;
  padding: 8px;
  border-bottom: 1px solid ${colors.border.default};
  margin: -1.5rem -1.5rem 1rem -1.5rem;
  border-radius: 8px 8px 0 0;
  background: #252525;
`;

// Update the AboutSection styled component
const AboutSection = styled.div`
  background: #1e1e1e; /* Dark background to mimic a console */
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid ${colors.border.default};
  margin-bottom: 2rem;
  font-family: "Fira Code", monospace;
  color: ${colors.text.primary}; /* Default text color */
  width: 100%;
  height: ${props => props.isMinimized ? '10px' : props.isMaximized ? '90vh' : '360px'};
  width: ${props => props.isMaximized ? '90vw' : '100%'};
  transition: all 0.3s ease;
  
  .content {
    opacity: ${props => props.isMinimized ? 0 : 1};
    transition: opacity 0.3s ease;
    overflow-y: auto;
    height: calc(100% - 50px);
    padding-right: 10px;
  }

  // Add custom scrollbar styling
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.border.default};
    border-radius: 4px;
  }

  .code-line {
    margin: 0.5rem 0;
    color: ${colors.text.secondary}; /* Secondary text color */
  }

  .indent {
    margin-left: 1.5rem;
  }

  .keyword {
    color: #c678dd; /* Purple for keywords */
  }

  .string {
    color: #98c379; /* Green for strings */
  }

  .comment {
    color: #5c6370; /* Grey for comments */
    font-style: italic;
  }

  .function {
    color: #61afef; /* Blue for functions */
  }

  .variable {
    color: #e06c75; /* Red for variables */
  }

  .property {
    color: #e5c07b; /* Yellow for properties */
  }

  .punctuation {
    color: #abb2bf; /* Light grey for punctuation */
  }

  .typing-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: ${colors.text.primary};
    margin-left: 2px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  &:hover {
    border-color: ${colors.border.hover};
    background: #252525;
  }
`;

const ProjectSection = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  padding: 2rem;
`;

const ProjectHeading = styled.h2`
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProfileImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
  border: 4px solid transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ContactSection = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  width: 100%;
  max-width: 900px;
  margin: 2rem 0;
`;

const ContactHeading = styled.h2`
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
  padding-bottom: 1rem;
`;

const SocialLink = styled.a`
  color: ${colors.text.muted};
  font-size: 1.8rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.primary};
    transform: translateY(-3px);
  }
`;

const SkillsSection = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  padding: 2rem;
`;

const SkillsHeading = styled.h2`
  background: ${colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const SkillCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 3rem;
    transition: all 0.3s ease;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  background: linear-gradient(
    to right,
    rgba(78, 205, 196, 0.1),
    rgba(255, 107, 107, 0.1)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;

  span {
    color: #4ecdc4;
    font-weight: 500;
  }

  .heart {
    color: #ff6b6b;
    display: inline-block;
    animation: pulse 1.5s ease infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Body = () => {
  const traits = [
    "🚀 Full Stack Developer",
    "🧠 Machine Learning Enthusiast",
    "💡 Problem Solver",
    "📚 Quick Learner",
    "🤝 Team Player",
  ];

  const currentTrait = useRotatingText(traits);

  const skills = [
    { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
    { icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
    { icon: FaJs, name: "JavaScript", color: "#F7DF1E" },
    { icon: FaReact, name: "React", color: "#61DAFB" },
    { icon: FaNodeJs, name: "Node.js", color: "#339933" },
    { icon: FaJava, name: "Java", color: "#007396" },
    { icon: FaPython, name: "Python", color: "#3776AB" },
    { icon: SiC, name: "C", color: "#00599C" },
    { icon: SiMysql, name: "MySQL", color: "#4479A1" },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
    { icon: FaDatabase, name: "SQL", color: "#336791" },
    { icon: SiFirebase, name: "Firebase", color: "#FFCA28" }, // Add this line
  ];

  // In the Body component, add these constants before the return statement
  const codeLines = [
    "class PranabRai {",
    "  // Full-stack developer with a passion for innovation",
    "  constructor() {",
    '    this.name = "Pranab Rai";',
    '    this.location = "Bangalore";',
    '    this.education = "Master of Computer Applications";',
    '    this.university = "Christ University, Bangalore";',
    "  }",
    "}",
  ];

  const { displayedLines, isComplete } = useTypingEffect(codeLines, 30, 1000);

  // In the Body component, add state for window controls
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <MainContainer>
      <Background />
      <BodyContainer>
        <HeroSection id="home">
          <HeroContent>
            <ProfileImage
              src={profileImage}
              alt="Pranab Rai"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            />
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm Pranab Rai
            </Title>
            <Subtitle
              key={currentTrait}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentTrait}
            </Subtitle>
          </HeroContent>
        </HeroSection>

        <Section id="about">
          <AboutContainer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AboutHeading>About Me</AboutHeading>
            <AboutSection isMinimized={isMinimized} isMaximized={isMaximized}>
              <WindowHeader>
                <WindowControls>
                  <WindowButton 
                    className="close" 
                    onClick={() => setIsMinimized(true)}
                  />
                  <WindowButton 
                    className="minimize" 
                    onClick={() => setIsMinimized(!isMinimized)}
                  />
                  <WindowButton 
                    className="maximize" 
                    onClick={() => setIsMaximized(!isMaximized)}
                  />
                </WindowControls>
                <WindowTitle></WindowTitle>
              </WindowHeader>
              <div className="content">
                {displayedLines.map((line, index) => (
                  <div key={index} className="code-line">
                    <span
                      className={
                        line.includes("class")
                          ? "keyword"
                          : line.includes("//")
                          ? "comment"
                          : line.includes("constructor")
                          ? "function"
                          : line.includes("this")
                          ? "property"
                          : line.includes("=")
                          ? "variable"
                          : line.includes('"')
                          ? "string"
                          : "punctuation"
                      }
                    >
                      {line}
                    </span>
                    {index === displayedLines.length - 1 && !isComplete && (
                      <span className="typing-cursor" />
                    )}
                  </div>
                ))}
              </div>
            </AboutSection>

            <AboutGrid>
              <AboutCard>
                <IconWrapper>
                  <FaLaptopCode />
                </IconWrapper>
                <h3>Technical Expertise</h3>
                <AboutText>
                  • Full Stack Development <br />
                  • API Architecture & Design <br />
                  • Cloud Infrastructure <br />
                  • CI/CD Implementation <br />
                </AboutText>
              </AboutCard>

              <AboutCard>
                <IconWrapper>
                  <FaGraduationCap />
                </IconWrapper>
                <h3>Education</h3>
                <AboutText>
                  • MCA at Christ University <br />
                  • 89% in 10th(ICSE) <br />
                  • 85% in 12th(CBSE) <br />
                  • 8.68 CGPA in undergrad(Christ University) <br />
                </AboutText>
              </AboutCard>

              <AboutCard>
                <IconWrapper>
                  <FaVolleyballBall />
                </IconWrapper>
                <h3>Leadership</h3>
                <AboutText>
                  • Organized Xebit events <br />
                  • University representative <br />
                  • Led volleyball teams <br />
                  • Team management <br />
                </AboutText>
              </AboutCard>

              <AboutCard>
                <IconWrapper>
                  <FaBrain />
                </IconWrapper>
                <h3>Interests</h3>
                <AboutText>
                  • Quantum Computing <br />
                  • Machine Learning <br />
                  • E-learning Innovation <br />
                  • System Design <br />
                </AboutText>
              </AboutCard>
            </AboutGrid>

            <AboutText>
              <span className="comment">
                /**I'm passionate about exploring the unknown—whether it's
                debugging a stubborn piece of code or understanding the
                complexities of quantum simulations. I love the thrill of
                learning new concepts, solving tricky problems, and seeing ideas
                come to life. */
              </span>
            </AboutText>
          </AboutContainer>
        </Section>

        <Section id="skills">
          <SkillsSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SkillsHeading>Skills</SkillsHeading>
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <skill.icon style={{ color: skill.color }} />
                  <p>{skill.name}</p>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillsSection>
        </Section>

        <Section id="projects">
          <ProjectSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectHeading>Projects</ProjectHeading>
            <ProjectGrid>
              <ProjectCard
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage src={spotifyImage} alt="Spotify Clone" />
                <h3>Spotify Clone</h3>
                <p>
                  A feature-rich web application that replicates the core
                  functionality of Spotify, providing an ad-free music streaming
                  experience.
                  <br />
                  <h4>Features</h4>
                  🎵 Music playback with play, pause, skip, and volume controls
                  - Jam out to your favorite tunes! <br />
                  📱 Responsive design for all devices - Listen on the go!{" "}
                  <br />
                  🎨 Modern and intuitive user interface - Easy on the eyes!{" "}
                  <br />
                  {/* 📋 Playlist creation and management <br /> */}
                  {/* 👤 User authentication <br /> */}
                  {/* 🔍 Search functionality <br /> */}
                  💾 Local music library management - Keep your music organized!{" "}
                  <br />
                  <br />
                  <br />
                  <strong>Tech Stack: </strong>
                  React.js, CSS, Node.js & Express, MongoDB, Cloudinary
                </p>
              </ProjectCard>
              <ProjectCard
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage src={wisdomImage} alt="Wisdom Warrior" />
                <h3>Wisdom Warrior</h3>
                <p>
                  WisdomWarrior is an online learning platform designed to
                  provide high-quality educational content to learners
                  worldwide. The platform offers a variety of courses,
                  interactive content, and user-friendly features to enhance the
                  learning experience.
                  <h4>Features</h4>
                  📱 Optimized for all devices including desktops, tablets, and
                  mobile phones - Learn anywhere, anytime! <br />
                  📚 Engaging and interactive course content - Dive into fun
                  learning! <br />
                  👤 Personalized user profiles to track progress and
                  achievements - Your journey, your way! <br />
                  🔒 Secure user registration and login - Safety first! <br />
                  📈 Visual progress indicators to track course completion - See
                  your growth! <br />
                  <br />
                  <strong>Tech Stack: </strong> HTML, CSS, JavaScript, Firebase,
                  Tailwinds, Bootstrap
                </p>
              </ProjectCard>
            </ProjectGrid>
            <ProjectHeading>Ongoing Works</ProjectHeading>
            <ProjectGrid>
              <ProjectCard
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage src={netguardImage} alt="netGuard" />
                <h3>NetGuard IDS</h3>
                <p>
                  A modern web-based intrusion detection system built with
                  React.js that helps monitor and detect potential security
                  threats in real-time.
                  <h4>Features</h4>
                  🛡️ Real-time threat detection and monitoring - Stay safe 24/7!{" "}
                  <br />
                  📊 User-friendly dashboard interface - Easy peasy lemon
                  squeezy! <br />
                  ⚙️ Customizable alert settings - Your alerts, your way! <br />
                  📋 Detailed threat analysis and reporting - Know the enemy!{" "}
                  <br />
                  🌐 Network traffic visualization - See the data flow! <br />
                  🗃️ Log management and analysis - Keep everything organized!{" "}
                  <br />
                  <br />
                  <br />
                  <strong>Tech Stack</strong>
                  React.js, Material-UI, Node.js, Express.js, Python, Firebase
                </p>
              </ProjectCard>
              <ProjectCard
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage src={qmlImage} alt="Qml" />
                <h3>
                  Advancements and Applications of Quantum Machine Learning: A
                  Comprehensive Review
                </h3>
                <p>
                  The paper on the advancements, challenges, and potential applications of
                  Quantum Machine Learning (QML). This work explores the foundational concepts
                  of QML, key algorithms, practical applications, and the hurdles faced by 
                  contemporary quantum hardware and systems. 
                  <h4>Findings</h4>
                  🚀Used in quantum chemistry,
                  secure distributed computing, and high-dimensional data
                  analysis. <br />
                  🛠️Hardware limitations (NISQ era), data encoding difficulties, and noise/error impact.{" "}
                  <br />
                  ⚡Potential to outperform classical algorithms in optimization and other intensive tasks, with enhanced generalization. <br />
                  🔒Focus on secure distributed QML and using quantum cryptography for data
                  protection. <br />
                  🌟Scaling quantum systems, addressing ethical implications, and improving
                  stability/reducing errors. <br />
                </p>
              </ProjectCard>
            </ProjectGrid>
          </ProjectSection>
        </Section>

        <Section id="contact">
          <ContactSection
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ContactHeading>Contact Me</ContactHeading>
            <AboutText>
              Get in touch at:{" "}
              <a
                href="mailto:pranabrai137@gmail.com"
                style={{ color: "#4ECDC4", textDecoration: "none" }}
              >
                pranabrai137@gmail.com
              </a>
            </AboutText>
            <SocialLinks>
              <SocialLink
                href="https://github.com/PRANABraight"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/pranab-rai-924b6731b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/pranabrai1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </SocialLink>
              <SocialLink
                href="mailto:pranabrai137@gmail.com"
                class="padding-bottom: 20px;"
              >
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </ContactSection>
        </Section>
        <Footer>
          <FooterContent>
            <FooterText>
              © {new Date().getFullYear()} <span>Pranab Rai</span>. All rights
              reserved.
              <br />
              Designed & Coded with <span className="heart">♥</span> by Pranab
              Rai
            </FooterText>
          </FooterContent>
        </Footer>
        <br />
        <br />
      </BodyContainer>
    </MainContainer>
  );
};

export default Body;
