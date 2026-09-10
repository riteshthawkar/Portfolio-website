"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="group relative border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            aria-label="Toggle theme"
        >
            <Sun className="h-4 w-4 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute left-2 top-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
