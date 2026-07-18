type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/** Renders JSON-LD for Google rich results. No UI impact. */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data]

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
