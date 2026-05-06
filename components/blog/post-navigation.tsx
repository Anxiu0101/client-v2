import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getPostNavigation } from "@/lib/velite"

interface PostNavigationProps {
  currentSlug: string
}

export function PostNavigation({ currentSlug }: PostNavigationProps) {
  const { prev, next } = getPostNavigation(currentSlug)

  if (!prev && !next) return null

  return (
    <nav className="flex items-center justify-between gap-4 py-8 border-t border-border/40">
      {prev ? (
        <Link
          href={prev.permalink}
          className="group flex items-center gap-2 text-sm hover:opacity-60 transition-opacity max-w-[45%]"
        >
          <ArrowLeft className="size-4 shrink-0" />
          <span className="truncate">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.permalink}
          className="group flex items-center gap-2 text-sm hover:opacity-60 transition-opacity max-w-[45%] ml-auto"
        >
          <span className="truncate">{next.title}</span>
          <ChevronRight className="size-4 shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
