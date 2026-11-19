import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import Buehne from '@/components/ui/Buehne'
import Foto from '@/components/ui/Foto'
import Knopf from '@/components/ui/Knopf'
import Preistabelle from '@/components/ui/Preistabelle'
import T from '@/components/ui/T'
import { BUCHUNG } from '@/content/konfig'
import { preiszeilen } from '@/lib/preise'
import { FOTO, LINKS, SEITE3 as S } from '@/content/texte'

export const metadata: Metadata = {
  title: { absolute: S.title },
  description: S.description,
}

const h2Klasse = 'text-[1.5rem] lg:text-[2rem]'

export default function OnlineCoaching() {
  return (
    <>
      <Navigation bereich="fachpersonen" aktuell={LINKS.onlineCoaching} />
      <main>
        <Buehne
          zeile
          kopf={
            <>
              <p className="font-heading text-lg font-semibold text-navy">
                <T>{S.kopf.dachzeile}</T>
              </p>
              <h1 className="text-[1.75rem] lg:text-[2.5rem]">{S.kopf.h1}</h1>
              <p className="max-w-[60ch] text-lg">
                <T>{S.kopf.unterzeile}</T>
              </p>
              <div className="flex flex-col items-start gap-3">
                <Knopf href={BUCHUNG.fachpersonen}>{S.kopf.cta}</Knopf>
                <p className="text-grey-deep">
                  <T>{S.kopf.kleintext}</T>
                </p>
              </div>
            </>
          }
        />

        <section className="bg-white">
          <div className="container-b flex max-w-[1200px] flex-col gap-4 py-16">
            <h2 className={h2Klasse}>{S.fuerWen.h2}</h2>
            <p className="max-w-[800px]">
              <T>{S.fuerWen.text}</T>
            </p>
          </div>
        </section>

        <section className="bg-grey-light">
          <div className="container-b flex flex-col gap-4 py-16">
            <h2 className={h2Klasse}>{S.anlass.h2}</h2>
            <p className="max-w-[800px]">
              <T>{S.anlass.text}</T>
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-b flex flex-col gap-6 py-16">
            <h2 className={h2Klasse}>{S.ablauf.h2}</h2>
            <ol className="flex max-w-[800px] list-decimal flex-col gap-4 pl-6 marker:font-semibold marker:text-navy">
              {S.ablauf.schritte.map((s) => (
                <li key={s.titel}>
                  <strong className="font-semibold text-navy">{s.titel}</strong>{' '}
                  <T>{s.text}</T>
                </li>
              ))}
            </ol>
            <p className="max-w-[800px] font-heading text-xl font-semibold text-navy">
              <T>{S.ablauf.satz}</T>
            </p>
          </div>
        </section>

        <section className="bg-grey-light">
          <div className="container-b flex flex-col gap-6 py-16">
            <h2 className={h2Klasse}>
              <T>{S.grenzen.h2}</T>
            </h2>
            <ul className="flex max-w-[800px] list-disc flex-col gap-3 pl-6 marker:text-navy">
              {S.grenzen.punkte.map((p) => (
                <li key={p}>
                  <T>{p}</T>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-b flex flex-col gap-6 py-16">
            <h2 className={h2Klasse}>{S.preise.h2}</h2>
            <Preistabelle kopf={S.preise.kopf} zeilen={preiszeilen('online-coaching-fachpersonen')} />
            <p className="max-w-[800px]">
              <T>{S.preise.text}</T>
            </p>
            <p>
              <Knopf href={BUCHUNG.fachpersonen}>{S.preise.cta}</Knopf>
            </p>
          </div>
        </section>

        <section className="bg-grey-light">
          <div className="container-b grid gap-8 py-16 md:grid-cols-[1fr_minmax(0,480px)] md:items-center">
            <div className="flex max-w-[800px] flex-col gap-4">
              <h2 className={h2Klasse}>{S.person.h2}</h2>
              <p>
                <T>{S.person.text}</T>
              </p>
              <p>
                <T>{S.person.zweiter}</T>
              </p>
              <p>
                <Link href={LINKS.person} className="textlink">
                  {S.person.link}
                </Link>
              </p>
            </div>
            <div className="w-full max-w-[360px] rounded-lg bg-white md:justify-self-end">
              <Foto
                foto={FOTO.business}
                sizes="(min-width: 768px) 360px, 100vw"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-b flex flex-col items-start gap-4 py-16">
            <h2 className={`max-w-[800px] ${h2Klasse}`}>
              <T>{S.aufruf.h2}</T>
            </h2>
            <p className="max-w-[800px]">
              <T>{S.aufruf.text}</T>
            </p>
            <p>
              <Knopf href={BUCHUNG.fachpersonen}>{S.aufruf.cta}</Knopf>
            </p>
          </div>
        </section>
      </main>
      <Footer
        marke={S.fuss.marke}
        zeile={S.fuss.zeile}
        copyright={S.fuss.copyright}
        vorne={
          <>
            {S.fuss.team.vor}
            <Link href={LINKS.institutionen} className="textlink">
              {S.fuss.team.link}
            </Link>
          </>
        }
      />
    </>
  )
}
