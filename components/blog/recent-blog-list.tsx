"use client"

import { useState, useEffect } from "react"
import { PostCard, PostCardSkeletonList } from "@/components/blog/post-card"
import type { PostCardData } from "@/lib/velite"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const POSTS_PER_PAGE = 7

export function RecentBlogList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [allPosts, setAllPosts] = useState<PostCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: PostCardData[]) => {
        setAllPosts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <PostCardSkeletonList count={POSTS_PER_PAGE} />

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const pagePosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis")
      }
    }
    return pages
  }

  return (
    <div className="space-y-4 py-8 pb-16">
      {pagePosts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}

      {totalPages > 1 && (
        <Pagination className="pt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) goToPage(currentPage - 1)
                }}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>

            {getPageNumbers().map((page, i) =>
              page === "ellipsis" ? (
                <PaginationItem key={`e-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      goToPage(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) goToPage(currentPage + 1)
                }}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
