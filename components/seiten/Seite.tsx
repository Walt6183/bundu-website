import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/FussBereich'
import Navigation from '@/components/layout/Navigation'
import Aufklapp from '@/components/ui/Aufklapp'
import Buehne from '@/components/ui/Buehne'
import Foto from '@/components/ui/Foto'
import Formular from '@/components/ui/Formular'
import { formularFelder, type Feld, type FormBereich } from '@/lib/formulare'
import Knopf from '@/components/ui/Knopf'
import Personenzeile from '@/components/ui/Personenzeile'
import Preistabelle from '@/components/ui/Preistabelle'
import Referenzen from '@/components/ui/Referenzen'
import T from '@/components/ui/T'
import Teile, { Flaeche, type Platzhalter, type Teil } from '@/components/ui/Teile'
import { FOTO } from '@/content/texte'
import { AUFKLAPP_LABEL } from '@/components/ui/Tuer'
import { DATENSCHUTZ_HINWEIS, FORMULAR_TEXTE, buchungFuer } from '@/content/konfig'
import { TABELLE_VON_ROUTE, preiszeilen } from '@/lib/preise'
import { referenzenFuer } from '@/lib/referenzen'
import { bereichFuer, fussFuer, seite, type Abschnitt, type Kind, type Knoten } from '@/lib/seiten'

// Rendert eine Seite aus content/seiten.json (erzeugt aus den freigegebenen Textdateien).
// Vorlagen: Bereichsstart (Karten), Angebotsseite, Preistabelle, Statusseite, Kontaktseite,
// Personenseite, aufklappbare Blöcke auf dem Telefon (nur Bereich Institutionen, Seiten 12 bis 15).

// Beschriftung der Buchungsknöpfe, wortgleich zu den CTA in texte-fachpersonen-v1.md.
const BUCHUNGSKNOPF = 'Erstgespräch buchen'

const H2 = 'text-[1.5rem] lg:text-[2rem]'
const AUFKLAPP_NAMEN = /Themen|Ablauf|Grenzen/
const PREISE_NAME = /Preise/

type Ctx = { route: string }

function text(n: Knoten | Kind): string {
  return ('wert' in n && n.wert) || ''
}
function teile(n: Knoten): Teil[] {
  return n.wert_teile ?? []
}
function ph(n: Knoten): Platzhalter[] {
  return n.wert_ph ?? []
}
function leer(ts: Teil[]) {
  return ts.every((t) => t.t !== 'flaeche' && t.s.trim() === '')
}
// Ziel aus der Quelle: Seite des Baums oder externe Adresse (https).
// Buchungsknopf: kein Seitenziel in der Quelle, Text «Erstgespräch buchen»: Adresse des Bereichs aus content/konfig.ts.
const EXTERN = /^https:\/\//
function ctaZiel(n: Knoten): string {
  return ph(n).flatMap((p) => p.ziele ?? [])[0] ?? ''
}
function ctaHref(n: Knoten, route: string): string {
  const z = ctaZiel(n)
  if (z.startsWith('/') || EXTERN.test(z)) return z
  return /Erstgespräch\s+buchen/.test(ctaText(n)) ? buchungFuer(route) : '#'
}
function ctaText(n: Knoten): string {
  return teile(n)
    .filter((t) => t.t !== 'flaeche')
    .map((t) => t.s)
    .join('')
    .trim()
}
// Externe Ziele aus der Quelle öffnen im selben Fenster, der Buchungsweg aus content/konfig.ts weiter in einem neuen.
function CtaKnopf({ n, route, zweite }: { n: Knoten; route: string; zweite?: boolean }) {
  return (
    <Knopf href={ctaHref(n, route)} zweite={zweite} gleichesFenster={EXTERN.test(ctaZiel(n))}>
      {ctaText(n)}
    </Knopf>
  )
}
function istFoto(n: Knoten) {
  return n.k === 'feld' && (n.label === 'Foto' || n.label === 'alt')
}
function fotoVon(knoten: Knoten[]) {
  const f = knoten.find((n) => n.k === 'feld' && n.label === 'Foto')
  const a = knoten.find((n) => n.k === 'feld' && n.label === 'alt')
  if (!f) return null
  const datei = ph(f)[0]?.datei ?? ''
  const art = datei.includes('business') ? 'business' : datei.includes('kursbox') ? 'kursbox' : 'arbeitsplatz'
  return { foto: { ...FOTO[art], alt: a ? text(a) : FOTO[art].alt }, art }
}

