import { useEffect, useMemo, useRef, useCallback } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const NS = 'http://www.w3.org/2000/svg'
const HOVER_RADIUS = 150
const LINK_DISTANCE = 170
const REPULSE_RADIUS = 110
const REPULSE_FORCE = 5.5
const HOME_SPRING = 0.0025
const WANDER = 0.08
const STUCK_WINDOW = 120
const STUCK_THRESHOLD = 4

const initEngine = async (engine) => {
  await loadSlim(engine)
}

const mkEl = (tag) => document.createElementNS(NS, tag)

const getPooled = (g, poolArr, needed, tag) => {
  while (poolArr.length < needed) {
    const el = mkEl(tag)
    g.appendChild(el)
    poolArr.push(el)
  }
  poolArr.forEach((el, i) => {
    if (el.parentNode !== g) g.appendChild(el)
    el.style.display = i >= needed ? 'none' : ''
  })
  return poolArr
}

export default function Network() {
  const overlayRef = useRef(null)
  const containerRef = useRef(null)

  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const overlayPoolRef = useRef({ lines: [] })
  const motionRef = useRef(0)
  const frameCountRef = useRef(0)

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 120, density: { enable: true } },
        paint: {
          color: {
            value: { h: { min: 0, max: 360 }, s: 85, l: 60 },
            animation: { h: { enable: true, speed: 6, sync: false } },
          },
        },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.5, max: 0.9 } },
        size: { value: { min: 2, max: 6 } },
        links: {
          enable: true,
          distance: LINK_DISTANCE,
          color: '#1d4ed8',
          opacity: 0.45,
          width: 1,
          shadow: { enable: true, color: '#3b82f6', blur: 8 },
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          straight: false,
          outModes: 'bounce',
        },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    }),
    []
  )

  const onLoaded = useCallback((container) => {
    containerRef.current = container
  }, [])

  const isOverInteractive = useCallback(() => {
    const el = document.elementFromPoint(pointerRef.current.x, pointerRef.current.y)
    return !!el?.closest?.('button, a, input, textarea, select')
  }, [])

  const repulse = useCallback((c) => {
    const pointer = pointerRef.current
    if (!pointer.active) return Infinity
    if (isOverInteractive()) return Infinity
    const pr = c.retina.pixelRatio
    const mx = pointer.x * pr
    const my = pointer.y * pr
    const w = c.canvas.size.width
    const h = c.canvas.size.height
    const count = c.particles.count
    let motion = 0
    for (let i = 0; i < count; i++) {
      const p = c.particles.get(i)
      if (!p || p.destroyed) continue
      const pos = p.getPosition()
      const dx = pos.x - mx
      const dy = pos.y - my
      const d = Math.hypot(dx, dy)
      let px = 0
      let py = 0
      if (d < REPULSE_RADIUS && d > 0.001) {
        const falloff = 1 - d / REPULSE_RADIUS
        const f = falloff * falloff * REPULSE_FORCE
        const nx = dx / d
        const ny = dy / d
        px += nx * f
        py += ny * f
        px += -ny * f * 0.5
        py += nx * f * 0.5
      } else {
        const home = p.initialPosition
        px += (home.x - pos.x) * HOME_SPRING
        py += (home.y - pos.y) * HOME_SPRING
        px += (Math.random() - 0.5) * WANDER
        py += (Math.random() - 0.5) * WANDER
      }
      if (px !== 0 || py !== 0) {
        const r = p.getRadius()
        p.position.x = Math.max(r, Math.min(w - r, pos.x + px))
        p.position.y = Math.max(r, Math.min(h - r, pos.y + py))
        motion += Math.abs(px) + Math.abs(py)
      }
    }
    return motion
  }, [isOverInteractive])

  const kick = useCallback((c) => {
    const count = c.particles.count
    const w = c.canvas.size.width
    const h = c.canvas.size.height
    for (let i = 0; i < count; i++) {
      const p = c.particles.get(i)
      if (!p || p.destroyed) continue
      p.velocity.angle = Math.random() * Math.PI * 2
      p.velocity.length = 0.3 + Math.random() * 0.5
      const r = p.getRadius()
      p.position.x = Math.max(r, Math.min(w - r, p.position.x + (Math.random() - 0.5) * 40))
      p.position.y = Math.max(r, Math.min(h - r, p.position.y + (Math.random() - 0.5) * 40))
    }
  }, [])

  const drawOverlay = useCallback(() => {
    const c = containerRef.current
    const g = overlayRef.current
    if (!c || !g) return
    const pointer = pointerRef.current
    if (!pointer.active || isOverInteractive()) {
      overlayPoolRef.current.lines.forEach((el) => {
        el.style.display = 'none'
      })
      return
    }
    const wx = pointer.x
    const wy = pointer.y
    const k = 1 / c.retina.pixelRatio

    const hovered = []
    const count = c.particles.count

    if (pointer.active) {
      for (let i = 0; i < count; i++) {
        const p = c.particles.get(i)
        if (!p || p.destroyed) continue
        const pos = p.getPosition()
        const px = pos.x * k
        const py = pos.y * k
        if (Math.hypot(wx - px, wy - py) < HOVER_RADIUS) {
          hovered.push(p)
        }
      }
    }

    const needsDraw = hovered.length > 0
    if (!needsDraw) {
      overlayPoolRef.current.lines.forEach((el) => {
        el.style.display = 'none'
      })
      return
    }

    const lines = []
    for (let i = 0; i < hovered.length; i++) {
      for (let j = i + 1; j < hovered.length; j++) {
        const a = hovered[i].getPosition()
        const b = hovered[j].getPosition()
        if (Math.hypot((a.x - b.x) * k, (a.y - b.y) * k) < LINK_DISTANCE) {
          lines.push({ x1: a.x * k, y1: a.y * k, x2: b.x * k, y2: b.y * k, opacity: 0.3, color: 'var(--color-accent-2)' })
        }
      }
    }
    for (let i = 0; i < hovered.length; i++) {
      const pos = hovered[i].getPosition()
      lines.push({
        x1: wx,
        y1: wy,
        x2: pos.x * k,
        y2: pos.y * k,
        opacity: 0.45,
        color: 'var(--color-accent-2)',
      })
    }
    const lineEls = getPooled(g, overlayPoolRef.current.lines, lines.length, 'line')
    lineEls.forEach((el, i) => {
      const l = lines[i]
      el.setAttribute('x1', l.x1)
      el.setAttribute('y1', l.y1)
      el.setAttribute('x2', l.x2)
      el.setAttribute('y2', l.y2)
      el.setAttribute('stroke-width', 1)
      el.style.stroke = l.color
      el.style.strokeOpacity = l.opacity
      el.style.display = ''
    })
  }, [isOverInteractive])

  useEffect(() => {
    let raf
    const loop = () => {
      const c = containerRef.current
      if (c && !c.destroyed) {
        try {
          const motion = repulse(c)
          drawOverlay(c)
          motionRef.current += motion
          frameCountRef.current += 1
          if (frameCountRef.current >= STUCK_WINDOW) {
            if (motionRef.current / frameCountRef.current < STUCK_THRESHOLD) {
              kick(c)
            }
            motionRef.current = 0
            frameCountRef.current = 0
          }
        } catch {
          void 0
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [repulse, drawOverlay, kick])

  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current.x = e.clientX
      pointerRef.current.y = e.clientY
      pointerRef.current.active = true
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <ParticlesProvider init={initEngine}>
        <Particles
          id="network-canvas"
          options={options}
          particlesLoaded={onLoaded}
          className="absolute inset-0 h-full w-full"
        />
      </ParticlesProvider>
      <svg
        ref={overlayRef}
        className="absolute inset-0 h-full w-full pointer-events-none overflow-visible"
        aria-hidden="true"
      />
    </div>
  )
}
