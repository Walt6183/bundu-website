import Seite from '@/components/seiten/Seite'
import { meta } from '@/lib/seiten'

const ROUTE = '/fachwelt/fachpersonen/'
export const metadata = meta(ROUTE)

export default function Page() {
  return <Seite route={ROUTE} />
}
