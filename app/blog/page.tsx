import { TableOfContents } from '../../components/TableOfContents';
import { BlogPostMeta } from '../../components/BlogPostMeta';
import { BlogPostNavigation } from '../../components/BlogPostNavigation';

const tocItems = [
    { id: 'heading-2-l2', title: 'Heading 2 L2', level: 2 },
    { id: 'heading-3-l2', title: 'Heading 3 L2', level: 3 },
    { id: 'heading-4-l3', title: 'Heading 4 L3', level: 4 },
    { id: 'heading-5-l2', title: 'Heading 5 L2', level: 5 },
];

export function BlogPost() {
    return (
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Main Layout: Content + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <article className="flex-1 min-w-0">
                    {/* Title */}
                    <h1 className="text-4xl mb-6">Blog Title</h1>

                    {/* Introduction Paragraph */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p>
                            Accusam nonumy ea faugait invidunt erat dolor. Amet ex amet
                            volutpat sadipscing sit duis tincidunt augue sea aliquyam dolore. Vel
                            tempor voluptua eum et et. Vel dolor dolor invidunt sanctus ea amet
                            esse est ipsum vero amet vero.
                        </p>

                        <p>
                            Sit accusam dolore et clita clita est adipiscing dolores. Autem amet
                            rebum lorem ipsum ipsum duo. Ut lius no dolor magna lorem duo rebum.
                            Consetetur duo tempor dolore ipsum. Sit duis lorem sit accusam sea et
                            dolor illum. Euismod augue in dolores velit lorem kasd ullamcorper kasd
                            labore est. Kasd et nisl nisl et praesent eros sed clita et ea tempor
                            labore eros faugiat dignissim. Ulta et duo sed ipsum amet vero est
                            dolore.
                        </p>

                        {/* Heading 2 */}
                        <h2 id="heading-2-l2">Heading 2</h2>

                        <p>
                            Vel et sadipscing ipsum sit vero sed diam invidunt sadipscing erat amet.
                            Dolores est amet voluptua dolor molestie elit dolore ipsum aliquyam sit.
                            Tempor elitr aliquyam no aliquam ea option amet eiusmod rebum
                            ipsum magna et augue takimata erat te. Eirmod lorem est gubergren et et.
                        </p>

                        <p>
                            Ipsum ipsum aliquyam sea aliquyam vero amet et lorem et sadipscing ipsum.
                            Magna soluta stet diam vero ipsum. Dolore dolor eirmod invidunt diam
                            lorem dolor erat eirmod qui in sed diam nonumy ut.
                        </p>

                        {/* Nested Headings */}
                        <h3 id="heading-3-l2">Heading 3 L2</h3>
                        <p>
                            This section demonstrates a heading level 3 under the main heading 2.
                            The content follows the hierarchical structure shown in the table of contents.
                        </p>

                        <h4 id="heading-4-l3">Heading 4 L3</h4>
                        <p>
                            Deeper nesting with heading level 4. This creates a clear content hierarchy
                            that helps readers navigate through complex topics.
                        </p>

                        <h5 id="heading-5-l2">Heading 5 L2</h5>
                        <p>
                            The deepest level in our table of contents. This fine-grained structure
                            allows for detailed organization of content.
                        </p>
                    </div>

                    {/* Tags and Metadata */}
                    <BlogPostMeta
                        tags={['中国年', 'EDA', 'Distributed System', 'Kafka']}
                        author="Noct664"
                        date="2024年10月8日"
                        views="157"
                        url="http://example.com/2024/10/08/kafka-消息链路实践/"
                    />

                    {/* Navigation */}
                    <BlogPostNavigation
                        previousPost={{
                            title: 'Previous Post',
                            href: '#',
                        }}
                    />
                </article>

                {/* Sidebar - Table of Contents */}
                <TableOfContents items={tocItems} />
            </div>
        </div>
    );
}
