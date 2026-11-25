import type { Metadata } from 'next'
import daten from '@/content/seiten.json'
import type { Platzhalter, Teil } from '@/components/ui/Teile'

export type Kind = { wert: string; wert_teile: Teil[]; wert_ph: Platzhalter[]; kinder: Kind[] }
export type Knoten = {
  k: 'feld' | 'punkt' | 'gruppe' | 'schritt' | 'tabelle'
  label?: string
  wert?: string
  wert_teile?: Teil[]
  wert_ph?: Platzhalter[]
  text?: string
  text_teile?: Teil[]
  text_ph?: Platzhalter[]
  titel?: string
  name?: string
  bild?: 'kursbox' // nur Gruppe: Kursbox in der Karte
  kopf?: string[]
  zeilen?: string[][]
  kinder?: Kind[]
}
export type Abschnitt = { name: string; knoten: Knoten[] }
export type SeiteDaten = {
  titel: string
  quelle: string
  title: string
  description: string
  anrede: string
  abschnitte: Abschnitt[]
}
export type FussZeile = { teile: Teil[] }

export const SEITEN = daten.seiten as unknown as Record<string, SeiteDaten>
export const FUESSE = daten.fuesse as unknown as Record<string, FussZeile[]>
export const ROUTEN = Object.keys(SEITEN)

export function seite(route: string): SeiteDaten {
  const s = SEITEN[route]
  if (!s) throw new Error('Seite fehlt: ' + route)
  return s
}

export function meta(route: string): Metadata {
  const s = seite(route)
  return { title: { absolute: s.title }, description: s.description, alternates: { canonical: route } }
}

export function fussFuer(route: string): FussZeile[] {
  if (route.startsWith('/eltern/')) return FUESSE['Fuss des Bereichs Eltern']
  if (route.startsWith('/fachwelt/fachpersonen/')) return FUESSE['Fuss des Bereichs Fachpersonen (alle drei Seiten)']
  if (route.startsWith('/fachwelt/institutionen/')) return FUESSE['Fuss des Bereichs Institutionen (gilt für die Seiten 1 bis 6)']
  // Person: der Fuss steht im eigenen Abschnitt "Fuss" der Seite
  const f = seite(route).abschnitte.find((a) => a.name === 'Fuss')
  return (f?.knoten ?? []).map((n) => ({ teile: n.wert_teile ?? [] }))
}

export function bereichFuer(route: string): 'eltern' | 'fachpersonen' | 'institutionen' | 'weiche' {
  if (route.startsWith('/eltern/')) return 'eltern'
  if (route.startsWith('/fachwelt/fachpersonen/')) return 'fachpersonen'
  if (route.startsWith('/fachwelt/institutionen/')) return 'institutionen'
  return 'weiche'
}
