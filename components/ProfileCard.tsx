import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import Link from "next/link";

export function ProfileCard() {
  return (
    <div className="py-8 border-b border-border/40">
      <h1 className="text-4xl mb-3">{siteConfig.name}</h1>
      <div className="text-muted-foreground space-y-1 mb-4">
        <p>
          欢迎来到安修(Anxiu, Anxiu0101)的个人博客。本站专注于分享计算机技术相关内容，包括但不限于软件开发、工具推荐、智能体与安全。
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
          欢迎<Link href={"/about"}>联系我</Link>，互相学习与交流！
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