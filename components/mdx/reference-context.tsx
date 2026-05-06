'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import type { ReferenceEntry } from '@/types'

interface ReferenceContextValue {
  getEntry: (key: string) => ReferenceEntry | undefined
  register: (key: string) => void
  getOrderedKeys: () => string[]
  entries: ReferenceEntry[]
}

const ReferenceContext = createContext<ReferenceContextValue | null>(null)

export function ReferenceProvider({
  references,
  children,
}: {
  references: ReferenceEntry[]
  children: ReactNode
}) {
  const refMap = useRef(new Map(references.map(r => [r.key, r])))
  const orderedKeys = useRef<string[]>([])
  const seen = useRef(new Set<string>())

  const register = (key: string) => {
    if (seen.current.has(key)) return
    seen.current.add(key)
    orderedKeys.current.push(key)
  }

  const getEntry = (key: string) => refMap.current.get(key)
  const getOrderedKeys = () => orderedKeys.current

  return (
    <ReferenceContext.Provider value={{ getEntry, register, getOrderedKeys, entries: references }}>
      {children}
    </ReferenceContext.Provider>
  )
}

export function useReference() {
  const ctx = useContext(ReferenceContext)
  if (!ctx) {
    throw new Error('useReference must be used within a ReferenceProvider')
  }
  return ctx
}

export function formatAuthors(author?: string): string {
  if (!author) return ''
  const parts = author.split('; ').map(a => {
    const [last, first] = a.split(', ')
    return first ? `${first} ${last}` : last
  })
  if (parts.length === 1) return parts[0]
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`
  return `${parts[0]}, ${parts[1]}, et al.`
}

export function formatReference(ref: ReferenceEntry): string {
  const parts: string[] = []
  if (ref.author) parts.push(formatAuthors(ref.author))
  parts.push(ref.title)
  if (ref.containerTitle) parts.push(`*${ref.containerTitle}*`)
  if (ref.publisher) parts.push(ref.publisher)
  if (ref.year) parts.push(String(ref.year))
  return parts.join('. ')
}
