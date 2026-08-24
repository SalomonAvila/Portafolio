'use client'

import dynamic from 'next/dynamic'

const Name3D = dynamic(() => import('@/components/Name3D'), { ssr: false })

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <h1 className="sr-only">Salomon Avila</h1>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* Eyebrow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <p className="label-tag">systems online · Bogotá, CO</p>
      </div>

      {/* 3D Name */}
      <div className="relative w-full max-w-4xl h-[50vh] z-10">
        <Name3D />
      </div>

      {/* Tagline */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <p className="text-sm md:text-base text-white/50 font-mono tracking-wide">
          Systems Engineering student · Distributed Systems &amp; Full-Stack
        </p>
        <p className="mt-2 text-[11px] text-white/25 font-mono flex items-center justify-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M9 21v-2" />
          </svg>
          drag to rotate
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 z-10">
        <div className="scroll-indicator">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
