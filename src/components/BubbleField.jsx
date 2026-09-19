import { useRef, useEffect } from 'react'

const MAX_BUBBLES = 80

export default function BubbleField() {
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

    const bubbles = []
    let animId
    let running = true

    const onClick = (e) => {
      const count = 6 + Math.floor(Math.random() * 5)
      for (let i = 0; i < count; i++) {
        if (bubbles.length >= MAX_BUBBLES) {
          bubbles.shift()
        }
        const spread = Math.random() * 40 - 20
        bubbles.push({
          x: e.clientX + spread,
          y: e.clientY,
          radius: 3 + Math.random() * 8,
          speed: 0.4 + Math.random() * 0.8,
          wobbleAmp: 0.3 + Math.random() * 0.6,
          wobbleSpeed: 0.02 + Math.random() * 0.02,
          wobbleOffset: Math.random() * Math.PI * 2,
          born: performance.now(),
          life: 2500 + Math.random() * 1500,
        })
      }
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        animId = requestAnimationFrame(animate)
      }
    }

    document.addEventListener('click', onClick, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    function animate(now) {
      if (!running) return

      if (document.hidden) {
        animId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, w, h)

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        const age = now - b.born

        if (age > b.life || b.y + b.radius < -10) {
          bubbles.splice(i, 1)
          continue
        }

        const ratio = age / b.life
        const fadeIn = Math.min(age / 200, 1)
        const fadeOut = 1 - Math.max((ratio - 0.75) / 0.25, 0)
        const alpha = fadeIn * fadeOut * 0.85

        b.y -= b.speed
        b.x += Math.sin(now * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp

        const r = b.radius

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(147, 197, 253, 0.5)'
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      document.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (realCanvas.parentNode) document.body.removeChild(realCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}
