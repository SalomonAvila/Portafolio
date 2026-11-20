'use client'

const projects = [
  {
    title: 'memtop',
    subtitle: 'Terminal system monitor · Linux',
    tags: ['Rust', 'ratatui', 'TUI', 'Linux'],
    description:
      'System info and a live monitor of CPU, memory, disks, GPU, network and processes in a single terminal screen. One static binary, English and Spanish UI.',
    icon: '▤',
    href: 'https://github.com/SalomonAvila/memtop',
  },
  {
    title: 'Pa-lante',
    subtitle: 'Platanus Hack 26 · Bogotá',
    tags: ['TypeScript', 'Team of 4', 'Access track'],
    description:
      'Built in one weekend with a 4-person team for Platanus Hack Bogotá, on the Access track — idea to working product against the clock.',
    icon: '⌁',
    href: 'https://github.com/SalomonAvila/Pa-lante',
  },
  {
    title: 'VigilApp',
    subtitle: 'ProyectoWeb',
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
    description:
      'Full-stack web application with an Angular frontend and a Java/Spring Boot backend, persisted in PostgreSQL and shipped via Docker Compose.',
    icon: '⟐',
    href: 'https://github.com/SalomonAvila/ProyectoWeb',
    demo: 'https://proyecto-web-self.vercel.app',
  },
  {
    title: 'Distributed Processing',
    tags: ['Go', 'Concurrency', 'Distributed Systems'],
    description:
      'Distributed processing experiments in Go — concurrent workloads split across nodes, built to reason about coordination and throughput.',
    icon: '⟠',
    href: 'https://github.com/SalomonAvila/DistributedProcessing',
  },
  {
    title: 'Sistemas Distribuidos',
    subtitle: 'Proyecto_sistemas_distribuidos',
    tags: ['C++', 'ZeroMQ', 'PostgreSQL', 'Docker'],
    description:
      'C++ chosen for raw execution speed, ØMQ for pub/sub and request/response messaging, PostgreSQL and pgAdmin for persistence — all containerized.',
    icon: '⟁',
    href: 'https://github.com/SalomonAvila/Proyecto_sistemas_distribuidos',
  },
  {
    title: 'Juego de Fonemas',
    tags: ['Next.js', 'TypeScript', 'Education'],
    description:
      'An interactive phoneme game built with Next.js to help kids practice sound recognition — playful UI on top of a small learning loop.',
    icon: '⟢',
    href: 'https://github.com/SalomonAvila/juego-fonemas',
    demo: 'https://juego-fonemas.vercel.app',
  },
  {
    title: 'Machine Learning',
    tags: ['Python', 'Jupyter', 'Notebooks'],
    description:
      'Notebooks working through core machine learning models and techniques — from data prep to evaluation, one experiment at a time.',
    icon: '⟟',
    href: 'https://github.com/SalomonAvila/MachineLearning',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="label-tag mb-5">projects</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Pulled straight from <span className="squiggle">GitHub</span>
          </h2>
          <p className="text-ink/80 max-w-xl mb-20 text-lg md:text-xl leading-relaxed">
            A running log of what I&apos;ve shipped — hackathons, coursework, and
            side projects. See everything at{' '}
            <a
              href="https://github.com/SalomonAvila"
              target="_blank"
              rel="noopener noreferrer"
              className="marker font-bold"
            >
              github.com/SalomonAvila
            </a>
            .
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 tilt">
          {projects.map((project) => (
            <div key={project.title} className="section-fade">
              <div className="sketch-box hoverable tape bg-paper p-6 pt-8 h-full flex flex-col group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl font-bold leading-tight">{project.title}</h3>
                  <span className="text-2xl text-ink/70 group-hover:text-accent transition-colors ml-3">
                    {project.icon}
                  </span>
                </div>
                {project.subtitle && (
                  <p className="font-hand text-xl text-ink/60 -mt-2 mb-3">{project.subtitle}</p>
                )}
                <p className="text-base text-ink/80 mb-5 leading-snug flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-2.5 py-0.5 border-[1.5px] border-ink/70 text-ink"
                      style={{ borderRadius: 'var(--wobble-c)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 font-hand text-xl font-bold border-t-2 border-dashed border-ink/25 pt-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="scribble-link"
                  >
                    view repo ↗
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="scribble-link"
                    >
                      live demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
