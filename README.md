# Portfolio Website

A modern, interactive portfolio showcasing data science projects and professional experience. Features a dual-mode layout (professional/personal), content managed through Sanity CMS, and a serverless contact form.

## 🚀 Features

- **Dual-Mode Layout** - Toggle between a professional section stack and a personal mode
- **Sanity CMS** - Portfolio content (hero, projects, skills, experience, and more) served from Sanity, with a bundled Studio for editing
- **Responsive Design** - Seamless experience across all devices
- **Interactive UI** - 3D tilt effects, smooth animations, and dynamic transitions powered by Framer Motion
- **Project Showcase** - Bento grid layout with detailed project modals and filterable categories
- **Contact Form** - Emails delivered via Resend through a Vercel serverless function

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Styled Components, Framer Motion
- **CMS:** Sanity (v3 Studio + `@sanity/client`)
- **Backend:** Vercel serverless functions (Express shim for local dev), Resend for email
- **Icons:** React Icons
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/PRANABraight/Portfolio-Web.git

# Navigate to the app directory
cd Portfolio-Web/portf

# Install dependencies
npm install

# Start development (Vite on :5173 + Express API on :3000)
npm run dev
```

### Environment variables

Create `portf/.env.local`:

```bash
RESEND_API_KEY=...        # Resend API key for the contact form
CONTACT_TO_EMAIL=...      # Where contact form messages are delivered
```

> Never prefix server-side secrets with `VITE_` — those get bundled into client JS.

## 🏗️ Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## ✏️ Content Editing (Sanity Studio)

```bash
cd sanity
npm install
npm run dev      # Studio locally
npm run deploy   # Deploy Studio
```

Schemas live in `sanity/schemas/` (hero, about, projects, skills, experience, education, journey, stats, personal).

## 📁 Project Structure

```
Portfolio-Web/
├── portf/                 # React app (Vercel root directory)
│   ├── api/
│   │   └── send-email.js  # Serverless contact form handler
│   ├── server.js          # Express shim mounting the API for local dev
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/  # Full-page sections (Hero, Projects, Skills, ...)
│   │   │   └── common/    # Reusable pieces (modals, animated titles, ...)
│   │   ├── data/          # Static portfolio data / fallbacks
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Sanity client, GROQ queries, icon map
│   │   └── styles/        # Design tokens (theme.js) and global styles
│   └── vercel.json
└── sanity/                # Sanity Studio (schemas + config)
```

## 🎨 Key Sections

- **Hero** - Dynamic introduction with animated elements
- **About** - Interactive code window with typing animation
- **Projects** - Bento grid with detailed modals
- **Experience / Education / Journey** - Career timeline
- **Skills** - Comprehensive technology showcase
- **GitHub** - Activity and contribution highlights
- **Contact** - Form wired to Resend

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Pranab Rai**
- GitHub: [@PRANABraight](https://github.com/PRANABraight)
- LinkedIn: [Pranab Rai](https://www.linkedin.com/in/pranabrai)

---

Built with ❤️ using React and modern web technologies
