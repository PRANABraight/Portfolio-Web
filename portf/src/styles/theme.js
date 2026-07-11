// Radnaabazar-inspired design system
// BG: #0f0e1a | Accent: #00ff99 | Font: JetBrains Mono

export const colors = {
  bg:       '#0f0e1a',
  bg2:      '#16142a',
  // Surface ladder — same violet-navy hue as bg, stepped by value only
  surface0: '#0b0a16',
  surface1: '#171530',
  surface2: '#14122b',
  bgCard:   'rgba(23, 21, 48, 0.6)',
  accent:   '#00ff99',
  accentH:  '#00e187',
  text:     '#ffffff',
  text2:    'rgba(255, 255, 255, 0.6)',
  text3:    'rgba(255, 255, 255, 0.3)',
  border:   'rgba(255, 255, 255, 0.1)',
  borderA:  'rgba(0, 255, 153, 0.3)',

  // backward-compat aliases
  background: {
    primary:   '#0f0e1a',
    secondary: '#16142a',
    tertiary:  '#1e1c30',
    card:      'rgba(23, 21, 48, 0.6)',
    glass:     'rgba(23, 21, 48, 0.4)',
    console:   '#0b0a16',
    hover:     'rgba(0, 255, 153, 0.05)',
    active:    'rgba(0, 255, 153, 0.1)',
  },
  text: {
    primary:   '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.6)',
    muted:     'rgba(255, 255, 255, 0.3)',
    inverse:   '#0f0e1a',
    link:      '#00ff99',
  },
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    hover:   'rgba(0, 255, 153, 0.4)',
    light:   'rgba(255, 255, 255, 0.06)',
    focus:   'rgba(0, 255, 153, 0.7)',
    subtle:  'rgba(255, 255, 255, 0.04)',
  },
  gradient: {
    primary:   'linear-gradient(135deg, #00ff99 0%, #00cc77 100%)',
    secondary: 'linear-gradient(135deg, #00ff99 0%, #00ffcc 100%)',
    success:   'linear-gradient(135deg, #00ff99 0%, #00dd88 100%)',
    warm:      'linear-gradient(135deg, #00ff99 0%, #88ffcc 100%)',
  },
  shadow: {
    sm:     '0 1px 4px rgba(0,0,0,0.6)',
    md:     '0 4px 20px rgba(0,0,0,0.7)',
    lg:     '0 12px 40px rgba(0,0,0,0.8)',
    xl:     '0 24px 64px rgba(0,0,0,0.85)',
    blue:   '0 8px 24px rgba(0,255,153,0.15)',
    purple: '0 8px 24px rgba(0,255,153,0.1)',
    green:  '0 8px 24px rgba(0,255,153,0.15)',
    orange: '0 8px 24px rgba(0,255,153,0.1)',
  },
  syntax: {
    keyword:     '#00ff99',
    string:      'rgba(0, 255, 153, 0.6)',
    comment:     'rgba(255, 255, 255, 0.25)',
    function:    '#62d9e8',
    property:    '#ffbb66',
    punctuation: 'rgba(255, 255, 255, 0.4)',
  },
  primary: {
    main:  '#00ff99', light: '#44ffbb', dark: '#00cc77',
    50:'#e6fff5',100:'#ccffea',200:'#99ffd5',300:'#66ffc0',400:'#33ffaa',
    500:'#00ff99',600:'#00cc77',700:'#009955',800:'#006633',900:'#003311',
  },
  secondary: {
    main:  '#00ff99', light: '#44ffbb', dark: '#00cc77',
    50:'#e6fff5',100:'#ccffea',200:'#99ffd5',300:'#66ffc0',400:'#33ffaa',
    500:'#00ff99',600:'#00cc77',700:'#009955',800:'#006633',900:'#003311',
  },
  success:  { main: '#00ff99', light: '#44ffbb', dark: '#00cc77' },
  warning:  { main: '#ffaa33', light: '#ffcc66', dark: '#dd8800' },
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

export const breakpoints = {
  xs:'320px', sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1536px',
};

export default { colors, typography, spacing, borderRadius, transitions, breakpoints };
