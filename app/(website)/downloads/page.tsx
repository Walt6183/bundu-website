import { client, DOWNLOADS_QUERY } from '@/lib/sanity'

export const revalidate = 3600

const STATIC_DOWNLOADS = [
  {
    title: 'BundU® Infobroschüre',
    beschreibung: 'Übersicht über das BundU® Angebot und das BundU® Prinzip.',
    kategorie: 'Allgemein',
  },
  {
    title: 'Neue Autorität – Grundlagen',
    beschreibung: 'Einführung in das Konzept der Neuen Autorität nach Haim Omer.',
    kategorie: 'Fachpersonen',
  },
  {
    title: 'Bündner Standard – Übersicht der 10 Kernelemente',
    beschreibung: 'Kurzübersicht zu den zehn Kernelementen des Bündner Standards.',
    kategorie: 'Institutionen',
  },
]

async function getDownloads() {
  try {
    const data = await client.fetch(DOWNLOADS_QUERY)
    return data && data.length > 0 ? data : STATIC_DOWNLOADS
  } catch {
    return STATIC_DOWNLOADS
  }
}

export default async function DownloadsPage() {
  const downloads = await getDownloads()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Downloads</h1>
          <p className="text-xl text-gray-600">Nützliche Materialien und Dokumente zum Herunterladen</p>
        </div>

        <div className="space-y-4">
          {downloads.map((d: { title: string; beschreibung: string; kategorie: string; datei?: { asset?: { url?: string } } }, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-2">{d.kategorie}</span>
                <h2 className="font-bold text-navy">{d.title}</h2>
                {d.beschreibung && <p className="text-gray-600 text-sm mt-1">{d.beschreibung}</p>}
              </div>
              {d.datei?.asset?.url ? (
                <a
                  href={d.datei.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 bg-teal text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm flex-shrink-0"
                >
                  Download
                </a>
              ) : (
                <span className="ml-4 bg-gray-100 text-gray-400 font-semibold px-4 py-2 rounded-lg text-sm flex-shrink-0">Demnächst</span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Weitere Materialien auf Anfrage: <a href="mailto:info@bundu.ch" className="text-teal hover:underline">info@bundu.ch</a>
        </p>
      </div>
    </div>
  )
}
