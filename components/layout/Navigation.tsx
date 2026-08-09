'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Start' },
  { href: '/angebote', label: 'Angebote' },
  { href: '/themen', label: 'Themen' },
  { href: '/fuer-eltern', label: 'Für Eltern' },
  { href: '/fuer-fachpersonen', label: 'Für Fachpersonen' },
  { href: '/fuer-institutionen', label: 'Für Institutionen' },
  { href: '/impulse', label: 'Impulse' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-navy">B&U BundU</span>
          </Link>
          <div className="hidden lg:flex lg:items-center lg:gap-5">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-ink hover:text-teal transition-colors">{l.label}</Link>
            ))}
            <Link href="/kontakt" className="btn-primary text-sm py-2 px-4">Kontakt</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md text-ink hover:bg-light" aria-label="Menü">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-ink hover:bg-light">{l.label}</Link>
          ))}
          <Link href="/kontakt" onClick={() => setOpen(false)} className="block btn-primary text-center text-sm py-2">Kontakt</Link>
        </div>
      )}
    </nav>
  )
}
