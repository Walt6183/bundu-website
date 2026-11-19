import Link from 'next/link'
import { NAV, WORTMARKE } from '@/content/texte'

export type NavBereich = 'weiche' | 'eltern' | 'fachwelt' | 'fachpersonen' | 'institutionen'

// Je Bereich eine eigene Hauptnavigation. Die Wortmarke ist immer Link auf "/".
// Keine Links auf Angebote der anderen Seite: der Wechsel läuft nur über den Fuss.
// Auf dem Telefon laufen die Links in eine zweite Zeile um (kein Menüwort, kein seitliches Scrollen).
export default function Navigation({ bereich = 'weiche', aktuell }: { bereich?: NavBereich; aktuell?: string }) {
  const links = bereich === 'weiche' ? [] : NAV[bereich]
  return (
    <header className="bg-white">
      <div className="container-b flex flex-wrap items-center justify-between gap-x-6">
        <Link
          href="/"
          className="nowrap flex h-12 items-center rounded-sm font-heading text-xl font-bold text-navy no-underline hover:underline hover:decoration-2 hover:underline-offset-4 active:text-grey-deep lg:h-16"
        >
          {WORTMARKE}
        </Link>
        {links.length ? (
          <nav aria-label="Hauptnavigation">
            <ul className="flex flex-wrap items-center gap-x-5 lg:gap-x-8">
              {links.map(([text, href]) => {
                const istAktuell = aktuell === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={istAktuell ? 'page' : undefined}
                      className={`nowrap flex min-h-[44px] items-center rounded-sm font-heading text-navy underline-offset-4 hover:underline hover:decoration-2 active:text-grey-deep ${istAktuell ? 'font-bold underline decoration-2' : 'font-semibold no-underline'}`}
                    >
                      {text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
