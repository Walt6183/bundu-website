import type { Referenz } from '@/lib/referenzen'

// Gemeinsame Teile von Referenzen.tsx (Angebotsseiten, ohne Automatik) und ReferenzenWechsel.tsx (Startseite).
export const UEBERSCHRIFT = 'Rückmeldungen'
export const KNOPF =
  'flex size-12 items-center justify-center rounded-full bg-white text-navy shadow-[inset_0_0_0_2px_currentColor] transition-colors duration-150 hover:bg-navy hover:text-white active:bg-navy active:text-white disabled:bg-transparent disabled:text-navy disabled:opacity-30'
// Waagrecht scrollende Reihe. Auf dem Telefon bis an den Bildschirmrand, ab 768 px in der Spalte.
export const REIHE =
  '-mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-color:var(--color-navy)_transparent] [scrollbar-width:thin] focus-visible:-outline-offset-3 md:mx-0 md:scroll-px-0 md:px-0 md:focus-visible:outline-offset-2'

export function Pfeil({ rechts = false }: { rechts?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={rechts ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'} />
    </svg>
  )
}

export function Kaestchen({ r, hell, schmal = false }: { r: Referenz; hell: boolean; schmal?: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col gap-3 rounded-lg border-t-4 border-teal p-5 ${schmal ? 'lg:p-6' : 'lg:p-8'} ${hell ? 'bg-white' : 'bg-grey-light'}`}
    >
      {r.kontext ? <p className="text-base">{r.kontext}</p> : null}
      <blockquote>
        <p className="text-[1.0625rem] leading-relaxed text-navy lg:text-lg lg:leading-relaxed">{r.zitat}</p>
      </blockquote>
      <figcaption className="pt-2 font-heading text-base font-semibold text-navy">{r.herkunft}</figcaption>
    </figure>
  )
}
