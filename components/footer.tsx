"use client"

import { Mail, Linkedin, Github, GraduationCap, FileText } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const contactLinks = [
  {
    icon: Mail,
    label: "Mail",
    value: "riteshthawkar2003@gmail.com",
    href: "mailto:riteshthawkar2003@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/ritesh-thawkar-b13192233",
    href: "https://www.linkedin.com/in/ritesh-thawkar-b13192233/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "/riteshthawkar",
    href: "https://github.com/riteshthawkar",
  },
  {
    icon: GraduationCap,
    label: "Google Scholar",
    value: "Ritesh Thawkar",
    href: "https://scholar.google.com/citations?hl=en&user=9-2AnjQAAAAJ",
  },
  {
    icon: FileText,
    label: "CV",
    value: "Ritesh Thawkar",
    href: `${basePath}/resume.pdf`,
  },
]

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
]

export function Footer() {
  return (
    <footer className="px-6 py-0">
      <div className="mx-auto max-w-5xl overflow-hidden border border-border bg-background">
        {/* Contact Bento */}
        <div className="flex flex-col items-center justify-center border-b border-border bg-background px-6 py-10 text-center sm:px-10 sm:py-12">
          <h3 className="mb-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ritesh Thawkar
          </h3>
          <p className="mb-8 text-sm text-muted-foreground">
            MSc Computer Vision at MBZUAI
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-brand"
              >
                <link.icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer bar */}
        <div className="px-6 py-5 sm:px-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Ritesh Thawkar | {new Date().getFullYear()}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
