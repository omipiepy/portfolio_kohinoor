import { useRef, useEffect } from 'react'

const PALETTE = [
  [139, 92, 246],
  [124, 58, 237],
  [99, 102, 241],
  [129, 140, 248],
  [167, 139, 250],
  [79, 70, 229],
  [59, 130, 246],
  [96, 165, 250],
  [147, 51, 234],
  [192, 132, 252],
]

const MAX = 80
const LIFE = 700

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 2
    canvas.height = 2

    const realCanvas = document.createElement('canvas')
    realCanvas.style.cssText =
      'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;'
    document.body.appendChild(realCanvas)

    const ctx = realCanvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = window.innerWidth
    let h = window.innerHeight

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      realCanvas.width = w * dpr
      realCanvas.height = h * dpr
      realCanvas.style.width = w + 'px'
      realCanvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const particles = []
    let mx = -9999
    let my = -9999
    let prevMx = -9999
    let prevMy = -9999
    let animId
    let running = true

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const onMouseLeave = () => {
      mx = -9999
      my = -9999
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        animId = requestAnimationFrame(animate)
      }
    }

    document.addEventListener('pointermove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    function animate(now) {
      if (!running) return

      if (document.hidden) {
        animId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const mouseActive = mx > 0 && my > 0

      if (mouseActive) {
        const dx = mx - prevMx
        const dy = my - prevMy
        const speed = Math.sqrt(dx * dx + dy * dy)
        const count = Math.min(Math.ceil(speed / 4), 4)

        for (let i = 0; i < count; i++) {
          if (particles.length >= MAX) {
            particles[particles.length - 1] = null
            particles.length--
          }

          const t = count > 1 ? i / count : 0
          const px = prevMx + dx * t
          const py = prevMy + dy * t
          const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]

          particles.push({
            x: px + (Math.random() - 0.5) * 6,
            y: py + (Math.random() - 0.5) * 6,
            radius: 2 + Math.random() * 3,
            color,
            born: now,
          })
        }
      }

      prevMx = mx
      prevMy = my

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const age = now - p.born

        if (age > LIFE) {
          particles[i] = particles[particles.length - 1]
          particles.length--
          continue
        }

        const ratio = age / LIFE
        const fade = ratio < 0.1 ? ratio / 0.1 : 1 - (ratio - 0.1) / 0.9

        const [r, g, b] = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * (1 - ratio * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${(fade * 0.9).toFixed(3)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      document.removeEventListener('pointermove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (realCanvas.parentNode) document.body.removeChild(realCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}
