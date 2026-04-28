import { Badge } from "components/ui/badge"
import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link";
import {tags} from ".velite";
import React from "react";
import {Separator} from "@/components/ui/separator";


// https://www.shadcn.com.cn/docs/components/base/badge

export default function Page() {


    return <div>
        <main className="max-w-4xl mx-auto">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">Tags</h1>
        {tags.map(tag => (
            <Badge asChild variant="outline" key={tag.slug}>
                <Link href={`/tag/${tag.slug}`}>
                    {tag.name}
                    <Separator orientation="vertical" />
                    {tag.count.posts}
                    <ArrowUpRightIcon data-icon="inline-end" />
                </Link>

            </Badge>
        ))}
        </main>
    </div>
}