function Liste({ kinder }: { kinder: Kind[] }) {
  const sichtbar = kinder.filter((k) => !leer(k.wert_teile))
  if (!sichtbar.length) return null
  return (
    <ul className="flex max-w-[800px] list-disc flex-col gap-2 pl-6 marker:text-navy">
      {sichtbar.map((k, i) => (
        <li key={i}>
          <Teile teile={k.wert_teile} ph={k.wert_ph} />
          {k.kinder.length ? <Liste kinder={k.kinder} /> : null}
        </li>
      ))}
    </ul>
  )
}

// ---- Formular (Kontaktseiten) ----
const FORM_LABELS = /^(Formularfelder|Feld|Felder|Auswahl.*)$/
function formFelder(knoten: Knoten[], bereich: string): { felder: Feld[]; hinweis: ReactNode; knopf: string } {
  const { felder, knopf, hinweisKnoten: hinweisN } = formularFelder(knoten)
  // Datenschutzhinweis: In den Quellen steht noch ein Platzhalter (Wortlaut von der Fachperson, E-10). Die Fläche zeigt sich nur,
  // wenn der Satz in content/konfig.ts steht (DATENSCHUTZ_HINWEIS). Leer heisst: nichts im DOM, kein Wort, kein Rahmen.
  const satz = bereich === 'institutionen' ? DATENSCHUTZ_HINWEIS.sie : DATENSCHUTZ_HINWEIS.du
  const platzhalter = !!hinweisN && teile(hinweisN).some((t) => t.t === 'flaeche')
  let hinweis: ReactNode = null
  if (hinweisN && !platzhalter) {
    hinweis = (
      <div className="max-w-[800px]">
        <Teile teile={teile(hinweisN)} ph={ph(hinweisN)} />
      </div>
    )
  } else if (hinweisN && satz) {
    const m = satz.match(/^([\s\S]*?)\[\[(.+?)\]\]([\s\S]*)$/)
    hinweis = (
      <p className="max-w-[800px]">
        {m ? (
          <>
            {m[1]}
            <Link href="/datenschutz/" prefetch={false} className="textlink">
              {m[2]}
            </Link>
            {m[3]}
          </>
        ) : (
          <Link href="/datenschutz/" prefetch={false} className="textlink">
            {satz}
          </Link>
        )}
      </p>
    )
  }
  return { felder, hinweis, knopf }
}
// Auswahlfelder der Institutionen-Seite stehen als eigene Knoten, die nicht doppelt als Feld erscheinen.
const FORM_SKIP = /^(Bestätigung nach dem Senden|Fehlermeldung)$/

// ---- Karten (Bereichsstart) ----
// Mit Kursbox: Das Bild hat einen weissen Grund und steht als weisse, runde Fläche neben der Überschrift,
// ab 1024 px neben dem ganzen Text. Der Knopf bleibt am Boden, auf einer Linie mit der Nachbarkarte.
function Karte({
  knoten,
  name,
  kursbox,
  hell,
  route,
}: {
  knoten: Knoten[]
  name: string
  kursbox: boolean
  hell: boolean
  route: string
}) {
  const inhalt = knoten.map((n, i) => <KartenZeile key={i} n={n} route={route} />)
  const cta = knoten.findIndex((n) => n.label === 'CTA')
  const h3 = <h3 className="text-[1.25rem] lg:text-[1.375rem]">{name}</h3>
  return (
    <article className={`flex h-full flex-col gap-3 rounded-lg p-6 ${hell ? 'bg-white' : 'bg-grey-light'}`}>
      {kursbox ? (
        <>
          <div className="grid items-start gap-x-4 gap-y-3 min-[360px]:grid-cols-[1fr_104px] lg:grid-cols-[1fr_160px] lg:grid-rows-[auto_1fr]">
            {h3}
            <Foto
              foto={FOTO.kursbox}
              sizes="(min-width: 1024px) 160px, 104px"
              className="h-auto w-[104px] rounded-lg bg-white lg:row-span-2 lg:w-[160px]"
            />
            <div className="flex flex-col gap-3 min-[360px]:col-span-2 lg:col-span-1">{inhalt.slice(0, cta)}</div>
          </div>
          {inhalt.slice(cta)}
        </>
      ) : (
        <>
          {h3}
          {inhalt}
        </>
      )}
    </article>
  )
}

