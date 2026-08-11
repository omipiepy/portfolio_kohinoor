import { useState, useEffect, useCallback, useRef, startTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiCommand } from 'react-icons/fi'
import { navItems } from '@/data/portfolio'

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const filtered = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = useCallback((href) => {
    onClose()
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      startTransition(() => setQuery(''))
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handle = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-4 glass rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <FiSearch className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Navigate to section..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                <FiCommand className="w-3 h-3" />K
              </kbd>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">No results found</p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
