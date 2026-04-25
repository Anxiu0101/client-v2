import React from "react";
import {TableOfContents, TocItem } from '@/components/TableOfContents';
import { BlogPostMeta } from '@/components/BlogPostMeta';
import { BlogPostNavigation } from '@/components/BlogPostNavigation';
import { techBlog } from "velite-generate";
import { MDXContent } from "@/components/mdx/mdx-content";

// Example structure of tocItems
const tocItemsDefault: TocItem[] = [
    {
        "title": "Interface 接口",
        "url": "#interface-接口",
        "items": []
    },
    {
        "title": "Type Assertion 类型断言",
        "url": "#type-assertion-类型断言",
        "items": []
    },
    {
        "title": "开发中遇到的简单例子",
        "url": "#开发中遇到的简单例子",
        "items": [
            {
                "title": "需要注意的点",
                "url": "#需要注意的点",
                "items": []
            }
        ]
    }
]

interface BlogPostProps {
    slug: string;
}

// export default function BlogPost({ params }: { params: { slug: string }}) {
export default function BlogPost( params: BlogPostProps) {
    console.log(params.slug)
    const post = techBlog.find((p) => p.slug === params.slug)
    console.log(post)
    // const tocItems: TocItem[] = post.toc | tocItemsDefault
    return (
        // 新布局：顶层阅读盒 + 文章内容盒
        <div className="reading-layout mx-auto max-w-screen-lg px-4 py-6">

            <main className="content max-w-prose mx-auto">
                {/* Title - 保持原有样式与文本结构 */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">{post.title}</h1>

                <TableOfContents items={tocItemsDefault}/>

                {/*<div className="prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert max-w-none">*/}
                {/*</div>*/}
                <MDXContent code={post.content} components={{}} />

                {/* Tags and Metadata */}
                <div className="mt-6 sm:mt-8">
                    <BlogPostMeta
                        tags={["中国年", "EDA", "Distributed System", "Kafka"]}
                        author="Noct664"
                        date="2024年10月8日"
                        views="157"
                        url="http://example.com/2024/10/08/kafka-消息链路实践/"
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


