"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react"

import { profile, type Publication } from "@/lib/profile"
import { AnimatedSection } from "./animated-section"
import { SectionHeading } from "./section-heading"

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

function isPreprint(publication: Publication) {
  return /^arXiv\b/i.test(publication.tag)
}

function isFirstAuthor(publication: Publication) {
  return publication.authors.split(",")[0]?.trim() === profile.person.name
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
  const years = useMemo(
    () => [...new Set(publications.map((publication) => publication.sortDate.slice(0, 4)))],
    [publications],
  )
  const [view, setView] = useState<"latest" | "all">("latest")
  const [query, setQuery] = useState("")
  const [year, setYear] = useState("all")
  const [category, setCategory] = useState("all")
  const [firstAuthorOnly, setFirstAuthorOnly] = useState(false)

  const filteredPublications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return publications.filter((publication) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        publication.title.toLowerCase().includes(normalizedQuery) ||
        publication.authors.toLowerCase().includes(normalizedQuery) ||
        publication.tag.toLowerCase().includes(normalizedQuery)
      const matchesYear = year === "all" || publication.sortDate.startsWith(year)
      const matchesCategory =
        category === "all" ||
        (category === "preprint" ? isPreprint(publication) : !isPreprint(publication))
      const matchesAuthorship = !firstAuthorOnly || isFirstAuthor(publication)

      return matchesQuery && matchesYear && matchesCategory && matchesAuthorship
    })
  }, [category, firstAuthorOnly, publications, query, year])

  const displayedPublications =
    view === "latest" ? publications.slice(0, 5) : filteredPublications
  const hasActiveFilters =
    query.length > 0 || year !== "all" || category !== "all" || firstAuthorOnly

  function clearFilters() {
    setQuery("")
    setYear("all")
    setCategory("all")
    setFirstAuthorOnly(false)
  }

  return (
    <section id="publications" className="site-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Research output"
          title="Publications"
          description="Peer-reviewed work and preprints, ordered by release date."
          aside={`${publications.length} papers`}
        />

        <AnimatedSection>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex border border-border" role="group" aria-label="Publication view">
                <button
                  type="button"
                  aria-pressed={view === "latest"}
                  onClick={() => setView("latest")}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    view === "latest"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Latest 5
                </button>
                <button
                  type="button"
                  aria-pressed={view === "all"}
                  onClick={() => setView("all")}
                  className={`border-l border-border px-3 py-2 text-sm font-medium transition-colors ${
                    view === "all"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All {publications.length}
                </button>
              </div>
              <p className="text-xs text-muted-foreground" aria-live="polite">
                Showing {displayedPublications.length} of {publications.length}
              </p>
            </div>

            {view === "all" ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_8rem_9rem_auto_auto]">
                <label className="relative block sm:col-span-2 lg:col-span-1">
                  <span className="sr-only">Search publications</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search publications"
                    className="h-10 w-full border border-border bg-transparent pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand"
                  />
                </label>

                <label>
                  <span className="sr-only">Filter by year</span>
                  <select
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    className="h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand"
                  >
                    <option value="all">All years</option>
                    {years.map((publicationYear) => (
                      <option key={publicationYear} value={publicationYear}>
                        {publicationYear}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="sr-only">Filter by publication type</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand"
                  >
                    <option value="all">All types</option>
                    <option value="peer-reviewed">Peer reviewed</option>
                    <option value="preprint">Preprints</option>
                  </select>
                </label>

                <button
                  type="button"
                  aria-pressed={firstAuthorOnly}
                  onClick={() => setFirstAuthorOnly((active) => !active)}
                  className={`h-10 whitespace-nowrap border px-3 text-sm font-medium transition-colors ${
                    firstAuthorOnly
                      ? "border-brand bg-brand-muted text-brand"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  First author
                </button>

                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="inline-flex h-10 items-center justify-center gap-2 border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
            {displayedPublications.map((publication, index) => (
              <PublicationItem key={publication.id} publication={publication} index={index} />
            ))}
            {displayedPublications.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-foreground">No publications match these filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-sm font-medium text-brand underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex justify-end">
            <a
              href={profile.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
            >
              Google Scholar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
