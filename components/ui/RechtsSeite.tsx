import Script from 'next/script'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import { PRIVACYBEE } from '@/content/konfig'
import { IMPRESSUM } from '@/content/impressum'
import T from '@/components/ui/T'
import { SEITE1 } from '@/content/texte'

// Impressum: Text des Inhabers aus content/impressum.ts, ohne JavaScript sichtbar, kein Skript ausser dem Banner (Phase 3b, Auftrag 7).
// Datenschutz: Widget von PrivacyBee, das Skript lädt nur auf der eigenen Seite. Den Rechtstext liefert der Dienst.
export default function RechtsSeite({ art }: { art: 'impressum' | 'datenschutz' }) {
  return (
    <>
      <Navigation bereich="weiche" />
      <main className="bg-white">
        <div className="container-b py-12 lg:py-16">
          {art === 'impressum' ? (
            <>
              <h1 className="mb-8 text-[2rem] lg:text-[2.5rem]">{IMPRESSUM.h1}</h1>
              <div className="flex max-w-[800px] flex-col gap-6">
                {IMPRESSUM.absaetze.map((zeilen, i) => (
                  <p key={i}>
                    {zeilen.map((z, j) => (
                      <span key={j} className="block">
                        {z.split(/(CHE-[\d.]+)/).map((t, k) =>
                          k % 2 === 1 ? (
                            <span key={k} className="nowrap">
                              {t}
                            </span>
                          ) : (
                            <T key={k} bind={false}>
                              {t}
                            </T>
                          ),
                        )}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-8 text-[2rem] lg:text-[2.5rem]">Datenschutz</h1>
              <Script src={PRIVACYBEE.datenschutzSkript} strategy="afterInteractive" />
              <privacybee-widget website-id={PRIVACYBEE.websiteId} type="dsg" lang={PRIVACYBEE.sprache}></privacybee-widget>
            </>
          )}
        </div>
      </main>
      <Footer {...SEITE1.fuss} />
    </>
  )
}
