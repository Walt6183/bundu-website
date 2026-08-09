import Link from 'next/link'

export const revalidate = 3600

const ANGEBOTE_ELTERN = [
  { slug: 'online-eltern-coaching', title: 'Online Eltern-Coaching', subtitle: 'Individuelle Beratung bei Erziehungsfragen per geschütztem Video-Call.', preis: 'Erstgespräch kostenlos. Einzelsitzung CHF 135.–' },
  { slug: 'online-kurse', title: 'Online-Kurse', subtitle: 'Strukturierte Kurse zu Erziehung und Beziehungsgestaltung.', preis: 'ab CHF 350.–' },
]

export default function FuerElternPage() {
  return (
    <div className="py-16">
      <section className="bg-navy text-white py-20 mb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Für Eltern</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Als Elternteil stehen Sie vor einzigartigen Herausforderungen. BundU® begleitet Sie mit professionellem Coaching und Kursen, die auf Ihre Situation zugeschnitten sind.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Erziehung stärkt Beziehungen</h2>
            <p className="text-gray-600 mb-4">
              Erziehung ist keine Frage der richtigen Technik – sie ist eine Frage der Haltung und der Beziehung. BundU® unterstützt Sie dabei, als Elternteil präsent, klar und liebevoll zu sein – auch in schwierigen Momenten.
            </p>
            <p className="text-gray-600">
              Im Coaching und in unseren Kursen lernen Sie das BundU® Prinzip kennen: einen praxisnahen Ansatz, der auf Neuer Autorität, Lösungsorientierung und Gewaltfreier Kommunikation basiert.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-navy mb-4">Was BundU® Eltern bietet</h3>
            <ul className="space-y-3">
              {[
                'Individuelle Online-Beratung bei Erziehungsfragen',
                'Strukturierte Kurse zu Erziehung und Beziehung',
                'Konkrete Strategien für den Alltag',
                'Stärkung der Eltern-Kind-Beziehung',
                'Unterstützung bei Konflikten und Krisen',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-teal mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-navy mb-6">Angebote für Eltern</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {ANGEBOTE_ELTERN.map((a) => (
            <Link key={a.slug} href={"/angebote/" + a.slug} className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-2">{a.title}</h3>
              <p className="text-gray-600 mb-4">{a.subtitle}</p>
              <p className="text-amber font-semibold">{a.preis}</p>
            </Link>
          ))}
        </div>

        <div className="text-center bg-teal/5 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-navy mb-4">Kostenlos anfragen</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Das kostenlose Erstgespräch dauert 15 Minuten und ist unverbindlich. Lernen Sie BundU® kennen.</p>
          <Link href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Erstgespräch buchen</Link>
        </div>
      </div>
    </div>
  )
}
