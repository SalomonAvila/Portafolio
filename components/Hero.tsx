'use client'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="section-fade visible">
          <div className="inline-block mb-6">
            <span className="text-primary/80 font-mono text-xs tracking-[0.3em] uppercase bg-primary/5 border border-primary/20 rounded-full px-4 py-1.5">
              Systems Engineering &bull; Algorithms &bull; Distributed Systems
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-4 leading-[0.9] tracking-tight">
            <span className="text-white">Build.</span>{' '}
            <span className="text-white">Scale.</span>{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Deploy.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 mb-3 font-mono">
            Salomon Avila
          </p>

          <p className="text-sm text-white/25 mb-10 max-w-lg mx-auto leading-relaxed">
            ACM President &bull; Software Builder &bull; Bogotá, Colombia
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all duration-200 pulse-glow text-sm"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 gradient-border rounded-lg font-semibold text-white/70 hover:text-white transition-all duration-200 text-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
