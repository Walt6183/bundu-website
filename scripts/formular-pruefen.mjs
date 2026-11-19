// Läuft vor `next build` (npm-Hook «prebuild»), nach scripts/preise-holen.mjs.
// Ist FORMULAR_AKTIV=1 und ist DATENSCHUTZ_HINWEIS.du oder .sie in content/konfig.ts leer, bricht der Bau ab (Nachtrag Phase 3 v5, Auftrag 12).
// Ohne Datenschutzhinweis darf kein Formular senden. Gleiche Art wie der Abbruch bei Preisabweichung: Meldung nennt das leere Feld.
// Der Schalter aus (Standard) ist immer erlaubt, auch mit leeren Feldern.
import fs from 'node:fs'

const abbruch = (m) => { console.error('FORMULAR: ABBRUCH. ' + m); process.exit(1) }

if (process.env.FORMULAR_AKTIV !== '1') {
  console.log('FORMULAR: Schalter aus (FORMULAR_AKTIV nicht 1), keine Prüfung des Datenschutzhinweises nötig.')
  process.exit(0)
}

const konfig = fs.readFileSync('content/konfig.ts', 'utf8')
const block = konfig.match(/export const DATENSCHUTZ_HINWEIS[^=]*=\s*\{([\s\S]*?)\n\}/)
if (!block) abbruch('DATENSCHUTZ_HINWEIS nicht in content/konfig.ts gefunden.')
const feld = (name) => {
  const m = block[1].match(new RegExp(`\\b${name}\\s*:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)"|\`((?:[^\`\\\\]|\\\\.)*)\`)`))
  return m ? (m[1] ?? m[2] ?? m[3] ?? '') : ''
}
const leer = ['du', 'sie'].filter((n) => feld(n).trim() === '')
if (leer.length) {
  abbruch(
    `FORMULAR_AKTIV=1, aber DATENSCHUTZ_HINWEIS.${leer.join(' und DATENSCHUTZ_HINWEIS.')} in content/konfig.ts ist leer. ` +
      'Der Satz der Fachperson muss zuerst in content/konfig.ts stehen, sonst sammelt das Formular Daten ohne Datenschutzhinweis. ' +
      'Schalter aus lassen oder den Satz eintragen.',
  )
}
console.log('FORMULAR: Schalter an, DATENSCHUTZ_HINWEIS.du und .sie sind gefüllt.')
