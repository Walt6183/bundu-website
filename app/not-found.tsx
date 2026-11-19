import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import { NOT_FOUND, SEITE1 } from '@/content/texte'

export const metadata = { title: { absolute: 'B&U BundU®' } }

// 404: ein Satz und ein Link zur Weiche (Wortlaut: Nachtrag zum Konzept Phase 2, entschieden am 2026-11-15).
export default function NotFound() {
  return (
    <>
      <Navigation bereich="weiche" />
      <main className="bg-white">
        <div className="container-b flex flex-col items-start gap-6 py-24">
          <h1 className="text-[2rem] lg:text-[2.5rem]">{NOT_FOUND.satz}</h1>
          <p className="text-lg">
            <Link href="/" className="textlink">
              {NOT_FOUND.link}
            </Link>
          </p>
        </div>
      </main>
      <Footer {...SEITE1.fuss} />
    </>
  )
}
