import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
  margin-bottom: ${({ $mb }) => $mb || '3rem'};
`;

const Eyebrow = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(0, 255, 153, 0.7);
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: #fff;

  @media (min-width: 1280px) { font-size: 3rem; }

  span { color: #00ff99; }
`;

const Sub = styled.p`
  font-size: 0.875rem;
  color: rgb(161, 161, 170);
  max-width: 600px;
  margin: 1rem auto 0;
  line-height: 1.625;
`;

/* Unified section heading: optional mono eyebrow, h2 title, optional subtitle.
   Accent words in `children` via <span>. */
const SectionTitle = ({ eyebrow, children, sub, mb, className }) => (
  <Wrap $mb={mb} className={className}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Title>{children}</Title>
    {sub && <Sub>{sub}</Sub>}
  </Wrap>
);

export default SectionTitle;
