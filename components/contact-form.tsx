"use client"

import { useState } from "react"
import { AnimatedSection } from "./animated-section"
import { Send } from "lucide-react"

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitState({ status: "idle", message: "" })

        try {
            const body = new FormData()
            body.append("access_key", WEB3FORMS_ACCESS_KEY)
            body.append("name", formData.name)
            body.append("email", formData.email)
            body.append("message", formData.message)
            body.append("subject", `Portfolio Contact from ${formData.name}`)
            body.append("from_name", "Ritesh Thawkar Portfolio")
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <section id="contact" className="px-6 py-0">
            <div className="mx-auto max-w-5xl overflow-hidden border-x border-t border-border bg-background">
                <AnimatedSection className="border-b border-border bg-background">
                    <div className="px-6 py-10 sm:px-10 sm:py-12">
                        <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Contact
                        </p>
                        <h2 className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">
                            Let's Connect
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            Open to research collaborations, applied AI systems work, and conversations around multimodal reasoning.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-[minmax(2.5rem,1fr)_minmax(0,48rem)_minmax(2.5rem,1fr)]">
                    <div className="section-rail hidden border-r border-border sm:block" />
                    <div className="px-5 py-10 sm:px-6 md:px-8 md:py-12 lg:px-10">
                        <AnimatedSection delay={200}>
                        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6">
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
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                    placeholder="What's on your mind?"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <Send className="h-4 w-4" />
                            </button>
                            {submitState.message && (
                                <p
                                    role="status"
                                    aria-live="polite"
                                    className={`border px-4 py-3 text-sm ${submitState.status === "success"
                                        ? "border-brand/30 bg-brand-muted text-brand"
                                        : "border-border bg-background text-muted-foreground"
                                        }`}
                                >
                                    {submitState.message}
                                </p>
                            )}
                        </form>
                        </AnimatedSection>
                    </div>
                    <div className="section-rail hidden border-l border-border sm:block" />
                </div>
            </div>
        </section>
    )
}
