import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)] backdrop-blur-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </motion.button>
  )
}
