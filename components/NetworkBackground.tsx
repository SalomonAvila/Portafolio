'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 46
const CONNECT_DIST = 2.6
const BOUNDS = { x: 9, y: 5, z: 3 }

function randIn(range: number) {
  return (Math.random() * 2 - 1) * range
}

function Mesh() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const nodes = useMemo(() => {
    const arr = []
    for (let i = 0; i < NODE_COUNT; i++) {
      arr.push({
        pos: new THREE.Vector3(randIn(BOUNDS.x), randIn(BOUNDS.y), randIn(BOUNDS.z)),
        vel: new THREE.Vector3(randIn(0.04), randIn(0.04), randIn(0.02)),
        phase: Math.random() * Math.PI * 2,
      })
    }
    return arr
  }, [])

  const positions = useMemo(() => new Float32Array(NODE_COUNT * 3), [])
  const maxEdges = NODE_COUNT * 6
  const linePositions = useMemo(() => new Float32Array(maxEdges * 2 * 3), [maxEdges])
  const lineColors = useMemo(() => new Float32Array(maxEdges * 2 * 3), [maxEdges])

  const colorA = useMemo(() => new THREE.Color('#3fa9f5'), [])
  const colorB = useMemo(() => new THREE.Color('#33d17a'), [])

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i]
      if (!reducedMotion) n.pos.addScaledVector(n.vel, 1)
      if (n.pos.x > BOUNDS.x || n.pos.x < -BOUNDS.x) n.vel.x *= -1
      if (n.pos.y > BOUNDS.y || n.pos.y < -BOUNDS.y) n.vel.y *= -1
      if (n.pos.z > BOUNDS.z || n.pos.z < -BOUNDS.z) n.vel.z *= -1
      positions[i * 3] = n.pos.x
      positions[i * 3 + 1] = n.pos.y
      positions[i * 3 + 2] = n.pos.z
    }

    let edgeCount = 0
    for (let i = 0; i < NODE_COUNT && edgeCount < maxEdges; i++) {
      for (let j = i + 1; j < NODE_COUNT && edgeCount < maxEdges; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos)
        if (d < CONNECT_DIST) {
          const pulse = (Math.sin(t * 0.6 + nodes[i].phase) + 1) / 2
          const c = colorA.clone().lerp(colorB, pulse)
          const base = edgeCount * 6
          linePositions[base] = nodes[i].pos.x
          linePositions[base + 1] = nodes[i].pos.y
          linePositions[base + 2] = nodes[i].pos.z
          linePositions[base + 3] = nodes[j].pos.x
          linePositions[base + 4] = nodes[j].pos.y
          linePositions[base + 5] = nodes[j].pos.z
          const fade = 1 - d / CONNECT_DIST
          for (let k = 0; k < 2; k++) {
            lineColors[base + k * 3] = c.r * fade
            lineColors[base + k * 3 + 1] = c.g * fade
            lineColors[base + k * 3 + 2] = c.b * fade
          }
          edgeCount++
        }
      }
    }

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.attributes.position.needsUpdate = true
    }

    if (linesRef.current) {
      const geo = linesRef.current.geometry
      geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
      geo.setDrawRange(0, edgeCount * 2)
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial size={0.045} color="#3fa9f5" transparent opacity={0.55} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.35} />
      </lineSegments>
    </group>
  )
}

export default function NetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Mesh />
      </Canvas>
    </div>
  )
}
