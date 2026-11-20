'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

/*
 * A napkin sketch of a small distributed system — the kind of thing I like
 * building. Requests (coral) flow you → api → ØMQ broker → a worker and the
 * acks (ink) come back. Click a node to fire messages at its neighbours,
 * drag nodes to rearrange the diagram.
 */

type Kind = 'browser' | 'box' | 'broker' | 'db'
type SketchNode = { id: string; label: string; sub?: string; kind: Kind; x: number; y: number }
type Packet = { id: number; route: string[]; seg: number; t: number; reply: boolean; auto: boolean }

const W = 560
const H = 440

const INITIAL_NODES: SketchNode[] = [
  { id: 'you', label: 'you', sub: 'browser', kind: 'browser', x: 95, y: 95 },
  { id: 'api', label: 'api', sub: 'Spring Boot', kind: 'box', x: 300, y: 82 },
  { id: 'db', label: 'postgres', kind: 'db', x: 470, y: 190 },
  { id: 'broker', label: 'ØMQ', sub: 'broker', kind: 'broker', x: 265, y: 238 },
  { id: 'w1', label: 'C++', sub: 'worker', kind: 'box', x: 90, y: 352 },
  { id: 'w2', label: 'Go', sub: 'worker', kind: 'box', x: 280, y: 384 },
  { id: 'w3', label: 'Rust', sub: 'worker', kind: 'box', x: 465, y: 345 },
]

const EDGES: [string, string][] = [
  ['you', 'api'],
  ['api', 'db'],
  ['api', 'broker'],
  ['broker', 'w1'],
  ['broker', 'w2'],
  ['broker', 'w3'],
  ['w3', 'db'],
]

const WORKERS = ['w1', 'w2', 'w3']
const SPEED = 170 // px per second along an edge
const SPAWN_MS = 1100

// Each edge bows a little to one side so nothing looks ruler-straight.
const BOW = EDGES.map((_, i) => ((i * 37) % 15) - 7)

function control(a: SketchNode, b: SketchNode, bow: number) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  return { cx: mx - (dy / len) * bow * 2.2, cy: my + (dx / len) * bow * 2.2, len }
}

function pointOn(a: SketchNode, b: SketchNode, bow: number, t: number) {
  const { cx, cy } = control(a, b, bow)
  const u = 1 - t
  return {
    x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
    y: u * u * a.y + 2 * u * t * cy + t * t * b.y,
  }
}

function edgeIndex(u: string, v: string) {
  return EDGES.findIndex(([a, b]) => (a === u && b === v) || (a === v && b === u))
}

function neighbours(id: string) {
  return EDGES.flatMap(([a, b]) => (a === id ? [b] : b === id ? [a] : []))
}

function NodeShape({ node }: { node: SketchNode }) {
  const common = { fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 2.5, strokeLinejoin: 'round' as const }
  switch (node.kind) {
    case 'browser':
      return (
        <>
          <rect x={-52 + 4} y={-34 + 4} width={104} height={68} rx={8} fill="var(--ink)" />
          <rect x={-52} y={-34} width={104} height={68} rx={8} {...common} />
          <line x1={-52} y1={-20} x2={52} y2={-20} stroke="var(--ink)" strokeWidth={2} />
          {[-42, -33, -24].map((cx) => (
            <circle key={cx} cx={cx} cy={-27} r={2.6} fill="var(--ink)" />
          ))}
        </>
      )
    case 'broker':
      return (
        <>
          <circle cx={4} cy={4} r={42} fill="var(--ink)" />
          <circle r={42} {...common} />
          <circle r={34} fill="none" stroke="var(--ink)" strokeWidth={1.2} strokeDasharray="4 5" />
        </>
      )
    case 'db':
      return (
        <>
          <path d="M -44 -26 V 30 A 44 12 0 0 0 44 30 V -26" transform="translate(4 4)" fill="var(--ink)" />
          <path d="M -44 -26 V 30 A 44 12 0 0 0 44 30 V -26" {...common} />
          <ellipse cx={0} cy={-26} rx={44} ry={12} {...common} />
          <path d="M -44 -6 A 44 12 0 0 0 44 -6" fill="none" stroke="var(--ink)" strokeWidth={1.4} />
        </>
      )
    default:
      return (
        <>
          <rect x={-48 + 4} y={-28 + 4} width={96} height={56} rx={10} fill="var(--ink)" />
          <rect x={-48} y={-28} width={96} height={56} rx={10} {...common} />
        </>
      )
  }
}

