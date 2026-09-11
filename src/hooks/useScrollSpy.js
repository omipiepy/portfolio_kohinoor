import { useState, useEffect } from 'react'
import scrollStore from '@/store'

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '')

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY + offset + 1
      let current = sectionIds[0] || ''

      if (window.scrollY < 10) {
        setActiveId((prev) => (prev === current ? prev : current))
        return
      }

      for (const id of sectionIds) {
        const target = scrollStore.targets[id]
        if (target !== undefined && target <= sy) {
          current = id
        }
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, offset])

  return activeId
}
