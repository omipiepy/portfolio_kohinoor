import { useState, useEffect, useRef } from 'react'
import { FiSend, FiX, FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ShineBorder } from '@/components/ui/shine-border'
import { ShinyButton } from '@/components/ui/shiny-button'
import { submitContactMessage } from '@/utils/contactApi'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const timersRef = useRef([])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const scheduleReset = () => {
    const t = setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 4000)
    timersRef.current.push(t)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) {
      e.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'Please enter a valid email'
    }
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) {
      e.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    setSubmitError('')
    try {
      await submitContactMessage(form)
      setSubmitted(true)
      scheduleReset()
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[contact] API unavailable in dev, simulating success:', err.message)
        await new Promise((r) => setTimeout(r, 800))
        setSubmitted(true)
        scheduleReset()
      } else {
        setSubmitError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <Card className="relative overflow-hidden">
        <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <FiCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
            <p className="text-sm text-muted-foreground max-w-[260px]">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden">
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
      <CardHeader className="p-8 pb-0">
        <CardTitle className="text-xl sm:text-2xl">Send a Message</CardTitle>
        <CardDescription>Fill out the form below and I'll get back to you soon.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" value={form.name} onChange={(e) => handleChange('name')(e.target.value)} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => handleChange('email')(e.target.value)} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Project inquiry" value={form.subject} onChange={(e) => handleChange('subject')(e.target.value)} />
            {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Tell me about your project..." rows={5} value={form.message} onChange={(e) => handleChange('message')(e.target.value)} />
            {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
          </div>

          {submitError && (
            <p className="flex items-center gap-2 text-xs text-destructive">
              <FiAlertCircle className="h-3 w-3 shrink-0" />
              {submitError}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-3">
          <ShinyButton type="submit" disabled={sending} className="w-full sm:w-auto gap-2">
            {sending ? (
              <>
                <FiLoader className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FiSend className="h-4 w-4 inline" />
                Send Message
              </>
            )}
          </ShinyButton>
          <Button type="button" variant="ghost" onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setErrors({}); setSubmitError('') }} className="w-full sm:w-auto gap-2">
            <FiX className="h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
