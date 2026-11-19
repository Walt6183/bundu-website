import Image from 'next/image'

type FotoDaten = { src: string; width: number; height: number; alt: string }

export default function Foto({
  foto,
  className = '',
  sizes,
  priority = false,
  position = '50% 50%',
}: {
  foto: FotoDaten
  className?: string
  sizes: string
  priority?: boolean
  position?: string
}) {
  return (
    <Image
      src={foto.src}
      width={foto.width}
      height={foto.height}
      alt={foto.alt}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: 'cover', objectPosition: position }}
    />
  )
}
