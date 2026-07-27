'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const AVL_VALUES = [10, 20, 30, 25, 28, 5, 3, 15]

const AVL_LINES = [
  '#include <iostream>',
  'using namespace std;',
  '',
  'struct Node {',
  '    int key, height;',
  '    Node *left, *right;',
  '    Node(int k)',
  '        : key(k), height(1),',
  '          left(nullptr),',
  '          right(nullptr) {}',
  '};',
  '',
  'int height(Node* n) {',
  '    return n ? n->height : 0;',
  '}',
  '',
  'int getBalance(Node* n) {',
  '    return n ? height(n->left)',
  '               - height(n->right)',
  '             : 0;',
  '}',
  '',
  'Node* rightRotate(Node* y) {',
  '    Node* x = y->left;',
  '    Node* T2 = x->right;',
  '    x->right = y;',
  '    y->left = T2;',
  '    y->height = max(',
  '        height(y->left),',
  '        height(y->right)) + 1;',
  '    x->height = max(',
  '        height(x->left),',
  '        height(x->right)) + 1;',
  '    return x;',
  '}',
  '',
  'Node* leftRotate(Node* x) {',
  '    Node* y = x->right;',
  '    Node* T2 = y->left;',
  '    y->left = x;',
  '    x->right = T2;',
  '    x->height = max(',
  '        height(x->left),',
  '        height(x->right)) + 1;',
  '    y->height = max(',
  '        height(y->left),',
  '        height(y->right)) + 1;',
  '    return y;',
  '}',
  '',
  'Node* insert(Node* node,',
  '             int key) {',
  '    if (!node)',
  '        return new Node(key);',
  '    if (key < node->key)',
  '        node->left =',
  '            insert(node->left,',
  '                   key);',
  '    else if (key > node->key)',
  '        node->right =',
  '            insert(node->right,',
  '                   key);',
  '    else',
  '        return node;',
  '',
  '    node->height = 1 + max(',
  '        height(node->left),',
  '        height(node->right));',
  '',
  '    int balance =',
  '        getBalance(node);',
  '',
  '    // Left Left',
  '    if (balance > 1 &&',
  '        key < node->left->key)',
  '        return rightRotate(',
  '                   node);',
  '',
  '    // Right Right',
  '    if (balance < -1 &&',
  '        key > node->right->key)',
  '        return leftRotate(',
  '                   node);',
  '',
  '    // Left Right',
  '    if (balance > 1 &&',
  '        key > node->left->key){',
  '        node->left =',
  '            leftRotate(',
  '                node->left);',
  '        return rightRotate(',
  '                   node);',
  '    }',
  '',
  '    // Right Left',
  '    if (balance < -1 &&',
  '        key < node->right->key){',
  '        node->right =',
  '            rightRotate(',
  '                node->right);',
  '        return leftRotate(',
  '                   node);',
  '    }',
  '',
  '    return node;',
  '}',
  '',
  'void inorder(Node* root) {',
  '    if (!root) return;',
  '    inorder(root->left);',
  '    cout << root->key << " ";',
  '    inorder(root->right);',
  '}',
]

