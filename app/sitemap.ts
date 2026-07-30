import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/** Encode each path segment so sitemap XML never contains raw `&` (invalid XML). */
function sitemapLoc(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  const encoded = normalized
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : ''))
    .join('/')
  return `${SITE_URL}${encoded}`
}

type StaticRoute = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/services/cfo-services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/services/direct-tax', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/F&A-outsourcing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/M&A-Advisory', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/SME-IPO', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/annual-report-preparation', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/city/mumbai', changeFrequency: 'weekly', priority: 0.9 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: sitemapLoc(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  let blogEntries: MetadataRoute.Sitemap = []

  try {
    const { prisma } = await import('@/lib/prisma')
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    })

    blogEntries = blogs.map((blog) => ({
      url: sitemapLoc(`/blog/${blog.slug}`),
      lastModified: blog.updatedAt || blog.publishedAt || now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Keep static sitemap available even if DB is unreachable
    blogEntries = []
  }

  return [...staticEntries, ...blogEntries]
}