function KartenZeile({ n, route }: { n: Knoten; route: string }) {
  const l = n.label ?? ''
  if (l === 'CTA') {
    return (
      <p className="mt-auto pt-2">
        <CtaKnopf n={n} route={route} zweite />
      </p>
    )
  }
  if (l === 'Link') {
    return (
      <p className="mt-auto">
        <Teile teile={teile(n)} ph={ph(n)} />
      </p>
    )
  }
  if (l === 'Status') {
    return (
      <p className="font-heading font-semibold text-navy">
        <T>{text(n)}</T>
      </p>
    )
  }
  const stark = l === 'Preis' || l === 'Preiszeile'
  return (
    <p className={stark ? 'font-semibold text-navy' : ''}>
      <Teile teile={teile(n)} ph={ph(n)} />
    </p>
  )
}

const FORM_KNOTEN = (n: Knoten) => {
  const l = n.label ?? ''
  return (
    n.k === 'feld' &&
    (FORM_LABELS.test(l) || /^Knopf$|^Button$/.test(l) || (/^Hinweis/.test(l) && /Datenschutz|Formular/.test(l)) || FORM_SKIP.test(l))
  )
}

// Ein Abschnitt als Folge von Inhalten, Reihenfolge wie in der Textdatei.
// Schritte und Punkte werden zu je einer Liste, Gruppen zu Karten, Formularfelder zu einem Formular.
function Fluss({ a, ctx, hell }: { a: Abschnitt; ctx: Ctx; hell: boolean }) {
  const knoten = a.knoten.filter((n) => !istFoto(n))
  const istKontakt = ctx.route.endsWith('/kontakt/')
  const out: ReactNode[] = []
  let formGerendert = false
  let i = 0
  while (i < knoten.length) {
    const n = knoten[i]
    if (n.k === 'gruppe') {
      // Karten: alle Gruppen bis zum "Satz unter den Angeboten"
      const gruppen: { name: string; kursbox: boolean; knoten: Knoten[] }[] = []
      while (i < knoten.length && !(knoten[i].k === 'feld' && knoten[i].label === 'Satz unter den Angeboten')) {
        const g = knoten[i]
        if (g.k === 'gruppe') {
          const nm = g.name ?? ''
          const mk = nm.match(/^Kachel \d+: (.*)$/)
          gruppen.push({ name: mk ? mk[1] : nm, kursbox: g.bild === 'kursbox', knoten: [] })
        } else if (gruppen.length) {
          gruppen[gruppen.length - 1].knoten.push(g)
        }
        i++
      }
      out.push(
        <div key={'karten' + i} className="grid gap-4 md:auto-rows-fr md:grid-cols-2">
          {gruppen.map((g, j) => (
            <Karte key={j} knoten={g.knoten} name={g.name} kursbox={g.kursbox} hell={hell} route={ctx.route} />
          ))}
        </div>,
      )
      continue
    }
    if (istKontakt && FORM_KNOTEN(n)) {
      if (!formGerendert) {
        formGerendert = true
        const f = formFelder(a.knoten, bereichFuer(ctx.route))
        out.push(
          <Formular
            key={'form' + i}
            idPrefix={ctx.route.replace(/\W+/g, '-')}
            bereich={bereichFuer(ctx.route) as FormBereich}
            aktiv={process.env.FORMULAR_AKTIV === '1'}
            bestaetigung={FORMULAR_TEXTE[bereichFuer(ctx.route) as FormBereich].bestaetigung}
            fehler={FORMULAR_TEXTE[bereichFuer(ctx.route) as FormBereich].fehler}
            felder={f.felder}
            hinweis={f.hinweis}
            knopf={
              <button type="submit" className="knopf">
                {f.knopf}
              </button>
            }
          />,
        )
      }
      i++
      continue
    }
    if (n.k === 'schritt') {
      const lauf: Knoten[] = []
      while (i < knoten.length && knoten[i].k === 'schritt') lauf.push(knoten[i++])
      out.push(
        <ol
          key={'s' + i}
          className="flex max-w-[800px] list-decimal flex-col gap-4 pl-6 marker:font-semibold marker:text-navy"
        >
          {lauf.map((st, j) => (
            <li key={j}>
              <strong className="font-semibold text-navy">{st.titel}</strong>{' '}
              <Teile teile={st.text_teile ?? []} ph={st.text_ph ?? []} />
            </li>
          ))}
        </ol>,
      )
      continue
    }
    if (n.k === 'punkt') {
      // E-12: Die Fläche «Buchungsweg, ein Weg für alle Bereiche» wird der Knopf «Erstgespräch buchen» (Beschriftung wie die CTA derselben Quelle).
      if (n.wert_ph?.some((p) => p.art === 'flaeche' && /^Buchungsweg/.test(p.roh))) {
        out.push(
          <p key={'bw' + i}>
            <Knopf href={buchungFuer(ctx.route)}>{BUCHUNGSKNOPF}</Knopf>
          </p>,
        )
        i++
        continue
      }
      const lauf: Knoten[] = []
      while (i < knoten.length && knoten[i].k === 'punkt' && !knoten[i].wert_ph?.some((p) => p.art === 'flaeche' && /^Buchungsweg/.test(p.roh))) lauf.push(knoten[i++])
      out.push(<Punkte key={'p' + i} punkte={lauf} ohneListenzeichen={/Kontaktdaten/.test(a.name)} />)
      continue
    }
    if (n.k === 'tabelle') {
      out.push(
        <Preistabelle
          key={'t' + i}
          kopf={n.kopf ?? []}
          zeilen={TABELLE_VON_ROUTE[ctx.route] ? preiszeilen(TABELLE_VON_ROUTE[ctx.route]) : (n.zeilen ?? [])}
        />,
      )
      i++
      continue
    }
    out.push(<Knotenzeile key={'k' + i} n={n} ctx={ctx} />)
    if (n.kinder && n.kinder.length && n.label !== 'Formularfelder') {
      out.push(
        <div key={'kk' + i} className="max-w-[800px]">
          <Liste kinder={n.kinder} />
        </div>,
      )
    }
    i++
  }
  return <>{out}</>
}

