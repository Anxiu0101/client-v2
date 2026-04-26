import React from "react";
import {TableOfContents, TocItem} from '@/components/TableOfContents';
import {BlogPostMeta} from '@/components/BlogPostMeta';
import {BlogPostNavigation} from '@/components/BlogPostNavigation';
import {Tech, techBlog} from "velite-generate";
import {MDXContent} from "@/components/mdx/mdx-content";
import {siteConfig} from "@/config/site";
import {notFound} from "next/navigation";

function getTechPostBySlug(posts: Tech[],slug: string) {
    return posts.find((p) => p.slug === slug)
}

export default async function BlogPost(props: PageProps<'/posts/[slug]'>) {
    const { slug } = await props.params
    const post = getTechPostBySlug(techBlog, slug)

    if (!post) {
        notFound()
    }

    const tocItems: TocItem[] = post.toc
    return (
        // 新布局：顶层阅读盒 + 文章内容盒
        <div className="reading-layout mx-auto max-w-screen-lg px-4 py-6">

            <main className="content max-w-prose mx-auto">
                {/* Title - 保持原有样式与文本结构 */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">{post.title}</h1>

                <TableOfContents items={tocItems}/>

                {/*<div className="prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert max-w-none">*/}
                {/*</div>*/}
                <MDXContent code={post.content} components={{}} />

                {/* Tags and Metadata */}
                <div className="mt-6 sm:mt-8">
                    <BlogPostMeta
                        tags={post.tags}
                        author={post.author}
                        date={post.date}
                        views="157"
                        url={siteConfig.url+post.permalink}
                    />
                </div>
                {/* Navigation */}
                <div className="mt-8 sm:mt-10 active:opacity-80 transition-opacity duration-200">
                    <BlogPostNavigation
                        previousPost={{
                            title: 'Previous Post',
                            href: '#',
                        }}
                    />
                </div>
            </main>
        </div>
    );
}


export function generateStaticParams() {
    return techBlog.map(({ slug }) => ({ slug }))
}

// TODO 封装 https://velite.js.org/guide/using-collections#data-accessor

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
