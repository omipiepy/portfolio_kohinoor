import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

const FISH_CONFIGS = [
  { scale: 0.9, speed: 0.15, opacity: 0.7, pattern: 'circle', radius: 2.5, phase: 0 },
  { scale: 0.5, speed: 0.3, opacity: 0.5, pattern: 'figure8', radius: 2.0, phase: 1.2 },
  { scale: 0.35, speed: 0.5, opacity: 0.4, pattern: 'sine', radius: 1.5, phase: 2.5 },
  { scale: 0.6, speed: 0.25, opacity: 0.6, pattern: 'diagonal', radius: 2.2, phase: 3.8 },
  { scale: 0.25, speed: 0.6, opacity: 0.3, pattern: 'spiral', radius: 1.8, phase: 5.0 },
]

function FishPlane({ config, texture }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  const { width, height } = useMemo(() => {
    const image = texture.image
    const aspect = image ? image.width / image.height : 16 / 9
    const h = viewport.height * config.scale
    return { width: h * aspect, height: h }
  }, [texture, viewport.height, config.scale])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * config.speed + config.phase
    const r = config.radius
    let x = 0, y = 0

    switch (config.pattern) {
      case 'circle':
        x = Math.cos(t) * r
        y = Math.sin(t) * r
        break
      case 'figure8':
        x = Math.cos(t) * r
        y = Math.sin(2 * t) * r * 0.6
        break
      case 'sine':
        x = ((t * 1.5) % (r * 4)) - r * 2
        y = Math.sin(t * 2) * r * 0.5
        break
      case 'diagonal':
        x = Math.cos(t * 0.8) * r
        y = Math.sin(t * 0.5) * r * 0.7
        break
      case 'spiral':
        const spiralR = r + Math.sin(t * 0.4) * 0.8
        x = Math.cos(t) * spiralR
        y = Math.sin(t) * spiralR
        break
    }

    meshRef.current.position.set(x, y, 0)
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={config.opacity}
        toneMapped={false}
      />
    </mesh>
  )
}

function FishLayer() {
  const texture = useTexture('/images/fish.jfif')

  return (
    <>
      {FISH_CONFIGS.map((config, i) => (
        <FishPlane key={i} config={config} texture={texture} />
      ))}
    </>
  )
}

export default function FishScene() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <FishLayer />
      </Canvas>
    </div>
  )
}
