import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"

const sourcePath = resolve(process.env.PROFILE_SOURCE_PATH ?? "content/profile.json")
const outputPath = resolve(process.env.PROFILE_README_OUTPUT ?? "generated/profile-README.md")
const profile = JSON.parse(readFileSync(sourcePath, "utf8"))

const linkBadges = [
  {
    key: "portfolio",
    label: "Portfolio",
    color: "0B7285",
    logo: "googlechrome",
    logoColor: "white",
  },
  {
    key: "scholar",
    label: "Google Scholar",
    color: "4285F4",
    logo: "googlescholar",
    logoColor: "white",
  },
  {
    key: "huggingFace",
    label: "Hugging Face",
    color: "FFD21E",
    logo: "huggingface",
    logoColor: "black",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    color: "0A66C2",
    logo: "linkedin",
    logoColor: "white",
  },
  {
    key: "github",
    label: "GitHub",
    color: "181717",
    logo: "github",
    logoColor: "white",
  },
]

const stackBadges = [
  { label: "Python", color: "3776AB", logo: "python", logoColor: "white" },
  { label: "PyTorch", color: "EE4C2C", logo: "pytorch", logoColor: "white" },
  { label: "Transformers", color: "FFD21E", logoColor: "black" },
  { label: "LLMs / MLLMs", color: "5B5FC7", logoColor: "white" },
  { label: "RAG", color: "0B7285", logoColor: "white" },
  { label: "Vector Databases", color: "2F855A", logoColor: "white" },
  { label: "FastAPI", color: "009688", logo: "fastapi", logoColor: "white" },
  { label: "PostgreSQL", color: "4169E1", logo: "postgresql", logoColor: "white" },
]

function shieldUrl(badge) {
  const label = encodeURIComponent(badge.label).replaceAll("-", "--")
  const params = new URLSearchParams({
    style: "flat",
    logoColor: badge.logoColor,
  })

  if (badge.logo) {
    params.set("logo", badge.logo)
  }

  return "https://img.shields.io/badge/" + label + "-" + badge.color + "?" + params
}

function imageBadge(badge) {
  return '  <img alt="' + badge.label + '" src="' + shieldUrl(badge) + '">'
}

function linkedBadge(badge) {
  return [
    '  <a href="' + profile.links[badge.key] + '">',
    "    " + imageBadge(badge).trim(),
    "  </a>",
  ].join("\n")
}

function markdownLinks(publication) {
  return [
    "[Paper](" + publication.link + ")",
    ...publication.resources.map(
      (resource) => "[" + resource.label + "](" + resource.href + ")",
    ),
  ].join(", ")
}

const allSkills = [
  ...new Set(
    profile.skills.flatMap((group) => group.skills.map((skill) => skill.name)),
  ),
]

const publications = profile.publications
  .filter((publication) => publication.includeInProfile)
  .map(
    (publication) =>
      "| " +
      publication.title.replaceAll("|", "\\|") +
      " | " +
      publication.tag +
      (publication.status && publication.status !== "Accepted"
        ? " · " + publication.status
        : "") +
      " | " +
      markdownLinks(publication) +
      " |",
  )
  .join("\n")

const pinnedRepositories = profile.pinnedRepositories
  .map(
    (repository) =>
      "| " +
      repository.name +
      " | " +
      repository.description.replaceAll("|", "\\|") +
      " | [Repository](" +
      repository.url +
      ") |",
  )
  .join("\n")

const readme = [
  "<!-- Generated from Portfolio-website/content/profile.json. Do not edit by hand. -->",
  "",
  "# " + profile.person.name,
  "",
  profile.person.hero[0],
  "",
  profile.person.hero[1],
  "",
  "<p>",
  linkBadges.map(linkedBadge).join("\n"),
  "</p>",
  "",
  "## Current Focus",
  "",
  ...profile.research.focusAreas.map((area) => "- " + area + "."),
  "",
  "## Technical Stack",
  "",
  "<p>",
  ...stackBadges.map(imageBadge),
  "</p>",
  "",
  allSkills.join(", ") + ".",
  "",
  "## Publications",
  "",
  "| Work | Status | Links |",
  "| --- | --- | --- |",
  publications,
  "",
  "## Pinned Repositories",
  "",
  "| Repository | What it is | Link |",
  "| --- | --- | --- |",
  pinnedRepositories,
  "",
  "## Research Interests",
  "",
  ...profile.research.interests.map((interest) => "- " + interest),
  "",
  "## Open To",
  "",
  ...profile.research.openTo.map((item) => "- " + item),
  "",
  "## What I Am Building Toward",
  "",
  profile.research.narrative,
  "",
  "<sub>Profile content last updated " + profile.lastUpdated + ".</sub>",
  "",
].join("\n")

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, readme)
console.log("Generated " + outputPath)
