import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TocItem = {
  title: string;
  url: string;
  items: TocItem[]
};

export type TableOfContentsProps = {
  items: TocItem[];
}

export type TOCListProps = {
  items: TocItem[];
  depth: number;
};

// 递归渲染，最多两层深度
function TOCList ({items, depth=0}: TOCListProps) {
    if (!items || items.length === 0 || depth > 1) return null;
    return (
        <ul className="pl-4 text-sm">
            {items.map((it) => (
                <li key={it.url} className="mb-1">
                    <a href={it.url} className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {it.title}
                    </a>
                    {it.items && it.items.length > 0 && (
                        <TOCList items={it.items} depth={depth + 1} />
                    )}
                </li>
            ))}
        </ul>
    );
}

// TableOfContents 组件暴露
export function TableOfContents({ items }: TableOfContentsProps) {
    // 如果没有项，直接返回 null，TableOfContents 组件不渲染任何 DOM
    if (!items || items.length === 0) {
        return null
    }

    return (
        <Card size="sm" className="w-full">
            <CardHeader>Table of Content</CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-full pr-2" type="scroll">
                    <div className="p-2">
                        <TOCList items={items} depth={0} />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
