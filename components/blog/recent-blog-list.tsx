import { PostCard, PostCardProps } from "@/components/PostCard";
import { PostBlog, posts } from "velite-generate";

// FIXME 暂时只显示 TechBlog，未做合并和分类。
export function RecentBlogList() {

    // rawPost -> PostCardProps
    const recentBlogInfo: PostCardProps[] = convertRawToPostCardProps(posts)

    return (
        <div className="space-y-4 py-8 pb-16">
            {recentBlogInfo.map((post, index) => (
                <PostCard key={index} {...post} />
            ))}
        </div>
    )
}

// FIXME 提取逻辑到  /lib/velite.ts 中并设置有效分页或限制数量。
function convertRawToPostCardProps(rawPosts: PostBlog[]): PostCardProps[] {
    return rawPosts.map(post => ({
        title: post.title,
        description: post.description,
        date: post.date,
        readingTime: post.metadata.readingTime,
        author: post.author,
        tags: post.tags,
        permalink: post.permalink,
    }));
}