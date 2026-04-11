import {
    s, defineConfig,
    defineSchema,
    defineCollection,
} from 'velite'

import slugify from "slugify";
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// timestamp for last updated time by git timestamp.
// https://velite.js.org/guide/last-modified#based-on-git-timestamp
const timestamp = defineSchema(() =>
    s
        .custom<string | undefined>(i => i === undefined || typeof i === 'string')
        .transform<string>(async (value, { meta, addIssue }) => {
            if (value != null) {
                addIssue({ fatal: false, code: 'custom', message: '`s.timestamp()` schema will resolve the value from `git log -1 --format=%cd`' })
            }
            const { stdout } = await execAsync(`git log -1 --format=%cd ${meta.path}`)
            return new Date(stdout || Date.now()).toISOString()
        })
)

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

const computedFields = <T extends {
    title: string,
    date: string,
    description: string,
    excerpt: string,
}>(data: T) => {

    if (!data.description) {
        if (!data.excerpt) {
            data.description = ""
        }
        data.description = data.excerpt as string;
        data.excerpt = ""
    }

    const slugV = generateSlug(data.title, data.date)
    const createdAt = data.date

    return {
        ...data,
        slug: slugV,
        created_date: createdAt,
        permalink: `/posts/${slugV}`,
    }
}

const postBlogSchema = s.object({
        title: s.string().max(99), // Zod primitive type
        // slug: s.slug(),            // validate format, unique in posts collection
        // path: s.path(),                      // auto generate slug from file path
        date: s.isodate(),                  // createdAt date, input Date-like string, output ISO Date string.
        updated_date: timestamp(),
        author: s.string().default("Anxiu"),
        cover: s.image().optional(),        // input image relative path, output image object with blurImage.
        description: s.string().max(99).default(""),
        metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
        excerpt: s.excerpt(),   // excerpt of markdown content
        content: s.mdx(),       // parse mdx file.
        raw: s.raw(),
        toc: s.toc(),           // transform markdown to table of content.
        tags: s.array(s.string()).default([]),  // blog tags, array[string]
        published: s.boolean().default(false),  // publish or not, boolean value.
        comments: s.boolean().default(false),   // enable github comment or not.
    })
    // more additional fields (computed fields)
    .transform(computedFields)
    // recover slug unique validation, bases on auto generate slug.
    .refine(data => data.slug, 'slug cannot be null')

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

// transformerCopyButton support Copy Button for code block
// TODO https://velite.js.org/guide/code-highlighting#copy-button

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

