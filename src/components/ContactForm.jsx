import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSend, FiX,
  FiCheck, FiLoader, FiAlertCircle,
} from 'react-icons/fi'
import ContactCard from './ContactCard'
import { submitContactMessage } from '@/utils/contactApi'

const fields = [
  { key: 'name', label: 'Your Name', type: 'text', multiline: false },
  { key: 'email', label: 'Your Email', type: 'email', multiline: false },
  { key: 'subject', label: 'Subject', type: 'text', multiline: false },
  { key: 'message', label: 'Your Message', type: 'text', multiline: true },
]

const MAX_MESSAGE = 500

function FloatingInput({ field, value, onChange, error, onClear }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const Tag = field.multiline ? 'textarea' : 'input'

  return (
    <div>
      <div
        className={`relative rounded-[10px] border transition-all duration-150 ${
          error
            ? 'border-[#EF4444] bg-[rgba(239,68,68,0.04)]'
            : focused
              ? 'border-[var(--color-accent)] bg-[rgba(255,255,255,0.05)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]'
              : 'border-[var(--color-line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--color-line-2)]'
        }`}
      >
        <Tag
          type={field.multiline ? undefined : field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={field.multiline ? 6 : undefined}
          placeholder={field.label}
          className={`w-full bg-transparent outline-none text-[15px] text-[var(--color-ink)] transition-all resize-none placeholder:text-[var(--color-faint)] ${
            field.multiline ? 'pt-3 pb-3 pl-4 pr-4' : 'pt-3 pb-3 pl-4 pr-4'
          }`}
          aria-label={field.label}
        />
        {hasValue && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--color-faint)] hover:text-[var(--color-ink)] hover:bg-[rgba(255,255,255,0.06)] transition-all cursor-pointer"
            style={field.multiline ? { top: '12px', transform: 'none' } : {}}
            aria-label={`Clear ${field.label}`}
            type="button"
          >
            <FiX size={14} />
          </button>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -2, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -2, height: 0 }}
            className="flex items-center gap-2 text-[13px] text-[#EF4444] mt-1.5 ml-1"
          >
            <FiAlertCircle size={12} className="shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {field.multiline && (
        <div className="flex justify-end mt-1.5 mr-2">
          <span
            className={`font-mono text-[12px] ${
              value.length > MAX_MESSAGE ? 'text-[#EF4444]' : 'text-[var(--color-faint)]'
            }`}
          >
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
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim()) {
      e.email = 'Please enter your email'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
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
    setSubmitError('')
    try {
      await submitContactMessage(form)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', email: '', subject: '', message: '' })
      }, 4000)
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[contact] API unavailable in dev, simulating success:', err.message)
        await new Promise((r) => setTimeout(r, 800))
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setForm({ name: '', email: '', subject: '', message: '' })
        }, 4000)
      } else {
        setSubmitError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSending(false)
    }
  }

  const clearAll = () => {
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setSubmitError('')
  }

  return (
    <ContactCard className="h-full !p-8 md:!p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
              className="w-12 h-12 rounded-xl bg-[var(--color-accent)] grid place-items-center mb-5 shadow-[0_8px_24px_color-mix(in_srgb,var(--color-accent)_28%,transparent)]"
            >
              <FiCheck size={20} className="text-white" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-sans text-[20px] font-semibold text-[var(--color-ink)] mb-2"
            >
              Message Sent!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-sans text-[14px] text-[var(--color-muted)] text-center max-w-[260px]"
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
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="font-sans text-[28px] font-bold text-[var(--color-ink)] mb-1">Send a Message</h3>
              <p className="font-sans text-[14px] text-[var(--color-faint)]">I'll respond within 24 hours.</p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FloatingInput
                    field={fields[0]}
                    value={form[fields[0].key]}
                    onChange={handleChange(fields[0].key)}
                    error={errors[fields[0].key]}
                    onClear={() => clearField(fields[0].key)}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <FloatingInput
                    field={fields[1]}
                    value={form[fields[1].key]}
                    onChange={handleChange(fields[1].key)}
                    error={errors[fields[1].key]}
                    onClear={() => clearField(fields[1].key)}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FloatingInput
                  field={fields[2]}
                  value={form[fields[2].key]}
                  onChange={handleChange(fields[2].key)}
                  error={errors[fields[2].key]}
                  onClear={() => clearField(fields[2].key)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <FloatingInput
                  field={fields[3]}
                  value={form[fields[3].key]}
                  onChange={handleChange(fields[3].key)}
                  error={errors[fields[3].key]}
                  onClear={() => clearField(fields[3].key)}
                />
              </motion.div>
            </div>

            {/* Submit error */}
            <AnimatePresence mode="wait">
              {submitError && (
                <motion.p
                  key="submit-error"
                  initial={{ opacity: 0, y: -2, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -2, height: 0 }}
                  className="flex items-center gap-2 text-[13px] text-[#EF4444] mt-4"
                >
                  <FiAlertCircle size={12} className="shrink-0" />
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={sending ? {} : { y: -2 }}
                whileTap={sending ? {} : { scale: 0.97 }}
                className="btn-phi btn-phi--accent flex-1 gap-2 px-5 py-3 cursor-pointer disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <FiLoader size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={clearAll}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-phi btn-phi--ghost gap-2 px-5 py-3 cursor-pointer"
              >
                <FiX size={14} />
                Clear
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </ContactCard>
  )
}
