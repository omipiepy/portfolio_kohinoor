import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCopy, FiCheck } from 'react-icons/fi'
import ContactCard from './ContactCard'
import SocialLinks from './SocialLinks'
import { contactInfo, contactDetails } from '@/data/contactData'

export default function ContactInfo() {
  const [copied, setCopied] = useState(null)

  const handleCopy = async (key, value) => {
    setCopied(key)
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <ContactCard className="!p-8 md:!p-10">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-sans text-[28px] font-bold text-[var(--color-ink)] mb-3"
      >
        {contactInfo.heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)] mb-8"
      >
        {contactInfo.intro}
      </motion.p>

      <div className="space-y-5">
        {contactDetails.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 group"
          >
            <div className="icon-tint">
              <item.icon size={18} />
            </div>
            <div className="flex-1">
              <p className="font-mono text-[12px] uppercase tracking-[0.05em] text-[var(--color-faint)] mb-0.5">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-sans text-[15px] font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-sans text-[15px] font-medium text-[var(--color-ink)] break-all">{item.value}</p>
              )}
            </div>
            {item.copyable && (
              <motion.button
                onClick={() => handleCopy(item.key, item.value)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 p-1.5 rounded-md text-[var(--color-faint)] hover:text-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_5%,transparent)] transition-all opacity-0 group-hover:opacity-100"
                aria-label={`Copy ${item.label}`}
              >
                {copied === item.key ? (
                  <FiCheck size={14} className="text-[var(--color-accent)]" />
                ) : (
                  <FiCopy size={14} />
                )}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Availability status */}
      <div className="mt-6 flex items-center gap-3">
        <div className="status-dot" />
        <span className="font-sans text-[14px] font-medium text-[var(--color-muted)]">{contactInfo.availability}</span>
      </div>

      <hr className="net-divider my-8" />

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <SocialLinks />
      </motion.div>
    </ContactCard>
  )
}
