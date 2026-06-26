import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const GH = 'PRANABraight';

const Wrap = styled.section`
  padding: 6rem 1.25rem;
  @media (min-width: 640px) { padding: 6rem 2.5rem; }
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;


const GhLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: rgb(163,163,163);
  margin-top: 0.75rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: #00ff99; }
`;

/* ── Stats row ─────────────────────────────────────── */
const StatsRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatImg = styled(motion.img)`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.07);
  display: block;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(0,255,153,0.25); }
`;

/* ── Activity graph ────────────────────────────────── */
const GraphWrap = styled(motion.div)`
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(0,255,153,0.2); }

  img {
    width: 100%;
    display: block;
  }
`;

/* ── Streak ────────────────────────────────────────── */
const StreakWrap = styled(motion.div)`
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  overflow: hidden;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(0,255,153,0.2); }

  img { width: 100%; display: block; }
`;

/* shared query params */
const COMMON = `&bg_color=0f0e1a&title_color=00ff99&text_color=ffffff&icon_color=00ff99&border_color=ffffff20&hide_border=false&card_width=495`;

const STATS_URL   = `https://github-readme-stats.vercel.app/api?username=${GH}${COMMON}&show_icons=true&count_private=true&include_all_commits=true&rank_icon=github`;
const LANGS_URL   = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GH}${COMMON}&layout=compact&langs_count=8`;
const GRAPH_URL   = `https://github-readme-activity-graph.vercel.app/graph?username=${GH}&bg_color=0f0e1a&color=00ff99&line=00ff99&point=ffffff&area_color=00ff9922&area=true&hide_border=false&border_color=ffffff20&radius=6`;
const STREAK_URL  = `https://github-readme-streak-stats.herokuapp.com/?user=${GH}&background=0f0e1a&stroke=ffffff20&ring=00ff99&fire=00ff99&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=00ff99&sideLabels=00ff99&dates=ffffff60&border=ffffff20`;

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.4,0,0.2,1] } }),
};

const GitHubSection = () => (
  <Wrap id="github">
    <Header>
      <h1 className="heading" style={{ marginBottom: '0.25rem' }}>
        Open Source <span style={{ color: '#00ff99' }}>Activity</span>
      </h1>
      <GhLink href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer">
        <FaGithub /> github.com/{GH} <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
      </GhLink>
    </Header>

    <StatsRow
      variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.08 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.div custom={0} variants={fadeUp}>
        <StatImg
          src={STATS_URL}
          alt="GitHub Stats"
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </motion.div>
      <motion.div custom={1} variants={fadeUp}>
        <StatImg
          src={LANGS_URL}
          alt="Top Languages"
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </motion.div>
    </StatsRow>

    <GraphWrap
      custom={2}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <img
        src={GRAPH_URL}
        alt="GitHub Activity Graph"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
      />
    </GraphWrap>

    <StreakWrap
      custom={3}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <img
        src={STREAK_URL}
        alt="GitHub Streak"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
      />
    </StreakWrap>
  </Wrap>
);

export default GitHubSection;
