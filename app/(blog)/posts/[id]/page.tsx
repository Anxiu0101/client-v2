import {TableOfContents, TocItem } from '@/components/TableOfContents';
import { BlogPostMeta } from '@/components/BlogPostMeta';
import { BlogPostNavigation } from '@/components/BlogPostNavigation';
import { Card, CardContent } from '@/components/ui/card';

const tocItems: TocItem[] = [
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

export default function BlogPost() {

    return (
        // 新布局：顶层阅读盒 + 文章内容盒
        <div className="reading-layout mx-auto max-w-screen-lg px-4 py-6">
            <TableOfContents items={tocItems} layoutMode="toolbox" />
            <main className="content max-w-prose mx-auto">
                {/* Title - 保持原有样式与文本结构 */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">Blog Title</h1>
                <div className="prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert max-w-none">
                    <p>
                        Accusam nonumy ea faugait invidunt erat dolor. Amet ex amet volutpat sadipscing sit duis tincidunt augue sea aliquyam dolore. Vel tempor voluptua eum et et. Vel dolor dolor invidunt sanctus ea amet esse est ipsum vero amet vero.
                    </p>
                    <p>
                        Sit accusam dolore et clita clita est adipiscing dolores. Autem amet rebum lorem ipsum ipsum duo. Ut lius no dolor magna lorem duo rebum. Consetetur duo tempor dolore ipsum. Sit duis lorem sit accusam sea et dolor illum. Euismod augue in dolores velit lorem kasd ullamcorper kasd labore est. Kasd et nisl nisl et praesent eros sed clita et ea tempor labore eros faugiat dignissim. Ulta et duo sed ipsum amet vero est dolore.
                    </p>
                    {/* ... 其余文章内容沿用原有结构 ... */}
                </div>
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
