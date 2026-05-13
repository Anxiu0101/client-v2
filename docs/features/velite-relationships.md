# Velite Data Layer — 数据查询与关系

## Overview

`lib/velite.ts` 是 Velite 生成数据的**唯一消费入口**。所有对 posts、categories、tags 的查询均通过该模块的导出函数完成，组件层不直接操作 `velite-generate` 原始数组。

核心原则（引自 Velite 作者 zce）：

> Velite does not want to intrude into the user's runtime code. Its purpose is only the intermediate process from content to data layer. You can query the data in a functional way.

## Content Model

Velite 产出四类数据集合，对应四种 TypeScript 类型：

| 集合 | 类型 | 数据源 | 生成方式 |
|------|------|--------|----------|
| `posts` | `PostBlog[]` | `content/**/*.mdx` | Schema validation + computed fields + MDX compilation |
| `categories` | `Category[]` | `content/categories/*.yml` | Schema validation + prepare hook count |
| `tags` | `Tag[]` | `content/tags/index.yml` | Schema validation + prepare hook count |
| `bookList` | `BookList[]` | `content/books/*.yml` | Schema validation |

各集合之间的关系由**数据而非 schema** 定义：
- `PostBlog.category: string`——值为 `Category.slug`
- `PostBlog.tags: string[]`——值为 `Tag.name` 数组
- `PostBlog.references: ReferenceEntry[]`——由 companion `.bib` 解析
- `PostBlog.isbn: string`——值为 `BookList.isbn`（book 分类文章通过 ISBN 关联书籍）

查询关系时，通过函数式编程做 join，而不是在 Velite schema 中定义外键。

## Generic Toolset

### `pick` — 字段选取

```typescript
const pick = <T extends object, K extends keyof T>(obj: T, keys?: K[]): Pick<T, K>
```

按需提取对象字段。`keys` 为 `undefined` 时返回完整对象。

```typescript
// 只取 title 和 permalink，减少序列化体积
const light = pick(post, ['title', 'permalink'])
// => { title: '...', permalink: '/posts/...' }
```

### `Filter<T>` — 过滤谓词

```typescript
type Filter<T> = (value: T, index: number, array: T[]) => boolean
```

标准 `Array.filter` 回调类型别名。`filters` 对象提供可复用谓词：

| 谓词 | 签名 | 逻辑 |
|------|------|------|
| `filters.none` | `() => true` | 全量通过 |
| `filters.available` | `({ draft }) => boolean` | 生产环境排除 draft |
| `filters.published` | `({ published }) => boolean` | 仅已发布内容 |

```typescript
import { filters, getPosts } from '@/lib/velite'

const visible = getPosts(['title'], filters.published)
```

### `Sorter<T>` — 排序比较器

```typescript
type Sorter<T> = (a: T, b: T) => number
```

标准 `Array.sort` 回调类型别名。`sorters` 对象提供可复用比较器：

| 比较器 | 约束 | 方向 |
|--------|------|------|
| `sorters.dateDesc` | `{ date: string }` | 日期倒序（最新在前） |
| `sorters.dateAsc` | `{ date: string }` | 日期正序 |
| `sorters.titleAsc` | `{ title: string }` | 标题字母正序 |
| `sorters.titleDesc` | `{ title: string }` | 标题字母倒序 |
| `sorters.countDesc` | `{ count: { total: number } }` | 文章数量倒序 |
| `sorters.countAsc` | `{ count: { total: number } }` | 文章数量正序 |

```typescript
import { sorters, getPosts } from '@/lib/velite'

const chronological = getPosts(['title'], filters.none, sorters.dateAsc)
```

### 查询范式（Query Paradigm）

所有 `get[Entity]*` 函数遵循统一签名模式：

```typescript
export const get[Entity] = <F extends keyof [Type]>(
  fields?: F[],                      // 选取字段；undefined = 全字段
  filter?: Filter<[Type]>,           // 过滤条件；默认 filters.none
  sorter?: Sorter<[Type]>,           // 排序；默认 dateDesc / countDesc
  limit?: number,                    // 返回上限；默认 Infinity
  offset?: number,                   // 偏移量；默认 0
): Pick<[Type], F>[]
```

**设计决策**：
- `returns` 使用 `Pick<Entity, F>` 精确推导字段类型，IDE 提示只显示已选字段
- `filter` / `sorter` / `limit` / `offset` 从左到右按**通用性降序**排列——多数调用只需前 2 个参数
- 所有 `getPosts*` 变体底层共享 `filters.available`，生产环境自动排除草稿

使用示例：

