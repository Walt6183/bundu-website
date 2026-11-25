'use client'

import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import { KNOPF, Kaestchen, Pfeil, REIHE, UEBERSCHRIFT } from '@/components/ui/ReferenzTeile'
import type { Referenz } from '@/lib/referenzen'

// Referenzen der Startseite. Ab 1024 px drei Kästchen nebeneinander, gruppenweise, darunter wischbar mit Anschnitt.
// Wechselt alle 10 Sekunden zur nächsten Station, nach der letzten wieder zur ersten. Bewegt wird nur die Reihe, nie die Seite.
// Automatik hält bei Maus oder Fokus im Block, Berührung, unsichtbarem Abschnitt oder Tab. Nach Blättern von Hand bleibt sie aus.
// Der Anhalten-Knopf selbst hält nicht, sonst liefe nach «starten» nichts, solange der Zeiger darauf steht.
// prefers-reduced-motion: keine Automatik, kein Anhalten-Knopf (per CSS). Kein aria-live.
// Ohne JavaScript bleibt die Reihe von Hand scrollbar, alle Einträge stehen im HTML.
// Alle Kästchen liegen in einer Reihe und sind so hoch wie das höchste, deshalb ist die Höhe bei jeder Station gleich.
const TAKT = 10000

export default function ReferenzenWechsel({ eintraege, hell }: { eintraege: Referenz[]; hell: boolean }) {
  const id = useId()
  const block = useRef<HTMLDivElement>(null)
  const reihe = useRef<HTMLDivElement>(null)
  const schalter = useRef<HTMLButtonElement>(null)
  const uhr = useRef<ReturnType<typeof setTimeout>>(undefined)
  const halt = useRef({ maus: false, fokus: false, finger: false, unsichtbar: true })
  const eingabe = useRef(0) // Zeitpunkt der letzten Eingabe in der Reihe: Scrollt sie kurz danach, war es von Hand.
  const letztes = useRef({ station: 0, zeit: -Infinity })
  const [bereit, setBereit] = useState(false)
  const [laeuft, setLaeuft] = useState(true)

  // Stationen sind die Kästchen mit scroll-snap-align (CSS entscheidet: ab 1024 px jedes dritte, darunter jedes).
  const gehe = useCallback((richtung: 1 | -1) => {
    const el = reihe.current
    if (!el) return
    const li = Array.from(el.querySelectorAll('li'))
    const max = el.scrollWidth - el.clientWidth
    const stationen = [
      ...new Set(
        li
          .filter((x) => getComputedStyle(x).scrollSnapAlign !== 'none')
          .map((x) => Math.min(x.offsetLeft - li[0].offsetLeft, max)),
      ),
    ]
    const abstand = stationen.map((s) => Math.abs(s - el.scrollLeft))
    // Läuft noch eine Bewegung (schnelle Klicks), zählt deren Ziel, sonst die nächstgelegene Station.
    const unterwegs = performance.now() - letztes.current.zeit < 600
    const jetzt = unterwegs ? letztes.current.station : abstand.indexOf(Math.min(...abstand))
    const naechste = (jetzt + richtung + stationen.length) % stationen.length
    const ziel = stationen[naechste]
    letztes.current = { station: naechste, zeit: performance.now() }
    eingabe.current = 0
    const umbruch = richtung === 1 ? jetzt === stationen.length - 1 : jetzt === 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.scrollTo({ left: ziel, behavior: 'instant' })
    } else if (umbruch) {
      // Vom Ende zum Anfang: kurz ausblenden statt die ganze Reihe zurückzuspulen.
      const aus = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' })
      aus.onfinish = () => {
        el.scrollTo({ left: ziel, behavior: 'instant' })
        aus.cancel()
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' })
      }
    } else {
      el.scrollTo({ left: ziel, behavior: 'smooth' })
    }
  }, [])

  // Uhr neu stellen. Nach jeder Pause beginnen die 10 Sekunden von vorn.
  const planen = useCallback(() => {
    clearTimeout(uhr.current)
    const h = halt.current
    if (!laeuft || h.maus || h.fokus || h.finger || h.unsichtbar || document.hidden) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const takt = () => {
      gehe(1)
      uhr.current = setTimeout(takt, TAKT)
    }
    uhr.current = setTimeout(takt, TAKT)
  }, [laeuft, gehe])

  useEffect(() => {
    const el = reihe.current
    if (!el) return
    const bewegung = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sicht = new IntersectionObserver(
      ([e]) => {
        halt.current.unsichtbar = !e.isIntersecting
        setBereit(true)
        planen()
      },
      { threshold: 0.3 },
    )
    sicht.observe(el)
    document.addEventListener('visibilitychange', planen)
    bewegung.addEventListener('change', planen)
    return () => {
      clearTimeout(uhr.current)
      sicht.disconnect()
      document.removeEventListener('visibilitychange', planen)
      bewegung.removeEventListener('change', planen)
    }
  }, [planen])

  function halten(was: 'maus' | 'fokus' | 'finger', an: boolean) {
    if (halt.current[was] === an) return
    halt.current[was] = an
    planen()
  }
  function zeiger(e: PointerEvent) {
    if (e.pointerType === 'mouse') halten('maus', !schalter.current?.contains(e.target as Node))
  }
  function fokusWeg(e: FocusEvent) {
    if (!block.current?.contains(e.relatedTarget)) halten('fokus', false)
  }
  function vonHand() {
    eingabe.current = performance.now()
  }
  function gescrollt() {
    if (eingabe.current && performance.now() - eingabe.current < 1000) setLaeuft(false)
  }
  function blaettern(richtung: 1 | -1) {
    setLaeuft(false)
    gehe(richtung)
  }

  return (
    <div
      ref={block}
      className="flex min-w-0 flex-col gap-4"
      onPointerOver={zeiger}
      onPointerLeave={() => halten('maus', false)}
      onFocus={(e) => halten('fokus', !schalter.current?.contains(e.target))}
      onBlur={fokusWeg}
      onTouchStart={() => halten('finger', true)}
      onTouchEnd={() => halten('finger', false)}
      onTouchCancel={() => halten('finger', false)}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 id={id + 'h'} className="text-[1.5rem] lg:text-[2rem]">
          {UEBERSCHRIFT}
        </h2>
        <div className={`flex gap-2 max-sm:w-full ${bereit ? '' : 'invisible'}`}>
          <button
            ref={schalter}
            type="button"
            className={`${KNOPF} motion-reduce:hidden`}
            aria-label={laeuft ? 'Automatischen Wechsel anhalten' : 'Automatischen Wechsel starten'}
            aria-controls={id + 'r'}
            onClick={() => setLaeuft(!laeuft)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d={laeuft ? 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' : 'M8 5l11 7-11 7z'} />
            </svg>
          </button>
          <button
            type="button"
            className={`${KNOPF} ml-auto`}
            aria-label="Vorherige Rückmeldungen"
            aria-controls={id + 'r'}
            onClick={() => blaettern(-1)}
          >
            <Pfeil />
          </button>
          <button
            type="button"
            className={KNOPF}
            aria-label="Nächste Rückmeldungen"
            aria-controls={id + 'r'}
            onClick={() => blaettern(1)}
          >
            <Pfeil rechts />
          </button>
        </div>
      </div>
      <div
        ref={reihe}
        id={id + 'r'}
        role="region"
        aria-labelledby={id + 'h'}
        tabIndex={0}
        className={REIHE}
        onScroll={gescrollt}
        onPointerDown={vonHand}
        onTouchMove={vonHand}
        onWheel={(e) => (e.deltaX || e.shiftKey) && vonHand()}
        onKeyDown={vonHand}
      >
        <ul className="flex gap-4 after:w-2 after:shrink-0 after:content-[''] md:gap-6 md:after:hidden">
          {eintraege.map((r, i) => (
            <li
              key={r.herkunft}
              className={`shrink-0 basis-[85%] snap-start md:basis-[46%] lg:basis-[calc((100%-48px)/3)] ${i % 3 ? 'lg:snap-align-none' : ''}`}
            >
              <Kaestchen r={r} hell={hell} schmal />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
