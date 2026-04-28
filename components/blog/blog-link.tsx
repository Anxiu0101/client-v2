import Link from "next/link";

export default function BlogLinkWithoutDescription({url}: {url: string}) {
    return (
        <Link className="text-blue-600 dark:text-blue-400 hover:underline break-all" href={url}>{url}</Link>
    )
}