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
    <div className="flex items-center gap-3">
      {socialLinks.map((link, i) => {
        const Icon = iconMap[link.icon]
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 ${link.color} transition-colors shadow-sm hover:shadow-md`}
            aria-label={link.name}
          >
            <Icon className="w-4 h-4" />
          </motion.a>
        )
      })}
    </div>
  )
}
