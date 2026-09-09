// BACKUP 6978 chars
import Link from 'next/link'

export const revalidate = 3600

const angebotePreview = [
  { slug: 'online-eltern-coaching', title: 'Online Eltern-Coaching', subtitle: 'Individuelle Beratung bei Erziehungsfragen per geschütztem Video-Call.', zielgruppe: 'Eltern' },
  { slug: 'online-kurse', title: 'Online-Kurse', subtitle: 'Strukturierte Kurse zu Erziehung, Neuer Autorität und Beziehungsgestaltung.', zielgruppe: 'Eltern' },
  { slug: 'bundner-standard-einfuhrung-und-implementierung', title: 'Bündner Standard', subtitle: 'Zertifizierte Implementierung für ein sicheres institutionelles Umfeld.', zielgruppe: 'Institutionen' },
  { slug: 'online-supervision', title: 'Online Supervision', subtitle: 'Professionelle Fallbesprechung für Fachpersonen.', zielgruppe: 'Fachpersonen' },
  { slug: 'webinare-workshops', title: 'Webinare und Workshops', subtitle: 'Praxisnahe Weiterbildungen zu Neuer Autorität.', zielgruppe: 'Fachpersonen' },
  { slug: 'stark-im-team', title: 'STARK im Team', subtitle: 'Teamentwicklung für pädagogische Teams.', zielgruppe: 'Institutionen' },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-navy text-white py-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-teal font-semibold tracking-widest uppercase text-sm mb-4">BundU® – Bildung und Entwicklung</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Beziehungsstärke.<br />
            <span className="text-teal">Wachstum.</span><br />
            Verantwortung.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Professionelle Beratung, Coaching und Weiterbildung für Eltern, Fachpersonen und Institutionen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/angebote" className="bg-teal text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Alle Angebote</Link>
            <Link href="/kontakt" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-navy transition-colors inline-block">Kostenlos anfragen</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">Für wen ist BundU®?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Ob Eltern, Fachpersonen oder Institutionen – BundU® begleitet Sie mit massgeschneiderten Angeboten.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">&#128106;</div>
              <h3 className="text-xl font-bold text-navy mb-3">Für Eltern</h3>
              <p className="text-gray-600 mb-4">Coaching und Kurse, die Sie in Ihrer Erziehungsarbeit stärken.</p>
              <Link href="/fuer-eltern" className="text-teal font-semibold hover:underline">Mehr erfahren</Link>
            </div>
            <div className="rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">&#127891;</div>
              <h3 className="text-xl font-bold text-navy mb-3">Für Fachpersonen</h3>
              <p className="text-gray-600 mb-4">Supervision und Weiterbildungen für Profis.</p>
              <Link href="/fuer-fachpersonen" className="text-teal font-semibold hover:underline">Mehr erfahren</Link>
            </div>
            <div className="rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">&#127963;</div>
              <h3 className="text-xl font-bold text-navy mb-3">Für Institutionen</h3>
              <p className="text-gray-600 mb-4">Inhouse-Schulungen und Teamentwicklung.</p>
              <Link href="/fuer-institutionen" className="text-teal font-semibold hover:underline">Mehr erfahren</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">Unsere Angebote</h2>
          <p className="text-center text-gray-600 mb-12">Professionelle Begleitung auf allen Ebenen</p>
          <div className="grid md:grid-cols-3 gap-6">
            {angebotePreview.map((a) => (
              <Link key={a.slug} href={"/angebote/" + a.slug} className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow block">
                <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-3">{a.zielgruppe}</span>
                <h3 className="text-lg font-bold text-navy mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm">{a.subtitle}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/angebote" className="bg-navy text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-block">Alle Angebote ansehen</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Das BundU® Prinzip</h2>
              <p className="text-gray-300 mb-4">
                BundU® verbindet Neue Autorität nach Haim Omer, Lösungsorientierung und Gewaltfreie Kommunikation.
              </p>
              <Link href="/themen/neue-autoritaet" className="border-2 border-teal text-teal font-bold px-6 py-2 rounded-lg hover:bg-teal hover:text-white transition-colors inline-block">Mehr über Neue Autorität</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Neue Autorität", "Lösungsorientierung", "Gewaltfreie Kommunikation", "Systemische Beratung"].map((t) => (
                <div key={t} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-semibold text-sm">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-amber text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Bereit für den nächsten Schritt?</h2>
          <p className="text-xl mb-8 opacity-90">Das kostenlose Erstgespräch ist unverbindlich und dauert 15 Minuten.</p>
          <Link href="/kontakt" className="bg-white text-amber font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block">
            Jetzt kostenlos Erstgespräch buchen
          </Link>
        </div>
      </section>
    </>
  )
}
