"use client"

import { ProfileCard } from '@/components/profile/profile-card';
import { RecentBlogList } from '@/components/blog/recent-blog-list'

export default function BlogPage() {
    return (
        <div>
            <ProfileCard/>
            <RecentBlogList/>
        </div>
    );
}