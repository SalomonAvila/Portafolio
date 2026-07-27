'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function TireRing({ radius, tubeRadius, y, color }: {
  radius: number
  tubeRadius: number
  y: number
  color: string
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tubeRadius, 16, 48]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.6}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function Eye({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5
  })
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      <mesh ref={ref} position={[0, 0, 0.07]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

function Arm({ side, time }: { side: number; time: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const swing = Math.sin(t * 2) * 0.4
    groupRef.current.rotation.z = side * 0.15 + swing * side
    groupRef.current.rotation.x = Math.sin(t * 1.3 + side) * 0.15
  })
  return (
    <group ref={groupRef} position={[side * 1.05, 0.7, 0]}>
      <mesh position={[0, -0.25, 0]}>
        <capsuleGeometry args={[0.11, 0.35, 8, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  )
}

function Leg({ side }: { side: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const walk = Math.sin(t * 2 + Math.PI + side * Math.PI) * 0.2
    groupRef.current.rotation.x = walk
  })
  return (
    <group ref={groupRef} position={[side * 0.32, -1.45, 0]}>
      <mesh position={[0, -0.25, 0]}>
        <capsuleGeometry args={[0.14, 0.4, 8, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.65, 0.05]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  )
}

export default function MichelinBot() {
  const groupRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.1
    }
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.5) * 0.1
      headRef.current.rotation.x = Math.sin(t * 0.8) * 0.06
    }
    if (coreRef.current) {
      coreRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.3
    }
  })

  const bodyColor = '#e8e8e8'
  const accentColor = '#0A66C2'

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
      <group ref={groupRef}>
        <TireRing radius={0.48} tubeRadius={0.2} y={1.0} color={bodyColor} />
        <TireRing radius={0.58} tubeRadius={0.2} y={0.6} color={bodyColor} />
        <TireRing radius={0.63} tubeRadius={0.2} y={0.2} color={bodyColor} />
        <TireRing radius={0.58} tubeRadius={0.2} y={-0.2} color={bodyColor} />
        <TireRing radius={0.53} tubeRadius={0.2} y={-0.6} color={bodyColor} />
        <TireRing radius={0.48} tubeRadius={0.2} y={-1.0} color={bodyColor} />

        <mesh ref={coreRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.12}
          />
        </mesh>

        <group ref={headRef} position={[0, 1.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.38, 32, 32]} />
            <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.5} />
          </mesh>
          <Eye position={[-0.13, 0.06, 0.33]} color={accentColor} />
          <Eye position={[0.13, 0.06, 0.33]} color="#4CAF50" />
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
          <mesh position={[0, 0.54, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={3}
            />
          </mesh>
        </group>

        <Arm side={-1} time={0} />
        <Arm side={1} time={0} />
        <Leg side={-1} />
        <Leg side={1} />
      </group>
    </Float>
  )
}
