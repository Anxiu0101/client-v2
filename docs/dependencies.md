# 主要依赖参考

核心依赖的官方文档与简介，按分层组织。

---

## 框架

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `next` | 16.1 | React 全栈框架，App Router + SSG/ISR | https://nextjs.org/docs |
| `react` / `react-dom` | 19.2 | UI 运行时，Server Components + 并发渲染 | https://react.dev |

---

## UI 组件

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| **shadcn/ui** | New York style | Headless 组件集合，基于 Radix Primitives + Tailwind CSS，源码纳入项目直接修改 | https://ui.shadcn.com/docs |
| `@radix-ui/react-*` | 1.x | 无样式的可访问 UI primitives（Dialog、Select、Tooltip 等 20+） | https://radix-ui.com/primitives |
| `lucide-react` | 0.562 | SVG 图标库，树摇友好 | https://lucide.dev/icons |
| `cmdk` | 1.1 | 无样式 Command Palette 组件（`⌘K` 搜索框基础） | https://cmdk.paco.me |
| `sonner` | 2.0 | Toast 通知组件，支持 Promise API | https://sonner.emilkowal.ski |
| `embla-carousel-react` | 8.6 | 轮播图引擎（旅行画廊用） | https://www.embla-carousel.com |
| `vaul` | 1.1 | 抽屉/Drawer 组件 | https://vaul.emilkowal.ski |
| `react-day-picker` | 9.13 | 日期选择器 | https://react-day-picker.js.org |

---

## 样式

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `tailwindcss` | v4 | 原子化 CSS 框架，JIT 编译 | https://tailwindcss.com/docs |
| `@tailwindcss/typography` | 0.5 | prose 排版插件，为文章内容提供开箱即用的排版样式 | https://tailwindcss.com/docs/typography-plugin |
| `class-variance-authority` | 0.7 | 组件变体 (variants) 管理，shadcn/ui 风格核心 | https://cva.style/docs |
| `tw-animate-css` | 1.4 | Tailwind 动画预设 | https://github.com/jamiebuilds/tw-animate-css |
| `clsx` | 2.1 | 条件 className 拼接 | https://github.com/lukeed/clsx |
| `tailwind-merge` | 3.4 | 智能合并 Tailwind class，解决样式冲突 | https://github.com/dcastil/tailwind-merge |
| `next-themes` | 0.4 | 主题切换（亮色/暗色/系统跟随），通过 `<html>` class 控制 | https://github.com/pacocoursey/next-themes |

---

## 内容（MDX / Velite）

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `velite` | 0.3 | TypeScript 优先的内容层，基于 Zod schema 定义集合，处理 MDX 编译+序列化 | https://velite.js.org |
| `@mdx-js/react` | 3.1 | MDX 运行时 React 集成 | https://mdxjs.com |
| `rehype-pretty-code` | 0.14 | Shiki 驱动的语法高亮，主题 `one-light` / `one-dark-pro` | https://rehype-pretty.pages.dev |
| `rehype-slug` | 6.0 | 为标题自动添加 `id` 属性 | https://github.com/rehypejs/rehype-slug |
| `rehype-autolink-headings` | 7.1 | 为标题自动添加锚点链接（`.subheading-anchor`） | https://github.com/rehypejs/rehype-autolink-headings |
| `shiki` | 3.21 | 语法高亮引擎，支持 TextMate 主题 | https://shiki.style |
| `slugify` | 1.6 | 字符串转 URL 安全 slug | https://github.com/simov/slugify |

### 自定义 Remark 插件（项目内置）

| 插件 | 文件 | 作用 |
|------|------|------|
| `remarkMermaid` | `velite.config.ts` | ` ```mermaid ` 代码块 → `<Mermaid code="...">` 组件节点 |
| `remarkAlert` | `velite.config.ts` | ` ```info / ```warning / ```error / ```tip ` → `<Alert type="...">` 组件节点 |

---

## 图表

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `mermaid` | 11.14 | 文本驱动的图表生成（流程图、时序图、类图等） | https://mermaid.js.org |
| `recharts` | 2.15 | 声明式 React 图表库，基于 D3 | https://recharts.org |

---

## 状态管理

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `@reduxjs/toolkit` | 2.11 | Redux 官方工具集，简化 store/slice 创建 | https://redux-toolkit.js.org |
| `react-redux` | 9.2 | Redux 的 React 绑定 | https://react-redux.js.org |

---

## 表单

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `react-hook-form` | 7.70 | 高性能 React 表单库，非受控模式减少重渲染 | https://react-hook-form.com |
| `zod` | 4.3 | TypeScript 优先的 schema 声明与验证 | https://zod.dev |
| `@hookform/resolvers` | 5.2 | react-hook-form 的 schema 解析桥接（zod 等） | https://github.com/react-hook-form/resolvers |

---

## 搜索

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `fuse.js` | 7.3 | 客户端模糊搜索，支持权重、阈值、高亮 | https://fusejs.io |

---

## 工具

| 包 | 版本 | 简介 | 文档 |
|---|------|------|------|
| `date-fns` | 4.1 | 日期处理工具库，函数式 + 树摇 | https://date-fns.org |
| `feed` | 5.2 | RSS / Atom / JSON Feed 生成 | https://github.com/jpmonette/feed |
| `typescript` | 5.9 | 类型系统 | https://www.typescriptlang.org/docs |
