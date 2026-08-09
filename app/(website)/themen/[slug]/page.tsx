import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

const STATIC_THEMEN = [
  {
    slug: 'buendner-standard',
    title: 'Bündner Standard',
    desc: 'Ein anerkanntes Qualitätssystem zum Schutz vor sexuellen Grenzverletzungen in Institutionen.',
    content: 'Der Bündner Standard ist ein schweizweit anerkanntes Qualitätssystem für Institutionen, die mit Kindern und Jugendlichen arbeiten. Er umfasst zehn Kernelemente, die gemeinsam eine Schutzkultur im Umgang mit sexuellen Grenzverletzungen sicherstellen. Institutionen, die den Bündner Standard vollständig implementiert haben, dürfen das entsprechende Label tragen – ein sichtbares Zeichen für Qualität und Verantwortungsbewusstsein. BundU® begleitet Institutionen auf dem Weg zur Zertifizierung.',
  },
  {
    slug: 'burnout-praevention',
    title: 'Burnout-Prävention',
    desc: 'Strategien zur Stärkung der Resilienz und Prävention von Erschöpfung bei Fachpersonen.',
    content: 'Fachpersonen in sozialen und pädagogischen Berufen sind besonders gefährdet, an Erschöpfung zu erkranken. Burnout-Prävention beginnt mit Selbstwahrnehmung, der Pflege von Ressourcen und klaren Grenzen. In den BundU® Weiterbildungen lernen Fachpersonen konkrete Strategien zur Resilienzstärkung und zur Gestaltung einer gesunden Work-Life-Balance. Supervision und Coaching sind zentrale Werkzeuge der Prävention.',
  },
  {
    slug: 'deeskalation',
    title: 'Deeskalation',
    desc: 'Methoden zur gewaltfreien Konfliktlösung und Deeskalation in pädagogischen Settings.',
    content: 'Deeskalation ist eine Kernkompetenz für alle, die in konfliktreichen Situationen arbeiten. BundU® vermittelt praxisnahe Methoden der Deeskalation, die auf den Grundsätzen der Neuen Autorität und der Gewaltfreien Kommunikation basieren. Ziel ist es, Konflikte frühzeitig zu erkennen, zu entschärfen und konstruktiv zu lösen – ohne Eskalation und ohne Machtmissbrauch.',
  },
  {
    slug: 'eltern-kind-kommunikation',
    title: 'Eltern-Kind-Kommunikation',
    desc: 'Wie Eltern und Kinder besser miteinander kommunizieren und Konflikte konstruktiv lösen.',
    content: 'Gute Kommunikation zwischen Eltern und Kindern ist die Grundlage einer tragfähigen Beziehung. BundU® unterstützt Eltern dabei, eine klare, liebevolle und konsequente Kommunikation zu entwickeln. Zentrale Themen sind aktives Zuhören, Gefühle benennen, Grenzen setzen ohne Strafe und Konflikte als Lernchancen begreifen. Diese Fähigkeiten werden im Online Eltern-Coaching und in unseren Kursen vermittelt.',
  },
  {
    slug: 'neue-autoritaet',
    title: 'Neue Autorität',
    desc: 'Das Konzept der Neuen Autorität nach Haim Omer: Präsenz, Beziehung und Hartnäckigkeit statt Kontrolle.',
    content: 'Die Neue Autorität nach Haim Omer ist ein grundlegend anderes Verständnis von Autorität: Es geht nicht um Macht und Gehorsam, sondern um Präsenz, Beziehung und Hartnäckigkeit. Eltern und Fachpersonen lernen, wie sie klare Grenzen setzen und gleichzeitig eine starke, liebevolle Verbindung zu Kindern und Jugendlichen aufrechterhalten. Das BundU® Prinzip baut auf diesem Konzept auf und verbindet es mit systemischer Beratung und Lösungsorientierung. Walter Uehli ist zertifizierter Trainer der Neuen Autorität.',
  },
  {
    slug: 'systemische-beratung',
    title: 'Systemische Beratung',
    desc: 'Lösungsorientierter Ansatz, der das soziale Umfeld und die Ressourcen aller Beteiligten einbezieht.',
    content: 'Systemische Beratung betrachtet Menschen immer im Kontext ihrer sozialen Systeme – Familie, Schule, Institution. Sie ist lösungsorientiert und ressourcenaktivierend. Anstatt Probleme zu analysieren, fragt systemische Beratung: Was funktioniert bereits? Was sind die Stärken? Wie kann die Situation aus einem anderen Blickwinkel betrachtet werden? BundU® integriert systemische Ansätze in alle Beratungs- und Coaching-Angebote.',
  },
]

export async function generateStaticParams() {
  return STATIC_THEMEN.map(t => ({ slug: t.slug }))
}

export default async function ThemaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const thema = STATIC_THEMEN.find(t => t.slug === slug)
  if (!thema) notFound()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-4">
          <Link href="/themen" className="text-teal hover:underline text-sm">← Alle Themen</Link>
        </div>

        <h1 className="text-4xl font-bold text-navy mb-4">{thema.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{thema.desc}</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{thema.content}</p>
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Interesse geweckt?</h2>
          <p className="text-gray-600 mb-6">Erfahren Sie in einem kostenlosen Erstgespräch, wie BundU® Sie unterstützen kann.</p>
          <Link href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Jetzt Kontakt aufnehmen</Link>
        </div>
      </div>
    </div>
  )
}
