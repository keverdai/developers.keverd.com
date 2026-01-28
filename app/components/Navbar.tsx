"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { isAuthenticated, getTenantName } from "../lib/auth";
import { SearchModal } from "./SearchModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Quickstart", href: "/getting-started" },
  { label: "API Reference", href: "/docs/api" },
  { label: "API Keys", href: "/api-keys" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tenantName, setTenantName] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on mount and when pathname changes
    setAuthenticated(isAuthenticated());
    setTenantName(getTenantName());
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-keverd-blue">
              KEVERD
            </span>
            <span className="text-sm text-gray-500">Docs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-keverd-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Search documentation"
            >
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono text-gray-600">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </button>
            
            {/* Auth Section */}
            {authenticated ? (
              <Link
                href="https://dashboard.keverd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span>{tenantName || "Dashboard"}</span>
              </Link>
            ) : (
              <Link
                href="https://dashboard.keverd.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-keverd-blue text-white hover:bg-keverd-blue/90 transition-colors"
              >
                <span>Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-keverd-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Search Button - Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-full"
            >
              <span>Search</span>
            </button>
            
            {/* Auth Section - Mobile */}
            {authenticated ? (
              <Link
                href="https://dashboard.keverd.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span>{tenantName || "Dashboard"}</span>
              </Link>
            ) : (
              <Link
                href="https://dashboard.keverd.com/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-keverd-blue text-white hover:bg-keverd-blue/90 transition-colors"
              >
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        )}
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

