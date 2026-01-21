import {
    s, defineConfig,
    defineCollection,
} from 'velite'

import slugify from "slugify";
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

// Generate semantic slugs (year + title converted to kebab-case),
// e.g. slug: <yyyy>-<blog-title>, 2025-ai-best-practice.
const generateSlug = (title: string, date: string) => {
    const formattedTitle = slugify(title, {
        lower: true, // 转小写
        strict: true, // 移除所有非URL安全字符
        replacement: '-' // 替换空格为-
    })

    const year = date.slice(0, 4) || new Date().getFullYear().toString();

    return `${year}-${formattedTitle}`
}

const computedFields = <T extends { title: string, date: string }>(data: T) => {
    const slugV = generateSlug(data.title, data.date)
    return {
        ...data,
        slug: slugV,
        permalink: `/posts/${slugV}`,
    }
}

const postBlogSchema = s.object({
        title: s.string().max(99), // Zod primitive type
        // slug: s.slug(),            // validate format, unique in posts collection
        // path: s.path(),                      // auto generate slug from file path
        date: s.isodate(),                  // input Date-like string, output ISO Date string.
        cover: s.image().optional(),        // input image relative path, output image object with blurImage.

        metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
        excerpt: s.excerpt(),   // excerpt of markdown content
        content: s.mdx(),       // parse mdx file.
        toc: s.toc(),           // transform markdown to table of content.
        tags: s.array(s.string()).default([]),
        published: s.boolean().default(false),
        comments: s.boolean().default(false),
    })
    // more additional fields (computed fields)
    .transform(computedFields)
    // recover slug unique validation, bases on auto generate slug.
    .refine(data => data.slug, 'slug cannnot be null')

const techBlog = defineCollection({
    name: 'Tech', // collection type name
    pattern: 'tech/**/*.mdx', // content files glob pattern
    schema: postBlogSchema
})

const bookBlog = defineCollection({
    name: 'Book', // collection type name
    pattern: 'book/**/*.mdx', // content files glob pattern
    schema: postBlogSchema
})

const lifeBlog = defineCollection({
    name: 'Life', // collection type name
    pattern: 'life/**/*.mdx', // content files glob pattern
    schema: postBlogSchema
})

export default defineConfig({
    root: "content",
    collections: { techBlog, bookBlog, lifeBlog },
    mdx: {
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, { theme: "github-dark" }],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
})

