import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogTagProps {
    tagid: string;
}

export function BlogTag({ tagid }: BlogTagProps) {
    return (
        <Link href={`/tags/${tagid}`} key={tagid} className="no-underline">
            <Badge
                variant="outline"
                className="text-xs text-muted-foreground hover:opacity-60 transition-opacity cursor-pointer"
            >
                #{tagid}
            </Badge>
        </Link>
    );
}
