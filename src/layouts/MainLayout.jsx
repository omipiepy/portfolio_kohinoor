import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MainLayout({ children, isDark, toggleTheme }) {
  return (
    <div className="relative min-h-screen">
      <div className="relative pointer-events-none" style={{ zIndex: 10 }}>
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
