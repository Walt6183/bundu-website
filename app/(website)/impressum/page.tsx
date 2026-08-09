export const revalidate = 3600

export default function ImpressumPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-navy mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Kontakt</h2>
            <p className="text-gray-700">
              <strong>Walter Uehli</strong><br />
              BundU® – Bildung und Entwicklung<br />
              Klosterstrasse 5<br />
              CH-5626 Bremgarten
            </p>
            <p className="text-gray-700 mt-3">
              Telefon: <a href="tel:+41555056203" className="text-teal hover:underline">+41 (0)55 505 62 03</a><br />
              E-Mail: <a href="mailto:info@bundu.ch" className="text-teal hover:underline">info@bundu.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Haftungsausschluss</h2>
            <p className="text-gray-700">
              Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Urheberrechte</h2>
            <p className="text-gray-700">
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, gehören ausschliesslich Walter Uehli oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung einzuholen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">Datenschutz</h2>
            <p className="text-gray-700">
              Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten.
            </p>
            <p className="text-gray-700 mt-3">
              Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="text-teal hover:underline">Datenschutzerklärung</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
