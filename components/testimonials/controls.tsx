"use client"

import { useEffect, useMemo } from "react"

export function SliderControls({
  length,
  activeIndex,
  onPrev,
  onNext,
  onDot,
  showDots = true,
  showArrows = true,
  showProgress = true,
  delay = 5000,
  playing,
}: {
  length: number
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onDot: (i: number) => void
  showDots?: boolean
  showArrows?: boolean
  showProgress?: boolean
  delay?: number
  playing: boolean
}) {
  const pct = useMemo(() => 100 * ((activeIndex + 1) / length), [activeIndex, length])

  // CSS-based progress bar animation could be added; for simplicity we show segment fill
  useEffect(() => {
    // placeholder to sync any timed progress indicators if needed
  }, [activeIndex, delay, playing])

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {showArrows && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-md border bg-background px-3 py-2 text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Previous testimonial"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md border bg-background px-3 py-2 text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Next testimonial"
          >
            Next →
          </button>
        </div>
      )}

      {showDots && (
        <div className="flex items-center gap-2">
          {Array.from({ length }).map((_, i) => {
            const active = i === activeIndex
            return (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={active ? "true" : "false"}
                className={`h-2 w-2 rounded-full ${active ? "bg-primary" : "bg-muted-foreground/40"}`}
                onClick={() => onDot(i)}
              />
            )
          })}
        </div>
      )}

      {showProgress && (
        <div className="relative h-1 w-40 overflow-hidden rounded bg-muted">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
            aria-hidden="true"
          />
          <span className="sr-only">{`Slide ${activeIndex + 1} of ${length}`}</span>
        </div>
      )}
    </div>
  )
}
