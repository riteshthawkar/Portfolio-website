"use client"

import { AnimatedSection } from "./animated-section"
import {
  Code,
  Brain,
  Globe,
  Database,
  Cloud,
  GitBranch,
  Flame,
  BarChart3,
  Cpu,
  Layout,
  Server,
  FileCode,
  Boxes,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Skill {
  name: string
  icon: LucideIcon
}

const skillGroups: { category: string; summary: string; skills: Skill[] }[] = [
  {
    category: "AI Systems",
    summary: "Research workflows for multimodal agents, retrieval, and model evaluation.",
    skills: [
      { name: "Agentic RAG", icon: Brain },
      { name: "VLMs", icon: Cpu },
      { name: "LLM Evaluation", icon: BarChart3 },
      { name: "Vector Search", icon: Database },
    ],
  },
  {
    category: "Languages",
    summary: "Core implementation languages for model tooling and production systems.",
    skills: [
      { name: "Python", icon: Code },
      { name: "JavaScript", icon: FileCode },
      { name: "C", icon: Cpu },
    ],
  },
  {
    category: "ML / Deep Learning",
    summary: "Training, experimentation, analysis, and numerical computing stack.",
    skills: [
      { name: "PyTorch", icon: Flame },
      { name: "TensorFlow", icon: Brain },
      { name: "Scikit-learn", icon: BarChart3 },
      { name: "NumPy", icon: Boxes },
      { name: "Pandas", icon: Zap },
    ],
  },
  {
    category: "Web Technologies",
    summary: "Interfaces and APIs for applied AI products and research demos.",
    skills: [
      { name: "Django", icon: Globe },
      { name: "FastAPI", icon: Server },
      { name: "React", icon: Layout },
      { name: "Flask", icon: Globe },
      { name: "TailwindCSS", icon: Layout },
    ],
  },
  {
    category: "Databases",
    summary: "Relational storage for applications, analytics, and experiment data.",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "SQLite", icon: Database },
    ],
  },
  {
    category: "Cloud & DevOps",
    summary: "Deployment, versioning, and infrastructure for reliable delivery.",
    skills: [
      { name: "AWS", icon: Cloud },
      { name: "Azure", icon: Cloud },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GitBranch },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="px-6 py-0 relative">
      <div className="mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background relative z-10">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Toolkit
            </p>
            <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
              Technical Stack
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="py-8 sm:py-10">
            <AnimatedSection>
              <div className="border-b border-border">
                {skillGroups.map((group, gi) => (
                  <div
                    key={group.category}
                    className={`grid border-x border-t border-border bg-background md:grid-cols-[14rem_minmax(0,1fr)] ${gi === 0 ? "bg-brand-muted/30" : ""}`}
                  >
                    <div className="border-b border-border px-5 py-5 md:border-b-0 md:border-r md:px-6 md:py-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className={`font-sans text-xs font-semibold tracking-[0.24em] ${gi === 0 ? "text-brand" : "text-muted-foreground"}`}>
                          {String(gi + 1).padStart(2, "0")}
                        </span>
                        {gi === 0 && (
                          <span className="border border-brand/30 bg-background px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand">
                            Lead
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {group.category}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {group.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group flex min-h-18 items-center gap-3 border-b border-r border-border bg-background px-4 py-4 transition-colors hover:bg-muted/30"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-muted/30 text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                            <skill.icon className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-semibold text-foreground/85 transition-colors group-hover:text-foreground">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
          <div className="section-rail hidden border-l border-border sm:block" />
        </div>
      </div>
    </section>
  )
}
