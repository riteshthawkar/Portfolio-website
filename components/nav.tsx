"use client"

import { ChevronDown, Github, GraduationCap, Mail } from "lucide-react"

import { HuggingFaceIcon } from "./hugging-face-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const links = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
]

const connectionLinks = [
  {
    label: "Email",
    href: "mailto:riteshthawkar2003@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/riteshthawkar",
    icon: Github,
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?hl=en&user=9-2AnjQAAAAJ",
    icon: GraduationCap,
  },
  {
    label: "Hugging Face",
    href: "https://huggingface.co/Ritesh-hf",
    icon: HuggingFaceIcon,
  },
]

export function Nav() {
  return (
    <header
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-6"
    >
      <nav
        className="pointer-events-auto mx-auto flex max-w-5xl items-stretch justify-between border border-border/70 bg-background/70 backdrop-blur-xl transition-all duration-500"
      >
        <a
          href="#about"
          className="flex items-center border-r border-border/70 px-6 py-4 font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
        >
          RT.
        </a>

        <div className="hidden items-stretch md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center px-4 py-4 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-stretch">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 border-l border-border/70 px-4 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-5"
                aria-label="Open connection links"
              >
                <Mail className="h-4 w-4" />
                <span>Connect</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-52 rounded-none border-border bg-background/95 p-0 shadow-none backdrop-blur-xl"
            >
              {connectionLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild className="rounded-none px-3 py-3">
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex w-full items-center gap-3 text-muted-foreground hover:text-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
