"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  getText: () => string
  label?: string
  copiedLabel?: string
}

export function CopyButton({ getText, label = "复制", copiedLabel = "已复制" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    const text = getText()
    if (text) {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [getText])

  return (
    <Button
      onClick={copy}
      variant="ghost"
      size="icon-sm"
      className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-muted/80 hover:bg-muted text-muted-foreground"
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
      )}
    </Button>
  )
}
