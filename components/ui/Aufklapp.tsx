'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Aufklappblock für das Telefon (bis 767 px). Ab 768 px steht der Inhalt offen, der Schalter ist verborgen.
// Der Inhalt liegt immer im DOM, auch zugeklappt (textContent bleibt vollständig).
// Ohne JavaScript ist der Block offen (Nachtrag zum Konzept Phase 2, Ergänzung 1): `open` steht im Server-HTML,
// erst die Hydration klappt ihn auf dem Telefon zu.
// Beschriftung des Schalters: nicht in der Textdatei, Vorschlag "Mehr anzeigen" (Freigabe offen).
export default function Aufklapp({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => {
      if (ref.current) ref.current.open = mq.matches
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return (
    <details ref={ref} className="aufklapp" open>
      <summary>{label}</summary>
      <div className="flex flex-col gap-2 pt-2 md:gap-3 md:pt-0">{children}</div>
    </details>
  )
}
