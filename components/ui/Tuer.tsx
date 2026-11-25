import type { ReactNode } from 'react'
import Aufklapp from '@/components/ui/Aufklapp'
import Knopf from '@/components/ui/Knopf'

export const AUFKLAPP_LABEL = 'Mehr anzeigen'

// Eine Tür: Türschild, Knopf, dann der Text im Aufklappblock (nur bis 767 px zugeklappt).
// DOM-Reihenfolge = Reihenfolge auf dem Telefon (Schild, Knopf, Text). Ab 1024 px steht der Knopf
// per `order` unter dem Text, direkt darunter, ohne Leerraum. Mit `knopfUnten` (Startseite) steht er ab 1024 px am
// Boden der Tür, damit die Knöpfe zweier verschieden langer Türen auf einer Linie stehen.
export default function Tuer({
  schild,
  cta,
  href,
  children,
  knopfUnten = false,
}: {
  schild: string
  cta: string
  href: string
  children: ReactNode
  knopfUnten?: boolean
}) {
  return (
    <article className="tuer flex flex-col gap-1 rounded-lg bg-grey-light p-3 shadow-[0_8px_24px_rgba(15,32,64,0.16)] transition-shadow hover:shadow-[0_0_0_2px_#0F2040,0_8px_24px_rgba(15,32,64,0.16)] md:gap-3 md:p-6">
      <h2 className="text-[1.125rem] md:text-[1.375rem]">{schild}</h2>
      <p className={`md:order-3 md:pt-1${knopfUnten ? ' lg:mt-auto' : ''}`}>
        <Knopf href={href}>{cta}</Knopf>
      </p>
      <div className="md:order-2">
        <Aufklapp label={AUFKLAPP_LABEL}>{children}</Aufklapp>
      </div>
    </article>
  )
}
