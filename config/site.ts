import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
    name: "Anxiu-Note",
    description:
        "Anxiu(Anxiu0101) personal blog website builds by Next.js 16.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    // ogImage: "https://tx.shadcn.com/og.jpg",
    links: {
        github: "https://github.com/Anxiu0101",
        feed: "/rss"
    },
    email: "anxiu0101@gmail.com",
}