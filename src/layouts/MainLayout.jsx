import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Network from '@/components/Network'

export default function MainLayout({ children, isDark, toggleTheme }) {
  return (
    <div className="relative min-h-screen">
      <Network />
      <div className="relative z-10 pointer-events-none">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
