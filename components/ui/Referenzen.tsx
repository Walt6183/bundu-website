'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { Referenz } from '@/lib/referenzen'

// Referenzen als Kästchen in einer seitlich scrollenden Reihe. Wischen, Pfeiltasten (Fokus auf der Reihe) oder die Knöpfe.
// Kein Autoplay. Zitat und Herkunft ohne T: Der Wortlaut aus content/referenzen.json bleibt zeichengleich im DOM.
// Die Knöpfe belegen ihren Platz schon im Server-HTML (unsichtbar), damit beim Laden nichts springt.
// Genau zwei Kästchen passen ab 768 px ganz nebeneinander, dann entfallen die Knöpfe dort.
const UEBERSCHRIFT = 'Rückmeldungen'
const KNOPF =
  'flex size-12 items-center justify-center rounded-full bg-white text-navy shadow-[inset_0_0_0_2px_currentColor] transition-colors duration-150 hover:bg-navy hover:text-white active:bg-navy active:text-white disabled:bg-transparent disabled:text-navy disabled:opacity-30'

function Pfeil({ rechts = false }: { rechts?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={rechts ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'} />
    </svg>
  )
}

function Kaestchen({ r, hell }: { r: Referenz; hell: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col gap-3 rounded-lg border-t-4 border-teal p-5 lg:p-8 ${hell ? 'bg-white' : 'bg-grey-light'}`}
    >
      {r.kontext ? <p className="text-base">{r.kontext}</p> : null}
      <blockquote>
        <p className="text-[1.0625rem] leading-relaxed text-navy lg:text-lg lg:leading-relaxed">{r.zitat}</p>
      </blockquote>
      <figcaption className="pt-2 font-heading text-base font-semibold text-navy">{r.herkunft}</figcaption>
    </figure>
  )
}

export default function Referenzen({ eintraege, hell }: { eintraege: Referenz[]; hell: boolean }) {
  const id = useId()
  const reihe = useRef<HTMLDivElement>(null)
  const zurueck = useRef<HTMLButtonElement>(null)
  const weiter = useRef<HTMLButtonElement>(null)
  // Ein Knopf, der am Ende gesperrt wird, verliert den Fokus. Dann übernimmt der andere Knopf.
  const fokusFolgt = useRef(false)
  const [stand, setStand] = useState({ laeuftUeber: false, anfang: true, ende: false })

  const messen = useCallback(() => {
    const el = reihe.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const neu = { laeuftUeber: max > 2, anfang: el.scrollLeft <= 2, ende: el.scrollLeft >= max - 2 }
    setStand((alt) =>
      alt.laeuftUeber === neu.laeuftUeber && alt.anfang === neu.anfang && alt.ende === neu.ende ? alt : neu,
    )
  }, [])

  useEffect(() => {
    const el = reihe.current
    if (!el) return
    const beobachter = new ResizeObserver(messen)
    beobachter.observe(el)
    return () => beobachter.disconnect()
  }, [messen])

  useEffect(() => {
    if (!fokusFolgt.current) return
    if (stand.ende) zurueck.current?.focus({ preventScroll: true })
    else if (stand.anfang) weiter.current?.focus({ preventScroll: true })
    if (stand.ende || stand.anfang) fokusFolgt.current = false
  }, [stand])

  function blaettern(richtung: 1 | -1, knopf: HTMLButtonElement) {
    const el = reihe.current
    const [a, b] = Array.from(el?.querySelectorAll('li') ?? [])
    if (!el || !a || !b) return
    fokusFolgt.current = document.activeElement === knopf
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: richtung * (b.offsetLeft - a.offsetLeft), behavior: ruhig ? 'auto' : 'smooth' })
  }

  if (!eintraege.length) return null
  const ueberschrift = (
    <h2 id={id + 'h'} className="text-[1.5rem] lg:text-[2rem]">
      {UEBERSCHRIFT}
    </h2>
  )

  if (eintraege.length === 1) {
    return (
      <div className="flex max-w-[800px] flex-col gap-4">
        {ueberschrift}
        <Kaestchen r={eintraege[0]} hell={hell} />
      </div>
    )
  }

  const zwei = eintraege.length === 2
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {ueberschrift}
        <div className={`flex gap-2 ${stand.laeuftUeber ? '' : 'invisible'} ${zwei ? 'md:hidden' : ''}`}>
          <button
            ref={zurueck}
            type="button"
            className={KNOPF}
            aria-label="Vorherige Rückmeldung"
            aria-controls={id + 'r'}
            disabled={stand.anfang}
            onClick={(e) => blaettern(-1, e.currentTarget)}
          >
            <Pfeil />
          </button>
          <button
            ref={weiter}
            type="button"
            className={KNOPF}
            aria-label="Nächste Rückmeldung"
            aria-controls={id + 'r'}
            disabled={stand.ende}
            onClick={(e) => blaettern(1, e.currentTarget)}
          >
            <Pfeil rechts />
          </button>
        </div>
      </div>
      {/* Auf dem Telefon läuft die Reihe bis an den Bildschirmrand, damit das nächste Kästchen angeschnitten sichtbar ist.
          Das after-Element hält am Ende der Reihe den Seitenrand frei (16 px Abstand + 8 px). */}
      <div
        ref={reihe}
        id={id + 'r'}
        role="region"
        aria-labelledby={id + 'h'}
        tabIndex={stand.laeuftUeber ? 0 : undefined}
        onScroll={messen}
        className="-mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-color:var(--color-navy)_transparent] [scrollbar-width:thin] focus-visible:-outline-offset-3 md:mx-0 md:scroll-px-0 md:px-0 md:focus-visible:outline-offset-2"
      >
        <ul className="flex gap-4 after:w-2 after:shrink-0 after:content-[''] md:gap-6 md:after:hidden">
          {eintraege.map((r) => (
            <li
              key={r.herkunft}
              className={`shrink-0 basis-[85%] snap-start ${zwei ? 'md:basis-[calc((100%-24px)/2)]' : 'md:basis-[46%]'}`}
            >
              <Kaestchen r={r} hell={hell} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
