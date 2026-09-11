import type { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  aside?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
}: SectionHeadingProps) {
  return (
    <header className="mb-10 sm:mb-14">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        {aside ? (
          <div className="text-sm text-muted-foreground sm:pb-1">{aside}</div>
        ) : null}
      </div>
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </header>
  )
}
