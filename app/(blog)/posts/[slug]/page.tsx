import React from "react";
import { notFound } from "next/navigation";
import { TableOfContent } from '@/components/blog/table-of-content';
import { PostMeta } from '@/components/blog/post-meta';
import { PostNavigation } from '@/components/blog/post-navigation';
import { posts } from "velite-generate";
import { MDXContent } from "@/components/mdx/mdx-content";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/velite";
import { PostToolbar } from "@/components/blog/post-toolbar";

export default async function BlogPost(props: PageProps<'/posts/[slug]'>) {
    const { slug } = await props.params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="py-6">

            <div className="max-w-4xl">

                <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl">{post.title}</h1>
                  <div className="shrink-0 mt-1">
                    <PostToolbar post={post} />
                  </div>
                </div>

                <TableOfContent items={post.toc}/>

                <MDXContent code={post.content} components={{}} />

                {/* Tags and Metadata */}
                <div className="mt-8">
                    <PostMeta
                        tags={post.tags}
                        author={post.author}
                        date={post.date}
                        wordCount={post.metadata.wordCount}
                        url={post.refLink ? post.refLink : (siteConfig.url + post.permalink)}
                    />
                </div>
                {/* Navigation */}
                <div className="active:opacity-80 transition-opacity duration-200">
                    <PostNavigation currentSlug={slug} />
                </div>
            </div>
        </div>
    );
}


export function generateStaticParams() {
    return posts.map(({ slug }) => ({ slug }))
}

// Example structure of tocItems
// const tocItemsDefault: TocItem[] = [
//     {
//         "title": "Interface 接口",
//         "url": "#interface-接口",
//         "items": []
//     },
//     {
//         "title": "Type Assertion 类型断言",
//         "url": "#type-assertion-类型断言",
//         "items": []
//     },
//     {
//         "title": "开发中遇到的简单例子",
//         "url": "#开发中遇到的简单例子",
//         "items": [
//             {
//                 "title": "需要注意的点",
//                 "url": "#需要注意的点",
//                 "items": []
//             }
//         ]
//     }
// ]
