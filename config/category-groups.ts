export interface CategoryGroup {
  name: string
  matchTags: string[]
}

export const techCategoryGroups: CategoryGroup[] = [
  { name: "Development", matchTags: ["Code", "Development"] },
  { name: "Tools & Deploy", matchTags: ["Tools", "Linux", "Deploy"] },
]
