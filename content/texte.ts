// Gesamter Seitentext der Weiche, der Fachwelt-Zwischenseite und von Online-Coaching, wortgleich aus texte-test-v9.md (Seite 1 bis 3).
// Die übrigen Seiten stehen in content/seiten.json (erzeugt aus den freigegebenen Textdateien, tools/parse_texte.py).
// Nirgends sonst steht Text. Ausser dem Satz der Stub-Seiten.

export const FOTO = {
  business: {
    src: '/images/portrait-business-01.webp',
    width: 1086,
    height: 1448,
    alt: 'Walter Uehli, Porträt vor weissem Hintergrund',
  },
  arbeitsplatz: {
    src: '/images/portrait-arbeitsplatz-02.webp',
    width: 1448,
    height: 1086,
    alt: 'Walter Uehli am Schreibtisch mit Headset, vor ihm Bildschirm und Maus',
  },
} as const

// Zeile unter dem Foto (zwei Zeilen: Name fett, Funktion darunter). Der Text der Datei
// "Walter Uehli, Inhaber von ..." steht hier in zwei Teilen, das Komma trennt die Zeilen.
export const PERSONENZEILE = {
  name: 'Walter Uehli',
  funktion: 'Inhaber von B&U BundU®, Sozialpädagoge und Coach für Neue Autorität',
} as const

export const LOGO = {
  src: '/images/logo.webp',
  width: 1254,
  height: 1254,
  alt: 'BundU praxiserfahrene Beratung und Unterstützung',
} as const

export const WORTMARKE = 'B&U BundU®'

export const LINKS = {
  eltern: '/eltern/',
  fachwelt: '/fachwelt/',
  fachpersonen: '/fachwelt/fachpersonen/',
  institutionen: '/fachwelt/institutionen/',
  onlineCoaching: '/fachwelt/fachpersonen/online-coaching/',
  person: '/walter-uehli/',
  impressum: '/impressum/',
  datenschutz: '/datenschutz/',
} as const

export const STUB = {
  title: 'B&U BundU®',
  satz: 'Diese Seite folgt.',
} as const

export const SEITE1 = {
  title: 'B&U BundU® | Coaching und Beratung mit Walter Uehli',
  description:
    'Online Eltern-Coaching für Eltern von Kindern zwischen 6 und 16. Coaching, Fortbildung und Begleitung beim Bündner Standard für die Fachwelt.',
  h1: 'Coaching und Beratung für Eltern, für Fachpersonen und für Einrichtungen, die mit Kindern und Jugendlichen arbeiten.',
  tuer1: {
    schild: 'Ich bin Elternteil',
    angebot: 'Online Eltern-Coaching',
    satz: 'Für Eltern von Kindern zwischen 6 und 16, wenn es zu Hause nicht mehr weitergeht.',
    cta: 'Zum Bereich Eltern',
  },
  tuer2: {
    schild: 'Ich bin Fachperson oder leite eine Einrichtung',
    angebote:
      'Online-Coaching, Inhouse-Fortbildung, STARK im Team, Begleitung beim Bündner Standard, Fachinput',
    satz: 'Für Fachpersonen und für die Leitung von Schulen, Heimen und Einrichtungen.',
    cta: 'Zur Fachwelt',
  },
  achse: {
    satz: 'Walter Uehli: über 30 Jahre Sozialpädagogik, davon mehr als 15 Jahre in Leitungsfunktionen.',
    link: 'Mehr über Walter Uehli',
  },
  fuss: {
    marke: 'B&U BundU®',
    zeile: ['Walter Uehli', 'Impressum', 'Datenschutz'],
    copyright: '© 2026 B&U BundU®',
  },
} as const

