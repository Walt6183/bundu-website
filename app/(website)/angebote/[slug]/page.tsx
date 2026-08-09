import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

interface Angebot {
  slug: string
  title: string
  subtitle: string
  zielgruppe: string
  preis: string
  nutzenListe?: string[]
  ablaufListe?: string[]
  fuerWen?: string
  inhalte?: string
}

const STATIC_ANGEBOTE: Angebot[] = [
  {
    slug: 'online-eltern-coaching',
    title: 'Online Eltern-Coaching',
    subtitle: 'Individuelle Beratung bei Erziehungsfragen per geschütztem Video-Call auf coachingspace.net.',
    zielgruppe: 'eltern',
    preis: 'Erstgespräch kostenlos. Einzelsitzung CHF 135.–',
    nutzenListe: [
      'Du gewinnst Klarheit darüber, was hinter schwierigen Erziehungssituationen steckt',
      'Du bekommst konkrete Strategien, die du sofort im Alltag anwenden kannst',
      'Du stärkst die Beziehung zu deinem Kind, ohne auf Druck oder Kontrolle zu setzen',
    ],
    fuerWen: 'Eltern und Bezugspersonen, die Unterstützung bei Erziehungsfragen suchen.',
    inhalte: 'Online Eltern-Coaching bietet individuelle Beratung via geschütztem Video-Call auf coachingspace.net. Die Sitzungen sind vertraulich, DSGVO-konform und flexibel terminierbar.',
    ablaufListe: [
      'Kostenloses 15-Minuten-Erstgespräch zum Kennenlernen',
      'Beratungssitzungen à 60 Minuten via coachingspace.net',
      'Optional: Follow-up nach 4 Wochen zur Standortbestimmung',
    ],
  },
  {
    slug: 'online-kurse',
    title: 'Online-Kurse',
    subtitle: 'Strukturierte Kurse zu Erziehung, Neuer Autorität und Beziehungsgestaltung. Flexibel abrufbar.',
    zielgruppe: 'eltern',
    preis: 'ab CHF 350.–',
    nutzenListe: [
      'Flexibles Lernen im eigenen Tempo',
      'Praxisnahe Inhalte mit sofortiger Anwendbarkeit',
      'Expertise aus der Neuen Autorität nach Haim Omer',
    ],
    fuerWen: 'Eltern, Bezugspersonen und Fachpersonen, die sich strukturiert weiterbilden möchten.',
    inhalte: 'Angebotene Kurse: Erziehungsratgeber 7–12 Jahre (CHF 350.–, 5 Module), Neue Autorität für Fachpersonen Webinar (CHF 750.–, 3 Tage, max. 15 Teilnehmende), Systemische Gesprächsführung (CHF 520.–, 2 Tage, max. 18 Teilnehmende).',
    ablaufListe: [
      'Kurs auswählen und anmelden',
      'Zugang zu Online-Materialien und Video-Inhalten',
      'Optional: begleitete Gruppenreflexion',
    ],
  },
  {
    slug: 'bundner-standard-einfuhrung-und-implementierung',
    title: 'Bündner Standard: Einführung und Implementierung',
    subtitle: 'Zertifizierte Implementierung des Bündner Standards für ein sicheres institutionelles Umfeld.',
    zielgruppe: 'institutionen',
    preis: 'Auf Anfrage',
    nutzenListe: [
      'Ihre Institution erhält klare Strukturen für den Umgang mit Grenzverletzungen',
      'Handlungssicherheit für das gesamte Team',
      'Nach erfolgreicher Implementierung darf Ihre Institution das Label «Wir arbeiten nach Bündner Standard» führen',
    ],
    fuerWen: 'Institutionen und Organisationen, die mit Kindern und Jugendlichen arbeiten.',
    inhalte: 'Der Bündner Standard ist ein anerkanntes Qualitätssystem zum Schutz vor sexuellen Grenzverletzungen in Institutionen. Die Einführung umfasst alle zehn Kernelemente.',
    ablaufListe: [
      'Kostenloses Erstgespräch zur Standortbestimmung',
      'Implementierung mit allen Beteiligten (6–18 Monate)',
      'Schulung der Fachpersonen zu den zehn Kernelementen',
      'Audit durch akkreditierten Berater',
      'Erwerb des Labels',
    ],
  },
  {
    slug: 'online-supervision',
    title: 'Online Supervision',
    subtitle: 'Professionelle Fallbesprechung und Reflexion für Fachpersonen – digital, flexibel und praxisnah.',
    zielgruppe: 'fachpersonen',
    preis: 'Auf Anfrage',
    nutzenListe: [
      'Du reflektierst komplexe Fälle strukturiert',
      'Du erweiterst dein methodisches Repertoire',
      'Du stärkst deine Resilienz',
    ],
    fuerWen: 'Fachpersonen aus Pädagogik, Sozialarbeit, Beratung und verwandten Bereichen.',
    inhalte: 'Online Supervision bietet einen geschützten Rahmen zur professionellen Reflexion. Einzeln oder in der Gruppe – digital via coachingspace.net.',
    ablaufListe: [
      'Kostenloses 15-Minuten-Erstgespräch',
      'Supervisionssitzungen à 90 Minuten via coachingspace.net',
      'Einzel- oder Gruppenformat',
    ],
  },
  {
    slug: 'webinare-workshops',
    title: 'Webinare & Workshops',
    subtitle: 'Praxisnahe Weiterbildungen zu Neuer Autorität, systemischer Gesprächsführung und pädagogischen Methoden.',
    zielgruppe: 'fachpersonen',
    preis: 'Auf Anfrage',
    nutzenListe: [
      'Direkt anwendbares Wissen und neue Methoden',
      'Austausch mit Kolleginnen und Kollegen',
      'Zertifizierte Weiterbildung',
    ],
    fuerWen: 'Fachpersonen und Teams aus Bildung, Soziales und Institutionen.',
    inhalte: 'Regelmässige Webinare und Präsenz-Workshops zu Themen wie Neue Autorität, systemische Gesprächsführung und Deeskalation.',
    ablaufListe: [
      'Thema und Termin auswählen',
      'Anmeldung und Kursbestätigung',
      'Teilnahme und Zertifikat',
    ],
  },
  {
    slug: 'stark-im-team',
    title: 'STARK im Team',
    subtitle: 'Teamentwicklung für pädagogische Teams, die Zusammenarbeit, Kommunikation und gemeinsame Haltung stärken möchten.',
    zielgruppe: 'institutionen',
    preis: 'Auf Anfrage',
    nutzenListe: [
      'Gestärkte Teamdynamik und Zusammenarbeit',
      'Klarere Kommunikationsstrukturen',
      'Gemeinsame pädagogische Haltung',
    ],
    fuerWen: 'Pädagogische Teams in Institutionen, Schulen und sozialen Einrichtungen.',
    inhalte: 'STARK im Team ist ein modulares Teamentwicklungsprogramm, das auf die Bedürfnisse Ihrer Institution zugeschnitten wird.',
    ablaufListe: [
      'Bedarfsanalyse und Zielsetzung',
      'Massgeschneidertes Programm',
      'Durchführung und Auswertung',
    ],
  },
  {
    slug: 'inhouse-fortbildung',
    title: 'Inhouse-Fortbildung',
    subtitle: 'Massgeschneiderte Weiterbildungen für Ihr Team – vor Ort oder online, flexibel und praxisorientiert.',
    zielgruppe: 'institutionen',
    preis: 'Auf Anfrage',
    nutzenListe: [
      'Inhalt und Format werden auf Ihr Team zugeschnitten',
      'Kein Reiseaufwand – Weiterbildung in Ihrer Institution',
      'Nachhaltige Wirkung durch praxisnahe Vermittlung',
    ],
    fuerWen: 'Institutionen und Organisationen, die ihr Team intern stärken möchten.',
    inhalte: 'Inhouse-Fortbildungen werden individuell auf Ihre Institution und Ihren Bedarf abgestimmt. Themen aus dem BundU® Portfolio sind flexibel kombinierbar.',
    ablaufListe: [
      'Erstgespräch zur Bedarfserhebung',
      'Konzeption des massgeschneiderten Programms',
      'Durchführung vor Ort oder online',
      'Nachbegleitung optional',
    ],
  },
]

