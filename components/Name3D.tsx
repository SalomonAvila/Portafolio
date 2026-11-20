'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NAME = 'Salomon Avila'
const FONT_PX = 220
const SAMPLE_STEP = 8
const ALPHA_THRESHOLD = 140
const MAX_NEIGHBORS = 4
const NEIGHBOR_RADIUS = SAMPLE_STEP * 2.6
const PX_TO_UNIT = 1 / 85
const Z_JITTER = 0.35
const JITTER_AMPLITUDE = 0.018
const MOUNT_DURATION = 0.9

type NameGraph = {
  positions: Float32Array
  edges: { a: number; b: number; phase: number; fade: number }[]
  phases: Float32Array
  bboxWidth: number
}

// Draw the name to an offscreen canvas and keep every pixel above the alpha
// threshold as a node — turns the glyph outlines into a point cloud we can
// wire up like a network graph.
// next/font exposes the hashed family name through a CSS variable on <html>.
function displayFamily() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--font-display').trim()
  return v || '"Kalam", cursive'
}

function sampleName(): NameGraph {
  const family = displayFamily()
  const measure = document.createElement('canvas').getContext('2d')!
  measure.font = `700 ${FONT_PX}px ${family}`
  const textWidth = measure.measureText(NAME).width

  const canvasW = Math.ceil(textWidth + FONT_PX * 0.6)
  const canvasH = Math.ceil(FONT_PX * 1.5)
  const canvas = document.createElement('canvas')
  canvas.width = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')!
  ctx.font = `700 ${FONT_PX}px ${family}`
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(NAME, canvasW / 2, canvasH / 2)

  const img = ctx.getImageData(0, 0, canvasW, canvasH).data
  const pts: { x: number; y: number }[] = []
  for (let y = 0; y < canvasH; y += SAMPLE_STEP) {
    for (let x = 0; x < canvasW; x += SAMPLE_STEP) {
      const alpha = img[(y * canvasW + x) * 4 + 3]
      if (alpha > ALPHA_THRESHOLD) pts.push({ x, y })
    }
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const p of pts) {
    if (p.x < minX) minX = p.x
    if (p.x > maxX) maxX = p.x
    if (p.y < minY) minY = p.y
    if (p.y > maxY) maxY = p.y
  }
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const bboxWidth = (maxX - minX) * PX_TO_UNIT

  const n = pts.length
  const positions = new Float32Array(n * 3)
  const phases = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    positions[i * 3] = (pts[i].x - cx) * PX_TO_UNIT
    positions[i * 3 + 1] = -(pts[i].y - cy) * PX_TO_UNIT
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * Z_JITTER
    phases[i] = Math.random() * Math.PI * 2
  }

  // One-time nearest-neighbor pass builds a fixed edge list — connectivity
  // never changes at runtime, so per-frame work stays O(edges), not O(n^2).
  const edgeSet = new Set<string>()
  const edges: { a: number; b: number; phase: number; fade: number }[] = []
  for (let i = 0; i < n; i++) {
    const dists: { j: number; d: number }[] = []
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const dx = pts[i].x - pts[j].x
      const dy = pts[i].y - pts[j].y
      const d = Math.hypot(dx, dy)
      if (d < NEIGHBOR_RADIUS) dists.push({ j, d })
    }
    dists.sort((a, b) => a.d - b.d)
    for (const { j, d } of dists.slice(0, MAX_NEIGHBORS)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (edgeSet.has(key)) continue
      edgeSet.add(key)
      edges.push({
        a: Math.min(i, j),
        b: Math.max(i, j),
        phase: phases[i],
        fade: 1 - d / NEIGHBOR_RADIUS,
      })
    }
  }

  return { positions, edges, phases, bboxWidth }
}

