// Rückmeldung einer Familie (Wortlaut mit schriftlicher Einwilligung, nicht verändern).
// Ruhiger Block aus vorhandenen Bausteinen: Überschrift-Schrift, Navy, Teal-Linie links. Kein Foto, keine Sterne.
// `text-wrap: balance` (Klasse `ausgewogen`) verhindert ein einzelnes Wort in der letzten Zeile, ohne ein Zeichen zu ändern.
export default function Rueckmeldung({
  kontext,
  zitat,
  herkunft,
  klein = false,
}: {
  kontext?: string
  zitat: string
  herkunft: string
  klein?: boolean
}) {
  return (
    <figure className="flex max-w-[800px] flex-col gap-2">
      {kontext ? <p className="text-base text-grey-deep">{kontext}</p> : null}
      <blockquote className="border-l-4 border-teal pl-4">
        <p
          className={`ausgewogen font-heading font-semibold text-navy ${klein ? 'text-lg' : 'text-[1.25rem] lg:text-[1.5rem]'}`}
        >
          {zitat}
        </p>
      </blockquote>
      <figcaption className="pl-5 text-base">{herkunft}</figcaption>
    </figure>
  )
}
