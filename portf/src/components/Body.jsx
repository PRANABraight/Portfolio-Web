import styled from "styled-components";
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
import qmlImage from '../assets/qml.jpg';
import netguardImage from '../assets/netguard.png';
import spotifyImage from '../assets/spotify.png';
import wisdomImage from '../assets/wisdom.png';
import { useState, useEffect } from "react";

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

const BodyContainer = styled.div`
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

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
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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
  border-left: 3px solid #4ecdc4;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;

  &:hover {
    border-left: 3px solid #ff6b6b;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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

const AboutCard = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: rgba(78, 205, 196, 0.3);
  }

  h3 {
    color: #333;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #4ecdc4;
  margin-bottom: 1rem;
`;

const AboutHeading = styled.h2`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AboutText = styled.p`
  line-height: 1.8;
  color: #666;
  margin-bottom: 1.5rem;
`;

const ProjectSection = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  padding: 2rem;
`;

const ProjectHeading = styled.h2`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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
  color: #666;
  font-size: 1.8rem;
  transition: all 0.3s ease;

  &:hover {
    color: #4ecdc4;
    transform: translateY(-3px);
  }
`;

const SkillsSection = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  padding: 2rem;
`;

const SkillsHeading = styled.h2`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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

const Body = () => {
  const traits = [
    "Full Stack Developer",
    "Machine Learning Enthusiast",
    "Problem Solver",
    "Quick Learner",
    "Team Player",
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

  return (
    <BodyContainer>
      <HeroSection id="home">
        <HeroContent>
          <ProfileImage
            src={profileImage} // Update this line
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
          <AboutText>
            Hi, I'm Pranab Rai, a tech enthusiast and a postgraduate student
            pursuing my MCA at Christ University, Bangalore.
          </AboutText>

          <AboutGrid>
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
                <FaLaptopCode />
              </IconWrapper>
              <h3>Technical Skills</h3>
              <AboutText>
                • Full Stack Development <br />
                • Python, C, and Java <br />
                • Database Design <br />
                • System Architecture <br />
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
            I'm passionate about exploring the unknown—whether it's debugging a
            stubborn piece of code or understanding the complexities of quantum
            simulations. I love the thrill of learning new concepts, solving
            tricky problems, and seeing ideas come to life.
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
              <ProjectImage src={profileImage} alt="Spotify Clone" />
              <h3>Spotify Clone</h3>
              <p>
                A feature-rich web application that replicates the core
                functionality of Spotify, providing an ad-free music streaming
                experience.
                <br />
                <h4>Features</h4>
                🎵 Music playback with play, pause, skip, and volume controls{" "}
                <br />
                📱 Responsive design for all devices <br />
                🎨 Modern and intuitive user interface <br />
                {/* 📋 Playlist creation and management <br /> */}
                {/* 👤 User authentication <br /> */}
                {/* 🔍 Search functionality <br /> */}
                💾 Local music library management <br />
                <br />
                <strong>Tech Stack: </strong>
                React.js, CSS, Node.js & Express, MongoDB, Cloudinary
              </p>
            </ProjectCard>
            <ProjectCard>
              <ProjectImage src={profileImage} alt="Wisdom Warrior" />
              <h3>Wisdom Warrior</h3>
              <p>
                WisdomWarrior is an online learning platform designed to provide
                high-quality educational content to learners worldwide. The
                platform offers a variety of courses, interactive content, and
                user-friendly features to enhance the learning experience.
                <h4>Features</h4>
                Responsive Design: Optimized for all devices including desktops,
                tablets, and mobile phones. Interactive Courses: Engaging and
                interactive course content. <br />
                User Profiles: Personalized user profiles to track progress and
                achievements. <br />
                Secure Authentication: Secure user registration and login.{" "}
                <br />
                Progress Tracking: Visual progress indicators to track course
                completion. <br />
                <br />
                <strong>Tech Stack: </strong> HTML, CSS, JavaScript, Firebase,
                Tailwinds, Bootstrap
              </p>
            </ProjectCard>
          </ProjectGrid>
          <ProjectHeading>Ongoing Works</ProjectHeading>
          <ProjectGrid>
          <ProjectCard
              
            >
              <ProjectImage src={profileImage} alt="Spotify Clone" />
              <h3>NetGuard IDS</h3>
              <p>
              A modern web-based intrusion detection system built with React.js that helps monitor and detect potential security threats in real-time.

<h4>Features
</h4>
 Real-time threat detection and monitoring <br />
 User-friendly dashboard interface <br />
 Customizable alert settings <br />
 Detailed threat analysis and reporting <br />
 Network traffic visualization <br />
 Log management and analysis <br /> <br />

 <strong>Tech Stack</strong>

 React.js, Material-UI, Node.js, Express.js, Python, Firebase


              </p>
            </ProjectCard>
            <ProjectCard
              
            >
              <ProjectImage src={qmlImage} alt="Qml" />
              <h3>Advancements and Applications of Quantum Machine Learing: A Comprehensive Review</h3>
              <p>
              I have delved into a comprehensive survey paper on the advancements, challenges, and potential 
              applications of Quantum Machine Learning (QML). This insightful work explores the foundational 
              concepts of QML, key algorithms, practical applications, and the hurdles faced by contemporary 
              quantum hardware and systems. Below, I summarize some of the key findings presented in this paper:

                <h4>Findings</h4>
                Applications: Used in quantum chemistry, secure distributed computing, and high-dimensional data analysis.
                <br />Challenges: Hardware limitations (NISQ era), data encoding difficulties, and noise/error impact.
<br />Quantum Advantage: Potential to outperform classical algorithms in optimization and other intensive tasks, with enhanced generalization.
<br />Security & Privacy: Focus on secure distributed QML and using quantum cryptography for data protection.
<br />Future Directions: Scaling quantum systems, addressing ethical implications, and improving stability/reducing errors
                
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
              href="mailto:pranabrai407@gmail.com"
              style={{ color: "#4ECDC4", textDecoration: "none" }}
            >
              pranabrai407@gmail.com
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
              href="mailto:pranabrai407@gmail.com"
              class="padding-bottom: 20px;"
            >
              <FaEnvelope />
            </SocialLink>
          </SocialLinks>
        </ContactSection>
      </Section>
    </BodyContainer>
  );
};

export default Body;
