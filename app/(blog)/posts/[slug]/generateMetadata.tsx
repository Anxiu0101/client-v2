// Dynamic SEO Injection
import {Tech, techBlog} from "velite-generate";

interface BlogPostProps {
    params: {
        slug: string,
    },
}

function getTechPostBySlug(posts: Tech[],slug: string) {
    return posts.find((p) => p.slug === slug)
}

export function generateMetadata({params}: BlogPostProps) {
    const post = getTechPostBySlug(techBlog, params.slug)
    if (post == null) return {}
    return {title: post.title, description: post.description}
}