"use client"

import { Children, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const LANG_LABELS: Record<string, string> = {
  go: "Go",
  java: "Java",
  js: "JavaScript",
  ts: "TypeScript",
  py: "Python",
  rs: "Rust",
  sh: "Shell",
  bash: "Bash",
  yaml: "YAML",
  json: "JSON",
  md: "Markdown",
  css: "CSS",
  html: "HTML",
}

interface CodeGroupProps {
  children: ReactNode
  className?: string
}

export function CodeGroup({ children, className }: CodeGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [langs, setLangs] = useState<string[]>([])
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (containerRef.current) {
      const codeEls = containerRef.current.querySelectorAll("code[data-language]")
      const detected = Array.from(codeEls).map(
        (el) => el.getAttribute("data-language") ?? ""
      )
      setLangs(detected)
    }
  }, [])

  const items = Children.toArray(children).filter(
    (child): child is ReactElement =>
      typeof child === "object" && "type" in child
  )

  if (items.length === 0) return null
  if (items.length === 1) return <>{children}</>

  return (
    <div ref={containerRef} className={cn("not-first:mt-3 mb-2", className)}>
      {langs.length > 1 && (
        <div className="mb-2 inline-flex h-9 items-center gap-1 rounded-lg bg-muted p-[3px]">
          {langs.map((lang, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors",
                active === i
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {LANG_LABELS[lang] ?? lang}
            </button>
          ))}
        </div>
      )}
      {items.map((child, i) => (
        <div key={i} className={active !== i ? "hidden" : ""}>
          {child}
        </div>
      ))}
    </div>
  )
}
