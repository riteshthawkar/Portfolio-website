"use client"

import { useState } from "react"
import { AnimatedSection } from "./animated-section"
import { PillButton } from "./pill-button"
import { ChevronDown } from "lucide-react"

const publications = [
  {
    id: "S2",
    tag: "arXiv 2026",
    title:
      "Ask, Solve, Generate: Self-Evolving Unified Multimodal Understanding and Generation via Self-Consistency Rewards",
    authors:
      "Ritesh Thawkar, Shravan Venkatraman, Omkar Thawakar, Abdelrahman Shaker, Fahad Khan, Hisham Cholakkal, Salman Khan, Rao Muhammad Anwer",
    type: "Preprint",
    status: "First Author",
    link: "https://arxiv.org/abs/2606.27376",
    linkLabel: "View Preprint",
    resources: [
      { label: "Project", href: "https://mbzuai-oryx.github.io/Ask-Solve-Generate/" },
      { label: "Code", href: "https://github.com/mbzuai-oryx/Ask-Solve-Generate" },
      { label: "Models", href: "https://huggingface.co/collections/Ritesh-hf/ask-solve-generate-paper-models" },
    ],
    abstract: String.raw`Most unified large multimodal models (LMMs) that support both visual understanding and image generation still rely on curated post-training supervision, such as human annotations, preference labels, or external reward models. We ask whether a unified LMM can improve both abilities autonomously using only unlabeled images. We propose a self-evolving training framework with three internal roles: a Proposer that generates visual questions, a Solver that answers and evaluates them, and a Generator that synthesizes images. Training uses only self-derived consistency signals, without human annotations, preference labels, or task-trained external reward/judge models. To stabilize learning, we introduce Solver Token Entropy (STE), a continuous difficulty signal based on token-level prediction uncertainty that remains useful even when sample-level consistency becomes unreliable. For image generation, we design a multi-scale internal evaluation scheme that combines question-answer fidelity scoring with cycle-consistent captioning. This creates a solver-mediated coupling, where better visual understanding enables more reliable generation assessment and stronger internal training signals. The framework preserves the same role decomposition, reward logic, and training schedule across diffusion-based BLIP3o, rectified-flow BAGEL, and autoregressive VARGPT-v1.1 architectures, requiring only each backbone's native prompting and generation interface. Across eight understanding metrics, our method consistently improves over the corresponding base models. On BAGEL, it achieves a $+3.5\%$ absolute gain on MMMU and improves GenEval image generation performance from $82\%$ to $85\%$. Code and models are publicly released.`
  },
  {
    id: "S3",
    tag: "arXiv 2026",
    title:
      "Paying More Attention to Visual Tokens in Self-Evolving Large Multimodal Models",
    authors:
      "Shravan Venkatraman, Ritesh Thawkar, Omkar Thawakar, Rao Muhammad Anwer, Hisham Cholakkal, Salman Khan, Fahad Khan",
    type: "Preprint",
    status: null,
    link: "https://arxiv.org/abs/2606.27373",
    linkLabel: "View Preprint",
    resources: [
      { label: "Project", href: "https://mbzuai-oryx.github.io/VISE" },
    ],
    abstract: String.raw`Recently, self-evolving large multimodal models (LMMs) have received attention for improving visual reasoning in a purely unsupervised setting. However, multi-role self-play and self-consistency reward schemes in existing self-evolving LMMs optimize answer agreement without ensuring the decoder attends to visual content, relying instead on statistical language priors to produce self consistent outputs. This leads to a persistent failure mode we term visual under-conditioning, where the decoder relies on language priors rather than the image during generation, manifesting as insufficient attention to visual tokens. As a result, current self-evolving LMMs struggle on vision--language understanding tasks such as image captioning and visual question answering. To address this, we propose VISE (Visual Invariance Self-Evolution), a purely unsupervised self-evolving framework that directly regularizes the model's visual conditioning policy through two complementary invariance-based rewards: a geometric invariance reward that enforces spatial consistency under known transformations, and a semantic invariance reward that penalizes evidence-agnostic generation by requiring the model to recognize the absence of evidence when predicted regions are perturbed. VISE operates within a single model without specialist roles, external reward models, or annotations, and is trained on raw unlabeled images. Experiments on 18 benchmarks demonstrate the efficacy of our approach. Using Qwen3-VL-2B as the base model, VISE achieves gains of $+16.85$ CIDEr on COCO and $+19.66$ CIDEr on TextCaps, reduces object hallucination by $5.0$ Chair-I points, and generalizes across four model families and scales. Our code and models are available at https://mbzuai-oryx.github.io/VISE`
  },
  {
    id: "S1",
    tag: "arXiv 2026",
    title:
      "Mobile-O: Unified Multimodal Understanding and Generation on Mobile Device",
    authors:
      "Abdelrahman Shaker, Ahmed Heakl, Jaseel Muhammad, Ritesh Thawkar, Omkar Thawakar, Senmao Li, Hisham Cholakkal, Ian Reid, Eric P. Xing, Salman Khan, Fahad Shahbaz Khan",
    type: "Preprint",
    status: null,
    link: "https://arxiv.org/abs/2602.20161",
    linkLabel: "View Preprint",
    resources: [
      { label: "Project", href: "https://amshaker.github.io/Mobile-O/" },
      { label: "Code", href: "https://github.com/Amshaker/Mobile-O" },
    ],
    abstract: String.raw`Unified multimodal models can both understand and generate visual content within a single architecture. Existing models, however, remain data-hungry and too heavy for deployment on edge devices. We present Mobile-O, a compact vision-language-diffusion model that brings unified multimodal intelligence to a mobile device. Its core module, the Mobile Conditioning Projector (MCP), fuses vision-language features with a diffusion generator using depthwise-separable convolutions and layerwise alignment. This design enables efficient cross-modal conditioning with minimal computational cost. Trained on only a few million samples and post-trained in a novel quadruplet format (generation prompt, image, question, answer), Mobile-O jointly enhances both visual understanding and generation capabilities. Despite its efficiency, Mobile-O attains competitive or superior performance compared to other unified models, achieving 74% on GenEval and outperforming Show-O and JanusFlow by 5% and 11%, while running 6x and 11x faster, respectively. For visual understanding, Mobile-O surpasses them by 15.3% and 5.1% averaged across seven benchmarks. Running in only ~3s per 512x512 image on an iPhone, Mobile-O establishes the first practical framework for real-time unified multimodal understanding and generation on edge devices. We hope Mobile-O will ease future research in real-time unified multimodal intelligence running entirely on-device with no cloud dependency. Our code, models, datasets, and mobile application are publicly available at https://amshaker.github.io/Mobile-O/`
  },
  {
    id: "C1",
    tag: "arXiv 2025",
    title:
      "EvoLMM: Self-Evolving Large Multimodal Models with Continuous Rewards",
    authors:
      "Omkar Thawakar, Shravan Venkatraman, Ritesh Thawkar, Abdelrahman Shaker, Hisham Cholakkal, Rao Muhammad Anwer, Salman Khan, Fahad Khan",
    type: "Preprint",
    status: null,
    link: "https://arxiv.org/abs/2511.16672",
    linkLabel: "View Preprint",
    resources: [
      { label: "Project", href: "https://mbzuai-oryx.github.io/EvoLMM/" },
      { label: "Code", href: "https://github.com/mbzuai-oryx/EvoLMM" },
      { label: "Models", href: "https://huggingface.co/omkarthawakar/EvoLMM" },
    ],
    abstract: String.raw`Recent advances in large multimodal models (LMMs) have enabled impressive reasoning and perception abilities, yet most existing training pipelines still depend on human-curated data or externally verified reward models, limiting their autonomy and scalability. In this work, we strive to improve LMM reasoning capabilities in a purely unsupervised fashion (without any annotated data or reward distillation). To this end, we propose a self-evolving framework, named EvoLMM, that instantiates two cooperative agents from a single backbone model: a Proposer, which generates diverse, image-grounded questions, and a Solver, which solves them through internal consistency, where learning proceeds through a continuous self-rewarding process. This dynamic feedback encourages both the generation of informative queries and the refinement of structured reasoning without relying on ground-truth or human judgments. When using the popular Qwen2.5-VL as the base model, our EvoLMM yields consistent gains upto $\sim$3\% on multimodal math-reasoning benchmarks, including ChartQA, MathVista, and MathVision, using only raw training images. We hope our simple yet effective approach will serve as a solid baseline easing future research in self-improving LMMs in a fully-unsupervised fashion. Our code and models are available at https://github.com/mbzuai-oryx/EvoLMM.`
  },
  {
    id: "S4",
    tag: "arXiv 2025",
    title:
      "How Good are Foundation Models in Step-by-Step Embodied Reasoning?",
    authors:
      "Dinura Dissanayake, Ahmed Heakl, Omkar Thawakar, Noor Ahsan, Ritesh Thawkar, Ketan More, Jean Lahoud, Rao Anwer, Hisham Cholakkal, Ivan Laptev, Fahad Shahbaz Khan, Salman Khan",
    type: "Preprint",
    status: null,
    link: "https://arxiv.org/abs/2509.15293",
    linkLabel: "View Preprint",
    resources: [
      { label: "Project", href: "https://mbzuai-oryx.github.io/FoMER-Bench/" },
    ],
    abstract: String.raw`Embodied agents operating in the physical world must make decisions that are not only effective but also safe, spatially coherent, and grounded in context. While recent advances in large multimodal models (LMMs) have shown promising capabilities in visual understanding and language generation, their ability to perform structured reasoning for real-world embodied tasks remains underexplored. In this work, we aim to understand how well foundation models can perform step-by-step reasoning in embodied environments. To this end, we propose the Foundation Model Embodied Reasoning (FoMER) benchmark, designed to evaluate the reasoning capabilities of LMMs in complex embodied decision-making scenarios. Our benchmark spans a diverse set of tasks that require agents to interpret multimodal observations, reason about physical constraints and safety, and generate valid next actions in natural language. We present (i) a large-scale, curated suite of embodied reasoning tasks, (ii) a novel evaluation framework that disentangles perceptual grounding from action reasoning, and (iii) empirical analysis of several leading LMMs under this setting. Our benchmark includes over 1.1k samples with detailed step-by-step reasoning across 10 tasks and 8 embodiments, covering three different robot types. Our results highlight both the potential and current limitations of LMMs in embodied reasoning, pointing towards key challenges and opportunities for future research in robot intelligence. Our data and code will be made publicly available.`
  },
  {
    id: "S5",
    tag: "arXiv 2025",
    title:
      "DriveLMM-o1: A Step-by-Step Reasoning Dataset and Large Multimodal Model for Driving Scenario Understanding",
    authors:
      "Ayesha Ishaq, Jean Lahoud, Ketan More, Omkar Thawakar, Ritesh Thawkar, Dinura Dissanayake, Noor Ahsan, Yuhao Li, Fahad Shahbaz Khan, Hisham Cholakkal, Ivan Laptev, Rao Muhammad Anwer, Salman Khan",
    type: "Preprint",
    status: null,
    link: "https://arxiv.org/abs/2503.10621",
    linkLabel: "View Preprint",
    resources: [
      { label: "Code", href: "https://github.com/ayesha-ishaq/DriveLMM-o1" },
    ],
    abstract: String.raw`While large multimodal models (LMMs) have demonstrated strong performance across various Visual Question Answering (VQA) tasks, certain challenges require complex multi-step reasoning to reach accurate answers. One particularly challenging task is autonomous driving, which demands thorough cognitive processing before decisions can be made. In this domain, a sequential and interpretive understanding of visual cues is essential for effective perception, prediction, and planning. Nevertheless, common VQA benchmarks often focus on the accuracy of the final answer while overlooking the reasoning process that enables the generation of accurate responses. Moreover, existing methods lack a comprehensive framework for evaluating step-by-step reasoning in realistic driving scenarios. To address this gap, we propose DriveLMM-o1, a new dataset and benchmark specifically designed to advance step-wise visual reasoning for autonomous driving. Our benchmark features over 18k VQA examples in the training set and more than 4k in the test set, covering diverse questions on perception, prediction, and planning, each enriched with step-by-step reasoning to ensure logical inference in autonomous driving scenarios. We further introduce a large multimodal model that is fine-tuned on our reasoning dataset, demonstrating robust performance in complex driving scenarios. In addition, we benchmark various open-source and closed-source methods on our proposed dataset, systematically comparing their reasoning capabilities for autonomous driving tasks. Our model achieves a +7.49% gain in final answer accuracy, along with a 3.62% improvement in reasoning score over the previous best open-source model. Our framework, dataset, and model are available at https://github.com/ayesha-ishaq/DriveLMM-o1.`
  },
  {
    id: "C2",
    tag: "EMNLP 2025",
    title:
      "Fann or Flop: A Multigenre, Multiera Benchmark for Arabic Poetry Understanding in LLMs",
    authors:
      "Wafa Al Ghallabi, Ritesh Thawkar, Sara Ghaboura, Ketan Pravin More, Omkar Thawakar, Hisham Cholakkal, Salman Khan, Rao Muhammad Anwer",
    type: "Conference",
    status: "Accepted",
    link: "https://arxiv.org/abs/2505.18152",
    linkLabel: "View Paper",
    resources: [
      { label: "Project", href: "https://mbzuai-oryx.github.io/FannOrFlop/" },
      { label: "Code", href: "https://github.com/mbzuai-oryx/FannOrFlop" },
      { label: "Dataset", href: "https://huggingface.co/datasets/omkarthawakar/FannOrFlop" },
    ],
    abstract: String.raw`Arabic poetry is one of the richest and most culturally rooted forms of expression in the Arabic language, known for its layered meanings, stylistic diversity, and deep historical continuity. Although large language models (LLMs) have demonstrated strong performance across languages and tasks, their ability to understand Arabic poetry remains largely unexplored. In this work, we introduce \emph{Fann or Flop}, the first benchmark designed to assess the comprehension of Arabic poetry by LLMs in 12 historical eras, covering 14 core poetic genres and a variety of metrical forms, from classical structures to contemporary free verse. The benchmark comprises a curated corpus of poems with explanations that assess semantic understanding, metaphor interpretation, prosodic awareness, and cultural context. We argue that poetic comprehension offers a strong indicator for testing how good the LLM understands classical Arabic through Arabic poetry. Unlike surface-level tasks, this domain demands deeper interpretive reasoning and cultural sensitivity. Our evaluation of state-of-the-art LLMs shows that most models struggle with poetic understanding despite strong results on standard Arabic benchmarks. We release "Fann or Flop" along with the evaluation suite as an open-source resource to enable rigorous evaluation and advancement for Arabic language models. Code is available at: https://github.com/mbzuai-oryx/FannOrFlop.`
  },
  {
    id: "C3",
    tag: "ACL 2025",
    title: "LlamaV-o1: Rethinking Step-by-step Visual Reasoning in LLMs",
    authors:
      "Omkar Thawakar, Dinura Dissanayake, Ketan Pravin More, Ritesh Thawkar, et al.",
    type: "Conference",
    status: "Accepted",
    link: "https://aclanthology.org/2025.findings-acl.1247/",
    linkLabel: "View Paper",
    resources: [
      { label: "arXiv", href: "https://arxiv.org/abs/2501.06186" },
      { label: "Project", href: "https://mbzuai-oryx.github.io/LlamaV-o1/" },
      { label: "Code", href: "https://github.com/mbzuai-oryx/LlamaV-o1" },
      { label: "Models", href: "https://huggingface.co/omkarthawakar/LlamaV-o1" },
    ],
    abstract: String.raw`Reasoning is a fundamental capability for solving complex multi-step problems, particularly in visual contexts where sequential step-wise understanding is essential. Existing approaches lack a comprehensive framework for evaluating visual reasoning and do not emphasize step-wise problem-solving. To this end, we propose a comprehensive framework for advancing step-by-step visual reasoning in large language models (LMMs) through three key contributions. First, we introduce a visual reasoning benchmark specifically designed to evaluate multi-step reasoning tasks. The benchmark presents a diverse set of challenges with eight different categories ranging from complex visual perception to scientific reasoning with over 4k reasoning steps in total, enabling robust evaluation of LLMs' abilities to perform accurate and interpretable visual reasoning across multiple steps. Second, we propose a novel metric that assesses visual reasoning quality at the granularity of individual steps, emphasizing both correctness and logical coherence. The proposed metric offers deeper insights into reasoning performance compared to traditional end-task accuracy metrics. Third, we present a new multimodal visual reasoning model, named LlamaV-o1, trained using a multi-step curriculum learning approach, where tasks are progressively organized to facilitate incremental skill acquisition and problem-solving. The proposed LlamaV-o1 is designed for multi-step reasoning and learns step-by-step through a structured training paradigm. Extensive experiments show that our LlamaV-o1 outperforms existing open-source models and performs favorably against close-source proprietary models. Compared to the recent Llava-CoT, our LlamaV-o1 achieves an average score of 67.3 with an absolute gain of 3.8\% across six benchmarks while being 5 times faster during inference scaling. Our benchmark, model, and code are publicly available.`
  },
  {
    id: "C4",
    tag: "ACL 2025",
    title:
      "Time Travel: A Comprehensive Benchmark to Evaluate LMMs on Historical and Cultural Artifacts",
    authors:
      "Sara Ghaboura, Ketan Pravin More, Ritesh Thawkar, Wafa Al Ghallabi, Omkar Thawakar, Fahad Shahbaz Khan, Hisham Cholakkal, Salman Khan, Rao Muhammad Anwer",
    type: "Conference",
    status: "Accepted",
    link: "https://aclanthology.org/2025.findings-acl.1211/",
    linkLabel: "View Paper",
    resources: [
      { label: "arXiv", href: "https://arxiv.org/abs/2502.14865" },
      { label: "Project", href: "https://mbzuai-oryx.github.io/TimeTravel/" },
      { label: "Code", href: "https://github.com/mbzuai-oryx/timetravel" },
    ],
    abstract: String.raw`Understanding historical and cultural artifacts demands human expertise and advanced computational techniques, yet the process remains complex and time-intensive. While large multimodal models offer promising support, their evaluation and improvement require a standardized benchmark. To address this, we introduce TimeTravel, a benchmark of 10,250 expert-verified samples spanning 266 distinct cultures across 10 major historical regions. Designed for AI-driven analysis of manuscripts, artworks, inscriptions, and archaeological discoveries, TimeTravel provides a structured dataset and robust evaluation framework to assess AI models' capabilities in classification, interpretation, and historical comprehension. By integrating AI with historical research, TimeTravel fosters AI-powered tools for historians, archaeologists, researchers, and cultural tourists to extract valuable insights while ensuring technology contributes meaningfully to historical discovery and cultural heritage preservation. We evaluate contemporary AI models on TimeTravel, highlighting their strengths and identifying areas for improvement. Our goal is to establish AI as a reliable partner in preserving cultural heritage, ensuring that technological advancements contribute meaningfully to historical discovery. Our code is available at: \url{https://github.com/mbzuai-oryx/TimeTravel}.`
  },
  {
    id: "C5",
    tag: "ICCV 2025",
    title:
      "Beyond Simple Edits: Composed Video Retrieval with Dense Modifications",
    authors:
      "Omkar Thawakar, Dmitry Demidov, Ritesh Thawkar, Rao Muhammad Anwer, Mubarak Shah, Fahad Shahbaz Khan, Salman Khan",
    type: "Conference",
    status: "Accepted",
    link: "https://arxiv.org/abs/2508.14039",
    linkLabel: "View Paper",
    resources: [
      { label: "Code", href: "https://github.com/OmkarThawakar/BSE-CoVR" },
    ],
    abstract: String.raw`Composed video retrieval is a challenging task that strives to retrieve a target video based on a query video and a textual description detailing specific modifications. Standard retrieval frameworks typically struggle to handle the complexity of fine-grained compositional queries and variations in temporal understanding limiting their retrieval ability in the fine-grained setting. To address this issue, we introduce a novel dataset that captures both fine-grained and composed actions across diverse video segments, enabling more detailed compositional changes in retrieved video content. The proposed dataset, named Dense-WebVid-CoVR, consists of 1.6 million samples with dense modification text that is around seven times more than its existing counterpart. We further develop a new model that integrates visual and textual information through Cross-Attention (CA) fusion using grounded text encoder, enabling precise alignment between dense query modifications and target videos. The proposed model achieves state-of-the-art results surpassing existing methods on all metrics. Notably, it achieves 71.3\% Recall@1 in visual+text setting and outperforms the state-of-the-art by 3.4\%, highlighting its efficacy in terms of leveraging detailed video descriptions and dense modification texts. Our proposed dataset, code, and model are available at :https://github.com/OmkarThawakar/BSE-CoVR`
  },
]

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
            <PillButton href={pub.link} label={pub.linkLabel} />
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
        <span className="border border-border bg-background px-2.5 py-1 font-sans text-xs text-muted-foreground">
          {pub.type}
        </span>
        {pub.status && (
          <span className="border border-brand/30 bg-brand-muted px-2.5 py-1 font-sans text-xs font-medium text-brand">
            {pub.status}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
        {pub.resources.map((resource) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border bg-background px-2.5 py-1 font-sans text-xs font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            {resource.label}
          </a>
        ))}
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
                  href="https://scholar.google.com/citations?hl=en&user=9-2AnjQAAAAJ"
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
