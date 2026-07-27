'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'

const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), { ssr: false })

export default function Home() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (introDone) {
      window.scrollTo(0, 0)
    }
  }, [introDone])

  useEffect(() => {
    if (!introDone) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [introDone])

  return (
    <main className="min-h-screen">
      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
      {introDone && (
        <div className="animate-fade-in">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      )}
    </main>
  )
}
