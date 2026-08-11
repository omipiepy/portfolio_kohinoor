import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Particles from '@/components/Particles'

export default function MainLayout({ children, isDark, toggleTheme, onOpenCommand }) {
  return (
    <div className="relative min-h-screen text-text-light dark:text-text-dark transition-colors duration-300">
      <Particles />
      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} onOpenCommand={onOpenCommand} />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
