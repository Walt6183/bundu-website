'use client'

import Link from 'next/link'
import { useState } from 'react'

const STATIC_ANGEBOTE = [
  { slug: 'online-eltern-coaching', title: 'Online Eltern-Coaching', subtitle: 'Individuelle Beratung bei Erziehungsfragen per geschütztem Video-Call auf coachingspace.net.', zielgruppe: 'eltern', preis: 'Erstgespräch kostenlos. Einzelsitzung CHF 135.–' },
  { slug: 'online-kurse', title: 'Online-Kurse', subtitle: 'Strukturierte Kurse zu Erziehung, Neuer Autorität und Beziehungsgestaltung. Flexibel abrufbar.', zielgruppe: 'eltern', preis: 'ab CHF 350.–' },
  { slug: 'bundner-standard-einfuhrung-und-implementierung', title: 'Bündner Standard: Einführung und Implementierung', subtitle: 'Zertifizierte Implementierung des Bündner Standards für ein sicheres institutionelles Umfeld.', zielgruppe: 'institutionen', preis: 'Auf Anfrage' },
  { slug: 'online-supervision', title: 'Online Supervision', subtitle: 'Professionelle Fallbesprechung und Reflexion für Fachpersonen – digital, flexibel und praxisnah.', zielgruppe: 'fachpersonen', preis: 'Auf Anfrage' },
  { slug: 'webinare-workshops', title: 'Webinare & Workshops', subtitle: 'Praxisnahe Weiterbildungen zu Neuer Autorität, systemischer Gesprächsführung und pädagogischen Methoden.', zielgruppe: 'fachpersonen', preis: 'Auf Anfrage' },
  { slug: 'stark-im-team', title: 'STARK im Team', subtitle: 'Teamentwicklung für pädagogische Teams, die Zusammenarbeit, Kommunikation und gemeinsame Haltung stärken möchten.', zielgruppe: 'institutionen', preis: 'Auf Anfrage' },
  { slug: 'inhouse-fortbildung', title: 'Inhouse-Fortbildung', subtitle: 'Massgeschneiderte Weiterbildungen für Ihr Team – vor Ort oder online, flexibel und praxisorientiert.', zielgruppe: 'institutionen', preis: 'Auf Anfrage' },
]

const FILTERS = [
  { key: 'alle', label: 'Alle' },
  { key: 'eltern', label: 'Eltern' },
  { key: 'fachpersonen', label: 'Fachpersonen' },
  { key: 'institutionen', label: 'Institutionen' },
]

export default function AngebotePage() {
  const [filter, setFilter] = useState('alle')

  const filtered = filter === 'alle'
    ? STATIC_ANGEBOTE
    : STATIC_ANGEBOTE.filter(a => a.zielgruppe === filter)

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Unsere Angebote</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Professionelle Begleitung für Eltern, Fachpersonen und Institutionen</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={[
                'px-6 py-2 rounded-full font-semibold transition-colors',
                filter === f.key
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <Link
              key={a.slug}
              href={"/angebote/" + a.slug}
              className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block border border-gray-100"
            >
              <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">{a.zielgruppe}</span>
              <h2 className="text-lg font-bold text-navy mb-2">{a.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{a.subtitle}</p>
              <p className="text-amber font-semibold text-sm">{a.preis}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Nicht sicher, welches Angebot zu Ihnen passt?</h2>
          <p className="text-gray-600 mb-6">Im kostenlosen Erstgespräch finden wir gemeinsam die beste Lösung für Ihre Situation.</p>
          <Link href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Kostenlos Erstgespräch buchen</Link>
        </div>
      </div>
    </div>
  )
}
