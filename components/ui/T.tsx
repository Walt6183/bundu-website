import { Fragment } from 'react'

// Setzt Namen und Zahl mit Einheit in nowrap-Spans. Der Wortlaut bleibt unverändert.
const MUSTER =
  /(Inhouse-Fortbildung|Team- oder Gruppen-Coaching|Walter Uehli|B&U BundU®|Online Eltern-Coaching|Online-Coaching|Bündner Standard|STARK im Team|Schule Friedheim|Neue Autorität|\d+ (?:Minuten|Kinder|Mitarbeitenden)|\d+ × \d+ Minuten|CHF [\d']+|\d+\. Juli 2026|5er-Paket|über \d+ Jahre|mehr als \d+ Jahre)/g

export default function T({ children, bind = true }: { children: string; bind?: boolean }) {
  // Die letzten zwei Wörter bleiben zusammen (geschütztes Leerzeichen), damit keine Zeile mit einem Wort endet.
  const ende = children.lastIndexOf(' ')
  const gebunden = bind && ende > 0 ? children.slice(0, ende) + '\u00a0' + children.slice(ende + 1) : children
  const teile = gebunden.split(MUSTER)
  return (
    <>
      {teile.map((t, i) =>
        i % 2 === 1 ? (
          <span key={i} className="nowrap">
            {t}
          </span>
        ) : (
          <Fragment key={i}>{t}</Fragment>
        ),
      )}
    </>
  )
}
