import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { XMLParser } from "fast-xml-parser"

const profileUrl = new URL("../content/profile.json", import.meta.url)
const profile = JSON.parse(readFileSync(profileUrl, "utf8"))
const parser = new XMLParser({ ignoreAttributes: false })
const sourceResults = []
const failures = []

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : [])
const cleanText = (value) => String(value ?? "").replace(/\s+/g, " ").trim()
const normalizeTitle = (value) =>
  cleanText(value)
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()

function normalizeDoi(value) {
  return cleanText(value)
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")
    .toLowerCase()
}

function arxivIdFrom(value) {
  return cleanText(value).match(/(?:arxiv[.:/ ]|abs\/)(\d{4}\.\d{4,5})/i)?.[1] ?? null
}

function dateFromParts(parts, fallbackYear) {
  const values = asArray(parts).flatMap((part) => asArray(part))
  const [year, month = 1, day = 1] = values.map((value) => Number(value))
  const safeYear = year || fallbackYear || new Date().getUTCFullYear()
  return [
    String(safeYear).padStart(4, "0"),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-")
}

function abstractFromInvertedIndex(index) {
  if (!index || typeof index !== "object") {
    return ""
  }

  const words = []
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) {
      words[position] = word
    }
  }
  return cleanText(words.join(" "))
}

async function fetchText(source, url, headers = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json, application/atom+xml, application/xml, text/xml",
      "User-Agent": "Ritesh-Thawkar-Portfolio-Discovery/1.0",
      ...headers,
    },
    signal: AbortSignal.timeout(30000),
  })

  if (!response.ok) {
    throw new Error(source + " returned HTTP " + response.status)
  }

  const body = await response.text()
  if (/^\s*(?:<!doctype html|<html)/i.test(body)) {
    throw new Error(source + " returned an HTML anti-bot page")
  }

  return body
}

async function collect(source, task) {
  try {
    const records = await task()
    sourceResults.push({ source, records })
    console.log(source + ": " + records.length + " records")
  } catch (error) {
    failures.push(source + ": " + error.message)
    console.warn("Warning: " + source + " discovery failed: " + error.message)
  }
}

function arxivRecords(xml) {
  const feed = parser.parse(xml).feed ?? {}

  return asArray(feed.entry)
    .map((entry) => {
      const authors = asArray(entry.author).map((author) => cleanText(author.name))
      const arxivId = arxivIdFrom(entry.id)
      const published = cleanText(entry.published).slice(0, 10)

      return {
        title: cleanText(entry.title),
        authors,
        abstract: cleanText(entry.summary),
        publicationDate: published,
        year: Number(published.slice(0, 4)),
        venue: "",
        url: arxivId ? "https://arxiv.org/abs/" + arxivId : cleanText(entry.id),
        arxiv: arxivId,
        doi: normalizeDoi(entry["arxiv:doi"]) || null,
        openAlex: null,
        semanticScholar: null,
        dblp: null,
        sources: ["arXiv"],
      }
    })
    .filter(
      (record) =>
        record.title &&
        record.arxiv &&
        record.authors.some((author) => author === profile.discovery.authorName),
    )
}

function semanticScholarRecords(payload) {
  return asArray(payload.data)
    .map((paper) => {
      const arxivId = cleanText(paper.externalIds?.ArXiv) || null
      const doi = normalizeDoi(paper.externalIds?.DOI) || null
      const publicationDate =
        cleanText(paper.publicationDate) ||
        (paper.year ? String(paper.year) + "-01-01" : "")

      return {
        title: cleanText(paper.title),
        authors: asArray(paper.authors).map((author) => cleanText(author.name)),
        abstract: cleanText(paper.abstract),
        publicationDate,
        year: Number(paper.year) || Number(publicationDate.slice(0, 4)),
        venue: cleanText(paper.venue),
        url:
          (arxivId ? "https://arxiv.org/abs/" + arxivId : "") ||
          (doi ? "https://doi.org/" + doi : "") ||
          cleanText(paper.url),
        arxiv: arxivId,
        doi,
        openAlex: null,
        semanticScholar: cleanText(paper.paperId) || null,
        dblp: null,
        sources: ["Semantic Scholar"],
      }
    })
    .filter(
      (record) =>
        record.title &&
        record.authors.some((author) => author === profile.discovery.authorName),
    )
}

