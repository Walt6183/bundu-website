import { NextResponse, type NextRequest } from 'next/server'
import { DATENSCHUTZ_HINWEIS, FORMULAR_MINDESTZEIT_MS } from '@/content/konfig'
import { formularFuer, maxLaenge, type FormBereich } from '@/lib/formulare'

// Versand der drei Kontaktformulare über Microsoft Graph (Entscheid E-1). Nur fetch, keine neue Abhängigkeit.
// Es wird nichts gespeichert und kein Inhalt geloggt: das Log enthält nur Bereich, Status und Dauer.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BEREICHE: FormBereich[] = ['eltern', 'fachpersonen', 'institutionen']
const BETREFF: Record<FormBereich, string> = {
  eltern: 'Anfrage über bundu.ch (Eltern)',
  fachpersonen: 'Anfrage über bundu.ch (Fachpersonen)',
  institutionen: 'Anfrage über bundu.ch (Institutionen)',
}
const EMAIL = /^[^\s@<>",;:]+@[^\s@<>",;:]+\.[^\s@<>",;:]{2,}$/

// Anfragen je Adresse im Speicher: 5 je 10 Minuten.
const VERLAUF = new Map<string, number[]>()
function zuViele(ip: string): boolean {
  const jetzt = Date.now()
  const liste = (VERLAUF.get(ip) ?? []).filter((t) => jetzt - t < 600_000)
  if (liste.length >= 5) {
    VERLAUF.set(ip, liste)
    return true
  }
  liste.push(jetzt)
  VERLAUF.set(ip, liste)
  if (VERLAUF.size > 5000) VERLAUF.clear()
  return false
}

const einzeilig = (s: string) => s.replace(/[\r\n\u2028\u2029]+/g, ' ').trim()

// Test-Umleitung auf einen lokalen Nachbau von Graph. Wirkt nur mit KONTAKT_TESTMODUS=1 UND wenn beide Adressen auf localhost zeigen
// UND das Ziel kein @bundu.ch ist. In der Produktion ist KONTAKT_TESTMODUS nicht gesetzt.
function graphAdressen(ziel: string, tenant: string, absender: string) {
  const test = process.env.KONTAKT_TESTMODUS === '1'
  const t = process.env.GRAPH_TEST_TOKEN_URL
  const a = process.env.GRAPH_TEST_API_BASE
  const lokal = (u?: string) => !!u && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(u)
  if (test && lokal(t) && lokal(a) && !/@bundu\.ch$/i.test(ziel)) {
    return { token: t!, sendMail: `${a}/users/${encodeURIComponent(absender)}/sendMail` }
  }
  return {
    token: `https://login.microsoftonline.com/${encodeURIComponent(tenant)}/oauth2/v2.0/token`,
    sendMail: `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(absender)}/sendMail`,
  }
}

let tokenCache: { wert: string; bis: number } | null = null
async function holeToken(url: string, client: string, secret: string): Promise<string> {
  if (tokenCache && tokenCache.bis > Date.now() + 60_000) return tokenCache.wert
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: client,
      client_secret: secret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
    signal: AbortSignal.timeout(8000),
  })
  if (!r.ok) throw new Error('token ' + r.status)
  const j = (await r.json()) as { access_token: string; expires_in: number }
  tokenCache = { wert: j.access_token, bis: Date.now() + j.expires_in * 1000 }
  return j.access_token
}

const antwort = (status: number, code: string, bereich = '-', t0 = Date.now()) => {
  console.log(`kontakt bereich=${bereich} status=${status} code=${code} ms=${Date.now() - t0}`)
  return NextResponse.json({ ok: status === 200, code }, { status })
}

