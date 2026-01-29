import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBlogPostCard() {
    return (
        <div className="rounded-lg border border-border/40 p-6">
            <div className="space-y-3">
                {/* 标题骨架 */}
                <Skeleton className="h-7 w-3/4 rounded-md" />
                {/* 摘要骨架（两行） */}
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
                {/* 元信息骨架 */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-4 w-1 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-1 rounded-md" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                {/* 标签骨架 */}
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
            </div>
        </div>
    );
}

// 批量展示骨架屏（生成指定数量的SkeletonCard）
export function SkeletonBlogPostCardList({ count = 7 }: { count?: number }) {
    return (
        <div className="space-y-6">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx}>{<SkeletonBlogPostCard />}</div>
            ))}
        </div>
    );
}