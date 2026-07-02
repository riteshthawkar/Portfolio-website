"use client"

import { useState } from "react"
import { AnimatedSection } from "./animated-section"
import { PillButton } from "./pill-button"
import { ChevronDown } from "lucide-react"

const publications = [
  {
    id: "C1",
    tag: "CVPR 2026",
    title:
      "EvoLMM: Self-Evolving Large Multimodal Models with Continuous Rewards",
    authors:
      "Omkar Thawakar, Shravan Venkatraman, Ritesh Thawkar, Abdelrahman Shaker, Hisham Cholakkal, Rao Muhammad Anwer, Salman Khan, Fahad Khan",
    abstract: "Recent advancements in large multimodal models (LMMs) have led to impressive capabilities in reasoning and perception, but their training often relies on human-curated data or external reward models, which can limit their autonomy and scalability. To address this, a new framework called EvoLMM has been proposed, aiming to enhance LMM reasoning in a purely unsupervised manner without annotated data or reward distillation. EvoLMM introduces a self-evolving framework that instantiates two cooperative agents from a single backbone model: a Proposer and a Solver. When using Qwen2.5-VL as the base model, EvoLMM demonstrates consistent improvements of up to approximately 3% on multimodal math-reasoning benchmarks like ChartQA, MathVista, and MathVision, using only raw training images."
  },
  {
    id: "S1",
    tag: "arXiv 2026",
    title:
      "Mobile-O: Unified Multimodal Understanding and Generation on Mobile Device",
    authors:
      "Abdelrahman Shaker, Ahmed Heakl, Jaseel Muhammad, Ritesh Thawkar, Omkar Thawakar, Senmao Li, Hisham Cholakkal, Ian Reid, Eric P. Xing, Salman Khan, Fahad Shahbaz Khan",
    abstract: "Unified multimodal models, capable of both understanding and generating visual content within a single architecture, currently face challenges regarding data requirements and heavy computational demands, making them unsuitable for edge device deployment. The paper introduces Mobile-O, a compact vision-language-diffusion model designed to bring unified multimodal intelligence to mobile devices. Its core component, the Mobile Conditioning Projector (MCP), integrates vision-language features with a diffusion generator. Despite its efficiency, Mobile-O achieves competitive or superior performance compared to other unified models, reaching 74% on GenEval and outperforming models like Show-O and JanusFlow."
  },
  {
    id: "C2",
    tag: "EMNLP 2025",
    title:
      "Fann or Flop: A Multigenre, Multiera Benchmark for Arabic Poetry Understanding in LLMs",
    authors:
      "Wafa Al Ghallabi, Ritesh Thawkar, Sara Ghaboura, Ketan Pravin More, Omkar Thawakar, Hisham Cholakkal, Salman Khan, Rao Muhammad Anwer",
    abstract: "Arabic poetry is a rich and culturally significant form of expression, characterized by layered meanings, stylistic diversity, and historical continuity. Despite the strong performance of Large Language Models (LLMs) in various languages and tasks, their ability to comprehend Arabic poetry remains largely unexplored. This paper introduces \"Fann or Flop,\" the first benchmark specifically designed to evaluate LLMs' understanding of Arabic poetry. It covers 12 historical eras and includes 14 core poetic genres and diverse metrical forms. Evaluations reveal that most state-of-the-art LLMs struggle with poetic understanding, even if they perform well on standard Arabic benchmarks."
  },
  {
    id: "C3",
    tag: "ACL 2025",
    title: "LlamaV-o1: Rethinking Step-by-step Visual Reasoning in LLMs",
    authors:
      "Omkar Thawakar, Dinura Dissanayake, Ketan Pravin More, Ritesh Thawkar, et al.",
    abstract: "Reasoning is a fundamental capability for solving complex multi-step problems, particularly in visual contexts where sequential step-wise understanding is essential. We propose a comprehensive framework for advancing step-by-step visual reasoning in large language models (LMMs). First, we introduce a visual reasoning benchmark designed to evaluate multi-step reasoning tasks. Second, we propose a novel metric assessing visual reasoning quality emphasizing both correctness and logical coherence. Third, we present a new multimodal visual reasoning model, named LlamaV-o1, trained using a multi-step curriculum learning approach. LlamaV-o1 outperforms existing open-source models and performs favorably against closed-source proprietary models."
  },
  {
    id: "C4",
    tag: "ACL 2025",
    title:
      "Time Travel: A Comprehensive Benchmark to Evaluate LMMs on Historical and Cultural Artifacts",
    authors:
      "Sara Ghaboura, Ketan Pravin More, Ritesh Thawkar, Wafa Al Ghallabi, Omkar Thawakar, Fahad Shahbaz Khan, Hisham Cholakkal, Salman Khan, Rao Muhammad Anwer",
    abstract: "Understanding historical and cultural artifacts requires human expertise and advanced computational techniques. While large multimodal models (LMMs) offer promising support, their evaluation necessitates a standardized benchmark. This paper introduces TimeTravel, a benchmark comprising 10,250 expert-verified samples spanning 266 distinct cultures across 10 major historical regions. It offers a structured dataset and robust evaluation framework to assess AI models' capabilities in classification, interpretation, and historical comprehension. By evaluating closed- and open-source LMMs, the authors identify their strengths and limitations in handling historically significant artifacts."
  },
  {
    id: "C5",
    tag: "ICCV 2025",
    title:
      "Beyond Simple Edits: Composed Video Retrieval with Dense Modifications",
    authors:
      "Omkar Thawakar, Dmitry Demidov, Ritesh Thawkar, Rao Muhammad Anwer, Mubarak Shah, Fahad Shahbaz Khan, Salman Khan",
    abstract: "Composed video retrieval aims to retrieve a target video based on a query video and a textual description detailing specific modifications. Standard frameworks often struggle with fine-grained compositional queries. To overcome this, researchers introduce a novel dataset called Dense-WebVid-CoVR, designed to capture fine-grained and composed actions across diverse video segments. It comprises 1.6 million samples with dense modification text. The paper develops an integrated model utilizing a grounded text encoder for precise visual-textual alignment. The proposed model achieves state-of-the-art results, including 71.3% Recall@1 in the visual+text setting."
  },
]

