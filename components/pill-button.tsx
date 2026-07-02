import { ArrowUpRight } from "lucide-react"

export function PillButton({
  href,
  label = "View",
}: {
  href: string
  label?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-brand-foreground"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}
