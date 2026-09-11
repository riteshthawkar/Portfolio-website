"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { profile, type Publication } from "@/lib/profile"
import { AnimatedSection } from "./animated-section"
import { SectionHeading } from "./section-heading"

const INITIAL_PUBLICATION_COUNT = 5
const PUBLICATION_PAGE_SIZE = 5

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

function PublicationItem({
  publication,
  index,
}: {
  publication: Publication
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="group [content-visibility:auto] [contain-intrinsic-size:auto_16rem]">
      <div className="grid gap-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-5">
        <span className="text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <span className="font-medium text-brand">{publication.tag}</span>
            <span className="text-border" aria-hidden="true">/</span>
            <span className="text-muted-foreground">{publication.type}</span>
            {publication.status ? (
              <>
                <span className="text-border" aria-hidden="true">/</span>
                <span className="text-muted-foreground">{publication.status}</span>
              </>
            ) : null}
          </div>

          <h3 className="text-lg font-semibold leading-6 text-foreground transition-colors group-hover:text-brand sm:text-xl sm:leading-7">
            {publication.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {highlightName(publication.authors)}
          </p>

          {publication.resources.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {publication.resources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-brand"
                >
                  {resource.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          ) : null}

          <div
            className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {publication.abstract}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:justify-end">
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            title={publication.linkLabel}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">{publication.linkLabel}</span>
          </a>
          <button
            type="button"
            title={isOpen ? "Hide abstract" : "Read abstract"}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={isOpen ? "Collapse abstract" : "Expand abstract"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </article>
  )
}

export function Publications() {
  const publications = useMemo(
    () =>
      profile.publications
        .filter((publication) => publication.includeInProfile)
        .toSorted((a, b) => b.sortDate.localeCompare(a.sortDate)),
    [],
  )
  const [visibleCount, setVisibleCount] = useState(INITIAL_PUBLICATION_COUNT)
  const displayedPublications = publications.slice(0, visibleCount)
  const remainingPublicationCount = publications.length - displayedPublications.length

  return (
    <section id="publications" className="site-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Research output"
          title="Publications"
          description="Peer-reviewed work and preprints, ordered by release date."
          aside={
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <span>{publications.length} papers</span>
              <a
                href={profile.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 border border-border px-3 font-medium text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Google Scholar
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          }
        />

        <AnimatedSection>
          <p className="text-right text-xs text-muted-foreground" aria-live="polite">
            Showing {displayedPublications.length} of {publications.length}
          </p>

          <div id="publication-list" className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
            {displayedPublications.map((publication, index) => (
              <PublicationItem key={publication.id} publication={publication} index={index} />
            ))}
            {remainingPublicationCount > 0 ? (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  aria-controls="publication-list"
                  aria-label={`Show ${Math.min(PUBLICATION_PAGE_SIZE, remainingPublicationCount)} more publications`}
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + PUBLICATION_PAGE_SIZE, publications.length),
                    )
                  }
                  className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Show more
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
