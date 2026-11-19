import type { Config } from 'tailwindcss'

// Tailwind 4 liest die Tokens aus app/globals.css (@theme). Diese Datei spiegelt sie nur.
const config: Config = {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F2040',
        teal: '#079BB8',
        amber: '#E8921A',
        'grey-light': '#F8F9FA',
        'grey-deep': '#4A4A4A',
        'grey-mid': '#666666',
      },
      fontFamily: {
        heading: ['var(--font-heading-var)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body-var)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
