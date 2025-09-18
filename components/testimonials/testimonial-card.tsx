"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { RatingStars } from "./rating-stars"
import type { Testimonial } from "./types"

export function TestimonialCard({ t }: { t: Testimonial }) {
  const hasVideo = !!t.video

  return (
    <article
      className="relative flex w-full  flex-col gap-5 md:gap-6"
      aria-label={`Testimonial by ${t.name}, ${t.designation}`}
    >
      {/* Media block */}
      <div className="flex items-center gap-4  ">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-secondary">
          {t.photo && (
            <Image
              src={t.photo || "/placeholder.svg"}
              alt={`${t.name} portrait`}
              fill
              sizes="64px"
              className="object-cover"
              priority={false}
            />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-pretty">{t.name}</h3>
          <p className="text-sm text-muted-foreground text-pretty">{t.designation}</p>
        </div>
        {t.logo && (
          <div className="ml-auto h-8 w-24 relative">
            <Image
              src={t.logo || "/placeholder.svg"}
              alt={`${t.name} company logo`}
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 6 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: "easeOut", staggerChildren: 0.04 },
          },
        }}
        className="space-y-4"
      >
        {hasVideo ? (
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary"
          >
            {t.video?.includes("embed") ? (
              <iframe
                className="h-full w-full"
                src={t.video}
                title={`${t.name} video testimonial`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video className="h-full w-full object-cover" src={t.video ?? undefined} controls preload="none" />
            )}
          </motion.div>
        ) : (
          <motion.blockquote
            className="text-balance text-lg leading-relaxed md:text-xl"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            “{t.quote}”
          </motion.blockquote>
        )}

        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          className="flex items-center justify-between"
        >
          <RatingStars value={t.rating} />
          {t.link && (
            <Link
              href={t.link}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Read case study
              <span className="sr-only">{` for ${t.name}`}</span>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </article>
  )
}
