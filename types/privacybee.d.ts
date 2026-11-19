// Typdeklaration für das Datenschutz-Widget von PrivacyBee (Element, das das geladene Skript registriert).
import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'privacybee-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'website-id'?: string
        type?: string
        lang?: string
      }
    }
  }
}
