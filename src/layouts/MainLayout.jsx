import { useEffect, useRef, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CloudSky from '@/components/CloudSky'

export default function MainLayout({ children, isDark, toggleTheme }) {
  const scrollRef = useRef({ y: 0, ticking: false, docHeight: 0, winHeight: 0 })

  useEffect(() => {
    const s = scrollRef.current
    s.docHeight = document.body.scrollHeight
    s.winHeight = window.innerHeight

    // Recalculate doc height on resize (rare)
    const onResize = () => {
      s.docHeight = document.body.scrollHeight
      s.winHeight = window.innerHeight
    }

    const onScroll = () => {
      if (!s.ticking) {
        s.ticking = true
        window.requestAnimationFrame(() => {
          s.y = window.scrollY
          s.ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const cloudProps = useRef({ density: 100, speed: 64 })

  // Update cloud props from scroll without triggering React re-render.
  // CloudSky reads its own vRef internally, but we pass density/speed as
  // initial props. Since the effect has [] deps, prop changes only cause
  // a cheap re-render (no DOM mutation on a canvas element).
  const scrollProgress = Math.min(
    (scrollRef.current.y || 0) / Math.max(1, (scrollRef.current.docHeight || 1) - (scrollRef.current.winHeight || 1)),
    1
  )
  cloudProps.current.density = 100 + Math.floor(scrollProgress * 50)
  cloudProps.current.speed = 64 + Math.floor(scrollProgress * 20)

  return (
    <div className="relative min-h-screen">
      <CloudSky
        className="z-0 pointer-events-none"
        isDark={isDark}
        density={cloudProps.current.density}
        speed={cloudProps.current.speed}
      />
      <div className="relative z-10 pointer-events-none">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}