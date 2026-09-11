import { profile } from "@/lib/profile"

import { AnimatedSection } from "./animated-section"
import { SectionHeading } from "./section-heading"

export function ResearchFocus() {
  return (
    <section id="focus" className="site-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Research direction"
          title="What I investigate"
          aside={`${profile.research.focusAreas.length} active themes`}
        />

        <AnimatedSection>
          <div className="grid gap-10 sm:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] sm:gap-14">
            <div>
              <p className="text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">
                {profile.research.narrative}
              </p>
              <p className="mt-6 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {profile.research.openTo.join(" ")}
              </p>
            </div>

            <ol className="space-y-6">
              {profile.research.focusAreas.map((area, index) => (
                <li key={area} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                  <span className="text-xs text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{area}</p>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
