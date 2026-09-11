import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '@/hooks/useTheme'
import MainLayout from '@/layouts/MainLayout'
import KineticDotsLoader from '@/components/ui/kinetic-dots-loader'
import { NotFoundPage } from '@/components/ui/404-page-not-found'
import ParticleField from '@/components/ParticleField'
import Footer from '@/components/Footer'
import scrollStore from '@/store'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'
import ScrollDemo from '@/pages/ScrollDemo'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  const rootRef = useRef(null)
  const aboutRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [showAllProjects, setShowAllProjects] = useState(false)

  useEffect(() => {
    aboutRef.current = document.getElementById('about')
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const about = aboutRef.current
      if (!about) return
      const rect = about.getBoundingClientRect()
      setHeroVisible((prev) => {
        const next = rect.top > window.innerHeight * 0.3
        return next === prev ? prev : next
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current
      const pinnedSections = Array.from(root.querySelectorAll('.gs-pin'))
      const heroH1 = root.querySelector('#home')
      const contactSection = root.querySelector('#contact')

      pinnedSections.forEach((section, index, sections) => {
        const nextSection = sections[index + 1] || contactSection
        const isLastPinned = index === sections.length - 1

        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () =>
              contactSection
                ? contactSection.offsetTop - window.innerHeight
                : '+=' + window.innerHeight,
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        })

        if (!isLastPinned) {
          gsap.fromTo(
            section,
            { scale: 1, borderRadius: 0 },
            {
              scale: 0.7,
              borderRadius: 20,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () =>
                  nextSection
                    ? `top+=${nextSection.offsetTop - section.offsetTop} top`
                    : `+=${window.innerHeight}`,
                scrub: 1,
              },
            }
          )
        }
      })

      if (heroH1) {
        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: '+=400vh',
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(heroH1, { opacity: 1 - self.progress })
          },
        })
      }

      scrollStore.targets = {}
      const allSections = [...pinnedSections]
      const projectsSection = root.querySelector('#projects')
      if (projectsSection) allSections.push(projectsSection)
      if (contactSection) allSections.push(contactSection)
      allSections.forEach((section) => {
        let top = 0
        let node = section
        while (node) {
          top += node.offsetTop
          node = node.offsetParent
        }
        scrollStore.targets[section.id] = top
      })
    }, rootRef)

    return () => ctx.revert()
  }, [showAllProjects])

  return (
    <>
    <div ref={rootRef} className="relative" style={{ zIndex: 2 }}>
      <div
        className="fixed inset-0"
        style={{ zIndex: 1, pointerEvents: 'none', opacity: heroVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <ParticleField />
      </div>

      <section id="home" className="gs-pin relative w-screen h-screen overflow-hidden section-fish-bg">
        <Hero />
      </section>

      <section id="about" className="gs-pin relative w-screen h-screen overflow-hidden section-fish-bg">
        <About />
      </section>

      <section id="skills" className="gs-pin relative w-screen h-screen overflow-hidden section-fish-bg">
        <Skills />
      </section>

      <section id="projects" className={`${showAllProjects ? '' : 'gs-pin '}relative w-screen ${showAllProjects ? 'min-h-screen' : 'h-screen'} section-fish-bg`}>
        <Projects showAll={showAllProjects} onToggle={() => setShowAllProjects((p) => !p)} />
      </section>

      <section id="contact" className={`${showAllProjects ? '' : 'gs-pin '}relative w-screen min-h-screen section-fish-bg`}>
        <Contact />
        <Footer />
      </section>
    </div>
    </>
  )
}

function LoadingScreen() {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const minTimer = setTimeout(() => setReady(true), 5000)
    return () => clearTimeout(minTimer)
  }, [])

  useEffect(() => {
    if (ready) setLoading(false)
  }, [ready])

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
