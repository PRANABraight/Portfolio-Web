import styled from 'styled-components';

const El = styled.footer`
  padding: 1.25rem;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.05);

  p {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.04em;
  }

  span { color: #00ff99; }
`;

const Footer = () => (
  <El>
    <p>© {new Date().getFullYear()} <span>Pranab Rai</span>. All rights reserved.</p>
  </El>
);

export default Footer;
