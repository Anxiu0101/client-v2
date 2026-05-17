# Anxiu-Note

Anxiu 的[个人博客站点](https://github.com/Anxiu0101/client-v2)，基于 [Next.js 16](https://nextjs.org) (App Router) 构建，使用 [Velite](https://velite.js.org) 作为内容管理工具，搭配 [shadcn/ui](https://ui.shadcn.com) (New York 风格) + [Tailwind CSS v4](https://tailwindcss.com) 构建 UI。

## Tech Stack

| 层面 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router, React 19) |
| **内容** | MDX + Velite 0.3 |
| **样式** | Tailwind CSS v4, shadcn/ui (Radix Primitives) |
| **状态** | Redux Toolkit |
| **表单** | react-hook-form + zod v4 |
| **包管理** | Yarn v1 |

## Getting Started

```bash
# 安装依赖
yarn install

# 生成内容
yarn gen

# 启动开发服务器
yarn dev

# 构建生产版本
yarn build

# 启动生产服务器
yarn start
```

## Available Scripts

| 命令 | 说明 |
|------|------|
| `yarn dev` | 启动开发服务器 |
| `yarn build` | 构建生产版本 |
| `yarn start` | 启动生产服务器 |
| `yarn gen` | 生成 Velite 内容 |
| `yarn lint` | ESLint 代码检查 |
| `yarn format` | ESLint 自动修复 |

## Project Structure

```
app/            — Next.js App Router 页面与布局
components/     — UI 组件
  ├── ui/       — shadcn/ui 基础组件
  ├── mdx/      — MDX 渲染组件
  ├── blog/     — 博客相关组件
  ├── profile/  — 首页个人资料组件
  └── layout/   — 布局组件
content/        — MDX 博客内容 (tech / book / life)
config/         — 站点配置
docs/           — 开发文档
lib/            — 工具函数
hooks/          — 自定义 Hooks
features/       — Redux slices
```

## Content

博客文章使用 MDX 编写，存放在 `content/` 目录下，按分类组织：

- **tech/** — 技术文章
- **book/** — 读书笔记
- **life/** — 生活记录

```bash
# 创建新文章
# 在对应分类目录下创建 .mdx 文件，并填写 frontmatter

# 重新生成内容
yarn gen
```

## Deployment

自托管：Standalone + PM2 + nginx（详见 `docs/deployment.md`）

## License

- **网站代码**：Apache 2.0
- **文章内容**：CC BY-NC-SA 4.0
