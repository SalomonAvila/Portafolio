'use client'

const projects = [
  {
    title: 'Distributed Systems Environment',
    tags: ['C++', 'ZeroMQ', 'Docker', 'MQTT'],
    description:
      'Publisher/Subscriber and Request/Response patterns using ZeroMQ and MQTT for reliable message delivery in high-latency scenarios.',
    icon: '⟁',
    color: '#0A66C2',
  },
  {
    title: 'ACM Platform Ecosystem',
    tags: ['TypeScript', 'Bun', 'GitHub Actions', 'ElysiaJS'],
    description:
      'High-throughput RESTful services with integrated CI/CD, automated quality gates, and React/Angular frontend components.',
    icon: '⟐',
    color: '#4CAF50',
  },
  {
    title: 'Data Structures & Algorithms',
    tags: ['C++', 'Graphs', 'AVL Trees', 'Optimization'],
    description:
      'Custom memory-efficient data structures for complex optimization problems. Graphs, AVL Trees, and algorithmic solutions.',
    icon: '⟟',
    color: '#EA4335',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">
            Featured <span className="text-primary">Work</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="gradient-border rounded-xl p-6 hover:scale-[1.03] transition-all duration-300 group section-fade"
            >
              <div
                className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ color: project.color }}
              >
                {project.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-3">{project.title}</h3>
              <p className="text-sm text-white/40 mb-5 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
