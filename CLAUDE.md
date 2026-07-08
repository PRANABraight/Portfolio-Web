# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `portf/`:

```bash
npm run dev      # Vite (port 5173) + Express server (port 3000) concurrently
npm run build    # Production build → dist/
npm run lint     # ESLint
npm run preview  # Serve dist/ locally
node server.js   # Express backend only
```

No test suite exists.

## Architecture

Single-page React 18 portfolio with a dual-mode layout. The `mode` state in `App.jsx` toggles between `'professional'` (full section stack) and `'personal'` (`PersonalSection` only). `Navbar` and `FloatingNav` both receive `setMode` to allow switching from anywhere.

**Project root:** `portf/` — all source lives here. There is no monorepo; the root `d:\pranab\Portfolio-Web\` just wraps the single `portf/` project.

### Key architectural decisions

- **Styling** — `styled-components` throughout, plus global styles in `src/index.css`. (Tailwind was removed — it was never wired into PostCSS.)
- **Design tokens** — `src/styles/theme.js` exports `colors`, `typography`, `spacing`, `borderRadius`, `transitions`, `breakpoints`. Import from here; do not hardcode hex values. Note the file has both flat aliases (`colors.accent`) and nested objects (`colors.background.primary`) for backward compatibility.
- **All content data** — `src/data/portfolioData.jsx` is the single source of truth for hero, about, skills, projects, experience, education, journey, stats, and social links. Editing display content means editing this file only.
- **Backend** — the contact form posts to `/api/send-email`, a Vercel serverless function in `api/send-email.js`. `server.js` is a thin Express shim mounting the same handler for local dev (Vite proxies `/api` to port 3000). `RESEND_API_KEY` and `CONTACT_TO_EMAIL` go in `.env.local` inside `portf/` — never with a `VITE_` prefix (those get bundled into client JS).
- **Animation** — Framer Motion throughout. Entry animations use `viewport={{ once: true }}` to fire once on scroll.
- **Section order** (professional mode): Hero → Stats → Education → About → GradientSection → Approach → Projects → Experience → Journey → Skills → GitHub → Contact → Footer

### Component layout

```
src/components/
  sections/        # Full-page sections (one per scroll stop)
  common/          # Reusable pieces: AnimatedTitle, ScrollProgress, ProjectModal, ErrorBoundary
  Background.jsx   # Animated canvas/CSS background, rendered outside <main>
  Navbar.jsx       # Top nav with mode toggle
  FloatingNav.jsx  # Bottom floating nav, mirrors Navbar mode toggle
  PageTransition.jsx
  Spotlight.jsx
```

**Deploy** — Vercel, with Root Directory set to `portf` (see `portf/vercel.json`). `api/` is auto-detected as serverless functions.
