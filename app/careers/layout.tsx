import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { pageCanonical } from '@/lib/seo'
import { buildWebPageJsonLd } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'Careers at FinMates | Join Our Finance Team',
  description:
    'Explore career opportunities at FinMates. Join our team of finance and advisory professionals.',
  ...pageCanonical('/careers'),
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          name: 'Careers at FinMates',
          description:
            'Explore career opportunities at FinMates. Join our team of finance and advisory professionals.',
          path: '/careers',
        })}
      />
      {children}
    </>
  )
}
