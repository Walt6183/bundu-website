import type { Metadata } from 'next'
import RechtsSeite from '@/components/ui/RechtsSeite'
import { STUB } from '@/content/texte'

export const metadata: Metadata = { title: { absolute: STUB.title }, alternates: { canonical: '/datenschutz/' } }

export default function Seite() {
  return <RechtsSeite art="datenschutz" />
}
