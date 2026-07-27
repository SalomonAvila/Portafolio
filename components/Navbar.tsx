'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
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
          ? 'bg-dark/80 backdrop-blur-xl border-b border-primary/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-black tracking-tighter">
          <span className="text-primary">SA</span>
          <span className="text-accent">.</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono text-white/40 hover:text-primary transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/SalomonAvila"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-white/40 hover:text-primary transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/5"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
