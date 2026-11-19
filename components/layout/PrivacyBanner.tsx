import Script from 'next/script'
import { PRIVACYBEE } from '@/content/konfig'

// Cookie-Banner einmal im gemeinsamen Layout. afterInteractive: lädt früh, blockiert den Seitenaufbau nicht.
export default function PrivacyBanner() {
  return (
    <Script
      id="privacybee-banner"
      src={PRIVACYBEE.bannerSkript}
      strategy="afterInteractive"
      {...{ 'website-id': PRIVACYBEE.websiteId }}
    />
  )
}
