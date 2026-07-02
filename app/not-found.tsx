import Link from "next/link"
import { GridBackground } from "@/components/grid-background"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <>
            <Nav />
            <main className="relative flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
                <GridBackground />
                <div className="relative z-10 max-w-md space-y-6">
                    <h1 className="font-display text-8xl font-semibold tracking-tighter text-foreground sm:text-9xl">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground">
                        It looks like this page got lost in the latent space. Let's get you back on track.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Return Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
