import {
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
} from "lucide-react"

import { HuggingFaceIcon } from "./hugging-face-icon"
import { profile } from "@/lib/profile"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${profile.person.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: profile.links.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    href: profile.links.github,
  },
  {
    icon: GraduationCap,
    label: "Scholar",
    href: profile.links.scholar,
  },
  {
    icon: HuggingFaceIcon,
    label: "Hugging Face",
    href: profile.links.huggingFace,
  },
  {
    icon: FileText,
    label: "CV",
    href: `${basePath}/resume.pdf`,
  },
]

export function Footer() {
  return (
    <footer className="px-6 pb-8 pt-16 sm:pb-10 sm:pt-24">
      <div className="site-shell border-t border-border pt-6">
        <div className="flex flex-wrap gap-2">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="inline-flex min-h-9 items-center gap-2 border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{profile.person.name} / {new Date().getFullYear()}</p>
          <p>Research, engineering, and useful systems.</p>
        </div>
      </div>
    </footer>
  )
}
