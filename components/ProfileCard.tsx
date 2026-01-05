import { Github, Rss } from 'lucide-react';

export function ProfileCard() {
  return (
    <div className="py-8 border-b border-border/40">
      <h1 className="text-4xl mb-3">PaperMod</h1>
      <div className="text-muted-foreground space-y-1 mb-4">
        <p>
          Welcome to demo of Hugo&apos;s theme PaperMod.{' '}
          <a href="#" className="underline hover:opacity-60 transition-opacity">
            PaperMod
          </a>{' '}
          is a simple but fast and responsive theme with useful feature-set that enhances UX.
        </p>
        <p>
          Do give a 🌟 on{' '}
          <a href="#" className="underline hover:opacity-60 transition-opacity">
            GitHub
          </a>
          !
        </p>
        <p>
          PaperMod is based on theme{' '}
          <a href="#" className="underline hover:opacity-60 transition-opacity">
            Paper
          </a>
          .
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="hover:opacity-60 transition-opacity"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="hover:opacity-60 transition-opacity"
          aria-label="RSS"
        >
          <Rss className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}