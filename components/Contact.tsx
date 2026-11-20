'use client'

const links = [
  { label: 'LinkedIn', href: 'https://co.linkedin.com/in/salomon-avila-271b49220', icon: 'in' },
  { label: 'GitHub', href: 'https://github.com/SalomonAvila', icon: 'gh' },
  { label: 'Email', href: 'mailto:avila_sa@javeriana.edu.co', icon: '@' },
]

export default function Contact() {
  return (
    <section id="contact" className="ink-band no-bottom on-ink pt-32 pb-10 px-6 mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="section-fade">
          <p className="label-tag mb-5 justify-center">say hi</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Let&apos;s <span className="squiggle">connect</span>
          </h2>
          <p className="text-paper/80 mb-14 max-w-lg mx-auto leading-relaxed text-lg md:text-xl">
            Seeking software engineering internships and junior roles in distributed
            systems and cloud-native development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center section-fade">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn bg-paper text-ink px-7 py-3 text-xl font-display font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-paper group"
              style={{ boxShadow: '4px 4px 0 var(--accent)', borderColor: 'var(--paper)' }}
            >
              <span
                className="w-8 h-8 flex items-center justify-center text-sm border-2 border-current"
                style={{ borderRadius: 'var(--wobble-b)' }}
              >
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-24 border-t-2 border-dashed border-paper/25 pt-8">
          <p className="font-hand text-xl text-paper/60">
            sketched with Next.js &amp; Three.js &mdash; Bogotá, Colombia ✎
          </p>
        </div>
      </div>
    </section>
  )
}
