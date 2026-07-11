import { createElement, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLaptopCode, FaGraduationCap, FaChartLine, FaBrain } from 'react-icons/fa';
import { aboutData } from '../../data/portfolioData';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import AnimatedTitle from '../common/AnimatedTitle';
import { getIcon } from '../../lib/iconMap';
import { gsap, useGSAP, OK, batchReveal } from '../../lib/motion';

const blink = keyframes`0%,100%{opacity:1}50%{opacity:0}`;

const Wrap = styled.section`
  padding: 6rem 1.25rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Terminal = styled.div`
  background: var(--surface-0);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1rem;
  overflow: hidden;
  position: sticky;
  top: 80px;
  align-self: start;
  transition: border-color 0.3s ease;

  &:hover { border-color: rgba(0,255,153,0.2); }

  @media (max-width: 968px) { position: relative; top: 0; }
`;

const TBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem 0.9rem;
  background: var(--surface-2);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  gap: 0.25rem;
`;

const TDot = styled.div`
  width: 10px; height: 10px;
  border-radius: 50%;
  background: ${p => p.$c};
  opacity: 0.8;
`;

const TTitle = styled.span`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.25);
  margin: 0 auto;
  letter-spacing: 0.04em;
`;

const TBody = styled.div`
  display: flex;
  max-height: 380px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 2px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,255,153,0.2); }
`;

const LNums = styled.div`
  padding: 1rem 0.6rem;
  border-right: 1px solid rgba(255,255,255,0.04);
  min-width: 2.2rem;
  user-select: none;
`;

const LN = styled.span`
  display: block;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.15);
  line-height: 1.8;
  text-align: right;
`;

const CodeBlock = styled.div`
  padding: 1rem 1.1rem;
  flex: 1;
`;

const CLine = styled.div`
  font-size: 0.75rem;
  color: rgb(163,163,163);
  white-space: pre-wrap;
  line-height: 1.8;

  .kw   { color: #00ff99; font-weight: 600; }
  .str  { color: rgba(0,255,153,0.55); }
  .cmt  { color: rgba(255,255,255,0.2); font-style: italic; }
  .fn   { color: #62d9e8; }
  .prop { color: #ffbb66; }
  .pun  { color: rgba(255,255,255,0.3); }
`;

const TCursor = styled.span`
  display: inline-block;
  width: 2px; height: 0.85em;
  background: #00ff99;
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  padding: 1.25rem;
  background: rgba(23,21,48,0.55);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(0,255,153,0.2);
    background: rgba(23,21,48,0.85);
  }
`;

const CIcon = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: rgba(0,255,153,0.08);
  border: 1px solid rgba(0,255,153,0.15);
  display: flex; align-items: center; justify-content: center;
  color: #00ff99;
  font-size: 1rem;
  flex-shrink: 0;
`;

const CBody = styled.div`
  h3 {
    font-size: 0.875rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.025em;
    margin-bottom: 0.35rem;
  }
  p {
    font-size: 0.75rem;
    color: rgb(163,163,163);
    line-height: 1.625;
    margin: 0;
  }
`;

const getSyntax = (line) => {
  if (/\b(class|def|self|return)\b/.test(line)) return 'kw';
  if (line.trim().startsWith('#') || line.includes('"""')) return 'cmt';
  if (/'[^']*'/.test(line)) return 'str';
  if (/__init__|build_/.test(line)) return 'fn';
  return 'pun';
};

const CARDS_FALLBACK = [
  { icon: <FaLaptopCode />, title: 'Data Science Expertise', text: 'ML, Deep Learning, Statistical Modelling, Data Mining & Predictive Analytics using Python ecosystem.' },
  { icon: <FaGraduationCap />, title: 'Education', text: 'MCA, Christ University Bengaluru — specialised in Data Science and Artificial Intelligence.' },
  { icon: <FaChartLine />, title: 'Research & Innovation', text: 'Published ML research on Quantum Computing. Active in Kaggle and open-source data projects.' },
  { icon: <FaBrain />, title: 'Interests', text: 'Quantum Computing, NLP, Computer Vision, Time Series & MLOps best practices.' },
];

const AboutSection = ({ cmsAbout }) => {
  // CMS may return the code as one newline-joined string (or array entries
  // containing newlines) — normalize to one array element per visual line
  const rawLines = cmsAbout?.codeLines?.length ? cmsAbout.codeLines : aboutData.code;
  const normalized = (Array.isArray(rawLines) ? rawLines : [rawLines])
    .flatMap(l => String(l).split('\n'));
  // Real code blocks are always multi-line; fewer means the CMS entry lost
  // its line structure (newlines collapsed to spaces) — use local fallback
  const codeLines = normalized.length >= 3 ? normalized : aboutData.code;
  const cards = cmsAbout?.cards?.length
    ? cmsAbout.cards.map(c => ({
        icon: createElement(getIcon(c.iconName)),
        title: c.title,
        text: c.text,
      }))
    : CARDS_FALLBACK;

  const { displayedLines, isComplete } = useTypingEffect(codeLines);
  const ref = useRef(null);
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(OK, () => {
      // Opacity-only on the terminal: transforms would break its position:sticky
      // and fight the mousemove tilt that writes style.transform directly
      gsap.from('.about-terminal', {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-terminal', start: 'top 80%', once: true },
      });
      batchReveal('.about-card', scope.current);
    });
  }, { scope });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height/2) / r.height) * -5;
    const ry = ((e.clientX - r.left - r.width/2) / r.width) * 5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return (
    <Wrap id="about" ref={scope}>
      <AnimatedTitle label="// about">About Me</AnimatedTitle>
      <Grid>
        <Terminal
          ref={ref}
          className="about-terminal"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <TBar>
            <TDot $c="#FF5F57" /><TDot $c="#FEBC2E" /><TDot $c="#28C840" />
            <TTitle>myself.py</TTitle>
          </TBar>
          <TBody>
            <LNums>
              {displayedLines.map((_, i) => <LN key={i}>{i + 1}</LN>)}
            </LNums>
            <CodeBlock>
              {displayedLines.map((line, i) => (
                <CLine key={i}>
                  <span className={getSyntax(line)}>{line}</span>
                  {i === displayedLines.length - 1 && !isComplete && <TCursor />}
                </CLine>
              ))}
            </CodeBlock>
          </TBody>
        </Terminal>

        <div>
          <Cards>
            {cards.map(c => (
              <Card key={c.title} className="about-card">
                <CIcon>{c.icon}</CIcon>
                <CBody>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </CBody>
              </Card>
            ))}
          </Cards>
        </div>
      </Grid>
    </Wrap>
  );
};

export default AboutSection;
