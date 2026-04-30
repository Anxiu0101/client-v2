import Link from "next/link"
import {LicenseInfo} from "@/components/layout/license-info";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <LicenseInfo/>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:opacity-60 transition-opacity">
              About
            </Link>
            <span className="text-muted-foreground/40">&middot;</span>
            <Link href="/rss" className="hover:opacity-60 transition-opacity">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
