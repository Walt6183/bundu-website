// Konfiguration, die nie im Seitentext steht: Buchungsadressen (Microsoft Bookings) und Widget-Kennung.
// Adressen unverändert, auch der Anhang ?ismsaljsauthenabled (Nachtrag Phase 3, F-2).
export const BUCHUNG = {
  // 15 Minuten
  eltern:
    'https://bookings.cloud.microsoft/book/BUBundUBeratung@WalterUehli.onmicrosoft.com/s/LN1efq6rE0OlI5Zg9w3HKQ2?ismsaljsauthenabled',
  // 30 Minuten
  fachpersonen:
    'https://bookings.cloud.microsoft/book/BUBundUBeratung@WalterUehli.onmicrosoft.com/s/URyJuZYQd0KiOBsQnDj3QQ2?ismsaljsauthenabled',
  // 30 Minuten
  institutionen:
    'https://bookings.cloud.microsoft/book/BUBundUBeratung@WalterUehli.onmicrosoft.com/s/R2wsWtfD0kmWiB1cE64RrA2?ismsaljsauthenabled',
} as const

export type BuchungBereich = keyof typeof BUCHUNG

// Bereich einer Adresse des Baums. Die Start- und Weichenseiten (/, /fachwelt/) haben keinen Buchungsknopf.
export function buchungFuer(route: string): string {
  if (route.startsWith('/eltern/')) return BUCHUNG.eltern
  if (route.startsWith('/fachwelt/fachpersonen/')) return BUCHUNG.fachpersonen
  if (route.startsWith('/fachwelt/institutionen/')) return BUCHUNG.institutionen
  return '#'
}

// PrivacyBee (Impressum, Datenschutz, Cookie-Banner): Kennung steht hier, nicht in den Seitenmodulen (Nachtrag Phase 3).
export const PRIVACYBEE = {
  websiteId: 'cm5cc17et0029m2ibxw5ya0f7',
  sprache: 'de',
  bannerSkript: 'https://app.privacybee.io/cookie-banner.js',
  datenschutzSkript: 'https://app.privacybee.io/widget.js',
} as const

// Formular: Antworttexte nach Entscheid E-8 (Eltern und Fachpersonen Du, Institutionen Sie). Fachpersonen wortgleich aus texte-fachpersonen-v1.md.
export const FORMULAR_TEXTE = {
  eltern: {
    bestaetigung: 'Danke für deine Nachricht. Walter Uehli meldet sich werktags innert 24 Stunden bei dir.',
    fehler: 'Die Nachricht ist nicht angekommen. Versuch es noch einmal oder schreib direkt an info@bundu.ch.',
  },
  fachpersonen: {
    bestaetigung: 'Danke für deine Nachricht. Walter Uehli meldet sich werktags innert 24 Stunden bei dir.',
    fehler: 'Die Nachricht ist nicht angekommen. Versuch es noch einmal oder schreib direkt an info@bundu.ch.',
  },
  institutionen: {
    bestaetigung: 'Danke für Ihre Nachricht. Walter Uehli meldet sich werktags innert 24 Stunden bei Ihnen.',
    fehler: 'Die Nachricht ist nicht angekommen. Versuchen Sie es noch einmal oder schreiben Sie direkt an info@bundu.ch.',
  },
} as const

// Mindestzeit zwischen Seitenaufbau und Absenden (Millisekunden).
export const FORMULAR_MINDESTZEIT_MS = 3000

// Datenschutzhinweis unter den Kontaktformularen (Entscheid E-10, Nachtrag Phase 3 v4, Auftrag 9).
// Leer heisst: keine Fläche, kein Wort, kein Rahmen. Den Wortlaut liefert die Fachperson, wir erfinden keinen Satz.
// Gefüllt heisst: der Satz steht wortgleich unter dem Formular und führt auf /datenschutz/.
// Soll nur ein Teil des Satzes der Link sein, steht dieser Teil in doppelten eckigen Klammern: «… siehe [[Datenschutzerklärung]].»
// Die Klammern erscheinen nicht, kein Wort wird verändert. Ohne Klammern ist der ganze Satz der Link.
export const DATENSCHUTZ_HINWEIS: { du: string; sie: string } = {
  du: 'Datenschutzerklärung', // Eltern, Fachpersonen
  sie: 'Datenschutzerklärung', // Institutionen
}
