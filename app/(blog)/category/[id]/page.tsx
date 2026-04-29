import { categories } from "velite-generate"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ id: string }>
}

// FIXME: Implement category detail page with post listing
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
      <div className="flex items-center justify-center min-h-[40dvh] text-muted-foreground">
        Category listing coming soon.
      </div>
    </div>
  )
}