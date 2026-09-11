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
import { SectionHeading } from "./section-heading"

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
    <section id="skills" className="site-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Technical practice"
          title="Tools I work with"
          aside={`${profile.skills.length} areas`}
        />

        <AnimatedSection>
          <div className="space-y-14 sm:space-y-16">
            {profile.skills.map((group, groupIndex) => (
              <article
                key={group.category}
                className="grid gap-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-10"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={group.lead ? "text-brand" : ""}>
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    {group.lead ? <span>/ Primary</span> : null}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{group.category}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.summary}</p>
                </div>

                <div className="flex flex-wrap content-start gap-2">
                  {group.skills.map((skill) => {
                    const SkillIcon = skillIcons[skill.icon] ?? Code

                    return (
                      <span
                        key={skill.name}
                        className="inline-flex min-h-9 items-center gap-2 border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
                      >
                        <SkillIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        {skill.name}
                      </span>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
