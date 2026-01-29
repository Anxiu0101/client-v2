import {PostCard} from "@/components/PostCard";

const posts = [
    {
        title: 'Installation | Update',
        description: 'Read install and Update instructions here',
        date: 'January 28, 2021',
        readTime: '1 min',
        author: 'Aditya Telange',
        tags: ['Update', 'Docs'],
    },
    {
        title: 'Features',
        description: 'Get to know about all features in PaperMod',
        date: 'January 28, 2021',
        readTime: '3 min',
        author: 'Aditya Telange',
    },
    {
        title: 'FAQs (work)',
        description: 'Frequently Asked Questions',
        date: 'January 28, 2021',
        readTime: '4 min',
        author: 'Aditya Telange',
    },
    {
        title: 'Getting Started with React 18',
        description: 'Learn about the new features and improvements in React 18',
        date: 'January 5, 2026',
        readTime: '5 min',
        author: 'John Doe',
        tags: ['React', 'JavaScript'],
    },
    {
        title: 'Building Scalable Applications',
        description: 'Best practices for building applications that grow with your needs',
        date: 'January 3, 2026',
        readTime: '7 min',
        author: 'Jane Smith',
        tags: ['Architecture', 'Development'],
    },
    {
        title: 'The Art of Minimalist Design',
        description: 'How to create beautiful interfaces with minimal elements',
        date: 'January 1, 2026',
        readTime: '6 min',
        author: 'Alex Johnson',
        tags: ['Design', 'UI/UX'],
    },
    {
        title: 'TypeScript Best Practices',
        description: 'Write better TypeScript code with these proven patterns',
        date: 'December 28, 2025',
        readTime: '8 min',
        author: 'Sarah Wilson',
        tags: ['TypeScript', 'Development'],
    },
    {
        title: 'Modern CSS Techniques',
        description: 'Explore the latest CSS features and how to use them effectively',
        date: 'December 25, 2025',
        readTime: '5 min',
        author: 'Mike Brown',
        tags: ['CSS', 'Web Development'],
    },
];

export function RecentBlogList() {
    return (
        <div className="space-y-4 py-8 pb-16">
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                >
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    )
}