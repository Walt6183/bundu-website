import Link from 'next/link'

export const revalidate = 3600

const STATIC_THEMEN = [
  { slug: 'buendner-standard', title: 'Bündner Standard', desc: 'Ein anerkanntes Qualitätssystem zum Schutz vor sexuellen Grenzverletzungen in Institutionen.' },
  { slug: 'burnout-praevention', title: 'Burnout-Prävention', desc: 'Strategien zur Stärkung der Resilienz und Prävention von Erschöpfung bei Fachpersonen.' },
  { slug: 'deeskalation', title: 'Deeskalation', desc: 'Methoden zur gewaltfreien Konfliktlösung und Deeskalation in pädagogischen Settings.' },
  { slug: 'eltern-kind-kommunikation', title: 'Eltern-Kind-Kommunikation', desc: 'Wie Eltern und Kinder besser miteinander kommunizieren und Konflikte konstruktiv lösen.' },
  { slug: 'neue-autoritaet', title: 'Neue Autorität', desc: 'Das Konzept der Neuen Autorität nach Haim Omer: Präsenz, Beziehung und Hartnäckigkeit statt Kontrolle.' },
  { slug: 'systemische-beratung', title: 'Systemische Beratung', desc: 'Lösungsorientierter Ansatz, der das soziale Umfeld und die Ressourcen aller Beteiligten einbezieht.' },
]

export default function ThemenPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Themen</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fundiertes Wissen zu den Kernthemen von BundU®</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIC_THEMEN.map((t) => (
            <Link
              key={t.slug}
              href={"/themen/" + t.slug}
              className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block border border-gray-100"
            >
              <h2 className="text-xl font-bold text-navy mb-3">{t.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{t.desc}</p>
              <span className="text-teal font-semibold text-sm">Mehr erfahren →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
