import T from '@/components/ui/T'

// Preistabelle als echte table: th je Spalte (scope=col), Preis rechtsbündig, Zellen wortgleich zur Quelle.
// Bis 767 px steht jede Zeile als Block (Leistung fett, darunter Umfang und Preis mit der Spaltenüberschrift
// als Beschriftung aus `data-label`). Die Kopfzeile bleibt für Hilfstechnik im DOM (.preise-kopf, nur unsichtbar).
export default function Preistabelle({ kopf, zeilen }: { kopf: readonly string[]; zeilen: readonly (readonly string[])[] }) {
  const letzte = kopf.length - 1
  return (
    <div className="w-full max-w-[800px]">
      <table className="preise w-full border-collapse text-left">
        <thead className="preise-kopf">
          <tr>
            {kopf.map((k, i) => (
              <th
                key={k}
                scope="col"
                className={`border-b-2 border-navy py-3 pr-3 font-heading font-semibold text-navy ${i === letzte ? 'md:pl-3 md:pr-0 md:text-right' : ''}`}
              >
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {zeilen.map((z) => (
            <tr key={z.join('|')} className="border-b border-grey-deep/30 align-top">
              {z.map((c, i) => (
                <td
                  key={i}
                  data-label={i === 0 ? undefined : kopf[i]}
                  className={`${i === 0 ? 'pt-3 font-semibold text-navy' : ''} ${i === letzte ? 'font-semibold text-navy md:pl-3 md:text-right' : ''} ${i === letzte ? 'pb-3' : ''}`}
                >
                  <span className="zellinhalt"><T bind={i !== letzte}>{c}</T></span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
