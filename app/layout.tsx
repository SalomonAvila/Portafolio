import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
