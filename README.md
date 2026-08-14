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
| Database | MongoDB Atlas (contact form, via serverless function) |

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server with HMR
npm run build   # production build to dist/
npm run preview # preview the production build
npm run lint    # run ESLint
```

> In plain `npm run dev` the contact form simulates success (no backend is running).
> To test against a real database locally, use `vercel dev` after configuring your env vars.

## Contact Form + MongoDB

Contact messages are saved to a **MongoDB Atlas** database through a serverless
function in [`api/contact.js`](api/contact.js) — no separate backend server to run or deploy.

### 1. Create the database

1. Create a free [MongoDB Atlas](https://www.mongodb.com/atlas) account and a free
   M0 cluster (Shared tier is fine).
2. In **Database Access**, create a database user with read/write access.
3. In **Network Access**, allow access from anywhere (`0.0.0.0/0`) or your IP.
4. Click **Connect → Drivers**, copy the connection string, and replace
   `<user>`/`<password>` with your database user's credentials. That's your `MONGODB_URI`.
5. The app will create the `portfolio` database and `messages` collection automatically
   on the first submission (override with `MONGODB_DB` / `MONGODB_COLLECTION`).

### 2. Configure locally

```bash
cp .env.example .env   # then fill in MONGODB_URI
```

### 3. Deploy to Vercel (easy)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com](https://vercel.com/new) — Vite is detected automatically
   and the `api/` folder becomes serverless functions.
3. In **Settings → Environment Variables**, add `MONGODB_URI` (and optionally
   `MONGODB_DB` / `MONGODB_COLLECTION`), then redeploy.
4. Done — submissions from the deployed site are stored in MongoDB Atlas.

For local testing with the real database: `npx vercel dev`.

### Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `MONGODB_URI` | Yes (deployed) | — | MongoDB Atlas connection string |
| `MONGODB_DB` | No | `portfolio` | Database name |
| `MONGODB_COLLECTION` | No | `messages` | Collection name |
| `VITE_CONTACT_API_URL` | No | `/api/contact` | Contact API endpoint (frontend) |

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
