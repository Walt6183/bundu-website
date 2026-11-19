import { Fragment } from 'react'
import Link from 'next/link'
import T from '@/components/ui/T'

export type Teil = { t: 'text' | 'link' | 'flaeche'; s: string; href?: string }
export type Platzhalter = { art: 'link' | 'foto' | 'flaeche'; ziele?: string[]; datei?: string; roh: string }

const KONTAKT = /(\+41 \(0\)55 505 62 03|info@bundu\.ch)/g

// Teile eines Textes: Text, Links auf Seiten des Baums, Platzhalterflächen.
// Telefon und E-Mail mit Platzhalter-Link (tel:, mailto:) führen auf "#".
export default function Teile({ teile, ph = [], bind = true }: { teile: Teil[]; ph?: Platzhalter[]; bind?: boolean }) {
  const kontaktLink = ph.some((p) => (p.ziele ?? []).some((z) => z.startsWith('tel:') || z.startsWith('mailto:')))
  const sichtbar = teile.filter((t) => t.s !== '' || t.t === 'flaeche')
  return (
    <>
      {sichtbar.map((t, i) => {
        const letzter = i === sichtbar.length - 1
        if (t.t === 'link') {
          return (
            <Link key={i} href={t.href ?? '#'} className="textlink">
              <T bind={bind && letzter}>{t.s}</T>
            </Link>
          )
        }
        if (t.t === 'flaeche') return <Flaeche key={i} />
        if (kontaktLink && KONTAKT.test(t.s)) {
          KONTAKT.lastIndex = 0
          return (
            <Fragment key={i}>
              {t.s.split(KONTAKT).map((x, j) =>
                j % 2 === 1 ? (
                  <Link key={j} href="#" className="textlink nowrap">
                    {x}
                  </Link>
                ) : (
                  <Fragment key={j}>{x}</Fragment>
                ),
              )}
            </Fragment>
          )
        }
        KONTAKT.lastIndex = 0
        return (
          <T key={i} bind={bind && letzter}>
            {t.s}
          </T>
        )
      })}
    </>
  )
}

// Neutrale, sichtbare Fläche mit genau dem Wort "PLATZHALTER" (Auftrag v3 Abschnitt 2).
export function Flaeche({ hoch = false }: { hoch?: boolean }) {
  return (
    <span
      className={`flex w-full max-w-[800px] items-center justify-center rounded-md border border-dashed border-grey-deep bg-white px-3 font-heading font-semibold text-grey-deep ${hoch ? 'min-h-[120px]' : 'min-h-[56px]'}`}
    >
      PLATZHALTER
    </span>
  )
}
