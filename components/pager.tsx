import Link from "next/link"
import { Tech } from "velite-generate"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface BlogPagerProps {
    blog: Tech
}

export function DocsPager({ blog }: BlogPagerProps) {
    const pager = getPagerForDoc(blog)

    if (!pager) {
        return null
    }

    return (
        <div className="flex flex-row items-center justify-between">
            {pager?.prev && (
                <Link
                    href={pager.prev.href}
                    className={cn(buttonVariants({ variant: "ghost" }))}
                >
                    <Icons.chevronLeft className="mr-2 size-4" />
                    {pager.prev.title}
                </Link>
            )}
            {pager?.next && (
                <Link
                    href={pager.next.href}
                    className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
                >
                    {pager.next.title}
                    <Icons.chevronRight className="ml-2 size-4" />
                </Link>
            )}
        </div>
    )
}

export function getPagerForDoc(blog: BlogPagerProps) {
    const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null]
    const activeIndex = flattenedLinks.findIndex(
        (link) => blog.blog.slug === link?.href
    )
    const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
    const next =
        activeIndex !== flattenedLinks.length - 1
            ? flattenedLinks[activeIndex + 1]
            : null
    return {
        prev,
        next,
    }
}

export function flatten(links: { items? }[]) {
    return links.reduce((flat, link) => {
        return flat.concat(link.items ? flatten(link.items) : link)
    }, [])
}
