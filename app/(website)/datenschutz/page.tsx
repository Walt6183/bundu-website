export const revalidate = 3600

export default function DatenschutzPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-navy mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">1. Verantwortlicher</h2>
            <p className="text-gray-700">
              Walter Uehli, BundU® – Bildung und Entwicklung<br />
              Klosterstrasse 5, CH-5626 Bremgarten<br />
              E-Mail: info@bundu.ch
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">2. Erhebung und Verarbeitung von Daten</h2>
            <p className="text-gray-700">
              Wir erheben und verarbeiten personenbezogene Daten nur soweit dies für die Bereitstellung unserer Dienstleistungen erforderlich ist. Dies umfasst Name, E-Mail-Adresse und Telefonnummer, die Sie uns über das Kontaktformular übermitteln.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">3. Zweck der Datenverarbeitung</h2>
            <p className="text-gray-700">Ihre Daten verwenden wir ausschliesslich für:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>Beantwortung Ihrer Anfragen</li>
              <li>Durchführung gebuchter Dienstleistungen</li>
              <li>Zusendung relevanter Informationen nach Ihrer Einwilligung</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">4. Datenweitergabe</h2>
            <p className="text-gray-700">
              Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, ausser wenn dies gesetzlich vorgeschrieben ist oder Sie ausdrücklich eingewilligt haben.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">5. Cookies</h2>
            <p className="text-gray-700">
              Diese Website verwendet nur technisch notwendige Cookies. Es werden keine Tracking-Cookies eingesetzt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">6. Online-Beratungen</h2>
            <p className="text-gray-700">
              Alle Online-Beratungen und Coachings finden über coachingspace.net statt. Diese Plattform ist DSGVO-konform und bietet einen sicheren, verschlüsselten Zugang.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">7. Ihre Rechte</h2>
            <p className="text-gray-700">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Für Anfragen wenden Sie sich an: info@bundu.ch
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-3">8. Änderungen</h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die aktuelle Version ist auf dieser Seite veröffentlicht.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
