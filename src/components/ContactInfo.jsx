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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 group"
    >
      <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-500/10 dark:to-cyan-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
          {item.label}
        </p>
        {item.href ? (
          <a
            href={item.href}
            className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {item.value}
          </p>
        )}
      </div>
      {item.copyable && (
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer opacity-0 group-hover:opacity-100 mt-1 shrink-0"
          aria-label={`Copy ${item.label}`}
        >
          {copied ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-500"
            >
              <FiCheck className="w-4 h-4" />
            </motion.span>
          ) : (
            <FiCopy className="w-4 h-4" />
          )}
        </motion.button>
      )}
    </motion.div>
  )
}

export default function ContactInfo() {
  return (
    <ContactCard className="p-8 md:p-10 lg:p-12 h-full">
      <div className="flex flex-col h-full gap-8">
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            {contactInfo.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px] max-w-md"
          >
            {contactInfo.intro}
          </motion.p>
        </div>

        <div className="space-y-6">
          {contactDetails.map((item, i) => (
            <InfoItem key={item.key} item={item} delay={0.2 + i * 0.1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 w-fit"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {contactInfo.availability}
          </span>
        </motion.div>

        <div className="flex flex-wrap gap-3 pt-2">
          <motion.a
            href={contactInfo.resumeUrl}
            download
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
          >
            <FiDownload className="w-4 h-4" />
            Download Resume
          </motion.a>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.65 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FiCalendar className="w-4 h-4" />
            Schedule Meeting
          </motion.a>
        </div>

        <div className="mt-auto pt-4">
          <SocialLinks />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm text-slate-400 dark:text-slate-500 italic"
        >
          {contactInfo.callout}
        </motion.p>
      </div>
    </ContactCard>
  )
}
