import { categories, posts } from "velite-generate"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Mail } from "lucide-react"
import { toPostCardProps, getReadingBooks } from "@/lib/velite"
import { techCategoryGroups } from "@/config/category-groups"
import { siteConfig } from "@/config/site"
import { PostCard } from "@/components/blog/post-card"
import { BookCarousel } from "@/components/blog/book-carousel"

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.slug }))
}

interface CategoryPageProps {
  params: Promise<{ id: string }>
}

function CodePracticePage() {
  const techPosts = toPostCardProps(posts.filter((p) => p.category === "tech"))

  const grouped = techCategoryGroups.map((group) => ({
    name: group.name,
    posts: techPosts.filter((p) => p.tags.some((t) => group.matchTags.includes(t))),
  }))

  const matchedTags = new Set(techCategoryGroups.flatMap((g) => g.matchTags))
  const others = techPosts.filter((p) => p.tags.every((t) => !matchedTags.has(t)))
  if (others.length > 0) {
    grouped.push({ name: "Others", posts: others })
  }

  return (
    <>
      {grouped.map(
        (group) =>
          group.posts.length > 0 && (
            <section key={group.name}>
              <h2 className="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8">
                {group.name}
              </h2>
              <ul className="my-5 ml-6 list-disc">
                {group.posts.map((post) => (
                  <li key={post.permalink} className="mt-2">
                    <Link
                      href={post.permalink}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline break-words underline-offset-4"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ),
      )}
    </>
  )
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-[40dvh] text-muted-foreground">
      <p>
        {name} — coming soon
      </p>
    </div>
  )
}

function BookInsightsPage() {
  const readingBooks = getReadingBooks()
  const bookPosts = toPostCardProps(posts.filter((p) => p.category === "book"))

  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">近期在读</h2>
        <BookCarousel books={readingBooks} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">已读后感</h2>
        {bookPosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {bookPosts.map((post) => (
              <PostCard key={post.permalink} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无文章</p>
        )}
      </section>

      <section className="text-center py-8 border-t border-border/40">
        <h2 className="text-xl font-semibold mb-2">向我推荐</h2>
        <p className="text-muted-foreground mb-4">
          有好书推荐给我吗？欢迎通过邮箱告诉我
        </p>
        {siteConfig.email && (
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Mail className="size-4" />
            {siteConfig.email}
          </a>
        )}
      </section>
    </>
  )
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { id } = await params
  const category = categories.find((c) => c.slug === id)

  if (!category) {
    notFound()
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-muted-foreground mb-8">{category.description}</p>
      )}

      {id === "tech" ? (
        <CodePracticePage />
      ) : id === "book" ? (
        <BookInsightsPage />
      ) : (
        <Placeholder name={category.name} />
      )}
    </div>
  )
}
