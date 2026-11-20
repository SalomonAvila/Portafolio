'use client'

const cards = [
  {
    icon: '⟁',
    title: 'Distributed Systems',
    desc: 'ZeroMQ pub/sub and request/response, MQTT, Docker and gRPC. Reliable delivery under latency and partial failure.',
  },
  {
    icon: '⟐',
    title: 'Full-Stack Development',
    desc: 'Spring Boot and FastAPI services behind Angular and React frontends, wired up with GitHub Actions CI/CD.',
  },
  {
    icon: '⟟',
    title: 'Algorithms & Data Structures',
    desc: 'Memory-efficient Graphs and AVL Trees in C++, built for coursework and for the habit of knowing what things cost.',
  },
  {
    icon: '⌁',
    title: 'Building at Speed',
    desc: 'Shipped Pa-lante at Platanus Hack Bogotá with a 4-person team; idea to working product in one weekend.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-fade">
          <p className="label-tag mb-5">about me</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Systems, from the <span className="squiggle">wire up.</span>
          </h2>
          <p className="text-ink/80 max-w-2xl leading-relaxed mb-16 text-lg md:text-xl">
            Systems Engineering student at Pontificia Universidad Javeriana, Bogotá.
            I like software that has to talk to other software &mdash;{' '}
            <span className="marker">message queues, consensus, latency budgets</span> &mdash;
            and the data structures that keep it fast.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 tilt">
          {cards.map((card) => (
            <div key={card.title} className="section-fade">
              <div className="sketch-box hoverable bg-paper p-6 h-full">
                <div
                  className="w-12 h-12 mb-4 flex items-center justify-center text-2xl text-ink border-2 border-ink"
                  style={{ borderRadius: 'var(--wobble-b)' }}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-2 leading-snug">{card.title}</h3>
                <p className="text-base text-ink/75 leading-snug">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
