# Custom Hooks

7 custom hooks located in `src/hooks/`.

## useTheme
Manages dark/light mode.

**Mechanism:**
1. On mount, reads `localStorage` for `theme` key.
2. If no stored value, checks `prefers-color-scheme: dark` media query.
3. Toggles `dark` class on `document.documentElement`.
4. Persists choice to `localStorage` on toggle.

**Returns:** `{ isDark: boolean, toggle: () => void }`

---

## useKeyboardShortcuts
Registers global keyboard shortcuts.

**Mechanism:**
1. Accepts array of `{ key, ctrl?, shift?, fn }`.
2. Attaches `keydown` listener to `window`.
3. Checks `ctrlKey`/`metaKey`, `shiftKey`, and `event.key` match.
4. Calls `event.preventDefault()` and `fn()`.
5. Cleans up listener on unmount.

**Returns:** `void` (side-effect only)

Used by: `App.jsx` (Ctrl+K opens CommandPalette)

---

## useMousePosition
Tracks mouse cursor position.

**Mechanism:**
1. Attaches `mousemove` listener to `window`.
2. Updates `{ x, y }` state with `event.clientX`, `event.clientY`.
3. Throttles updates via `requestAnimationFrame` for performance.
4. Cleans up on unmount.

**Returns:** `{ x: number, y: number }`

Used by: `Hero.jsx` (MagneticButton effect)

---

## useReducedMotion
Detects user's motion preference.

**Mechanism:**
1. Matches `prefers-reduced-motion: reduce` media query.
2. Listens for `change` events on the media query list.
3. Updates state dynamically if preference changes at runtime.

**Returns:** `boolean` (true if user prefers reduced motion)

Used by: `Particles.jsx`, various animation decisions

---

## useScrollProgress
Calculates scroll progress as a 0–1 ratio.

**Mechanism:**
1. Attaches `scroll` listener to `window`.
2. Computes `scrollTop / (documentHeight - viewportHeight)`.
3. Clamps result to `[0, 1]`.
4. Uses `requestAnimationFrame` for throttling.
5. Cleans up on unmount.

**Returns:** `number` (0 to 1)

Used by: `ScrollProgress.jsx`

---

## useScrollSpy
Determines which section is currently in view (for active nav highlighting).

**Mechanism:**
1. Accepts array of section `ids` and optional `options` (rootMargin, threshold).
2. Creates `IntersectionObserver` with `rootMargin: '-80px 0px -50% 0px'`.
3. Observes each section element by ID.
4. Updates `activeId` when intersection ratio crosses threshold.
5. Cleans up observer on unmount.

**Returns:** `activeId: string`

Used by: `Navbar.jsx` (active nav pill)

---

## useTypewriter
Cycles through an array of strings with typewriter and delete effects.

**Mechanism:**
1. Accepts `strings[]`, `typeSpeed`, `deleteSpeed`, `delayBetween`.
2. Tracks `displayText` and `charIndex` via `useState`.
3. Uses `setTimeout` recursion:
   - **Typing phase:** Appends one character at a time at `typeSpeed`.
   - **Pause:** Waits `delayBetween` ms at end of string.
   - **Deleting phase:** Removes one character at a time at `deleteSpeed`.
   - **Next string:** Advances to next string in array (cycles infinitely).
4. Cleans up timeouts on unmount.

**Returns:** `text: string`

Used by: `Hero.jsx` (rotating titles under name)
