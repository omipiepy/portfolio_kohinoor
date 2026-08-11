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
    <div className="flex items-center gap-[13px]">
      {socialLinks.map((link, i) => {
        const Icon = iconMap[link.icon]
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className="w-[34px] h-[34px] rounded-[13px] grid place-items-center text-[var(--color-muted)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] border border-[var(--color-line)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            aria-label={link.name}
          >
            <Icon size={13} />
          </motion.a>
        )
      })}
    </div>
  )
}
