import { BlogConfig, BlogNavConfig } from "@/types"

export const blogConfig: BlogConfig = {
    mainNav: [
        { title: 'Tech', href: '/tech', disabled: false,},
        { title: 'Book', href: '/book', disabled: false },
        { title: 'Life', href: '/life', disabled: false },
        { title: 'About Me', href: '/about', disabled: false },
    ],
    sidebarNav: [],
}

export const blogNavConfig: BlogNavConfig = {
    TechNav:
        { title: 'Tech', href: '/tech', description: 'Code Practice', disabled: false,
            subItems: [
                {
                    title: "Code",
                    href: "/tech/code",
                    description: "Hands-on code practices with Golang, Python and more languages."
                },
                {
                    title: "Deploy",
                    href: "/tech/deploy",
                    description: "Linux ops and cloud-native deployment practices & tips."
                },
                {
                    title: "Tool",
                    href: "/tech/tool",
                    description: "Practical usage experience of dev-focused technical tools."
                },
                {
                    title: "Agent",
                    href: "/tech/agent",
                    description: "Agent orchestrate and deployment records of different field.",
                    disabled: true,
                }
            ]
    },
    BookNav:
        { title: 'Book', href: '/book', description: 'Book Insights', disabled: false,
            subItems: [
                {
                    title: "Literature",
                    href: "/book/literature",
                    description: "Thoughts and reflections on classic and contemporary literary works",
                    disabled: true,
                },
                {
                    title: "Economics",
                    href: "/book/economics",
                    description: "Insights from economics books and practical application analysis",
                    disabled: true,
                }
            ]
        },

    LifeNav: { title: 'Life', href: '/life', description: 'Life Journal', disabled: false },
    AboutMeNav: { title: 'About Me', href: '/about', disabled: false }
}