export async function POST(req: NextRequest) {
  const t0 = Date.now()
  // 1. Schalter (zur Laufzeit): aus heisst 404, die Route gibt es dann nicht.
  if (process.env.FORMULAR_AKTIV !== '1') return new NextResponse(null, { status: 404 })
  // 1b. Ohne Datenschutzhinweis (du oder sie leer, E-10) antwortet die Route 404, auch bei FORMULAR_AKTIV=1. Gilt für alle drei Bereiche gemeinsam.
  if (!DATENSCHUTZ_HINWEIS.du.trim() || !DATENSCHUTZ_HINWEIS.sie.trim()) return new NextResponse(null, { status: 404 })

  // 2. Herkunft
  const erlaubt = (process.env.ERLAUBTE_HERKUNFT || process.env.SITE_URL || '')
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean)
  const origin = req.headers.get('origin')?.replace(/\/$/, '')
  if (!origin || !erlaubt.includes(origin)) return antwort(403, 'herkunft', '-', t0)

  // Konfiguration vollständig?
  const tenant = process.env.MS_TENANT_ID
  const client = process.env.MS_CLIENT_ID
  const secret = process.env.MS_CLIENT_SECRET
  const absender = process.env.KONTAKT_ABSENDER
  const ziel = process.env.KONTAKT_ZIEL
  if (!tenant || !client || !secret || !absender || !ziel) return antwort(503, 'konfiguration', '-', t0)

  let body: { bereich?: string; felder?: Record<string, unknown>; dauer?: number }
  try {
    body = await req.json()
  } catch {
    return antwort(400, 'json', '-', t0)
  }
  const bereich = body.bereich as FormBereich
  if (!BEREICHE.includes(bereich) || !body.felder || typeof body.felder !== 'object') return antwort(400, 'bereich', '-', t0)

  // 3. Verstecktes Feld: sieht für Skripte wie Erfolg aus, es geht nichts raus.
  const koeder = body.felder['website']
  if (typeof koeder === 'string' && koeder !== '') return antwort(200, 'koeder', bereich, t0)

  // 4. Mindestzeit
  if (typeof body.dauer !== 'number' || !(body.dauer >= FORMULAR_MINDESTZEIT_MS)) return antwort(400, 'zu-schnell', bereich, t0)

  // 5. Felder: Pflicht, Länge, Auswahl nur aus der Liste
  const { felder } = formularFuer(bereich)
  const werte: { label: string; wert: string; name: string; typ: string }[] = []
  for (const f of felder) {
    const roh = body.felder[f.name]
    if (roh !== undefined && typeof roh !== 'string') return antwort(400, 'typ', bereich, t0)
    const wert = typeof roh === 'string' ? roh.trim() : ''
    if (f.pflicht && !wert) return antwort(400, 'pflicht:' + f.name, bereich, t0)
    if (wert.length > maxLaenge(f)) return antwort(400, 'laenge:' + f.name, bereich, t0)
    if (f.typ === 'auswahl' && wert && !(f.optionen ?? []).includes(wert)) return antwort(400, 'auswahl:' + f.name, bereich, t0)
    if (f.typ === 'email' && !EMAIL.test(wert)) return antwort(400, 'email', bereich, t0)
    werte.push({ label: f.label, wert, name: f.name, typ: f.typ })
  }

  // 6. Anfragen je Adresse begrenzen
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unbekannt'
  if (zuViele(ip)) return antwort(429, 'rate', bereich, t0)

  // Textmail ohne HTML. Keine Zeilenumbrüche in Name und Betreff, Reply-To ist die geprüfte Adresse der Person.
  const name = einzeilig(werte.find((w) => w.name === 'name')?.wert ?? '')
  const email = werte.find((w) => w.typ === 'email')?.wert ?? ''
  const inhalt = werte.map((w) => `${w.label}\n${w.wert || '-'}`).join('\n\n')
  const adr = graphAdressen(ziel, tenant, absender)
  try {
    const token = await holeToken(adr.token, client, secret)
    const r = await fetch(adr.sendMail, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          subject: BETREFF[bereich],
          body: { contentType: 'Text', content: inhalt },
          toRecipients: [{ emailAddress: { address: ziel } }],
          replyTo: [{ emailAddress: { address: email, name: name.slice(0, 100) } }],
        },
        saveToSentItems: false,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) {
      tokenCache = null
      return antwort(502, 'graph-' + r.status, bereich, t0)
    }
  } catch {
    tokenCache = null
    return antwort(502, 'versand', bereich, t0)
  }
  return antwort(200, 'gesendet', bereich, t0)
}
