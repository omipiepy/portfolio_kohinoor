# Animations

Powered by Framer Motion 12. Organized into patterns:

## Scroll-Triggered (whileInView)

Used on nearly every section and card:

```jsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
```

Directional variants: `x: -30` (from left), `x: 30` (from right), `y: -30` (from above).

## Spring Animations

| Component       | Property                          | Config                          |
| --------------- | --------------------------------- | ------------------------------- |
| Navbar pill     | `layoutId="nav-pill"`             | `spring(stiffness: 400, damping: 30)` |
| ThemeToggle     | knob position                     | `spring(stiffness: 500, damping: 30)` |
| BackToTop       | `whileHover`, `whileTap`          | scale 1.1 / 0.9                 |
| Button          | `whileHover`, `whileTap`          | scale 1.05 / 0.95               |
| ProjectCard img | `whileHover`                      | scale 1.02                      |
| Timeline dots   | `whileInView` scale               | spring                          |

## AnimatePresence (Mount/Unmount)

| Component         | Exit animation                         |
| ----------------- | -------------------------------------- |
| LoadingScreen     | fade out                               |
| BackToTop         | fade + scale                           |
| CommandPalette    | backdrop fade + dialog scale-down      |
| Navbar mobile     | slide-in from right (x: '100%')        |
| Skills categories | fade + vertical direction              |
| Projects filter   | staggered grid transitions             |
| Contact form      | form ↔ success swap                    |

## Continuous / Looping

| Element              | Animation                              |
| -------------------- | -------------------------------------- |
| Hero avatar          | gentle float `y: [0, -10, 0]`         |
| Typewriter cursor    | blink `opacity: [1, 0]`               |
| Floating tech icons  | circular float + fade                  |
| Scroll-down indicator| bounce `y: [0, 8, 0]`                 |
| Particles (CSS)      | `@keyframes particle-float`           |
| Aurora blobs (CSS)   | `@keyframes aurora-float`             |

## Progress-Based

- **ScrollProgress bar**: `useScroll()` + `useSpring()` for smooth 0→1 tracking
- **SkillCard progress bars**: `width: ${level}%` with `whileInView` transition (1s easeOut)

## Layout Animations

- Navbar active pill uses `layoutId="nav-pill"` with `layout="position"` for smooth spring-based pill transition between nav items.

## Reduced Motion

All Framer Motion animations respect `useReducedMotion` hook — if user prefers reduced motion, animations are conditionally disabled. CSS-level reduced motion query globally disables all `@keyframes` animations.
