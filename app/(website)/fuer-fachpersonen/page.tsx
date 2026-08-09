import Link from 'next/link'

export const revalidate = 3600

const ANGEBOTE_FACHPERSONEN = [
  { slug: 'online-supervision', title: 'Online Supervision', subtitle: 'Professionelle Fallbesprechung und Reflexion – digital und flexibel.', preis: 'Auf Anfrage' },
  { slug: 'webinare-workshops', title: 'Webinare und Workshops', subtitle: 'Praxisnahe Weiterbildungen zu Neuer Autorität und systemischer Gesprächsführung.', preis: 'Auf Anfrage' },
  { slug: 'online-kurse', title: 'Online-Kurse', subtitle: 'Strukturierte Kurse für Fachpersonen.', preis: 'ab CHF 350.–' },
]

export default function FuerFachpersonenPage() {
  return (
    <div className="py-16">
      <section className="bg-navy text-white py-20 mb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Für Fachpersonen</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Professionelle Begleitung, Supervision und Weiterbildung für Fachpersonen aus Pädagogik, Sozialarbeit und Beratung.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Professionalität stärken</h2>
            <p className="text-gray-600 mb-4">
              Fachpersonen, die täglich mit Kindern, Jugendlichen oder Familien arbeiten, stehen vor komplexen Herausforderungen. BundU® bietet Supervision, Weiterbildungen und Coaching, um Ihre Professionalität zu stärken und Ihre Resilienz zu fördern.
            </p>
            <p className="text-gray-600">
              Walter Uehli ist zertifizierter Trainer der Neuen Autorität und akkreditierter Berater für den Bündner Standard. Er verbindet Fachwissen mit langjähriger Praxiserfahrung.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-navy mb-4">Was BundU® Fachpersonen bietet</h3>
            <ul className="space-y-3">
              {[
                'Supervision (Einzel und Gruppe)',
                'Zertifizierte Weiterbildungen',
                'Webinare zu Neue Autorität und Systemik',
                'Professionelle Reflexion und Fallbesprechung',
                'Burnout-Prävention und Resilienzförderung',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-teal mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-navy mb-6">Angebote für Fachpersonen</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ANGEBOTE_FACHPERSONEN.map((a) => (
            <Link key={a.slug} href={"/angebote/" + a.slug} className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-2">{a.title}</h3>
              <p className="text-gray-600 mb-4">{a.subtitle}</p>
              <p className="text-amber font-semibold">{a.preis}</p>
            </Link>
          ))}
        </div>

        <div className="text-center bg-teal/5 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-navy mb-4">Jetzt anfragen</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Nehmen Sie Kontakt auf für ein unverbindliches Erstgespräch.</p>
          <Link href="/kontakt" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Erstgespräch buchen</Link>
        </div>
      </div>
    </div>
  )
}
