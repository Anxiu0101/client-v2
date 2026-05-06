'use client'

import { useRef } from 'react'
import { ExternalLinkIcon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'
import { useReference, formatAuthors } from './reference-context'
import { cn } from '@/lib/utils'

export function ReferenceHover({ citeKey }: { citeKey: string }) {
  const { getEntry, register, getOrderedKeys } = useReference()
  const registeredRef = useRef(false)

  // eslint-disable-next-line react-hooks/refs
  if (!registeredRef.current) {
    register(citeKey)
    registeredRef.current = true
  }

  const keys = getOrderedKeys()
  const index = keys.indexOf(citeKey) + 1
  const ref = getEntry(citeKey)

  if (!ref) {
    return <sup className="text-xs text-muted-foreground">[?]</sup>
  }

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <sup
          className={cn(
            'text-xs font-medium cursor-help select-none',
            'text-blue-600 dark:text-blue-400',
            'hover:underline decoration-dotted underline-offset-2',
          )}
        >
          [{index}]
        </sup>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-3" side="top" align="start">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {ref.type.replace(/^./, c => c.toUpperCase())}
            </Badge>
            {ref.doi && (
              <a
                href={`https://doi.org/${ref.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open DOI"
              >
                <ExternalLinkIcon className="size-3" />
              </a>
            )}
          </div>
          <p className="text-sm font-medium leading-snug">{ref.title}</p>
          {ref.author && (
            <p className="text-xs text-muted-foreground">{formatAuthors(ref.author)}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {ref.containerTitle && <span className="italic">{ref.containerTitle}</span>}
            {ref.publisher && (ref.containerTitle ? `, ${ref.publisher}` : ref.publisher)}
            {ref.year && (ref.containerTitle || ref.publisher ? `, ${ref.year}` : ref.year)}
          </p>
          {ref.url && (
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
            >
              {ref.url}
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
