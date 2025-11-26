// src/styles/theme.js

// Professional Color Palette - Data Science Theme
// Following color theory principles: 60-30-10 rule, accessibility, psychology

export const colors = {
  // Primary Colors - Trust & Intelligence
  primary: {
    main: '#1E40AF',      // Deep Blue - Trust, professionalism
    light: '#3B82F6',     // Lighter blue for hover states
    dark: '#1E3A8A',      // Darker blue for active states
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#1E40AF',
    700: '#1E3A8A',
    800: '#1E3A8A',
    900: '#1E3A8A',
  },

  // Secondary Colors - Innovation & Creativity
  secondary: {
    main: '#7C3AED',      // Vibrant Purple - Innovation
    light: '#8B5CF6',     // Lighter purple
    dark: '#6D28D9',      // Darker purple
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },

  // Success/Accent - Growth & Insights
  success: {
    main: '#059669',      // Emerald Green - Growth, data insights
    light: '#10B981',     // Lighter green
    dark: '#047857',      // Darker green
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Warning/CTA - Energy & Action
  warning: {
    main: '#F59E0B',      // Warm Orange - Energy, CTAs
    light: '#FBBF24',     // Lighter orange
    dark: '#D97706',      // Darker orange
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Neutral Colors - 60% of design
  background: {
    primary: '#0F172A',           // Dark Slate for main background
    secondary: '#1E293B',         // Slightly lighter slate for sections
    tertiary: '#334155',          // Lighter slate for accents
    card: 'rgba(30, 41, 59, 0.7)',      // Dark semi-transparent slate
    console: '#020617',           // Very dark slate for code windows
    glass: 'rgba(15, 23, 42, 0.6)',     // Dark glass effect
    hover: 'rgba(59, 130, 246, 0.1)',   // Blue tint for hover
    active: 'rgba(124, 58, 237, 0.15)', // Purple tint for active
  },

  text: {
    primary: '#F8FAFC',           // Light text for dark background
    secondary: '#94A3B8',         // Muted gray for secondary text
    muted: '#64748B',             // Darker gray for muted text
    inverse: '#0F172A',           // Dark text for light backgrounds (cards)
    link: '#60A5FA',              // Lighter blue for links
  },

  border: {
    default: 'rgba(255, 255, 255, 0.1)',    // Subtle white border
    hover: 'rgba(96, 165, 250, 0.5)',       // Blue border on hover
    light: 'rgba(255, 255, 255, 0.05)',     // Very subtle border
    focus: 'rgba(139, 92, 246, 0.6)',       // Purple focus ring
  },

  // Code Syntax Highlighting
  syntax: {
    keyword: '#7C3AED',           // Purple for keywords
    string: '#059669',            // Green for strings
    comment: '#64748B',           // Gray for comments
    function: '#1E40AF',          // Blue for functions
    property: '#F59E0B',          // Orange for properties
    punctuation: '#94A3B8',       // Light gray for punctuation
  },

  // Gradients - Visual interest
  gradient: {
    primary: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',        // Blue → Purple
    secondary: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',      // Purple → Light Purple
    success: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',        // Green → Light Green
    warm: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',          // Orange → Light Orange
    subtle: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(248,250,252,1) 100%)',
    mesh: 'radial-gradient(circle at 20% 30%, rgba(30, 64, 175, 0.08) 0%, transparent 50%)',
  },

  // Shadows with color tints
  shadow: {
    sm: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
    md: '0 4px 6px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.06)',
    lg: '0 10px 15px rgba(15, 23, 42, 0.1), 0 4px 6px rgba(15, 23, 42, 0.08)',
    xl: '0 20px 25px rgba(15, 23, 42, 0.12), 0 10px 10px rgba(15, 23, 42, 0.08)',
    blue: '0 10px 30px rgba(30, 64, 175, 0.2)',       // Blue glow
    purple: '0 10px 30px rgba(124, 58, 237, 0.2)',    // Purple glow
    green: '0 10px 30px rgba(5, 150, 105, 0.2)',      // Green glow
    orange: '0 10px 30px rgba(245, 158, 11, 0.2)',    // Orange glow
  },
};

export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
};

export const borderRadius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  '2xl': '24px',
  full: '9999px',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  transitions,
  breakpoints,
};
