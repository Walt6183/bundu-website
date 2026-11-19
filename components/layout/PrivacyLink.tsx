'use client'

// Öffnet die Cookie-Einstellungen wieder. Anker mit href="#" und der Klasse des Dienstes, wortgleich zur Vorgabe.
// Der Dienst hängt seinen eigenen Klick an die Klasse. preventDefault verhindert nur den Sprung nach oben.
export default function PrivacyLink() {
  return (
    <a href="#" className="privacybee-display-preferences" onClick={(e) => e.preventDefault()}>
      Privacy Center
    </a>
  )
}
