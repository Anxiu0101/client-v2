import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { format } from "date-fns"
import type { PostBlog } from "velite-generate"

interface BlogInfoSheetProps {
  post: PostBlog
}

export default function BlogInfoSheet({ post }: BlogInfoSheetProps) {
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Icons.info />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} className="flex flex-col gap-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="text-left">{post.title}</SheetTitle>
        </SheetHeader>

        {post.description && (
          <p className="px-6 pb-4 text-sm text-muted-foreground">
            {post.description}
          </p>
        )}

        <Separator />

        <div className="flex-1 overflow-auto px-6 py-4 space-y-6">
          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Icons.post className="size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Published</p>
                <p>{format(new Date(post.date), "yyyy-MM-dd HH:mm")}</p>
              </div>
            </div>
            {post.updated_date && (
              <div className="flex items-center gap-3 text-sm">
                <Icons.post className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last updated</p>
                  <p>{format(new Date(post.updated_date), "yyyy-MM-dd HH:mm")}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Words</p>
              <p className="font-medium">{post.metadata.wordCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Reading time</p>
              <p className="font-medium">{post.metadata.readingTime} min</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end px-6 py-4">
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
