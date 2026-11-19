import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import Buehne from '@/components/ui/Buehne'
import Foto from '@/components/ui/Foto'
import Tuer from '@/components/ui/Tuer'
import T from '@/components/ui/T'
import { FOTO, LINKS, SEITE2 as S } from '@/content/texte'

export const metadata: Metadata = {
  title: { absolute: S.title },
  description: S.description,
  alternates: { canonical: '/fachwelt/' },
}

export default function Fachwelt() {
  return (
    <>
      <Navigation bereich="fachwelt" />
      <main>
        <Buehne
          zeile
          kopf={
            <>
              <h1 className="text-[1.375rem] lg:text-[2rem]">{S.h1}</h1>
              <p className="max-w-[60ch] lg:text-lg">
                <T>{S.unterzeile}</T>
              </p>
            </>
          }
          karten={
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              <Tuer schild={S.tuerA.schild} cta={S.tuerA.cta} href={LINKS.onlineCoaching}>
                <p className="font-semibold text-navy">
                  <T>{S.tuerA.angebot}</T>
                </p>
                <p>
                  <T>{S.tuerA.text}</T>
                </p>
                <p className="text-grey-deep">
                  <T>{S.tuerA.kleintext}</T>
                </p>
              </Tuer>
              <Tuer schild={S.tuerB.schild} cta={S.tuerB.cta} href={LINKS.institutionen}>
                <dl className="flex flex-col gap-2 md:gap-3">
                  {S.tuerB.punkte.map((p) => (
                    <div key={p.name}>
                      <dt className="font-semibold text-navy">
                        <T>{p.name}</T>
                      </dt>
                      <dd>
                        <T>{p.text}</T>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Tuer>
            </div>
          }
        />

        <section className="bg-white">
          <div className="container-b grid gap-8 py-16 md:grid-cols-[1fr_minmax(0,480px)] md:items-center">
            <div className="flex max-w-[800px] flex-col gap-4">
              <h2 className="text-[1.5rem] lg:text-[2rem]">{S.person.h2}</h2>
              <p>
                <T>{S.person.text}</T>
              </p>
              <p>
                <Link href={LINKS.person} className="textlink">
                  {S.person.link}
                </Link>
              </p>
            </div>
            <Foto
              foto={FOTO.arbeitsplatz}
              sizes="(min-width: 768px) 480px, 100vw"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </section>
      </main>
      <Footer
        marke={S.fuss.marke}
        zeile={S.fuss.zeile}
        copyright={S.fuss.copyright}
        vorne={
          <>
            {S.fuss.eltern.vor}
            <Link href={LINKS.eltern} className="textlink">
              {S.fuss.eltern.link}
            </Link>
          </>
        }
      />
    </>
  )
}
