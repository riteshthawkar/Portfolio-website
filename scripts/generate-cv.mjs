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

function link(url, label) {
  return "\\href{" + latex(url) + "}{" + latex(label) + "}"
}

function emphasizeName(authors) {
  return latex(authors).replaceAll(
    latex(profile.person.name),
    "\\textbf{" + latex(profile.person.name) + "}",
  )
}

function sentence(value) {
  const text = String(value).trim()
  return /[.!?]$/.test(text) ? text : text + "."
}

const education = profile.education
  .map((item) =>
    [
      "\\textbf{" + latex(item.degree) + "} & " + latex(item.period) + " \\\\",
      latex(item.school) + " & \\textbf{GPA: " + latex(item.gpa) + "} \\\\[3pt]",
    ].join("\n"),
  )
  .join("\n")

const experience = profile.experiences
  .map((item) =>
    [
      "\\textbf{" + latex(item.role) + "} \\hfill " + latex(item.period) + " \\\\",
      "\\textit{" + latex(item.company) + "} \\hfill " + latex(item.location),
      "\\begin{itemize}",
      item.highlights.map((highlight) => "  \\item " + latex(highlight)).join("\n"),
      "\\end{itemize}",
    ].join("\n"),
  )
  .join("\n")

const publications = profile.publications
  .filter((publication) => publication.includeInCv)
  .map(
    (publication) =>
      "\\item[\\textbf{" +
      latex(publication.tag) +
      "}] \\textbf{" +
      latex(sentence(publication.title)) +
      "} " +
      emphasizeName(sentence(publication.authors)) +
      " " +
      link(publication.link, publication.linkLabel) +
      ".",
  )
  .join("\n")

const projects = profile.projects
  .filter((project) => project.cvFeatured)
  .map((project) =>
    [
      "\\textbf{" +
        latex(project.title) +
        "} \\hfill \\textit{" +
        latex(project.status) +
        "} \\\\",
      "\\textit{" + latex(project.tools.join(", ")) + "} \\\\",
      latex(project.description) +
        (project.link ? " " + link(project.link, project.linkLabel ?? "Project") : ""),
      "\\par\\smallskip",
    ].join("\n"),
  )
  .join("\n")

const skills = profile.skills
  .map(
    (group) =>
      "\\textbf{" +
      latex(group.category) +
      ":} " +
      latex(group.skills.map((skill) => skill.name).join(", ")),
  )
  .join("\\\\\n")

const document = [
  "\\documentclass[10pt,a4paper]{article}",
  "\\usepackage[margin=0.58in]{geometry}",
  "\\usepackage[T1]{fontenc}",
  "\\usepackage[utf8]{inputenc}",
  "\\usepackage{enumitem}",
  "\\usepackage{hyperref}",
  "\\usepackage{xcolor}",
  "\\usepackage{tabularx}",
  "\\usepackage{titlesec}",
  "\\usepackage{microtype}",
  "",
  "\\definecolor{accent}{HTML}{0B7285}",
  "\\hypersetup{colorlinks=true,urlcolor=accent,linkcolor=accent}",
  "\\pagestyle{empty}",
  "\\setlength{\\parindent}{0pt}",
  "\\setlength{\\parskip}{2pt}",
  "\\setlist[itemize]{leftmargin=1.2em,itemsep=1pt,topsep=2pt}",
  "\\setlist[description]{leftmargin=0pt,labelsep=0.6em,itemsep=4pt,topsep=2pt}",
  "\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0pt}{}[\\vspace{-3pt}\\rule{\\linewidth}{0.35pt}]",
  "\\titlespacing*{\\section}{0pt}{8pt}{4pt}",
  "",
  "\\begin{document}",
  "",
  "\\begin{center}",
  "  {\\LARGE\\bfseries " + latex(profile.person.name) + "}\\\\[4pt]",
  "  " + latex(profile.person.headline) + "\\\\[4pt]",
  "  " +
    latex(profile.person.location) +
    " \\enspace | \\enspace " +
    link("mailto:" + profile.person.email, profile.person.email) +
    " \\enspace | \\enspace " +
    latex(profile.person.phone) +
    "\\\\[3pt]",
  "  " +
    [
      link(profile.links.github, "GitHub"),
      link(profile.links.scholar, "Google Scholar"),
      link(profile.links.huggingFace, "Hugging Face"),
      link(profile.links.linkedin, "LinkedIn"),
      link(profile.links.portfolio, "Portfolio"),
    ].join(" \\enspace | \\enspace "),
  "\\end{center}",
  "",
  "\\section*{Profile}",
  latex(profile.person.summary),
  "",
  "\\section*{Education}",
  "\\begin{tabularx}{\\linewidth}{@{}X r@{}}",
  education,
  "\\end{tabularx}",
  "",
  "\\section*{Experience}",
  experience,
  "",
  "\\section*{Publications}",
  "\\begin{description}",
  publications,
  "\\end{description}",
  "",
  "\\section*{Selected Projects}",
  projects,
  "",
  "\\section*{Technical Skills}",
  skills,
  "",
  "\\vfill",
  "{\\footnotesize\\color{gray} Last updated " +
    latex(profile.lastUpdated) +
    " from the portfolio's shared profile data.}",
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