function openAlexRecords(payload) {
  return asArray(payload.results)
    .map((work) => {
      const authors = asArray(work.authorships).map((authorship) =>
        cleanText(authorship.author?.display_name),
      )
      const landingPage = cleanText(work.primary_location?.landing_page_url)
      const doi = normalizeDoi(work.doi) || null
      const arxivId = arxivIdFrom(landingPage) || arxivIdFrom(doi)
      const publicationDate =
        cleanText(work.publication_date) ||
        (work.publication_year ? String(work.publication_year) + "-01-01" : "")

      return {
        title: cleanText(work.display_name ?? work.title),
        authors,
        abstract: abstractFromInvertedIndex(work.abstract_inverted_index),
        publicationDate,
        year: Number(work.publication_year) || Number(publicationDate.slice(0, 4)),
        venue:
          work.primary_location?.source?.display_name === "arXiv (Cornell University)"
            ? ""
            : cleanText(work.primary_location?.source?.display_name),
        url:
          (arxivId ? "https://arxiv.org/abs/" + arxivId : "") ||
          (doi ? "https://doi.org/" + doi : "") ||
          landingPage ||
          cleanText(work.id),
        arxiv: arxivId,
        doi,
        openAlex: cleanText(work.id).split("/").pop() || null,
        semanticScholar: null,
        dblp: null,
        sources: ["OpenAlex"],
      }
    })
    .filter(
      (record) =>
        record.title &&
        record.authors.some((author) => author === profile.discovery.authorName),
    )
}

function crossrefRecords(payload) {
  return asArray(payload.message?.items)
    .map((work) => {
      const authors = asArray(work.author).map((author) =>
        cleanText([author.given, author.family].filter(Boolean).join(" ")),
      )
      const title = cleanText(asArray(work.title)[0])
      const dateParts =
        work.published?.["date-parts"]?.[0] ??
        work.issued?.["date-parts"]?.[0] ??
        []
      const publicationDate = dateFromParts(dateParts)
      const doi = normalizeDoi(work.DOI) || null

      return {
        title,
        authors,
        abstract: cleanText(work.abstract).replace(/<[^>]+>/g, ""),
        publicationDate,
        year: Number(publicationDate.slice(0, 4)),
        venue: cleanText(asArray(work["container-title"])[0]),
        url: doi ? "https://doi.org/" + doi : cleanText(work.URL),
        arxiv: arxivIdFrom(doi),
        doi,
        openAlex: null,
        semanticScholar: null,
        dblp: null,
        sources: ["Crossref"],
      }
    })
    .filter(
      (record) =>
        record.title &&
        record.authors.some((author) => author === profile.discovery.authorName),
    )
}

function dblpRecords(payload) {
  return asArray(payload.result?.hits?.hit)
    .map((hit) => {
      const info = hit.info ?? {}
      const authors = asArray(info.authors?.author).map((author) =>
        cleanText(typeof author === "string" ? author : author.text),
      )
      const electronicEdition = asArray(info.ee)[0]
      const doi = normalizeDoi(info.doi) || null

      return {
        title: cleanText(info.title),
        authors,
        abstract: "",
        publicationDate: info.year ? String(info.year) + "-01-01" : "",
        year: Number(info.year),
        venue: cleanText(info.venue),
        url: cleanText(electronicEdition) || (doi ? "https://doi.org/" + doi : ""),
        arxiv: arxivIdFrom(electronicEdition) || arxivIdFrom(doi),
        doi,
        openAlex: null,
        semanticScholar: null,
        dblp: cleanText(info.key) || null,
        sources: ["DBLP"],
      }
    })
    .filter(
      (record) =>
        record.title &&
        record.authors.some((author) => author === profile.discovery.authorName),
    )
}

