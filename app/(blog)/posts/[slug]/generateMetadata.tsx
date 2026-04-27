// Dynamic SEO Injection
import { getPostBySlug } from "@/lib/velite";

export async function generateMetadata(props: PageProps<'/posts/[slug]'>) {
    const { slug } = await props.params
    const post = getPostBySlug(slug)
    if (post == null) return {}
    return {title: post.title, description: post.description}
}