import styled, { keyframes } from 'styled-components';
import { scrollToTop } from '../../hooks/useLenis';

const rainbowSlide = keyframes`
  from { background-position: 0% 50%; }
  to { background-position: -200% 50%; }
`;

const El = styled.footer`
  position: relative;
  padding: 1.5rem 1.25rem;
  border-top: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #fbbf24, #f97316, #ff8a5c, #fbbf24);
    background-size: 200% 100%;
    animation: ${rainbowSlide} 12s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before { animation: none; }
  }
`;

const Row = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) { flex-direction: row; }

  p {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.04em;
  }

  span { color: var(--site-accent, #fbbf24); }
`;

const Links = styled.nav`
  display: flex;
  gap: 1.25rem;

  a, button {
    display: inline-block;
    font-family: inherit;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);

    &:hover {
      color: var(--site-accent, #fbbf24);
      transform: translateY(-3px) scale(1.1);
    }
  }

  a:nth-child(1):hover { color: #fbbf24; }
  a:nth-child(2):hover { color: #f97316; }
  button:hover { color: #f97316; }

  @media (prefers-reduced-motion: reduce) {
    a, button {
      transition: color 0.2s ease;
      &:hover { transform: none; }
    }
  }
`;

const Footer = () => (
  <El>
    <Row>
      <p>© {new Date().getFullYear()} <span>Pranab Rai</span>. All rights reserved.</p>
      <Links aria-label="Footer">
        <a href="https://github.com/PRANABraight" target="_blank" rel="noopener noreferrer">github</a>
        <a href="https://www.linkedin.com/in/pranabrai" target="_blank" rel="noopener noreferrer">linkedin</a>
        <button type="button" onClick={() => scrollToTop()}>back to top ↑</button>
      </Links>
    </Row>
  </El>
);

export default Footer;
