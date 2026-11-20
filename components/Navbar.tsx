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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when the viewport grows past md.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onResize = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        solid ? 'bg-paper/95 border-b-2 border-dashed border-ink/40 py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-name text-3xl font-extrabold text-ink leading-none" onClick={() => setOpen(false)}>
          salomon<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
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

        {/* Mobile toggle: three wobbly pencil lines that cross into an X */}
        <button
          type="button"
          className="md:hidden sketch-btn bg-paper text-ink w-11 h-11 flex items-center justify-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path
              d="M3 6 C 9 5, 15 7, 21 6"
              className="origin-center transition-transform duration-300 [transform-box:fill-box]"
              style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <path
              d="M4 12 C 10 13, 14 11, 20 12"
              className="transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <path
              d="M3 18 C 9 17, 15 19, 21 18"
              className="origin-center transition-transform duration-300 [transform-box:fill-box]"
              style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile panel — a torn-out note card */}
      {open && (
        <div id="mobile-menu" className="md:hidden px-6 pt-3 pb-5">
          <div className="sketch-box tape bg-paper px-6 pt-7 pb-5 menu-drop">
            <ul className="flex flex-col gap-1 font-hand text-3xl font-bold">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-1.5 text-ink"
                  >
                    <span className="text-accent text-xl w-6">{String(i + 1).padStart(2, '0')}</span>
                    <span className="scribble-link">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://github.com/SalomonAvila"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="sketch-btn mt-5 flex items-center justify-center bg-accent text-paper font-hand text-2xl font-bold py-1.5"
            >
              github ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
