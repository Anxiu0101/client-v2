import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import Link from "next/link";

export function ProfileCard() {
  return (
    <div className="py-8 border-b border-border/40">
      <h1 className="text-4xl mb-3">{siteConfig.name}</h1>
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
          <Link
              href={siteConfig.links.github}
              className="underline hover:opacity-60 transition-opacity">
            GitHub
          </Link>
          !
        </p>
        <p>
          PaperMod is based on theme{' '}
          <Link href="#" className="underline hover:opacity-60 transition-opacity">
            Paper
          </Link>
          .
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={siteConfig.links.github}
          className="hover:opacity-60 transition-opacity"
          aria-label="GitHub"
        >
          <Icons.gitHub className="h-5 w-5" />
        </Link>
        <Link
          href="/rss"
          className="hover:opacity-60 transition-opacity"
          aria-label="RSS"
        >
          <Icons.rss className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}