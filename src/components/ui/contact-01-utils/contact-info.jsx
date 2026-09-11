import { useState, useEffect, useRef } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ShineBorder } from '@/components/ui/shine-border'
import SocialLinks from '@/components/SocialLinks'
import { contactInfo, contactDetails } from '@/data/contactData'

export default function ContactInfo() {
  const [copied, setCopied] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleCopy = async (key, value) => {
    setCopied(key)
    clearTimeout(timerRef.current)
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      ta.style.cssText = 'position:fixed;top:0;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    timerRef.current = setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="relative overflow-hidden">
      <ShineBorder shineColor={['#38BDF8', '#A07CFE', '#FE8FB5']} />
      <CardHeader className="p-8 pb-0">
        <CardTitle className="text-xl sm:text-2xl">{contactInfo.heading}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{contactInfo.intro}</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-5">
        {contactDetails.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.key} className="flex items-center gap-4 group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors break-all">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground break-all">{item.value}</p>
                )}
              </div>
              {item.copyable && (
                <button
                  onClick={() => handleCopy(item.key, item.value)}
                  className="ml-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all opacity-0 group-hover:opacity-100"
                  aria-label={`Copy ${item.label}`}
                >
                  {copied === item.key ? <FiCheck className="h-4 w-4 text-primary" /> : <FiCopy className="h-4 w-4" />}
                </button>
              )}
            </div>
          )
        })}

        <Separator className="my-4" />

        <div className="flex items-center gap-3">
          <div className="status-dot" />
          <span className="text-sm font-medium text-muted-foreground">{contactInfo.availability}</span>
        </div>

        <Separator className="my-4" />

        <SocialLinks />
      </CardContent>
    </Card>
  )
}
