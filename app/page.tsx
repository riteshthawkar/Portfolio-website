import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ResearchFocus } from "@/components/research-focus"
import { Publications } from "@/components/publications"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <ResearchFocus />
        <Publications />
        <Projects />
        <Experience />
        <Skills />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
