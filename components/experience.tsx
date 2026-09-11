"use client"

import { ArrowUpRight } from "lucide-react"

import { AnimatedSection } from "./animated-section"
import { SectionHeading } from "./section-heading"
import { formatExperiencePeriod, profile } from "@/lib/profile"

export function Experience() {
  const experiences = profile.experiences
    .filter((experience) => experience.includeInPortfolio)
    .toSorted((a, b) => b.startDate.localeCompare(a.startDate))

  return (
    <section id="experience" className="site-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Background"
          title="Experience"
          aside={`${experiences.length} roles`}
        />

        <AnimatedSection>
          <div className="space-y-14 sm:space-y-16">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="grid gap-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10"
              >
                <div className="text-sm text-muted-foreground">
                  <p>{formatExperiencePeriod(experience)}</p>
                  <p className="mt-1">{experience.location}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">{experience.role}</h3>
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-foreground"
                    >
                      {experience.company}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-brand">{experience.company}</p>
                  )}

                  <ul className="mt-5 space-y-3">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-2 text-sm leading-6 text-muted-foreground">
                        <span className="mt-2.5 h-1 w-1 bg-brand" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={120} className="mt-16 sm:mt-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-foreground">Education</h3>
            <span className="text-xs text-muted-foreground">{profile.education.length} programs</span>
          </div>
          <div className="space-y-10 sm:space-y-12">
            {profile.education.map((education) => (
              <article
                key={education.school}
                className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-8"
              >
                <div>
                  <h4 className="text-base font-semibold leading-6 text-foreground">
                    {education.degree}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{education.school}</p>
                </div>
                <div className="text-sm text-muted-foreground sm:text-right">
                  <p>{education.period}</p>
                  <p className="mt-1">{education.location}</p>
                  <p className="mt-1 font-medium text-brand">GPA {education.gpa}</p>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
