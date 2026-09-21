import { useRef, useEffect } from 'react'

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function isLightMode() {
  return document.documentElement.classList.contains('light')
}

export default function BubbleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w, h

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const bubbles = []
    let animId
    let running = true

    function spawnBubbles(cx, cy) {
      const count = 8 + Math.floor(Math.random() * 6)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * 30
        bubbles.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          radius: randomBetween(6, 24),
          speed: randomBetween(0.3, 0.9),
          wobbleAmp: randomBetween(0.2, 0.6),
          wobbleSpeed: randomBetween(0.008, 0.015),
          wobbleOffset: Math.random() * Math.PI * 2,
          born: performance.now(),
          life: 2500 + Math.random() * 2000,
        })
      }
    }

    const onPointerDown = (e) => {
      spawnBubbles(e.clientX, e.clientY)
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    function drawBubble(x, y, r, alpha) {
      const light = isLightMode()

      ctx.save()
      ctx.globalAlpha = alpha

      const bodyGrad = ctx.createRadialGradient(
        x - r * 0.25, y - r * 0.25, r * 0.05,
        x, y, r
      )
      if (light) {
        bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)')
        bodyGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)')
        bodyGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.06)')
        bodyGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)')
      } else {
        bodyGrad.addColorStop(0, 'rgba(100, 120, 150, 0.3)')
        bodyGrad.addColorStop(0.5, 'rgba(80, 100, 130, 0.15)')
        bodyGrad.addColorStop(0.85, 'rgba(60, 80, 110, 0.08)')
        bodyGrad.addColorStop(1, 'rgba(40, 60, 90, 0.0)')
      }

      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = bodyGrad
      ctx.fill()

      ctx.globalAlpha = alpha * 0.9
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.strokeStyle = light ? 'rgba(255, 255, 255, 0.45)' : 'rgba(120, 140, 170, 0.4)'
      ctx.lineWidth = 1.2
      ctx.stroke()

      ctx.globalAlpha = alpha * 0.8
      ctx.beginPath()
      ctx.ellipse(x - r * 0.3, y - r * 0.35, r * 0.35, r * 0.2, -0.5, 0, Math.PI * 2)
      ctx.fillStyle = light ? 'rgba(255, 255, 255, 0.7)' : 'rgba(130, 150, 180, 0.5)'
      ctx.fill()

      ctx.globalAlpha = alpha * 0.5
      ctx.beginPath()
      ctx.ellipse(x - r * 0.15, y - r * 0.2, r * 0.12, r * 0.08, -0.5, 0, Math.PI * 2)
      ctx.fillStyle = light ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 120, 150, 0.35)'
      ctx.fill()

      ctx.restore()
    }

    function animate(now) {
      if (!running) return

      ctx.clearRect(0, 0, w, h)

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        const age = now - b.born

        if (age > b.life) {
          bubbles.splice(i, 1)
          continue
        }

        b.y -= b.speed
        b.x += Math.sin(now * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp

        const fadeIn = Math.min(age / 200, 1)
        const fadeOut = 1 - Math.max((age / b.life - 0.7) / 0.3, 0)
        const alpha = fadeIn * fadeOut

        drawBubble(b.x, b.y, b.radius, alpha)
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    />
  )
}
