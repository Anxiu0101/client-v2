import {
    s, defineConfig,
    defineSchema,
    defineCollection,
} from 'velite'

import slugify from "slugify";
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { Cite } from '@citation-js/core'
import '@citation-js/plugin-bibtex'

interface ReferenceEntry {
    key: string
    type: string
    title: string
    author?: string
    year?: number
    publisher?: string
    containerTitle?: string
    url?: string
    doi?: string
    isbn?: string
}

const count = s.object({ total: s.number(), posts: s.number() }).default({ total: 0, posts: 0 })

const execAsync = promisify(exec)

interface MdxNode {
  type: string
  lang?: string
  value?: string
  name?: string
  attributes?: { type: string; name: string; value: string }[]
  children?: MdxNode[]
}

interface MdxTree {
  children: MdxNode[]
}

function toJsxNode(name: string, attrs: Record<string, string>, children?: MdxNode[]) {
  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: Object.entries(attrs).map(([n, v]) => ({
      type: 'mdxJsxAttribute' as const,
      name: n,
      value: v,
    })),
    children: children ?? [],
  }
}

const ALERT_MAP: Record<string, string> = {
  info: 'note',
  note: 'note',
  success: 'tip',
  tip: 'tip',
  warning: 'warning',
  warn: 'warning',
  error: 'error',
  danger: 'error',
}

function isAlert(lang: string | undefined): lang is string {
  return lang != null && lang in ALERT_MAP
}

function remarkMermaid() {
  return (tree: MdxTree) => {
    const walk = (nodes: MdxNode[]) => {
      let i = 0
      while (i < nodes.length) {
        const node = nodes[i]
        if (node.type === 'code' && node.lang === 'mermaid') {
          nodes[i] = toJsxNode('Mermaid', { code: node.value ?? '' })
        } else if (node.children) {
          walk(node.children)
        }
        i++
      }
    }
    if (tree.children) walk(tree.children)
  }
}

function remarkAlert() {
  return (tree: MdxTree) => {
    const walk = (nodes: MdxNode[]) => {
      let i = 0
      while (i < nodes.length) {
        const node = nodes[i]
        if (node.type === 'code' && isAlert(node.lang)) {
          const type = ALERT_MAP[node.lang]
          const content = node.value ?? ''
          nodes[i] = toJsxNode('Alert', { type }, [
            { type: 'paragraph', children: [{ type: 'text', value: content }] },
          ])
        } else if (node.children) {
          walk(node.children)
        }
        i++
      }
    }
    if (tree.children) walk(tree.children)
  }
}

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

const referenceEntrySchema = s.object({
    key: s.string(),
    type: s.string(),
    title: s.string(),
    author: s.string().optional(),
    year: s.number().optional(),
    publisher: s.string().optional(),
    containerTitle: s.string().optional(),
    url: s.string().optional(),
    doi: s.string().optional(),
    isbn: s.string().optional(),
})

const parseBibFile = async (mdxPath: string): Promise<ReferenceEntry[]> => {
    const bibPath = mdxPath.replace(/\.mdx$/, '.bib')
    const candidates = [
        bibPath,
        path.join(process.cwd(), bibPath),
        path.join(process.cwd(), 'content', bibPath),
    ]
    const validPath = candidates.find(p => fs.existsSync(p))
    if (!validPath) return []
    try {
        const bibContent = fs.readFileSync(validPath, 'utf-8')
        const cite = new Cite(bibContent)
        return cite.data.map(entry => ({
            key: entry.id,
            type: entry.type,
            title: entry.title,
            author: entry.author?.map(a => `${a.family}, ${a.given}`).join('; '),
            year: entry.issued?.['date-parts']?.[0]?.[0],
            publisher: entry.publisher,
            containerTitle: entry['container-title'],
            url: entry.URL,
            doi: entry.DOI,
            isbn: entry.ISBN,
        }))
    } catch (e) {
        console.warn(`Failed to parse bib file for ${mdxPath}:`, e)
        return []
    }
}

const computedFields = <T extends {
    title: string,
    date: string,
    description: string,
    excerpt: string,
    path: string,
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
    const categoryV = data.path.split('/')[0]

    return {
        ...data,
        slug: slugV,
        created_date: createdAt,
        permalink: `/posts/${slugV}`,
        category: categoryV,
    }
}