function mergeRecord(target, incoming) {
  for (const field of [
    "abstract",
    "publicationDate",
    "year",
    "venue",
    "url",
    "arxiv",
    "doi",
    "openAlex",
    "semanticScholar",
    "dblp",
  ]) {
    if (!target[field] && incoming[field]) {
      target[field] = incoming[field]
    }
  }

  if (incoming.authors.length > target.authors.length) {
    target.authors = incoming.authors
  }

  target.sources = [...new Set([...target.sources, ...incoming.sources])].sort()
}

function venueTag(venue, year) {
  const knownVenues = [
    ["Winter Conference on Applications of Computer Vision", "WACV"],
    ["International Conference on Robotics and Automation", "ICRA"],
    ["International Conference on Intelligent Robots and Systems", "IROS"],
    ["International Conference on Computer Vision", "ICCV"],
    ["European Conference on Computer Vision", "ECCV"],
    ["Computer Vision and Pattern Recognition", "CVPR"],
    ["Empirical Methods in Natural Language Processing", "EMNLP"],
    ["Association for Computational Linguistics", "ACL"],
    ["Medical Image Computing and Computer Assisted Intervention", "MICCAI"],
    ["British Machine Vision Conference", "BMVC"],
  ]
  const match = knownVenues.find(([name]) => venue.includes(name))
  return (match?.[1] || cleanText(venue) || "Publication") + " " + year
}

function publicationFromRecord(record) {
  const year = record.year || Number(record.publicationDate.slice(0, 4))
  const isPreprint = Boolean(record.arxiv)
  const identifier = record.arxiv
    ? "arxiv-" + record.arxiv
    : "doi-" + record.doi.replace(/[^a-z0-9]+/g, "-")

  return {
    id: identifier,
    tag: isPreprint ? "arXiv " + year : venueTag(record.venue, year),
    title: record.title,
    authors: record.authors.join(", "),
    type: isPreprint ? "Preprint" : "Conference",
    status: record.authors[0] === profile.person.name ? "First Author" : null,
    link: record.arxiv
      ? "https://arxiv.org/abs/" + record.arxiv
      : "https://doi.org/" + record.doi,
    linkLabel: isPreprint ? "View Preprint" : "View Paper",
    resources: [],
    abstract: record.abstract,
    sortDate: record.publicationDate || String(year) + "-01-01",
    sourceIds: {
      arxiv: record.arxiv,
      doi: record.doi,
      openAlex: record.openAlex,
      semanticScholar: record.semanticScholar,
      dblp: record.dblp,
    },
    includeInProfile: true,
    includeInCv: true,
    discoveredFrom: record.sources,
  }
}

function writeLinkedInDraft(publication) {
  const directory = new URL("../generated/linkedin-drafts/", import.meta.url)
  const fileName = publication.id.replace(/[^a-z0-9.-]+/gi, "-") + ".md"
  const firstSentence = publication.abstract.split(/(?<=[.!?])\s+/)[0]
  const title = /[.!?]$/.test(publication.title)
    ? publication.title
    : publication.title + "."
  const draft = [
    "# LinkedIn draft: " + publication.title,
    "",
    'I am glad to share our latest work, "' + title + '"',
    "",
    firstSentence,
    "",
    "Paper: " + publication.link,
    "",
    "#MultimodalAI #ComputerVision #MachineLearning #Research",
    "",
    "Review and personalize this draft before posting. LinkedIn publication discovery and",
    "automatic posting are intentionally excluded because member-content read access is restricted.",
    "",
  ].join("\n")

  mkdirSync(directory, { recursive: true })
  writeFileSync(new URL(fileName, directory), draft)
}

const arxivUrl =
  "https://export.arxiv.org/api/query?search_query=" +
  encodeURIComponent(profile.discovery.arxivQuery) +
  "&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending"
const semanticScholarUrl =
  "https://api.semanticscholar.org/graph/v1/author/" +
  profile.discovery.semanticScholarAuthorId +
  "/papers?limit=100&fields=title,abstract,authors,year,venue,publicationDate,externalIds,url"
const openAlexUrl =
  "https://api.openalex.org/works?filter=authorships.author.id:" +
  profile.discovery.openAlexAuthorId +
  "&sort=publication_date:desc&per-page=100"
