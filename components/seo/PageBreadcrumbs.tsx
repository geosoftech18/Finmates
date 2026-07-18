'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { buildBreadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo'
import { cn } from '@/lib/utils'

type PageBreadcrumbsProps = {
  items: BreadcrumbItem[]
  /** Use on dark/blue heroes (white text) or light heroes (dark text) */
  variant?: 'light' | 'dark'
  className?: string
  /** Set false when rendering a duplicate UI breadcrumb (e.g. mobile+desktop) */
  includeSchema?: boolean
}

export default function PageBreadcrumbs({
  items,
  variant = 'light',
  className,
  includeSchema = true,
}: PageBreadcrumbsProps) {
  if (!items.length) return null

  const isLight = variant === 'light'
  const jsonLd = buildBreadcrumbJsonLd(items)

  return (
    <>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={cn('relative z-20 w-full flex', className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    className={cn(
                      'size-3.5 shrink-0',
                      isLight ? 'text-white/50' : 'text-slate-400',
                    )}
                    aria-hidden
                  />
                )}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(
                      'font-medium',
                      isLight ? 'text-white' : 'text-slate-900',
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors',
                      isLight
                        ? 'text-white/75 hover:text-white'
                        : 'text-slate-500 hover:text-[#003b8d]',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
