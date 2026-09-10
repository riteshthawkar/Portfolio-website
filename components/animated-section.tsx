"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setTimeout(() => setIsVisible(true), 0)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}
