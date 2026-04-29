import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tags } from "velite-generate"
import Link from "next/link"

export default function TagsPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2">Tags</h1>
      <p className="text-muted-foreground mb-8">
        Browse all tags used across blog posts.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags
          .sort((a, b) => b.count.posts - a.count.posts)
          .map((tag) => (
            <Link key={tag.slug} href={`/tag/${tag.slug}`} className="no-underline">
              <Card className="h-full border-border/40 hover:border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tag.name}</CardTitle>
                    <Badge variant="secondary">{tag.count.posts}</Badge>
                  </div>
                </CardHeader>
                {tag.description && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tag.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
      </div>
    </div>
  )
}
