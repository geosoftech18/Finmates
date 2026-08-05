'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 16px',
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#002244', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              An unexpected error occurred. Please try again, or return to the homepage.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(90deg, #008bd0, #323a85)',
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#002244',
                  textDecoration: 'none',
                  border: '1px solid rgba(0,34,68,0.15)',
                }}
              >
                Back to Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
