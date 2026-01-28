import { z } from 'zod';

const NavItemSchema: z.ZodSchema<NavItem> = z.lazy(() =>
    z.object({
        title: z.string(),
        href: z.string(),

        disabled: z.boolean().optional().default(false),
        description: z.string().optional().default(''),

        subItems: z.array(NavItemSchema).optional().default([])
    })
);

export type ZNavItem = z.infer<typeof NavItemSchema>;