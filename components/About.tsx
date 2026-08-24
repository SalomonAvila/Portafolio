'use client'

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="label-tag mb-4">./about</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            Systems, from the wire up.
          </h2>
          <p className="text-white/40 max-w-2xl leading-relaxed mb-16 text-sm md:text-base">
            Systems Engineering student at Pontificia Universidad Javeriana, Bogotá.
            I like software that has to talk to other software &mdash; message queues,
            consensus, latency budgets &mdash; and the data structures that keep it fast.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: '⟁',
              title: 'Distributed Systems',
              desc: 'ZeroMQ pub/sub and request/response, MQTT, Docker and gRPC. Reliable delivery under latency and partial failure.',
              color: '#3FA9F5',
            },
            {
              icon: '⟐',
              title: 'Full-Stack Development',
              desc: 'Spring Boot and FastAPI services behind Angular and React frontends, wired up with GitHub Actions CI/CD.',
              color: '#33D17A',
            },
            {
              icon: '⟟',
              title: 'Algorithms & Data Structures',
              desc: 'Memory-efficient Graphs and AVL Trees in C++, built for coursework and for the habit of knowing what things cost.',
              color: '#EA4335',
            },
            {
              icon: '⌁',
              title: 'Building at Speed',
              desc: 'Shipped Pa-lante at Platanus Hack Bogotá with a 4-person team &mdash; idea to working product in one weekend.',
              color: '#F5A623',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="gradient-border rounded-xl p-6 hover:scale-[1.03] transition-all duration-300 group section-fade"
            >
              <div
                className="text-2xl mb-4 group-hover:scale-110 transition-transform duration-200"
                style={{ color: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-3">{card.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
