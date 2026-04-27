"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogTag } from "@/components/blog/blog-tag";
import { PostInfo } from "@/lib/velite";


export type PostCardProps = PostInfo;

export function PostCard({
  title,
  description,
  date,
  readingTime,
  author,
  tags,
  permalink,
}: PostCardProps) {

  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  const readTime = `${readingTime} min`;

  return (
      <Card className="h-full border-border/40 hover:border-border transition-colors cursor-pointer">


        {/* FIXME <Link href={permalink} className="block h-full no-underline">*/}

          <CardHeader className="gap-0 pb-0">
            <CardAction>
              <Badge variant="secondary">Public</Badge>
            </CardAction>
            <Link href={permalink}>
              <h2 className="text-xl mb-2 hover:opacity-60 transition-opacity text-foreground">
                {title}
              </h2>
            </Link>
          </CardHeader>

          <CardContent className="gap-0 pb-0">
            <Link href={permalink}>
            {/* FIXME <Link href={permalink} className="block h-full no-underline">*/}
              <p className="text-sm text-muted-foreground mb-3">
                {description}
              </p>
            </Link>

            {/* Metadata of Blog */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <time dateTime={date}>{formattedDate}</time>
              <span>·</span>
              <span>{readTime}</span>
              <span>·</span>
              <span>{author}</span>
            </div>

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                      <BlogTag key={tag} tagid={tag}/>
                  ))}
                </div>
            )}
          </CardContent>

      </Card>
  );
}


export function PostCardSkeleton() {
  return (
      <Card className="h-full border-border/40">
        <CardHeader className="p-6 pb-2">
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-4/5 rounded-md mb-3" />
          <div className="flex items-center gap-2 text-xs mb-3">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-3 w-1 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
            <Skeleton className="h-3 w-1 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>
  );
}

export function PostCardSkeletonList({ count = 7 }: { count?: number }) {
  return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, idx) => (
            <div key={idx}>
              <PostCardSkeleton />
            </div>
        ))}
      </div>
  );
}