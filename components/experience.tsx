"use client"

import { AnimatedSection } from "./animated-section"
import { formatExperiencePeriod, profile } from "@/lib/profile"

export function Experience() {
  const experiences = profile.experiences
    .filter((experience) => experience.includeInPortfolio)
    .toSorted((a, b) => b.startDate.localeCompare(a.startDate))

  return (
    <section id="experience" className="px-6 py-0 relative">
      <div className="mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background relative z-10">
        {/* Experience */}
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Career
            </p>
            <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
              Experience
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="py-8 sm:py-10">
            <AnimatedSection>
              <div>
                {experiences.map((exp, i) => (
                  <div
                    key={exp.id}
                    className="grid border-x border-t border-border bg-background lg:grid-cols-[12rem_minmax(0,1fr)]"
                  >
                    <div className="border-b border-border px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                      <span className="mb-4 block font-sans text-xs font-semibold tracking-[0.24em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-foreground">
                        {formatExperiencePeriod(exp)}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {exp.location}
                      </p>
                    </div>

                    <div className="px-5 py-5 sm:px-6 sm:py-6">
                      <div className="mb-5">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground">
                          {exp.role}
                        </h3>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-sm font-medium text-brand underline decoration-transparent underline-offset-4 transition-colors hover:decoration-brand"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <p className="mt-2 text-sm font-medium text-brand">
                            {exp.company}
                          </p>
                        )}
                      </div>

                      <ul className="border-t border-border">
                        {exp.highlights.map((h, hi) => (
                          <li
                            key={h}
                            className="grid grid-cols-[2.75rem_minmax(0,1fr)] border-b border-border"
                          >
                            <span className="flex items-start justify-center border-r border-border pt-4 font-sans text-[10px] font-semibold tracking-wider text-muted-foreground">
                              {String(hi + 1).padStart(2, "0")}
                            </span>
                            <span className="px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-5">
                              {h}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection>
              <div className="border-x border-t border-border bg-background px-6 py-10 sm:px-10 sm:py-12">
                <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Academic
                </p>
                <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
                  Education
                </h2>
              </div>
            </AnimatedSection>

            <div className="border-b border-border">
              {profile.education.map((edu) => (
                <div
                  key={edu.school}
                  className="grid border-x border-t border-border bg-background md:grid-cols-[minmax(0,1fr)_11rem_8rem]"
                >
                  <div className="border-b border-border px-5 py-5 md:border-b-0 md:border-r md:px-6">
                    <h3 className="text-base font-semibold leading-tight text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      {edu.school}
                    </p>
                  </div>
                  <div className="border-b border-border px-5 py-5 md:border-b-0 md:border-r md:px-6">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Period
                    </span>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {edu.period}
                    </p>
                  </div>
                  <div className="px-5 py-5 md:px-6">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      GPA
                    </span>
                    <p className="mt-2 text-sm font-semibold text-brand">
                      {edu.gpa}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="section-rail hidden border-l border-border sm:block" />
        </div>
      </div>
    </section>
  )
}
