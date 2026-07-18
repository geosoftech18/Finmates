import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { pageCanonical } from '@/lib/seo'
import { buildCollectionPageJsonLd } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'FinMates Blog | Finance Insights & Business Growth Tips',
  description:
    'Insights, updates, and expert advice on finance, accounting, and business growth from FinMates.',
  ...pageCanonical('/blog'),
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={buildCollectionPageJsonLd({
          name: 'FinMates Blog',
          description:
            'Insights, updates, and expert advice on finance, accounting, and business growth from FinMates.',
          path: '/blog',
        })}
      />
      {children}
    </>
  )
}