export async function generateStaticParams() {
  return STATIC_ANGEBOTE.map(a => ({ slug: a.slug }))
}

export default async function AngebotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const angebot = STATIC_ANGEBOTE.find(a => a.slug === slug)
  if (!angebot) notFound()

  const related = STATIC_ANGEBOTE.filter(a => a.slug !== slug && a.zielgruppe === angebot.zielgruppe).slice(0, 3)

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-4">
          <Link href="/angebote" className="text-teal hover:underline text-sm">← Alle Angebote</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4 capitalize">{angebot.zielgruppe}</span>
            <h1 className="text-4xl font-bold text-navy mb-4">{angebot.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{angebot.subtitle}</p>

            {angebot.nutzenListe && angebot.nutzenListe.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Ihr Nutzen</h2>
                <ul className="space-y-3">
                  {angebot.nutzenListe.map((n, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-teal mt-1">✓</span>
                      <span className="text-gray-700">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {angebot.fuerWen && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Für wen?</h2>
                <p className="text-gray-700">{angebot.fuerWen}</p>
              </div>
            )}

            {angebot.inhalte && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Inhalte</h2>
                <p className="text-gray-700">{angebot.inhalte}</p>
              </div>
            )}

            {angebot.ablaufListe && angebot.ablaufListe.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Ablauf</h2>
                <ol className="space-y-3">
                  {angebot.ablaufListe.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="bg-teal text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-gray-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-bold text-navy mb-4">Preis</h3>
              <p className="text-2xl font-bold text-amber mb-4">{angebot.preis}</p>
              <p className="text-gray-600 text-sm mb-6">Kostenlose Erstberatung für alle Angebote verfügbar.</p>
              <Link href="/kontakt" className="bg-teal text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity block text-center mb-3">
                Jetzt anfragen
              </Link>
              <Link href="/kontakt" className="border-2 border-navy text-navy font-bold px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors block text-center">
                Erstgespräch buchen
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-navy mb-6">Ähnliche Angebote</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={"/angebote/" + r.slug} className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block">
                  <h3 className="text-lg font-bold text-navy mb-2">{r.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{r.subtitle}</p>
                  <p className="text-teal font-semibold text-sm">Mehr erfahren →</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
