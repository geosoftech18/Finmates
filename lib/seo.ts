export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.finmates.in').replace(/\/$/, '')

export type BreadcrumbItem = {
  label: string
  href?: string
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageCanonical(path: string): { alternates: { canonical: string } } {
  return {
    alternates: {
      canonical: absoluteUrl(path),
    },
  }
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  }
}