function NameGraphMesh({ graph, groupRef }: { graph: NameGraph; groupRef: React.RefObject<THREE.Group> }) {
  const { viewport } = useThree()
  const mountGroupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null)
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null)
  const startRef = useRef<number | null>(null)

  const fitScale = useMemo(() => {
    const fit = (viewport.width * 0.85) / graph.bboxWidth
    return Math.min(1.5, fit)
  }, [viewport.width, graph.bboxWidth])

  const nodeCount = graph.positions.length / 3
  const livePositions = useMemo(() => graph.positions.slice(), [graph])

  const maxEdges = graph.edges.length
  const linePositions = useMemo(() => new Float32Array(maxEdges * 2 * 3), [maxEdges])
  const lineColors = useMemo(() => new Float32Array(maxEdges * 2 * 3), [maxEdges])
  // Ink strokes on paper; edges occasionally flash the coral accent.
  const ink = useMemo(() => new THREE.Color('#23304a'), [])
  const accent = useMemo(() => new THREE.Color('#ff6b4a'), [])
  const paper = useMemo(() => new THREE.Color('#f7f1e3'), [])
  const tmp = useMemo(() => new THREE.Color(), [])

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (startRef.current === null) startRef.current = t

    const progress = reducedMotion ? 1 : Math.min(1, (t - startRef.current) / MOUNT_DURATION)
    const eased = 1 - Math.pow(1 - progress, 3)

    if (mountGroupRef.current) {
      mountGroupRef.current.scale.setScalar(0.92 + 0.08 * eased)
    }
    if (pointsMaterialRef.current) pointsMaterialRef.current.opacity = 0.9 * eased
    if (lineMaterialRef.current) lineMaterialRef.current.opacity = 0.9 * eased

    for (let i = 0; i < nodeCount; i++) {
      const bx = graph.positions[i * 3]
      const by = graph.positions[i * 3 + 1]
      const bz = graph.positions[i * 3 + 2]
      if (reducedMotion) {
        livePositions[i * 3] = bx
        livePositions[i * 3 + 1] = by
        livePositions[i * 3 + 2] = bz
      } else {
        const phase = graph.phases[i]
        livePositions[i * 3] = bx + Math.sin(t * 0.8 + phase) * JITTER_AMPLITUDE
        livePositions[i * 3 + 1] = by + Math.cos(t * 0.6 + phase * 1.3) * JITTER_AMPLITUDE
        livePositions[i * 3 + 2] = bz
      }
    }

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry
      geo.setAttribute('position', new THREE.BufferAttribute(livePositions, 3))
      geo.attributes.position.needsUpdate = true
    }

    for (let e = 0; e < maxEdges; e++) {
      const edge = graph.edges[e]
      const wave = reducedMotion ? 0 : (Math.sin(t * 0.6 + edge.phase) + 1) / 2
      const pulse = Math.pow(wave, 10)
      // Weak edges fade toward the paper color instead of toward black.
      const c = tmp.copy(ink).lerp(accent, pulse).lerp(paper, (1 - edge.fade) * 0.5)
      const base = e * 6
      linePositions[base] = livePositions[edge.a * 3]
      linePositions[base + 1] = livePositions[edge.a * 3 + 1]
      linePositions[base + 2] = livePositions[edge.a * 3 + 2]
      linePositions[base + 3] = livePositions[edge.b * 3]
      linePositions[base + 4] = livePositions[edge.b * 3 + 1]
      linePositions[base + 5] = livePositions[edge.b * 3 + 2]
      for (let k = 0; k < 2; k++) {
        lineColors[base + k * 3] = c.r
        lineColors[base + k * 3 + 1] = c.g
        lineColors[base + k * 3 + 2] = c.b
      }
    }

    if (linesRef.current) {
      const geo = linesRef.current.geometry
      geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <group scale={fitScale}>
        <group ref={mountGroupRef}>
          <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial ref={pointsMaterialRef} size={0.055} color="#23304a" transparent opacity={0} sizeAttenuation />
          </points>
          <lineSegments ref={linesRef}>
            <bufferGeometry />
            <lineBasicMaterial ref={lineMaterialRef} vertexColors transparent opacity={0} />
          </lineSegments>
        </group>
      </group>
    </group>
  )
}

export default function Name3D() {
  const groupRef = useRef<THREE.Group>(null)
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 })
  const [dragging, setDragging] = useState(false)
  const [graph, setGraph] = useState<NameGraph | null>(null)

  useEffect(() => {
    let cancelled = false
    async function build() {
      try {
        await document.fonts.load(`700 ${FONT_PX}px ${displayFamily()}`)
        await document.fonts.ready
      } catch {
        // font API not available or load failed — sample with fallback font
      }
      if (!cancelled) setGraph(sampleName())
    }
    build()
    return () => {
      cancelled = true
    }
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    dragRef.current.active = true
    dragRef.current.lastX = e.clientX
    dragRef.current.lastY = e.clientY
    setDragging(true)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current.active || !groupRef.current) return
    const dx = e.clientX - dragRef.current.lastX
    const dy = e.clientY - dragRef.current.lastY
    dragRef.current.lastX = e.clientX
    dragRef.current.lastY = e.clientY
    const g = groupRef.current
    g.rotation.y = THREE.MathUtils.clamp(g.rotation.y + dx * 0.01, -1.1, 1.1)
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + dy * 0.01, -0.6, 0.6)
  }

  function onPointerUp() {
    dragRef.current.active = false
    setDragging(false)
  }

  return (
    <div className="w-full h-full" style={{ cursor: dragging ? 'grabbing' : 'grab' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <ambientLight intensity={0.6} />
        {graph && <NameGraphMesh graph={graph} groupRef={groupRef} />}
      </Canvas>
    </div>
  )
}
