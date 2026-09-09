import { readFileSync } from "node:fs"
import { z } from "zod"

const url = z.string().url()
const nullableId = z.string().min(1).nullable()

const profileSchema = z.object({
  schemaVersion: z.literal(1),
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  person: z.object({
    name: z.string().min(2),
    initials: z.string().min(1),
    headline: z.string().min(3),
    location: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    currentRole: z.string().min(3),
    institution: z.object({
      name: z.string().min(2),
      shortName: z.string().min(2),
      url,
    }),
    summary: z.string().min(40),
    cvObjective: z.string().min(60),
    hero: z.array(z.string().min(20)).length(3),
  }),
  links: z.object({
    portfolio: url,
    scholar: url,
    huggingFace: url,
    linkedin: url,
    github: url,
  }),
  discovery: z.object({
    authorName: z.string().min(2),
    arxivQuery: z.string().min(2),
    openAlexAuthorId: z.string().regex(/^A\d+$/),
    semanticScholarAuthorId: z.string().min(1),
    dblpPid: z.string().min(3),
  }),
  cv: z.object({
    publicationLimit: z.number().int().positive(),
    languages: z.array(z.string().min(2)).min(1),
    interests: z.array(z.string().min(2)).min(1),
  }),
  research: z.object({
    narrative: z.string().min(40),
    focusAreas: z.array(z.string().min(10)).min(3),
    interests: z.array(z.string().min(3)).min(3),
    openTo: z.array(z.string().min(10)).min(1),
  }),
  skills: z.array(
    z.object({
      category: z.string().min(2),
      summary: z.string().min(10),
      lead: z.boolean(),
      skills: z.array(
        z.object({
          name: z.string().min(1),
          icon: z.string().min(1),
        }),
      ).min(1),
    }),
  ).min(1),
  publications: z.array(
    z.object({
      id: z.string().min(1),
      tag: z.string().min(3),
      title: z.string().min(8),
      authors: z.string().min(3),
      type: z.string().min(3),
      status: z.string().nullable(),
      link: url,
      linkLabel: z.string().min(3),
      resources: z.array(z.object({ label: z.string().min(1), href: url })),
      abstract: z.string().min(20),
      sortDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      sourceIds: z.object({
        arxiv: nullableId,
        doi: nullableId,
        openAlex: nullableId,
        semanticScholar: nullableId,
        dblp: nullableId,
      }),
      includeInProfile: z.boolean(),
      includeInCv: z.boolean(),
      discoveredFrom: z.array(z.string().min(1)).min(1),
    }),
  ).min(1),
  pinnedRepositories: z.array(
    z.object({
      name: z.string().min(2),
      description: z.string().min(10),
      url,
    }),
  ).length(6),
  projects: z.array(
    z.object({
      title: z.string().min(2),
      description: z.string().min(10),
      status: z.string().min(2),
      impact: z.string().min(2),
      tools: z.array(z.string().min(1)).min(1),
      details: z.string().min(20),
      link: url.optional(),
      linkLabel: z.string().optional(),
      cvFeatured: z.boolean(),
    }),
  ).min(1),
  experiences: z.array(
    z.object({
      role: z.string().min(2),
      company: z.string().min(2),
      location: z.string().min(2),
      period: z.string().min(4),
      highlights: z.array(z.string().min(10)).min(1),
    }),
  ).min(1),
  education: z.array(
    z.object({
      degree: z.string().min(2),
      school: z.string().min(2),
      location: z.string().min(2),
      period: z.string().min(4),
      gpa: z.string().min(2),
    }),
  ).min(1),
})

const profile = profileSchema.parse(
  JSON.parse(readFileSync(new URL("../content/profile.json", import.meta.url), "utf8")),
)

const unique = (values) => new Set(values).size === values.length

if (!unique(profile.publications.map((publication) => publication.id))) {
  throw new Error("Publication IDs must be unique")
}

if (!unique(profile.publications.map((publication) => publication.title.toLowerCase()))) {
  throw new Error("Publication titles must be unique")
}

if (!unique(profile.projects.map((project) => project.title.toLowerCase()))) {
  throw new Error("Project titles must be unique")
}

if (!unique(profile.pinnedRepositories.map((repository) => repository.name.toLowerCase()))) {
  throw new Error("Pinned repository names must be unique")
}

if (!unique(profile.pinnedRepositories.map((repository) => repository.url.toLowerCase()))) {
  throw new Error("Pinned repository URLs must be unique")
}

if (
  profile.pinnedRepositories.some((repository) => {
    const repositoryUrl = new URL(repository.url)
    return repositoryUrl.hostname !== "github.com" || repositoryUrl.pathname.split("/").filter(Boolean).length !== 2
  })
) {
  throw new Error("Every pinned repository must link to a GitHub repository")
}

if (profile.projects.some((project) => /portfolio/i.test(project.title))) {
  throw new Error("The portfolio website belongs in profile links, not the projects list")
}

const evolmm = profile.publications.find((publication) => /^EvoLMM:/i.test(publication.title))

if (evolmm && /CVPR/i.test(evolmm.tag)) {
  throw new Error("EvoLMM is an arXiv preprint and must not be labeled as CVPR")
}

console.log(
  `Validated ${profile.publications.length} publications, ${profile.projects.length} projects, and ${profile.skills.length} skill groups.`,
)
