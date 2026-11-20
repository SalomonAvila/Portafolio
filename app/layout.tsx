import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Self-hosted (latin subset) — Kalam for headings, Patrick Hand for body,
// Caveat for handwritten notes. All OFL-licensed Google Fonts.
const display = localFont({
  src: [
    { path: './fonts/kalam-400.woff2', weight: '400' },
    { path: './fonts/kalam-700.woff2', weight: '700' },
  ],
  variable: '--font-display',
})
const body = localFont({ src: './fonts/patrickhand-400.woff2', weight: '400', variable: '--font-body' })
const hand = localFont({
  src: [
    { path: './fonts/caveat-500.woff2', weight: '500' },
    { path: './fonts/caveat-700.woff2', weight: '700' },
  ],
  variable: '--font-hand',
})

export const metadata: Metadata = {
  title: 'Salomon Avila | Software Engineer',
  description: 'Systems Engineering Student | Software Builder | ACM Student Chapter President',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  )
}
