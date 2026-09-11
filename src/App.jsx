import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import MainLayout from '@/layouts/MainLayout'
import KineticDotsLoader from '@/components/ui/kinetic-dots-loader'
import { NotFoundPage } from '@/components/ui/404-page-not-found'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'

function HomePage() {
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

function LoadingScreen() {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const minTimer = setTimeout(() => setReady(true), 3000)
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
          className="fixed inset-0 z-50 grid place-items-center bg-white"
        >
          <div className="flex flex-col items-center gap-4">
            <KineticDotsLoader />
            <p className="text-sm text-slate-400 tracking-widest font-mono">loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
