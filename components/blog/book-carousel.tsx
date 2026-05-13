'use client'

import type { BookList } from 'velite-generate'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import { BookCover } from '@/components/blog/book-cover'

export function BookCarousel({ books }: { books: BookList[] }) {
  if (books.length === 0) return null

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="w-full h-162.5"
    >
      <CarouselContent className="min-w-0 w-full h-full ">
        {books.map((book) => (
          <CarouselItem key={book.isbn || book.title} className="sm:basis-1/2 lg:basis-1/2 pl-4 py-1">
            <Card className="p-4 h-full flex flex-col gap-3">
              <BookCover
                src={book.cover}
                alt={book.title}
                className="w-full mx-auto"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="font-medium text-sm leading-snug" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {book.authors.join(', ')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {book.year}
                  {book.isbn ? ` \u00B7 ISBN: ${book.isbn}` : ''}
                </p>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
