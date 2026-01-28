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
import { CircleAlertIcon } from "lucide-react"
import { blogNavConfig } from "@/config/nav-item"
import { ZNavItem } from "@/types/navigation";


export function BlogNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {/* Technology Blog with Main Tags Item.*/}
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>{blogNavConfig.TechNav.description}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {blogNavConfig.TechNav.subItems.map((item: ZNavItem) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Book Insights with Main Tags Item.*/}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{blogNavConfig.BookNav.description}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {blogNavConfig.BookNav.subItems.map((item: ZNavItem) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Life Journal.*/}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href={blogNavConfig.LifeNav.href}>{blogNavConfig.LifeNav.description}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About Me.*/}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href={blogNavConfig.AboutMeNav.href}>{blogNavConfig.AboutMeNav.title}</Link>
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
