import type { ReactNode } from 'react'
import PrivacyBanner from '@/components/layout/PrivacyBanner'

// Navigation und Fuss liegen in den Seiten, weil beide je Bereich verschieden sind.
// Der Cookie-Banner steht hier einmal für alle Seiten der Website (nicht im Studio).
export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PrivacyBanner />
    </>
  )
}
