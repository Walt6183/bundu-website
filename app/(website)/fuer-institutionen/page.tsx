import Link from 'next/link'

export const revalidate = 3600

const ANGEBOTE_INSTITUTIONEN = [
  { slug: 'bundner-standard-einfuhrung-und-implementierung', title: 'Bündner Standard', subtitle: 'Zertifizierte Implementierung für ein sicheres institutionelles Umfeld.', preis: 'Auf Anfrage' },
  { slug: 'inhouse-fortbildung', title: 'Inhouse-Fortbildung', subtitle: 'Massgeschneiderte Weiterbildungen für Ihr Team.', preis: 'Auf Anfrage' },
  { slug: 'stark-im-team', title: 'STARK im Team', subtitle: 'Teamentwicklung für pädagogische Teams.', preis: 'Auf Anfrage' },
  { slug: 'webinare-workshops', title: 'Webinare und Workshops', subtitle: 'Praxisnahe Weiterbildungen für Institutionen.', preis: 'Auf Anfrage' },
]

export default function FuerInstitutionenPage() {
  return (
    <div className="py-16">
      <section className="bg-navy text-white py-20 mb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Für Institutionen</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Schulen, Heime, Kitas und soziale Einrichtungen vertrauen BundU® für Implementierungen, Teamentwicklung und Weiterbildungen.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Qualität und Sicherheit in Ihrer Institution</h2>
            <p className="text-gray-600 mb-4">
              Institutionen tragen eine besondere Verantwortung gegenüber den ihnen anvertrauten Kindern und Jugendlichen. BundU® unterstützt Sie dabei, diese Verantwortung mit klaren Strukturen, geschulten Fachpersonen und einem tragfähigen Schutzkonzept wahrzunehmen.
            </p>
            <p className="text-gray-600">
              Als akkreditierter Berater für den Bündner Standard begleitet Walter Uehli Institutionen auf dem Weg zur Zertifizierung und bietet massgeschneiderte Weiterbildungen für Ihr Team an.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-navy mb-4">Was BundU® Institutionen bietet</h3>
            <ul className="space-y-3">
              {[
                'Implementierung des Bündner Standards',
                'Label «Wir arbeiten nach Bündner Standard»',
                'Inhouse-Weiterbildungen für Ihr Team',
                'Teamentwicklung und Coaching',
                'Schulungen zu Deeskalation und Neue Autorität',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-teal mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-navy mb-6">Angebote für Institutionen</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {ANGEBOTE_INSTITUTIONEN.map((a) => (
            <Link key={a.slug} href={"/angebote/" + a.slug} className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-2">{a.title}</h3>
              <p className="text-gray-600 mb-4">{a.subtitle}</p>
              <p className="text-amber font-semibold">{a.preis}</p>
            </Link>
          ))}
        </div>

        <div className="text-center bg-teal/5 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-navy mb-4">Unverbindlich anfragen</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Lassen Sie uns gemeinsam herausfinden, wie BundU® Ihre Institution unterstützen kann.</p>
          <Link href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Jetzt Kontakt aufnehmen</Link>
        </div>
      </div>
    </div>
  )
}
