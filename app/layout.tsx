import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400','700'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: { default: 'B&U BundU – Systemische Beratung & Neue Autorität', template: '%s | B&U BundU' },
  description: 'B&U BundU – Systemische Beratung, Neue Autorität und Coaching für Eltern, Fachpersonen und Institutionen.',
  metadataBase: new URL('https://bundu.ch'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${merriweather.variable}`}>
      <body>{children}</body>
    </html>
  )
}
