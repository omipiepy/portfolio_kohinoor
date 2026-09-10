import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { navItems, personalInfo } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'

export default function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const activeId = useScrollSpy(navItems.map((item) => item.href.slice(1)), 80)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const scrollTo = (href) => {
    setIsOpen(false)
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="sticky top-5 z-50 pointer-events-none flex justify-center" aria-label="Main">
        <div className="nav-bar pointer-events-auto max-w-[1000px]">
          <div className="flex items-center justify-between h-[60px] px-10 gap-x-10">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#home')
              }}
              className="font-mono text-[18px] font-bold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              {personalInfo.name.split(' ')[0]}
              <span className="text-[var(--color-accent)]">.</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-x-10">
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
                    className={`font-mono text-[13px] uppercase tracking-[0.05em] transition-colors ${
                      isActive
                        ? 'text-[var(--color-ink)]'
                        : 'text-[var(--color-faint)] hover:text-[var(--color-muted)]'
                    }`}
                  >
                    <span className="relative inline-block pb-1">
                      {item.label}
                      <span
                        className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-[var(--color-accent)] transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </span>
                  </a>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-x-2">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            </div>

            <div className="flex md:hidden items-center gap-x-2">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 grid place-items-center rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] backdrop-blur-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[260px] backdrop-blur-[16px] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] border-l border-[var(--color-line)] p-6 pt-24"
            >
              <div className="flex flex-col gap-y-6">
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
                      className={`font-mono text-[13px] uppercase tracking-[0.05em] transition-colors ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                    >
                      {item.label}
                    </a>
                  )
                })}
                <hr className="net-divider my-2" />
                <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
