import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TocItem = {
  title: string;
  url: string;
  items: TocItem[]
};

export type TableOfContentsProps = {
  items: TocItem[];
  layoutMode?: 'default' | 'toolbox';
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
};

// TableOfContents 组件暴露
export function TableOfContents({ items, layoutMode = 'default' }: TableOfContentsProps) {
  // toolbox 模式下使用 Card 的“sm”尺寸已在页内容器应用，保持一致风格
  const content = (
    <Card className="h-full w-full">
      <CardHeader className="px-4 py-3">Table of Contents</CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-full pr-2" type="scroll">
          <div className="p-2">
            <TOCList items={items} depth={0} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  if (layoutMode === 'toolbox') {
    // toolbox 风格：直接返回带卡片风格的容器，外部容器已提供 Card 封装时，使用 sm 尺寸的 Card 以实现一致性
    return (
      <Card size="sm" className="w-full">
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

  // 默认布局：保持原有的 Card 结构
  return content;
};
