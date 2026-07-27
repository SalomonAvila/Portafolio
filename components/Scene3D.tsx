'use client'

import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import MichelinBot from './MichelinBot'
import FloatingElements from './FloatingElements'

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: '#0a0a0f' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#0A66C2" distance={15} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4CAF50" distance={15} />
      <pointLight position={[0, -3, 3]} intensity={0.3} color="#EA4335" distance={10} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.6}
        color="#0A66C2"
        castShadow
      />

      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0.3} fade speed={0.4} />

      <MichelinBot />
      <FloatingElements />
    </Canvas>
  )
}
