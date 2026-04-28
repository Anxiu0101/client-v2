"use client";

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BlogNavigationMenu } from "@/components/navigation-menu";
import { Icons, AnxiuInfoLogo } from "@/components/icons";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);

  return (
    <header className="border-b border-border/40">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <AnxiuInfoLogo/>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <BlogNavigationMenu/>
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
            >
              <Icons.search className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Blog Search</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-8 p-0"
            >
              <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-8 p-0"
            >
              <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-8 w-8 p-0"
            >
              {mobileMenuOpen ? (
                <Icons.x className="h-4 w-4" />
              ) : (
                <Icons.menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border/40 py-4">
            <div className="flex flex-col gap-3">
              <BlogNavigationMenu/>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
