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

- **Dual styling system** — components mix `styled-components` and Tailwind CSS. New components should pick one and stay consistent within the file.
- **Design tokens** — `src/styles/theme.js` exports `colors`, `typography`, `spacing`, `borderRadius`, `transitions`, `breakpoints`. Import from here; do not hardcode hex values. Note the file has both flat aliases (`colors.accent`) and nested objects (`colors.background.primary`) for backward compatibility.
- **All content data** — `src/data/portfolioData.jsx` is the single source of truth for hero, about, skills, projects, experience, education, journey, stats, and social links. Editing display content means editing this file only.
- **Backend** — `server.js` is a minimal Express server solely for the contact form email via Resend API. It runs separately from Vite on port 3000. `VITE_RESEND_API_KEY` must be set in `.env` inside `portf/`.
- **Animation** — Framer Motion throughout. Entry animations use `viewport={{ once: true }}` to fire once on scroll.
- **Section order** (professional mode): Hero → Stats → Education → GradientSection → Approach → Projects → Experience → Journey → Skills → GitHub → Contact → Footer

### Component layout

```
src/components/
  sections/        # Full-page sections (one per scroll stop)
  common/          # Reusable pieces: AnimatedTitle, StatCounter, ScrollProgress, ProjectModal, MagneticButton
  Background.jsx   # Animated canvas/CSS background, rendered outside <main>
  Navbar.jsx       # Top nav with mode toggle
  FloatingNav.jsx  # Bottom floating nav, mirrors Navbar mode toggle
  PageTransition.jsx
  Spotlight.jsx
```

`ProjectsSection_working.jsx` is a scratch/backup file — not imported anywhere, safe to ignore.
