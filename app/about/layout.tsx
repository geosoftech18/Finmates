import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { pageCanonical } from '@/lib/seo'
import { buildAboutPageJsonLd } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'About FinMates | Expert CFO & Financial Advisory Team',
  description:
    'Learn about FinMates — expert CFO services and financial advisory for growing businesses across India.',
  ...pageCanonical('/about'),
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildAboutPageJsonLd()} />
      {children}
    </>
  )
}
