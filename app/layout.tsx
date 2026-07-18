import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import FloatingWhatsAppCTA from '@/components/floating-whatsapp-cta'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, pageCanonical } from '@/lib/seo'
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/seo-schemas'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Expert CFO Services & Financial Advisory in India | FinMates',
  description:
    'Expert CFO services and financial advisory in India for growing businesses. Improve cash flow, compliance and profitability. Contact us today to discuss your financial goals.',
  generator: 'GEO SOFTECH',
  ...pageCanonical('/'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
        {children}
        <FloatingWhatsAppCTA />
      </body>
    </html>
  )
}
