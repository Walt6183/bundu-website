import Link from 'next/link'

// Externe Adresse (https) öffnet in neuem Tab mit noopener, ohne Skript des Anbieters (Phase 3, Punkt 1).
export default function Knopf({ href, children, zweite = false }: { href: string; children: string; zweite?: boolean }) {
  const ende = children.lastIndexOf(' ')
  const text = ende > 0 ? children.slice(0, ende) + '\u00a0' + children.slice(ende + 1) : children
  const klasse = zweite ? 'knopf knopf-zwei' : 'knopf'
  if (/^https:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={klasse}>
        {text}
      </a>
    )
  }
  return (
    <Link href={href} className={klasse}>
      {text}
    </Link>
  )
}
