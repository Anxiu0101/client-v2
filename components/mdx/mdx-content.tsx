'use client'

import * as runtime from 'react/jsx-runtime'
import React, {ComponentPropsWithoutRef} from "react";
import { ImageWithFallback } from "@/components/mdx/image-with-fallback";
import { TravelGallery } from "@/components/mdx/travel-gallery";
import { CodeBlock } from "@/components/mdx/code-block";
import { CodeGroup } from "@/components/mdx/code-group";
import { Mermaid } from "@/components/mdx/mermaid";
import { Alert } from "@/components/mdx/alert";
import { ReferenceCard } from "@/components/mdx/reference-card";
import { ReferenceHover } from "@/components/mdx/reference-hover";
import { ReferenceList } from "@/components/mdx/reference-list";
import { ReferenceProvider } from "@/components/mdx/reference-context";
import type { ReferenceEntry } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

// 风格参考 https://github.com/Stryke-AI/shadcn-ui/blob/main/apps/v4/mdx-components.tsx
const sharedComponents = {
    TravelGallery,
    Mermaid,
    Alert,
    CodeGroup,
    ReferenceCard,
    ReferenceHover,
    ReferenceList,
    // Add your global components here
    h2: (props: ComponentPropsWithoutRef<'h2'>) => (
        <h2 className="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight [&+p]:mt-4! first:mt-0" {...props}/>
    ),
    h3: (props: React.ComponentProps<'h3'>) => (
        <h3 className="scroll-m-20 text-2xl py-1 font-semibold tracking-tight [&+p]:mt-4! *:[code]:text-2xl" {...props}/>
    ),
    h4: (props: React.ComponentProps<'h4'>) => (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight [&+p]:mt-3! first:mt-0" {...props} />
    ),
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
        <p
            className={cn("leading-relaxed", className)}
            {...props}
        />
    ),
    pre: (props: React.ComponentProps<"pre">) => <CodeBlock {...props} />,
    code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => {
        const isCodeBlock = props.hasOwnProperty('data-language');

        if (isCodeBlock) {
            return <code className={cn("p-3 rounded-lg border", className)} {...props} />;
        }

        return (
            <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                {...props}
            />
        );
    },
    a: ({ className, ...props }: React.ComponentProps<"a">) => (
        <a
            className={cn("font-medium text-blue-600 dark:text-blue-400 hover:underline break-words underline-offset-4", className)}
            {...props}
        />
    ),
    strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
        <strong className={cn("font-medium", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
        <ul className={cn("my-5 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
        <ol className={cn("my-3 ml-3 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<"li">) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
        <blockquote
            className={cn("mt-6 mb-4 border-l-2 border-muted-foreground/30 pl-6", className)}
            {...props}
        />
    ),
    img: (props: React.ComponentProps<typeof Image>) => (
        <ImageWithFallback {...props}/>
    ),
    table: (props: React.ComponentProps<"table">) => (
        <div className="relative w-full overflow-x-auto my-4 rounded-lg border">
            <table className="w-full caption-bottom text-sm" {...props} />
        </div>
    ),
    thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
        <thead className={cn("bg-muted/50", className)} {...props} />
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
        <tr className={cn("hover:bg-muted/50 border-b transition-colors", className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
        <th className={cn("text-foreground h-10 px-3 text-left align-middle font-medium", className)} {...props} />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
        <td className={cn("p-3 align-middle", className)} {...props} />
    ),
    hr: () => (
        <hr className="my-8 border-t border-border" />
    ),
}

const useMDXComponent = (code: string) => {
    return React.useMemo(() => {
        const fn = new Function(code)
        return fn({ ...runtime, ...React }).default
    }, [code])
}

interface MDXProps {
    code: string
    components?: Record<string, React.ComponentType>
    references?: ReferenceEntry[]
}

export const MDXContent = ({ code, components, references }: MDXProps) => {
    const MDXComponent = useMDXComponent(code)
    return (
        <ReferenceProvider references={references ?? []}>
            <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
                <React.Suspense fallback={<div>loading...</div>}>
                    {/* eslint-disable-next-line react-hooks/static-components */}
                    <MDXComponent components={{ ...sharedComponents, ...components }} />
                </React.Suspense>
            </div>
        </ReferenceProvider>
    )
}
