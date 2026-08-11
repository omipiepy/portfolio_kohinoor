# Styling

## Approach

Tailwind CSS v4 with `@theme` directive for custom design tokens. Dark mode via `@custom-variant dark (&:where(.dark, .dark *))`. Single global stylesheet at `src/styles/index.css`.

## Theme Tokens

Defined in `index.css` via `@theme`:

| Token              | Light                | Dark                 |
| ------------------ | -------------------- | -------------------- |
| `--color-primary`  | Indigo-600           | Indigo-400           |
| `--color-secondary`| Cyan-600             | Cyan-400             |
| `--color-accent`   | Purple-600           | Purple-400           |
| `--color-bg`       | Gray-50              | Gray-950             |
| `--color-surface`  | White                | Gray-900             |
| `--color-text`     | Gray-900             | Gray-100             |
| `--color-text-muted` | Gray-500           | Gray-400             |
| `--color-border`   | Gray-200             | Gray-700             |
| `--font-mono`      | JetBrains Mono       | JetBrains Mono       |

## Glassmorphism System

Three reusable classes:

- **`.glass`** — semi-transparent background with blur (navbars, modals)
- **`.glass-card`** — more transparent, deeper blur (Card component)
- **`.glass-card-premium`** — available but unused

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Gradient System

| Class              | Effect                               |
| ------------------ | ------------------------------------ |
| `.gradient-text`   | Animated shifting gradient (indigo→cyan→purple) |
| `.gradient-text-simple` | Static two-color gradient                |
| `.gradient-bg`     | Solid gradient background             |
| `.gradient-border` | Pseudo-element animated gradient border |

## Hero Background

- `hero-gradient`: Multi-radial gradient
- `.aurora` / `.aurora-blob`: Floating blurred blobs with slow `@keyframes aurora-float`
- `.particle`: Small floating dots with `@keyframes particle-float`

## Animation Keyframes

| Keyframe            | Property              | Duration |
| ------------------- | --------------------- | -------- |
| `particle-float`    | translateY + opacity  | 3-8s     |
| `aurora-float`      | translate + scale     | 20-30s   |
| `gradient-shift`    | background-position   | 4s       |
| `border-shift`      | background-position   | 3s       |
| `spin-slow`         | rotate                | 8s       |
| `pulse-soft`        | opacity               | 3s       |

## Responsive Padding

```css
.section-padding {
  padding: 6rem 1rem;  /* mobile */
  @media (min-width: 768px) { padding: 7rem 2rem; }
  @media (min-width: 1024px) { padding: 8rem 2rem; }
}
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Also respected programmatically via `useReducedMotion` hook for Framer Motion animations.

## Accessibility

- `.focus-ring`: `outline-color: indigo` on `:focus-visible`
- `.skip-link`: visually hidden until focused (keyboard users)
- Custom scrollbar (thin, colored thumb)
- Selection color (indigo tint)
