"use client"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

export function CodeBlock({ className, children, ...props }: React.ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const copy = useCallback(async () => {
    const code = preRef.current?.querySelector("code")?.textContent
    if (code) {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  return (
    <div className="group relative not-first:mt-3 mb-2">
      <pre
        ref={preRef}
        className={cn("overflow-auto rounded-lg py-1", className)}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground"
        aria-label={copied ? "已复制" : "复制代码"}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="2" width="8" height="4" rx="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          </svg>
        )}
      </button>
    </div>
  )
}