export default function SystemSketch() {
  const uid = useId().replace(/:/g, '')
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState(INITIAL_NODES)
  const nodesRef = useRef(nodes)
  nodesRef.current = nodes

  const packets = useRef<Packet[]>([])
  const nextId = useRef(1)
  const [, setFrame] = useState(0)
  const [delivered, setDelivered] = useState(0)
  const [pings, setPings] = useState<Record<string, number>>({})

  const drag = useRef<{ id: string; dx: number; dy: number; moved: boolean; sx: number; sy: number } | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const send = useCallback((route: string[], reply = false, auto = false) => {
    packets.current.push({ id: nextId.current++, route, seg: 0, t: 0, reply, auto })
  }, [])

  // Animation loop: runs only while the sketch is on screen and the tab is visible.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()
    let sinceSpawn = SPAWN_MS
    let visible = true

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    if (wrapRef.current) io.observe(wrapRef.current)

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (visible && !document.hidden) {
        if (!reduced) {
          sinceSpawn += dt * 1000
          if (sinceSpawn >= SPAWN_MS) {
            sinceSpawn = 0
            const r = Math.random()
            if (r < 0.25) send(['you', 'api', 'db'], false, true)
            else send(['you', 'api', 'broker', WORKERS[Math.floor(Math.random() * 3)]], false, true)
          }
        }

        const byId = Object.fromEntries(nodesRef.current.map((n) => [n.id, n]))
        let arrived = 0
        const done: Packet[] = []
        for (const p of packets.current) {
          const a = byId[p.route[p.seg]]
          const b = byId[p.route[p.seg + 1]]
          const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
          p.t += reduced ? 1 : (dt * SPEED) / len
          if (p.t >= 1) {
            p.t = 0
            p.seg++
            if (p.seg >= p.route.length - 1) done.push(p)
          }
        }
        if (done.length) {
          packets.current = packets.current.filter((p) => !done.includes(p))
          for (const p of done) {
            arrived++
            // Auto requests get an ack back along the same route.
            if (p.auto && !p.reply) send([...p.route].reverse(), true, true)
          }
          setDelivered((d) => d + arrived)
        }
        setFrame((f) => (f + 1) % 1_000_000)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [send])

  function toSvg(e: React.PointerEvent) {
    const svg = svgRef.current!
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    return pt.matrixTransform(svg.getScreenCTM()!.inverse())
  }

  function onNodeDown(e: React.PointerEvent, node: SketchNode) {
    e.stopPropagation()
    const p = toSvg(e)
    drag.current = { id: node.id, dx: node.x - p.x, dy: node.y - p.y, moved: false, sx: e.clientX, sy: e.clientY }
    svgRef.current?.setPointerCapture(e.pointerId)
  }

  function onMove(e: React.PointerEvent) {
    const d = drag.current
    if (!d) return
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 5) return
    d.moved = true
    setDraggingId(d.id)
    const p = toSvg(e)
    const x = Math.max(55, Math.min(W - 55, p.x + d.dx))
    const y = Math.max(45, Math.min(H - 40, p.y + d.dy))
    setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x, y } : n)))
  }

  function onUp() {
    const d = drag.current
    drag.current = null
    setDraggingId(null)
    if (d && !d.moved) fire(d.id)
  }

  function fire(id: string) {
    for (const nb of neighbours(id)) send([id, nb])
    setPings((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }))
  }

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const rough = `sketch-rough-${uid}`

  return (
    <div ref={wrapRef} className="sketch-box tape bg-paper p-3 pt-6 sm:p-4 sm:pt-7 w-full select-none">
      <div className="flex items-baseline justify-between px-2 font-hand text-lg sm:text-xl text-ink/70">
        <span>napkin sketch #01 ✎</span>
        <span>
          msgs delivered: <span className="text-accent font-bold tabular-nums">{delivered}</span>
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label="Hand-drawn diagram of a distributed system: browser, API, ZeroMQ broker, C++/Go/Rust workers and PostgreSQL, with messages flowing between them"
      >
        <defs>
          <filter id={rough} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="3.5" />
          </filter>
        </defs>

        {/* Edges, drawn twice like a pencil going over a line again */}
        <g filter={`url(#${rough})`} fill="none" stroke="var(--ink)" strokeLinecap="round">
          {EDGES.map(([u, v], i) => {
            const a = byId[u]
            const b = byId[v]
            const { cx, cy } = control(a, b, BOW[i])
            const d = `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
            return (
              <g key={`${u}-${v}`}>
                <path d={d} strokeWidth={2.2} />
                <path d={d} strokeWidth={1} strokeOpacity={0.45} transform="translate(2 -2)" />
              </g>
            )
          })}
        </g>

        {/* Edge notes */}
        <g className="font-hand" fill="var(--ink)" fontSize={18} opacity={0.75}>
          <text x={(byId.api.x + byId.broker.x) / 2 + 12} y={(byId.api.y + byId.broker.y) / 2}>
            req/rep
          </text>
          <text x={byId.broker.x - 135} y={byId.broker.y + 30}>
            pub/sub
          </text>
        </g>

        {/* Messages in flight */}
        {packets.current.map((p) => {
          const u = p.route[p.seg]
          const v = p.route[p.seg + 1]
          const i = edgeIndex(u, v)
          const [ea] = EDGES[i]
          const forward = ea === u
          const pos = pointOn(byId[EDGES[i][0]], byId[EDGES[i][1]], BOW[i], forward ? p.t : 1 - p.t)
          return p.reply ? (
            <circle key={p.id} cx={pos.x} cy={pos.y} r={4.5} fill="var(--ink)" />
          ) : (
            <circle key={p.id} cx={pos.x} cy={pos.y} r={6.5} fill="var(--accent)" stroke="var(--ink)" strokeWidth={1.6} />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x} ${node.y})`}
            onPointerDown={(e) => onNodeDown(e, node)}
            style={{ cursor: draggingId === node.id ? 'grabbing' : 'pointer', touchAction: 'none' }}
          >
            {pings[node.id] ? (
              <circle
                key={pings[node.id]}
                r={node.kind === 'broker' ? 44 : 40}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={3}
                className="node-ping"
              />
            ) : null}
            <g key={`pop-${pings[node.id] ?? 0}`} className={pings[node.id] ? 'node-pop' : undefined}>
              <g filter={`url(#${rough})`}>
                <NodeShape node={node} />
              </g>
              <text
                y={node.kind === 'browser' ? 2 : node.sub ? -2 : 6}
                textAnchor="middle"
                className="font-hand"
                fontSize={node.label.length > 5 ? 22 : 26}
                fontWeight={700}
                fill="var(--ink)"
              >
                {node.label}
              </text>
              {node.sub && (
                <text
                  y={node.kind === 'browser' ? 22 : 18}
                  textAnchor="middle"
                  className="font-hand"
                  fontSize={15}
                  fill="var(--ink)"
                  opacity={0.65}
                >
                  {node.sub}
                </text>
              )}
            </g>
          </g>
        ))}

        {/* "that's you" note */}
        <g className="font-hand" fill="var(--accent)" stroke="none">
          <text x={byId.you.x - 40} y={byId.you.y - 50} fontSize={20} fontWeight={700}>
            that&apos;s you!
          </text>
        </g>
      </svg>

      <p className="font-hand text-lg sm:text-xl text-ink/70 text-center -mt-1 pb-1">
        click a node to fire messages · drag it to rearrange
      </p>
    </div>
  )
}
