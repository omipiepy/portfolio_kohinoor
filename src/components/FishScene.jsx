import { useRef, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

function FishPlane() {
  const meshRef = useRef()
  const texture = useTexture('/images/fish.jfif')
  const { viewport } = useThree()

  const planeAspect = useMemo(() => {
    const image = texture.image
    if (!image) return 16 / 9
    return image.width / image.height
  }, [texture])

  const height = viewport.height * 1.1
  const width = height * planeAspect

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
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
        <FishPlane />
      </Canvas>
    </div>
  )
}
