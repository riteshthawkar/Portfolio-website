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
  link?: string
  linkLabel?: string
  cvFeatured: boolean
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
    cvObjective: string
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
    publicationLimit: number
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
  experiences: Array<{
    role: string
    company: string
    location: string
    period: string
    highlights: string[]
  }>
  education: Array<{
    degree: string
    school: string
    location: string
    period: string
    gpa: string
  }>
}

export const profile = profileData as ProfileData
