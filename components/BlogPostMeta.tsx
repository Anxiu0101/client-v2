import { Tag, Calendar, User, Eye } from 'lucide-react';

interface BlogPostMetaProps {
  tags: string[];
  author: string;
  date: string;
  views?: string;
  url?: string;
}

export function BlogPostMeta({ tags, author, date, views, url }: BlogPostMetaProps) {
  return (
    <div className="border-t border-border/40 pt-6 mt-12 space-y-6">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a
            key={tag}
            href="#"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-border/40 text-sm hover:border-border transition-colors"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </a>
        ))}
      </div>

      {/* URL if provided */}
      {url && (
        <div className="text-sm">
          <div className="text-muted-foreground mb-1">原文链接</div>
          <a
            href={url}
            className="text-blue-600 dark:text-blue-400 hover:underline break-all"
          >
            {url}
          </a>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>作者</span>
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>发布于</span>
          <span>{date}</span>
        </div>
        {views && (
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>浏览量</span>
            <span>{views}</span>
          </div>
        )}
      </div>
    </div>
  );
}
