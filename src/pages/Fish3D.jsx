import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FISH_CONFIGS = [
  { color: '#7EB8D8', scale: 1.0, speed: 0.3, pattern: 'circle', radius: 2.8, phase: 0, wagSpeed: 2.5, opacity: 0.7 },
  { color: '#E8A838', scale: 0.7, speed: 0.5, pattern: 'figure8', radius: 2.2, phase: 1.2, wagSpeed: 3.5, opacity: 0.6 },
  { color: '#4ECDC4', scale: 0.5, speed: 0.8, pattern: 'sine', radius: 1.8, phase: 2.5, wagSpeed: 5.0, opacity: 0.5 },
  { color: '#E85D5D', scale: 0.8, speed: 0.4, pattern: 'diagonal', radius: 2.5, phase: 3.8, wagSpeed: 3.0, opacity: 0.65 },
  { color: '#9B5DE5', scale: 0.4, speed: 0.9, pattern: 'spiral', radius: 2.0, phase: 5.0, wagSpeed: 6.0, opacity: 0.45 },
]

function createTailGeometry() {
  const geo = new THREE.BufferGeometry()
  const verts = new Float32Array([
    0, 0, 0,
    -0.5, 0.45, 0,
    -0.5, -0.45, 0,
  ])
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  geo.computeVertexNormals()
  return geo
}

function createFinGeometry() {
  const geo = new THREE.BufferGeometry()
  const verts = new Float32Array([
    0, 0, 0,
    -0.3, 0.3, 0,
    -0.1, -0.25, 0,
  ])
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  geo.computeVertexNormals()
  return geo
}

function createDorsalGeometry() {
  const geo = new THREE.BufferGeometry()
  const verts = new Float32Array([
    0.1, 0, 0,
    -0.35, 0, 0.4,
    -0.35, 0, -0.4,
  ])
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  geo.computeVertexNormals()
  return geo
}

function Fish({ config }) {
  const groupRef = useRef()
  const tailRef = useRef()
  const leftFinRef = useRef()
  const rightFinRef = useRef()

  const tailGeo = useMemo(() => createTailGeometry(), [])
  const finGeo = useMemo(() => createFinGeometry(), [])
  const dorsalGeo = useMemo(() => createDorsalGeometry(), [])

  const bodyColor = useMemo(() => new THREE.Color(config.color), [config.color])
  const darkerColor = useMemo(() => new THREE.Color(config.color).multiplyScalar(0.7), [config.color])
  const eyeWhite = useMemo(() => new THREE.Color('#ffffff'), [])
  const eyePupil = useMemo(() => new THREE.Color('#111111'), [])

  useFrame((state) => {
    if (!groupRef.current) return
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
      case 'spiral': {
        const spiralR = r + Math.sin(t * 0.4) * 0.8
        x = Math.cos(t) * spiralR
        y = Math.sin(t) * spiralR
        break
      }
    }

    groupRef.current.position.set(x, y, 0)

    const dx = Math.cos(t + 0.01) * r - x
    const dy = Math.sin(t + 0.01) * r - y
    if (config.pattern === 'circle') {
      groupRef.current.rotation.z = Math.atan2(dy, dx)
    } else {
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.15
    }

    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * config.wagSpeed) * 0.4
    }
    if (leftFinRef.current) {
      leftFinRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2.5) * 0.2 + 0.3
    }
    if (rightFinRef.current) {
      rightFinRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * 2.5) * 0.2 - 0.3
    }
  })

  const s = config.scale

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh scale={[1.6 * s, 0.7 * s, 0.8 * s]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshPhongMaterial
          color={bodyColor}
          transparent
          opacity={config.opacity}
          shininess={80}
          specular={new THREE.Color('#ffffff')}
        />
      </mesh>

      {/* Head (slightly darker, front) */}
      <mesh position={[1.2 * s, 0, 0]} scale={[0.7 * s, 0.55 * s, 0.65 * s]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshPhongMaterial
          color={darkerColor}
          transparent
          opacity={config.opacity}
          shininess={60}
        />
      </mesh>

      {/* Tail */}
      <group ref={tailRef} position={[-1.6 * s, 0, 0]}>
        <mesh geometry={tailGeo} scale={[s, s, s]}>
          <meshPhongMaterial
            color={darkerColor}
            transparent
            opacity={config.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Dorsal fin */}
      <mesh
        geometry={dorsalGeo}
        position={[0, 0.6 * s, 0]}
        scale={[s, s, s]}
      >
        <meshPhongMaterial
          color={darkerColor}
          transparent
          opacity={config.opacity * 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left pectoral fin */}
      <group ref={leftFinRef} position={[0.3 * s, -0.15 * s, 0.65 * s]}>
        <mesh geometry={finGeo} scale={[s, s, s]}>
          <meshPhongMaterial
            color={darkerColor}
            transparent
            opacity={config.opacity * 0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Right pectoral fin */}
      <group ref={rightFinRef} position={[0.3 * s, -0.15 * s, -0.65 * s]}>
        <mesh geometry={finGeo} scale={[s, s, -s]}>
          <meshPhongMaterial
            color={darkerColor}
            transparent
            opacity={config.opacity * 0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Left eye */}
      <mesh position={[1.1 * s, 0.15 * s, 0.4 * s]}>
        <sphereGeometry args={[0.08 * s, 8, 8]} />
        <meshBasicMaterial color={eyeWhite} />
      </mesh>
      <mesh position={[1.16 * s, 0.15 * s, 0.42 * s]}>
        <sphereGeometry args={[0.04 * s, 8, 8]} />
        <meshBasicMaterial color={eyePupil} />
      </mesh>

      {/* Right eye */}
      <mesh position={[1.1 * s, 0.15 * s, -0.4 * s]}>
        <sphereGeometry args={[0.08 * s, 8, 8]} />
        <meshBasicMaterial color={eyeWhite} />
      </mesh>
      <mesh position={[1.16 * s, 0.15 * s, -0.42 * s]}>
        <sphereGeometry args={[0.04 * s, 8, 8]} />
        <meshBasicMaterial color={eyePupil} />
      </mesh>
    </group>
  )
}

function FishScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#4ECDC4" />
      {FISH_CONFIGS.map((config, i) => (
        <Fish key={i} config={config} />
      ))}
    </>
  )
}

export default function Fish3D() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <a
          href="/"
          style={{
            color: '#ffffff66',
            fontFamily: 'monospace',
            fontSize: 13,
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          ← back to portfolio
        </a>
      </div>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: '#0a0a0a' }}
        dpr={[1, 2]}
      >
        <FishScene />
      </Canvas>
    </div>
  )
}
