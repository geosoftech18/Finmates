"use client"

import React from "react"

type Item = {
  title: string
  desc: string
  bg: string // "bg-p" or "white" (we normalize to "bg-white" below)
  titleClass: string
  textClass: string
  icon: string
}

export default function WorkingProcessCarousel({
  items,
  intervalMs = 2500,
  transitionMs = 600,
}: {
  items: Item[]
  intervalMs?: number
  transitionMs?: number
}) {
  // Normalize backgrounds: accept "white" from page and convert to "bg-white"
  const normalized = React.useMemo(
    () =>
      items.map((it) => ({
        ...it,
        bg: it.bg === "white" ? "bg-white" : it.bg,
      })),
    [items],
  )

  // We duplicate the array to allow seamless looping
  const base = normalized.length
  const display = React.useMemo(() => [...normalized, ...normalized, ...normalized], [normalized])

  // Determine items per view responsively: 1 on < md, 5 on >= md
  const [itemsPerView, setItemsPerView] = React.useState(5)
  React.useEffect(() => {
    const compute = () => setItemsPerView(window.innerWidth < 768 ? 1 : 5)
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  const step = 100 / itemsPerView
  const [index, setIndex] = React.useState(base) // start in middle copy
  const [anim, setAnim] = React.useState(true)

  // Pause on hover
  const [paused, setPaused] = React.useState(false)

  // Auto-advance
  React.useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setAnim(true)
      setIndex((i) => i + 1) // rotate by one card each tick
    }, intervalMs)
    return () => clearInterval(t)
  }, [intervalMs, paused])

  // Seamless loop reset when we advanced through one full set
  React.useEffect(() => {
    if (index >= base + base) {
      const id = setTimeout(() => {
        setAnim(false)
        setIndex(base) // snap back to the middle copy
      }, transitionMs)
      return () => clearTimeout(id)
    }
  }, [index, base, transitionMs])

  // Reset position if layout changes (e.g., resize changed itemsPerView)
  React.useEffect(() => {
    setAnim(false)
    setIndex(base)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerView])

  const trackStyle: React.CSSProperties = {
    transform: `translateX(-${index * step}%)`,
    transition: anim ? `transform ${transitionMs}ms ease` : "none",
  }

  const activeDot = (index - base + base) % base

  return (
    <div className="w-full " >
      {/* Viewport */}
      <div className="relative w-full overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {/* Track */}
        <div className="flex w-full gap-0" style={trackStyle}>
          {display.map((item, i) => (
            <div
              key={i}
              className={`shrink-0 grow-0 basis-full md:basis-1/5`}
              aria-hidden={i < base || i >= base + base ? true : undefined}
            >
              {/* Card (keeps original UI; removed external max-width so no gaps) */}
              {(() => {
                // Alternate background if not provided explicitly
                const effectiveBg = item.bg ? item.bg : i % 2 === 0 ? "bg-white" : "bg-p"
                return (
                  <div
                    className={`group relative flex aspect-square min-h-[320px] md:min-h-[384px] w-full max-w-[300px] flex-col items-start justify-center overflow-hidden border border-gray-300 px-6 md:px-10 ${effectiveBg}`}
                  >
                    <div className="flex items-center justify-center rounded-full bg-secondary">
                      <img
                        alt={item.title}
                        width={64}
                        height={64}
                        className="m-auto h-16 w-16 rounded-full object-cover"
                        src={item.icon || "/placeholder.svg?height=64&width=64&query=working-process-icon"}
                      />
                    </div>
                    <div className="mt-5 flex flex-col items-start justify-center gap-4">
                      <h3 className={`text-md text-start font-medium lg:text-lg ${item.titleClass}`}>{item.title}</h3>
                      <p className={`line-clamp-3 text-start text-sm lg:text-base ${item.textClass}`}>{item.desc}</p>
                    </div>

                    {/* Hover overlay slides up from bottom with same bg and covers full card */}
                    <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${effectiveBg} px-6 md:px-8 pt-6 md:pt-8 pb-6 flex flex-col justify-end`}> 
                      <h4 className={`text-lg md:text-xl font-semibold ${item.titleClass}`}>{item.title}</h4>
                      <p className={`mt-2 text-sm md:text-lg ${item.textClass}`}>{item.desc}</p>
                    </div>
                  </div>
                )
              })()}
            </div>
          ))}
        </div>

        {/* Mobile-only dots (no arrows) */}
        <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
          {Array.from({ length: base }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === activeDot ? "bg-p-2" : "bg-gray-300"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
