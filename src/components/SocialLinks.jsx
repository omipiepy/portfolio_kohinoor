import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { socialLinks } from '@/data/contactData'

const iconMap = {
  FaGithub: FaGithub,
  FaLinkedinIn: FaLinkedinIn,
  FaEnvelope: FaEnvelope,
}

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map((link, i) => {
        const Icon = iconMap[link.icon]
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-2 font-mono text-[13px] text-[var(--color-faint)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={link.name}
          >
            <Icon size={16} />
            <span>{link.name}</span>
          </motion.a>
        )
      })}
    </div>
  )
}
