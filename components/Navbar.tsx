'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/85 backdrop-blur-xl border-b border-line py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-medium tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#33D17A]" />
          <span className="text-white/50">sa</span>
          <span className="text-primary">@</span>
          <span className="text-white/50">bogota</span>
          <span className="text-white/30">:~$</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-white/40 hover:text-primary transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
            >
              ./{link.label}
            </a>
          ))}
          <a
            href="https://github.com/SalomonAvila"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-white/40 hover:text-primary transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
          >
            github ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
