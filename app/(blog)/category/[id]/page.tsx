import { categories, posts } from "velite-generate"
import { notFound } from "next/navigation"
import Link from "next/link"
import { toPostCardProps } from "@/lib/velite"
import { techCategoryGroups } from "@/config/category-groups"

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
      ) : (
        <Placeholder name={category.name} />
      )}
    </div>
  )
}
