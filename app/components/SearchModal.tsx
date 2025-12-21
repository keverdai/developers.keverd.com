"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, FileText, Code, Key, Book, Home, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import Link from "next/link";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const searchIndex: SearchResult[] = [
  // Homepage
  {
    title: "Home",
    description: "Keverd Developer Documentation homepage",
    href: "/",
    category: "General",
    icon: Home,
  },
  // Getting Started
  {
    title: "Getting Started",
    description: "Complete guide to getting started with Keverd fraud detection",
    href: "/getting-started",
    category: "Guides",
    icon: Code,
  },
  // API Keys
  {
    title: "API Keys",
    description: "Learn how to obtain and manage your Keverd API keys",
    href: "/api-keys",
    category: "Guides",
    icon: Key,
  },
  // Documentation Hub
  {
    title: "Documentation",
    description: "Browse all available SDKs and documentation",
    href: "/docs",
    category: "Documentation",
    icon: Book,
  },
  // API Reference
  {
    title: "API Reference",
    description: "Complete API reference for Keverd fraud detection platform",
    href: "/docs/api",
    category: "API",
    icon: FileText,
  },
  // Android SDK
  {
    title: "Android SDK",
    description: "Kotlin-based SDK for Android applications with device fingerprinting and SIM swap detection",
    href: "/docs/android",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Android SDK - Installation",
    description: "Install the Android SDK using Maven Central or Gradle",
    href: "/docs/android#installation",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Android SDK - Quick Start",
    description: "Get started with the Android SDK in minutes",
    href: "/docs/android#quick-start",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Android SDK - API Reference",
    description: "Complete API reference for the Android SDK",
    href: "/docs/android#api-reference",
    category: "SDK",
    icon: Code,
  },
  // JavaScript SDK
  {
    title: "JavaScript SDK",
    description: "Lightweight JavaScript SDK that works in any browser environment",
    href: "/docs/javascript",
    category: "SDK",
    icon: Code,
  },
  {
    title: "JavaScript SDK - Installation",
    description: "Install the JavaScript SDK using npm, yarn, or CDN",
    href: "/docs/javascript#installation",
    category: "SDK",
    icon: Code,
  },
  {
    title: "JavaScript SDK - Quick Start",
    description: "Get started with the JavaScript SDK",
    href: "/docs/javascript#quick-start",
    category: "SDK",
    icon: Code,
  },
  {
    title: "JavaScript SDK - API Reference",
    description: "Complete API reference for the JavaScript SDK",
    href: "/docs/javascript#api-reference",
    category: "SDK",
    icon: Code,
  },
  // React SDK
  {
    title: "React SDK",
    description: "React hooks and components for seamless integration in React applications",
    href: "/docs/react",
    category: "SDK",
    icon: Code,
  },
  {
    title: "React SDK - Installation",
    description: "Install the React SDK using npm or yarn",
    href: "/docs/react#installation",
    category: "SDK",
    icon: Code,
  },
  {
    title: "React SDK - Quick Start",
    description: "Get started with the React SDK using hooks and providers",
    href: "/docs/react#quick-start",
    category: "SDK",
    icon: Code,
  },
  {
    title: "React SDK - API Reference",
    description: "Complete API reference for the React SDK",
    href: "/docs/react#api-reference",
    category: "SDK",
    icon: Code,
  },
  // Vue SDK
  {
    title: "Vue.js SDK",
    description: "Vue 3 composables and plugin for seamless integration in Vue.js applications",
    href: "/docs/vue",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Vue.js SDK - Installation",
    description: "Install the Vue.js SDK using npm or yarn",
    href: "/docs/vue#installation",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Vue.js SDK - Quick Start",
    description: "Get started with the Vue.js SDK using composables",
    href: "/docs/vue#quick-start",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Vue.js SDK - API Reference",
    description: "Complete API reference for the Vue.js SDK",
    href: "/docs/vue#api-reference",
    category: "SDK",
    icon: Code,
  },
  // Angular SDK
  {
    title: "Angular SDK",
    description: "Angular service and module for seamless integration in Angular applications",
    href: "/docs/angular",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Angular SDK - Installation",
    description: "Install the Angular SDK using npm",
    href: "/docs/angular#installation",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Angular SDK - Quick Start",
    description: "Get started with the Angular SDK using services and modules",
    href: "/docs/angular#quick-start",
    category: "SDK",
    icon: Code,
  },
  {
    title: "Angular SDK - API Reference",
    description: "Complete API reference for the Angular SDK",
    href: "/docs/angular#api-reference",
    category: "SDK",
    icon: Code,
  },
];

function searchResults(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  return searchIndex
    .filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descMatch = item.description.toLowerCase().includes(lowerQuery);
      const categoryMatch = item.category.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch || categoryMatch;
    })
    .slice(0, 8); // Limit to 8 results
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const newResults = searchResults(query);
    setResults(newResults);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].href);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
          <Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 outline-none text-keverd-ink placeholder:text-gray-400 text-lg"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() && results.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : query.trim() && results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = result.icon;
                const isSelected = index === selectedIndex;
                return (
                  <Link
                    key={`${result.href}-${index}`}
                    href={result.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer",
                      isSelected && "bg-keverd-blue/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "flex-shrink-0 mt-0.5",
                        isSelected ? "text-keverd-blue" : "text-gray-400"
                      )}
                      size={20}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className={cn(
                            "font-medium text-sm",
                            isSelected ? "text-keverd-blue" : "text-keverd-ink"
                          )}
                        >
                          {result.title}
                        </p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight
                      className={cn(
                        "flex-shrink-0",
                        isSelected ? "text-keverd-blue" : "text-gray-300"
                      )}
                      size={16}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-8">
              <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
              <div className="space-y-2">
                {[
                  { title: "Android SDK", href: "/docs/android" },
                  { title: "React SDK", href: "/docs/react" },
                  { title: "API Reference", href: "/docs/api" },
                  { title: "Getting Started", href: "/getting-started" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {query.trim() && results.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">
                    Enter
                  </kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">
                    Esc
                  </kbd>
                  <span>Close</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

