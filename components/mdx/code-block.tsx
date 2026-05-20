"use client"

import { useRef, useState, useLayoutEffect } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/mdx/copy-button"
import { ChevronDown, ChevronRight } from "lucide-react"

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

interface CodeMeta {
  title?: string
  fold?: boolean
}

function parseMeta(raw: string): CodeMeta {
  const meta: CodeMeta = {}
  const titleMatch = raw.match(/title="([^"]*)"/)
  if (titleMatch) meta.title = titleMatch[1]
  meta.fold = /\bfold\b/.test(raw)
  return meta
}

export function CodeBlock({ className, children, ...props }: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null)
  const [meta, setMeta] = useState<CodeMeta>({})
  const [folded, setFolded] = useState(false)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const codeEl = preRef.current?.querySelector("code")
    const metaStr = codeEl?.getAttribute("data-metadata") ?? ""
    const lang = codeEl?.getAttribute("data-language") ?? ""
    const parsed = parseMeta(metaStr)
    if (parsed.fold && lang && !parsed.title) {
      parsed.title = LANG_LABELS[lang] ?? lang
    }
    // One-time DOM sync for build-time metadata; cascading not an issue.
    /* eslint-disable react-hooks/set-state-in-effect */
    setMeta(parsed)
    if (parsed.fold) setFolded(true)
    setReady(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const hasTitleBar = ready && (meta.title !== undefined || meta.fold)

  if (!hasTitleBar) {
    return (
      <div className="group relative not-first:mt-3 mb-2">
        <pre
          ref={preRef}
          className={cn("overflow-auto rounded-lg py-1", className)}
          {...props}
        >
          {children}
        </pre>
        <CopyButton
          getText={() => preRef.current?.querySelector("code")?.textContent ?? ""}
          label="复制代码"
          copiedLabel="已复制"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "not-first:mt-3 mb-2 border rounded-lg",
        folded && "bg-muted/30"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 bg-muted/50 border-b rounded-t-lg text-sm",
          folded && "border-b-0 rounded-b-lg"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {meta.fold && (
            <button
              onClick={() => setFolded((v) => !v)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={folded ? "展开代码" : "折叠代码"}
            >
              {folded ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </button>
          )}
          <span className="font-medium truncate">{meta.title}</span>
        </div>
        <CopyButton
          getText={() => preRef.current?.querySelector("code")?.textContent ?? ""}
          label="复制代码"
          copiedLabel="已复制"
        />
      </div>
      <div className={folded ? "hidden" : ""}>
        <pre
          ref={preRef}
          className={cn("overflow-auto py-1 rounded-b-lg", className)}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
