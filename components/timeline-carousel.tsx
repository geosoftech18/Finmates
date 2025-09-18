"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type TimelineItem = {
  year: number
  title: string
  subtitle?: string
  tone?: "blue" | "green" | "purple" | "orange" | "neutral"
  description?: string
}

function toneClasses(tone: TimelineItem["tone"]) {
  switch (tone) {
    case "green":
      return {
        dot: "bg-gradient-to-r from-green-500 to-blue-600",
        ring: "border-green-300",
        text: "text-green-600",
        chip: "from-green-600 to-blue-600",
        bar: "from-green-600 to-blue-600",
        cardRing: "border-green-200",
        cardBg: "from-white to-green-50",
      }
    case "purple":
      return {
        dot: "bg-gradient-to-r from-purple-500 to-pink-600",
        ring: "border-purple-300",
        text: "text-purple-600",
        chip: "from-purple-600 to-pink-600",
        bar: "from-purple-600 to-pink-600",
        cardRing: "border-purple-200",
        cardBg: "from-white to-purple-50",
      }
    case "orange":
      return {
        dot: "bg-gradient-to-r from-orange-500 to-red-600",
        ring: "border-orange-300",
        text: "text-orange-600",
        chip: "from-orange-600 to-red-600",
        bar: "from-orange-600 to-red-600",
        cardRing: "border-orange-200",
        cardBg: "from-white to-orange-50",
      }
    case "blue":
      return {
        dot: "bg-gradient-to-r from-blue-500 to-purple-600",
        ring: "border-blue-300",
        text: "text-blue-600",
        chip: "from-blue-600 to-purple-600",
        bar: "from-blue-600 to-purple-600",
        cardRing: "border-blue-200",
        cardBg: "from-white to-blue-50",
      }
    default:
      return {
        dot: "bg-gradient-to-r from-gray-600 to-gray-500",
        ring: "border-gray-300",
        text: "text-gray-600",
        chip: "from-gray-600 to-gray-500",
        bar: "from-gray-600 to-gray-500",
        cardRing: "border-gray-200",
        cardBg: "from-white to-gray-50",
      }
  }
}

