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
        className={`relative rounded-[13px] border transition-all ${
          error
            ? 'border-[#f87171] bg-[rgba(248,113,113,0.05)]'
            : focused
              ? 'border-[var(--color-accent)] bg-[rgba(255,255,255,0.05)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]'
              : 'border-[var(--color-line)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--color-line-2)]'
        }`}
      >
        <Tag
          type={field.multiline ? undefined : field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={field.multiline ? 5 : undefined}
          placeholder={field.label}
          className={`w-full bg-transparent outline-none text-[14px] text-[var(--color-ink)] transition-all resize-none placeholder:text-[var(--color-faint)] ${
            field.multiline ? 'pt-[21px] pb-[21px] pl-[21px] pr-[47px]' : 'pt-[13px] pb-[13px] pl-[21px] pr-[47px]'
          }`}
          aria-label={field.label}
        />
        {hasValue && (
          <button
            onClick={onClear}
            className="absolute right-[13px] top-1/2 -translate-y-1/2 p-[4px] rounded-[8px] text-[var(--color-faint)] hover:text-[var(--color-ink)] hover:bg-[rgba(255,255,255,0.06)] transition-all cursor-pointer"
            style={field.multiline ? { top: '21px', transform: 'none' } : {}}
            aria-label={`Clear ${field.label}`}
            type="button"
          >
            <FiX size={13} />
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
            className="flex items-center gap-[8px] text-[12px] text-[#f87171] mt-[8px] ml-[8px]"
          >
            <FiAlertCircle size={13} className="shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {field.multiline && (
        <div className="flex justify-end mt-[8px] mr-[8px]">
          <span
            className={`phi-meta ${
              value.length > MAX_MESSAGE ? '!text-[#f87171]' : ''
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
        // No API running in plain `npm run dev` — keep the demo working locally.
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
    <ContactCard className="p-[21px] sm:p-[34px] lg:p-[55px] h-full">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center h-full py-[89px]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
              className="w-[55px] h-[55px] rounded-[21px] bg-[var(--color-accent)] grid place-items-center mb-[21px] shadow-[0_8px_34px_color-mix(in_srgb,var(--color-accent)_28%,transparent)]"
            >
              <FiCheck size={21} className="text-[#0b0f1a]" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 13 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="phi-h3 mb-[8px]"
            >
              Message Sent!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 13 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="phi-meta text-center max-w-[233px]"
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
            className="flex flex-col gap-[21px] h-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 13 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="phi-meta uppercase mb-[8px] text-[var(--color-accent)]">contact</p>
              <h3 className="phi-h2">Send a Message</h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 13 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="phi-body text-[13px]"
            >
              I'll respond within 24 hours.
            </motion.p>

            <div className="flex flex-col gap-[21px] flex-1 justify-center">
              {fields.map((field, i) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 13 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
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
            </div>

            <AnimatePresence mode="wait">
              {submitError && (
                <motion.p
                  key="submit-error"
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="flex items-center gap-[8px] text-[13px] text-[#f87171]"
                >
                  <FiAlertCircle size={13} className="shrink-0" />
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 13 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-[13px] pt-[8px]"
            >
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={sending ? {} : { y: -2 }}
                whileTap={sending ? {} : { scale: 0.97 }}
                className="btn-phi btn-phi--accent flex-1 !gap-[13px] !px-[21px] !py-[13px] !tracking-[0.08em] cursor-pointer disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <FiLoader size={13} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={13} />
                    Send Message
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={clearAll}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-phi btn-phi--ghost !gap-[13px] !px-[21px] !py-[13px] !tracking-[0.08em] cursor-pointer"
              >
                <FiX size={13} />
                Clear
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </ContactCard>
  )
}
