const DEFAULT_CLASS =
  'text-p-2 font-semibold underline underline-offset-2 decoration-2 hover:text-p-3'

const LIGHT_CLASS =
  'text-[#60c8f0] font-semibold underline underline-offset-2 decoration-[#60c8f0]/70 hover:text-white'

/** Matches "Virtual CFO", "Virtual CFOs", "Virtual CFO services", etc. */
const VIRTUAL_CFO_PATTERN =
  /(Virtual CFO(?:s)?(?:\s+(?:services|service|team|engagement|expertise|offering))?)/gi

type Props = {
  text: string
  /** Link every match (default: first match only) */
  all?: boolean
  /** Use light-on-dark styling */
  variant?: 'default' | 'light'
  className?: string
}

/**
 * Turns "Virtual CFO" keyword phrases into visible SEO anchors
 * pointing at /services/cfo-services.
 */
export default function LinkifyVirtualCfo({
  text,
  all = false,
  variant = 'default',
  className,
}: Props) {
  const linkClass = className || (variant === 'light' ? LIGHT_CLASS : DEFAULT_CLASS)

  if (!text) return null

  if (!all) {
    VIRTUAL_CFO_PATTERN.lastIndex = 0
    const match = VIRTUAL_CFO_PATTERN.exec(text)
    if (!match || match.index === undefined) return <>{text}</>

    const before = text.slice(0, match.index)
    const after = text.slice(match.index + match[0].length)
    return (
      <>
        {before}
        <a href="/services/cfo-services" className={linkClass}>
          {match[0]}
        </a>
        {after}
      </>
    )
  }

  const parts = text.split(VIRTUAL_CFO_PATTERN)
  return (
    <>
      {parts.map((part, i) =>
        /^Virtual CFO/i.test(part) ? (
          <a key={i} href="/services/cfo-services" className={linkClass}>
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}
