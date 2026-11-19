import T from '@/components/ui/T'
import { PERSONENZEILE } from '@/content/texte'

// Eigenes Textelement unter dem Foto (kein figcaption, nie auf dem Foto): Name fett, Funktion darunter.
export default function Personenzeile({ className = '' }: { className?: string }) {
  return (
    <p className={`flex flex-col gap-0.5 ${className}`}>
      <strong className="nowrap font-heading font-semibold text-navy">{PERSONENZEILE.name}</strong>
      <span>
        <T>{PERSONENZEILE.funktion}</T>
      </span>
    </p>
  )
}
