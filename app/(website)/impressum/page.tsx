import type { Metadata } from 'next'
import RechtsSeite from '@/components/ui/RechtsSeite'
import { STUB } from '@/content/texte'

export const metadata: Metadata = { title: { absolute: STUB.title }, alternates: { canonical: '/impressum/' } }

export default function Seite() {
  return <RechtsSeite art="impressum" />
}
