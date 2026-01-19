import {
    defineCollection,
    defineConfig,
    s
} from 'velite'

import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
})

const techBlog = defineCollection({
    name: 'Tech', // collection type name
    pattern: 'tech/**/*.mdx', // content files glob pattern
    schema: s
        .object({
            title: s.string().max(99), // Zod primitive type
            slug: s.slug('tech'), // validate format, unique in posts collection
            // slug: s.path(), // auto generate slug from file path
            date: s.isodate(), // input Date-like string, output ISO Date string.
            cover: s.image().optional(), // input image relative path, output image object with blurImage.

            metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
            excerpt: s.excerpt(),   // excerpt of markdown content
            content: s.mdx(),       // parse mdx file.
            toc: s.toc(),           // transform markdown to table of content.
        })
        // more additional fields (computed fields)
        .transform(computedFields)
})

const bookBlog = defineCollection({
    name: 'Book', // collection type name
    pattern: 'book/**/*.md', // content files glob pattern
    schema: s
        .object({
            title: s.string().max(99), // Zod primitive type
            slug: s.slug('posts/book'), // validate format, unique in posts collection
            // slug: s.path(), // auto generate slug from file path
            date: s.isodate(), // input Date-like string, output ISO Date string.
            cover: s.image().optional(), // input image relative path, output image object with blurImage.
            video: s.file().optional(), // input file relative path, output file public path.
            metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
            excerpt: s.excerpt(), // excerpt of markdown content
            content: s.markdown() // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform(data => ({ ...data, permalink: `/blog/book/${data.slug}` }))
})

const lifeBlog = defineCollection({
    name: 'Post', // collection type name
    pattern: 'life/**/*.md', // content files glob pattern
    schema: s
        .object({
            title: s.string().max(99), // Zod primitive type
            slug: s.slug('posts/life'), // validate format, unique in posts collection
            // slug: s.path(), // auto generate slug from file path
            date: s.isodate(), // input Date-like string, output ISO Date string.
            cover: s.image().optional(), // input image relative path, output image object with blurImage.
            video: s.file().optional(), // input file relative path, output file public path.
            metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
            excerpt: s.excerpt(), // excerpt of markdown content
            content: s.markdown() // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform(data => ({ ...data, permalink: `/blog/life/${data.slug}` }))
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