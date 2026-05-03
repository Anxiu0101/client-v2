"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { CopyButton } from "@/components/mdx/copy-button"
import "./mermaid.css"

function generateId() {
  return `mermaid-${Math.random().toString(36).slice(2, 9)}`
}

function blueTheme(dark: boolean) {
  return dark
    ? {
        darkMode: true,
        background: "#0f172a",
        primaryColor: "#5b9cf5",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#6ba3f5",
        secondaryColor: "#1e293b",
        secondaryTextColor: "#cbd5e1",
        secondaryBorderColor: "#334155",
        tertiaryColor: "#0f172a",
        tertiaryTextColor: "#94a3b8",
        tertiaryBorderColor: "#1e293b",
        lineColor: "#475569",
        textColor: "#e2e8f0",
        mainBkg: "#1e293b",
        nodeBorder: "#475569",
        nodeTextColor: "#e2e8f0",
        clusterBkg: "#1e293b",
        clusterBorder: "#334155",
        titleColor: "#e2e8f0",
        edgeLabelBackground: "#1e293b",
        noteBkgColor: "#1e293b",
        noteTextColor: "#e2e8f0",
        noteBorderColor: "#475569",
      }
    : {
        darkMode: false,
        background: "#ffffff",
        primaryColor: "#4a84e8",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#6ba3f5",
        secondaryColor: "#e8f1fd",
        secondaryTextColor: "#1e3a5f",
        secondaryBorderColor: "#c5d9f7",
        tertiaryColor: "#f2f7fd",
        tertiaryTextColor: "#64748b",
        tertiaryBorderColor: "#d4e2f7",
        lineColor: "#a0aec0",
        textColor: "#1e293b",
        mainBkg: "#e8f1fd",
        nodeBorder: "#c5d9f7",
        nodeTextColor: "#1e3a5f",
        clusterBkg: "#f2f7fd",
        clusterBorder: "#d4e2f7",
        titleColor: "#1e3a5f",
        edgeLabelBackground: "#ffffff",
        noteBkgColor: "#fef9c3",
        noteTextColor: "#1e293b",
        noteBorderColor: "#facc15",
      }
}

function enhanceClassDiagram(container: HTMLElement, accentColor: string) {
  const svg = container.querySelector("svg")
  if (!svg) return

  const groups = svg.querySelectorAll(".classGroup")
  if (!groups.length) return

  groups.forEach((group) => {
    const rects = group.querySelectorAll("rect")
    const lines = group.querySelectorAll("line")
    if (rects.length < 1 || lines.length < 2) return

    const mainRect = rects[0]
    const lastDivider = lines[lines.length - 1]

    const x = mainRect.getAttribute("x")
    const y = mainRect.getAttribute("y")
    const width = mainRect.getAttribute("width")
    const height = mainRect.getAttribute("height")
    const dividerY = lastDivider.getAttribute("y1")
    if (!x || !y || !width || !height || !dividerY) return

    const ns = "http://www.w3.org/2000/svg"
    const overlay = document.createElementNS(ns, "rect")
    overlay.setAttribute("x", x)
    overlay.setAttribute("y", dividerY)
    overlay.setAttribute(
      "height",
      String(parseFloat(y) + parseFloat(height) - parseFloat(dividerY)),
    )
    overlay.setAttribute("width", width)
    overlay.setAttribute("fill", accentColor)
    overlay.setAttribute("fill-opacity", "0.10")
    overlay.setAttribute("pointer-events", "none")

    group.insertBefore(overlay, mainRect.nextElementSibling)
  })
}

export function Mermaid({ code }: { code: string }) {
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const idRef = useRef(generateId())

  useEffect(() => {
    let canceled = false

    const render = async () => {
      if (!ref.current) return

      try {
        const mermaid = (await import("mermaid")).default
        const themeColors = blueTheme(resolvedTheme === "dark")

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: themeColors,
        })

        const { svg, bindFunctions } = await mermaid.render(
          idRef.current,
          code,
        )

        if (!canceled) {
          ref.current.innerHTML = svg
          bindFunctions?.(ref.current)
          enhanceClassDiagram(ref.current, themeColors.primaryColor)
          setError(false)
        }
      } catch {
        if (!canceled) {
          setError(true)
        }
      }
    }

    render()
    return () => {
      canceled = true
    }
  }, [code, resolvedTheme])

  return (
    <div className="group relative not-first:mt-3 mb-2">
      <div className="overflow-x-auto rounded-lg border p-4">
        {error ? (
          <pre className="text-sm text-red-500 dark:text-red-400">
            <code>{code}</code>
          </pre>
        ) : (
          <div ref={ref} className="mermaid not-prose" />
        )}
      </div>
      <CopyButton
        getText={() => code}
        label="复制图表源码"
        copiedLabel="已复制"
      />
    </div>
  )
}
