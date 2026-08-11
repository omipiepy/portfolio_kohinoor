import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { personalInfo, socialLinks } from '@/data/portfolio'

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] pointer-events-auto">
      <div className="phi-wrap py-[34px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[21px]">
          <motion.div
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <a href="#home" className="font-mono text-[21px] font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors">
              {personalInfo.name.split(' ')[0]}
              <span className="text-[var(--color-accent)]">.</span>
            </a>
            <p className="phi-meta mt-[8px]">{personalInfo.title}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-[13px]"
          >
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] grid place-items-center rounded-[13px] border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label={link.name}
                >
                  {Icon && <Icon size={13} />}
                </a>
              )
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="phi-meta text-center"
          >
            &copy; {year} {personalInfo.name}. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
