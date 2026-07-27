'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

const codeSnippets = [
  'while(true)',
  'O(n log n)',
  'async/await',
  'Docker K8s',
  'Spring Boot',
  'TCP/IP',
  'ZeroMQ',
  'def solve()',
  'class Node',
  'HashMap<>',
  'for(int i=0;',
  'try/catch',
  'MQTT pub',
  'const x =',
  'yield*',
  'SELECT *',
  'git merge',
  'void main()',
  '#include<>',
  'import pkg',
]

function FloatingCode({ text, position, rotation, speed }: {
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3
    ref.current.rotation.y += 0.003
    ref.current.rotation.z = Math.sin(t * speed * 0.5) * 0.1
  })

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position} rotation={rotation}>
        <Text
          fontSize={0.12}
          color="#0A66C2"
          anchorX="center"
          anchorY="middle"
          font={undefined}
          outlineWidth={0}
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

function DataFlowParticles() {
  const count = 200
  const mesh = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.5 + Math.random() * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  const speeds = useMemo(() => {
    return Array.from({ length: count }, () => ({
      speed: 0.5 + Math.random() * 2,
      offset: Math.random() * Math.PI * 2,
      radius: 2.5 + Math.random() * 2,
    }))
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const s = speeds[i]
      const angle = t * s.speed * 0.3 + s.offset
      posArray[i * 3] = Math.cos(angle) * s.radius
      posArray[i * 3 + 1] += Math.sin(t * s.speed + s.offset) * 0.002
      posArray[i * 3 + 2] = Math.sin(angle) * s.radius
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#4CAF50"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AlgorithmOrbit() {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.2
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.2
  })

  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 3.5
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 1.2) * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <octahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#0A66C2' : '#4CAF50'}
              emissive={i % 2 === 0 ? '#0A66C2' : '#4CAF50'}
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function GridPlane() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.z = -3 - (t * 0.3 % 2)
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -3]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color="#0A66C2"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  )
}

export default function FloatingElements() {
  return (
    <group>
      <DataFlowParticles />
      <AlgorithmOrbit />
      <GridPlane />

      {codeSnippets.slice(0, 10).map((text, i) => {
        const angle = (i / 10) * Math.PI * 2
        const radius = 3 + Math.random() * 1.5
        return (
          <FloatingCode
            key={text}
            text={text}
            position={[
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 3,
              Math.sin(angle) * radius - 1,
            ]}
            rotation={[0, -angle, 0]}
            speed={0.5 + Math.random() * 1.5}
          />
        )
      })}
    </group>
  )
}
