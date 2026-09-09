"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { profile, type Publication } from "@/lib/profile"
import { AnimatedSection } from "./animated-section"
import { PillButton } from "./pill-button"

function highlightName(authors: string) {
  const parts = authors.split(profile.person.name)

  if (parts.length === 1) {
    return <span>{authors}</span>
  }

  return (
    <span>
      {parts[0]}
      <span className="font-semibold text-foreground">{profile.person.name}</span>
      {parts.slice(1).join(profile.person.name)}
    </span>
  )
}

function PublicationItem({ publication }: { publication: Publication }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h3 className="flex-1 pr-4 text-lg font-semibold leading-snug text-foreground">
          {publication.title}
        </h3>

        <div className="flex shrink-0 items-center gap-4">
          <PillButton href={publication.link} label={publication.linkLabel} />
          <button
            type="button"
            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={isOpen ? "Collapse abstract" : "Expand abstract"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {highlightName(publication.authors)}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <span className="border border-brand bg-brand px-2.5 py-1 font-sans text-xs font-semibold text-brand-foreground">
          {publication.tag}
        </span>
        <span className="border border-border bg-background px-2.5 py-1 font-sans text-xs text-muted-foreground">
          {publication.type}
        </span>
        {publication.status ? (
          <span className="border border-brand/30 bg-brand-muted px-2.5 py-1 font-sans text-xs font-medium text-brand">
            {publication.status}
          </span>
        ) : null}
      </div>

      {publication.resources.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {publication.resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border bg-background px-2.5 py-1 font-sans text-xs font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              {resource.label}
            </a>
          ))}
        </div>
      ) : null}

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-2 border-l border-brand bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold text-foreground">Abstract</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {publication.abstract}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Publications() {
  return (
    <section id="publications" className="relative px-6 py-0">
      <div className="relative z-10 mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Research
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Spotlight Research
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="pb-8 sm:pb-10">
            <div className="flex flex-col border-b border-border">
              {profile.publications.map((publication) => (
                <div
                  key={publication.id}
                  className="border-x border-t border-border bg-background px-5 py-6 sm:px-6 sm:py-8"
                >
                  <PublicationItem publication={publication} />
                </div>
              ))}
            </div>

            <AnimatedSection delay={400}>
              <div className="mt-10 flex justify-center">
                <PillButton href={profile.links.scholar} label="View All on Google Scholar" />
              </div>
            </AnimatedSection>
          </div>
          <div className="section-rail hidden border-l border-border sm:block" />
        </div>
      </div>
    </section>
  )
}
