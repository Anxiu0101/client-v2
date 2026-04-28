import * as runtime from 'react/jsx-runtime'
import React, {ComponentPropsWithoutRef} from "react";
import { ImageWithFallback } from "@/components/mdx/image-with-fallback";
import Image from "next/image";
import { cn } from "@/lib/utils";

// https://github.com/Stryke-AI/shadcn-ui/blob/main/apps/v4/mdx-components.tsx
const sharedComponents = {
    // Add your global components here
    h2: (props: ComponentPropsWithoutRef<'h2'>) => (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}/>
    ),
    h3: (props: React.ComponentProps<'h3'>) => (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight [&+p]:mt-4! *:[code]:text-2xl" {...props}/>
    ),
    // h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    //     <h3
    //         className={cn(
    //             "mt-12 scroll-m-28 font-heading text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl",
    //             className
    //         )}
    //         {...props}
    //     />
    // ),
    // p: (props: ComponentPropsWithoutRef<'p'>) => (
    //     <p className="leading-7 not-first:mt-6" {...props}/>
    // ),
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
        <p
            className={cn("leading-relaxed not-first:mt-3 mb-2", className)}
            {...props}
        />
    ),
    // pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    //     <pre
    //         className="p-4 rounded-lg border overflow-x-auto bg-[var(--shiki-light-bg)] dark:bg-[var(--shiki-dark-bg)]"
    //         {...props}
    //     />
    // ),
    // pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    //     return (
    //         <pre
    //             // className={cn(
    //             //     "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0",
    //             //     className
    //             // )}
    //             {...props}
    //         >
    //     {children}
    //   </pre>
    //     )
    // },
    code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => {
        // judge code block or not(By rehype-pretty-code injection attribute 'data-language')
        const isCodeBlock = props.hasOwnProperty('data-language');

        if (isCodeBlock) {
            // code block style extend from <pre> label.
            return <code className={cn("p-3 rounded-lg border", className)} {...props} />;
        }

        // inline code
        return (
            <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                {...props}
            />
        );
    },
    img: (props: React.ComponentProps<typeof Image>) => (
        <ImageWithFallback {...props}/>
    )
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
    return React.useMemo(() => {
        const fn = new Function(code)
        return fn({ ...runtime, ...React }).default
    }, [code])
}

interface MDXProps {
    code: string
    components?: Record<string, React.ComponentType>
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
    const MDXComponent = useMDXComponent(code)
    return (
        <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
            <React.Suspense fallback={<div>loading...</div>}>
                <MDXComponent components={{ ...sharedComponents, ...components }} />
            </React.Suspense>
        </div>

    )
}