import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 50, delayBetween = 2000 } = {}) {
  const [text, setText] = useState('')
  const textRef = useRef('')
  const wordIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  useEffect(() => {
    if (!words || words.length === 0) return

    let timeout

    const tick = () => {
      const current = words[wordIndexRef.current]
      const len = textRef.current.length

      if (!isDeletingRef.current) {
        const next = current.substring(0, len + 1)
        textRef.current = next
        setText(next)
        if (next === current) {
          timeout = setTimeout(() => {
            isDeletingRef.current = true
            tick()
          }, delayBetween)
          return
        }
        timeout = setTimeout(tick, typeSpeed)
      } else {
        const next = current.substring(0, len - 1)
        textRef.current = next
        setText(next)
        if (next === '') {
          isDeletingRef.current = false
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length
          timeout = setTimeout(tick, typeSpeed)
          return
        }
        timeout = setTimeout(tick, deleteSpeed)
      }
    }

    timeout = setTimeout(tick, delayBetween)

    return () => clearTimeout(timeout)
  }, [words, typeSpeed, deleteSpeed, delayBetween])

  return text
}