const postBlogSchema = s.object({
        title: s.string().max(99), // Zod primitive type
        // slug: s.slug(),            // validate format, unique in posts collection
        path: s.path(),                      // auto generate slug from file path
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
        draft: s.boolean().default(false),
        comments: s.boolean().default(false),   // enable github comment or not.
        refLink: s.string().optional(),
        references: s.array(referenceEntrySchema).default([]),
    })
    // more additional fields (computed fields)
    .transform(computedFields)
    // parse companion BibTeX file
    .transform(async (data, { meta }) => {
        const references = await parseBibFile(meta.path)
        return { ...data, references }
    })
    // recover slug unique validation, bases on auto generate slug.
    .refine(data => data.slug, 'slug cannot be null')

const posts = defineCollection({
    name: 'PostBlog', // collection type name
    pattern: '**/*.mdx', // content files glob pattern
    schema: postBlogSchema
})

// transformerCopyButton support Copy Button for code block
// TODO https://velite.js.org/guide/code-highlighting#copy-button

const categories = defineCollection({
    name: 'Category',
    pattern: 'categories/*.yml',
    schema: s
        .object({
            name: s.string().max(20),
            slug: s.slug('global', ['admin', 'login']),
            cover: s.image().optional(),
            description: s.string().max(999).optional(),
            count
        })
        .transform(data => ({ ...data, permalink: `/category/${data.slug}` }))
})


const tags = defineCollection({
    name: 'Tag',
    pattern: 'tags/index.yml',
    schema: s
        .object({
            name: s.string().max(20),
            slug: s.slug('global', ['admin', 'login']),
            cover: s.image().optional(),
            description: s.string().max(999).optional(),
            count
        })
        .transform(data => ({ ...data, permalink: `/tags/${data.slug}` }))
})

export default defineConfig({
    root: "content",
    collections: { posts, categories, tags },
    mdx: {
        remarkPlugins: [remarkGfm, remarkMermaid, remarkAlert],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: {
                        light: "one-light",
                        dark: "one-dark-pro",
                    }
                }
            ],
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
    prepare: ({ categories, tags, posts }) => {
        const docs = posts.filter(i => process.env.NODE_ENV !== 'production' || !i.draft)

        // missing categories, tags from posts or courses inlined
        const categoriesFromDoc = Array.from(new Set(docs.flatMap(i => i.category))).filter(i => categories.find(j => j.slug === i) == null)
        categories.push(...categoriesFromDoc.map(name => ({ name, slug: slugify(name), permalink: '', count: { total: 0, posts: 0 } })))
        for (const category of categories) {
            category.count.posts = posts.filter(j => j.category === category.slug).length
            category.count.total = category.count.posts
            category.permalink = `/category/${category.slug}`
        }

        const tagsFromDoc = Array.from(new Set(docs.flatMap(i => i.tags))).filter(i => tags.find(j => j.name === i) == null)
        tags.push(...tagsFromDoc.map(name => ({ name, slug: slugify(name), permalink: '', count: { total: 0, posts: 0 } })))
        for (const tag of tags) {
            tag.count.posts = posts.filter(j => j.tags.includes(tag.name)).length
            tag.count.total = tag.count.posts
            tag.permalink = `/tags/${tag.slug}`
        }

        // push extra data to collections, it's ok!! but they are not type-safed
        // Object.assign(collections, {
        //   anything: { name: 'Anything', data: { name: 'Anything' } },
        //   list: ['one', 'two', 'three']
        // })

        // generate client-side search index (shares PostCardData shape)
        const searchIndex = docs.map(post => ({
            title: post.title,
            description: post.description,
            tags: post.tags,
            category: post.category,
            permalink: post.permalink,
            date: post.date,
            readingTime: post.metadata.readingTime,
            author: post.author,
        }))
        const publicDir = path.join(process.cwd(), 'public')
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true })
        }
        fs.writeFileSync(
            path.join(publicDir, 'search-index.json'),
            JSON.stringify(searchIndex)
        )

        // return false // return false to prevent velite from writing data to disk
    }
})

