import { z } from "zod";
import {Tech, Book, Life} from "velite-generate";

type BlogInfo = {
    title: string;
    date: string;
    author: string;
    description: string;
    readingTime: number;
    wordCount: number;
    tags: string[];
    published: boolean;
    permalink: string;
}

export interface RecentBlogHandleProps {
    rawTech: Tech,
    rawBook: Book,
    rawLife: Life,
}

// export function RecentBlogHandle(posts: RecentBlogHandleProps): BlogInfo[] {
//     return ([])
// }

export function RecentBlogHandle(): BlogInfo[] {



    return ([])
}