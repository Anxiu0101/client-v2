"use client"

import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-44 z-40",
        "right-[max(1rem,calc((100vw-56rem)/2+0.75rem))]",
        "flex items-center justify-center",
        "size-10 rounded-full border",
        "bg-background text-muted-foreground",
        "opacity-30 hover:opacity-100 transition-opacity duration-200",
        "shadow-sm hover:shadow-md"
      )}
      aria-label="返回顶部"
    >
      <ArrowUp className="size-5" />
    </button>
  )
}
