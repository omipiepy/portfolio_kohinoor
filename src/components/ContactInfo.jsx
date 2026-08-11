import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCopy, FiCheck, FiDownload, FiCalendar } from 'react-icons/fi'
import ContactCard from './ContactCard'
import SocialLinks from './SocialLinks'
import { contactInfo, contactDetails } from '@/data/contactData'

function InfoItem({ item, delay }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!item.copyable) return
    try {
      await navigator.clipboard.writeText(item.value)
      setCopied(true)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = item.value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
    }
  }

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    }
  }, [copied])

  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -13 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-[13px] py-[13px] group"
    >
      <span className="w-[34px] h-[34px] grid place-items-center rounded-[13px] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] shrink-0">
        <Icon size={13} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="phi-meta uppercase mb-[4px]">{item.label}</p>
        {item.href ? (
          <a
            href={item.href}
            className="text-[14px] font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors truncate block"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-[14px] font-medium text-[var(--color-ink)] truncate">{item.value}</p>
        )}
      </div>
      {item.copyable && (
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-[8px] rounded-[13px] text-[var(--color-faint)] hover:text-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] transition-all cursor-pointer opacity-0 group-hover:opacity-100 shrink-0"
          aria-label={`Copy ${item.label}`}
        >
          {copied ? <FiCheck size={13} className="text-[var(--color-accent-2)]" /> : <FiCopy size={13} />}
        </motion.button>
      )}
    </motion.div>
  )
}

export default function ContactInfo() {
  return (
    <ContactCard className="p-[34px] h-full">
      <div className="flex flex-col h-full gap-[34px]">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="phi-h2 mb-[13px]"
          >
            {contactInfo.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="phi-body text-[14px]"
          >
            {contactInfo.intro}
          </motion.p>
        </div>

        <div className="flex flex-col divide-y divide-[var(--color-line)]">
          {contactDetails.map((item, i) => (
            <InfoItem key={item.key} item={item} delay={0.1 + i * 0.08} />
          ))}
        </div>

        <div className="mt-auto space-y-[21px]">
          <motion.div
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-flex items-center gap-[13px] net-chip w-fit"
          >
            <span className="relative flex h-[8px] w-[8px]">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-2)] opacity-75 animate-ping" />
              <span className="relative inline-flex h-[8px] w-[8px] rounded-full bg-[var(--color-accent-2)]" />
            </span>
            <span className="!text-[var(--color-muted)]">{contactInfo.availability}</span>
          </motion.div>

          <div className="flex flex-wrap gap-[13px]">
            <motion.a
              href={contactInfo.resumeUrl}
              download
              initial={{ opacity: 0, y: 13 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-phi btn-phi--accent btn-phi--sm"
            >
              <FiDownload size={13} />
              Download Resume
            </motion.a>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 13 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-phi btn-phi--outline btn-phi--sm"
            >
              <FiCalendar size={13} />
              Schedule Meeting
            </motion.a>
          </div>

          <hr className="net-divider" />

          <motion.div
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <p className="phi-meta uppercase mb-[13px]">Find me online</p>
            <SocialLinks />
          </motion.div>
        </div>
      </div>
    </ContactCard>
  )
}
