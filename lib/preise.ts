import daten from '@/content/preise.json'

// Preise der Angebotsseiten. Wahrheit ist Sanity (Typ `preisangebot`). `scripts/preise-holen.mjs` schreibt sie beim Bau
// nach content/preise.json. Die Seiten lesen nur diese Datei, es gibt keinen Sanity-Aufruf zur Laufzeit.
export type PreisZeile = { leistung: string; umfang: string; preisart: 'betrag' | 'kostenlos' | 'anfrage'; betrag?: number }
export type PreisTabelle = { titel: string; bereich: string; zeilen: PreisZeile[] }
const PREISE = daten as unknown as Record<string, PreisTabelle>

export const TABELLE_VON_ROUTE: Record<string, string> = {
  '/eltern/coaching/': 'eltern-coaching',
  '/fachwelt/fachpersonen/online-coaching/': 'online-coaching-fachpersonen',
  '/fachwelt/institutionen/inhouse-fortbildung/': 'inhouse-fortbildung',
  '/fachwelt/institutionen/fachinput/': 'fachinput',
  '/fachwelt/institutionen/stark-im-team/': 'stark-im-team',
  '/fachwelt/institutionen/buendner-standard/': 'buendner-standard',
}

// «CHF 1'150»: Hochkomma als Tausendertrenner wie in den Quellen.
export function preisText(z: PreisZeile): string {
  if (z.preisart === 'kostenlos') return 'kostenlos'
  if (z.preisart === 'anfrage') return 'auf Anfrage'
  return 'CHF ' + String(z.betrag).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

export function preiszeilen(schluessel: string): string[][] {
  const t = PREISE[schluessel]
  if (!t || !t.zeilen.length) throw new Error('Preistabelle fehlt oder leer: ' + schluessel)
  return t.zeilen.map((z) => [z.leistung, z.umfang, preisText(z)])
}