function scholarSearchHref(title: string) {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`
}

function highlightName(authors: string) {
  const parts = authors.split("Ritesh Thawkar")
  if (parts.length === 1) return <span>{authors}</span>
  return (
    <span>
      {parts[0]}
      <span className="font-semibold text-foreground">Ritesh Thawkar</span>
      {parts[1]}
    </span>
  )
}

function PublicationItem({ pub }: { pub: typeof publications[0] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article
      className="group relative flex flex-col gap-4 overflow-hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Top Row: Title, Chevron, and Button */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug text-foreground flex-1 pr-4">
          {pub.title}
        </h3>

        <div className="flex shrink-0 items-center gap-4">
          <div onClick={(e) => e.stopPropagation()}>
            <PillButton href={scholarSearchHref(pub.title)} label="Find Paper" />
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label={isOpen ? "Collapse abstract" : "Expand abstract"}
            aria-expanded={isOpen}
          >
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Middle Row: Authors */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {highlightName(pub.authors)}
      </p>

      {/* Bottom Row: Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-1">
        <span className="border border-brand bg-brand px-2.5 py-1 font-sans text-xs font-semibold text-brand-foreground">
          {pub.tag}
        </span>
      </div>

      {/* Hidden Detail: Abstract */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          {isOpen && (
            <div className="border-l border-brand bg-muted/30 p-4 mt-2">
              <h4 className="text-sm font-semibold mb-2 text-foreground">Abstract</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pub.abstract}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function Publications() {
  return (
    <section id="publications" className="px-6 py-0 relative">
      <div className="mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background relative z-10">
        <AnimatedSection className="border-b border-border bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Research
            </p>
            <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
              Spotlight Research
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
          <div className="section-rail hidden border-r border-border sm:block" />
          <div className="pb-8 sm:pb-10">
            <div className="flex flex-col border-b border-border">
              {publications.map((pub) => (
                <div key={pub.id} className="border-x border-t border-border bg-background px-5 py-6 sm:px-6 sm:py-8">
                  <PublicationItem pub={pub} />
                </div>
              ))}
            </div>

            <AnimatedSection delay={400}>
              <div className="mt-10 flex justify-center">
                <PillButton
                  href="https://scholar.google.com/citations?user=nZz-I00AAAAJ&hl=en"
                  label="View All on Google Scholar"
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="section-rail hidden border-l border-border sm:block" />
        </div>
      </div>
    </section>
  )
}