const crossrefUrl =
  "https://api.crossref.org/works?query.author=" +
  encodeURIComponent(profile.discovery.authorName) +
  "&filter=from-pub-date:2024-01-01&rows=100&select=DOI,title,author,published,issued,container-title,type,URL,abstract"
const dblpUrl =
  "https://dblp.org/search/publ/api?q=" +
  encodeURIComponent("author:" + profile.discovery.authorName.replaceAll(" ", "_") + ":") +
  "&h=100&format=json"

await Promise.all([
  collect("arXiv", async () => arxivRecords(await fetchText("arXiv", arxivUrl))),
  collect("Semantic Scholar", async () =>
    semanticScholarRecords(
      JSON.parse(
        await fetchText("Semantic Scholar", semanticScholarUrl, {
          ...(process.env.SEMANTIC_SCHOLAR_API_KEY
            ? { "x-api-key": process.env.SEMANTIC_SCHOLAR_API_KEY }
            : {}),
        }),
      ),
    ),
  ),
  collect("OpenAlex", async () =>
    openAlexRecords(JSON.parse(await fetchText("OpenAlex", openAlexUrl))),
  ),
  collect("Crossref", async () =>
    crossrefRecords(JSON.parse(await fetchText("Crossref", crossrefUrl))),
  ),
  collect("DBLP", async () =>
    dblpRecords(JSON.parse(await fetchText("DBLP", dblpUrl))),
  ),
])

if (sourceResults.length < 2) {
  throw new Error(
    "Publication discovery needs at least two available sources. " + failures.join("; "),
  )
}

const recordsByTitle = new Map()
for (const result of sourceResults) {
  for (const record of result.records) {
    const key = normalizeTitle(record.title)
    const existing = recordsByTitle.get(key)

    if (existing) {
      mergeRecord(existing, record)
    } else {
      recordsByTitle.set(key, record)
    }
  }
}

const existingByTitle = new Map(
  profile.publications.map((publication) => [
    normalizeTitle(publication.title),
    publication,
  ]),
)
const added = []
let enriched = 0

for (const record of recordsByTitle.values()) {
  const existing = existingByTitle.get(normalizeTitle(record.title))

  if (existing) {
    let changed = false
    const sourceIds = {
      arxiv: record.arxiv,
      doi: record.doi,
      openAlex: record.openAlex,
      semanticScholar: record.semanticScholar,
      dblp: record.dblp,
    }

    for (const [key, value] of Object.entries(sourceIds)) {
      if (!existing.sourceIds[key] && value) {
        existing.sourceIds[key] = value
        changed = true
      }
    }

    const discoveredFrom = [
      ...new Set([...existing.discoveredFrom, ...record.sources]),
    ].sort()
    if (discoveredFrom.join("|") !== existing.discoveredFrom.join("|")) {
      existing.discoveredFrom = discoveredFrom
      changed = true
    }

    if (changed) {
      enriched += 1
    }
    continue
  }

  const hasStrongIdentity = Boolean(record.arxiv) || Boolean(record.doi)
  const hasSourceAgreement =
    record.sources.includes("arXiv") || record.sources.length >= 2
  const hasCompleteMetadata =
    record.title &&
    record.authors.includes(profile.person.name) &&
    record.abstract.length >= 20 &&
    record.year

  if (!hasStrongIdentity || !hasSourceAgreement || !hasCompleteMetadata) {
    continue
  }

  const publication = publicationFromRecord(record)
  profile.publications.push(publication)
  existingByTitle.set(normalizeTitle(publication.title), publication)
  added.push(publication)
  writeLinkedInDraft(publication)
}

if (added.length > 0 || enriched > 0) {
  profile.publications.sort((left, right) =>
    right.sortDate.localeCompare(left.sortDate),
  )
  profile.lastUpdated = new Date().toISOString().slice(0, 10)
  writeFileSync(profileUrl, JSON.stringify(profile, null, 2) + "\n")
}

console.log(
  "Discovery complete: " +
    added.length +
    " new, " +
    enriched +
    " enriched, " +
    profile.publications.length +
    " total.",
)
for (const publication of added) {
  console.log("NEW: " + publication.title)
}
if (failures.length > 0) {
  console.log("Unavailable sources: " + failures.join("; "))
}
