'use client'

import dynamic from 'next/dynamic'

const Name3D = dynamic(() => import('@/components/Name3D'), { ssr: false })

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <h1 className="sr-only">Salomon Avila</h1>

      {/* Margin doodles */}
      <svg
        className="absolute top-32 left-[8%] w-12 h-12 text-accent animate-float hidden sm:block"
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M25 4 L30 19 L46 20 L33 30 L38 46 L25 36 L12 46 L17 30 L4 20 L20 19 Z" />
      </svg>
      <svg
        className="absolute bottom-40 right-[9%] w-16 h-16 text-ink/60 animate-float hidden sm:block"
        style={{ animationDelay: '-3s' }}
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M30 30 m0 -3 a3 3 0 1 1 -3 3 a7 7 0 1 1 7 7 a11 11 0 1 1 -11 -11 a15 15 0 1 1 15 15 a19 19 0 1 1 -19 -19" />
      </svg>
      <svg
        className="absolute top-[38%] right-[6%] w-10 h-10 text-ink/50 hidden md:block"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M20 4 V36 M4 20 H36 M9 9 L31 31 M31 9 L9 31" />
      </svg>

      {/* Eyebrow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 text-center px-6 whitespace-nowrap">
        <p className="label-tag">hola! · Bogotá, CO</p>
      </div>

      {/* 3D Name */}
      <div className="relative w-full max-w-4xl h-[50vh] z-10">
        <Name3D />

        {/* "drag me" doodle */}
        <div className="absolute -bottom-6 right-[6%] hidden sm:flex items-end gap-1 pointer-events-none text-ink">
          <svg width="70" height="50" viewBox="0 0 70 50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path className="draw-in" d="M65 45 C 50 45, 30 40, 18 18" />
            <path className="draw-in" d="M10 24 L17 16 L26 20" />
          </svg>
          <span className="font-hand text-2xl font-bold wiggle -mb-2">drag me!</span>
        </div>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-center px-6 w-full max-w-2xl">
        <p className="text-xl md:text-2xl text-ink">
          Systems Engineering student ·{' '}
          <span className="marker">Distributed Systems</span> &amp; Full-Stack
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink/70 z-10">
        <div className="scroll-indicator">
          <svg width="22" height="30" viewBox="0 0 22 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 2 C 9 10, 13 16, 11 26" />
            <path d="M4 19 L11 27 L18 19" />
          </svg>
        </div>
      </div>
    </section>
  )
}
