import type { Metadata } from 'next'
import { pageCanonical } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Financial Services & CFO Solutions | FinMates',
  description:
    'Explore FinMates services — CFO, taxation, F&A outsourcing, M&A advisory, SME IPO and more.',
  ...pageCanonical('/services'),
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
