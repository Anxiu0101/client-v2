---
name: add-shadcn-component
description: Add a shadcn/ui component to the Anxiu Online project
---

## Adding a shadcn/ui Component

This skill guides you through adding a new shadcn/ui component.

### Steps

1. **Run the shadcn CLI**
   ```bash
   npx shadcn@latest add <component-name>
   ```
   Replace `<component-name>` with the component to add (e.g. `button`, `card`, `dialog`).

2. **What happens**
   - The component source is added to `@/components/ui/<component-name>.tsx`
   - Dependencies are auto-installed
   - The component follows the New York style (set in `components.json`)

3. **Registry path**
   - Components go to `@/components/ui/` (alias: `@/components/ui/`)

4. **Usage conventions**
   - Import from `@/components/ui/<component-name>`
   - Use `cn()` from `@/lib/utils` for class merging
   - Components use `cva` (class-variance-authority) for variant management
   - Icon library: `lucide-react`

5. **Example**
   ```tsx
   import { Button } from "@/components/ui/button"
   import { cn } from "@/lib/utils"
   ```
