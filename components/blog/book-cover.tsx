'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookCoverProps {
  src?: string
  alt: string
  className?: string
}

export function BookCover({ src, alt, className }: BookCoverProps) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted/30 rounded-md aspect-3/4',
          className,
        )}
        aria-label={alt}
      >
        <BookOpen className="size-12 text-muted-foreground/50" />
      </div>
    )
  }

  return (
    <div className={cn('relative aspect-3/4 overflow-hidden rounded-md', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setErrored(true)}
        unoptimized
      />
    </div>
  )
}
