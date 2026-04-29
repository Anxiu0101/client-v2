import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { posts } from "velite-generate"

interface PostNavigationProps {
  currentSlug: string
}

export function PostNavigation({ currentSlug }: PostNavigationProps) {
  const sorted = [...posts]
    .filter((p) => process.env.NODE_ENV !== "production" || !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const currentIndex = sorted.findIndex((p) => p.slug === currentSlug)

  if (currentIndex === -1) return null

  const prevPost = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? sorted[currentIndex - 1] : null

  return (
    <nav className="flex items-center justify-between gap-4 py-8 border-t border-border/40">
      {prevPost ? (
        <Link
          href={prevPost.permalink}
          className="group flex items-center gap-2 text-sm hover:opacity-60 transition-opacity max-w-[45%]"
        >
          <ArrowLeft className="size-4 shrink-0" />
          <span className="truncate">{prevPost.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={nextPost.permalink}
          className="group flex items-center gap-2 text-sm hover:opacity-60 transition-opacity max-w-[45%] ml-auto"
        >
          <span className="truncate">{nextPost.title}</span>
          <ChevronRight className="size-4 shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
