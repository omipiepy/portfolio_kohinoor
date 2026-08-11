import { useEffect } from 'react'

export function useKeyboardShortcuts(handlers) {
  useEffect(() => {
    const handle = (e) => {
      for (const { key, ctrl, shift, fn } of handlers) {
        const ctrlMatch = ctrl ? (e.ctrlKey || e.metaKey) : true
        const shiftMatch = shift ? e.shiftKey : true
        if (ctrlMatch && shiftMatch && e.key.toLowerCase() === key.toLowerCase()) {
          e.preventDefault()
          fn()
          return
        }
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [handlers])
}
