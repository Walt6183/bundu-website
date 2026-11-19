import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PrivacyLink from '@/components/layout/PrivacyLink'
import { LINKS, LOGO } from '@/content/texte'

type Props = {
  marke: string
  zeile: readonly [string, string, string]
  copyright: string
  vorne?: ReactNode // Verweiszeile (Seite 2 und 3), steht zwischen Marke und Personenzeile
}

// Der Fuss ist grey-light, das Logo steht nur auf dieser hellen Fläche (nie auf Navy).
// Das Logo ist 160 px gross und hat 160 px Abstand zum nächsten Element (Schutzzone). Das Fusspolster oben und unten ist 80 px: Abweichung von der Schutzzone der CI, Entscheid des Inhabers (LO-3).
export default function Footer({ marke, zeile, copyright, vorne }: Props) {
  return (
    <footer className="bg-grey-light text-grey-deep">
      <div className="container-b flex flex-col gap-[160px] py-[80px] md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <p className="nowrap font-heading text-xl font-bold text-navy">{marke}</p>
          {vorne ? <p className="max-w-[800px]">{vorne}</p> : null}
          <p>
            <Link href={LINKS.person} className="textlink">
              {zeile[0]}
            </Link>
            {' · '}
            <Link href={LINKS.impressum} className="textlink">
              {zeile[1]}
            </Link>
            {' · '}
            <Link href={LINKS.datenschutz} className="textlink">
              {zeile[2]}
            </Link>
            {' · '}
            <PrivacyLink />
          </p>
          <p>{copyright}</p>
        </div>
        <Image
          src={LOGO.src}
          width={LOGO.width}
          height={LOGO.height}
          alt={LOGO.alt}
          sizes="160px"
          className="h-[160px] w-[160px] shrink-0"
        />
      </div>
    </footer>
  )
}
