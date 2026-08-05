import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | FinMates',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-20">
      <div className="max-w-md w-full text-center">
        <p
          className="text-6xl sm:text-7xl font-bold tracking-tight mb-4"
          style={{ color: '#008bd0' }}
        >
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#002244' }}>
          Page not found
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          The page you are looking for may have been moved, renamed, or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 w-full sm:w-auto"
            style={{ background: 'linear-gradient(90deg, #008bd0, #323a85)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-50 w-full sm:w-auto"
            style={{ color: '#002244', border: '1px solid rgba(0,34,68,0.15)' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
