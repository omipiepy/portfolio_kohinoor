# Architecture Overview

A single-page React 19 portfolio site for an AI/ML Engineer & Full Stack Developer. Built with Vite, Tailwind CSS v4, and Framer Motion. No client-side router — navigation is anchor-based smooth scrolling.

## Tech Stack

| Layer       | Choice             |
| ----------- | ------------------ |
| Framework   | React 19           |
| Bundler     | Vite 8             |
| Styling     | Tailwind CSS v4    |
| Animation   | Framer Motion 12   |
| Icons       | react-icons        |
| Path Alias  | `@/` → `src/`      |

## High-Level Structure

```
src/
  assets/           -- Static assets (empty)
  components/       -- 14 reusable UI components
  data/             -- Single source of truth for all content
  hooks/            -- 7 custom hooks
  layouts/          -- MainLayout (page shell)
  sections/         -- 10 page sections
  styles/           -- Tailwind + global CSS
  utils/            -- Utility functions (empty)
  App.jsx           -- Root orchestrator
  main.jsx          -- Entry point
```

## Component Tree

```
<StrictMode>
  <App>
    <LoadingScreen />
    <ScrollProgress />
    <CommandPalette />
    <MainLayout>
      <Navbar>
        <ThemeToggle />
      </Navbar>
      <main>
        <Hero>
          <Particles />
          <Button /> (x2)
        </Hero>
        <About>
          <SectionTitle />
          <Card /> (xN)
        </About>
        <Skills>
          <SectionTitle />
          <SkillCard /> (xN)
        </Skills>
        <Projects>
          <SectionTitle />
          <ProjectCard /> (xN)
        </Projects>
        <Experience>
          <SectionTitle />
          <Card /> (xN)
        </Experience>
        <Certifications>
          <SectionTitle />
          <Card /> (xN)
        </Certifications>
        <Achievements>
          <SectionTitle />
          <Card /> (xN)
          <AnimatedCounter /> → <CountUp />
        </Achievements>
        <GitHubStats>
          <SectionTitle />
          <Card /> (xN)
        </GitHubStats>
        <Testimonials>
          <SectionTitle />
          <Card /> (xN)
        </Testimonials>
        <Contact>
          <SectionTitle />
          <Card /> (x2)
          <FloatingInput /> (x4)
          <Button />
        </Contact>
      </main>
      <Footer />
    </MainLayout>
    <BackToTop />
  </App>
</StrictMode>
```

## State Management

No global store. State is local and minimal:

| State              | Owner     | Flow                                  |
| ------------------ | --------- | ------------------------------------- |
| Theme (dark/light) | `useTheme` hook | localStorage + `<html class="dark">` |
| Command palette    | `App.jsx` | `useState` → `useKeyboardShortcuts`  |
| Mobile nav         | `Navbar`  | `useState` (isOpen)                   |
| Active skill tab   | `Skills`  | `useState` (activeCategory)           |
| Project filters    | `Projects` | `useState` + `useMemo` filtering    |
| Form state         | `Contact` | `useState` (fields, errors, status)   |

## Data Flow

All content lives in `data/portfolio.js` as exported constants. Each section imports what it needs directly — no prop drilling of data. The only props passed between components are UI-behavior props (`isDark`, `toggle`, `onOpenCommand`).

## Navigation

- **No React Router** — pure anchor-based navigation.
- Navbar links call `element.scrollIntoView({ behavior: 'smooth' })`.
- `useScrollSpy` uses `IntersectionObserver` to highlight the active nav link.
- `CommandPalette` opens via `Ctrl+K` and scrolls to the selected section.
- `html { scroll-behavior: smooth }` is set globally.
