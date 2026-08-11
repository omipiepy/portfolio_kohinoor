import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full flex items-center px-1 cursor-pointer bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus-ring shrink-0"
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <FiMoon className="w-3 h-3 text-indigo-400" />
          ) : (
            <FiSun className="w-3 h-3 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
