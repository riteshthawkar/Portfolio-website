"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Search, X } from "lucide-react"

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

function isPreprint(publication: Publication) {
  return /^arXiv\b/i.test(publication.tag)
}

function isFirstAuthor(publication: Publication) {
  return publication.authors.split(",")[0]?.trim() === profile.person.name
}

function PublicationItem({ publication }: { publication: Publication }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_18rem]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h3 className="flex-1 pr-4 text-lg font-semibold leading-snug text-foreground">
          {publication.title}
        </h3>

        <div className="flex shrink-0 items-center gap-4">
          <PillButton href={publication.link} label={publication.linkLabel} />
          <button
            type="button"
            className="p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
    <section id="publications" className="relative px-6 py-0">
      <div className="relative z-10 mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Research
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Publications
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="pb-8 sm:pb-10">
            <div className="border-x border-b border-border bg-background px-5 py-5 sm:px-6">
              <div className="inline-flex border border-border" role="group" aria-label="Publication view">
                <button
                  type="button"
                  aria-pressed={view === "latest"}
                  onClick={() => setView("latest")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    view === "latest"
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Latest 5
                </button>
                <button
                  type="button"
                  aria-pressed={view === "all"}
                  onClick={() => setView("all")}
                  className={`border-l border-border px-4 py-2 text-sm font-medium transition-colors ${
                    view === "all"
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All {publications.length}
                </button>
              </div>

              {view === "all" ? (
                <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_9rem_10rem_auto_auto]">
                  <label className="relative block">
                    <span className="sr-only">Search publications</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search title, author, or venue"
                      className="h-10 w-full border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand"
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
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    First author
                  </button>

                  <button
                    type="button"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="inline-flex h-10 items-center justify-center gap-2 border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                </div>
              ) : null}

              <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
                Showing {displayedPublications.length} of {publications.length} publications
              </p>
            </div>

            <div className="flex flex-col border-b border-border">
              {displayedPublications.map((publication) => (
                <div
                  key={publication.id}
                  className="border-x border-t border-border bg-background px-5 py-6 sm:px-6 sm:py-8"
                >
                  <PublicationItem publication={publication} />
                </div>
              ))}
              {displayedPublications.length === 0 ? (
                <div className="border-x border-t border-border px-5 py-10 text-center sm:px-6">
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
