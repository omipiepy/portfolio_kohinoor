import { useState, useCallback, useMemo } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import MainLayout from '@/layouts/MainLayout'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import CommandPalette from '@/components/CommandPalette'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'

export default function App() {
  const { isDark, toggle } = useTheme()
  const [commandOpen, setCommandOpen] = useState(false)

  const toggleCommand = useCallback(() => setCommandOpen((prev) => !prev), [])

  const shortcutHandlers = useMemo(
    () => [{ key: 'k', ctrl: true, fn: toggleCommand }],
    [toggleCommand]
  )

  useKeyboardShortcuts(shortcutHandlers)

  return (
    <>
      <ScrollProgress />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <MainLayout isDark={isDark} toggleTheme={toggle} onOpenCommand={toggleCommand}>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />

        <Contact />
      </MainLayout>
      <BackToTop />
    </>
  )
}
