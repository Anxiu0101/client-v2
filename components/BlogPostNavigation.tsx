import { ArrowLeft, ChevronRight } from 'lucide-react';

interface BlogPostNavigationProps {
  previousPost?: {
    title: string;
    href: string;
  };
  nextPost?: {
    title: string;
    href: string;
  };
}

export function BlogPostNavigation({ previousPost, nextPost }: BlogPostNavigationProps) {
  return (
    <nav className="flex items-center justify-between gap-4 py-8 border-t border-border/40 mt-8">
      {previousPost ? (
        <a
          href={previousPost.href}
          className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </a>
      ) : (
        <div />
      )}
      
      {nextPost && (
        <a
          href={nextPost.href}
          className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      )}
    </nav>
  );
}
