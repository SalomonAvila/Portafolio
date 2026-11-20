'use client'

const categories = [
  { title: 'Languages', icon: '⟨/⟩', skills: ['Java', 'TypeScript', 'Python', 'C++', 'Bun'] },
  { title: 'Frameworks', icon: '⌘', skills: ['Spring Boot', 'Angular', 'FastAPI', 'ElysiaJS', 'Express.js'] },
  { title: 'Infrastructure', icon: '⎈', skills: ['Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'Git'] },
  { title: 'Messaging', icon: '⟁', skills: ['ZeroMQ', 'MQTT', 'REST APIs', 'Event-Driven'] },
]

export default function Skills() {
  return (
    <section id="skills" className="ink-band on-ink py-28 px-6 my-12">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="label-tag mb-5">skills</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 leading-tight">
            Tools of the <span className="squiggle">trade</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {categories.map((cat) => (
            <div key={cat.title} className="section-fade">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-accent text-2xl">{cat.icon}</span>
                <h3 className="font-display text-2xl font-bold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3 tilt">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="sketch-box hoverable px-4 py-1.5 text-lg cursor-default"
                    style={{ boxShadow: '3px 3px 0 var(--stroke)' }}
                  >
                    {skill}
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
