import {
    type PostBlog,
    type Category,
    type Tag,
    posts,
    categories,
    tags,
} from 'velite-generate'

type Filter<T> = (value: T, index: number, array: T[]) => boolean
type Sorter<T> = (a: T, b: T) => number

const pick = <T extends object, K extends keyof T>(obj: T, keys?: K[]): Pick<T, K> => {
    if (keys == null) return obj
    return Object.fromEntries(keys.map(k => [k, obj[k]])) as Pick<T, K>
}

const available = (item: { draft: boolean }) =>
    process.env.NODE_ENV !== 'production' || !item.draft

export const filters = {
    none: (): boolean => true,
    available,
    published: (item: { published: boolean }) => item.published,
}

export const sorters = {
    dateDesc: <T extends { date: string }>(a: T, b: T): number => (a.date > b.date ? -1 : 1),
    dateAsc: <T extends { date: string }>(a: T, b: T): number => (a.date > b.date ? 1 : -1),
    titleAsc: <T extends { title: string }>(a: T, b: T): number => (a.title > b.title ? 1 : -1),
    titleDesc: <T extends { title: string }>(a: T, b: T): number => (a.title > b.title ? -1 : 1),
    countDesc: <T extends { count: { total: number } }>(a: T, b: T): number =>
        a.count.total > b.count.total ? -1 : 1,
    countAsc: <T extends { count: { total: number } }>(a: T, b: T): number =>
        a.count.total > b.count.total ? 1 : -1,
}

// ─── Posts ───────────────────────────────────────────────

export const getPosts = <F extends keyof PostBlog>(
    fields?: F[],
    filter: Filter<PostBlog> = filters.none,
    sorter: Sorter<PostBlog> = sorters.dateDesc,
    limit: number = Infinity,
    offset: number = 0,
): Pick<PostBlog, F>[] => {
    return posts
        .filter(available)
        .filter(filter)
        .sort(sorter)
        .slice(offset, offset + limit)
        .map(post => pick(post, fields))
}

export const getPostsCount = (filter: Filter<PostBlog> = filters.none): number => {
    return posts.filter(available).filter(filter).length
}

export const getPostBySlug = <F extends keyof PostBlog>(
    slug: string,
    fields?: F[],
): Pick<PostBlog, F> | undefined => {
    const post = posts.find(p => p.slug === slug)
    return post ? pick(post, fields) : undefined
}

export const getPostsByCategory = <F extends keyof PostBlog>(
    category: string,
    fields?: F[],
    sorter: Sorter<PostBlog> = sorters.dateDesc,
    limit: number = Infinity,
    offset: number = 0,
): Pick<PostBlog, F>[] => {
    return getPosts(fields, p => p.category === category, sorter, limit, offset)
}

export const getPostsByTag = <F extends keyof PostBlog>(
    tag: string,
    fields?: F[],
    sorter: Sorter<PostBlog> = sorters.dateDesc,
    limit: number = Infinity,
    offset: number = 0,
): Pick<PostBlog, F>[] => {
    return getPosts(fields, p => p.tags.includes(tag), sorter, limit, offset)
}

export const getRelatedPosts = <F extends keyof PostBlog>(
    post: PostBlog,
    fields?: F[],
    limit: number = 3,
): Pick<PostBlog, F>[] => {
    return getPosts(fields, p => {
        if (p.slug === post.slug) return false
        const commonTags = p.tags.filter(t => post.tags.includes(t))
        return commonTags.length > 0
    }, sorters.dateDesc, limit)
}

export interface PostNavigationItem {
    title: string
    permalink: string
}

export interface PostNavigationResult {
    prev: PostNavigationItem | null
    next: PostNavigationItem | null
}

export const getPostNavigation = (slug: string): PostNavigationResult => {
    const sorted = getPosts(undefined, filters.none, sorters.dateDesc)
    const index = sorted.findIndex(p => p.slug === slug)
    if (index === -1) return { prev: null, next: null }

    const prev = index < sorted.length - 1 ? sorted[index + 1] : null
    const next = index > 0 ? sorted[index - 1] : null

    return {
        prev: prev ? { title: prev.title, permalink: prev.permalink } : null,
        next: next ? { title: next.title, permalink: next.permalink } : null,
    }
}

// ─── Tags ─────────────────────────────────────────────────

export const getTags = <F extends keyof Tag>(
    fields?: F[],
    filter: Filter<Tag> = filters.none,
    sorter: Sorter<Tag> = sorters.countDesc,
    limit: number = Infinity,
    offset: number = 0,
): Pick<Tag, F>[] => {
    return tags
        .filter(filter)
        .sort(sorter)
        .slice(offset, offset + limit)
        .map(tag => pick(tag, fields))
}

export const getTagsCount = (filter: Filter<Tag> = filters.none): number => {
    return tags.filter(filter).length
}

export const getTagBySlug = <F extends keyof Tag>(
    slug: string,
    fields?: F[],
): Pick<Tag, F> | undefined => {
    const tag = tags.find(t => t.slug === slug)
    return tag ? pick(tag, fields) : undefined
}

export const getTagByName = <F extends keyof Tag>(
    name: string,
    fields?: F[],
): Pick<Tag, F> | undefined => {
    const tag = tags.find(t => t.name === name)
    return tag ? pick(tag, fields) : undefined
}

// ─── Categories ──────────────────────────────────────────

export const getCategories = <F extends keyof Category>(
    fields?: F[],
    filter: Filter<Category> = filters.none,
    sorter: Sorter<Category> = sorters.countDesc,
    limit: number = Infinity,
    offset: number = 0,
): Pick<Category, F>[] => {
    return categories
        .filter(filter)
        .sort(sorter)
        .slice(offset, offset + limit)
        .map(cat => pick(cat, fields))
}

export const getCategoriesCount = (filter: Filter<Category> = filters.none): number => {
    return categories.filter(filter).length
}

export const getCategoryBySlug = <F extends keyof Category>(
    slug: string,
    fields?: F[],
): Pick<Category, F> | undefined => {
    const cat = categories.find(c => c.slug === slug)
    return cat ? pick(cat, fields) : undefined
}

// ─── PostCardData ─────────────────────────────────────────

export interface PostCardData {
    title: string
    description: string
    date: string
    readingTime: number
    author: string
    tags: string[]
    permalink: string
    category: string
}

export const toPostCardProps = (rawPosts: PostBlog[]): PostCardData[] => {
    return rawPosts
        .filter(available)
        .map(post => ({
            title: post.title,
            description: post.description,
            date: post.date,
            readingTime: post.metadata.readingTime,
            author: post.author,
            tags: post.tags,
            permalink: post.permalink,
            category: post.category,
        }))
}
