'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import type { Feld, FormBereich } from '@/lib/formulare'

export type { Feld }

// Kontaktformular. Pflichtfelder prüft der Browser. Ist `aktiv` aus (FORMULAR_AKTIV beim Bau), gibt es keinen Aufruf und
// keine Meldung, wie in Phase 2. Ist es an, geht genau ein POST an /api/kontakt/ (nie direkt zu Microsoft), dann erscheint
// Bestätigung oder Fehlermeldung. Es wird nichts im Browser gespeichert.
export default function Formular({
  felder,
  hinweis,
  knopf,
  idPrefix,
  bereich,
  aktiv,
  bestaetigung,
  fehler,
}: {
  felder: Feld[]
  hinweis?: ReactNode
  knopf: ReactNode
  idPrefix: string
  bereich: FormBereich
  aktiv: boolean
  bestaetigung: string
  fehler: string
}) {
  const klasse =
    'w-full min-h-[44px] rounded-md border-2 border-navy bg-white px-3 py-2 text-base text-navy'
  const start = useRef(0)
  const [status, setStatus] = useState<'ruhe' | 'sendet' | 'ok' | 'fehler'>('ruhe')
  useEffect(() => {
    start.current = Date.now()
  }, [])

  async function senden(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!aktiv || status === 'sendet') return
    const form = e.currentTarget
    const daten = Object.fromEntries(new FormData(form).entries())
    setStatus('sendet')
    try {
      const r = await fetch('/api/kontakt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bereich, felder: daten, dauer: Date.now() - start.current }),
      })
      if (r.ok) {
        setStatus('ok')
        form.reset()
      } else setStatus('fehler')
    } catch {
      setStatus('fehler')
    }
  }

  return (
    <form className="flex w-full max-w-[800px] flex-col gap-4" onSubmit={senden}>
      {felder.map((f) => {
        const id = `${idPrefix}-${f.name}`
        return (
          <div key={id} className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold text-navy">
              {f.label}
            </label>
            {f.typ === 'nachricht' ? (
              <textarea id={id} name={f.name} required={f.pflicht} rows={6} maxLength={5000} className={klasse} />
            ) : f.typ === 'auswahl' ? (
              <select id={id} name={f.name} required={f.pflicht} defaultValue="" className={klasse}>
                <option value=""></option>
                {(f.optionen ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.typ}
                required={f.pflicht}
                maxLength={f.typ === 'email' ? 254 : f.typ === 'tel' ? 40 : f.name === 'einrichtung' ? 150 : 100}
                autoComplete={f.typ === 'email' ? 'email' : f.typ === 'tel' ? 'tel' : f.name === 'name' ? 'name' : 'off'}
                className={klasse}
              />
            )}
          </div>
        )
      })}
      {/* Köder gegen Skripte: für Menschen unsichtbar, nicht erreichbar, nicht beschriftet. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', height: 0, overflow: 'hidden' }}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      {hinweis}
      <div>{knopf}</div>
      <p role="status" aria-live="polite" className={status === 'ok' || status === 'fehler' ? 'font-semibold text-navy' : 'sr-only'}>
        {status === 'ok' ? bestaetigung : status === 'fehler' ? fehler : ''}
      </p>
    </form>
  )
}
