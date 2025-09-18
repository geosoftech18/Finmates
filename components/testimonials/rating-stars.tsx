import { memo } from "react"

export const RatingStars = memo(function RatingStars({
  value,
  max = 5,
  label = "rating",
}: {
  value: number
  max?: number
  label?: string
}) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of ${max} ${label}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value
        return (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={filled ? "text-yellow-500" : "text-muted-foreground"}
            role="img"
          >
            <title>{filled ? "Star filled" : "Star empty"}</title>
            <path
              fill="currentColor"
              d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z"
            />
          </svg>
        )
      })}
      <span className="sr-only">{`${value} out of ${max} ${label}`}</span>
    </div>
  )
})
