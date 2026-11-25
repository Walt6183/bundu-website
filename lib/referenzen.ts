import daten from '@/content/referenzen.json'

// Referenzen je Seite (Wortlaut mit Einwilligung, nicht verändern). Schlüssel = Route.
export type Referenz = { kontext?: string; zitat: string; herkunft: string }

export function referenzenFuer(route: string): Referenz[] {
  return (daten as Record<string, Referenz[]>)[route] ?? []
}
