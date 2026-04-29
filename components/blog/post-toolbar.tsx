"use client"

import { useState } from "react"
import { Link, FileCode, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig } from "@/config/site"
import BlogInfoSheet from "@/components/blog/blog-info-sheet"
import type { PostBlog } from "velite-generate"

interface PostToolbarProps {
  post: PostBlog
}

export function PostToolbar({ post }: PostToolbarProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedRaw, setCopiedRaw] = useState(false)

  const shareUrl = post.refLink || `${siteConfig.url}${post.permalink}`

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const copyRawContent = async () => {
    await navigator.clipboard.writeText(post.raw)
    setCopiedRaw(true)
    setTimeout(() => setCopiedRaw(false), 2000)
  }

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={copyShareLink}>
            {copiedLink ? <Check className="size-4" /> : <Link className="size-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {copiedLink ? "Copied!" : "Copy share link"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={copyRawContent}>
            {copiedRaw ? <Check className="size-4" /> : <FileCode className="size-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {copiedRaw ? "Copied!" : "Copy raw content"}
        </TooltipContent>
      </Tooltip>

      <BlogInfoSheet post={post} />
    </ButtonGroup>
  )
}
