import profileData from "@/content/profile.json"

export interface ResourceLink {
  label: string
  href: string
}

export interface Publication {
  id: string
  tag: string
  title: string
  authors: string
  type: string
  status: string | null
  link: string
  linkLabel: string
  resources: ResourceLink[]
  abstract: string
  sortDate: string
  sourceIds: {
    arxiv: string | null
    doi: string | null
    openAlex: string | null
    semanticScholar: string | null
    dblp: string | null
  }
  includeInProfile: boolean
  includeInCv: boolean
  discoveredFrom: string[]
}

export interface Project {
  title: string
  description: string
  status: string
  impact: string
  tools: string[]
  details: string
  contribution: string
  link?: string
  linkLabel?: string
  cvFeatured: boolean
}

export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  location: string
  startDate: string
  endDate: string | null
  highlights: string[]
  includeInPortfolio: boolean
  includeInCv: boolean
}

export interface ProfileData {
  schemaVersion: number
  lastUpdated: string
  person: {
    name: string
    initials: string
    headline: string
    location: string
    email: string
    phone: string
    currentRole: string
    institution: {
      name: string
      shortName: string
      url: string
    }
    summary: string
    hero: string[]
  }
  links: Record<"portfolio" | "scholar" | "huggingFace" | "linkedin" | "github", string>
  discovery: {
    authorName: string
    arxivQuery: string
    openAlexAuthorId: string
    semanticScholarAuthorId: string
    dblpPid: string
  }
  cv: {
    languages: string[]
    interests: string[]
  }
  research: {
    narrative: string
    focusAreas: string[]
    interests: string[]
    openTo: string[]
  }
  skills: Array<{
    category: string
    summary: string
    lead: boolean
    skills: Array<{ name: string; icon: string }>
  }>
  publications: Publication[]
  pinnedRepositories: Array<{
    name: string
    description: string
    url: string
  }>
  projects: Project[]
  experiences: Experience[]
  education: Array<{
    degree: string
    school: string
    location: string
    period: string
    gpa: string
  }>
}

export const profile = profileData as ProfileData

function formatProfileMonth(value: string) {
  const [year, month] = value.split("-").map(Number)

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

export function formatExperiencePeriod(experience: Experience) {
  const end = experience.endDate
    ? formatProfileMonth(experience.endDate)
    : "Present"

  return `${formatProfileMonth(experience.startDate)} - ${end}`
}
