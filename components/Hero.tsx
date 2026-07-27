'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ball = container.querySelector<HTMLDivElement>('.pong-ball')
    const leftPaddle = container.querySelector<HTMLDivElement>('.pong-paddle-left')
    const rightPaddle = container.querySelector<HTMLDivElement>('.pong-paddle-right')
    const leftScore = container.querySelector<HTMLDivElement>('.pong-score-left')
    const rightScore = container.querySelector<HTMLDivElement>('.pong-score-right')

    if (!ball || !leftPaddle || !rightPaddle) return

    let animFrame: number
    let ballX = 0.5
    let ballY = 0.5
    let velX = 0.003
    let velY = 0.002
    let leftScoreVal = 0
    let rightScoreVal = 0
    let leftPaddleY = 0.5
    let rightPaddleY = 0.5

    function animate() {
      if (!container || !ball || !leftPaddle || !rightPaddle) return
      const w = container.clientWidth
      const h = container.clientHeight
      const ballHalfW = (ball.offsetWidth / 2) / w
      const pH = leftPaddle.offsetHeight / h

      // Paddle edges in normalized coords (read from DOM)
      const lpLeft = leftPaddle.offsetLeft / w
      const lpRight = (leftPaddle.offsetLeft + leftPaddle.offsetWidth) / w
      const rpRight = (rightPaddle.offsetLeft + rightPaddle.offsetWidth) / w
      const rpLeft = rightPaddle.offsetLeft / w

      // Move
      ballX += velX
      ballY += velY

      // Bounce top / bottom
      if (ballY < 0) { ballY = 0; velY = Math.abs(velY) }
      if (ballY > 1) { ballY = 1; velY = -Math.abs(velY) }

      // --- Left paddle collision ---
      const ballLeftEdge = ballX - ballHalfW
      if (velX < 0 && ballLeftEdge <= lpRight && ballY > leftPaddleY - pH / 2 - 0.03 && ballY < leftPaddleY + pH / 2 + 0.03) {
        velX = Math.abs(velX) * 1.02
        velY += (ballY - leftPaddleY) * 0.004
        ballX = lpRight + ballHalfW + 0.002
      }

      // --- Right paddle collision ---
      const ballRightEdge = ballX + ballHalfW
      if (velX > 0 && ballRightEdge >= rpLeft && ballY > rightPaddleY - pH / 2 - 0.03 && ballY < rightPaddleY + pH / 2 + 0.03) {
        velX = -Math.abs(velX) * 1.02
        velY += (ballY - rightPaddleY) * 0.004
        ballX = rpLeft - ballHalfW - 0.002
      }

      // --- Score + reset ---
      if (ballX + ballHalfW < -0.02) {
        rightScoreVal++
        if (rightScore) rightScore.textContent = String(rightScoreVal)
        ballX = 0.5; ballY = 0.5
        velX = 0.003; velY = (Math.random() - 0.5) * 0.004
      }
      if (ballX - ballHalfW > 1.02) {
        leftScoreVal++
        if (leftScore) leftScore.textContent = String(leftScoreVal)
        ballX = 0.5; ballY = 0.5
        velX = -0.003; velY = (Math.random() - 0.5) * 0.004
      }

      // Clamp velocity
      velX = Math.max(-0.007, Math.min(0.007, velX))
      velY = Math.max(-0.005, Math.min(0.005, velY))

      // Paddle AI
      const leftTarget = ballX < 0.5 ? ballY : 0.5
      const rightTarget = ballX > 0.5 ? ballY : 0.5
      leftPaddleY += (leftTarget - leftPaddleY) * 0.04
      rightPaddleY += (rightTarget - rightPaddleY) * 0.04
      leftPaddleY = Math.max(pH / 2, Math.min(1 - pH / 2, leftPaddleY))
      rightPaddleY = Math.max(pH / 2, Math.min(1 - pH / 2, rightPaddleY))

      // Apply
      ball.style.left = `${ballX * 100}%`
      ball.style.top = `${ballY * 100}%`
      leftPaddle.style.top = `${leftPaddleY * 100}%`
      rightPaddle.style.top = `${rightPaddleY * 100}%`

      animFrame = requestAnimationFrame(animate)
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl h-[60vh] border border-white/10 rounded-xl overflow-hidden"
      >
        {/* Net */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-white/10" />

        {/* Left paddle */}
        <div
          className="pong-paddle-left absolute w-2 h-[15%] bg-primary/80 rounded-full -translate-y-1/2"
          style={{ left: '10px', top: '50%' }}
        />

        {/* Right paddle */}
        <div
          className="pong-paddle-right absolute w-2 h-[15%] bg-accent/80 rounded-full -translate-y-1/2"
          style={{ right: '10px', top: '50%' }}
        />

        {/* Ball = name */}
        <div
          className="pong-ball absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ left: '50%', top: '50%' }}
        >
          <span className="text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Salomon Avila
          </span>
        </div>

        {/* Scores */}
        <div className="absolute top-4 left-1/2 -translate-x-10">
          <span className="pong-score-left text-2xl font-mono text-primary/60">0</span>
        </div>
        <div className="absolute top-4 left-1/2 translate-x-2">
          <span className="pong-score-right text-2xl font-mono text-accent/60">0</span>
        </div>
      </div>
    </section>
  )
}
