import { useMemo } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const initEngine = async (engine) => {
  await loadSlim(engine)
}

export default function ParticleBackground() {
  const prefersReduced = useReducedMotion()

  const options = useMemo(
    () => ({
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: 80,
          density: { enable: true, area: 800 },
        },
        color: {
          value: { h: { min: 0, max: 360 }, s: 60, l: 55 },
          animation: {
            h: {
              enable: true,
              speed: 6,
              sync: false,
              offset: { min: 0, max: 360 },
            },
          },
        },
        shape: { type: 'circle' },
        opacity: { value: 1 },
        size: { value: { min: 1, max: 8 } },
        links: {
          enable: true,
          distance: 150,
          color: '#808080',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: !prefersReduced,
          speed: 5,
          direction: 'none',
          random: false,
          straight: false,
          outModes: 'out',
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 1 } },
          push: { quantity: 4 },
        },
      },
    }),
    [prefersReduced]
  )

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="page-particles"
        options={options}
        className="fixed inset-0 z-0 pointer-events-none"
      />
    </ParticlesProvider>
  )
}
