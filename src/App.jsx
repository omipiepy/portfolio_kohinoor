import { useTheme } from '@/hooks/useTheme'
import MainLayout from '@/layouts/MainLayout'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'

export default function App() {
  const { isDark, toggle } = useTheme()

  return (
    <MainLayout isDark={isDark} toggleTheme={toggle}>
      <Hero isDark={isDark} />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </MainLayout>
  )
}
