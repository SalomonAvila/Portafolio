'use client'

const projects = [
  {
    title: 'Pa-lante',
    subtitle: 'Platanus Hack 26 · Bogotá',
    tags: ['TypeScript', 'Team of 4', 'Access track'],
    description:
      'Built in one weekend with a 4-person team for Platanus Hack Bogotá, on the Access track — idea to working product against the clock.',
    icon: '⌁',
    color: '#F5A623',
    href: 'https://github.com/SalomonAvila/Pa-lante',
  },
  {
    title: 'VigilApp',
    subtitle: 'ProyectoWeb',
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
    description:
      'Full-stack web application with an Angular frontend and a Java/Spring Boot backend, persisted in PostgreSQL and shipped via Docker Compose.',
    icon: '⟐',
    color: '#33D17A',
    href: 'https://github.com/SalomonAvila/ProyectoWeb',
    demo: 'https://proyecto-web-self.vercel.app',
  },
  {
    title: 'Distributed Processing',
    tags: ['Go', 'Concurrency', 'Distributed Systems'],
    description:
      'Distributed processing experiments in Go — concurrent workloads split across nodes, built to reason about coordination and throughput.',
    icon: '⟠',
    color: '#00ADD8',
    href: 'https://github.com/SalomonAvila/DistributedProcessing',
  },
  {
    title: 'Sistemas Distribuidos',
    subtitle: 'Proyecto_sistemas_distribuidos',
    tags: ['C++', 'ZeroMQ', 'PostgreSQL', 'Docker'],
    description:
      'C++ chosen for raw execution speed, ØMQ for pub/sub and request/response messaging, PostgreSQL and pgAdmin for persistence — all containerized.',
    icon: '⟁',
    color: '#3FA9F5',
    href: 'https://github.com/SalomonAvila/Proyecto_sistemas_distribuidos',
  },
  {
    title: 'Juego de Fonemas',
    tags: ['Next.js', 'TypeScript', 'Education'],
    description:
      'An interactive phoneme game built with Next.js to help kids practice sound recognition — playful UI on top of a small learning loop.',
    icon: '⟢',
    color: '#EA4335',
    href: 'https://github.com/SalomonAvila/juego-fonemas',
    demo: 'https://juego-fonemas.vercel.app',
  },
  {
    title: 'Machine Learning',
    tags: ['Python', 'Jupyter', 'Notebooks'],
    description:
      'Notebooks working through core machine learning models and techniques — from data prep to evaluation, one experiment at a time.',
    icon: '⟟',
    color: '#F7DF1E',
    href: 'https://github.com/SalomonAvila/MachineLearning',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="label-tag mb-4">./projects</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            Pulled straight from GitHub
          </h2>
          <p className="text-white/40 max-w-xl mb-16 text-sm leading-relaxed">
            A running log of what I&apos;ve shipped — hackathons, coursework, and
            side projects. See everything at{' '}
            <a
              href="https://github.com/SalomonAvila"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/SalomonAvila
            </a>
            .
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-6 hover:scale-[1.03] transition-all duration-300 group section-fade flex flex-col"
            >
              <div
                className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ color: project.color }}
              >
                {project.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-1">{project.title}</h3>
              {project.subtitle && (
                <p className="text-[11px] font-mono text-white/25 mb-3">{project.subtitle}</p>
              )}
              <p className="text-sm text-white/40 mb-5 leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{
                      color: project.color,
                      backgroundColor: `${project.color}15`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/25 group-hover:text-white/50 transition-colors">
                <span>view repo ↗</span>
                {project.demo && <span className="text-white/15">·</span>}
                {project.demo && <span>live demo</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
