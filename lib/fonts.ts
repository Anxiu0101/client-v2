// lib/fonts.ts
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// 2. 配置本地字体 (注意路径相对于此文件或使用绝对路径)
export const fontLxgwWenKai = localFont({
    src: "../public/fonts/lxgw-wenkai-lite/LXGWWenKaiLite-Regular.ttf",
    variable: "--font-lxgw-wenkai",
    display: "swap",
});

export const fontLxgwWenKaiMono = localFont({
    src: "../public/fonts/lxgw-wenkai-lite/LXGWWenKaiMonoLite-Regular.ttf",
    variable: "--font-lxgw-wenkai-mono",
    display: "swap",
});

// 1. 配置 Google 字体
export const fontSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const fontMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});