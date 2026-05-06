'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useReference, formatAuthors } from './reference-context'
import { cn } from '@/lib/utils'

const TYPE_LABELS: Record<string, string> = {
  book: 'Book',
  'article-journal': 'Journal Article',
  'article-magazine': 'Magazine Article',
  'article-newspaper': 'Newspaper Article',
  inproceedings: 'Conference Paper',
  proceedings: 'Proceedings',
  report: 'Report',
  thesis: 'Thesis',
  webpage: 'Web Page',
  misc: 'Miscellaneous',
  patent: 'Patent',
  dataset: 'Dataset',
  software: 'Software',
}

function getTypeLabel(type: string): string {
  return TYPE_LABELS[type] || type
}

export function ReferenceCard({ citeKey, className }: { citeKey: string; className?: string }) {
  const { getEntry } = useReference()
  const ref = getEntry(citeKey)

  if (!ref) {
    return <div className="text-sm text-muted-foreground italic">Unknown reference: {citeKey}</div>
  }

  return (
    <Card size="sm" className={cn('my-6', className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-snug">
              <Badge variant="secondary" className="mr-1">{getTypeLabel(ref.type)}</Badge>
              {ref.title}
            </CardTitle>
          </div>
          {ref.doi && (
            <a
              href={`https://doi.org/${ref.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-1"
              aria-label="Open DOI"
            >
              <ExternalLinkIcon className="size-4" />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        {ref.author && (
          <p>{formatAuthors(ref.author)}</p>
        )}
        <p>
          {ref.containerTitle && <span className="italic">{ref.containerTitle}</span>}
          {ref.publisher && (ref.containerTitle ? `, ${ref.publisher}` : ref.publisher)}
          {ref.year && (ref.containerTitle || ref.publisher ? `, ${ref.year}` : ref.year)}
        </p>
        {(ref.url || ref.doi) && (
          <div className="flex gap-3 pt-1">
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
              >
                {ref.url}
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