function Knotenzeile({ n, ctx }: { n: Knoten; ctx: Ctx }): ReactNode {
  void ctx
  if (n.k === 'tabelle' || n.k === 'schritt' || n.k === 'punkt' || n.k === 'gruppe') return null
  const l = n.label ?? ''
  const ts = teile(n)
  if (l === 'H2') return <h2 className={`max-w-[800px] ${H2}`}><T>{text(n)}</T></h2>
  if (l === 'CTA') {
    return (
      <p>
        <CtaKnopf n={n} route={ctx.route} />
      </p>
    )
  }
  if (l === '_platzhalter') return <Flaeche />
  if (/^Kasten/.test(l)) {
    return (
      <p className="max-w-[800px] rounded-lg border-2 border-navy bg-white p-4 text-navy">
        <Teile teile={ts} ph={ph(n)} />
      </p>
    )
  }
  if (l === 'Satz unter dem Ablauf') {
    return (
      <p className="max-w-[800px] font-heading text-xl font-semibold text-navy">
        <Teile teile={ts} ph={ph(n)} />
      </p>
    )
  }
  if (l === 'Telefon' || l === 'E-Mail') {
    return (
      <p className="text-lg font-semibold text-navy">
        <Teile teile={ts} ph={ph(n)} bind={false} />
      </p>
    )
  }
  if (l === 'Status') {
    return (
      <p className="font-heading font-semibold text-navy">
        <T>{text(n)}</T>
      </p>
    )
  }
  if (l === 'Preis' || l === 'Preiszeile' || l === 'Pakete' && false) {
    return (
      <p className="max-w-[800px] font-semibold text-navy">
        <Teile teile={ts} ph={ph(n)} />
      </p>
    )
  }
  if (ts.length === 1 && ts[0].t === 'flaeche') return <Flaeche />
  return (
    <p className="max-w-[800px]">
      <Teile teile={ts} ph={ph(n)} />
    </p>
  )
}

