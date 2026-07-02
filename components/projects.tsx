"use client"

import { AnimatedSection } from "./animated-section"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLink, LockKeyhole } from "lucide-react"

const projects = [
  {
    title: "MBZUAI Web Agent Suite",
    description:
      "Production web-agent system answering MBZUAI website queries with retrieval, tool use, and response verification.",
    status: "Production",
    impact: "Thousands of active users",
    tools: [
      "Agentic RAG",
      "Web Agents",
      "LLM Orchestration",
      "FastAPI",
    ],
    details: "Built an LLM-driven agentic pipeline that resolves MBZUAI website queries using retrieval, tool-use, and response verification. Deployed the system in production, serving thousands of users and iterating prompts, tools, and routing based on real traffic. Developed an interaction analytics dashboard to track user intents, content gaps, and unresolved queries for continuous Agentic RAG tuning.",
  },
  {
    title: "Lawa Agent Studio",
    description:
      "Platform for creating customizable LLM-powered agentic chatbots with configurable tools, tone, and knowledge sources.",
    status: "Private Platform",
    impact: "Configurable tools, tone, and knowledge ingestion",
    tools: ["LLM", "RAG", "Workflow Orchestration", "React", "FastAPI"],
    details: "Built a platform for creating customizable LLM-powered agentic chatbots with configurable tools, tone, and knowledge sources. Implemented ingestion and indexing pipelines for website and document sources to enable fast, accurate LLM responses. Added analytics and evaluation hooks to measure resolution rates, user satisfaction, and retrieval quality for LLM improvements.",
  },
  {
    title: "Lawa.ai",
    description:
      "Enterprise agentic AI platform for multilingual, privacy-first assistants and revenue-generating deployments.",
    status: "Live Product",
    impact: "$130K+ annual projected value",
    tools: ["LLM", "RAG", "Workflow Orchestration", "FastAPI", "React"],
    link: "https://lawa.ai",
    linkLabel: "Visit Lawa.ai",
    details: "Designed and developed LLM-powered web assistants to improve user interaction and engagement for websites. Implemented a document retrieval system using vector databases to ground LLM responses and improve query resolution accuracy. Developed backend workflows and API integration using FastAPI and websockets for scalable deployment.",
  },
  {
    title: "Nutrigenics.care",
    description:
      "Personalized nutrition platform with an image-aware Nutrition-GPT engine and recommendation workflows.",
    status: "Startup Platform",
    impact: "$150K Microsoft Founders Hub grant",
    tools: ["LLM", "Django", "PostgreSQL", "Recommendation System"],
    link: "https://nutrigenics.care",
    linkLabel: "Visit Nutrigenics.care",
    details: "Designed and developed the platform's web infrastructure to manage user and recipe data efficiently, enhancing scalability and usability. Integrated NutritionGPT to power LLM-based recipe recommendations from image inputs and user preferences. Implemented a personalized recommendation system leveraging LLMs to tailor nutrition and recipe suggestions to individual needs. Optimized backend workflows using Django and PostgreSQL to ensure efficient data handling and faster response times.",
  },
]

export function Projects() {
  return (
    <section id="projects" className="px-6 py-0 relative">
      <div className="mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background relative z-10">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Work
            </p>
            <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
              Systems & Deployments
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="py-8 sm:py-10">
            <AnimatedSection>
              <div className="border-b border-border">
                {projects.map((project, i) => (
                  <Dialog key={project.title}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group grid w-full cursor-pointer border-x border-t border-border bg-background text-left transition-colors hover:bg-muted/30 lg:grid-cols-[9rem_minmax(0,1fr)_12rem]"
                      >
                        <div className="border-b border-border px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                          <span className="mb-4 block font-sans text-xs font-semibold tracking-[0.24em] text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="inline-flex border border-brand/30 bg-brand-muted px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand">
                            {project.status}
                          </span>
                        </div>

                        <div className="border-b border-border px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                          <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                            {project.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="border border-border bg-background px-2.5 py-1 font-sans text-[11px] font-medium text-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between px-5 py-5 lg:px-6 lg:py-6">
                          <div>
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                              Impact
                            </span>
                            <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
                              {project.impact}
                            </p>
                          </div>
                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                            View Details <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="rounded-none shadow-none sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      {project.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="border border-brand/30 bg-brand-muted px-2.5 py-1 font-sans text-xs font-semibold text-brand">
                        {project.status}
                      </span>
                      <span className="border border-border bg-background px-2.5 py-1 font-sans text-xs text-foreground">
                        {project.impact}
                      </span>
                    </div>
                    <h4 className="font-medium mb-2 text-foreground">Project Details</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {project.details.split('. ').join('.\n\n')}
                    </p>
                    <div className="mt-6">
                      <h4 className="font-medium mb-3 text-foreground">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="border border-border bg-secondary px-2.5 py-1 font-sans text-xs text-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                      >
                        {project.linkLabel ?? "Open Project"}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 border border-border bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground">
                        <LockKeyhole className="h-4 w-4" />
                        Private Deployment
                      </span>
                    )}
                  </div>
                    </DialogContent>
                  </Dialog>
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
