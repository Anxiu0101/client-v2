import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { tags, posts } from "velite-generate"
import { toPostCardProps } from "@/lib/velite"
import { PostCard } from "@/components/PostCard"

interface TagPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return tags.map((tag) => ({ id: tag.slug }))
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { id } = await params
  const tag = tags.find((t) => t.slug === id)

  if (!tag) {
    notFound()
  }

  const tagPosts = toPostCardProps(posts.filter((post) => post.tags.includes(tag.name)))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">{tag.name}</h1>
          <Badge variant="secondary" className="text-sm">
            {tagPosts.length} {tagPosts.length === 1 ? "post" : "posts"}
          </Badge>
        </div>
        {tag.description && (
          <p className="text-muted-foreground">{tag.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {tagPosts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>

      {tagPosts.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No posts found for this tag.
        </p>
      )}
    </div>
  )
}
