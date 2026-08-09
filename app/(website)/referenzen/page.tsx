import { client, REFERENZEN_QUERY } from '@/lib/sanity'

export const revalidate = 3600

const STATIC_REFERENZEN = [
  {
    name: 'Maria S.',
    organisation: 'Mutter, Zürich',
    zitat: 'Das Online-Coaching hat mir geholfen, meinen Sohn (10) besser zu verstehen. Die Strategien aus der Neuen Autorität funktionieren wirklich – und das bereits nach wenigen Sitzungen.',
  },
  {
    name: 'Thomas K.',
    organisation: 'Heimleiter, Sozialinstitution, Graubünden',
    zitat: 'Die Implementierung des Bündner Standards war anspruchsvoll, aber Walter Uehli hat uns hervorragend begleitet. Unser Team ist heute viel sicherer im Umgang mit heiklen Situationen.',
  },
  {
    name: 'Sandra L.',
    organisation: 'Schulsozialarbeiterin',
    zitat: 'Die Supervision bei BundU® hat mir als Fachperson enorm geholfen. Ich kann komplexe Fälle strukturierter reflektieren und bin professionell gewachsen.',
  },
  {
    name: 'Peter M.',
    organisation: 'Kita-Leiter, Bern',
    zitat: 'Die Inhouse-Fortbildung zu Neuer Autorität war genau das, was unser Team brauchte. Praxisnah, klar und direkt anwendbar. Sehr empfehlenswert!',
  },
]

async function getReferenzen() {
  try {
    const data = await client.fetch(REFERENZEN_QUERY)
    return data && data.length > 0 ? data : STATIC_REFERENZEN
  } catch {
    return STATIC_REFERENZEN
  }
}

export default async function ReferenzenPage() {
  const referenzen = await getReferenzen()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Referenzen</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Was Klientinnen, Klienten und Partner über BundU® sagen</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {referenzen.map((r: { name: string; organisation: string; zitat: string }, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <p className="text-gray-600 italic mb-4 leading-relaxed">"{r.zitat}"</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-navy">{r.name}</p>
                <p className="text-gray-500 text-sm">{r.organisation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
