import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">B&U BundU</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Starke Eltern – starke Kinder: Erziehung mit Haltung statt Härte.
              Systemische Beratung, Neue Autorität und Coaching.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Angebote</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {['Online Eltern-Coaching','Online-Kurse','Bündner Standard','Online Supervision','Webinare & Workshops','STARK im Team','Inhouse-Fortbildung'].map(a => (
                <li key={a}><Link href="/angebote" className="hover:text-teal transition-colors">{a}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Kontakt</h3>
            <address className="text-sm text-gray-300 not-italic space-y-1">
              <p>Klosterstrasse 5</p>
              <p>CH-5626 Bremgarten</p>
              <p className="mt-2"><a href="tel:+415****6203" className="hover:text-teal">+41 (0)55 505 62 03</a></p>
              <p><a href="mailto:info@bundu.ch" className="hover:text-teal">info@bundu.ch</a></p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            <strong className="text-gray-300">KI-Transparenzhinweis:</strong> Zur Unterstützung unserer Prozesse nutzen wir teilweise Künstliche Intelligenz. Durch den Einsatz rein lokaler Sprachmodelle gewährleisten wir maximale Datensicherheit und die Einhaltung der DSGVO sowie des Schweizer Datenschutzgesetzes (DSG), da keine Daten an externe Cloud-Anbieter übermittelt werden.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 B&U BundU. Alle Rechte vorbehalten.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/impressum" className="hover:text-teal">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-teal">Datenschutz</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