```typescript
// 最简单：全部已发布文章
const all = getPosts()

// 按分类取 5 页
const page = getPosts(['title', 'date'], p => p.category === 'tech', sorters.dateDesc, 5, 0)

// 按标签取文章计数
const tagged = getPostsCount(p => p.tags.includes('Python'))
```

## Entity Query Functions

### Posts

| 函数 | 说明 | 签名 |
|------|------|------|
| `getPosts(fields?, filter?, sorter?, limit?, offset?)` | 通用文章查询（已自动过滤草稿） | `Pick<PostBlog, F>[]` |
| `getPostsCount(filter?)` | 文章计数 | `number` |
| `getPostBySlug(slug, fields?)` | 按 slug 查单篇，可选字段 | `Pick<PostBlog, F> \| undefined` |
| `getPostsByCategory(category, fields?, sorter?, limit?, offset?)` | 按分类 slug 过滤 | `Pick<PostBlog, F>[]` |
| `getPostsByTag(tag, fields?, sorter?, limit?, offset?)` | 按标签 name 过滤 | `Pick<PostBlog, F>[]` |
| `getRelatedPosts(post, fields?, limit?)` | 按共同标签找相关文章，排除自身 | `Pick<PostBlog, F>[]` |
| `getPostNavigation(slug)` | 单篇文章前后导航 | `PostNavigationResult` |

### Tags

| 函数 | 说明 | 签名 |
|------|------|------|
| `getTags(fields?, filter?, sorter?, limit?, offset?)` | 通用标签查询 | `Pick<Tag, F>[]` |
| `getTagsCount(filter?)` | 标签计数 | `number` |
| `getTagBySlug(slug, fields?)` | 按 slug 查单个标签 | `Pick<Tag, F> \| undefined` |
| `getTagByName(name, fields?)` | 按 name 查单个标签 | `Pick<Tag, F> \| undefined` |

### Categories

| 函数 | 说明 | 签名 |
|------|------|------|
| `getCategories(fields?, filter?, sorter?, limit?, offset?)` | 通用分类查询 | `Pick<Category, F>[]` |
| `getCategoriesCount(filter?)` | 分类计数 | `number` |
| `getCategoryBySlug(slug, fields?)` | 按 slug 查单个分类 | `Pick<Category, F> \| undefined` |

### BookList

| 函数 | 说明 | 签名 |
|------|------|------|
| `getBookList(fields?, filter?, sorter?, limit?, offset?)` | 通用书籍查询 | `Pick<BookList, F>[]` |
| `getBookListCount(filter?)` | 书籍计数 | `number` |
| `getBookByIsbn(isbn, fields?)` | 按 ISBN 查单个书籍（O(1) Map 索引） | `Pick<BookList, F> \| undefined` |
| `getReadingBooks(fields?)` | 状态为"在读"的书籍 | `Pick<BookList, F>[]` |

### PostCardData

| 函数 | 说明 | 签名 |
|------|------|------|
| `toPostCardProps(posts)` | 将 PostBlog[] 转为轻量 PostCardData[] | `PostCardData[]` |

`PostCardData` 是一个扁平的轻量类型，用于客户端组件（如 `RecentBlogList`、`CommandSearch`），避免序列化完整的 `PostBlog` 对象。

## Relationship Patterns

### 1. Post ↔ Category（1:1）

`PostBlog.category` 存的是 `Category.slug` 字符串。获取完整的 Category 对象需做 join：

```typescript
import { getPostBySlug, getCategoryBySlug } from '@/lib/velite'

const post = getPostBySlug('2026-intro-to-rust')
const category = post ? getCategoryBySlug(post.category) : undefined
```

**封装写法**（建议放在页面 / 服务端组件中，不在 `lib/velite.ts` 中添加以避免循环依赖）：

```typescript
function hydrateCategory(post: PostBlog) {
    return {
        post,
        category: getCategoryBySlug(post.category),
    }
}
```

### 2. Post ↔ Tags（1:N）

`PostBlog.tags: string[]` 存的是 `Tag.name` 列表：

```typescript
import { getPosts, getTagByName } from '@/lib/velite'

const posts = getPosts(['title', 'tags', 'permalink'])
const withEntities = posts.map(post => ({
    ...post,
    tagEntities: post.tags.map(t => getTagByName(t)),
}))
```

### 3. Post → Navigation（前后篇）

全局按日期排序后的前一篇文章和后一篇文章：

```typescript
import { getPostNavigation } from '@/lib/velite'

const { prev, next } = getPostNavigation('2026-intro-to-rust')
// prev: { title, permalink }  ← 日期更早的下一篇
// next: { title, permalink }  ← 日期更新的上一篇
```

`PostNavigation` 组件已使用此函数：

