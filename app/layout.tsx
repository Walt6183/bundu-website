import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-heading-var',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})
const sourceSans = localFont({
  src: './fonts/source-sans-3-latin-wght-normal.woff2',
  weight: '200 900',
  variable: '--font-body-var',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: { absolute: 'B&U BundU®' },
  metadataBase: new URL(process.env.SITE_URL || 'https://bundu.ch'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
