'use client'

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-2">
            Profile
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">
            The <span className="text-primary">Engineer</span> Behind the Bot
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '⟁',
              title: 'Distributed Systems',
              desc: 'Building resilient architectures with ZeroMQ, MQTT, Docker and Kubernetes. Reliable message delivery in high-latency scenarios.',
              color: '#0A66C2',
            },
            {
              icon: '⟐',
              title: 'Full-Stack Development',
              desc: 'Spring Boot backends, Angular frontends, FastAPI microservices. CI/CD pipelines with GitHub Actions and automated quality gates.',
              color: '#4CAF50',
            },
            {
              icon: '⟟',
              title: 'Algorithms & Data Structures',
              desc: 'Memory-efficient implementations of Graphs, AVL Trees, and custom solutions for complex optimization problems in C++.',
              color: '#EA4335',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="gradient-border rounded-xl p-7 hover:scale-[1.03] transition-all duration-300 group section-fade"
            >
              <div
                className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ color: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
