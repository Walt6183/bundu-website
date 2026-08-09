import Link from 'next/link'
import { client, IMPULSE_QUERY } from '@/lib/sanity'

export const revalidate = 3600

const STATIC_IMPULSE = [
  {
    slug: 'was-ist-neue-autoritaet',
    title: 'Was ist Neue Autorität?',
    datum: '2024-01-15',
    kategorie: 'Neue Autorität',
    excerpt: 'Ein Überblick über das Konzept der Neuen Autorität nach Haim Omer und seine praktische Anwendung in Familie und Institution.',
  },
  {
    slug: 'buendner-standard-fuer-institutionen',
    title: 'Bündner Standard für Institutionen: Was steckt dahinter?',
    datum: '2024-02-10',
    kategorie: 'Bündner Standard',
    excerpt: 'Was bedeutet der Bündner Standard und warum lohnt sich die Implementierung für Ihre Institution?',
  },
  {
    slug: 'coaching-vs-therapie',
    title: 'Coaching vs. Therapie: Was brauche ich?',
    datum: '2024-03-05',
    kategorie: 'Coaching',
    excerpt: 'Wann ist Coaching die richtige Wahl und wann braucht es therapeutische Unterstützung? Eine Orientierungshilfe.',
  },
]

async function getImpulse() {
  try {
    const data = await client.fetch(IMPULSE_QUERY)
    return data && data.length > 0 ? data : STATIC_IMPULSE
  } catch {
    return STATIC_IMPULSE
  }
}

export default async function ImpulsePage() {
  const impulse = await getImpulse()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Impulse</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fachwissen, Erfahrungen und Impulse aus der BundU® Praxis</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impulse.map((imp: { slug: { current?: string } | string; title: string; datum: string; kategorie: string; excerpt: string }) => {
            const slugStr = typeof imp.slug === 'string' ? imp.slug : imp.slug?.current ?? ''
            return (
              <Link
                key={slugStr}
                href={"/impulse/" + slugStr}
                className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block border border-gray-100"
              >
                <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-3">{imp.kategorie}</span>
                <p className="text-gray-400 text-xs mb-2">{new Date(imp.datum).toLocaleDateString('de-CH')}</p>
                <h2 className="text-lg font-bold text-navy mb-2">{imp.title}</h2>
                <p className="text-gray-600 text-sm">{imp.excerpt}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
