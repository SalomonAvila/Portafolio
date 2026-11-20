'use client'

import SystemSketch from '@/components/SystemSketch'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-28 pb-20 relative overflow-hidden">
      {/* Margin doodles */}
      <svg
        className="absolute top-28 left-[3%] w-10 h-10 text-accent animate-float hidden lg:block"
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
        className="absolute bottom-16 left-[45%] w-14 h-14 text-ink/50 animate-float hidden md:block"
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

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-10 items-center">
        {/* Intro */}
        <div className="relative z-10">
          <p className="label-tag mb-6">hola! · Bogotá, CO</p>
          <h1 className="font-name font-extrabold leading-[0.95] tracking-tight text-6xl sm:text-7xl xl:text-8xl text-ink">
            Salomon
            <br />
            <span className="outline-word">Avila</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-ink/85 max-w-md leading-snug">
            Systems Engineering student who likes software that talks to other software —{' '}
            <span className="marker">distributed systems</span>, full-stack, and fast terminal tools.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 font-hand text-2xl font-bold">
            <a href="#projects" className="sketch-btn bg-accent text-paper px-6 py-1.5">
              see my projects ↓
            </a>
            <a href="#contact" className="sketch-btn bg-paper text-ink px-6 py-1.5 hover:bg-paper-deep">
              say hi
            </a>
          </div>
        </div>

        {/* Interactive sketch */}
        <div className="relative z-10 lg:rotate-[1.2deg]">
          <SystemSketch />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ink/60 z-10 hidden lg:block">
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
