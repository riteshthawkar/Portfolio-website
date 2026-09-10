import { mkdirSync, readFileSync, writeFileSync } from "node:fs"

const profile = JSON.parse(
  readFileSync(new URL("../content/profile.json", import.meta.url), "utf8"),
)

const latexReplacements = {
  "\\": "\\textbackslash{}",
  "&": "\\&",
  "%": "\\%",
  "$": "\\$",
  "#": "\\#",
  "_": "\\_",
  "{": "\\{",
  "}": "\\}",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
}

function latex(value) {
  return String(value)
    .replace(/[\\&%$#_{}~^]/g, (character) => latexReplacements[character])
    .replace(/·/g, "\\textperiodcentered{}")
}

function rawLink(url, content) {
  return "\\href{" + latex(url) + "}{" + content + "}"
}

function textLink(url, label) {
  return rawLink(url, latex(label))
}

function emphasizeAuthorName(authors) {
  const escapedName = latex(profile.person.name)
  return latex(sentence(authors)).replaceAll(
    escapedName,
    "\\textbf{" + escapedName + "}",
  )
}

function sentence(value) {
  const text = String(value).trim()
  return /[.!?]$/.test(text) ? text : text + "."
}

function detailSentences(value) {
  return String(value)
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((part) => sentence(part))
}

function educationSchool(item) {
  return item.school === profile.person.institution.shortName
    ? profile.person.institution.name
    : item.school
}

function educationDegree(item) {
  if (item.degree === "MSc Computer Vision") {
    return "Master of Science in Computer Vision"
  }
  if (item.degree === "BTech Computer Science & Engineering") {
    return "Bachelor of Technology in Computer Science and Engineering"
  }
  return item.degree
}

function formatProfileMonth(value) {
  const [year, month] = value.split("-").map(Number)

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

function experiencePeriod(item) {
  return [
    formatProfileMonth(item.startDate),
    item.endDate ? formatProfileMonth(item.endDate) : "Present",
  ].join(" - ")
}

const education = profile.education
  .map((item) =>
    [
      "  \\item \\begin{tabular*}{\\linewidth}[t]{@{\\extracolsep{\\fill}}lr}",
      "    \\textbf{" + latex(educationSchool(item)) + "} & \\textit{" + latex(item.period) + "} \\\\",
      "    \\textit{" + latex(educationDegree(item)) + "} & " + latex(item.location),
      "  \\end{tabular*}",
      "  \\begin{itemize}",
      "    \\item GPA: " + latex(item.gpa.replace(/\s*\/\s*/g, "/")),
      "  \\end{itemize}",
    ].join("\n"),
  )
  .join("\n")

function publicationVenue(publication) {
  if (/^arXiv\b/i.test(publication.tag)) {
    return "\\textit{arXiv preprint}."
  }

  const aclFindings = publication.tag.match(/^ACL Findings\s+(\d{4})$/i)
  if (aclFindings) {
    return "In \\textit{Findings of ACL " + aclFindings[1] + "}."
  }

  return "In \\textit{" + latex(publication.tag) + "}."
}

function publicationEntries(items) {
  const counters = { C: 0, S: 0 }

  return items.map((publication) => {
    const prefix = /^arXiv\b/i.test(publication.tag) ? "S" : "C"
    counters[prefix] += 1
    const title = rawLink(
      publication.link,
      "\\textbf{" + latex(sentence(publication.title)) + "}",
    )
    return [
      "  \\par\\Needspace{5\\baselineskip}",
      "  \\item[\\textbf{[" + prefix + counters[prefix] + "]}]",
      "    " +
        emphasizeAuthorName(publication.authors) +
        " (" +
        latex(publication.sortDate.slice(0, 4)) +
        "). " +
        title +
        " " +
        publicationVenue(publication),
    ].join("\n")
  }).join("\n")
}

const includedPublications = profile.publications
  .filter((publication) => publication.includeInCv)
  .toSorted((a, b) => b.sortDate.localeCompare(a.sortDate))
const publications = publicationEntries(includedPublications)

function projectLink(project) {
  if (!project.link) {
    return ""
  }
  return " " + rawLink(project.link, "[\\faGlobe]")
}

const projects = profile.projects
  .filter((project) => project.cvFeatured)
  .map((project) =>
    [
      "  \\par\\Needspace{11\\baselineskip}",
      "  \\item \\textbf{" + latex(project.title) + ":}" + projectLink(project),
      "  \\textit{Tools: [" + latex(project.tools.join(", ")) + "]}",
      "  \\begin{itemize}",
      detailSentences(project.details)
        .map((detail) => "    \\item " + latex(detail))
        .join("\n"),
      "  \\end{itemize}",
    ].join("\n"),
  )
  .join("\n")

const experiences = profile.experiences
  .filter((item) => item.includeInCv)
  .toSorted((a, b) => b.startDate.localeCompare(a.startDate))
  .map((item) =>
    [
      "  \\par\\Needspace{12\\baselineskip}",
      "  \\item \\begin{tabular*}{\\linewidth}[t]{@{\\extracolsep{\\fill}}lr}",
      "    \\textbf{" + latex(item.company) + "} & \\textit{" + latex(experiencePeriod(item)) + "} \\\\",
      "    \\textit{" + latex(item.role) + "} & " + latex(item.location),
      "  \\end{tabular*}",
      "  \\begin{itemize}",
      item.highlights.map((highlight) => "    \\item " + latex(highlight)).join("\n"),
      "  \\end{itemize}",
    ].join("\n"),
  )
  .join("\n")

const skills = profile.skills
  .map(
    (group) =>
      "  \\item \\textbf{" +
      latex(group.category) +
      ":} " +
      latex(group.skills.map((skill) => skill.name).join(", ")),
  )
  .join("\n")

const contactLinks = [
  rawLink(profile.links.linkedin, "\\faLinkedin\\ " + latex(profile.person.name)),
  rawLink(profile.links.github, "\\faGithub\\ " + latex(profile.person.name)),
  rawLink(profile.links.scholar, "\\faGraduationCap\\ Google Scholar"),
  rawLink(profile.links.huggingFace, "\\faRobot\\ Hugging Face"),
].join(" \\enspace | \\enspace ")

const document = [
  "\\documentclass[11pt,a4paper]{article}",
  "\\usepackage[left=0.56in,right=0.56in,top=0.32in,bottom=0.28in]{geometry}",
  "\\usepackage[T1]{fontenc}",
  "\\usepackage[utf8]{inputenc}",
  "\\usepackage{mathpazo}",
  "\\usepackage{fontawesome5}",
  "\\usepackage{enumitem}",
  "\\usepackage{hyperref}",
  "\\usepackage{xcolor}",
  "\\usepackage{tabularx}",
  "\\usepackage{titlesec}",
  "\\usepackage{needspace}",
  "\\usepackage{microtype}",
  "",
  "\\definecolor{linkblue}{HTML}{000099}",
  "\\hypersetup{colorlinks=true,urlcolor=linkblue,linkcolor=linkblue}",
  "\\pagestyle{empty}",
  "\\setlength{\\parindent}{0pt}",
  "\\setlength{\\parskip}{0pt}",
  "\\setlength{\\tabcolsep}{0pt}",
  "\\setlength{\\emergencystretch}{1em}",
  "\\raggedbottom",
  "\\setlist[itemize,1]{label=\\textbullet,leftmargin=0.8em,labelsep=0.35em,itemsep=0.55em,topsep=0.25em,parsep=0pt,partopsep=0pt}",
  "\\setlist[itemize,2]{label=\\textopenbullet,leftmargin=1.15em,labelsep=0.35em,itemsep=0.28em,topsep=0.18em,parsep=0pt,partopsep=0pt}",
  "\\setlist[description]{leftmargin=4.05em,labelwidth=3.35em,labelsep=0.6em,itemsep=0.55em,topsep=0.2em,parsep=0pt,partopsep=0pt}",
  "\\titleformat{\\section}{\\Large\\bfseries\\scshape}{}{0pt}{}[\\vspace{0.05em}\\titlerule]",
  "\\titlespacing*{\\section}{0pt}{0.7em}{0.45em}",
  "",
  "\\begin{document}",
  "",
  "\\begin{center}",
  "  {\\Huge\\bfseries " + latex(profile.person.name) + "}\\\\[2pt]",
  "  " + latex(profile.person.phone) + " \\enspace | \\enspace " + textLink("mailto:" + profile.person.email, profile.person.email) + "\\\\[3pt]",
  "  " + contactLinks,
  "\\end{center}",
  "\\vspace{-0.45em}",
  "",
  "\\section*{Research Profile}",
  latex(profile.person.summary),
  "",
  "\\section*{Education}",
  "\\begin{itemize}",
  education,
  "\\end{itemize}",
  "",
  "\\section*{Publications \\hfill \\textcolor{linkblue}{\\normalfont\\small C = Conference, S = Preprint}}",
  "\\begin{description}",
  publications,
  "\\end{description}",
  "",
  "\\Needspace{14\\baselineskip}",
  "\\section*{Experience}",
  "\\begin{itemize}",
  experiences,
  "\\end{itemize}",
  "",
  "\\section*{Selected Projects}",
  "\\begin{itemize}",
  projects,
  "\\end{itemize}",
  "",
  "\\section*{Skills}",
  "\\begin{itemize}",
  skills,
  "\\end{itemize}",
  "",
  "\\section*{Additional Information}",
  "\\textbf{Languages:} " + latex(profile.cv.languages.join(", ")) + "\\\\",
  "\\textbf{Interests:} " + latex(profile.cv.interests.join(", ")),
  "",
  "\\end{document}",
  "",
].join("\n")

mkdirSync(new URL("../cv", import.meta.url), { recursive: true })
writeFileSync(new URL("../cv/resume.tex", import.meta.url), document)
console.log(
  "Generated cv/resume.tex with " +
    profile.publications.filter((item) => item.includeInCv).length +
    " publications.",
)
