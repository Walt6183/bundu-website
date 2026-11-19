import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import Buehne from '@/components/ui/Buehne'
import Foto from '@/components/ui/Foto'
import Tuer from '@/components/ui/Tuer'
import Personenzeile from '@/components/ui/Personenzeile'
import T from '@/components/ui/T'
import { FOTO, LINKS, SEITE1 as S } from '@/content/texte'

export const metadata: Metadata = {
  title: { absolute: S.title },
  description: S.description,
  alternates: { canonical: '/' },
}

export default function Weiche() {
  return (
    <>
      <Navigation bereich="weiche" />
      <main>
        <Buehne
          kopf={
            <h1 className="max-w-[40ch] text-[1.375rem] lg:text-[2rem]">
              <T>{S.h1}</T>
            </h1>
          }
          karten={
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              <Tuer schild={S.tuer1.schild} cta={S.tuer1.cta} href={LINKS.eltern}>
                <p className="font-semibold text-navy">
                  <T>{S.tuer1.angebot}</T>
                </p>
                <p>
                  <T>{S.tuer1.satz}</T>
                </p>
              </Tuer>
              <Tuer schild={S.tuer2.schild} cta={S.tuer2.cta} href={LINKS.fachwelt}>
                <p className="font-semibold text-navy">
                  <T>{S.tuer2.angebote}</T>
                </p>
                <p>
                  <T>{S.tuer2.satz}</T>
                </p>
              </Tuer>
            </div>
          }
        />

        <section className="container-b py-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex w-full max-w-[320px] shrink-0 flex-col gap-3">
              <div className="w-[200px] rounded-lg bg-grey-light">
                <Foto
                  foto={FOTO.business}
                  sizes="200px"
                  className="h-auto w-[200px] rounded-lg"
                />
              </div>
              <Personenzeile />
            </div>
            <div className="flex max-w-[800px] flex-col gap-3">
              <p className="font-heading text-xl font-semibold text-navy">
                <T>{S.achse.satz}</T>
              </p>
              <p>
                <Link href={LINKS.person} className="textlink">
                  {S.achse.link}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer {...S.fuss} />
    </>
  )
}
