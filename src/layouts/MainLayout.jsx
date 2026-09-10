import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CloudSky from '@/components/CloudSky'

export default function MainLayout({ children, isDark, toggleTheme }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Use requestAnimationFrame to limit updates
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Calculate cloud properties based on scroll position
  // As user scrolls down, increase cloud density and create a sense of moving through clouds
  const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1)
  const cloudDensity = 100 + Math.floor(scrollProgress * 50) // Increase density from 100 to 150
  const cloudSpeed = 64 + Math.floor(scrollProgress * 20) // Slightly increase speed from 64 to 84

  return (
    <div className="relative min-h-screen">
      <CloudSky
        className="z-0 pointer-events-none"
        isDark={isDark}
        density={cloudDensity}
        speed={cloudSpeed}
      />
      <div className="relative z-10 pointer-events-none">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}