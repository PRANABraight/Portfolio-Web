import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { LuStar } from 'react-icons/lu';
import { colors, typography, accentVars } from '../../styles/theme';
import { premiumCard } from '../../styles/mixins';
import { gsap, useGSAP, OK, REDUCED, revealUp, countUp } from '../../lib/motion';
import SectionTitle from '../common/SectionTitle';

const GH = 'PRANABraight';
const CACHE_KEY = 'gh-stats-v1';
const CACHE_TTL = 60 * 60 * 1000; // 1h — stays well under GitHub's 60 req/h anonymous limit

/* GitHub's own language swatch colors */
const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  HTML: '#e34c26', CSS: '#563d7c', Jupyter: '#DA5B0B', 'Jupyter Notebook': '#DA5B0B',
  Java: '#b07219', C: '#555555', 'C++': '#f34b7d', Shell: '#89e051',
  R: '#198CE7', Go: '#00ADD8', Rust: '#dea584', PHP: '#4F5D95', Dart: '#00B4AB',
};

const Wrap = styled.section`
  ${accentVars('github')}
  padding: 3rem 1.25rem;
  @media (min-width: 640px) { padding: 3rem 2.5rem; }
  max-width: 760px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const GhLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: rgb(168,162,158);
  margin-top: 0.75rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: ${colors.accent}; }
`;

const Card = styled(motion.div)`
  ${premiumCard};
  border-radius: 1rem;
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 480px) { grid-template-columns: repeat(3, auto); justify-content: space-between; }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
`;

const StatNum = styled.span`
  font-family: ${typography.fontFamily.mono};
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${colors.text.primary};

  span { color: ${colors.accent}; }
`;

const StatLabel = styled.span`
  font-family: ${typography.fontFamily.mono};
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.text3};
`;

/* Language spectrum — one thin stacked bar, GitHub-repo-page style */
const BarTrack = styled.div`
  display: flex;
  height: 8px;
  border-radius: 9999px;
  overflow: hidden;
  gap: 2px;
`;

const BarSeg = styled(motion.span)`
  height: 100%;
  background: ${p => p.$c};
  min-width: 4px;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  justify-content: center;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: ${typography.fontFamily.mono};
  font-size: 0.7rem;
  color: ${colors.text2};

  &::before {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${p => p.$c};
  }
`;

const shimmer = keyframes`0%{opacity:0.35}50%{opacity:0.7}100%{opacity:0.35}`;

const Skeleton = styled.div`
  height: 118px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  background: ${colors.bgCard};
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const FallbackCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 118px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  color: ${colors.text2};
  font-size: 0.8125rem;
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  transition: border-color 0.25s ease, color 0.25s ease;

  svg { font-size: 1.5rem; color: ${colors.accent}; }

  &:hover { border-color: rgba(var(--accent-rgb), 0.25); color: ${colors.text.primary}; }
`;

const fetchStats = async () => {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { at, data } = JSON.parse(cached);
    if (Date.now() - at < CACHE_TTL) return data;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GH}`),
    fetch(`https://api.github.com/users/${GH}/repos?per_page=100&type=owner`),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');

  const user = await userRes.json();
  const repos = await reposRes.json();

  const stars = repos.reduce((n, r) => n + (r.stargazers_count || 0), 0);
  const langCounts = {};
  repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
  const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));

  const data = {
    repos: user.public_repos,
    followers: user.followers,
    stars,
    languages,
  };
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  return data;
};

const GitHubSection = () => {
  const [stats, setStats] = useState(null);
  const [failed, setFailed] = useState(false);
  const scope = useRef(null);

  useEffect(() => {
    fetchStats().then(setStats).catch(() => setFailed(true));
  }, []);

  useGSAP(() => {
    if (!stats) return;
    const mm = gsap.matchMedia();
    const nums = gsap.utils.toArray(scope.current.querySelectorAll('.gh-num'));

    mm.add(OK, () => {
      revealUp('.gh-card', { trigger: '.gh-card' });
      nums.forEach((el, i) => {
        el.textContent = '0';
        countUp(el, Number(el.dataset.count), { trigger: '.gh-card', delay: 0.2 + i * 0.12 });
      });
    });
    mm.add(REDUCED, () => {
      nums.forEach(el => { el.textContent = el.dataset.count; });
    });
  }, { scope, dependencies: [stats] });

  return (
    <Wrap id="github" ref={scope}>
      <Header>
        <SectionTitle eyebrow="// open source" mb="0.25rem">
          Open Source <span>Activity</span>
        </SectionTitle>
        <GhLink href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer">
          <FaGithub /> github.com/{GH} <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
        </GhLink>
      </Header>

      {failed ? (
        <FallbackCard href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer">
          <FaGithub />
          Stats unavailable right now — view on GitHub
        </FallbackCard>
      ) : !stats ? (
        <Skeleton />
      ) : (
        <Card className="gh-card">
          <StatGrid>
            <Stat>
              <StatNum><span className="gh-num" data-count={stats.repos}>{stats.repos}</span><span>+</span></StatNum>
              <StatLabel>Repositories</StatLabel>
            </Stat>
            <Stat>
              <StatNum><span className="gh-num" data-count={stats.stars}>{stats.stars}</span><span><LuStar style={{ verticalAlign: '-0.05em', fontSize: '0.8em' }} /></span></StatNum>
              <StatLabel>Stars earned</StatLabel>
            </Stat>
            <Stat>
              <StatNum><span className="gh-num" data-count={stats.followers}>{stats.followers}</span><span>+</span></StatNum>
              <StatLabel>Followers</StatLabel>
            </Stat>
          </StatGrid>

          {stats.languages.length > 0 && (
            <>
              <BarTrack>
                {stats.languages.map((l, i) => (
                  <BarSeg
                    key={l.name}
                    $c={LANG_COLORS[l.name] || colors.text3}
                    initial={{ flexGrow: 0 }}
                    whileInView={{ flexGrow: l.pct }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    title={`${l.name} ${l.pct}%`}
                  />
                ))}
              </BarTrack>
              <Legend>
                {stats.languages.map(l => (
                  <LegendItem key={l.name} $c={LANG_COLORS[l.name] || colors.text3}>
                    {l.name} {l.pct}%
                  </LegendItem>
                ))}
              </Legend>
            </>
          )}
        </Card>
      )}
    </Wrap>
  );
};

export default GitHubSection;
