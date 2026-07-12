import { css } from 'styled-components';

/* Lit-from-top hairline card: gradient border via double background,
   faint inner top highlight. Hover lifts with an accent bloom.
   Sections keep their own padding/radius; this only owns surface + border. */
export const premiumCard = css`
  border: 1px solid transparent;
  background:
    linear-gradient(var(--surface-1), var(--surface-1)) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.03) 45%, rgba(255, 255, 255, 0.05)) border-box;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        0 12px 40px -12px rgba(var(--accent-rgb), 0.25);
    }
  }
`;

/* Same surface without the hover lift — for static/informational panels. */
export const premiumSurface = css`
  border: 1px solid transparent;
  background:
    linear-gradient(var(--surface-1), var(--surface-1)) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03) 45%, rgba(255, 255, 255, 0.05)) border-box;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
`;
