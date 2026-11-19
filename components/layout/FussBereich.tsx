import Image from 'next/image'
import { LOGO } from '@/content/texte'
import PrivacyLink from '@/components/layout/PrivacyLink'
import Teile from '@/components/ui/Teile'
import type { FussZeile } from '@/lib/seiten'

// Fuss eines Bereichs, Zeilen wortgleich aus der Textdatei. Gleiche Form wie Footer.tsx:
// grey-light, Logo 160 px, Fusspolster 80 px (Entscheid LO-3), Logo nur auf der hellen Fläche.
export default function FussBereich({ zeilen }: { zeilen: FussZeile[] }) {
  return (
    <footer className="bg-grey-light text-grey-deep">
      <div className="container-b flex flex-col gap-[160px] py-[80px] md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          {zeilen.map((z, i) => (
            <p
              key={i}
              className={i === 0 ? 'nowrap font-heading text-xl font-bold text-navy' : 'max-w-[800px]'}
            >
              <Teile teile={z.teile} bind={false} />
              {z.teile.some((t) => t.t === 'link' && t.href === '/datenschutz/') ? (
                <>
                  {' · '}
                  <PrivacyLink />
                </>
              ) : null}
            </p>
          ))}
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
