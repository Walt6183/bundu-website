// Läuft vor `next build` (npm-Hook «prebuild»). Zieht die Preise aus Sanity (Typ preisangebot) nach content/preise.json
// und prüft jeden CHF-Betrag im Seitentext gegen die Preise. Kein Schlüssel nötig: das Dataset wird öffentlich gelesen.
// Fällt Sanity aus oder fehlt ein Dokument, gilt die zuletzt gespeicherte Datei (nie eine leere Tabelle).
// Weicht ein Betrag im Text von den Preisen ab, bricht der Bau ab (Entscheid E-5).
// Test: SANITY_QUELLE_DATEI=<json> ersetzt die Abfrage durch eine Datei (Form: Liste der Dokumente).
import fs from 'node:fs'

const PROJEKT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f4vevv6s'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const DATEI = 'content/preise.json'
const ERWARTET = ['eltern-coaching', 'online-coaching-fachpersonen', 'inhouse-fortbildung', 'fachinput', 'stark-im-team', 'buendner-standard']
const BEREICH = ['eltern', 'fachpersonen', 'institutionen']
const ARTEN = ['betrag', 'kostenlos', 'anfrage']

const abbruch = (m) => { console.error('PREISE: ABBRUCH. ' + m); process.exit(1) }

let alt
try { alt = JSON.parse(fs.readFileSync(DATEI, 'utf8')) } catch { abbruch(DATEI + ' fehlt oder ist unlesbar.') }
for (const k of ERWARTET) if (!alt[k]?.zeilen?.length) abbruch('Rückfall-Datei hat keine Zeilen für ' + k)

function pruefeDok(d) {
  if (!ERWARTET.includes(d.schluessel)) abbruch('Unbekannter Schlüssel in Sanity: ' + d.schluessel)
  if (!BEREICH.includes(d.bereich)) abbruch(d.schluessel + ': Bereich ungültig')
  if (!Array.isArray(d.zeilen) || !d.zeilen.length) abbruch(d.schluessel + ': keine Zeilen')
  for (const z of d.zeilen) {
    if (!z.leistung || !z.umfang || !ARTEN.includes(z.preisart)) abbruch(d.schluessel + ': Zeile unvollständig')
    if (z.preisart === 'betrag' && !(Number.isInteger(z.betrag) && z.betrag > 0)) abbruch(d.schluessel + ': Betrag keine ganze Zahl')
  }
}

let docs = null, quelle = ''
try {
  if (process.env.SANITY_QUELLE_DATEI) {
    docs = JSON.parse(fs.readFileSync(process.env.SANITY_QUELLE_DATEI, 'utf8')); quelle = 'Testdatei'
  } else {
    const q = encodeURIComponent('*[_type=="preisangebot"]{schluessel,titel,bereich,zeilen[]{leistung,umfang,preisart,betrag}}')
    const r = await fetch(`https://${PROJEKT}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}`, { signal: AbortSignal.timeout(8000) })
    if (!r.ok) throw new Error('HTTP ' + r.status)
    docs = (await r.json()).result; quelle = 'Sanity'
  }
} catch (e) {
  console.warn('PREISE: Sanity nicht erreichbar (' + e.message + '). Es gelten die gespeicherten Preise.')
}

const neu = { ...alt }
if (Array.isArray(docs) && docs.length) {
  for (const d of docs) { pruefeDok(d); neu[d.schluessel] = { titel: d.titel || alt[d.schluessel].titel, bereich: d.bereich, zeilen: d.zeilen.map((z) => ({ leistung: z.leistung, umfang: z.umfang, preisart: z.preisart, ...(z.preisart === 'betrag' ? { betrag: z.betrag } : {}) })) } }
  const fehlt = ERWARTET.filter((k) => !docs.some((d) => d.schluessel === k))
  console.log(`PREISE: ${quelle}, ${docs.length} Dokumente übernommen` + (fehlt.length ? `, aus der Datei: ${fehlt.join(', ')}` : '.'))
} else if (docs) {
  console.log(`PREISE: ${quelle} hat noch kein Dokument vom Typ preisangebot. Es gelten die gespeicherten Preise.`)
}

// --- Betragsprüfung: Fliesstext, Meta-Beschreibungen, Kartenzeilen gegen die Preise desselben Bereichs ---
const erlaubt = { eltern: new Set(), fachpersonen: new Set(), institutionen: new Set() }
for (const t of Object.values(neu)) for (const z of t.zeilen) if (z.preisart === 'betrag') {
  erlaubt[t.bereich].add(z.betrag)
  const m = z.leistung.match(/^(\d+)er-Paket/); if (m) erlaubt[t.bereich].add(z.betrag / Number(m[1])) // Preis je Sitzung im Paket
}
const bereichVon = (r) => r.startsWith('/eltern/') ? 'eltern' : r.startsWith('/fachwelt/fachpersonen/') ? 'fachpersonen' : 'institutionen'
const betraege = (s) => [...s.matchAll(/CHF\s+(\d{1,3}(?:'\d{3})*|\d+)/g)].map((m) => ({ roh: m[0], wert: Number(m[1].replace(/'/g, '')) }))
const fehler = []; let geprueft = 0
const seiten = JSON.parse(fs.readFileSync('content/seiten.json', 'utf8')).seiten
const SKIP = new Set(['wert_teile', 'text_teile', 'wert_ph', 'text_ph', 'kopf', 'zeilen'])
function lauf(o, route, ort) {
  if (typeof o === 'string') { for (const b of betraege(o)) { geprueft++; if (!erlaubt[bereichVon(route)].has(b.wert)) fehler.push(`${route} (${ort}): ${b.roh} im Satz «${o.slice(0, 80)}…»`) } return }
  if (Array.isArray(o)) o.forEach((v) => lauf(v, route, ort))
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) if (!SKIP.has(k)) lauf(v, route, ort)
}
for (const [route, s] of Object.entries(seiten)) {
  lauf(s.description, route, 'Meta-Beschreibung'); lauf(s.abschnitte, route, 'Text')
}
// content/texte.ts: Zeilen, die zu einer Tabellenzeile gehören ( ['…', '…', 'CHF …'] ), werden aus preise.json gerendert und nicht geprüft.
fs.readFileSync('content/texte.ts', 'utf8').split('\n').forEach((l, i) => {
  if (/^\s*\['.*'\],?$/.test(l)) return
  for (const b of betraege(l)) { geprueft++; if (!erlaubt.fachpersonen.has(b.wert) && !erlaubt.institutionen.has(b.wert) && !erlaubt.eltern.has(b.wert)) fehler.push(`content/texte.ts Zeile ${i + 1}: ${b.roh}`) }
})
if (fehler.length) abbruch(`${fehler.length} Betrag/Beträge im Text weichen von den Preisen ab:\n  - ` + fehler.join('\n  - '))
console.log(`PREISE: ${geprueft} CHF-Stellen im Text geprüft, 0 Abweichungen.`)
// Erst nach bestandener Prüfung wird die Rückfall-Datei überschrieben (ein Abbruch lässt sie unverändert).
const text = JSON.stringify(neu, null, 2) + '\n'
if (text !== fs.readFileSync(DATEI, 'utf8')) { fs.writeFileSync(DATEI, text); console.log('PREISE: ' + DATEI + ' aktualisiert.') }
