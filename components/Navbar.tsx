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
        scrolled ? 'bg-paper/95 border-b-2 border-dashed border-ink/40 py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-bold text-ink flex items-baseline">
          salomon<span className="text-accent">.</span>
        </a>
        <div className="hidden md:flex items-center gap-6 font-hand text-2xl font-medium">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="scribble-link text-ink">
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/SalomonAvila"
            target="_blank"
            rel="noopener noreferrer"
            className="sketch-btn bg-paper text-ink px-4 py-0.5 hover:bg-accent hover:text-paper"
          >
            github ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
