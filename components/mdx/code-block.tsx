"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/mdx/copy-button"

export function CodeBlock({ className, children, ...props }: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null)

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
