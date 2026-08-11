import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + offset + 1
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, offset])

  return activeId
}
