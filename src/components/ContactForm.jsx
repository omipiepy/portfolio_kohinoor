import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUser, FiMail, FiEdit3, FiMessageSquare, FiSend, FiX,
  FiCheck, FiLoader, FiAlertCircle,
} from 'react-icons/fi'
import ContactCard from './ContactCard'

const fields = [
  { key: 'name', label: 'Your Name', icon: FiUser, type: 'text', multiline: false },
  { key: 'email', label: 'Your Email', icon: FiMail, type: 'email', multiline: false },
  { key: 'subject', label: 'Subject', icon: FiEdit3, type: 'text', multiline: false },
  { key: 'message', label: 'Your Message', icon: FiMessageSquare, type: 'text', multiline: true },
]

const MAX_MESSAGE = 500

function FloatingInput({ field, value, onChange, error, onClear }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const isFloating = focused || hasValue
  const Tag = field.multiline ? 'textarea' : 'input'
  const Icon = field.icon

  return (
    <div>
      <div className={`relative rounded-2xl border-2 transition-all ${
        error
          ? 'border-red-300 dark:border-red-500 bg-red-50/30 dark:bg-red-500/5'
          : focused
            ? 'border-indigo-500 dark:border-indigo-400 bg-white dark:bg-slate-800/80 shadow-lg shadow-indigo-500/10'
            : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600'
      }`}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500"
             style={field.multiline ? { top: '22px', transform: 'none' } : {}}>
          <Icon className="w-4 h-4" />
        </div>
        <Tag
          type={field.multiline ? undefined : field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={field.multiline ? 5 : undefined}
          className={`w-full bg-transparent outline-none text-sm text-slate-800 dark:text-slate-200 transition-all resize-none ${
            field.multiline ? 'pt-6 pb-3 pl-11 pr-11' : 'pt-4 pb-4 pl-11 pr-11'
          }`}
          aria-label={field.label}
        />
        <label
          className={`absolute left-11 transition-all pointer-events-none select-none ${
            field.multiline ? (isFloating ? 'top-1.5 text-[11px]' : 'top-[18px] text-sm') : (isFloating ? 'top-1.5 text-[11px]' : 'top-1/2 -translate-y-1/2 text-sm')
          } ${
            error ? 'text-red-500' : isFloating ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {field.label}
        </label>
        {hasValue && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            style={field.multiline ? { top: '18px', transform: 'none' } : {}}
            aria-label={`Clear ${field.label}`}
            type="button"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 ml-1"
          >
            <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {field.multiline && (
        <div className="flex justify-end mt-1 mr-1">
          <span className={`text-[11px] font-mono ${
            value.length > MAX_MESSAGE ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'
          }`}>
            {value.length}/{MAX_MESSAGE}
          </span>
        </div>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim()) {
      e.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address'
    }
    if (!form.subject.trim()) e.subject = 'Please enter a subject'
    if (!form.message.trim()) {
      e.message = 'Please enter your message'
    } else if (form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters'
    } else if (form.message.length > MAX_MESSAGE) {
      e.message = `Message must be under ${MAX_MESSAGE} characters`
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[key]
        return copy
      })
    }
  }

  const clearField = (key) => {
    handleChange(key)('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSending(false)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  const clearAll = () => {
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  return (
    <ContactCard className="p-8 md:p-10 lg:p-12">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <FiCheck className="w-9 h-9 text-white" />
              </motion.div>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              Message Sent!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 dark:text-slate-400 text-center text-sm max-w-xs"
            >
              Thank you for reaching out. I'll get back to you within 24 hours.
            </motion.p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold tracking-tight"
            >
              Send a Message
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-sm text-slate-500 dark:text-slate-400 -mt-3"
            >
              I'll respond within 24 hours.
            </motion.p>

            {fields.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <FloatingInput
                  field={field}
                  value={form[field.key]}
                  onChange={handleChange(field.key)}
                  error={errors[field.key]}
                  onClear={() => clearField(field.key)}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={sending ? {} : { scale: 1.03 }}
                whileTap={sending ? {} : { scale: 0.97 }}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={clearAll}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <FiX className="w-4 h-4" />
                Clear
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </ContactCard>
  )
}
