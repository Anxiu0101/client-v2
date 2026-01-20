import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface AboutMeLayoutProps {
    children: React.ReactNode
}

export default function AboutMeLayout({ children }: AboutMeLayoutProps) {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            <Footer/>
            </div>
        </ThemeProvider>
    );
}