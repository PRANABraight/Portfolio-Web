// Radnaabazar-inspired design system — warm edition
// BG: #14100d | Accent: #fbbf24 | Font: JetBrains Mono

export const colors = {
  bg:       '#14100d',
  bg2:      '#1c1512',
  // Surface ladder — same warm brown-black hue as bg, stepped by value only
  surface0: '#0f0b08',
  surface1: '#211913',
  surface2: '#1d1611',
  bgCard:   'rgba(33, 25, 19, 0.6)',
  accent:   '#fbbf24',
  accentH:  '#f59e0b',
  text:     '#ffffff',
  text2:    'rgba(255, 255, 255, 0.6)',
  text3:    'rgba(255, 255, 255, 0.3)',
  border:   'rgba(255, 255, 255, 0.1)',
  borderA:  'rgba(251, 191, 36, 0.3)',

  // backward-compat aliases
  background: {
    primary:   '#14100d',
    secondary: '#1c1512',
    tertiary:  '#241b15',
    card:      'rgba(33, 25, 19, 0.6)',
    glass:     'rgba(33, 25, 19, 0.4)',
    console:   '#0f0b08',
    hover:     'rgba(251, 191, 36, 0.05)',
    active:    'rgba(251, 191, 36, 0.1)',
  },
  text: {
    primary:   '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.6)',
    muted:     'rgba(255, 255, 255, 0.3)',
    inverse:   '#14100d',
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
    primary:   'linear-gradient(135deg, #fbbf24 0%, #fde68a 100%)',
    secondary: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    cool:      'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)', /* legacy name — now warm */
    warm:      'linear-gradient(135deg, #ff8a5c 0%, #ffb894 100%)',
    success:   'linear-gradient(135deg, #fbbf24 0%, #fde68a 100%)',
    brand:     'linear-gradient(90deg, #fbbf24, #f97316, #ff8a5c)',
    rainbow:   'linear-gradient(90deg, #fbbf24, #f97316, #ff8a5c)', // alias of brand
  },
  shadow: {  // blue/purple/green names are legacy — all warm amber now
    sm:     '0 1px 4px rgba(0,0,0,0.6)',
    md:     '0 4px 20px rgba(0,0,0,0.7)',
    lg:     '0 12px 40px rgba(0,0,0,0.8)',
    xl:     '0 24px 64px rgba(0,0,0,0.85)',
    blue:   '0 8px 24px rgba(251,191,36,0.15)',
    purple: '0 8px 24px rgba(251,191,36,0.1)',
    green:  '0 8px 24px rgba(251,191,36,0.15)',
    orange: '0 8px 24px rgba(251,191,36,0.1)',
  },
  syntax: {
    keyword:     '#fb923c',
    string:      '#fde68a',
    comment:     'rgba(255, 255, 255, 0.25)',
    function:    '#fbbf24',
    property:    '#ffb894',
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
  warning:  { main: '#ffaa33', light: '#ffcc66', dark: '#dd8800' },
};

// Per-section accent palette — scroll walks amber→orange→coral→amber.
// hex: main accent | rgb: triplet for rgba(var(--accent-rgb), α) | soft: hover/gradient end | deep: dark fill
// 60-30-10 analogous-warm triad: amber dominant, orange secondary, coral rare highlight.
// Warm hues (~43° / ~27° / ~18°) at comparable lightness on #14100d.
const AMBER = { hex: '#fbbf24', rgb: '251, 191, 36',  soft: '#fde68a', deep: '#78350f' };
const ORANGE = { hex: '#f97316', rgb: '249, 115, 22',  soft: '#fb923c', deep: '#7c2d12' };
const CORAL = { hex: '#ff8a5c', rgb: '255, 138, 92',  soft: '#ffb894', deep: '#5c2413' };

export const sectionAccents = {
  hero:       AMBER,
  stats:      AMBER,
  education:  ORANGE,
  about:      ORANGE,
  approach:   ORANGE,
  projects:   AMBER,
  experience: ORANGE,
  journey:    CORAL,
  skills:     AMBER,
  github:     AMBER,
  contact:    AMBER,
  personal:   CORAL,
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
    display:  "'JetBrains Mono', 'Courier New', monospace",
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
