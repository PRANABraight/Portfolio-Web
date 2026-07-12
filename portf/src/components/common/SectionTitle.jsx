import { useRef, isValidElement, cloneElement } from 'react';
import styled from 'styled-components';
import { gsap, useGSAP, OK } from '../../lib/motion';

const Wrap = styled.div`
  text-align: center;
  margin-bottom: ${({ $mb }) => $mb || '3rem'};
`;

const Eyebrow = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(var(--accent-rgb), 0.7);
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: #fff;

  @media (min-width: 1280px) { font-size: 3rem; }

  .st-letter { display: inline-block; white-space: pre; }

  /* Accent words: gradient text. Applied per-letter because background-clip:text
     doesn't paint through child inline-blocks. */
  .st-accent { color: var(--accent); }
  .st-accent .st-letter {
    background: linear-gradient(120deg, var(--accent), var(--accent-soft));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Sub = styled.p`
  font-size: 0.875rem;
  color: rgb(168, 162, 158);
  max-width: 600px;
  margin: 1rem auto 0;
  line-height: 1.625;
`;

/* Flatten children to plain text for the accessible label. */
const toText = (node) => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  if (isValidElement(node)) return toText(node.props.children);
  return '';
};

/* Split text nodes into per-letter spans, preserving element wrappers (accent <span>s). */
const splitLetters = (node, keyRef) => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).split('').map((ch) => (
      <span className="st-letter" key={`l${keyRef.k++}`}>{ch}</span>
    ));
  }
  if (Array.isArray(node)) return node.map((n) => splitLetters(n, keyRef));
  if (isValidElement(node)) {
    const extra = node.type === 'span'
      ? { className: `${node.props.className ?? ''} st-accent`.trim() }
      : {};
    return cloneElement(
      node,
      { key: `n${keyRef.k++}`, ...extra },
      splitLetters(node.props.children, keyRef)
    );
  }
  return node;
};

/* Unified section heading: optional mono eyebrow, h2 title, optional subtitle.
   Accent words in `children` via <span> (rendered as accent gradient text).
   Letters bounce in on first scroll into view; static under reduced motion. */
const SectionTitle = ({ eyebrow, children, sub, mb, className }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(OK, () => {
        const letters = ref.current.querySelectorAll('.st-letter');
        if (!letters.length) return;
        gsap.from(letters, {
          y: '0.7em',
          autoAlpha: 0,
          duration: 0.55,
          ease: 'back.out(2.2)',
          stagger: 0.028,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Wrap $mb={mb} className={className} ref={ref}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title aria-label={toText(children)}>
        <span aria-hidden="true" className="st-inner">
          {splitLetters(children, { k: 0 })}
        </span>
      </Title>
      {sub && <Sub>{sub}</Sub>}
    </Wrap>
  );
};

export default SectionTitle;
