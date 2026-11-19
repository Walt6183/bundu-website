import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import { SEITE1, STUB } from '@/content/texte'

// Platzhalterseite (Impressum, Datenschutz): nur der Satz, im Look. Den Rechtstext schreibt eine Fachperson.
export default function Stub() {
  return (
    <>
      <Navigation bereich="weiche" />
      <main className="bg-white">
        <div className="container-b py-24">
          <h1 className="text-[2rem] lg:text-[2.5rem]">{STUB.satz}</h1>
        </div>
      </main>
      <Footer {...SEITE1.fuss} />
    </>
  )
}
