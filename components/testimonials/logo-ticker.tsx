"use client"

import Image from "next/image"
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import type { Testimonial } from "./types"

export function LogoTicker({
  items,
  activeIndex,
  columns = 3,
}: {
  items: Testimonial[]
  activeIndex: number
  columns?: 2 | 3 | 4
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: "-20% 0px" })
  const controls = useAnimation()
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const logos = useMemo(() => items.map((t) => ({ id: t.id, src: t.logo, alt: `${t.name} company logo` })), [items])

  useEffect(() => {
    if (paused || !inView || reduceMotion) {
      controls.stop()
      return
    }
    controls.start({
      y: ["0%", "-50%"],
      transition: {
        duration: 18,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    })
  }, [controls, paused, inView, reduceMotion])

  return (
    <div
      ref={ref}
      className="relative h-[420px] w-full overflow-hidden rounded-lg border bg-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Client logos"
    >
      <motion.div animate={reduceMotion ? undefined : controls} className="absolute left-0 top-0 w-full">
        <div
          className={`grid w-full gap-6 p-6`}
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {[...logos, ...logos].map((logo, idx) => {
            const originalIndex = idx % logos.length
            const isActive = originalIndex === activeIndex
            return (
              <div
                key={`${logo.id}-${idx}`}
                className={`relative mx-auto flex h-14 w-28 items-center justify-center rounded-md border transition
                  ${isActive ? "scale-105 border-primary bg-secondary" : "opacity-70 grayscale"}`}
                aria-current={isActive ? "true" : "false"}
              >
                {logo.src && (
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                    loading="lazy"
                  />
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
