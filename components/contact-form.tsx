"use client"

import { useState } from "react"
import { ArrowUpRight, Send } from "lucide-react"

import { AnimatedSection } from "./animated-section"
import { SectionHeading } from "./section-heading"
import { profile } from "@/lib/profile"

type SubmitState = {
  status: "idle" | "success" | "error"
  message: string
}

const WEB3FORMS_ACCESS_KEY = "513273c6-da7d-472b-80af-805391f3aea6"
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit"

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitState({ status: "idle", message: "" })

    try {
      const body = new FormData()
      body.append("access_key", WEB3FORMS_ACCESS_KEY)
      body.append("name", formData.name)
      body.append("email", formData.email)
      body.append("message", formData.message)
      body.append("subject", `Portfolio Contact from ${formData.name}`)
      body.append("from_name", `${profile.person.name} Portfolio`)
      body.append("botcheck", formData.website)

      const response = await fetch(WEB3FORMS_API_URL, {
        method: "POST",
        body,
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message ?? "Message could not be sent right now.")
      }

      setFormData({ name: "", email: "", message: "", website: "" })
      setSubmitState({
        status: "success",
        message: "Message sent. Thanks for reaching out.",
      })
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Message could not be sent right now.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  return (
    <section id="contact" className="site-section pb-8 sm:pb-12">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Have something in mind?"
          description="For research collaboration, engineering work, or a useful technical conversation, send a note."
        />

        <AnimatedSection>
          <div className="grid gap-10 sm:grid-cols-[minmax(14rem,0.75fr)_minmax(0,1.25fr)] sm:gap-14">
            <aside>
              <p className="text-sm leading-6 text-muted-foreground">
                {profile.research.openTo.join(" ")}
              </p>
              <a
                href={`mailto:${profile.person.email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
              >
                {profile.person.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </aside>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="h-11 w-full border border-input bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-11 w-full border border-input bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-y border border-input bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell me what you are working on."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send message"}
                <Send className="h-4 w-4" />
              </button>

              {submitState.message ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={`border-l px-4 py-2 text-sm ${
                    submitState.status === "success"
                      ? "border-brand text-brand"
                      : "border-destructive text-muted-foreground"
                  }`}
                >
                  {submitState.message}
                </p>
              ) : null}
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
