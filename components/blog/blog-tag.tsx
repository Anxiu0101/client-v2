import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogTagProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export function BlogTag({ label, isActive = false, onClick }: BlogTagProps) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                "bg-transparent border-0 px-2 py-0.5 text-sm font-normal hover:underline transition-all duration-200",
                isActive
                    ? "text-primary underline"
                    : "text-muted-foreground"
            )}
            onClick={onClick}
        >
            {label}
        </Badge>
    );
}
