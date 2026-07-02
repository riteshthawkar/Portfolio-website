"use client"

import { useEffect, useState } from "react"
import { MapPin, Download } from "lucide-react"
import { GridBackground } from "@/components/grid-background"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="about" className="relative px-6 pt-14 pb-0 sm:pt-14">
      <GridBackground />
      <div className="mx-auto max-w-5xl border-x border-t border-border bg-background px-6 py-10 relative z-10 sm:px-10 sm:py-14">
        <div>
          <div
            className={`transition-all duration-1000 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <h1 className="font-display font-semibold text-5xl tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Ritesh Thawkar
            </h1>
          </div>

          <div
            className={`mt-6 flex flex-wrap items-center justify-between gap-4 transition-all delay-200 duration-1000 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <p className="text-base font-medium text-muted-foreground sm:text-lg">
              AI Researcher &middot; Computer Vision &middot; Multimodal Systems
            </p>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Abu Dhabi, UAE
            </span>
          </div>

          <div
            className={`mt-12 max-w-3xl space-y-6 transition-all delay-400 duration-1000 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              I build multimodal AI systems that move between research prototypes and production-scale agentic applications.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {"Currently pursuing an MSc in Computer Vision at "}
              <a
                href="https://mbzuai.ac.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                MBZUAI
              </a>
              {", where I work on VLM reasoning, self-evolving LMMs, and retrieval-backed AI agents."}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {"My work spans published research at "}
              <a
                href="#publications"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                CVPR
              </a>
              {", "}
              <a
                href="#publications"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                ACL
              </a>
              {", "}
              <a
                href="#publications"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                EMNLP
              </a>
              {", and "}
              <a
                href="#publications"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                ICCV
              </a>
              {", plus deployed AI products serving real users."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 pb-4">
              <a
                href={`${basePath}/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#publications"
                className="inline-flex items-center border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                View Research
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
