import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { SearchIcon } from "lucide-react"
import Link from "next/link";

export default function Page() {
    return (
        <Empty className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <EmptyHeader>
                <EmptyTitle className="text-4xl font-bold mb-4">404 - Not Found</EmptyTitle>
                <EmptyDescription>
                    The page you&apos;re looking for doesn&apos;t exist. Try searching for
                    what you need below.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <InputGroup className="sm:w-3/4">
                    <InputGroupInput placeholder="Try searching for pages..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Kbd>/</Kbd>
                    </InputGroupAddon>
                </InputGroup>
                <EmptyDescription>
                    Need help? <Link href="/about">Contact support</Link> or back to <Link href="/">Home</Link>.
                </EmptyDescription>
            </EmptyContent>
        </Empty>
    )
}

// v1
// // app/not-found.tsx
// import Link from 'next/link'
//
// export default function NotFound() {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
//             <h2 className="text-4xl font-bold mb-4">404 - 找不到文章</h2>
//             <p className="text-muted-foreground mb-6">抱歉，你访问的内容可能已被移动或删除。</p>
//             <Link
//                 href="/"
//                 className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
//             >
//                 返回首页
//             </Link>
//         </div>
//     )
// }