import { User } from "@prisma/client"
import type { Icon } from "lucide-react"
import {ZNavItem} from "@/types/navigation";

export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
} & (
    | {
    href: string
    items?: never
}
    | {
    href?: string
    items: NavLink[]
}
    )

export type SiteConfig = {
    name: string
    description: string
    url: string
    // ogImage: string
    links: {
        github: string
        feed: string
    }
    email?: string
}

export type BlogConfig = {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
}

export type BlogNavConfig = {
    TechNav: ZNavItem,
    BookNav: ZNavItem,
    LifeNav: ZNavItem,
    AboutMeNav: ZNavItem,
}

export interface ReferenceEntry {
    key: string
    type: string
    title: string
    author?: string
    year?: number
    publisher?: string
    containerTitle?: string
    url?: string
    doi?: string
    isbn?: string
}

// export type MarketingConfig = {
//     mainNav: MainNavItem[]
// }
//
// export type DashboardConfig = {
//     mainNav: MainNavItem[]
//     sidebarNav: SidebarNavItem[]
// }
//
// export type SubscriptionPlan = {
//     name: string
//     description: string
//     stripePriceId: string
// }
//
// export type UserSubscriptionPlan = SubscriptionPlan &
//     Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
//     stripeCurrentPeriodEnd: number
//     isPro: boolean
// }
