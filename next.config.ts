import type { NextConfig } from 'next'

// Weiterleitungen alt nach neu, trennung-v4.md Abschnitt 7. Jede alte Adresse einzeln, permanent (301).
// `{/}?` fängt die Adresse mit und ohne Schrägstrich in einem Schritt ab (sonst zwei Sprünge: 308 auf den Schrägstrich, dann 301).
// trailingSlash: true, damit die Adressen so lauten wie im Auftrag (/eltern/, nicht /eltern). Status 301 statt des 308 von `permanent: true`.
const PAARE: [string, string][] = [
  ['/fuer-eltern', '/eltern/'],
  ['/angebote/online-eltern-coaching', '/eltern/coaching/'],
  ['/angebote/online-kurse', '/eltern/kurse/'],
  ['/fuer-fachpersonen', '/fachwelt/fachpersonen/'],
  ['/angebote/online-supervision', '/fachwelt/fachpersonen/online-coaching/'],
  ['/angebote/webinare-workshops', '/fachwelt/fachpersonen/webinare-workshops/'],
  ['/fuer-institutionen', '/fachwelt/institutionen/'],
  ['/angebote/inhouse-fortbildung', '/fachwelt/institutionen/inhouse-fortbildung/'],
  ['/angebote/stark-im-team', '/fachwelt/institutionen/stark-im-team/'],
  ['/angebote/bundner-standard-einfuhrung-und-implementierung', '/fachwelt/institutionen/buendner-standard/'],
  ['/angebote', '/'],
  ['/themen/eltern-kind-kommunikation', '/eltern/'],
  ['/themen/buendner-standard', '/fachwelt/institutionen/'],
  ['/themen/deeskalation', '/fachwelt/institutionen/'],
  ['/themen/neue-autoritaet', '/'],
  ['/impulse/coaching-vs-therapie', '/eltern/'],
  ['/impulse/buendner-standard-fuer-institutionen', '/fachwelt/institutionen/'],
  ['/impulse/was-ist-neue-autoritaet', '/'],
  ['/kontakt', '/'],
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ['@sanity/ui', '@sanity/icons', '@sanity/vision'],
  trailingSlash: true,
  // Der automatische 308 auf den Schrägstrich entfällt, damit eine alte Adresse ohne Schrägstrich in einem einzigen 301 auf das Ziel führt.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // www.bundu.ch führt mit 301 auf bundu.ch. Pfad und Abfrage bleiben erhalten. Steht vor den Paaren, ohne Host www.bundu.ch greift diese Regel nicht.
      { source: '/', has: [{ type: 'host' as const, value: 'www.bundu.ch' }], destination: 'https://bundu.ch/', statusCode: 301 },
      { source: '/:path+/', has: [{ type: 'host' as const, value: 'www.bundu.ch' }], destination: 'https://bundu.ch/:path+/', statusCode: 301 },
      { source: '/:path+', has: [{ type: 'host' as const, value: 'www.bundu.ch' }], destination: 'https://bundu.ch/:path+', statusCode: 301 },
      ...PAARE.map(([source, destination]) => ({ source: source + '{/}?', destination, statusCode: 301 })),
    ]
  },
}

export default nextConfig
