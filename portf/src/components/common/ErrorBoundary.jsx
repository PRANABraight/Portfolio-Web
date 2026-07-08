import React from 'react';
import { colors, typography } from '../../styles/theme';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          background: colors.bg,
          color: colors.text.primary,
          fontFamily: typography.fontFamily.mono,
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '1.5rem' }}>
            Something went <span style={{ color: colors.accent }}>wrong</span>.
          </h1>
          <p style={{ color: colors.text2, fontSize: '0.875rem', maxWidth: '420px' }}>
            An unexpected error occurred. Please refresh the page — if the problem
            persists, reach me at pranabrai137@gmail.com.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '9999px',
              border: `1px solid ${colors.accent}`,
              background: 'transparent',
              color: colors.accent,
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
