import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wird überarbeitet',
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F2040', color: '#ffffff', padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
      <div style={{ maxWidth: '36rem' }}>
        <div style={{ width: '4rem', height: '4px', background: '#E8921A', margin: '0 auto 2rem' }} />
        <h1 style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: '2rem', lineHeight: 1.3, marginBottom: '1.25rem' }}>
          Die Seite wird gerade überarbeitet
        </h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '2rem', color: '#e5edf5' }}>
          Die Seite wird gerade überarbeitet und ist am Montag, 23. November 2026 wieder live.
        </p>
        <p style={{ fontSize: '1rem', color: '#079BB8' }}>
          Dringende Anliegen: <a href="mailto:info@bundu.ch" style={{ color: '#079BB8' }}>info@bundu.ch</a> oder +41 (0)55 505 62 03
        </p>
        <p style={{ fontSize: '0.875rem', marginTop: '2.5rem', color: '#9fb3c8' }}>B&amp;U BundU®</p>
      </div>
    </main>
  )
}
