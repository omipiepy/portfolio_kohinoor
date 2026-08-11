# Portfolio

A dark, minimal, single-page portfolio built with React, Vite, and Tailwind CSS — featuring a living tsParticles network background that reacts to the cursor.

## Highlights

- **Interactive particle network** — colorful particles that flee and swirl around the cursor, with connection lines drawn from the cursor to every nearby particle
- **Golden-ratio design system** — every size on the page follows the φ scale (13 → 16 → 26 → 42 → 68), from typography to spacing and radii
- **Floating translucent UI** — frosted-glass panels and a pill navbar over the live background
- **Animated sections** — staggered framer-motion reveals, typewriter hero, project case-study modals
- **Light / dark theme** — toggle in the navbar, respects system preference
- **Fully responsive** — mobile menu, fluid type, adaptive layouts

## Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 19, Tailwind CSS v4, framer-motion |
| Background | @tsparticles/react + @tsparticles/slim |
| Build | Vite 8, ESLint |
| Fonts | Inter, JetBrains Mono |

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server with HMR
npm run build   # production build to dist/
npm run preview # preview the production build
npm run lint    # run ESLint
```

## Project Structure

```
src/
├── components/   # Network, Navbar, ProjectCard, ProjectModal, ContactForm, ...
├── data/         # portfolio.js (personal info, skills, projects), contactData.js
├── hooks/        # useTheme, useScrollSpy, useTypewriter
├── layouts/      # MainLayout (nav + sections + footer over the network)
├── sections/     # Hero, About, Skills, Projects, Contact
└── styles/       # index.css — theme tokens + golden-ratio design system
```

## Customization

All content lives in one place — `src/data/portfolio.js`:

- **Personal info** — name, email, tagline, social links
- **Skills** — categories with skill name, level, and icon key
- **Projects** — title, description, technologies, highlights, case-study content
- **About** — summary, education, interests

Tune the network feel in `src/components/Network.jsx` (constants at the top of the file):

| Constant | Default | Effect |
| --- | --- | --- |
| `HOVER_RADIUS` | 150 | How far the cursor connects to particles |
| `LINK_DISTANCE` | 170 | Max distance for particle links |
| `REPULSE_RADIUS` | 110 | Size of the cursor repulsion zone |
| `REPULSE_FORCE` | 5.5 | Strength of the flee + swirl |
| `HOME_SPRING` | 0.0025 | How strongly particles return home |
| `WANDER` | 0.08 | Random drift that keeps particles floating |

## License

All rights reserved.
