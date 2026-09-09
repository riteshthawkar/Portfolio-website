import { readFileSync, writeFileSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { createInterface } from "node:readline/promises"

const profileUrl = new URL("../content/profile.json", import.meta.url)
const originalProfile = readFileSync(profileUrl, "utf8")
const profile = JSON.parse(originalProfile)
const prompt = createInterface({ input: process.stdin, output: process.stdout })
const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/

async function required(label) {
  let value = ""

  while (!value) {
    value = (await prompt.question(`${label}: `)).trim()
  }

  return value
}

async function month(label, { optional = false } = {}) {
  while (true) {
    const value = (await prompt.question(`${label}: `)).trim()

    if (optional && value === "") {
      return null
    }
    if (monthPattern.test(value)) {
      return value
    }

    console.log("Use YYYY-MM, for example 2026-09.")
  }
}

async function optionalUrl() {
  while (true) {
    const value = (await prompt.question("Company website (optional): ")).trim()

    if (!value) {
      return undefined
    }

    try {
      new URL(value)
      return value
    } catch {
      console.log("Enter a complete URL beginning with https://, or leave it blank.")
    }
  }
}

async function yesNo(label, defaultValue = true) {
  const suffix = defaultValue ? "Y/n" : "y/N"

  while (true) {
    const value = (await prompt.question(`${label} [${suffix}]: `)).trim().toLowerCase()

    if (!value) {
      return defaultValue
    }
    if (["y", "yes"].includes(value)) {
      return true
    }
    if (["n", "no"].includes(value)) {
      return false
    }

    console.log("Enter yes or no.")
  }
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function uniqueId(baseId) {
  const existingIds = new Set(profile.experiences.map((experience) => experience.id))
  let candidate = baseId
  let suffix = 2

  while (existingIds.has(candidate)) {
    candidate = `${baseId}-${suffix}`
    suffix += 1
  }

  return candidate
}

function runScript(path) {
  return spawnSync(process.execPath, [fileURLToPath(new URL(path, import.meta.url))], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    stdio: "inherit",
  })
}

try {
  console.log("Add one experience record. Use Ctrl+C to cancel.\n")
  const role = await required("Role")
  const company = await required("Company")
  const companyUrl = await optionalUrl()
  const location = await required("Location")
  const startDate = await month("Start month (YYYY-MM)")
  const endDate = await month("End month (YYYY-MM, blank for Present)", {
    optional: true,
  })

  if (endDate && endDate < startDate) {
    throw new Error("End month cannot be earlier than start month.")
  }

  console.log("\nEnter one achievement per line. Submit a blank line when finished.")
  const highlights = []

  while (true) {
    const highlight = (await prompt.question(`Achievement ${highlights.length + 1}: `)).trim()

    if (!highlight) {
      if (highlights.length > 0) {
        break
      }
      console.log("Add at least one achievement.")
      continue
    }

    highlights.push(highlight)
  }

  const includeInPortfolio = await yesNo("Show on portfolio")
  const includeInCv = await yesNo("Include in CV")
  const id = uniqueId(slug(`${company}-${role}`))
  const experience = {
    id,
    role,
    company,
    ...(companyUrl ? { companyUrl } : {}),
    location,
    startDate,
    endDate,
    highlights,
    includeInPortfolio,
    includeInCv,
  }

  profile.lastUpdated = new Date().toISOString().slice(0, 10)
  profile.experiences = [...profile.experiences, experience].toSorted((a, b) =>
    b.startDate.localeCompare(a.startDate),
  )
  writeFileSync(profileUrl, `${JSON.stringify(profile, null, 2)}\n`)

  const validation = runScript("./validate-profile.mjs")
  if (validation.status !== 0) {
    throw new Error("Profile validation failed.")
  }

  const cvGeneration = runScript("./generate-cv.mjs")
  if (cvGeneration.status !== 0) {
    throw new Error("CV generation failed.")
  }

  console.log(`\nAdded ${role} at ${company} as ${id}.`)
  console.log("The portfolio and LaTeX CV now read the same experience record.")
} catch (error) {
  writeFileSync(profileUrl, originalProfile)
  runScript("./generate-cv.mjs")
  console.error(`\nNo profile changes were kept: ${error.message}`)
  process.exitCode = 1
} finally {
  prompt.close()
}
