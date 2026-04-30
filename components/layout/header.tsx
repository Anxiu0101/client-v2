"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BlogNavigationMenu } from "@/components/navigation-menu";
import { Icons, AnxiuInfoLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useSearch } from "@/hooks/use-search";

export function Header() {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const { setOpen: setSearchOpen } = useSearch();

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
                onClick={() => setSearchOpen(true)}
            >
              <Icons.search className="h-4 w-4" />
              <span className="sr-only">Blog Search</span>
            </Button>
            <ThemeToggle/>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle/>
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
            <BlogNavigationMenu mobile />
          </nav>
        )}
      </div>
    </header>
  );
}
