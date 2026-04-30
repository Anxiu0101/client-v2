// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import {
    fontSans, fontMono,
    fontLxgwWenKai,
    fontLxgwWenKaiMono,
} from "@/lib/fonts";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchProvider } from "@/hooks/use-search";
import { CommandSearch } from "@/components/blog/command-search";

export const metadata: Metadata = {
    title: "Anxiu.Info Personal Blog",
    description: "Anxiu's personal space for sharing tech and life.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <body
            className={`${fontSans.variable} ${fontMono.variable} antialiased`}
            style={{
                fontFamily: "var(--font-lxgwwenkai-lite), var(--font-geist-sans), sans-serif",
            }}
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
            </SearchProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}