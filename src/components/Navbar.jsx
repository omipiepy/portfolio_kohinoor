import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { navItems, personalInfo } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'

export default function Navbar({ isDark, toggleTheme, onOpenCommand }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(navItems.map((item) => item.href.slice(1)), 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const scrollTo = (href) => {
    setIsOpen(false)
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-slate-900/5 dark:shadow-black/20' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#home')
              }}
              className="text-xl font-bold gradient-text shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              {personalInfo.name.split(' ')[0]}
              <span className="text-indigo-500">.</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeId === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(item.href)
                    }}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={onOpenCommand}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer"
                aria-label="Open command palette"
              >
                <FiSearch className="w-4 h-4" />
              </motion.button>
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            </div>

            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 mt-0.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                      <FiX size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                      <FiMenu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-72 glass shadow-xl p-6 pt-28 border-l border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeId === item.href.slice(1)
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(item.href)
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <ul className="flex items-center gap-2">
                        <li>{item.label}</li>
                      </ul>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
