'use client'

const links = [
  {
    label: 'LinkedIn',
    href: 'https://co.linkedin.com/in/salomon-avila-271b49220',
    icon: 'in',
    color: '#0A66C2',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SalomonAvila',
    icon: 'gh',
    color: '#ffffff',
  },
  {
    label: 'Email',
    href: 'mailto:avila_sa@javeriana.edu.co',
    icon: '@',
    color: '#EA4335',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="section-fade">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-white/40 mb-12 max-w-lg mx-auto leading-relaxed text-sm">
            Seeking software engineering internships and junior roles in distributed
            systems and cloud-native development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center section-fade">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-border rounded-lg px-8 py-4 font-medium text-white/70 hover:text-white hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span
                className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${link.color}20`, color: link.color }}
              >
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-24 border-t border-white/5 pt-8">
          <p className="text-xs text-white/20 font-mono">
            Built with Next.js &amp; Three.js &mdash; Bogotá, Colombia
          </p>
        </div>
      </div>
    </section>
  )
}
