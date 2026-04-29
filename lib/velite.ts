import {
    type PostBlog,
    posts
} from 'velite-generate'

export const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug)
}

export const getPostsByCategory = (category: string) => {
    return posts.filter(post => post.category === category)
}

// Tags
// TODO 增加对于结果的缓存
export const getTagCount = (tag: string) => {
    return posts.filter(post => post.tags.includes(tag)).length
}

// TODO 统计标签列表
export const getTagList = () => {
    // return posts.find(post => post.tags)
}

// Recent Posts
export interface PostInfo {
    title: string;
    description: string;
    date: string;
    readingTime: number;
    author: string;
    tags: string[];
    permalink: string;
}

export const toPostCardProps = (rawPosts: PostBlog[]) => {
    return rawPosts
        .filter(post => process.env.NODE_ENV !== 'production' || !post.draft)
        .map(post => ({
            title: post.title,
            description: post.description,
            date: post.date,
            readingTime: post.metadata.readingTime,
            author: post.author,
            tags: post.tags,
            permalink: post.permalink,
        }))
}

export const getRecentPostsInfo = () => {}
export const getRecentPostsByCategory = (category: string) => {}

// export const getAuthors = async <F extends keyof Author>(
//     filter: Filter<Author>,
//     fields?: F[],
//     limit: number = Infinity,
//     offset: number = 0
// ): Promise<Pick<Author, F>[]> => {
//     return authors
//         .filter(filter)
//         .sort((a, b) => (a.name > b.name ? -1 : 1))
//         .slice(offset, offset + limit)
//         .map(author => pick(author, fields))
// }
//
// export const getAuthorsCount = async (filter: Filter<Author> = filters.none): Promise<number> => {
//     return authors.filter(filter).length
// }
//
// export const getAuthor = async <F extends keyof Author>(filter: Filter<Author>, fields?: F[]): Promise<Pick<Author, F> | undefined> => {
//     const author = authors.find(filter)
//     return author && pick(author, fields)
// }
//
// export const getAuthorByName = async <F extends keyof Author>(name: string, fields?: F[]): Promise<Pick<Author, F> | undefined> => {
//     return getAuthor(i => i.name === name, fields)
// }
//
// export const getAuthorBySlug = async <F extends keyof Author>(slug: string, fields?: F[]): Promise<Pick<Author, F> | undefined> => {
//     return getAuthor(i => i.slug === slug, fields)
// }