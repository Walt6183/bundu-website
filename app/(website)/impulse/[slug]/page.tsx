import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, IMPULS_BY_SLUG_QUERY } from '@/lib/sanity'

export const revalidate = 3600

const STATIC_IMPULSE = [
  {
    slug: 'was-ist-neue-autoritaet',
    title: 'Was ist Neue Autorität?',
    datum: '2024-01-15',
    kategorie: 'Neue Autorität',
    excerpt: 'Ein Überblick über das Konzept der Neuen Autorität nach Haim Omer und seine praktische Anwendung in Familie und Institution.',
    inhalt: 'Die Neue Autorität nach Haim Omer ist ein Paradigmenwechsel in der Pädagogik. Statt auf Macht und Kontrolle zu setzen, betont sie Präsenz, Beziehung und Hartnäckigkeit. Eltern und Fachpersonen lernen, wie sie als starke, verlässliche Bezugspersonen wirken können – ohne Schreien, Strafen oder Macht. Das Konzept hat sich weltweit bewährt und ist die Grundlage des BundU® Prinzips.',
  },
  {
    slug: 'buendner-standard-fuer-institutionen',
    title: 'Bündner Standard für Institutionen: Was steckt dahinter?',
    datum: '2024-02-10',
    kategorie: 'Bündner Standard',
    excerpt: 'Was bedeutet der Bündner Standard und warum lohnt sich die Implementierung für Ihre Institution?',
    inhalt: 'Der Bündner Standard ist ein schweizweit anerkanntes Qualitätssystem für Institutionen. Er definiert zehn Kernelemente, die gemeinsam eine Schutzkultur schaffen. Dazu gehören Leitbilder, Verhaltenskodizes, Beschwerdeverfahren und regelmässige Schulungen. Institutionen, die alle Elemente implementiert haben, erhalten das Label «Wir arbeiten nach Bündner Standard».',
  },
  {
    slug: 'coaching-vs-therapie',
    title: 'Coaching vs. Therapie: Was brauche ich?',
    datum: '2024-03-05',
    kategorie: 'Coaching',
    excerpt: 'Wann ist Coaching die richtige Wahl und wann braucht es therapeutische Unterstützung? Eine Orientierungshilfe.',
    inhalt: 'Coaching und Therapie sind zwei unterschiedliche Formate mit unterschiedlichen Zielen. Coaching ist ressourcenorientiert und zukunftsgerichtet – es geht um konkrete Ziele, Handlungsstrategien und persönliche Weiterentwicklung. Therapie ist angezeigt bei psychischen Erkrankungen, Traumata und tiefgreifenden emotionalen Belastungen. Im Zweifelsfall empfiehlt BundU® immer eine professionelle Abklärung.',
  },
]

async function getImpuls(slug: string) {
  try {
    const data = await client.fetch(IMPULS_BY_SLUG_QUERY, { slug })
    return data || STATIC_IMPULSE.find(i => i.slug === slug)
  } catch {
    return STATIC_IMPULSE.find(i => i.slug === slug)
  }
}

export default async function ImpulsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const impuls = await getImpuls(slug)
  if (!impuls) notFound()

  const title = impuls.title
  const datum = impuls.datum
  const kategorie = impuls.kategorie
  const excerpt = impuls.excerpt
  const inhalt = typeof impuls.inhalt === 'string' ? impuls.inhalt : ''

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-4">
          <Link href="/impulse" className="text-teal hover:underline text-sm">← Alle Impulse</Link>
        </div>

        <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4">{kategorie}</span>
        <p className="text-gray-400 text-sm mb-4">{new Date(datum).toLocaleDateString('de-CH')}</p>
        <h1 className="text-4xl font-bold text-navy mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{excerpt}</p>

        {inhalt && (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{inhalt}</p>
          </div>
        )}

        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Mehr erfahren?</h2>
          <p className="text-gray-600 mb-6">Kontaktieren Sie uns für ein unverbindliches Erstgespräch.</p>
          <Link href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Jetzt Kontakt aufnehmen</Link>
        </div>
      </div>
    </div>
  )
}
