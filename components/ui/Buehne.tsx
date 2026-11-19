import type { ReactNode } from 'react'
import Foto from '@/components/ui/Foto'
import Personenzeile from '@/components/ui/Personenzeile'
import { FOTO } from '@/content/texte'

// Die Bühne: das Arbeitsplatzfoto füllt den Seitenanfang, ungeschnitten (4:3), links ab x = 0.
// Gesicht und Headset liegen im Bild rechts oben, die Hand unten links. Karten (Türen) beginnen
// deshalb erst unter dem Gesichtsfeld und ragen von rechts über die untere Bildhälfte.
// Auf dem Telefon steht das Foto oben in voller Breite.
export default function Buehne({
  kopf,
  karten,
  zeile = false,
  mittig = false,
}: {
  kopf: ReactNode
  karten?: ReactNode
  zeile?: boolean
  mittig?: boolean // Textspalte ab 1024 px senkrecht zur Bildmitte: keine leere Fläche unter dem Text (Phase 2b)
}) {
  return (
    <section className="lg:grid lg:grid-cols-[56fr_44fr]">
      <div>
        <Foto
          foto={FOTO.arbeitsplatz}
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="block aspect-[1448/1086] h-auto w-full"
        />
        {zeile ? <Personenzeile className="px-6 pt-2 text-base lg:px-6" /> : null}
      </div>
      <div
        className={`relative z-10 flex flex-col px-6 pb-6 lg:pb-8 lg:pl-8 lg:pr-6 ${mittig ? 'lg:justify-center' : ''}`}
      >
        <div
          className={`flex flex-col gap-2 pt-2 lg:gap-4 lg:pt-8 ${karten ? 'lg:min-h-[calc(21vw+4px)]' : ''}`}
        >
          {kopf}
        </div>
        {karten ? <div className="pt-2 lg:-ml-[288px] lg:pt-0">{karten}</div> : null}
      </div>
    </section>
  )
}
