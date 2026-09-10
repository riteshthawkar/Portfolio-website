"use client"

import Image from "next/image"
import { ArrowUpRight, ExternalLink, LockKeyhole } from "lucide-react"

import { profile } from "@/lib/profile"
import { AnimatedSection } from "./animated-section"
import { SectionHeading } from "./section-heading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const projectImages: Record<string, string> = {
  "MBZUAI Web Agent Suite": `${basePath}/images/proj-webagent.jpg`,
  "Lawa Agent Studio": `${basePath}/images/proj-lawa-studio.jpg`,
  "Lawa.ai": `${basePath}/images/proj-lawa.jpg`,
  "Nutrigenics.care": `${basePath}/images/proj-nutrigenics.jpg`,
}

export function Projects() {
  return (
    <section id="projects" className="site-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Built to be used"
          description="Research systems, production agents, and open-source tools shaped around measurable use."
          aside={`${profile.projects.length} systems`}
        />

        <AnimatedSection>
          <div className="border-t border-border">
            {profile.projects.map((project, index) => {
              const image = projectImages[project.title]

              return (
                <Dialog key={project.title}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="group grid w-full cursor-pointer gap-5 border-b border-border py-6 text-left transition-colors hover:bg-muted/30 sm:grid-cols-[7.5rem_minmax(0,1fr)_2.5rem] sm:items-center sm:px-2"
                    >
                      {image ? (
                        <span className="relative hidden aspect-[4/3] overflow-hidden border border-border bg-white sm:block">
                          <Image
                            src={image}
                            alt={`${project.title} interface preview`}
                            fill
                            sizes="120px"
                            className="object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                          />
                        </span>
                      ) : (
                        <span className="hidden aspect-[4/3] items-center justify-center border border-border text-sm text-muted-foreground sm:flex">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}

                      <span className="min-w-0">
                        <span className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                          <span className="font-medium text-brand">{project.status}</span>
                          <span className="text-border" aria-hidden="true">/</span>
                          <span className="text-muted-foreground">{project.impact}</span>
                        </span>
                        <span className="block text-xl font-semibold text-foreground transition-colors group-hover:text-brand">
                          {project.title}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                          {project.description}
                        </span>
                        <span className="mt-3 block text-xs leading-5 text-muted-foreground">
                          {project.tools.join(" / ")}
                        </span>
                      </span>

                      <span className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-brand group-hover:text-brand">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                  </DialogTrigger>

                  <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-background shadow-none sm:max-w-xl">
                    <DialogHeader>
                      <p className="text-xs font-medium text-brand">{project.status}</p>
                      <DialogTitle className="font-display text-2xl font-semibold">
                        {project.title}
                      </DialogTitle>
                      <DialogDescription className="mt-2 text-sm leading-6">
                        {project.description}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-3">
                      <div className="border-y border-border py-4">
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{project.impact}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-foreground">Project details</h4>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                          {project.details.split(". ").join(".\n\n")}
                        </p>
                      </div>

                      <div className="mt-6 border-l border-brand pl-4">
                        <h4 className="text-sm font-semibold text-foreground">My contribution</h4>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {project.contribution}
                        </p>
                      </div>

                      <div className="mt-6">
                        <h4 className="mb-3 text-sm font-semibold text-foreground">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="border border-border bg-secondary px-2.5 py-1 text-xs text-foreground"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex justify-end">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                        >
                          {project.linkLabel ?? "Open project"}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium text-muted-foreground">
                          <LockKeyhole className="h-4 w-4" />
                          Private deployment
                        </span>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
