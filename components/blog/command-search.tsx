"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import { useSearch } from "@/hooks/use-search"
import type { PostCardData } from "@/lib/velite"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FileText } from "lucide-react"

export function CommandSearch() {
  const router = useRouter()
  const { open, setOpen } = useSearch()
  const [fuse, setFuse] = useState<Fuse<PostCardData> | null>(null)
  const [results, setResults] = useState<PostCardData[]>([])

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: PostCardData[]) => {
        setFuse(
          new Fuse(data, {
            keys: [
              { name: "title", weight: 0.4 },
              { name: "description", weight: 0.3 },
              { name: "tags", weight: 0.2 },
              { name: "category", weight: 0.1 },
            ],
            threshold: 0.4,
            includeScore: true,
          })
        )
      })
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const onSearch = useCallback(
    (value: string) => {
      if (!fuse || !value) {
        setResults([])
        return
      }
      setResults(fuse.search(value).map((r) => r.item))
    },
    [fuse]
  )

  const onSelect = useCallback(
    (item: PostCardData) => {
      setOpen(false)
      router.push(item.permalink)
    },
    [router, setOpen]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="h-[400px] sm:h-[480px]">
      <CommandInput placeholder="搜索文章..." onValueChange={onSearch} />
      <CommandList className="max-h-none flex-1">
        <CommandEmpty>没有找到匹配的文章</CommandEmpty>
        {results.length > 0 && (
          <CommandGroup heading="文章">
            {results.map((item) => (
              <CommandItem
                key={item.permalink}
                value={`${item.title} ${item.description} ${item.tags.join(" ")}`}
                onSelect={() => onSelect(item)}
              >
                <FileText className="mr-2 size-4 shrink-0" />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="truncate font-medium">{item.title}</span>
                  <span className="text-muted-foreground text-xs truncate">
                    {item.description}
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-muted-foreground text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
