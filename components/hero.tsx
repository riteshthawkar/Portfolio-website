import { MapPin, Download } from "lucide-react"
import { GridBackground } from "@/components/grid-background"
import { profile } from "@/lib/profile"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const [institutionPrefix, institutionSuffix] = profile.person.hero[1].split(
  profile.person.institution.shortName,
)
const visiblePublications = profile.publications.filter(
  (publication) => publication.includeInProfile,
)
const firstAuthorPublications = visiblePublications.filter(
  (publication) => publication.authors.split(",")[0]?.trim() === profile.person.name,
)
const heroMetrics = [
  { value: visiblePublications.length, label: "Publications" },
  { value: firstAuthorPublications.length, label: "First-author work" },
  {
    value: profile.projects.filter((project) => project.cvFeatured).length,
    label: "Featured systems",
  },
]

export function Hero() {
  return (
    <section id="about" className="relative px-6 pb-0 pt-10 sm:pt-14">
      <GridBackground />
      <div className="relative z-10 mx-auto max-w-5xl border-x border-t border-border bg-background px-5 py-8 sm:px-10 sm:py-14">
        <div>
          <div
            className="translate-y-0 opacity-100 transition-all duration-1000 ease-out"
          >
            <h1 className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              {profile.person.name}
            </h1>
          </div>

          <div
            className="mt-4 flex translate-y-0 flex-wrap items-center justify-between gap-3 opacity-100 transition-all delay-200 duration-1000 ease-out sm:mt-6 sm:gap-4"
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
            className="mt-7 max-w-3xl translate-y-0 space-y-4 opacity-100 transition-all delay-400 duration-1000 ease-out sm:mt-12 sm:space-y-6"
          >
            <p className="text-lg leading-relaxed text-foreground sm:text-2xl">
              {profile.person.hero[0]}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-lg">
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
            <p className="hidden text-base leading-relaxed text-muted-foreground sm:block sm:text-lg">
              {profile.person.hero[2]}
            </p>

            <div className="flex flex-wrap items-center gap-3 pb-1 pt-1 sm:pb-4 sm:pt-2">
              <a
                href={`${basePath}/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 font-sans text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#publications"
                className="inline-flex items-center border border-border bg-background px-5 py-3 font-sans text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                View Research
              </a>
            </div>

            <dl className="grid grid-cols-3 border border-border bg-background">
              {heroMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`min-w-0 px-3 py-3 sm:px-5 sm:py-4 ${
                    index > 0 ? "border-l border-border" : ""
                  }`}
                >
                  <dt className="text-[10px] font-medium uppercase text-muted-foreground sm:text-xs">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
