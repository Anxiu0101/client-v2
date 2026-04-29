---
name: add-blog-content
description: Add new blog post content to the Anxiu Online blog
---

## Adding a New Blog Post

This skill guides you through creating a new MDX blog post for the Anxiu Online blog.

### Steps

1. **Determine the category and year**
   - Content lives under `content/` organized by category:
     - `content/tech/<year>/` — Technical articles
     - `content/life/<year>/` — Life articles
     - `content/book/<year>/` — Book notes
     - Year subdirectory should match the post's year

2. **Create the MDX file**
   - Filename: kebab-case, descriptive (e.g. `my-new-post.mdx`)
   - Place in the correct category/year directory

3. **Frontmatter format** (required fields):
   ```yaml
   ---
   title: 'Your Post Title'
   date: 2025-01-01 12:00:00
   tags: []
   published: true
   comments: false
   ---
   ```
   - `title` (required) — max 99 chars
   - `date` (required) — ISO date string
   - `tags` — array of tag names (must exist in `content/tags/index.yml`)
   - `published` — boolean, if false the post won't appear in production
   - `comments` — enable GitHub comments
   - `cover` — optional cover image path
   - `draft` — boolean, hides in production
   - `refLink` — optional reference link
   - `author` — defaults to "Anxiu"

4. **Content guidelines**
   - Write in MDX format
   - Use `!!! tip` / `!!! cite` / `!!! warning` callout blocks (custom syntax)
   - Code blocks use rehype-pretty-code for syntax highlighting
   - Headings auto-get anchor links via rehype-autolink-headings

5. **Verify your content**
   ```bash
   yarn gen
   ```
   This runs Velite to generate metadata. Check for schema validation errors.

6. **Preview**
   ```bash
   yarn dev
   ```
   Visit `http://localhost:3000` to see your post.
