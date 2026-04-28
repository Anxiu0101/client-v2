import * as runtime from 'react/jsx-runtime'
import React from "react";

const sharedComponents = {
    // Add your global components here
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
    // FIXME Cannot cope with lazy load image.
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
        <React.Suspense fallback={<div>loading...</div>}>
            <MDXComponent components={{ ...sharedComponents, ...components }} />
        </React.Suspense>
    )
}