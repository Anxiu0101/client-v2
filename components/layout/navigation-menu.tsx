"use client"

import * as React from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { blogNavConfig } from "@/config/nav-item"

interface BlogNavigationMenuProps {
    mobile?: boolean
}

const categories = [
    {
        title: "Code Practice",
        href: "/category/tech",
        description: "Technical blogs about programming, tools, and deployment.",
    },
    {
        title: "Book Insight",
        href: "/category/book",
        description: "Reading notes, book reviews, and literary reflections.",
    },
    {
        title: "Life Journal",
        href: "/category/life",
        description: "Personal stories, photography, and travel journals.",
    },
]

export function BlogNavigationMenu({ mobile = false }: BlogNavigationMenuProps) {
    if (mobile) {
        return (
            <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground px-3 pt-1">
                    Category
                </p>
                {categories.map((cat) => (
                    <Link
                        key={cat.href}
                        href={cat.href}
                        className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        {cat.title}
                    </Link>
                ))}
                <div className="border-t border-border/40 my-2" />
                <Link
                    href="/tag"
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Tags
                </Link>
                <Link
                    href={blogNavConfig.AboutMeNav.href}
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    {blogNavConfig.AboutMeNav.title}
                </Link>
            </div>
        )
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {/* Category dropdown */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Category</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col w-[300px] gap-1">
                            {categories.map((cat) => (
                                <ListItem
                                    key={cat.href}
                                    title={cat.title}
                                    href={cat.href}
                                >
                                    {cat.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Tags */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/tag">Tags</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About Me */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href={blogNavConfig.AboutMeNav.href}>
                            {blogNavConfig.AboutMeNav.title}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({
                      title,
                      children,
                      href,
                      ...props
                  }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="text-muted-foreground line-clamp-2">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