function getTreePositions(count: number) {
  const positions: { x: number; y: number }[] = []
  if (count === 0) return positions

  const svgW = 500
  const startY = 50
  const levelSpans = [1, 2, 4, 8]

  for (let i = 0; i < count; i++) {
    const depth = Math.floor(Math.log2(i + 1))
    const posInLevel = i - (Math.pow(2, depth) - 1)
    const span = levelSpans[depth] || Math.pow(2, depth)
    const padding = 80
    const totalWidth = svgW - padding * 2
    const slotWidth = totalWidth / span
    const x = padding + slotWidth * posInLevel + slotWidth / 2
    const y = startY + depth * 110
    positions.push({ x, y })
  }
  return positions
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 })

  // Measure root node position in viewport
  const measureCircle = useCallback(() => {
    if (!svgRef.current) return
    const svg = svgRef.current
    const svgRect = svg.getBoundingClientRect()
    // Root node is at SVG (250, 50), SVG is 500x420
    const scaleX = svgRect.width / 500
    const scaleY = svgRect.height / 420
    const x = svgRect.left + 250 * scaleX
    const y = svgRect.top + 50 * scaleY
    setCirclePos({ x, y })
  }, [])

  useEffect(() => {
    measureCircle()
    window.addEventListener('resize', measureCircle)
    return () => window.removeEventListener('resize', measureCircle)
  }, [measureCircle])

  const handleScroll = useCallback(() => {
    if (!containerRef.current || done) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight
    const scrolled = -rect.top
    const p = Math.max(0, Math.min(1, scrolled / scrollHeight))
    setProgress(p)

    if (p >= 0.99) {
      setDone(true)
      window.scrollTo(0, 0)
      onComplete()
    }
  }, [done, onComplete])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Progress zones:
  // 0 - 0.80  → code + tree appear
  // 0.80 - 0.90 → tree fully built, code fully shown
  // 0.90 - 0.95 → pulse (root node glows)
  // 0.95 - 1.00 → expand circle + fade content + color shift

  const codeProgress = Math.min(1, progress / 0.80)
  const treeProgress = Math.min(1, Math.max(0, (progress - 0.05) / 0.75))
  const pulseProgress = Math.min(1, Math.max(0, (progress - 0.90) / 0.05))
  const expandProgress = Math.min(1, Math.max(0, (progress - 0.95) / 0.05))

  const visibleCodeLines = Math.min(
    AVL_LINES.length,
    Math.floor(codeProgress * AVL_LINES.length)
  )
  const visibleNodes = Math.min(
    AVL_VALUES.length,
    Math.floor(treeProgress * AVL_VALUES.length)
  )
  const treePositions = getTreePositions(visibleNodes)
  const code = AVL_LINES.slice(0, visibleCodeLines).join('\n')

  const isPulsing = pulseProgress > 0 && expandProgress === 0
  const isExpanding = expandProgress > 0

  const circleScale = isExpanding
    ? 1 + expandProgress * 55
    : isPulsing
    ? 1 + pulseProgress * 0.5
    : 1

  const contentOpacity = isExpanding
    ? Math.max(0, 1 - expandProgress * 2)
    : 1

  // Blue → dark
  const circleR = Math.round(lerp(10, 10, expandProgress))
  const circleG = Math.round(lerp(102, 10, expandProgress))
  const circleB = Math.round(lerp(194, 15, expandProgress))
  const circleColor = `rgb(${circleR}, ${circleG}, ${circleB})`

  return (
    <div ref={containerRef} style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0f]">
        {/* Content */}
        <div className="absolute inset-0 flex flex-col" style={{ opacity: contentOpacity }}>
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
            <div className="font-mono text-xs text-white/30">
              <span className="text-primary">SA</span>
              <span className="text-accent">.</span>
              <span className="ml-2">~/avl_tree</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-primary border-primary/30 bg-primary/5">
                AVL Tree
              </span>
              <span className="text-[10px] font-mono text-white/20">
                C++ Implementation
              </span>
            </div>
          </div>

          <div className="flex flex-1">
            {/* Code */}
            <div className="w-[45%] h-full flex items-center justify-center p-4">
              <div className="bg-[#0d1117] rounded-xl border border-white/10 p-4 max-w-lg w-full font-mono text-[11px] leading-[1.6] overflow-hidden">
                <div className="flex gap-1.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-white/20 text-[10px]">avl.cpp</span>
                </div>
                <div className="max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
                  <pre className="text-white/50">
                    {code.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-white/10 w-6 text-right mr-3 select-none shrink-0">
                          {i + 1}
                        </span>
                        <span className={
                          line.startsWith('#') || line.startsWith('using')
                            ? 'text-[#ff7b72]'
                            : line.includes('struct') || line.includes('int ') || line.includes('Node*')
                            ? 'text-[#d2a8ff]'
                            : line.includes('return') || line.includes('new')
                            ? 'text-[#79c0ff]'
                            : line.includes('nullptr')
                            ? 'text-[#ff7b72]'
                            : 'text-[#c9d1d9]'
                        }>
                          {line || '\u00A0'}
                        </span>
                      </div>
                    ))}
                  </pre>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1">
                  <span className="text-white/20 text-[10px]">$</span>
                  <span className="text-primary/60 text-[10px] font-mono">
                    {visibleNodes > 0
                      ? `insert(${AVL_VALUES[Math.min(visibleNodes - 1, AVL_VALUES.length - 1)]})`
                      : 'g++ -o avl avl.cpp'}
                  </span>
                  <span className="inline-block w-1.5 h-3 bg-white/40 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Tree */}
            <div className="w-[55%] h-full flex items-center justify-center">
              <svg ref={svgRef} width="500" height="420" viewBox="0 0 500 420">
                {treePositions.map((pos, i) => {
                  if (i === 0) return null
                  const parentIdx = Math.floor((i - 1) / 2)
                  if (parentIdx >= treePositions.length) return null
                  const parent = treePositions[parentIdx]
                  return (
                    <line
                      key={`e-${i}`}
                      x1={parent.x}
                      y1={parent.y + 20}
                      x2={pos.x}
                      y2={pos.y - 20}
                      stroke="#ffffff18"
                      strokeWidth={1}
                    />
                  )
                })}
                {treePositions.map((pos, i) => {
                  const isLast = i === visibleNodes - 1 && visibleNodes > 0
                  const isRoot = i === 0
                  return (
                    <g key={`n-${i}`}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isRoot && isPulsing ? 25 : 20}
                        fill={isLast || (isRoot && isPulsing) ? '#0A66C2' : '#1a1a2e'}
                        stroke={isLast || (isRoot && isPulsing) ? '#0A66C2' : '#ffffff20'}
                        strokeWidth={isLast || (isRoot && isPulsing) ? 2.5 : 1}
                        style={isRoot && isPulsing ? { filter: 'drop-shadow(0 0 15px #0A66C2)' } : undefined}
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        {AVL_VALUES[i]}
                      </text>
                    </g>
                  )
                })}
                {visibleNodes === 0 && (
                  <text x={250} y={210} textAnchor="middle" fill="#ffffff12" fontSize="13" fontFamily="JetBrains Mono, monospace">
                    scroll to insert nodes...
                  </text>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Expanding circle */}
        {(isPulsing || isExpanding) && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: 40,
                height: 40,
                left: circlePos.x,
                top: circlePos.y,
                marginLeft: -20,
                marginTop: -20,
                transform: `scale(${circleScale})`,
                backgroundColor: circleColor,
                boxShadow: isExpanding ? 'none' : '0 0 80px 30px rgba(10, 102, 194, 0.4)',
              }}
            />
          </div>
        )}

        {/* Progress bar */}
        {!done && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/5 z-10">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}

        {/* Hint */}
        {!done && progress < 0.05 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 text-[10px] font-mono z-10">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            scroll to animate
          </div>
        )}
      </div>
    </div>
  )
}
