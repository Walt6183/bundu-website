// Rückmeldung einer Familie (Wortlaut mit schriftlicher Einwilligung, nicht verändern).
// Ruhiger Block aus vorhandenen Bausteinen: Überschrift-Schrift, Navy, Teal-Linie links. Kein Foto, keine Sterne.
// `text-wrap: balance` (Klasse `ausgewogen`) verhindert ein einzelnes Wort in der letzten Zeile, ohne ein Zeichen zu ändern.
export default function Rueckmeldung({ zitat, herkunft }: { zitat: string; herkunft: string }) {
  return (
    <figure className="flex max-w-[800px] flex-col gap-2">
      <blockquote className="border-l-4 border-teal pl-4">
        <p className="ausgewogen font-heading font-semibold text-navy text-lg">{zitat}</p>
      </blockquote>
      <figcaption className="pl-5 text-base">{herkunft}</figcaption>
    </figure>
  )
}
