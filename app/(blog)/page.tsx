"use client"

import { ProfileCard } from '@/components/ProfileCard';
import { RecentBlogList } from '@/components/blog/recent-blog-list'

export default function BlogPage() {
    return (
        <div>
            <ProfileCard/>
            <RecentBlogList/>
        </div>
    );
}