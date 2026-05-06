# Session Context — Next LLM Briefing

> **读取优先级：** 每个新工作循环的第一个消息中读取本文档，再按需查阅 `AGENTS.md`、`docs/roadmap.md`、`docs/architecture.md`。

---

## 1. 项目身份

- Anxiu Online — 个人博客，Next.js 16 App Router + shadcn/ui New York + Velite 0.3
- 包管理器：Yarn v1（`.yarnrc` 中 `--ignore-engines true` 已持久化）
- 所有依赖为精确版本（`package.json` 无 `^` / `~`）
- 路径别名：`@/*` → 项目根目录

## 2. 上次会话完成的成果

| 领域 | 成果 |
|------|------|
| Category 页 | 拆分为 3 页（Code Practice / Book Insight / Life Journal），tech 按 tag 分组二级列表，book/life 占位 |
| Category YML | tech.yml → Code Practice，life.yml → Life Journal，新建 book.yml → Book Insights，prepare 钩子改为 slug 匹配 |
| 脚注 | 安装 `remark-gfm@4.0.1` 并注册到 remarkPlugins，MDX 可直接用 `[^id]` 语法 |
| 锁版本 | `package.json` 所有 60 个依赖去掉 `^` 降级为精确版本 |
| 构建产物追踪 | `.velite/` 和 `search-index.json` 从 git 中 untrack（`git rm --cached` + `.gitignore`） |
| `deploy.sh` | `git pull` → `git fetch origin && git reset --hard origin/master` |

## 3. 页面路由现状

| 路由 | 类型 | 状态 |
|------|------|------|
| `/` | ○ Static | ✅ Homepage (ProfileCard + RecentBlogList) |
| `/posts/[slug]` | ● SSG | ✅ 22 篇文章详情 |
| `/tag` | ○ Static | ✅ 全部标签网格 |
| `/tag/[id]` | ● SSG | ✅ 按标签过滤文章列表（27 个标签） |
| `/category/[id]` | ƒ Dynamic | ✅ Code Practice / Book Insight / Life Journal 三页 |
| `/about` | ○ Static | ✅ About 页 |
| `/rss` | ○ Static | ✅ RSS Feed |

## 4. 关键技术决策

- **内容层**：Velite -> 生成 `.velite/` + `public/search-index.json`，服务端组件直接 import，客户端 fetch JSON
- **MDX 处理**：remark 阶段用 custom plugin（remarkMermaid / remarkAlert / remarkGfm），rehype 阶段用 rehypeSlug / rehypePrettyCode / rehypeAutolinkHeadings
- **Mermaid**：`theme: 'base'` + `blueTheme(dark)` 科技蓝自定义色板，mermaid 通过动态 import（防 SSR 问题）
- **部署**：Standalone + PM2 + nginx + 七牛云安全组
- **git 规则**：严禁 Agent 提交，仅本地修改，用户确认后手动 commit

## 5. Config / Content 文件结构

```
config/
├── nav-item.ts           ← 导航菜单定义（Tech/Book/Life/About 及子项目）
├── site.ts               ← 站点配置
└── category-groups.ts    ← tech 分类 tag 分组（Development / Tools & Deploy）

content/
├── categories/
│   ├── tech.yml          ← name: "Code Practice", slug: tech
│   ├── book.yml          ← name: "Book Insights", slug: book
│   └── life.yml          ← name: "Life Journal", slug: life
├── tags/index.yml        ← 全部 tag 定义
├── tech/                 ← 技术文章 (20 篇)
├── book/                 ← 读书笔记 (1 篇测试)
└── life/                 ← 生活记录 (1 篇)
```

## 6. 立即可以继续的方向

| 优先级 | 任务 | 说明 |
|--------|------|------|
| 🔴 高优先 | **Reference Card 组件** | 文章内引用卡片，支持论文/书籍/外部链接，带结构化元数据和悬停预览 |
| 🟡 低优先 | TOC 滚动监听 | IntersectionObserver scroll-spy |
| 🟡 低优先 | 代码块行号 / 语言标注 | rehype-pretty-code 已支持，只需样式 |
| 🟡 低优先 | `getTagList()` 完善 | lib/velite.ts 空实现 |
| 🟡 低优先 | `getRecentPostsByCategory()` | 参数未使用 |
| 🟡 低优先 | Book Insight / Life Journal 填充内容 | 暂无文章 |

详见 `docs/roadmap.md`。

## 7. 关键规则速查

- **Any 文件**：新 LLM 会话启动时，先读本文档 → `AGENTS.md` → `docs/roadmap.md`
- **Build 产物**：`.velite/` 不手动编辑，修改 `content/` 后 `yarn gen`
- **新依赖**：`yarn add <pkg> -E`（精确版本）
- **新 shadcn 组件**：`npx shadcn@latest add <name>`
- **Git**：Agent 不允许 commit / push，展示 diff 后用户自行提交
- **Roadmap**：每次完成功能后更新 `docs/roadmap.md`
