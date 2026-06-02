import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.finmates.in'

const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/services/cfo-services',
  '/services/direct-tax',
  '/services/F&A-outsourcing',
  '/services/M&A-Advisory',
  '/services/SME-IPO',
  '/services/annual-report-preparation',
  '/contact-us',
  '/careers',
  '/blog',
  '/city/mumbai',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
