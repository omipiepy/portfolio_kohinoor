import { motion } from 'framer-motion'
import { personalInfo } from '@/data/portfolio'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="phi-wrap py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left"
          >
            <a href="#home" className="font-mono text-[20px] font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors">
              {personalInfo.name.split(' ')[0]}
              <span className="text-[var(--color-accent)]">.</span>
            </a>
            <p className="font-mono text-[13px] text-[var(--color-faint)] mt-1">{personalInfo.title}</p>
          </motion.div>

          <SocialLinks />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-mono text-[13px] text-center text-[var(--color-faint)]"
          >
            &copy; {year} {personalInfo.name}. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
