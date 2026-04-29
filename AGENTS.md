# Anxiu Online - Client v2

## Project Overview

Personal blog site built with Next.js 16, shadcn/ui (New York style), and Velite for content management.

## Tech Stack

- **Framework:** Next.js 16.1 (App Router, React 19)
- **UI:** shadcn/ui (Radix primitives + Tailwind CSS v4)
- **Styling:** Tailwind CSS v4, `tw-animate-css`, `tailwind-merge`, `clsx`
- **State:** Redux Toolkit + react-redux
- **Forms:** react-hook-form + zod v4
- **Content:** MDX with Velite 0.3
- **Charts:** recharts
- **Fonts:** @fontsource/lxgw-wenkai, @fontsource/lxgw-wenkai-mono-tc
- **Package Manager:** Yarn v1
- **TypeScript:** v5.9, strict mode
- **Lint:** ESLint 9 (eslint-config-next)

## Directory Structure

- `app/` — Next.js App Router pages & layouts
- `components/` — UI components
  - `components/ui/` — shadcn/ui primitives
  - `components/mdx/` — MDX rendering components
  - `components/blog/` — Blog-specific components
  - `components/layout/` — Layout components
- `features/` — Redux slices (e.g. `counter/`)
- `lib/` — Utility modules (utils, velite, fonts, feed-rss)
- `hooks/` — Custom React hooks
- `config/` — Site configuration (nav, site)
- `types/` — TypeScript type declarations
- `content/` — MDX blog content (book, categories, life, tags, tech)
- `docs/` — Documentation
- `scripts/` — Build/helper scripts

## Key Conventions

- Import alias: `@/*` maps to project root (e.g. `@/components/ui/button`)
- CSS utility: use `cn()` from `@/lib/utils` for class merging
- Components: shadcn/ui style with `cva` (class-variance-authority)
- shadcn/ui registry path: `@/components/ui/`
- Icon library: lucide-react
- Content style: MDX with rehype-pretty-code for syntax highlighting

## Available Scripts

- `yarn dev` — Start dev server
- `yarn build` — Production build (Next.js + Velite)
- `yarn start` — Start production server
- `yarn lint` — Run ESLint
- `yarn format` — Auto-fix ESLint issues
- `yarn gen` / `yarn content:gen` — Generate Velite content
- `yarn content:build` — Clean build Velite content

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

## Adding Content

Create `.mdx` files under `content/` organized by category (tech, life, book, tags).

## Commands Quick Reference

| Command | Action |
|---------|--------|
| `yarn dev` | Start development |
| `yarn build` | Build for production |
| `yarn lint` | Check code quality |
| `yarn format` | Auto-fix code issues |
| `yarn gen` | Generate content |
