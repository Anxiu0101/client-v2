import { generateMultiFormatRss } from "@/lib/feed-rss"

export const dynamic = "force-static"

export async function GET() {
  const { rss2 } = generateMultiFormatRss()

  return new Response(rss2, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
