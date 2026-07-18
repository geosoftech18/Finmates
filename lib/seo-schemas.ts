import { SITE_URL, absoluteUrl } from '@/lib/seo'

export const ORG = {
  name: 'FinMates',
  legalName: 'Finmate Business Solutions Pvt Ltd',
  url: SITE_URL,
  logo: absoluteUrl('/icon.png'),
  email: 'info@finmates.in',
  telephone: '+91-98339-43776',
  sameAs: [
    'https://www.linkedin.com/company/finmates',
    'https://www.facebook.com/finmates',
    'https://www.instagram.com/finmates',
  ],
  address: {
    streetAddress: 'B-715, Jaswanti Allied Business Center, Ramchandra Lane, Kanchpada, Malad West',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400064',
    addressCountry: 'IN',
  },
} as const

export type FaqItem = { question: string; answer: string }

export type ServiceSchemaInput = {
  name: string
  description: string
  path: string
  serviceType?: string
  areaServed?: string
}

export type ArticleSchemaInput = {
  title: string
  description: string
  slug: string
  author: string
  image?: string | null
  publishedAt?: string | Date | null
  modifiedAt?: string | Date | null
}

function orgRef() {
  return {
    '@type': 'Organization',
    name: ORG.name,
    url: ORG.url,
    logo: ORG.logo,
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ORG.url}/#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: {
      '@type': 'ImageObject',
      url: ORG.logo,
    },
    email: ORG.email,
    telephone: ORG.telephone,
    address: {
      '@type': 'PostalAddress',
      ...ORG.address,
    },
    sameAs: ORG.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORG.telephone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ORG.url}/#website`,
    name: ORG.name,
    url: ORG.url,
    publisher: { '@id': `${ORG.url}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function buildServiceJsonLd(service: ServiceSchemaInput) {
  const areaServed =
    typeof service.areaServed === 'string' && service.areaServed.toLowerCase().includes('mumbai')
      ? { '@type': 'City', name: 'Mumbai' }
      : {
          '@type': 'Country',
          name: typeof service.areaServed === 'string' ? service.areaServed : 'India',
        }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    serviceType: service.serviceType || service.name,
    provider: orgRef(),
    areaServed,
    brand: {
      '@type': 'Brand',
      name: ORG.name,
    },
  }
}

export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\n+/g, ' ').trim(),
      },
    })),
  }
}

export function buildArticleJsonLd(article: ArticleSchemaInput) {
  const url = absoluteUrl(`/blog/${article.slug}`)
  const published = article.publishedAt
    ? new Date(article.publishedAt).toISOString()
    : undefined
  const modified = article.modifiedAt
    ? new Date(article.modifiedAt).toISOString()
    : published

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: article.image ? [article.image] : [ORG.logo],
    author: {
      '@type': 'Person',
      name: article.author || ORG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG.name,
      logo: {
        '@type': 'ImageObject',
        url: ORG.logo,
      },
    },
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  }
}

export function buildBlogPostingJsonLd(article: ArticleSchemaInput) {
  return {
    ...buildArticleJsonLd(article),
    '@type': 'BlogPosting',
  }
}

export function buildContactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact FinMates',
    url: absoluteUrl('/contact-us'),
    description:
      'Contact FinMates for CFO services, taxation, and financial advisory support across India.',
    mainEntity: orgRef(),
  }
}

export function buildAboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About FinMates',
    url: absoluteUrl('/about'),
    description:
      'Learn about FinMates — expert CFO services and financial advisory for growing businesses across India.',
    mainEntity: orgRef(),
  }
}

export function buildCollectionPageJsonLd(input: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': `${ORG.url}/#website` },
  }
}

export function buildServicesItemListJsonLd() {
  const services: ServiceSchemaInput[] = [
    {
      name: 'CFO Services',
      path: '/services/cfo-services',
      description: 'Virtual and on-site CFO services for SMEs in India.',
    },
    {
      name: 'Direct Tax',
      path: '/services/direct-tax',
      description: 'Direct tax advisory and compliance services for businesses in India.',
    },
    {
      name: 'F&A Outsourcing',
      path: '/services/F&A-outsourcing',
      description: 'Finance and accounting outsourcing for growing businesses.',
    },
    {
      name: 'M&A Advisory',
      path: '/services/M&A-Advisory',
      description: 'M&A advisory and corporate fundraising support.',
    },
    {
      name: 'SME IPO',
      path: '/services/SME-IPO',
      description: 'SME IPO readiness and listing advisory in India.',
    },
    {
      name: 'Annual Report Preparation',
      path: '/services/annual-report-preparation',
      description: 'Annual report preparation and financial reporting services.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FinMates Financial Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(service.path),
      name: service.name,
      item: buildServiceJsonLd(service),
    })),
  }
}

export function buildWebPageJsonLd(input: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': `${ORG.url}/#website` },
    about: orgRef(),
  }
}
