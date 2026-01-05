import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Table of Contents */}
        <div>
          <h3 className="font-semibold mb-3">Table of Content</h3>
          <nav className="space-y-2 text-sm">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block hover:opacity-60 transition-opacity"
                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
