import type { Knoten } from '@/lib/seiten'
import { seite } from '@/lib/seiten'

export type Feld = {
  name: string
  label: string
  typ: 'text' | 'email' | 'tel' | 'auswahl' | 'nachricht'
  pflicht: boolean
  optionen?: string[]
}

export const KONTAKT_ROUTEN = {
  eltern: '/eltern/kontakt/',
  fachpersonen: '/fachwelt/fachpersonen/kontakt/',
  institutionen: '/fachwelt/institutionen/kontakt/',
} as const
export type FormBereich = keyof typeof KONTAKT_ROUTEN

// Längengrenzen je Feldtyp und Name (Konzept 3.3).
export function maxLaenge(f: Feld): number {
  if (f.typ === 'nachricht') return 5000
  if (f.typ === 'email') return 254
  if (f.typ === 'tel') return 40
  if (f.name === 'einrichtung') return 150
  return 100
}

const text = (n: Knoten) => ('wert' in n && n.wert) || ''

// Felder und Knopf eines Kontaktformulars aus den Seitendaten (content/seiten.json). Eine Quelle für Seite und Versandroute.
export function formularFelder(knoten: Knoten[]): { felder: Feld[]; knopf: string; hinweisKnoten?: Knoten } {
  const felder: Feld[] = []
  let knopf = ''
  let hinweisN: Knoten | undefined
  const typ = (label: string): Feld['typ'] =>
    /E-Mail/.test(label) ? 'email' : /Telefon/.test(label) ? 'tel' : /Nachricht/.test(label) ? 'nachricht' : 'text'
  const neu = (label: string, optionen?: string[]) => {
    const sauber = label.replace(/\s*\(freiwillig\)/, (m) => m)
    const nameKey = label.replace(/[^A-Za-zÄÖÜäöü]/g, '').toLowerCase()
    felder.push({
      name: nameKey || 'feld' + felder.length,
      label: sauber,
      typ: optionen ? 'auswahl' : typ(label),
      pflicht: !/freiwillig/.test(label),
      optionen,
    })
  }
  const auswahlOptionen = (n: Knoten) => text(n).split(' · ')
  const auswahlNodes = knoten.filter((n) => n.k === 'feld' && /^Auswahl/.test(n.label ?? ''))
  for (const n of knoten) {
    if (n.k !== 'feld') continue
    const l = n.label ?? ''
    if (l === 'Formularfelder') {
      for (const k of n.kinder ?? []) {
        const m = k.wert.match(/^(.*?) Auswahl: (.*)$/)
        if (m) neu(m[1], m[2].split(' · '))
        else neu(k.wert)
      }
    } else if (l === 'Feld') {
      neu(text(n))
    } else if (l === 'Felder') {
      for (const f of text(n).split(' · ')) {
        const opt = auswahlNodes.find((a) => /Anliegen/.test(a.label ?? ''))
        if (f === 'Anliegen' && opt) neu(f, auswahlOptionen(opt))
        else neu(f)
      }
    } else if (/^Auswahl "/.test(l)) {
      const name = l.replace(/^Auswahl "/, '').replace(/"$/, '')
      neu(name, auswahlOptionen(n))
    } else if (l === 'Knopf' || l === 'Button') {
      knopf = text(n)
    } else if (/Datenschutz|Formular/.test(l) && /^Hinweis/.test(l)) {
      hinweisN = n
    }
  }
  return { felder, knopf, hinweisKnoten: hinweisN }
}

export function formularFuer(bereich: FormBereich) {
  const s = seite(KONTAKT_ROUTEN[bereich])
  return formularFelder(s.abschnitte.flatMap((a) => a.knoten))
}
