"use client"

import { ExternalLink, LockKeyhole } from "lucide-react"

import { profile } from "@/lib/profile"
import { AnimatedSection } from "./animated-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-0">
      <div className="relative z-10 mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Work
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Systems, Tools &amp; Deployments
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="py-8 sm:py-10">
            <AnimatedSection>
              <div className="border-b border-border">
                {profile.projects.map((project, index) => (
                  <Dialog key={project.title}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group grid w-full cursor-pointer border-x border-t border-border bg-background text-left transition-colors hover:bg-muted/30 lg:grid-cols-[9rem_minmax(0,1fr)_12rem]"
                      >
                        <div className="border-b border-border px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                          <span className="mb-4 block font-sans text-xs font-semibold tracking-[0.24em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="inline-flex border border-brand/30 bg-brand-muted px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand">
                            {project.status}
                          </span>
                        </div>

                        <div className="border-b border-border px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                          <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                            {project.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="border border-border bg-background px-2.5 py-1 font-sans text-[11px] font-medium text-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between px-5 py-5 lg:px-6 lg:py-6">
                          <div>
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                              Impact
                            </span>
                            <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
                              {project.impact}
                            </p>
                          </div>
                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                            View Details
                            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>

                    <DialogContent className="rounded-none shadow-none sm:max-w-xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                        <DialogDescription className="mt-2 text-base">
                          {project.description}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <div className="mb-5 flex flex-wrap gap-2">
                          <span className="border border-brand/30 bg-brand-muted px-2.5 py-1 font-sans text-xs font-semibold text-brand">
                            {project.status}
                          </span>
                          <span className="border border-border bg-background px-2.5 py-1 font-sans text-xs text-foreground">
                            {project.impact}
                          </span>
                        </div>
                        <h4 className="mb-2 font-medium text-foreground">Project Details</h4>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                          {project.details.split(". ").join(".\n\n")}
                        </p>
                        <div className="mt-6 border-l border-brand bg-muted/30 px-4 py-3">
                          <h4 className="text-sm font-semibold text-foreground">
                            My Contribution
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {project.contribution}
                          </p>
                        </div>
                        <div className="mt-6">
                          <h4 className="mb-3 font-medium text-foreground">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="border border-border bg-secondary px-2.5 py-1 font-sans text-xs text-foreground"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                          >
                            {project.linkLabel ?? "Open Project"}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 border border-border bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground">
                            <LockKeyhole className="h-4 w-4" />
                            Private Deployment
                          </span>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </AnimatedSection>
          </div>
          <div className="section-rail hidden border-l border-border sm:block" />
        </div>
      </div>
    </section>
  )
}
