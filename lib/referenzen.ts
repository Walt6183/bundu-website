import daten from '@/content/referenzen.json'

// Referenzen je Seite (Wortlaut mit Einwilligung, nicht verändern). Schlüssel = Route.
export type Referenz = { kontext?: string; zitat: string; herkunft: string }

export function referenzenFuer(route: string): Referenz[] {
  return (daten as Record<string, Referenz[]>)[route] ?? []
}

// Startseite: alle Einträge in gemischten Dreiergruppen. Nur die Folge steht hier, die Texte bleiben in der JSON.
// Gesucht wird über den Anfang der Herkunft. Fehlt ein Eintrag oder ist er mehrdeutig, bricht der Bau ab.
const FOLGE_START = [
  ['S. B.', 'S. M.', 'Philipp Zimmermann'],
  ['A. G.', 'K. H.', 'P. B.'],
  ['Familie M.', 'B. E.', 'X. N.'],
].flat()

export function referenzenStart(): Referenz[] {
  const alle = Object.values(daten as Record<string, Referenz[]>).flat()
  if (alle.length !== FOLGE_START.length) throw new Error('Referenzen: Anzahl passt nicht zur Folge der Startseite.')
  return FOLGE_START.map((anfang) => {
    const treffer = alle.filter((r) => r.herkunft.startsWith(anfang))
    if (treffer.length !== 1) throw new Error('Referenz nicht eindeutig: ' + anfang)
    return treffer[0]
  })
}
