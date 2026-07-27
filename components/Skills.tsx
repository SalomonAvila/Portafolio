'use client'

const categories = [
  {
    title: 'Languages',
    icon: '⟨/⟩',
    skills: [
      { name: 'Java', color: '#ED8B00' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Python', color: '#3776AB' },
      { name: 'C++', color: '#00599C' },
      { name: 'Bun', color: '#ffffff' },
    ],
  },
  {
    title: 'Frameworks',
    icon: '⌘',
    skills: [
      { name: 'Spring Boot', color: '#6DB33F' },
      { name: 'Angular', color: '#DD0031' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'ElysiaJS', color: '#ffffff' },
      { name: 'Express.js', color: '#333333' },
    ],
  },
  {
    title: 'Infrastructure',
    icon: '⎈',
    skills: [
      { name: 'Docker', color: '#2496ED' },
      { name: 'Kubernetes', color: '#326CE5' },
      { name: 'Linux', color: '#FCC624' },
      { name: 'GitHub Actions', color: '#2088FF' },
      { name: 'Git', color: '#F05032' },
    ],
  },
  {
    title: 'Messaging',
    icon: '⟁',
    skills: [
      { name: 'ZeroMQ', color: '#DF0000' },
      { name: 'MQTT', color: '#3C5280' },
      { name: 'REST APIs', color: '#0A66C2' },
      { name: 'Event-Driven', color: '#4CAF50' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-2">
            Tech Stack
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">
            Tools of the <span className="text-accent">Trade</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div key={cat.title} className="section-fade">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-primary text-lg">{cat.icon}</span>
                <h3 className="text-base font-bold text-white/80">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="gradient-border rounded-lg px-4 py-2.5 flex items-center gap-2.5 hover:scale-105 transition-all duration-200 cursor-default group"
                  >
                    <span
                      className="w-2 h-2 rounded-full group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 6px ${skill.color}40` }}
                    />
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors font-mono">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
