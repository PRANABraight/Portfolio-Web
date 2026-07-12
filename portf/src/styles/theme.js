// Neutral premium design system — single gold accent on neutral charcoal
// BG: #0e0e10 | Accent: #fbbf24 gold (the only hue on the page)
// 60-30-10: neutral charcoal / white-opacity ladder / gold on action & identity only.

export const colors = {
  bg:       '#0e0e10',
  bg2:      '#131316',
  // Surface ladder — one neutral charcoal hue, stepped by value only
  surface0: '#09090b',
  surface1: '#17171b',
  surface2: '#121215',
  bgCard:   'rgba(23, 23, 27, 0.6)',
  accent:   '#fbbf24',
  accentH:  '#f59e0b',
  text:     '#ffffff',
  text2:    'rgba(255, 255, 255, 0.6)',
  text3:    'rgba(255, 255, 255, 0.35)',
  border:   'rgba(255, 255, 255, 0.1)',
  borderA:  'rgba(251, 191, 36, 0.3)',

  // backward-compat aliases
  background: {
    primary:   '#0e0e10',
    secondary: '#131316',
    tertiary:  '#1a1a1f',
    card:      'rgba(23, 23, 27, 0.6)',
    glass:     'rgba(23, 23, 27, 0.4)',
    console:   '#09090b',
    hover:     'rgba(251, 191, 36, 0.05)',
    active:    'rgba(251, 191, 36, 0.1)',
  },
  text: {
    primary:   '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.6)',
    muted:     'rgba(255, 255, 255, 0.35)',
    inverse:   '#0e0e10',
    link:      '#fbbf24',
  },
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    hover:   'rgba(251, 191, 36, 0.4)',
    light:   'rgba(255, 255, 255, 0.06)',
    focus:   'rgba(251, 191, 36, 0.7)',
    subtle:  'rgba(255, 255, 255, 0.04)',
  },
  gradient: {
    // Single-hue only — gold sheens and neutral fades, no rainbows
    primary:   'linear-gradient(135deg, #fbbf24 0%, #fde68a 100%)',
    secondary: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
    cool:      'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    warm:      'linear-gradient(135deg, #fbbf24 0%, #fde68a 100%)',
    success:   'linear-gradient(135deg, #fbbf24 0%, #fde68a 100%)',
    brand:     'linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24)', // metal sheen
    rainbow:   'linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24)', // alias of brand
  },
  shadow: {
    // Neutral depth + hairline light ring; gold reserved for glow variants
    sm:     '0 1px 4px rgba(0,0,0,0.5)',
    md:     '0 4px 20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)',
    lg:     '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
    xl:     '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
    blue:   '0 8px 24px rgba(251,191,36,0.12)',
    purple: '0 8px 24px rgba(251,191,36,0.12)',
    green:  '0 8px 24px rgba(251,191,36,0.12)',
    orange: '0 8px 24px rgba(251,191,36,0.15)',
  },
  syntax: {
    // Gold-on-graphite editor: gold marks the language, neutrals carry the rest
    keyword:     '#fbbf24',
    string:      '#fde68a',
    comment:     'rgba(255, 255, 255, 0.25)',
    function:    'rgba(255, 255, 255, 0.85)',
    property:    'rgba(255, 255, 255, 0.6)',
    punctuation: 'rgba(255, 255, 255, 0.4)',
  },
  primary: {
    main:  '#fbbf24', light: '#fcd34d', dark: '#d97706',
    50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',
    500:'#fbbf24',600:'#d97706',700:'#b45309',800:'#92400e',900:'#451a03',
  },
  secondary: {
    main:  '#fbbf24', light: '#fcd34d', dark: '#d97706',
    50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',
    500:'#fbbf24',600:'#d97706',700:'#b45309',800:'#92400e',900:'#451a03',
  },
  success:  { main: '#fbbf24', light: '#fcd34d', dark: '#d97706' },
  warning:  { main: '#fbbf24', light: '#fde68a', dark: '#d97706' },
};

// Single-accent decision: one gold across every section. The accentVars()/
// --site-accent machinery stays wired (sections keep their hooks), it just
// resolves to the same hue everywhere — restraint reads premium, and a future
// re-walk only means editing this map.
const GOLD = { hex: '#fbbf24', rgb: '251, 191, 36', soft: '#fde68a', deep: '#78350f' };

export const sectionAccents = {
  hero:       GOLD,
  stats:      GOLD,
  education:  GOLD,
  about:      GOLD,
  approach:   GOLD,
  projects:   GOLD,
  experience: GOLD,
  journey:    GOLD,
  skills:     GOLD,
  github:     GOLD,
  contact:    GOLD,
  personal:   GOLD,
};

// Drop into a section's outermost styled wrapper: ${accentVars('education')}
// Everything inside then reads var(--accent), rgba(var(--accent-rgb), α), etc.
export const accentVars = (name) => {
  const a = sectionAccents[name];
  return `
    --accent: ${a.hex};
    --accent-h: ${a.soft};
    --accent-rgb: ${a.rgb};
    --accent-soft: ${a.soft};
    --accent-deep: ${a.deep};
  `;
};

export const typography = {
  fontFamily: {
    primary: "'JetBrains Mono', 'Courier New', monospace",
    display:  "'Space Grotesk', 'Helvetica Neue', sans-serif",
    mono:     "'JetBrains Mono', 'Courier New', monospace",
  },
  fontSize: {
    xs:   '0.75rem',   /* text-xs */
    sm:   '0.875rem',  /* text-sm */
    base: '1rem',      /* text-base */
    lg:   '1.125rem',  /* text-lg */
    xl:   '1.25rem',   /* text-xl */
    '2xl':'1.5rem',    /* text-2xl */
    '3xl':'1.875rem',  /* text-3xl */
    '4xl':'2.25rem',   /* text-4xl */
    '5xl':'3rem',      /* text-5xl */
    '6xl':'3.75rem',   /* text-6xl */
    '7xl':'4.5rem',    /* text-7xl */
  },
  fontWeight: { light:300, regular:400, medium:500, semibold:600, bold:700, extrabold:800 },
  lineHeight: { tight:1.1, normal:1.5, relaxed:1.625 },
  letterSpacing: { tight:'-0.025em', normal:'0', wide:'0.05em', wider:'0.1em' },
};

export const spacing = {
  xs:'0.25rem', sm:'0.5rem', md:'1rem', lg:'1.5rem',
  xl:'2rem', '2xl':'3rem', '3xl':'4rem', '4xl':'6rem', '5xl':'8rem',
};

export const borderRadius = {
  sm:'4px', md:'8px', lg:'12px', xl:'16px', '2xl':'24px', '3xl':'32px', full:'9999px',
};

export const transitions = {
  fast:'120ms cubic-bezier(0.4,0,0.2,1)',
  base:'220ms cubic-bezier(0.4,0,0.2,1)',
  slow:'380ms cubic-bezier(0.4,0,0.2,1)',
  spring:'420ms cubic-bezier(0.34,1.56,0.64,1)',
};

// Reference values only — components intentionally use per-component px media queries.
export const breakpoints = {
  xs:'320px', sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1536px',
};

export default { colors, typography, spacing, borderRadius, transitions, breakpoints, sectionAccents };
