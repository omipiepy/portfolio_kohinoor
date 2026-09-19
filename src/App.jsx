import { useState, useEffect, useRef, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import MainLayout from '@/layouts/MainLayout'
import KineticDotsLoader from '@/components/ui/kinetic-dots-loader'
import { NotFoundPage } from '@/components/ui/404-page-not-found'
import BubbleField from '@/components/BubbleField'
import FishScene from '@/components/FishScene'
import Footer from '@/components/Footer'
import scrollStore from '@/store'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'
import ScrollDemo from '@/pages/ScrollDemo'

function HomePage() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [showAllProjects, setShowAllProjects] = useState(false)

  const computeTargets = useCallback(() => {
    const sections = rootRef.current?.querySelectorAll('section[id]')
    if (!sections) return
    scrollStore.targets = {}
    sections.forEach((section) => {
      let top = 0
      let node = section
      while (node) {
        top += node.offsetTop
        node = node.offsetParent
      }
      scrollStore.targets[section.id] = top
    })
  }, [])

  useEffect(() => {
    computeTargets()
    window.addEventListener('resize', computeTargets, { passive: true })
    return () => window.removeEventListener('resize', computeTargets)
  }, [computeTargets, showAllProjects])

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      setHeroVisible((prev) => {
        const next = rect.top > window.innerHeight * 0.3
        return next === prev ? prev : next
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    {/* Animated fish background — Three.js */}
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <FishScene />
    </div>
    <div className="fixed inset-0 z-[1] hero-overlay" />

    <div ref={rootRef} className="relative" style={{ zIndex: 2 }}>
      <div
        className="fixed inset-0"
        style={{ zIndex: 1, pointerEvents: 'none', opacity: heroVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <BubbleField />
      </div>

      <section id="home" ref={heroRef} className="relative w-screen h-screen">
        <div className="relative z-10 h-full">
          <Hero />
        </div>
      </section>

      <section id="about" className="relative w-screen min-h-screen">
        <div className="relative z-10">
          <About />
        </div>
      </section>

      <section id="skills" className="relative w-screen min-h-screen">
        <div className="relative z-10">
          <Skills />
        </div>
      </section>

      <section id="projects" className="relative w-screen min-h-screen">
        <div className="relative z-10">
          <Projects showAll={showAllProjects} onToggle={() => setShowAllProjects((p) => !p)} />
        </div>
      </section>

      <section id="contact" className="relative w-screen min-h-screen">
        <div className="relative z-10">
          <Contact />
        </div>
      </section>

      <Footer />
    </div>
    </>
  )
}

function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundImage: 'url(/images/fish.jfif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'var(--color-bg)', opacity: 0.75 }} />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <KineticDotsLoader />
            <p className="text-sm text-slate-400 tracking-widest font-mono">loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const { isDark, toggle } = useTheme()

  return (
    <BrowserRouter>
      <LoadingScreen />
      <Routes>
        <Route path="/" element={<MainLayout isDark={isDark} toggleTheme={toggle}><HomePage /></MainLayout>} />
        <Route path="/scroll-demo" element={<ScrollDemo />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