function Punkte({ punkte, ohneListenzeichen = false }: { punkte: Knoten[]; ohneListenzeichen?: boolean }) {
  const sichtbar = punkte.filter((p) => !leer(teile(p)) || (p.kinder ?? []).length)
  return (
    <ul
      className={`flex max-w-[800px] flex-col gap-3 ${ohneListenzeichen ? 'list-none pl-0' : 'list-disc pl-6 marker:text-navy'}`}
    >
      {sichtbar.map((p, i) => {
        const ts = teile(p)
        const nurFlaeche = ts.length === 1 && ts[0].t === 'flaeche'
        return (
          <li key={i} className={nurFlaeche ? 'list-none' : ''}>
            <Teile teile={ts} ph={ph(p)} bind={!ohneListenzeichen} />
            {(p.kinder ?? []).length ? (
              <div className="pt-2">
                <Liste kinder={p.kinder ?? []} />
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

// ---- Kopf ----
function h1Klasse(t: string) {
  if (t.length > 70) return 'text-[1.375rem] lg:text-[1.75rem]'
  if (t.length > 45) return 'text-[1.5rem] lg:text-[2rem]'
  if (t.length > 25) return 'text-[1.375rem] lg:text-[2.5rem]'
  return 'text-[1.5rem] lg:text-[2.5rem]'
}

function KopfInhalt({ a, route, breit = false }: { a: Abschnitt; route: string; breit?: boolean }) {
  const nk = a.knoten.filter((n) => !istFoto(n))
  return (
    <>
      {nk.map((n, i) => {
        const l = n.label ?? ''
        const t = text(n)
        if (l === 'Dachzeile') {
          return (
            <p key={i} className="font-heading text-lg font-semibold text-navy">
              <T>{t}</T>
            </p>
          )
        }
        if (l === 'H1') {
          return (
            <h1 key={i} className={`${breit ? 'max-w-[1000px]' : 'max-w-[40ch]'} ${h1Klasse(t)}`}>
              <T>{t}</T>
            </h1>
          )
        }
        if (l === 'Unterzeile' || l === 'Text' || l === 'Zeile unter der H1') {
          return (
            <p key={i} className={`${breit ? 'max-w-[800px]' : 'max-w-[60ch]'} text-lg`}>
              <Teile teile={teile(n)} ph={ph(n)} />
            </p>
          )
        }
        if (l === 'CTA') {
          const klein = nk.find((m) => /^Kleintext/.test(m.label ?? ''))
          return (
            <div key={i} className="flex flex-col items-start gap-3">
              <CtaKnopf n={n} route={route} />
              {klein ? (
                <p>
                  <T>{text(klein)}</T>
                </p>
              ) : null}
            </div>
          )
        }
        return null
      })}
    </>
  )
}

export default function Seite({ route }: { route: string }) {
  const s = seite(route)
  const ctx: Ctx = { route }
  const bereich = bereichFuer(route)
  const kopf = s.abschnitte.find((a) => /Kopf/.test(a.name))!
  const rest = s.abschnitte.filter((a) => a !== kopf && a.name !== 'Fuss')
  const kopfFoto = fotoVon(kopf.knoten)
  const istPerson = route === '/walter-uehli/'
  const aufklappbar = route.startsWith('/fachwelt/institutionen/') && rest.length > 2
  const referenzen = referenzenFuer(route)
  const istInstStart = route === '/fachwelt/institutionen/'
  const zeileSchonGezeigt = !!kopfFoto || istPerson
  let zeileVergeben = zeileSchonGezeigt

  return (
    <>
      <Navigation bereich={bereich} aktuell={route} />
      <main>
        {kopfFoto?.art === 'arbeitsplatz' ? (
          <Buehne zeile mittig kopf={<KopfInhalt a={kopf} route={route} />} />
        ) : (
          <section className="bg-white">
            <div
              className={`container-b py-12 lg:py-16 ${kopfFoto || istPerson ? 'grid gap-8 md:grid-cols-[1fr_minmax(0,360px)] md:items-center' : ''}`}
            >
              <div className="flex flex-col gap-4">
                <KopfInhalt a={kopf} route={route} breit={!kopfFoto && !istPerson} />
              </div>
              {kopfFoto ? (
                <div className="flex w-full max-w-[360px] flex-col gap-2 md:justify-self-end">
                  <div className={`rounded-lg ${kopfFoto.art === 'kursbox' ? 'bg-white' : 'bg-grey-light'}`}>
                    <Foto
                      foto={kopfFoto.foto}
                      priority
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="h-auto w-full rounded-lg"
                    />
                  </div>
                  {istPerson || kopfFoto.art === 'kursbox' ? null : <Personenzeile className="text-base" />}
                </div>
              ) : null}
            </div>
          </section>
        )}

        {rest.map((a, idx) => {
          // Wechsel von hinten gezählt: der letzte Abschnitt ist weiss, damit er sich vom Fuss (grey-light) abhebt.
          // Die Referenzen nach den Preisen zählen nicht mit: sie haben die Farbe des Abschnitts davor, damit sich die
          // Farben der übrigen Abschnitte nicht verschieben.
          const hell = (rest.length - 1 - idx) % 2 === 1
          const foto = fotoVon(a.knoten)
          const klappt = aufklappbar && AUFKLAPP_NAMEN.test(a.name)
          const h2 = a.knoten.find((n) => n.k === 'feld' && n.label === 'H2')
          const ohneH2 = { ...a, knoten: a.knoten.filter((n) => n !== h2) }
          const id = h2 && text(h2) === 'Wenn jemand in Gefahr ist' ? 'gefahr' : undefined
          const zeileHier = foto && !zeileVergeben
          if (foto) zeileVergeben = true
          return (
            <Fragment key={a.name}>
              <section id={id} className={hell ? 'bg-grey-light' : 'bg-white'}>
                <div
                  className={`container-b py-12 lg:py-16 ${foto ? 'grid gap-8 md:grid-cols-[1fr_minmax(0,480px)] md:items-center' : ''}`}
                >
                  <div className="flex flex-col gap-4">
                    {h2 ? (
                      <h2 className={`max-w-[800px] ${H2}`}>
                        <T>{text(h2)}</T>
                      </h2>
                    ) : null}
                    {klappt ? (
                      <Aufklapp label={AUFKLAPP_LABEL}>
                        <Fluss a={ohneH2} ctx={ctx} hell={hell} />
                      </Aufklapp>
                    ) : (
                      <Fluss a={ohneH2} ctx={ctx} hell={hell} />
                    )}
                  </div>
                  {foto ? (
                    <div className="flex w-full max-w-[360px] flex-col gap-2 md:justify-self-end">
                      <div className={`rounded-lg ${hell ? 'bg-white' : 'bg-grey-light'}`}>
                        <Foto foto={foto.foto} sizes="(min-width: 768px) 360px, 100vw" className="h-auto w-full rounded-lg" />
                      </div>
                      {zeileHier ? <Personenzeile className="text-base" /> : null}
                    </div>
                  ) : null}
                </div>
              </section>
              {referenzen.length && PREISE_NAME.test(a.name) ? (
                <section className={hell ? 'bg-grey-light' : 'bg-white'}>
                  <div className="container-b pb-12 lg:pb-16">
                    <Referenzen eintraege={referenzen} hell={hell} />
                  </div>
                </section>
              ) : null}
            </Fragment>
          )
        })}
        {istInstStart ? null : null}
      </main>
      <Footer zeilen={fussFuer(route)} />
    </>
  )
}
