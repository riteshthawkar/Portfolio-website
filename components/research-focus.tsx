import { AnimatedSection } from "./animated-section"

const focusAreas = [
  "Self-evolving multimodal understanding and generation from unlabeled visual data",
  "Grounded VideoQA with budget-aware evidence acquisition",
  "LLM and VLM evaluation for reasoning, retrieval, grounding, and generation",
  "Applied AI systems using RAG, agents, dashboards, and domain assistants",
]

export function ResearchFocus() {
  return (
    <section id="focus" className="px-6 py-0 relative">
      <div className="mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background relative z-10">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Direction
            </p>
            <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
              Research Focus
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="grid gap-0 border-b border-border sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <AnimatedSection className="border-x border-t border-border bg-background px-5 py-6 sm:px-6 sm:py-8">
              <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
                I am interested in AI systems that improve from their own interaction traces: asking better questions, selecting reliable evidence, generating useful supervision, and evaluating the loop with grounded metrics.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={150} className="border-x border-t border-border bg-background">
              <div className="divide-y divide-border">
                {focusAreas.map((area, index) => (
                  <div key={area} className="grid grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="border-r border-border px-4 py-4 font-sans text-xs font-semibold tracking-[0.24em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                      {area}
                    </p>
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