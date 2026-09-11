import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { navItems, personalInfo } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import scrollStore from '@/store'

export default function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const itemRefs = useRef({})
  const sectionIds = useMemo(() => navItems.map((item) => item.href.slice(1)), [])
  const activeId = useScrollSpy(sectionIds, 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!indicatorRef.current || !itemRefs.current[activeId]) return
    const el = itemRefs.current[activeId]
    const nav = navRef.current
    if (!el || !nav) return
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    indicatorRef.current.style.left = `${elRect.left - navRect.left}px`
    indicatorRef.current.style.width = `${elRect.width}px`
  }, [activeId])

  const scrollTo = (href) => {
    setIsOpen(false)
    const id = href.slice(1)
    const target = scrollStore.targets[id]
    if (target !== undefined) {
      window.scrollTo({ top: Math.max(0, target - 80), behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-4 left-0 right-0 z-[100] pointer-events-none flex justify-center px-4"
        aria-label="Main"
      >
        <div
          className={`pointer-events-auto rounded-2xl transition-all duration-500 ease-out ${
            scrolled
              ? 'bg-[color-mix(in_srgb,var(--color-bg)_80%,transparent)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[var(--color-line)]'
              : 'bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)] backdrop-blur-md border border-transparent'
          }`}
        >
          <div className="flex items-center h-14 px-5 sm:px-6 gap-x-6 sm:gap-x-8">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
              className="relative font-mono text-lg font-bold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {personalInfo.name.split(' ')[0]}
              <span className="text-[var(--color-accent)]">.</span>
            </motion.a>

            {/* Desktop nav */}
            <div ref={navRef} className="hidden md:flex items-center gap-1 relative">
              {navItems.map((item) => {
                const isActive = activeId === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    ref={(el) => { itemRefs.current[item.href.slice(1)] = el }}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                    className={`relative px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.06em] rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-faint)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
              <span
                ref={indicatorRef}
                className="absolute bottom-0 h-[2px] rounded-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
              />
            </div>

            {/* Desktop theme toggle */}
            <div className="hidden md:flex items-center ml-auto">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2 ml-auto">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 grid place-items-center rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_40%,transparent)] backdrop-blur-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FiX size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FiMenu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm md:hidden pointer-events-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[280px] bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur-2xl border-l border-[var(--color-line)]"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                <div className="flex flex-col gap-1 flex-1">
                  {navItems.map((item, i) => {
                    const isActive = activeId === item.href.slice(1)
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 + i * 0.04, ease: 'easeOut' }}
                        onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                        className={`relative px-4 py-3 font-mono text-[13px] uppercase tracking-[0.06em] rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]'
                            : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[color-mix(in_srgb,var(--color-ink)_4%,transparent)]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-indicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[var(--color-accent)]"
                          />
                        )}
                        {item.label}
                      </motion.a>
                    )
                  })}
                </div>

                <div className="pt-4 border-t border-[var(--color-line)]">
                  <p className="font-mono text-[11px] text-[var(--color-faint)] tracking-wider">
                    {personalInfo.email}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
