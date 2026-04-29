import { Calendar, Eye, Tag, User } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface PostMetaProps {
  tags: string[]
  author: string
  date: string
  wordCount?: number
  url?: string
}

export function PostMeta({ tags, author, date, wordCount, url }: PostMetaProps) {
  return (
    <Card size="sm">
      <CardContent className="space-y-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="gap-1">
                <Tag className="size-3" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Original URL */}
        {url && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">原文链接</p>
            <Link
              href={url}
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {url}
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border/40" />

        {/* Author, Date, Views */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="size-4 shrink-0" />
            <span>作者</span>
            <span className="text-foreground">{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0" />
            <span>发布于</span>
            <span className="text-foreground" suppressHydrationWarning>
              {format(new Date(date), "yyyy-MM-dd HH:mm")}
            </span>
          </div>
          {wordCount && (
            <div className="flex items-center gap-2">
              <Eye className="size-4 shrink-0" />
              <span>词数</span>
              <span className="text-foreground">{wordCount}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
