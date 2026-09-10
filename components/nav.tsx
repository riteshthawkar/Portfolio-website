"use client"

import {
  ChevronDown,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
} from "lucide-react"

import { HuggingFaceIcon } from "./hugging-face-icon"
import { profile } from "@/lib/profile"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#focus" },
  { label: "Publications", href: "#publications" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
]

const connectionLinks = [
  {
    label: "Email",
    href: `mailto:${profile.person.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    icon: Github,
  },
  {
    label: "Google Scholar",
    href: profile.links.scholar,
    icon: GraduationCap,
  },
  {
    label: "Hugging Face",
    href: profile.links.huggingFace,
    icon: HuggingFaceIcon,
  },
]

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between" aria-label="Primary navigation">
        <a
          href="#about"
          className="font-display text-base font-semibold text-foreground transition-colors hover:text-brand"
        >
          {profile.person.initials}.
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="hidden items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
                aria-label="Open connection links"
              >
                Connect
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-52 border-border bg-background/95 p-1 shadow-none backdrop-blur-xl"
            >
              {connectionLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild className="px-3 py-2.5">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-48 border-border bg-background/95 p-1 shadow-none backdrop-blur-xl"
            >
              {links.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="px-3 py-2.5">
                  <a href={link.href} className="w-full text-muted-foreground hover:text-foreground">
                    {link.label}
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="px-3 py-2.5 sm:hidden">
                <a href="#contact" className="w-full text-brand">
                  Connect
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
