import { PostCard } from "@/components/PostCard";
import { posts } from "velite-generate";
import { toPostCardProps } from "@/lib/velite";

// FIXME 暂时只显示 TechBlog，未做合并和分类。
export function RecentBlogList() {

    const recentBlogInfo = toPostCardProps(posts)

    return (
        <div className="space-y-4 py-8 pb-16">
            {recentBlogInfo.map((post, index) => (
                <PostCard key={index} {...post} />
            ))}
        </div>
    )
}