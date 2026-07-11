import styled from 'styled-components';
import { scrollToTop } from '../../hooks/useLenis';

const El = styled.footer`
  padding: 1.5rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.05);
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

  span { color: #00ff99; }
`;

const Links = styled.nav`
  display: flex;
  gap: 1.25rem;

  a, button {
    font-family: inherit;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover { color: #00ff99; }
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