```typescript
export function PostNavigation({ currentSlug }: PostNavigationProps) {
  const { prev, next } = getPostNavigation(currentSlug)
  // render <Link> for prev and next
}
```

### 4. Post → Related Posts（标签交集）

找共享标签最多的文章：

```typescript
import { getPostBySlug, getRelatedPosts } from '@/lib/velite'

const current = getPostBySlug('2026-intro-to-rust')
const related = current ? getRelatedPosts(current, ['title', 'permalink', 'date'], 3) : []
```

与 `getPostsByCategory` 的区别：category 是粗粒度的「领域」，tag 是细粒度的「主题」——findRelatedPost 基于主题交集，更适合发现跨领域的关联。

### 5. Category → Post Counts（反向统计）

Category 对象的 `count.total` 和 `count.posts` 由 `velite.config.ts` 的 `prepare` 钩子在构建时计算，无需运行时聚合：

```typescript
import { getCategoryBySlug } from '@/lib/velite'

const cat = getCategoryBySlug('tech')
console.log(cat?.count.total) // 22
```

### 6. Tag → Posts（按标签聚合）

`getPostsByTag` 封装了按标签过滤的查询：

```typescript
import { getPostsByTag } from '@/lib/velite'

const pythonPosts = getPostsByTag('Python', ['title', 'date', 'description'], sorters.dateDesc)
```

### 7. Post ↔ Book（通过 ISBN 关联）

book 分类的 post 可在 frontmatter 中声明 `isbn`，构建时 prepare hook 自动注入匹配的 BookList 引用至 `post.references[]`。运行时也可通过工具函数查询：

```typescript
import { getBookByIsbn, getReadingBooks } from '@/lib/velite'

// 按 ISBN 查书籍（O(1) Map 索引）
const book = getBookByIsbn('978-0262035613', ['title', 'authors', 'year'])

// 获取所有"在读"状态的书籍（供 BookCarousel 使用）
const reading = getReadingBooks(['title', 'authors', 'year', 'isbn', 'cover'])
```

数据流：

```
Build Time:
  prepare hook
    → ISBN → Book 索引 (Map)
    → 对每篇有 isbn 的 post，自动注入 book 引用到 post.references[]

Runtime:
  getBookByIsbn(isbn, fields?)
    → 模块级 Map 查找，O(1)
    → pick 按需返回字段
  
  getReadingBooks(fields?)
    → getBookList 封装，filter: status === 'reading'
```

## Future Relationships

以下关系可在未来按需添加。Velite 作者已讨论 `s.reference()` schema 方案（见 [zce/velite#134](https://github.com/zce/velite/issues/134)），一旦正式支持，可将以下部分逻辑移入 build 阶段。

| # | 关系 | 方向 | 复杂度 | 说明 |
|---|------|------|--------|------|
| 1 | Tag Co-occurrence | N:N | 中 | `getRelatedTags(tag)` — 经常与当前 tag 共现的其他 tag，含共现次数 |
| 2 | Category → Tag Distribution | 1:N | 中 | `getCategoryTagStats(slug)` — 某分类下所有 tag 计数分布 |
| 3 | Timeline / Archive | 1:N | 低 | `getPostsByYear()` / `getPostsByYearMonth()` — 按年份/月份分组 |
| 4 | Adjacent in Category | 1:1 | 低 | `getCategoryNavigation(post)` — 同一分类内的前后篇（更语义化的导航） |
| 5 | Series / Series | 1:N | 高 | `getPostsBySeries(post)` — 文章系列（需 schema 新增 `series` 字段） |
| 6 | Featured Posts | 1:N | 低 | `getFeaturedPosts()` — 精选文章（需 schema 新增 `featured` 字段） |
| 7 | Syndication Reference | 1:1 | 低 | `getPostByRefLink(url)` — 按外部引用链接反查文章 |
| 8 | Reading Progress | 1:N | 高 | `getReadingHistory()` — 需客户端状态（localStorage/IndexedDB） |

## Architecture Note

`lib/velite.ts` 同时被 **Server Components** 和 **Client Components** 消费，导入路径 `velite-generate` 映射到 `.velite/`：

```
components/blog/post-navigation.tsx (Client)
  └── import { getPostNavigation } from '@/lib/velite'
       └── import { posts } from 'velite-generate'
            └── .velite/posts.json

app/(blog)/posts/[slug]/page.tsx (Server, SSG)
  └── import { getPostBySlug } from '@/lib/velite'
       └── import { posts } from 'velite-generate'
            └── .velite/posts.json
```

注意：仅在 Server Component 中使用 `getPosts()` 等全量查询会产生较大的序列化负载传递到 Client。对于 Client Component，应优先使用 `fields?` 参数限制字段，或通过 fetch `search-index.json`（更轻量）。
