"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { TestimonialCard } from "./testimonial-card"
import { LogoTicker } from "./logo-ticker"
import { SliderControls } from "./controls"
import type { SliderProps, Testimonial, TransitionType } from "./types"

function buildVariants(type: TransitionType) {
  switch (type) {
    case "fade":
      return {
        initial: { opacity: 0, scale: 1 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
        exit: { opacity: 0, scale: 1, transition: { duration: 0.25 } },
      }
    case "zoom":
      return {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
        exit: { opacity: 0, scale: 0.97, transition: { duration: 0.25 } },
      }
    case "flip3d":
      return {
        initial: { rotateY: -90, opacity: 0 },
        animate: { rotateY: 0, opacity: 1, transition: { duration: 0.45 } },
        exit: { rotateY: 90, opacity: 0, transition: { duration: 0.35 } },
      }
    case "slide":
    default:
      return {
        initial: { x: 30, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.35 } },
        exit: { x: -30, opacity: 0, transition: { duration: 0.25 } },
      }
  }
}

function buildJsonLd(item: Testimonial) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: item.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: `${item.rating}`,
    },
    itemReviewed: {
      "@type": "Organization",
      name: item.designation?.split(",")?.[1]?.trim() || "Company",
    },
    reviewBody: item.quote,
  }
}

export function TestimonialSlider({
  items,
  layout = "split",
  transition = "slide",
  autoplay = true,
  autoplayDelay = 5000,
  showDots = true,
  showArrows = true,
  showProgress = true,
  enableFiltering = true,
  categories = ["All"],
  tickerColumns = 3,
}: SliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [playing, setPlaying] = useState(autoplay)
  const [category, setCategory] = useState<string>("All")
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setPlaying(entry.isIntersecting && !hovered && autoplay)
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, hovered])

  const filtered = useMemo(() => {
    if (category === "All") return items
    return items.filter((t) => t.category === category)
  }, [items, category])

  const variants = useMemo(
    () => (reduceMotion ? buildVariants("fade") : buildVariants(transition)),
    [reduceMotion, transition],
  )

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % filtered.length)
  }, [filtered.length])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    if (!playing || filtered.length <= 1 || reduceMotion) return
    const id = setInterval(next, autoplayDelay)
    return () => clearInterval(id)
  }, [playing, filtered.length, autoplayDelay, next, reduceMotion])

  useEffect(() => {
    setActiveIndex(0)
  }, [category])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName
      if (tag && ["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return
      if (target && (target.closest("button") || target.closest("a"))) return

      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  const startX = useRef<number | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) next()
      else prev()
    }
    startX.current = null
  }

  const active = filtered[activeIndex]

  useEffect(() => {
    if (!filtered || filtered.length < 2) return
    const prevIndex = (activeIndex - 1 + filtered.length) % filtered.length
    const nextIndex = (activeIndex + 1) % filtered.length
    const preloadSrcs = [
      filtered[prevIndex]?.photo,
      filtered[prevIndex]?.logo,
      filtered[nextIndex]?.photo,
      filtered[nextIndex]?.logo,
    ].filter(Boolean) as string[]

    preloadSrcs.forEach((src) => {
      try {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = src
      } catch {
        // swallow
      }
    })
  }, [activeIndex, filtered])

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div aria-live="polite" className="sr-only">
        {`Testimonial ${activeIndex + 1} of ${filtered.length}${
          active ? `, ${active.name}, ${active.designation}` : ""
        }`}
      </div>

      {enableFiltering && categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const isActive = c === category
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-md border px-3 py-1.5 text-sm transition ${
                  isActive ? "border-primary bg-secondary" : "hover:bg-secondary"
                }`}
                aria-pressed={isActive}
              >
                {c}
              </button>
            )
          })}
        </div>
      )}

      {layout === "split" && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div
            className="relative rounded-lg border bg-card p-6"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <AnimatePresence mode="wait">
              <motion.div key={active?.id} initial="initial" animate="animate" exit="exit" variants={variants}>
                {active && <TestimonialCard t={active} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6">
              <SliderControls
                length={filtered.length}
                activeIndex={activeIndex}
                onPrev={prev}
                onNext={next}
                onDot={setActiveIndex}
                showDots
                showArrows
                showProgress
                delay={autoplayDelay}
                playing={playing}
              />
            </div>
          </div>

          <div>
            <LogoTicker items={filtered} activeIndex={activeIndex} columns={tickerColumns} />
          </div>
        </div>
      )}

      {layout === "full" && (
        <div
          className="relative overflow-hidden rounded-lg border bg-card p-6"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              className="mx-auto max-w-3xl"
            >
              {active && <TestimonialCard t={active} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6">
            <SliderControls
              length={filtered.length}
              activeIndex={activeIndex}
              onPrev={prev}
              onNext={next}
              onDot={setActiveIndex}
              showDots
              showArrows
              showProgress
              delay={autoplayDelay}
              playing={playing}
            />
          </div>
        </div>
      )}

      {layout === "grid" && (
        <GridWithModal
          items={filtered}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          transitionVariants={variants}
        />
      )}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(filtered.map(buildJsonLd)),
        }}
      />
    </div>
  )
}

function GridWithModal({
  items,
  activeIndex,
  setActiveIndex,
  transitionVariants,
}: {
  items: Testimonial[]
  activeIndex: number
  setActiveIndex: (i: number) => void
  transitionVariants: any
}) {
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const openAt = (i: number) => {
    setActiveIndex(i)
    setOpen(true)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) {
      lastFocusedRef.current = (document.activeElement as HTMLElement) || null
      closeBtnRef.current?.focus()
    } else {
      lastFocusedRef.current?.focus?.()
    }
  }, [open])

  const onKeyDownTrap = (e: React.KeyboardEvent) => {
    if (!open || e.key !== "Tab" || !modalRef.current) return
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const focusables = Array.from(focusable).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => openAt(i)}
            className="group text-left"
            aria-label={`Open testimonial ${i + 1} by ${t.name}`}
          >
            <div className="rounded-lg border bg-card p-5 transition group-hover:border-primary">
              <p className="line-clamp-4 text-pretty text-sm text-muted-foreground">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-secondary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.designation}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Simple modal implementation */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Testimonial details"
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            ref={modalRef}
            className="w-full max-w-3xl rounded-lg border bg-background p-6"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDownTrap}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{`Testimonial ${activeIndex + 1} of ${items.length}`}</p>
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[activeIndex]?.id}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={transitionVariants}
                >
                  <TestimonialCard t={items[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Previous testimonial"
              >
                ← Prev
              </button>
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Next testimonial"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