export function TimelineCarousel({
  items,
  className,
  heading = "Our Journey",
}: {
  items: TimelineItem[]
  className?: string
  heading?: string
}) {
  // Exactly 4 visible; startIndex defines leftmost item
  const [startIndex, setStartIndex] = React.useState(0)
  const itemCount = items.length

  const goNext = React.useCallback(() => {
    setStartIndex((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  const goPrev = React.useCallback(() => {
    setStartIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }, [itemCount])

  // Special: on hover of the "next after 4th" preview, rotate so current 4th becomes first
  const handlePeekHover = React.useCallback(() => {
    setStartIndex((prev) => (prev + 3) % itemCount)
  }, [itemCount])

  const at = React.useCallback((i: number) => items[((i % itemCount) + itemCount) % itemCount], [items, itemCount])

  // For the main line under cards
  const currentFour = [0, 1, 2, 3].map((i) => at(startIndex + i))

  return (
    <section className={cn("w-full", className)} aria-label="Company journey timeline carousel">
      <header className="mb-8 flex items-center justify-center">
        <h2 className="text-pretty text-3xl font-bold">{heading}</h2>
      </header>

      <div className="relative">
        {/* Navigation buttons positioned on left and right sides */}
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <Button variant="outline" size="icon" onClick={goPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <Button variant="outline" size="icon" onClick={goNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {/* Decorative base line */}
        <div
          className="absolute left-0 top-4/5 h-1 w-full rounded-full bg-gradient-to-r from-blue-200 via-blue-500 to-blue-700"
          style={{ transform: "translateY(20px)" }}
          aria-hidden="true"
        />

        {/* Viewport: exactly 4 cards */}
        <div className="overflow-x-hidden overflow-y-visible rounded-lg  pt-72 pb-10 min-h-72">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${startIndex * 25}%)` }}
            role="list"
            aria-label="Timeline items"
          >
            {items.map((item, i) => {
              const tone = toneClasses(item.tone || "blue")
              return (
                <div key={`${item.year}-${i}`} role="listitem" className="w-1/4 shrink-0 grow-0 p-4">
                  <div className="group relative flex flex-col items-center">
                    {/* Floating info card on hover (match style from your original) */}
                    <div
                      className="absolute -top-6 z-20 hidden w-72 -translate-y-52 rounded-xl border bg-gradient-to-br p-6 shadow-2xl group-hover:block md:-translate-y-60 lg:-translate-y-60 xl:-translate-y-60 2xl:-translate-y-60"
                      style={{ pointerEvents: "none" }}
                      // color accents
                      aria-hidden="true"
                    >
                      <div className={cn("flex items-center justify-between mb-3")}>
                        <p
                          className={cn(
                            "text-sm font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r",
                            tone.chip,
                          )}
                        >
                          {item.title}
                        </p>
                        <div className="flex items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full animate-pulse", tone.dot)} />
                          <span className={cn("text-xs font-semibold", tone.text)}>{item.subtitle || "Active"}</span>
                        </div>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {item.description || "Key achievements and progress milestones."}
                      </p>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex-1 h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={cn(
                              "h-full w-full rounded-full bg-gradient-to-r transition-all duration-1000",
                              tone.bar,
                            )}
                          />
                        </div>
                        <span className={cn("text-sm font-semibold", tone.text)}>100%</span>
                      </div>
                      <div className={cn("rounded-lg border p-3 bg-gradient-to-r", tone.cardBg, tone.cardRing)}>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div>
                            <div className={cn("text-lg font-bold", tone.text)}>{item.year}</div>
                            <div className="text-xs text-slate-600">Milestone</div>
                          </div>
                          <div>
                            <div className={cn("text-lg font-bold", tone.text)}>{item.title}</div>
                            <div className="text-xs text-slate-600">Status</div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                    </div>

                    {/* Label above dot */}
                    <p className="mb-2 -translate-y-8 text-center text-lg font-semibold text-blue-500 transition-all duration-300 group-hover:scale-105 group-hover:text-blue-700">
                      {item.title}
                    </p>

                    {/* Dot */}
                    <div className="relative mt-8">
                      <div
                        className={cn(
                          "z-10 h-5 w-5 rounded-full transition-all duration-300 bg-black group-hover:scale-125 group-hover:shadow-lg",
                          "group-hover:bg-gradient-to-r",
                          tone.dot,
                        )}
                      />
                      <div
                        className={cn(
                          "absolute -left-[2px] -top-[2px] inset-0 rounded-full opacity-0 group-hover:opacity-50",
                          tone.ring,
                          "border-2 animate-spin-slow",
                        )}
                        style={{ width: "28px", height: "28px" }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Year under dot */}
                    <p className={cn("mt-4 text-sm transition-colors duration-300", tone.text)}>{item.year}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hover peek for next item (after the 4th). Hovering rotates so 4th becomes first */}
        <div
          className="pointer-events-auto absolute right-2 top-4/5 hidden -translate-y-1/2 md:block"
          onMouseEnter={handlePeekHover}
          aria-hidden="false"
        >
          <div className="flex items-center gap-2 rounded-md bg-background/70 px-2 py-1 ring-1 ring-border backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <div className="text-xs text-muted-foreground">Next</div>
            <div className="text-sm font-medium">{at(startIndex + 4).year}</div>
          </div>
        </div>

        {/* Dots per page of 4 */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: Math.ceil(itemCount / 4) }).map((_, page) => {
            const pageStart = page * 4
            const active = startIndex >= pageStart && startIndex <= Math.min(pageStart + 3, itemCount - 1)
            return (
              <button
                key={page}
                aria-label={`Go to slide ${page + 1}`}
                className={cn("h-2 w-2 rounded-full transition-colors", active ? "bg-foreground" : "bg-muted")}
                onClick={() => setStartIndex(pageStart)}
              />
            )
          })}
        </div>
      </div>

      {/* Accessibility hints */}
      <div className="sr-only" aria-live="polite">
        Visible years: {currentFour.map((i) => i.year).join(", ")}
      </div>

      {/* Add local spin-slow animation */}
      <style jsx>{`
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </section>
  )
}
