"use client"

import { ProfileCard } from '@/components/ProfileCard';
import { RecentBlogList } from '@/components/blog/recent-blog-list'



// TODO 将 posts list 样式更新为 shadcn-ui card 样式。
export default function BlogPage() {
    return (
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile/Intro Section */}
            <ProfileCard/>

            {/* Posts List */}
            <RecentBlogList/>

        </div>
    );
}