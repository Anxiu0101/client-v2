# Roadmap

> 每完成一项功能或修复后，更新对应条目状态并移动至所属分组。

状态图例：`✅ 已完成` `🔴 高优先` `🟡 低优先` `🐛 Bug修复`

---

## MDX 渲染

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | Mermaid 图表 | `remarkMermaid` 插件 + 客户端组件，科技蓝自定义主题，类图三区块区分 | `velite.config.ts`, `components/mdx/mermaid.tsx`, `components/mdx/mermaid.css` |
| ✅ 已完成 | Alert 告警框 | `remarkAlert` 插件，` ```info/warning/error/tip ` 语法 | `velite.config.ts`, `components/mdx/alert.tsx` |
| ✅ 已完成 | 代码块复制按钮 | `CopyButton` shadcn/ui 共享组件 | `components/mdx/copy-button.tsx` |
| ✅ 已完成 | Table 样式 | shadcn/ui Table 风格，响应式滚动，行悬停 | `components/mdx/mdx-content.tsx` |
| ✅ 已完成 | h4/hr 样式 | 四级标题 + 分割线覆盖 | `components/mdx/mdx-content.tsx` |
| ✅ 已完成 | p/blockquote/a 样式修复 | 移除 mb-2、显式 border 色、break-words | `components/mdx/mdx-content.tsx` |
| 🟡 低优先 | 代码块行号 / 语言标注 | `rehype-pretty-code` 已支持，仅需样式 + 按需开启 | `velite.config.ts`, CSS |
| 🟡 低优先 | `> [!NOTE]` GFM 告警框 | 块引用风格告警框 remark 解析 | `velite.config.ts` |
| ✅ 已完成 | **Reference Card 组件** | 文章内引用卡片（论文/书籍/外部链接），BibTeX companion 文件，块级 Card + 行内 HoverCard + 底部自动收集列表。citation-js 解析，per-post 内嵌 references，零额外 HTTP 请求 | `velite.config.ts`, `components/mdx/reference-context.tsx`, `components/mdx/reference-card.tsx`, `components/mdx/reference-hover.tsx`, `components/mdx/reference-list.tsx`, `components/mdx/mdx-content.tsx`, `content/tech/2026/mdx-test.bib` |

## 内容系统

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | Velite 内容管线 | collections (posts/categories/tags) + schema + prepare hook | `velite.config.ts` |
| ✅ 已完成 | search-index.json | prepare 钩子自动生成客户端搜索索引 | `velite.config.ts` |
| ✅ 已完成 | RSS Feed | Route Handler + 自动发现 `<link>` | `lib/feed-rss.ts`, `app/rss/route.ts` |
| ✅ 已完成 | MDX 测试文件 | 全特性测试页面 | `content/tech/2026/mdx-test.mdx` |
| 🟡 低优先 | `getTagList()` 完善 | 统计标签列表 | `lib/velite.ts:21` |

## 搜索

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | Fuse.js 搜索 | `⌘K` 触发，CommandDialog，固定高度不浮动 | `hooks/use-search.tsx`, `components/blog/command-search.tsx` |

## 页面

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | 首页 | ProfileCard + RecentBlogList（客户端分页） | `app/(blog)/page.tsx` |
| ✅ 已完成 | 文章详情页 | TOC + MDX 渲染 + PostMeta + PostNavigation | `app/(blog)/posts/[slug]/page.tsx` |
| ✅ 已完成 | Tag 列表页 | 全部标签网格 | `app/(blog)/tag/page.tsx` |
| ✅ 已完成 | Tag 详情页 | 按标签过滤文章列表 | `app/(blog)/tag/[id]/page.tsx` |
| ✅ 已完成 | About 页 | 关于页面 | `app/about/page.tsx` |
| ✅ 已完成 | **Category 详情页** | 拆分为 3 页：Code Practice（tech，标签分组二级列表）、Book Insight（book，占位）、Life Journal（life，占位）。分组配置外置 `config/category-groups.ts`，prepare 匹配逻辑修复为 slug 匹配 | `app/(blog)/category/[id]/page.tsx`, `config/category-groups.ts`, `content/categories/{tech,book,life}.yml`, `velite.config.ts` |
| 🟡 低优先 | Category 列表页 | 全部分类网格 | `app/(blog)/category/page.tsx` |
| 🟡 低优先 | TOC 滚动监听 | IntersectionObserver scroll-spy | 组件内实现 |

## 样式 & 主题

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | 暗色模式 | next-themes class 策略，shadcn/ui CSS 变量 | `components/layout/theme-provider.tsx`, `app/globals.css` |
| ✅ 已完成 | 返回顶部按钮 | fixed + opacity hover | `components/layout/scroll-to-top.tsx` |
| ✅ 已完成 | Footer 重构 | CC 协议图标本地 SVG，Link 替换 `<a>` | `components/layout/footer.tsx`, `components/icons.tsx` |
| 🟡 低优先 | 字体优化 | FOUT 处理，子集化 | `docs/font-optimization.md` 参考 |

## 部署

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | 部署指南 | Debian 12, Standalone + PM2 + nginx + 七牛云安全组 | `docs/deployment.md` |
| ✅ 已完成 | Standalone 输出 | `next.config.ts` 配置 `output: "standalone"` | `next.config.ts` |
| ✅ 已完成 | 依赖参考 | 核心依赖官方文档与简介 | `docs/dependencies.md` |

## Bug 修复

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | `remotePatterns.pathname` | 补 `/**` 通配 | `next.config.ts` |
| ✅ 已完成 | Image fallback 错误态 | `<div>` → `<img>`（解决 `<p> cannot contain <div>`） | `components/mdx/image-with-fallback.tsx` |
| ✅ 已完成 | `wordCount` 浮点数 | `Math.round()` | `components/blog/post-meta.tsx` |
| ✅ 已完成 | 样式全丢 | `.next/static/` 未复制到 standalone | `docs/deployment.md` |

## 架构 & 文档

| 状态 | 任务 | 说明 | 文件 |
|------|------|------|------|
| ✅ 已完成 | 类型统一 | `PostInfo` / `SearchItem` 合并为 `PostCardData` | `lib/velite.ts` |
| ✅ 已完成 | 架构文档 | 系统图、组件树、数据流、路由 | `docs/architecture.md` |
| ✅ 已完成 | Velite 管线文档 | 集合定义、schema、prepare 钩子、消费者模式 | `docs/features/velite-pipeline.md` |
| ✅ 已完成 | Velite 关系文档 | 数据查询工具、关系模式 | `docs/features/velite-relationships.md` |
| ✅ 已完成 | Reference Card 文档 | 引用系统完整文档 | `docs/features/references.md` |
| ✅ 已完成 | 字体优化文档 | 字体加载优化方案 | `docs/features/font-optimization.md` |
| ✅ 已完成 | 进度跟踪 | 本文件 | `docs/roadmap.md` |
| 🟡 低优先 | 完善 `getRecentPostsByCategory` | 参数 `category` 未使用 | `lib/velite.ts:53` |

---

## 更新规范

每次完成功能 / 修复后：
1. 在对应表格中找到条目，将状态改为 `✅ 已完成`
2. 新增「已完成」条目时，补充 `文件` 列
3. 在 AGENTS.md 的会话记录中追加一行，并提交
