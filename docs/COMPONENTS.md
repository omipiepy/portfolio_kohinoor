# Components

## Reusable Components (`components/`)

### BackToTop
Fixed bottom-right button that scrolls to top. Appears after 500px scroll via `useState` + `scroll` listener.

### Button
Polymorphic button/link with 3 variants (`primary`, `secondary`, `outline`). Uses Framer Motion `whileHover` and `whileTap`. Renders as `<a>` when `href` is provided, otherwise `<button>`.

### Card
Glassmorphism card wrapper with scroll-reveal animation (`whileInView`) and optional hover lift (`whileHover`). Applied via `className` prop merging.

### CommandPalette
Ctrl+K modal overlay. Filters `navItems` by query. Scrolls to section on select. Uses `AnimatePresence` for enter/exit animations. `role="dialog"`, focus trap on backdrop click.

### Footer
Site footer with logo, tagline, social links (icons resolved via `iconMap`), and dynamic copyright year. Uses `socialLinks` from `data/portfolio.js`.

### LoadingScreen
Full-screen centered spinner that auto-dismisses after 1.2s via `useState` + `setTimeout`. Exit animation via `AnimatePresence`.

### Navbar
Fixed top nav with:
- Logo (scrolls to `#home`)
- Desktop nav links with active-indicator pill (`layoutId="nav-pill"` for smooth spring transition)
- Search button (opens CommandPalette)
- ThemeToggle
- Hamburger → slide-in mobile drawer (right-to-left)

Tracks `scrolled` state via `scroll` listener to toggle background blur/shadow.

### Particles
Canvas-free floating particles using CSS `@keyframes`. Count configured via `count` prop. Respects `prefers-reduced-motion` via `useReducedMotion`. `aria-hidden="true"`.

### ProjectCard
Expandable project card:
- Image with hover overlay scaling (`whileHover: scale(1.02)`)
- Description + tech stack tags
- Expandable sections: Features, Challenges, Learned
- GitHub & Live Demo buttons

`isExpanded` state toggled by "Show Details" button.

### ScrollProgress
Fixed 3px bar at top of viewport. Uses Framer Motion `useScroll()` + `useSpring()` for smooth progress tracking. `pointer-events: none`.

### SectionTitle
Section heading with:
- Gradient text heading
- Optional subtitle
- Decorative line divider below

### SkillCard
Skill display with:
- Icon (resolved via `iconMap`)
- Skill name
- Animated progress bar (`width: ${level}%` with `whileInView` transition)

### ThemeToggle
Toggle switch with sun/moon icons. Spring-animated knob (`stiffness: 500, damping: 30`). Rotating icon transition.

### Toast
Pub/sub notification system. Not currently wired into any section but available for use. `showToast(msg)` pushes to listeners, auto-clears after 3s.

## Sections (`sections/`)

| Section       | ID               | What it does                                                                    |
| ------------- | ---------------- | ------------------------------------------------------------------------------- |
| Hero          | `#home`          | Full-viewport intro: avatar, typewriter title, CTA buttons, social links, bg    |
| About         | `#about`         | Summary, education, interests (tags), quick stats                               |
| Skills        | `#skills`        | Categorized skills with filter tabs, animated progress bars                     |
| Projects      | `#projects`      | Filterable/searchable project grid with expandable details                      |
| Experience    | `#experience`    | Vertical timeline with animated line + dot markers                              |
| Certifications | `#certifications` | Certification cards with images, issuer badges, credential links               |
| Achievements  | `#achievements`  | Animated counters (CountUp triggered by `useInView`)                            |
| GitHubStats   | `#github`        | Static stats display + placeholder contribution graph                           |
| Testimonials  | `#testimonials`  | 3-column grid of testimonial cards with star ratings, quotes, avatars           |
| Contact       | `#contact`       | Contact info card (copy email) + validated contact form with simulated send     |

## Key Internal Components

### MagneticButton (Hero.jsx)
Tracks mouse position relative to its bounding rect. Applies spring-based offset transformation to create a magnetic parallax effect. Uses `useMousePosition` hook + `useSpring` from Framer Motion.

### FloatingInput (Contact.jsx)
Floating-label pattern input. Label animates up when input is focused or has a value. Supports `type`, `value`, `onChange`, `error`, `isTextarea` props.

### AnimatedCounter / CountUp (Achievements.jsx)
`CountUp` animates a number from 0 to target using `requestAnimationFrame` with easing. `AnimatedCounter` wraps `CountUp` and triggers it via `useInView` (one shot). Accepts `value`, `suffix`, `duration`.

### iconMap (Footer.jsx, SkillCard.jsx)
Maps string icon names (e.g., `'FaPython'`) to React icon components from `react-icons/fa` and `react-icons/si`.
