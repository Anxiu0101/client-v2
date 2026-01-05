interface PostCardProps {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
  tags?: string[];
}

export function PostCard({
  title,
  summary,
  date,
  readTime,
  author,
  tags,
}: PostCardProps) {
  return (
    <article className="border border-border/40 rounded-lg p-6 hover:border-border transition-colors">
      <a href="#" className="block">
        <h2 className="text-xl mb-2 hover:opacity-60 transition-opacity">
          {title}
        </h2>
        <div className="text-sm text-muted-foreground mb-3">
          {summary}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time>{date}</time>
          <span>·</span>
          <span>{readTime}</span>
          <span>·</span>
          <span>{author}</span>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground hover:opacity-60 transition-opacity"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </article>
  );
}