export const SEITE2 = {
  title: 'Für Fachpersonen und Einrichtungen | B&U BundU®',
  description:
    'Online-Coaching für Fachpersonen. Inhouse-Fortbildung, STARK im Team, Begleitung beim Bündner Standard und Fachinput für die Leitung von Schulen und Heimen.',
  h1: 'Für Fachpersonen und für Einrichtungen',
  unterzeile:
    'Zwei Wege, je nachdem, wer bucht: die Fachperson für sich selbst oder die Leitung für ihr Team und ihre Einrichtung.',
  tuerA: {
    schild: 'Ich bin Fachperson',
    angebot: 'Online-Coaching',
    text: 'Du besprichst einen schwierigen Fall online mit Walter Uehli, 60 oder 90 Minuten, zu einer Zeit, die du wählst. Für Lehrpersonen, für Fachpersonen der Sozialpädagogik und Sozialarbeit und für Leitungspersonen, die für sich selbst buchen.',
    kleintext: 'Erstgespräch 30 Minuten, kostenlos.',
    cta: 'Zum Online-Coaching',
  },
  tuerB: {
    schild: 'Ich leite eine Einrichtung',
    punkte: [
      {
        name: 'Inhouse-Fortbildung',
        text: 'Ein halber oder ganzer Tag mit Ihrem Team, zu einem Thema aus Ihrem Weiterbildungsplan, vor Ort oder online.',
      },
      {
        name: 'STARK im Team',
        text: 'Ein Prozess mit Ihrem ganzen Team, von der Bedarfsanalyse bis zur Auswertung: vier bis sechs Termine, verteilt über ein bis sechs Monate je nach Auftrag.',
      },
      {
        name: 'Begleitung beim Bündner Standard',
        text: 'Begleitung der Einführung in Ihrer Einrichtung durch einen akkreditierten Berater Bündner Standard.',
      },
      {
        name: 'Fachinput',
        text: 'Ein Input von 45, 60 oder 90 Minuten für Ihre Teamsitzung, Ihre Fachgruppe oder einen Anlass.',
      },
    ],
    cta: 'Zu den Angeboten für Einrichtungen',
  },
  person: {
    h2: 'Die Person',
    text: 'Walter Uehli war bis 31. Juli 2026 Gesamtleiter der Schule Friedheim, einer Einrichtung mit Platz für 32 Kinder und Jugendliche und rund 45 Mitarbeitenden. Er ist Coach für Neue Autorität (Weiterbildung von 115 Stunden am Systemischen Institut für Neue Autorität®, 2019) und akkreditierter Berater Bündner Standard.',
    link: 'Mehr über Walter Uehli',
  },
  fuss: {
    marke: 'B&U BundU®',
    eltern: { vor: 'Für Eltern: ', link: 'Zum Bereich Eltern' },
    zeile: ['Walter Uehli', 'Impressum', 'Datenschutz'],
    copyright: '© 2026 B&U BundU®',
  },
} as const

