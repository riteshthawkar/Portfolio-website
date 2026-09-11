import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  return (
    <div className={className}>{children}</div>
  )
}
