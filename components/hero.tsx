import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react"

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
    label: "Deployed systems",
  },
]

export function Hero() {
  return (
    <section id="about" className="scroll-mt-20 px-6 pb-4 pt-28 sm:pb-8 sm:pt-36">
      <div className="site-shell">
        <div className="hero-reveal flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {profile.person.location}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Open to research collaboration
          </span>
        </div>

        <div className="mt-14 max-w-3xl sm:mt-20">
          <p className="hero-reveal text-sm font-medium text-brand [animation-delay:80ms]">
            {profile.person.currentRole}
          </p>
          <h1 className="hero-reveal mt-3 font-display text-5xl font-semibold text-foreground [animation-delay:140ms] sm:text-6xl">
            {profile.person.name}
          </h1>
          <p className="hero-reveal mt-3 text-xl text-muted-foreground [animation-delay:200ms] sm:text-2xl">
            {profile.person.headline}
          </p>

          <div className="hero-reveal mt-8 max-w-2xl space-y-4 [animation-delay:280ms]">
            <p className="text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">
              {profile.person.hero[0]}
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              {institutionPrefix}
              <a
                href={profile.person.institution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-brand"
              >
                {profile.person.institution.shortName}
              </a>
              {institutionSuffix}
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              {profile.person.hero[2]}
            </p>
          </div>

          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3 [animation-delay:360ms]">
            <a
              href={`${basePath}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#publications"
              className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              View publications
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <dl className="hero-reveal mt-14 grid grid-cols-3 border-y border-border [animation-delay:440ms] sm:mt-20">
          {heroMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`min-w-0 py-4 sm:py-5 ${index > 0 ? "border-l border-border pl-4 sm:pl-6" : ""}`}
            >
              <dd className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {metric.value}
              </dd>
              <dt className="mt-1 text-[11px] leading-4 text-muted-foreground sm:text-xs">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>

        <a
          href="#focus"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Research direction
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
