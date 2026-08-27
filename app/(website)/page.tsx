export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7fa',
        fontFamily: 'Georgia, serif',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '3rem 2.5rem',
          boxShadow: '0 4px 24px rgba(15,32,64,0.08)',
          border: '1px solid #e5e7eb',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔧</div>
        <h1 style={{ color: '#0F2040', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
          Kurze Pause
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Wir arbeiten gerade an etwas Neuem für Sie.
          <br />
          Die Website ist vorübergehend nicht erreichbar.
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Bei dringenden Fragen erreichen Sie uns unter:{' '}
          <a href="mailto:info@bundu.ch" style={{ color: '#079BB8', textDecoration: 'none', fontWeight: 600 }}>
            info@bundu.ch
          </a>
        </p>
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <p style={{ color: '#0F2040', fontWeight: 700, fontSize: '1rem', margin: 0 }}>B&U BundU®</p>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
            Gemeinsam stark für Familien
          </p>
        </div>
      </div>
    </main>
  )
}
