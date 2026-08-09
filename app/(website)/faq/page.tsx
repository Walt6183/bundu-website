'use client'

import { useState, useEffect } from 'react'
import { client, FAQ_QUERY } from '@/lib/sanity'

const STATIC_FAQ = [
  {
    frage: 'Wie laufen die Online-Beratungen ab?',
    antwort: 'Wir treffen uns per coachingspace-Videokonferenz (DSGVO konform, geschützter Zugang). Sie brauchen lediglich eine stabile Internetverbindung.',
    kategorie: 'Allgemein',
  },
  {
    frage: 'Was ist das BundU® Prinzip?',
    antwort: 'Das BundU® Prinzip ist ein praxisnaher Orientierungsrahmen für alle, die Kinder, Jugendliche oder Teams begleiten. Es verbindet Neue Autorität (Haim Omer), Lösungsorientierung und Gewaltfreie Kommunikation.',
    kategorie: 'BundU',
  },
  {
    frage: 'Sind Inhouse-Angebote auch online möglich?',
    antwort: 'Ja, alle Inhouse-Angebote sind sowohl vor Ort als auch online oder hybrid durchführbar.',
    kategorie: 'Inhouse',
  },
  {
    frage: 'Wie läuft die Einführung des Bündner Standards ab?',
    antwort: '1. Erstanalyse und Standortbestimmung 2. Begleitung auf dem Weg zur Erfüllung 3. Prüfung und Zertifizierung',
    kategorie: 'Bündner Standard',
  },
  {
    frage: 'Wie viele Sitzungen brauche ich im Coaching?',
    antwort: 'Das ist sehr individuell. Im Erstgespräch klären wir gemeinsam Ihren Bedarf. Viele Klientinnen und Klienten kommen mit 3–6 Sitzungen aus.',
    kategorie: 'Coaching',
  },
  {
    frage: 'Ist das Erstgespräch wirklich kostenlos?',
    antwort: 'Ja, das Erstgespräch dauert 15 Minuten und ist vollständig kostenlos und unverbindlich. Es dient dem gegenseitigen Kennenlernen.',
    kategorie: 'Allgemein',
  },
]

function AccordionItem({ frage, antwort, kategorie }: { frage: string; antwort: string; kategorie: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div>
          <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-2 py-0.5 rounded-full mr-3">{kategorie}</span>
          <span className="font-semibold text-navy">{frage}</span>
        </div>
        <span className="text-teal text-xl ml-4">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{antwort}</p>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState(STATIC_FAQ)

  useEffect(() => {
    client.fetch(FAQ_QUERY)
      .then(data => { if (data && data.length > 0) setFaqs(data) })
      .catch(() => {})
  }, [])

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Häufige Fragen</h1>
          <p className="text-xl text-gray-600">Antworten auf die häufigsten Fragen rund um BundU®</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              frage={faq.frage}
              antwort={faq.antwort}
              kategorie={faq.kategorie}
            />
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Noch Fragen?</h2>
          <p className="text-gray-600 mb-6">Schreiben Sie uns oder buchen Sie ein kostenloses Erstgespräch.</p>
          <a href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Kontakt aufnehmen</a>
        </div>
      </div>
    </div>
  )
}
