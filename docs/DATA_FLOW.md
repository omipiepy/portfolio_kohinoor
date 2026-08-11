# Data Flow

## Content Data (`data/portfolio.js`)

Single file exporting all content as named constants. No external CMS or API — all data is hardcoded.

| Export             | Type     | Used By                                  |
| ------------------ | -------- | ---------------------------------------- |
| `personalInfo`     | Object   | Hero, About, Navbar, Footer              |
| `socialLinks`      | Array    | Hero, Footer                             |
| `navItems`         | Array    | Navbar, CommandPalette                   |
| `skillCategories`  | Array    | Skills                                   |
| `projectCategories`| Array    | Projects (filter tabs)                   |
| `projects`         | Array    | Projects, ProjectCard                     |
| `experiences`      | Array    | Experience                               |
| `education`        | Array    | About                                    |
| `certifications`   | Array    | Certifications                           |
| `achievements`     | Array    | Achievements                             |
| `testimonials`     | Array    | Testimonials                             |
| `interests`        | Array    | About                                    |
| `aboutSummary`     | String   | About                                    |

## Theme State Flow

```
useTheme()
  │
  ├─ reads localStorage / prefers-color-scheme
  ├─ toggles <html class="dark">
  └─ returns { isDark, toggle }
       │
       ▼
     App.jsx
       │
       ├─► MainLayout (bg/text classes)
       └─► Navbar ──► ThemeToggle
```

## Command Palette Flow

```
Ctrl+K (or search button click)
       │
       ▼
  App.jsx: setCommandOpen(true)
       │
       ▼
  CommandPalette renders (AnimatePresence)
       │
       ├─ user types → filters navItems
       └─ selects item → scrollIntoView + close
```

## Section Data Flow Pattern

```
data/portfolio.js  ───►  Section (e.g., Skills.jsx)
                            │
                            ├─ reads skillCategories directly
                            ├─ manages local state (activeCategory)
                            └─ passes single skill to SkillCard as props
```

There is no prop drilling of content data. Each section imports only what it needs. Props are used only for:
- UI behavior (`isDark`, `toggle`, `onOpenCommand`)
- Item-level data (`project`, `index`, `name`, `level`, `icon`, `delay`, etc.)

## Project Filtering (useMemo)

```
Projects.jsx:
  state: searchQuery, activeCategory
  useMemo → filteredProjects
    ├─ filters by category (or "all")
    └─ filters by search (name, description, tech stack)
```

## Form Submission Flow (Contact)

```
FloatingInput: onChange → update formFields state
                  │
                  ▼
                Client-side validation:
                  ├─ name: min 2 chars
                  ├─ email: regex test
                  ├─ subject: min 3 chars
                  └─ message: min 10 chars
                  │
                  ▼
                Submit → setSubmitting(true)
                  │
                  ▼
                Simulated API call (setTimeout 1.5s)
                  │
                  ▼
                setSubmitted(true) → show success state
```
