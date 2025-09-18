export type TransitionType = "slide" | "fade" | "zoom" | "flip3d"
export type LayoutType = "split" | "full" | "grid"

export interface Testimonial {
  id: number | string
  name: string
  designation: string
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
  photo?: string | null
  logo?: string | null
  video?: string | null // YouTube/Vimeo embed URL or MP4
  link?: string | null
  category?: string | null
}

export interface SliderProps {
  items: Testimonial[]
  layout?: LayoutType
  transition?: TransitionType
  autoplay?: boolean
  autoplayDelay?: number
  showDots?: boolean
  showArrows?: boolean
  showProgress?: boolean
  enableFiltering?: boolean
  categories?: string[]
  tickerColumns?: 2 | 3 | 4
}