export const SEITE3 = {
  title: 'Online-Coaching für Fachpersonen | B&U BundU®',
  description:
    'Einen schwierigen Fall besprechen: online, 60 oder 90 Minuten, ab CHF 165. Mit Walter Uehli, über 30 Jahre Sozialpädagogik. Erstgespräch kostenlos.',
  kopf: {
    dachzeile: 'Online-Coaching für Fachpersonen',
    h1: 'Den schwierigen Fall nicht allein tragen.',
    unterzeile:
      'Du besprichst ihn online mit Walter Uehli, 60 oder 90 Minuten, zu einer Zeit, die du wählst. Dahinter stehen über 30 Jahre Sozialpädagogik, davon mehr als 15 Jahre in Leitungsfunktionen.',
    cta: 'Erstgespräch buchen',
    kleintext: '30 Minuten, kostenlos und unverbindlich.',
  },
  fuerWen: {
    h2: 'Für wen',
    text: 'Für Lehrpersonen und für Fachpersonen der Sozialpädagogik und Sozialarbeit. Und für dich, wenn du leitest und im eigenen Haus niemanden für diese Fragen hast.',
  },
  anlass: {
    h2: 'Womit du kommst',
    text: 'Mit einem Fall, der dich am Abend noch beschäftigt, und im Team ist keine Zeit, ihn zu besprechen. Mit einer Belastung, die im Alltag nicht kleiner wird. Oder mit einer Frage, die du lieber ausserhalb deines Hauses stellst.',
  },
  ablauf: {
    h2: 'So läuft es',
    schritte: [
      {
        titel: 'Erstgespräch.',
        text: '30 Minuten online, kostenlos und unverbindlich. Du schilderst kurz, worum es geht, und ihr klärt, ob das Online-Coaching passt.',
      },
      { titel: 'Termin.', text: 'Du wählst die Zeit und die Länge: 60 oder 90 Minuten.' },
      {
        titel: 'Sitzung.',
        text: 'Online über coachingspace.net, allein oder als Gruppe, die gemeinsam bucht. Du bringst den Fall mit, ihr geht ihn gemeinsam durch. Walter Uehli untersteht der Schweigepflicht nach dem Berufsstandard.',
      },
      {
        titel: 'Danach.',
        text: 'Du entscheidest, ob eine weitere Sitzung folgt. Planst du mehrere, gibt es das 5er-Paket.',
      },
    ],
    satz: 'Was du in der Sitzung erzählst, bleibt in der Sitzung.',
  },
  grenzen: {
    h2: 'Was das Online-Coaching nicht ist',
    punkte: [
      'Keine Therapie und keine Krisenintervention. In einer akuten Krise ist eine Fachstelle die richtige Adresse.',
      'Keine Beurteilung von Mitarbeitenden und keine Personalentscheide.',
      'Keine Fallführung und keine Gutachten. Der Fall bleibt bei dir.',
      'Keine Zusage, dass eine Stelle das Coaching als Pflichtnachweis anerkennt. Ob dein Arbeitgeber oder ein Verband es anerkennt, klärst du am besten vor der ersten Sitzung mit ihm.',
    ],
  },
  preise: {
    h2: 'Preise',
    kopf: ['Leistung', 'Dauer', 'Preis'],
    zeilen: [
      ['Erstgespräch', '30 Minuten', 'kostenlos'],
      ['Online-Coaching', '60 Minuten', 'CHF 165'],
      ['Online-Coaching', '90 Minuten', 'CHF 250'],
      ['5er-Paket', '5 × 90 Minuten', "CHF 1'150"],
      ['Team- oder Gruppen-Coaching', '90 Minuten, bis 10 Personen', 'CHF 320'],
      ['Team- oder Gruppen-Coaching', '90 Minuten, 11 bis 20 Personen, mit 40 Prozent Zuschlag', 'CHF 448'],
    ],
    text: 'Im 5er-Paket kostet eine Sitzung von 90 Minuten CHF 230. Es kommt keine Mehrwertsteuer dazu. Du zahlst selbst, oder dein Arbeitgeber übernimmt die Kosten. Ein Team oder eine Gruppe bis 10 Personen zahlt CHF 320 für 90 Minuten. Für 11 bis 20 Personen kommt ein Zuschlag von 40 Prozent dazu, das sind CHF 448. Mit mehr als 20 Personen ist kein Team-Coaching möglich.',
    cta: 'Erstgespräch buchen',
  },
  person: {
    h2: 'Mit wem du sprichst',
    text: 'Walter Uehli bringt über 30 Jahre Sozialpädagogik mit, davon mehr als 15 Jahre in Leitungsfunktionen. Bis 31. Juli 2026 war er Gesamtleiter der Schule Friedheim, einer Einrichtung mit Platz für 32 Kinder und Jugendliche und rund 45 Mitarbeitenden. Er ist Coach für Neue Autorität (Weiterbildung von 115 Stunden am Systemischen Institut für Neue Autorität®, 2019) und akkreditierter Berater Bündner Standard.',
    zweiter: 'Er kennt beide Seiten: die Arbeit in der Gruppe und die Verantwortung der Leitung.',
    link: 'Mehr über Walter Uehli',
  },
  aufruf: {
    h2: 'Ein Fall, der dich gerade beschäftigt, reicht als Anlass.',
    text: 'Im Erstgespräch schilderst du ihn in 30 Minuten. Danach entscheidest du, ob eine Sitzung folgt. Das Erstgespräch kostet nichts.',
    cta: 'Erstgespräch buchen',
  },
  fuss: {
    marke: 'B&U BundU®',
    team: {
      vor: 'Du suchst eine Fortbildung für dein ganzes Team? Die bucht die Leitung: ',
      link: 'Zu den Angeboten für Einrichtungen',
    },
    zeile: ['Walter Uehli', 'Impressum', 'Datenschutz'],
    copyright: '© 2026 B&U BundU®',
  },
} as const

// Vorschläge, die in keiner Textdatei stehen (Konzept Phase 2, Nachtrag: entschieden am 2026-11-15).
export const NOT_FOUND = {
  satz: 'Diese Seite gibt es nicht.',
  link: 'Zur Startseite',
} as const

export const NAV = {
  eltern: [
    ['Übersicht', '/eltern/'],
    ['Online Eltern-Coaching', '/eltern/coaching/'],
    ['Online-Kurse', '/eltern/kurse/'],
    ['Kontakt', '/eltern/kontakt/'],
  ],
  fachwelt: [
    ['Fachpersonen', '/fachwelt/fachpersonen/'],
    ['Institutionen', '/fachwelt/institutionen/'],
  ],
  fachpersonen: [
    ['Übersicht', '/fachwelt/fachpersonen/'],
    ['Online-Coaching', '/fachwelt/fachpersonen/online-coaching/'],
    ['Webinare und Workshops', '/fachwelt/fachpersonen/webinare-workshops/'],
    ['Kontakt', '/fachwelt/fachpersonen/kontakt/'],
  ],
  // Wortlaut aus texte-institutionen-person-v1.md, Abschnitt "Navigation des Bereichs"
  institutionen: [
    ['Übersicht', '/fachwelt/institutionen/'],
    ['Inhouse-Fortbildung', '/fachwelt/institutionen/inhouse-fortbildung/'],
    ['Fachinput', '/fachwelt/institutionen/fachinput/'],
    ['STARK im Team', '/fachwelt/institutionen/stark-im-team/'],
    ['Bündner Standard', '/fachwelt/institutionen/buendner-standard/'],
    ['Kontakt', '/fachwelt/institutionen/kontakt/'],
  ],
} as const
export type Bereich = keyof typeof NAV
