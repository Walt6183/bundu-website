import type { ReactNode } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}
