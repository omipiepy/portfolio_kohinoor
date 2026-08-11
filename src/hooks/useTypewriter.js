import { useState, useEffect, useRef, useCallback } from 'react'

export function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 50, delayBetween = 2000 } = {}) {
  const [text, setText] = useState('')
  const wordIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  const tick = useCallback(() => {
    const current = words[wordIndexRef.current]
    if (isDeletingRef.current) {
      setText(current.substring(0, text.length - 1))
    } else {
      setText(current.substring(0, text.length + 1))
    }
  }, [text, words])

  useEffect(() => {
    const current = words[wordIndexRef.current]
    let timeout

    if (!isDeletingRef.current && text === current) {
      timeout = setTimeout(() => {
        isDeletingRef.current = true
      }, delayBetween)
    } else if (isDeletingRef.current && text === '') {
      isDeletingRef.current = false
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
    } else {
      timeout = setTimeout(tick, isDeletingRef.current ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, words, typeSpeed, deleteSpeed, delayBetween, tick])

  return text
}
