import { MapPin, Download } from "lucide-react"
import { GridBackground } from "@/components/grid-background"
import { profile } from "@/lib/profile"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const [institutionPrefix, institutionSuffix] = profile.person.hero[1].split(
  profile.person.institution.shortName,
)

export function Hero() {
  return (
    <section id="about" className="relative px-6 pt-14 pb-0 sm:pt-14">
      <GridBackground />
      <div className="mx-auto max-w-5xl border-x border-t border-border bg-background px-6 py-10 relative z-10 sm:px-10 sm:py-14">
        <div>
          <div
            className="translate-y-0 opacity-100 transition-all duration-1000 ease-out"
          >
            <h1 className="font-display font-semibold text-5xl tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              {profile.person.name}
            </h1>
          </div>

          <div
            className="mt-6 flex translate-y-0 flex-wrap items-center justify-between gap-4 opacity-100 transition-all delay-200 duration-1000 ease-out"
          >
            <p className="text-base font-medium text-muted-foreground sm:text-lg">
              {profile.person.headline}
            </p>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.person.location}
            </span>
          </div>

          <div
            className="mt-12 max-w-3xl translate-y-0 space-y-6 opacity-100 transition-all delay-400 duration-1000 ease-out"
          >
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              {profile.person.hero[0]}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {institutionPrefix}
              <a
                href={profile.person.institution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {profile.person.institution.shortName}
              </a>
              {institutionSuffix}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.person.hero[2]}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 pb-4">
              <a
                href={`${basePath}/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#publications"
                className="inline-flex items-center border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                View Research
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
