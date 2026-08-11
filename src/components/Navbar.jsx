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
      <nav className="fixed top-[13px] left-0 right-0 z-50 px-[21px] pointer-events-none" aria-label="Main">
        <div className="nav-bar pointer-events-auto max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between h-[55px] px-[21px]">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#home')
              }}
              className="font-mono text-[21px] font-bold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
              whileHover={{ scale: 1.03 }}
            >
              {personalInfo.name.split(' ')[0]}
              <span className="text-[var(--color-accent)]">.</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-[34px]">
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
                    className={`phi-meta uppercase transition-colors ${
                      isActive
                        ? 'text-[var(--color-ink)]'
                        : 'text-[var(--color-faint)] hover:text-[var(--color-muted)]'
                    }`}
                  >
                    <span className="relative inline-block pb-[8px]">
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

            <div className="hidden md:flex items-center gap-[21px]">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            </div>

            <div className="flex md:hidden items-center gap-[13px]">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[55px] h-[55px] grid place-items-center rounded-[21px] border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_62%,transparent)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                      <FiX size={21} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                      <FiMenu size={21} />
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
              className="absolute right-0 top-0 h-full w-[233px] net-panel rounded-none p-[34px] pt-[89px] border-l border-[var(--color-line)]"
            >
              <div className="flex flex-col gap-[21px]">
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
                      className={`phi-meta uppercase transition-colors ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                    >
                      {item.label}
                    </a>
                  )
                })}
                <hr className="net-divider" />
                <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
