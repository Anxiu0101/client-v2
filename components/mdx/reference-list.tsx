'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { useReference, formatAuthors } from './reference-context'

export function ReferenceList() {
  const { getOrderedKeys, getEntry } = useReference()
  const keys = getOrderedKeys()

  if (keys.length === 0) return null

  return (
    <div className="mt-12 pt-6 border-t border-border">
      <h2 className="text-xl font-semibold mb-4">References</h2>
      <ol className="space-y-3">
        {keys.map((key, i) => {
          const ref = getEntry(key)
          if (!ref) return null
          return (
            <li key={key} id={`ref-${key}`} className="text-sm leading-relaxed">
              <span className="font-medium text-muted-foreground mr-2">[{i + 1}]</span>
              {ref.author && (
                <span className="text-muted-foreground">{formatAuthors(ref.author)}. </span>
              )}
              <span className="font-medium">{ref.title}</span>
              {ref.containerTitle && <span className="italic">. {ref.containerTitle}</span>}
              {ref.publisher && <span>. {ref.publisher}</span>}
              {ref.year && <span>. {ref.year}</span>}
              <span className="inline-flex gap-2 ml-1">
                {ref.doi && (
                  <a
                    href={`https://doi.org/${ref.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    DOI <ExternalLinkIcon className="size-3" />
                  </a>
                )}
                {ref.url && !ref.doi && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[200px]"
                  >
                    {ref.url} <ExternalLinkIcon className="size-3" />
                  </a>
                )}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
