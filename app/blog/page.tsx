"use client"

import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { ProfileCard } from '@/components/ProfileCard';
import { PostCard } from '@/components/PostCard';
import { Footer } from '@/components/Footer';
import { BlogPost } from '@/app/blog/[id]/page';
import { useState } from 'react';

const posts = [
    {
        title: 'Installation | Update',
        summary: 'Read install and Update instructions here',
        date: 'January 28, 2021',
        readTime: '1 min',
        author: 'Aditya Telange',
        tags: ['Update', 'Docs'],
    },
    {
        title: 'Features',
        summary: 'Get to know about all features in PaperMod',
        date: 'January 28, 2021',
        readTime: '3 min',
        author: 'Aditya Telange',
    },
    {
        title: 'FAQs (work)',
        summary: 'Frequently Asked Questions',
        date: 'January 28, 2021',
        readTime: '4 min',
        author: 'Aditya Telange',
    },
    {
        title: 'Getting Started with React 18',
        summary: 'Learn about the new features and improvements in React 18',
        date: 'January 5, 2026',
        readTime: '5 min',
        author: 'John Doe',
        tags: ['React', 'JavaScript'],
    },
    {
        title: 'Building Scalable Applications',
        summary: 'Best practices for building applications that grow with your needs',
        date: 'January 3, 2026',
        readTime: '7 min',
        author: 'Jane Smith',
        tags: ['Architecture', 'Development'],
    },
    {
        title: 'The Art of Minimalist Design',
        summary: 'How to create beautiful interfaces with minimal elements',
        date: 'January 1, 2026',
        readTime: '6 min',
        author: 'Alex Johnson',
        tags: ['Design', 'UI/UX'],
    },
    {
        title: 'TypeScript Best Practices',
        summary: 'Write better TypeScript code with these proven patterns',
        date: 'December 28, 2025',
        readTime: '8 min',
        author: 'Sarah Wilson',
        tags: ['TypeScript', 'Development'],
    },
    {
        title: 'Modern CSS Techniques',
        summary: 'Explore the latest CSS features and how to use them effectively',
        date: 'December 25, 2025',
        readTime: '5 min',
        author: 'Mike Brown',
        tags: ['CSS', 'Web Development'],
    },
];

export default function BlogPage() {
    const [currentView, setCurrentView] = useState<'home' | 'post'>('home');

    return (
        <div>
        {currentView === 'home' ? (
            <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile/Intro Section */}
                <ProfileCard />

                {/* Posts List */}
                <div className="space-y-4 py-8 pb-16">
                    {posts.map((post, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentView('post')}
                          className="cursor-pointer"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div onClick={() => setCurrentView('home')}>
                <BlogPost />
            </div>
        )}
        </div>
    );
}