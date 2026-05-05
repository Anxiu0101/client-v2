// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchProvider } from "@/hooks/use-search";
import { CommandSearch } from "@/components/blog/command-search";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

export const metadata: Metadata = {
    title: "Anxiu.Info Personal Blog",
    description: "Anxiu's personal space for sharing tech and life.",
    alternates: {
        types: {
            "application/rss+xml": [
                { url: "/rss", title: "Anxiu.Info" },
            ],
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <head>
            <link
                rel="preload"
                href="https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai@5.2.5/files/lxgw-wenkai-latin-500-normal.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai@5.2.5/files/lxgw-wenkai-latin-700-normal.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
        </head>
        <body
            className={`${fontSans.variable} ${fontMono.variable} antialiased`}
        >
        <ThemeProvider>
            <SearchProvider>
            <CommandSearch />
            <div className="min-h-dvh flex flex-col">
                <Header />

                <main className="flex-1 flex flex-col">
                    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
            <ScrollToTop />
            </SearchProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}