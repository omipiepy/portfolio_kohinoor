// Graph theme — golden ratio (φ ≈ 1.618) based sizing and a restrained
// dark-theme palette. Node groups map to muted category colors.

export const PHI = 1.618

// Golden ratio scale (rounded to integers)
export const GR = {
  s0: 0,
  s1: 8, // 8
  s2: 13, // 8 × 1.618 ≈ 13
  s3: 21, // 13 × 1.618 ≈ 21
  s4: 34, // 21 × 1.618 ≈ 34
  s5: 55, // 34 × 1.618 ≈ 55
  s6: 89, // 55 × 1.618 ≈ 89
  s7: 144, // 89 × 1.618 ≈ 144
  s8: 233, // 144 × 1.618 ≈ 233
}

// Node size tiers (golden scale)
export const NODE_SIZE = {
  hub: GR.s4, // 34 — profile / central hub
  large: GR.s3, // 21 — categories, projects
  medium: GR.s2, // 13 — education, experience, contact
  small: GR.s1, // 8 — skills, tech, interests
}

// 5 muted node categories, with light/dark variants
export const GROUPS = {
  core: {
    label: 'Identity & Contact',
    color: { light: '#2f7ea6', dark: '#5fa8c7' },
  },
  ai: {
    label: 'AI & Data',
    color: { light: '#45744f', dark: '#7fa98b' },
  },
  backend: {
    label: 'Backend & Infra',
    color: { light: '#4e6399', dark: '#7c93c7' },
  },
  code: {
    label: 'Languages & Tools',
    color: { light: '#99547a', dark: '#c78fa8' },
  },
  featured: {
    label: 'Projects & Learning',
    color: { light: '#a37a25', dark: '#d3b272' },
  },
}

export const groupColor = (group, isDark) =>
  GROUPS[group]?.color[isDark ? 'dark' : 'light'] ?? '#888888'

// Typography scale (golden-ish): 13 / 21 / 34
export const FONT = {
  body: '13px',
  label: '13px',
  heading: '21px',
  display: '34px',
}
