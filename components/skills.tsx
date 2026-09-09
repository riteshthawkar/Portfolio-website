"use client"

import {
  BarChart3,
  Boxes,
  Brain,
  Cloud,
  Code,
  Cpu,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Globe,
  Layout,
  Server,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { profile } from "@/lib/profile"
import { AnimatedSection } from "./animated-section"

const skillIcons: Record<string, LucideIcon> = {
  boxes: Boxes,
  brain: Brain,
  chart: BarChart3,
  cloud: Cloud,
  code: Code,
  cpu: Cpu,
  database: Database,
  fileCode: FileCode,
  flame: Flame,
  gitBranch: GitBranch,
  globe: Globe,
  layout: Layout,
  server: Server,
  zap: Zap,
}

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-0">
      <div className="relative z-10 mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Toolkit
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Technical Stack
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="py-8 sm:py-10">
            <AnimatedSection>
              <div className="border-b border-border">
                {profile.skills.map((group, groupIndex) => (
                  <div
                    key={group.category}
                    className={`grid border-x border-t border-border bg-background md:grid-cols-[14rem_minmax(0,1fr)] ${
                      group.lead ? "bg-brand-muted/30" : ""
                    }`}
                  >
                    <div className="border-b border-border px-5 py-5 md:border-b-0 md:border-r md:px-6 md:py-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span
                          className={`font-sans text-xs font-semibold tracking-[0.24em] ${
                            group.lead ? "text-brand" : "text-muted-foreground"
                          }`}
                        >
                          {String(groupIndex + 1).padStart(2, "0")}
                        </span>
                        {group.lead ? (
                          <span className="border border-brand/30 bg-background px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand">
                            Lead
                          </span>
                        ) : null}
                      </div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {group.category}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {group.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {group.skills.map((skill) => {
                        const SkillIcon = skillIcons[skill.icon] ?? Code

                        return (
                          <div
                            key={skill.name}
                            className="group flex min-h-18 items-center gap-3 border-b border-r border-border bg-background px-4 py-4 transition-colors hover:bg-muted/30"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-muted/30 text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                              <SkillIcon className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-semibold text-foreground/85 transition-colors group-hover:text-foreground">
                              {skill.name}
                            </span>
                          </div>
                        )
                      })}
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
